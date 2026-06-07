require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function testOpenAI() {
  console.log('Testing OpenAI API...');
  console.log('API Key:', process.env.OPENAI_API_KEY?.substring(0, 20) + '...');
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: 'Say "Hello, OpenAI is working!" in a short sentence.' }
      ],
      max_tokens: 50
    });

    console.log('\n✅ SUCCESS! OpenAI is working!');
    console.log('Response:', response.choices[0].message.content);
  } catch (error) {
    console.log('\n❌ ERROR:');
    console.log('Message:', error.message);
    console.log('Status:', error.status);
    console.log('Type:', error.type);
    
    if (error.status === 429) {
      console.log('\n⚠️  Rate limit or quota exceeded. Wait a few minutes or check your billing.');
    } else if (error.status === 401) {
      console.log('\n⚠️  Invalid API key. Please check your key at https://platform.openai.com/api-keys');
    } else if (error.code === 'insufficient_quota') {
      console.log('\n⚠️  No credits available. Add credits at https://platform.openai.com/account/billing');
    }
  }
}

testOpenAI();
