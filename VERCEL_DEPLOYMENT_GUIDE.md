# 🚀 Vercel Deployment Guide - InterviewGPT AI

Complete guide to deploy your full-stack application (Frontend + Backend) to Vercel.

---

## 📋 Prerequisites

1. ✅ GitHub repository (already done!)
2. ✅ Vercel account (free tier works)
3. ✅ MongoDB Atlas account (free tier)
4. ✅ API keys (Gemini, OpenAI, Pinecone, etc.)

---

## 🎯 Deployment Strategy

Since you have a **monorepo** with both frontend and backend, we have **two options**:

### Option 1: Deploy Separately (RECOMMENDED)
- Frontend on Vercel
- Backend on Vercel (as serverless functions)
- Two separate deployments

### Option 2: Deploy as Monorepo
- Single deployment with routing
- More complex configuration

**We'll use Option 1 for better performance and easier management.**

---

## 🚀 Step-by-Step Deployment

### Part 1: Deploy Backend API

#### Step 1: Prepare Backend for Vercel

The backend needs minor adjustments for serverless deployment. Let me create an API entry point:

**File: `backend/api/index.js`** (We'll create this)

This will be the serverless function entry point.

#### Step 2: Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster (if not already done)
3. Click "Connect" → "Connect your application"
4. Copy connection string
5. Replace `<password>` with your password
6. Keep this for Vercel environment variables

#### Step 3: Deploy Backend to Vercel

**Via Vercel CLI:**
```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to backend
cd backend

# Login to Vercel
vercel login

# Deploy
vercel
```

**Via Vercel Dashboard:**
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import from GitHub: `connect2lakshya00-blip/Interview-Gpt`
4. **Root Directory:** Set to `backend`
5. **Framework Preset:** Other
6. Click "Deploy"

#### Step 4: Configure Backend Environment Variables

In Vercel Dashboard → Your Backend Project → Settings → Environment Variables

Add these variables:
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_random_string_here
PORT=5000

# AI APIs
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
GROQ_API_KEY=your_groq_api_key

# Pinecone (if using)
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment
PINECONE_INDEX_NAME=your_index_name

# URLs
CLIENT_URL=https://your-frontend-url.vercel.app
```

#### Step 5: Note Your Backend URL

After deployment, Vercel will give you a URL like:
```
https://interview-gpt-api.vercel.app
```
Keep this for the frontend configuration.

---

### Part 2: Deploy Frontend

#### Step 1: Update Frontend Environment Variables

Create/Update `frontend/.env.production` (local file, not in git):
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app/api
```

#### Step 2: Deploy Frontend to Vercel

**Via Vercel CLI:**
```bash
# Navigate to frontend
cd frontend

# Deploy
vercel
```

**Via Vercel Dashboard:**
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import from GitHub: `connect2lakshya00-blip/Interview-Gpt`
4. **Root Directory:** Set to `frontend`
5. **Framework Preset:** Next.js (auto-detected)
6. Click "Deploy"

#### Step 3: Configure Frontend Environment Variables

In Vercel Dashboard → Your Frontend Project → Settings → Environment Variables

Add:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app/api
```

#### Step 4: Redeploy

After adding environment variables, trigger a new deployment:
- Go to Deployments tab
- Click "..." on latest deployment
- Click "Redeploy"

---

## 🔧 Alternative: Backend Serverless Configuration

If you want the backend as true serverless functions, create:

**File: `backend/api/server.js`**

```javascript
const app = require('../server');

module.exports = app;
```

And update `backend/vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/api/server.js"
    }
  ]
}
```

---

## 📝 Quick Deployment Commands

### Deploy Backend
```bash
cd backend
vercel --prod
```

### Deploy Frontend
```bash
cd frontend
vercel --prod
```

### Both at once (from root)
```bash
# Backend
cd backend && vercel --prod && cd ..

