require('dotenv').config();
const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';

async function testGemini() {
  console.log('Testing Google Gemini REST API...');
  console.log('API Key:', GEMINI_API_KEY?.substring(0, 15) + '...');
  
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [{
          parts: [{ text: 'Say "Hello! Google Gemini is working perfectly!" in a friendly way.' }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY
        }
      }
    );

    const text = response.data.candidates[0].content.parts[0].text;

    console.log('\n✅ SUCCESS! Google Gemini is working!');
    console.log('Response:', text);
    console.log('\n🎉 Your AI assistant is now powered by FREE Google Gemini!');
    console.log('💰 Cost: $0 (Completely FREE!)');
    console.log('🚀 Ready to use in your InterviewGPT app!');
  } catch (error) {
    console.log('\n❌ ERROR:');
    console.log('Message:', error.response?.data || error.message);
    console.log('Status:', error.response?.status);
    
    if (error.response?.status === 400) {
      console.log('\n⚠️  API key issue. Please verify your key at https://aistudio.google.com/app/apikey');
    }
  }
}

testGemini();
