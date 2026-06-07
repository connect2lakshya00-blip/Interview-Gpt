const { Pinecone } = require('@pinecone-database/pinecone');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

let pineconeClient = null;

const initPinecone = async () => {
  if (!pineconeClient) {
    pineconeClient = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT
    });
  }
  return pineconeClient;
};

exports.storeInVectorDB = async (text, userId) => {
  try {
    const chunks = chunkText(text, 500);
    const vectorIds = [];

    const pc = await initPinecone();
    const index = pc.index(process.env.PINECONE_INDEX);

    for (let i = 0; i < chunks.length; i++) {
      const embedding = await createEmbedding(chunks[i]);
      const id = `${userId}-${Date.now()}-${i}`;

      await index.upsert([{
        id,
        values: embedding,
        metadata: {
          userId,
          text: chunks[i],
          timestamp: Date.now()
        }
      }]);

      vectorIds.push(id);
    }

    return vectorIds;
  } catch (error) {
    console.error('Vector DB Error:', error);
    return [];
  }
};

exports.queryVectorDB = async (query, userId) => {
  try {
    const embedding = await createEmbedding(query);

    const pc = await initPinecone();
    const index = pc.index(process.env.PINECONE_INDEX);

    const queryResponse = await index.query({
      vector: embedding,
      topK: 5,
      filter: { userId },
      includeMetadata: true
    });

    const contexts = queryResponse.matches.map(match => match.metadata.text);
    const answer = await generateAnswer(query, contexts);

    return {
      answer,
      sources: contexts
    };
  } catch (error) {
    console.error('Query Error:', error);
    return {
      answer: 'Unable to process query at this time.',
      sources: []
    };
  }
};

const createEmbedding = async (text) => {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error('Embedding Error:', error);
    return new Array(1536).fill(0);
  }
};

const generateAnswer = async (query, contexts) => {
  try {
    const prompt = `Based on the following context, answer the question:

Context:
${contexts.join('\n\n')}

Question: ${query}

Answer:`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    });

    return response.choices[0].message.content;
  } catch (error) {
    return 'Unable to generate answer.';
  }
};

const chunkText = (text, chunkSize) => {
  const words = text.split(' ');
  const chunks = [];

  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(' '));
  }

  return chunks;
};