# Frontend  
cd frontend && vercel --prod && cd ..
```

---

## 🔐 Environment Variables Checklist

### Backend (.env on Vercel)
- [x] `MONGODB_URI` - MongoDB Atlas connection string
- [x] `JWT_SECRET` - Random secure string (min 32 chars)
- [x] `GEMINI_API_KEY` - Google Gemini API key
- [x] `OPENAI_API_KEY` - OpenAI API key (optional)
- [x] `GROQ_API_KEY` - Groq API key (optional)
- [x] `PINECONE_API_KEY` - Pinecone API key
- [x] `PINECONE_ENVIRONMENT` - Pinecone environment
- [x] `PINECONE_INDEX_NAME` - Your index name
- [x] `CLIENT_URL` - Your frontend Vercel URL

### Frontend (.env on Vercel)
- [x] `NEXT_PUBLIC_API_URL` - Your backend Vercel URL + /api

---

## 🎯 Post-Deployment Steps

### 1. Test API Health
```bash
curl https://your-backend-url.vercel.app/api/health
```

Should return:
```json
{"status":"OK","message":"InterviewGPT AI Server Running"}
```

### 2. Seed DSA Problems

You can't run `npm run seed:dsa` on Vercel directly. Instead:

**Option A: Run locally once**
```bash
# Use production MongoDB
MONGODB_URI=your_atlas_uri npm run seed:dsa
```

**Option B: Create API endpoint**
Create a protected admin endpoint to seed database.

### 3. Update CORS Settings

Make sure backend allows your frontend URL:
```javascript
// backend/server.js
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
```

### 4. Test Authentication Flow
1. Go to your frontend URL
2. Register a new account
3. Login
4. Check if JWT works

### 5. Test All Features
- [ ] Authentication works
- [ ] DSA problems load
- [ ] Can submit code solutions
- [ ] Resume upload works
- [ ] AI interviews work
- [ ] Chatbot responds
- [ ] Leaderboard displays

---

## 🐛 Common Issues & Solutions

### Issue 1: CORS Errors
**Solution:** Update backend CORS to include your frontend URL
```javascript
cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend.vercel.app'
  ],
  credentials: true
})
```

### Issue 2: API Routes 404
**Solution:** Ensure API URL includes `/api` path
```
NEXT_PUBLIC_API_URL=https://backend.vercel.app/api
```

### Issue 3: Environment Variables Not Working
**Solution:** 
1. Check variable names match exactly
2. Redeploy after adding variables
3. Use `NEXT_PUBLIC_` prefix for client-side variables

### Issue 4: MongoDB Connection Timeout
**Solution:**
1. Check MongoDB Atlas IP whitelist
2. Add `0.0.0.0/0` to allow all (Vercel IPs change)
3. Check connection string is correct

### Issue 5: File Uploads Don't Work
**Solution:** Vercel serverless functions have file size limits
- Use cloud storage (S3, Cloudinary)
- Or use Vercel Blob Storage

### Issue 6: Cold Starts
**Solution:** 
- Use Vercel Pro for faster cold starts
- Implement warming function
- Cache database connections

---

## 📊 Vercel Limits (Free Tier)

- **Bandwidth:** 100GB/month
- **Invocations:** 100GB-hrs/month
- **Build Time:** 6000 minutes/month
- **Serverless Function:** 10s timeout
- **Serverless Function Size:** 50MB

For your project, free tier should be sufficient for testing/portfolio.

---

## 🎨 Custom Domain (Optional)

### Add Custom Domain to Frontend
1. Go to Frontend Project → Settings → Domains
2. Add your domain (e.g., `interviewgpt.com`)
3. Configure DNS with your provider
4. Vercel auto-provisions SSL

### Add Custom Domain to Backend
1. Go to Backend Project → Settings → Domains
2. Add subdomain (e.g., `api.interviewgpt.com`)
3. Update frontend env: `NEXT_PUBLIC_API_URL=https://api.interviewgpt.com/api`

---

## 🔄 CI/CD Setup

Vercel automatically deploys on every push to `main` branch!

**Workflow:**
1. Make changes locally
2. `git add .`
3. `git commit -m "Your changes"`
4. `git push origin main`
5. Vercel auto-deploys ✨

**Configure Branches:**
- `main` → Production
- `dev` → Preview deployments
- Pull requests → Preview deployments

---

## 📱 Deployment Checklist

### Before Deploying
- [x] Push code to GitHub
- [x] Create Vercel account
- [x] Set up MongoDB Atlas
- [x] Get all API keys
- [x] Test locally

### Backend Deployment
- [ ] Deploy backend to Vercel
- [ ] Add environment variables
- [ ] Test API health endpoint
- [ ] Note backend URL
- [ ] Seed database (if needed)

### Frontend Deployment
- [ ] Update API URL in env
- [ ] Deploy frontend to Vercel
- [ ] Add environment variables
- [ ] Test in browser
- [ ] Verify all features work

### Post-Deployment
- [ ] Test authentication
- [ ] Test DSA problems
- [ ] Test file uploads
- [ ] Test AI features
- [ ] Check error logs
- [ ] Monitor performance

---

## 🎯 Quick Start (TL;DR)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy Backend
cd backend
vercel --prod
# Note the URL: https://xxx.vercel.app

# 4. Deploy Frontend
cd ../frontend
# Add backend URL to .env.local
echo "NEXT_PUBLIC_API_URL=https://xxx.vercel.app/api" > .env.local
vercel --prod

# 5. Configure environment variables on Vercel dashboard
# 6. Redeploy both projects
# 7. Done! 🎉
```

---

## 📞 Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js on Vercel:** https://vercel.com/docs/frameworks/nextjs
- **Node.js on Vercel:** https://vercel.com/docs/functions/serverless-functions/runtimes/node-js
- **Vercel CLI Docs:** https://vercel.com/docs/cli

---

## 🎉 Your URLs

After deployment, you'll have:

**Frontend:** `https://interview-gpt-frontend.vercel.app`
**Backend API:** `https://interview-gpt-api.vercel.app`

Share your frontend URL - that's your live app! 🚀

---

## 🔒 Security Reminders

1. ✅ Never commit `.env` files
2. ✅ Use environment variables on Vercel
3. ✅ Rotate API keys regularly
4. ✅ Keep dependencies updated
5. ✅ Monitor Vercel logs for errors
6. ✅ Set up MongoDB IP whitelist properly
7. ✅ Use strong JWT secret

---

**Ready to deploy? Let's go! 🚀**
