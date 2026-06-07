# ⚡ Vercel Deployment - 5 Minute Quick Start

Deploy your InterviewGPT AI platform in 5 minutes!

---

## 🎯 What You Need

1. **Vercel Account** - https://vercel.com (free, sign up with GitHub)
2. **MongoDB Atlas** - https://mongodb.com/cloud/atlas (free tier)
3. **Gemini API Key** - https://makersuite.google.com/app/apikey (free)

---

## 🚀 3-Step Deployment

### Step 1: MongoDB Setup (2 minutes)

1. Go to https://mongodb.com/cloud/atlas
2. Create free account
3. Create cluster (click "Build a Database" → "M0 FREE")
4. Wait for cluster to be created
5. Click "Connect" → "Connect your application"
6. Copy connection string
7. Replace `<password>` with your password
8. **Save this string!**

### Step 2: Deploy Backend (1 minute)

1. Go to https://vercel.com/new
2. Import: `connect2lakshya00-blip/Interview-Gpt`
3. **Project Name:** `interviewgpt-api`
4. **Root Directory:** `backend` ← Click Edit and select this
5. **Add Environment Variables:**
   ```
   MONGODB_URI = your-mongodb-connection-string
   JWT_SECRET = any-random-32-character-string
   GEMINI_API_KEY = your-gemini-key
   CLIENT_URL = https://localhost:3000
   ```
6. Click **Deploy**
7. Wait 2 minutes
8. **Copy the URL** (e.g., `https://interviewgpt-api.vercel.app`)

### Step 3: Deploy Frontend (1 minute)

1. Go to https://vercel.com/new again
2. Import: `connect2lakshya00-blip/Interview-Gpt` (same repo)
3. **Project Name:** `interviewgpt`
4. **Root Directory:** `frontend` ← Click Edit and select this
5. **Add Environment Variable:**
   ```
   NEXT_PUBLIC_API_URL = https://your-backend-url.vercel.app/api
   ```
   (Use URL from Step 2)
6. Click **Deploy**
7. Wait 2 minutes
8. **Your app is live!** 🎉

---

## 🔄 Final Update (1 minute)

1. Go to your **backend project** settings
2. Environment Variables → Edit `CLIENT_URL`
3. Change to your **frontend URL** from Step 3
4. Go to Deployments → Redeploy

---

## ✅ Test It!

Visit your frontend URL and:
1. Register an account
2. Login
3. Go to DSA Practice
4. Try solving "Two Sum"

---

## 🐛 Quick Fixes

**No problems showing in DSA?**
```bash
cd backend
MONGODB_URI="your-atlas-uri" npm run seed:dsa
```

**MongoDB connection fails?**
- MongoDB Atlas → Network Access → Add IP: `0.0.0.0/0`

**CORS errors?**
- Check CLIENT_URL matches frontend URL exactly
- Redeploy backend

---

## 📱 Your Live URLs

**Backend:** `https://interviewgpt-api.vercel.app`
**Frontend:** `https://interviewgpt.vercel.app`

**Share your frontend URL!** That's your live app! 🚀

---

## 🎓 What's Deployed

✅ Full-stack AI Interview Platform
✅ 16 DSA Problems with code execution
✅ AI-powered interviews
✅ Resume analysis
✅ Knowledge base
✅ Career chatbot
✅ Leaderboard
✅ Analytics

---

## 💡 Next Steps

- Add custom domain (optional)
- Share on LinkedIn
- Add to portfolio
- Include in resume
- Get user feedback

---

**That's it! Your project is live in 5 minutes! 🎊**

For detailed troubleshooting, see `DEPLOY_TO_VERCEL.md`
