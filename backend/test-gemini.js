require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testGemini() {
  console.log('Testing Google Gemini API...');
  console.log('API Key:', process.env.GEMINI_API_KEY?.substring(0, 20) + '...');
  
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = 'Say "Hello! Google Gemini is working perfectly!" in a friendly way.';
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('\n✅ SUCCESS! Google Gemini is working!');
    console.log('Response:', text);
    console.log('\n🎉 Your AI assistant is now powered by FREE Google Gemini!');
  } catch (error) {
    console.log('\n❌ ERROR:');
    console.log('Message:', error.message);
    console.log('Status:', error.status);
    
    if (error.message.includes('API_KEY_INVALID')) {
      console.log('\n⚠️  Invalid API key. Please check your key at https://makersuite.google.com/app/apikey');
    } else if (error.message.includes('PERMISSION_DENIED')) {
      console.log('\n⚠️  Permission denied. Enable the Generative Language API in Google Cloud Console.');
    }
  }
}

testGemini();
