# ⚡ Render Deployment - 10 Minute Quick Start

Deploy your InterviewGPT AI platform to Render in 10 minutes!

---

## 🎯 What You Need

1. **Render Account** - https://render.com (free, sign up with GitHub)
2. **MongoDB Atlas** - https://mongodb.com/cloud/atlas (free tier)
3. **Gemini API Key** - https://makersuite.google.com/app/apikey (free)

---

## 🚀 4-Step Deployment

### Step 1: MongoDB Setup (2 minutes)

1. Go to https://mongodb.com/cloud/atlas
2. Create free account
3. Create cluster → "M0 FREE"
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Replace `<password>` with your password
7. **Save this!**

### Step 2: Create Render Account (1 minute)

1. Go to https://render.com
2. Click "Get Started"
3. Sign up with GitHub
4. Authorize Render

### Step 3: Deploy Backend (3 minutes)

1. **From Render Dashboard:**
   - Click "New +" → "Web Service"
   - Connect repo: `connect2lakshya00-blip/Interview-Gpt`

2. **Configure:**
   - **Name:** `interviewgpt-api`
   - **Root Directory:** `backend` ← Important!
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

3. **Add Environment Variables** (click "Advanced"):
   ```
   MONGODB_URI = your-mongodb-connection-string
   JWT_SECRET = any-random-32-character-string
   GEMINI_API_KEY = your-gemini-key
   CLIENT_URL = https://localhost:3000
   NODE_ENV = production
   PORT = 10000
   ```

4. Click "Create Web Service"
5. Wait 3-5 minutes
6. **Copy URL:** `https://interviewgpt-api.onrender.com`

### Step 4: Deploy Frontend (3 minutes)

1. **From Render Dashboard:**
   - Click "New +" → "Web Service"
   - Connect same repo again

2. **Configure:**
   - **Name:** `interviewgpt`
   - **Root Directory:** `frontend` ← Important!
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

3. **Add Environment Variable:**
   ```
   NEXT_PUBLIC_API_URL = https://your-backend-url.onrender.com/api
   ```
   (Use URL from Step 3.6)

4. Click "Create Web Service"
5. Wait 5-7 minutes
6. **Your app is live!** 🎉

---

## 🔄 Final Updates (2 minutes)

### Update Backend CLIENT_URL

1. Go to backend service
2. Click "Environment"
3. Edit `CLIENT_URL` → Your frontend URL
4. Save (auto-redeploys)

### Update MongoDB IP Whitelist

1. MongoDB Atlas → Network Access
2. Add IP → "Allow Access from Anywhere" (0.0.0.0/0)
3. Confirm

### Seed Database

```bash
cd backend
MONGODB_URI="your-atlas-uri" npm run seed:dsa
```

---

## ✅ Test Your App!

1. Visit your frontend URL
2. Register new account
3. Login
4. Go to DSA Practice
5. Solve "Two Sum"
6. All features work! 🎉

---

## 🐛 Quick Fixes

**Build failed?**
- Check logs in Render dashboard
- Verify root directory is correct

**MongoDB won't connect?**
- Add 0.0.0.0/0 to IP whitelist
- Check connection string

**CORS errors?**
- Verify CLIENT_URL matches frontend URL
- Include https://

**API 404?**
- Check NEXT_PUBLIC_API_URL ends with `/api`

---

## 💡 Render Free Tier Notes

- ✅ 750 hours/month per service
- ⚠️ Services sleep after 15 min inactivity
- ⏱️ Takes 30-60 sec to wake up
- ✅ Perfect for portfolio/demo

**Tip:** First load after sleep is slow - this is normal!

---

## 📱 Your Live URLs

**Backend:** `https://interviewgpt-api.onrender.com`
**Frontend:** `https://interviewgpt.onrender.com`

**Share your frontend URL!** 🚀

---

## 🎓 What's Deployed

✅ Full AI Interview Platform
✅ 16 DSA Problems
✅ Code execution engine
✅ AI interviews & chatbot
✅ Resume analysis
✅ Leaderboard
✅ All features working

---

## 🔄 Auto-Deploy

Push to GitHub = Auto-deploy!

```bash
git add .
git commit -m "Update"
git push origin main
# Render deploys automatically! ✨
```

---

## 💰 Free vs Paid

**Free Tier:**
- Sleeps after inactivity
- 512 MB RAM
- Perfect for learning/portfolio

**Starter ($7/month):**
- Always on
- No sleeping
- Better for production

---

## 🎉 You're Live!

Your full-stack AI platform is deployed!

**Next steps:**
- Share on LinkedIn
- Add to portfolio
- Include in resume
- Get feedback
- Iterate and improve

---

**That's it! Deployed in 10 minutes! 🎊**

For detailed troubleshooting, see `RENDER_DEPLOYMENT_GUIDE.md`
