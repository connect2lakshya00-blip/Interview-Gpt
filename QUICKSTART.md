# ⚡ Quick Start Guide - InterviewGPT AI

Get up and running in 5 minutes!

## 🚀 Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free)
- OpenAI API key

## 📦 Installation

```bash
# 1. Install dependencies
npm run install-all

# This installs:
# - Root dependencies
# - Frontend dependencies (Next.js, React, etc.)
# - Backend dependencies (Express, MongoDB, etc.)
```

## ⚙️ Configuration

### Backend Setup

```bash
# 1. Navigate to backend
cd backend

# 2. Create .env file
cp .env.example .env

# 3. Edit .env with your credentials
```

**Required Environment Variables:**

```env
# MongoDB (Get from MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/interviewgpt

# JWT Secret (Generate a random string)
JWT_SECRET=your_super_secret_key_here

# OpenAI API Key (Get from platform.openai.com)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Optional: Pinecone for RAG features
PINECONE_API_KEY=your-pinecone-key
PINECONE_ENVIRONMENT=your-environment
PINECONE_INDEX=interviewgpt-knowledge
```

### Frontend Setup

```bash
# 1. Navigate to frontend
cd frontend

# 2. Create .env.local file
cp .env.local.example .env.local

# 3. Edit .env.local
```

**Required Environment Variables:**

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🎯 Get API Keys

### MongoDB Atlas (Free)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up → Create Free Cluster
3. Create Database User
4. Whitelist IP: 0.0.0.0/0
5. Get Connection String
6. Replace `<password>` and `<dbname>`

### OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up/Login
3. Go to API Keys
4. Create New Secret Key
5. Copy key (starts with `sk-`)
6. Add $5+ credits in Billing

## 🏃 Run the Application

```bash
# From root directory
npm run dev
```

This starts:
- ✅ Backend: http://localhost:5000
- ✅ Frontend: http://localhost:3000

## 🎨 Access the Application

1. Open browser: http://localhost:3000
2. Click "Get Started" or "Register"
3. Create account
4. Start using features!

## 🧪 Test the Setup

### Test Backend

```bash
# In new terminal
curl http://localhost:5000/api/health

# Should return: {"status":"OK","message":"InterviewGPT AI Server Running"}
```

### Test Frontend

1. Visit http://localhost:3000
2. Should see landing page with animations
3. Click "Get Started"
4. Register new account
5. Login to dashboard

## 📱 First Steps

### 1. Upload Resume
- Go to "Resume Analyzer"
- Upload your PDF/DOCX resume
- Get instant AI analysis

### 2. Start Interview
- Go to "HR Interview"
- Click "Start Interview"
- Answer questions
- Get AI feedback

### 3. View Analytics
- Go to "Analytics"
- See your performance metrics
- Track progress

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill port 5000
npx kill-port 5000

# Kill port 3000
npx kill-port 3000
```

### MongoDB Connection Error

- Check MongoDB URI format
- Verify username/password
- Ensure IP is whitelisted (0.0.0.0/0)
- Check cluster is running

### OpenAI API Error

- Verify API key is correct
- Check you have credits ($5 minimum)
- Ensure key has proper permissions

### Module Not Found

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
cd frontend && rm -rf node_modules package-lock.json && npm install
cd ../backend && rm -rf node_modules package-lock.json && npm install
```

## 📚 Next Steps

1. ✅ Explore all features
2. ✅ Customize branding
3. ✅ Add your own questions
4. ✅ Deploy to production (see DEPLOYMENT.md)

## 🎯 Key Features to Try

### Resume Analyzer
- Upload resume → Get ATS score
- See extracted skills
- Get AI-generated interview questions

### HR Interview
- Practice behavioral questions
- Get instant AI feedback
- Track your scores

### Technical Interview
- Choose technology (React, Node, etc.)
- Select difficulty level
- Practice technical concepts

### Analytics
- View performance metrics
- Track improvement over time
- Identify weak areas

## 💡 Pro Tips

1. **Use Real Resume**: Upload your actual resume for personalized questions
2. **Practice Daily**: Build a streak for better results
3. **Review Feedback**: Learn from AI suggestions
4. **Try All Types**: Practice HR, Technical, and DSA interviews
5. **Track Progress**: Use analytics to measure improvement

## 🆘 Need Help?

### Documentation
- 📖 [SETUP.md](SETUP.md) - Detailed setup guide
- 🚀 [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment
- ✨ [FEATURES.md](FEATURES.md) - All features explained
- 📊 [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Complete overview

### Common Issues
- MongoDB connection → Check URI and IP whitelist
- OpenAI errors → Verify API key and credits
- Port conflicts → Kill processes on ports 3000/5000
- Module errors → Reinstall dependencies

## 🎉 You're Ready!

Your InterviewGPT AI platform is now running!

**Frontend**: http://localhost:3000
**Backend**: http://localhost:5000

Start practicing and ace your interviews! 🚀

---

**Questions?** Check the documentation files or review the code comments.
