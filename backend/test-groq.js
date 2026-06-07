require('dotenv').config();
const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function testGroq() {
  console.log('Testing Groq API...');
  console.log('API Key:', process.env.GROQ_API_KEY?.substring(0, 15) + '...');
  
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: 'Say "Hello! Groq is working perfectly with super fast speed!" in a friendly way.'
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 100
    });

    const response = chatCompletion.choices[0].message.content;

    console.log('\n✅ SUCCESS! Groq is working!');
    console.log('Response:', response);
    console.log('\n🎉 Your AI assistant is now powered by FREE Groq!');
    console.log('💰 Cost: $0 (Completely FREE!)');
    console.log('⚡ Speed: SUPER FAST (faster than GPT-4!)');
    console.log('🤖 Model: Llama 3.1 70B (High Quality!)');
    console.log('🚀 Ready to use in your InterviewGPT app!');
  } catch (error) {
    console.log('\n❌ ERROR:');
    console.log('Message:', error.message);
    console.log('Status:', error.status);
    
    if (error.message.includes('Unauthorized')) {
      console.log('\n⚠️  Invalid API key. Please check your key at https://console.groq.com/keys');
    } else if (error.message.includes('rate limit')) {
      console.log('\n⚠️  Rate limit exceeded. Wait a moment and try again.');
    }
  }
}

testGroq();
