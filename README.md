# 🚀 InterviewGPT AI - Futuristic AI Interview Platform

<div align="center">

![InterviewGPT AI](https://img.shields.io/badge/InterviewGPT-AI%20Powered-blue?style=for-the-badge&logo=openai)
![MERN Stack](https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge)
![Production Ready](https://img.shields.io/badge/Production-Ready-success?style=for-the-badge)

**A production-grade AI-powered SaaS platform for interview preparation with stunning futuristic UI/UX**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Demo](#-demo)

</div>

---

## 🎯 Overview

**InterviewGPT AI** is a comprehensive, full-stack interview preparation platform that leverages cutting-edge AI technology to help job seekers master interviews. Built with the MERN stack and integrated with OpenAI GPT-4, LangChain, and Pinecone, it offers a premium, futuristic user experience that rivals billion-dollar AI startups.

### 🌟 Why This Project Stands Out

- ✅ **Production-Ready**: Enterprise-grade architecture and security
- ✅ **AI-Powered**: Advanced GPT-4 integration for intelligent feedback
- ✅ **Modern UI/UX**: Stunning glassmorphism and neon effects
- ✅ **Full-Stack**: Complete MERN implementation
- ✅ **Scalable**: Cloud-ready with MongoDB Atlas and Vercel
- ✅ **Portfolio-Worthy**: Demonstrates advanced technical skills

---

## ✨ Features

### 🤖 AI-Powered Core Features

| Feature | Description | Technology |
|---------|-------------|------------|
| **Resume Analyzer** | Upload resume, get ATS score & AI feedback | GPT-4, pdf-parse |
| **HR Interview** | Practice behavioral questions with AI | GPT-4, NLP |
| **Technical Interview** | Master React, Node.js, MongoDB concepts | GPT-4 |
| **DSA Practice** | Data structures & algorithms problems | AI-generated |
| **Voice Interview** | AI voice interaction practice | Web Speech API |
| **Coding IDE** | Live code editor with AI review | Monaco Editor |
| **RAG System** | Upload docs, ask questions | LangChain, Pinecone |
| **Analytics** | Track performance & progress | MongoDB Aggregation |

### 🎨 Premium UI/UX Features

- **Cinematic Dark Theme**: Professional black backgrounds
- **Glassmorphism**: Modern frosted glass effects
- **Neon Glow Effects**: AI-inspired lighting
- **Smooth Animations**: Framer Motion powered
- **Floating Orbs**: Dynamic gradient backgrounds
- **Responsive Design**: Mobile-first approach
- **Interactive Elements**: Hover effects & transitions

---

## 🛠️ Tech Stack

### Frontend
```
Next.js 14 • React 18 • TypeScript • Tailwind CSS
Framer Motion • Zustand • Axios • Monaco Editor
ShadCN UI • Lucide Icons • Recharts
```

### Backend
```
Node.js • Express.js • MongoDB • Mongoose
JWT • Bcrypt • Multer • Helmet • Morgan
```

### AI/ML
```
OpenAI GPT-4 • LangChain • Pinecone
Vector Embeddings • RAG Architecture
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free)
- OpenAI API key

### Installation

```bash
# 1. Clone repository
git clone <your-repo-url>
cd interviewgpt-ai

# 2. Install all dependencies
npm run install-all

# 3. Setup environment variables
# Backend: Copy backend/.env.example to backend/.env
# Frontend: Copy frontend/.env.local.example to frontend/.env.local

# 4. Start development servers
npm run dev
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Environment Setup

**Backend (.env):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/interviewgpt
JWT_SECRET=your_super_secret_jwt_key
OPENAI_API_KEY=sk-your-openai-api-key
PINECONE_API_KEY=your-pinecone-key (optional)
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

📖 **Detailed Setup**: See [QUICKSTART.md](QUICKSTART.md) for step-by-step guide

---

## 📁 Project Structure

```
interviewgpt-ai/
├── frontend/                    # Next.js Frontend
│   ├── app/                    # Pages & Routes
│   │   ├── page.tsx           # Landing Page
│   │   ├── login/             # Authentication
│   │   ├── register/          # Registration
│   │   └── dashboard/         # Main Dashboard
│   │       ├── resume/        # Resume Analyzer
│   │       ├── hr-interview/  # HR Practice
│   │       ├── technical/     # Technical Interview
│   │       ├── dsa/           # DSA Practice
│   │       ├── voice/         # Voice Interview
│   │       ├── knowledge/     # RAG System
│   │       ├── analytics/     # Performance Tracking
│   │       └── settings/      # User Settings
│   ├── components/            # React Components
│   ├── lib/                   # Utilities & API
│   └── package.json
│
├── backend/                    # Express.js Backend
│   ├── controllers/           # Request Handlers
│   ├── models/                # MongoDB Schemas
│   ├── routes/                # API Routes
│   ├── services/              # Business Logic
│   │   ├── aiService.js      # OpenAI Integration
│   │   └── vectorService.js  # Pinecone Integration
│   ├── middleware/            # Auth, Upload, etc.
│   ├── uploads/               # File Storage
│   └── server.js              # Entry Point
│
├── QUICKSTART.md              # 5-min setup guide
├── SETUP.md                   # Detailed setup
├── DEPLOYMENT.md              # Production deployment
├── FEATURES.md                # Feature documentation
├── PROJECT_SUMMARY.md         # Complete overview
└── README.md                  # This file
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [QUICKSTART.md](QUICKSTART.md) | Get started in 5 minutes |
| [SETUP.md](SETUP.md) | Detailed development setup |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Production deployment guide |
| [FEATURES.md](FEATURES.md) | Complete feature documentation |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Technical deep dive |

---

## 🎨 Design Philosophy

### Visual Identity
- **Futuristic Dark Theme**: Cinematic black backgrounds (#050505)
- **Glassmorphism**: Frosted glass effects with blur
- **Neon Gradients**: Blue (#3b82f6) to Purple (#8b5cf6)
- **AI-Inspired**: Glowing effects and floating orbs
- **Premium Feel**: Apple + OpenAI + Linear aesthetics

### Inspiration
- Apple's minimalist design language
- OpenAI's modern AI interface
- Linear's smooth animations
- Vercel's clean aesthetics

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register      # Register user
POST   /api/auth/login         # Login user
GET    /api/auth/me            # Get current user
PUT    /api/auth/profile       # Update profile
```

### Resume
```
POST   /api/resume/upload      # Upload & analyze
GET    /api/resume             # Get all resumes
GET    /api/resume/:id         # Get by ID
DELETE /api/resume/:id         # Delete resume
```

### Interview
```
POST   /api/interview/generate        # Generate interview
POST   /api/interview/submit-answer   # Submit answer
POST   /api/interview/complete        # Complete interview
GET    /api/interview                 # Get all interviews
GET    /api/interview/:id             # Get by ID
```

### Analytics
```
GET    /api/analytics/dashboard       # Dashboard stats
GET    /api/analytics/performance     # Performance data
```

### RAG (Knowledge Base)
```
POST   /api/rag/upload         # Upload document
POST   /api/rag/query          # Query knowledge
GET    /api/rag/documents      # Get documents
DELETE /api/rag/documents/:id  # Delete document
```

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### Backend (Railway)
```bash
cd backend
railway up
```

### Database (MongoDB Atlas)
- Create free cluster
- Whitelist IPs
- Get connection string

📖 **Full Guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 🔐 Security Features

- ✅ JWT Authentication
- ✅ Bcrypt Password Hashing
- ✅ Rate Limiting
- ✅ CORS Protection
- ✅ Helmet.js Security Headers
- ✅ Input Validation
- ✅ XSS Protection
- ✅ File Upload Restrictions

---

## 📊 Database Schema

### User Model
```javascript
{
  name, email, password, profileImage,
  skills: [String],
  subscription: 'free' | 'pro' | 'enterprise',
  interviewsCompleted: Number,
  dailyStreak: Number
}
```

### Interview Model
```javascript
{
  userId, type, category, difficulty,
  questions: [{ question, answer, feedback, score }],
  overallScore: Number,
  feedback: { confidence, communication, technical }
}
```

### Resume Model
```javascript
{
  userId, fileName, extractedText,
  analysis: { skills, strengths, weaknesses },
  atsScore: Number,
  aiGeneratedQuestions: [...]
}
```

---

## 🎯 Key Features Showcase

### 1. AI Resume Analyzer
- Upload PDF/DOCX resume
- Get instant ATS score (0-100)
- AI extracts skills automatically
- Identifies strengths & weaknesses
- Generates personalized interview questions

### 2. Smart Interview System
- Multiple types: HR, Technical, DSA
- AI-generated questions
- Real-time answer analysis
- Detailed feedback with scores
- Progress tracking

### 3. RAG Knowledge Base
- Upload personal documents
- Vector embeddings with Pinecone
- Semantic search
- AI-powered answers
- Context-aware responses

### 4. Analytics Dashboard
- Performance metrics
- Score trends over time
- Skill weakness detection
- Daily streak tracking
- AI-powered insights

---

## 💡 Use Cases

- 🎓 **Students**: Prepare for campus placements
- 💼 **Job Seekers**: Practice for interviews
- 🔄 **Career Switchers**: Learn new technologies
- 📈 **Professionals**: Upskill and improve
- 🏢 **Companies**: Train employees

---

## 🏆 What Makes This Special

### Technical Excellence
- ✅ Production-grade architecture
- ✅ Scalable MERN stack
- ✅ Advanced AI integration
- ✅ Clean code & best practices
- ✅ Comprehensive documentation

### Design Excellence
- ✅ Stunning futuristic UI
- ✅ Smooth animations
- ✅ Responsive design
- ✅ Premium aesthetics
- ✅ Intuitive UX

### Business Value
- ✅ Real-world application
- ✅ Monetization ready
- ✅ Scalable infrastructure
- ✅ Market-ready product
- ✅ Portfolio showcase

---

## 📈 Performance

- ⚡ Fast load times (< 2s)
- 🎯 60fps animations
- 📱 Mobile optimized
- 🔄 Real-time updates
- 💾 Efficient caching

---

## 🤝 Contributing

This is a portfolio project, but suggestions are welcome!

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

---

## 📄 License

MIT License - feel free to use for learning and portfolio purposes.

---

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Full-stack MERN development
- ✅ AI/ML integration (OpenAI, LangChain)
- ✅ Vector databases (Pinecone)
- ✅ Modern UI/UX design
- ✅ Authentication & security
- ✅ RESTful API design
- ✅ Database modeling
- ✅ State management
- ✅ File handling
- ✅ Deployment & DevOps

---

## 🌟 Showcase

Perfect for:
- 💼 Job applications
- 🎓 Final year projects
- 📊 Portfolio websites
- 🏆 Hackathons
- 📚 Learning MERN + AI

---

## 📞 Support

- 📖 Check [Documentation](#-documentation)
- 🐛 Report issues
- 💡 Suggest features
- ⭐ Star this repo

---

<div align="center">

**Built with ❤️ using MERN Stack + AI**

⭐ Star this repo if you find it helpful!

[Get Started](#-quick-start) • [View Docs](#-documentation) • [Deploy](#-deployment)

</div>
