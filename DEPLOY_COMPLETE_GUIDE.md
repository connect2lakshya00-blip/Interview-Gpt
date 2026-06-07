# 🚀 Complete Deployment Guide - Step by Step

Follow these exact steps to deploy your project on Render!

---

## Part 1: Get Your Requirements Ready (10 minutes)

### Step 1: Get MongoDB Connection String

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create cluster (select M0 FREE)
4. Wait for cluster to be ready
5. Click "Connect" button
6. Select "Connect your application"
7. Copy the connection string (looks like this):
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/
   ```
8. **IMPORTANT:** Replace `<password>` with your actual password
9. **Save this string somewhere safe!**

### Step 2: Get Gemini API Key

1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Click "Create API key in new project"
5. **Copy the API key**
6. **Save it somewhere safe!**

### Step 3: Create Render Account

1. Go to https://render.com
2. Click "Get Started"
3. Sign up with GitHub
4. Authorize Render
5. You're now in Render Dashboard!

---

## Part 2: Deploy Backend (5 minutes)

### Step 1: Create Backend Service

1. In Render Dashboard, click **"New +"** (top right)
2. Select **"Web Service"**
3. You'll see "Connect a repository"
4. Find: **`connect2lakshya00-blip/Interview-Gpt`**
   - If you don't see it, click "Configure account" to grant access
5. Click **"Connect"** next to your repository

### Step 2: Configure Backend

Fill in these fields **EXACTLY**:

**Name:**
```
interviewgpt-api
```

**Region:**
- Select closest to you (e.g., Oregon, Frankfurt, Singapore)

**Branch:**
```
main
```

**Root Directory:** ⚠️ IMPORTANT!
```
backend
```
(Click the field and type `backend`)

**Runtime:**
- Should auto-select **Node**

**Build Command:**
```
npm install
```

**Start Command:**
```
npm start
```

**Instance Type:**
- Select **Free**

### Step 3: Add Environment Variables

Scroll down to "Environment Variables" section.

Click **"Add Environment Variable"** and add these **ONE BY ONE**:

**Variable 1:**
- Key: `MONGODB_URI`
- Value: `your-mongodb-connection-string-from-part1-step1`

**Variable 2:**
- Key: `JWT_SECRET`
- Value: `my-super-secret-jwt-key-12345678901234567890`
(Make this at least 32 characters)

**Variable 3:**
- Key: `GEMINI_API_KEY`
- Value: `your-gemini-api-key-from-part1-step2`

**Variable 4:**
- Key: `CLIENT_URL`
- Value: `https://localhost:3000`
(We'll update this later)

**Variable 5:**
- Key: `NODE_ENV`
- Value: `production`

**Variable 6:**
- Key: `PORT`
- Value: `10000`

### Step 4: Deploy Backend

1. Click **"Create Web Service"** (bottom of page)
2. Wait 3-5 minutes
3. Watch the logs scroll (it's deploying!)
4. When you see **"Your service is live"** ✅
5. **COPY YOUR BACKEND URL** from the top
   - It looks like: `https://interviewgpt-api.onrender.com`
   - **Save this URL!**

---

## Part 3: Deploy Frontend (7 minutes)

### Step 1: Create Frontend Service

1. Click **"New +"** (top right) again
2. Select **"Web Service"**
3. Find same repository: **`connect2lakshya00-blip/Interview-Gpt`**
4. Click **"Connect"**

### Step 2: Configure Frontend

Fill in these fields **EXACTLY**:

**Name:**
```
interviewgpt
```

**Region:**
- Select same region as backend

**Branch:**
```
main
```

**Root Directory:** ⚠️ IMPORTANT!
```
frontend
```
(Click the field and type `frontend`)

**Runtime:**
- Should auto-select **Node**

**Build Command:**
```
npm install && npm run build
```

**Start Command:**
```
npm start
```

**Instance Type:**
- Select **Free**

### Step 3: Add Environment Variable

Scroll down to "Environment Variables".

Click **"Add Environment Variable"**:

**Variable:**
- Key: `NEXT_PUBLIC_API_URL`
- Value: `your-backend-url-from-part2/api`
  
  Example: If your backend URL is `https://interviewgpt-api.onrender.com`
  
  Then enter: `https://interviewgpt-api.onrender.com/api`
  
  ⚠️ **Must end with `/api`**

### Step 4: Deploy Frontend

1. Click **"Create Web Service"**
2. Wait 5-7 minutes (frontend takes longer)
3. Watch logs
4. When you see **"Your service is live"** ✅
5. **COPY YOUR FRONTEND URL**
   - It looks like: `https://interviewgpt.onrender.com`
   - **This is your app URL!**

---

## Part 4: Final Configuration (3 minutes)

### Step 1: Update Backend CLIENT_URL

1. Go to your **backend service** (interviewgpt-api)
2. Click **"Environment"** in left sidebar
3. Find `CLIENT_URL`
4. Click the **pencil icon** (edit)
5. Change value to your **frontend URL**
   - Example: `https://interviewgpt.onrender.com`
6. Click **"Save Changes"**
7. Backend will automatically redeploy (wait 2-3 minutes)

### Step 2: Update MongoDB IP Whitelist

1. Go back to MongoDB Atlas tab
2. On left sidebar, click **"Network Access"**
3. Click **"+ ADD IP ADDRESS"**
4. Click **"ALLOW ACCESS FROM ANYWHERE"**
5. Click **"Confirm"**

---

## Part 5: Seed Your Database (2 minutes)

Run this command on your local computer:

```bash
cd backend
MONGODB_URI="your-mongodb-connection-string" npm run seed:dsa
```

Replace `your-mongodb-connection-string` with your actual MongoDB URI.

You should see:
```
✅ Connected to MongoDB
🗑️  Cleared existing problems
✅ Seeded 16 DSA problems
```

---

## ✅ Testing Your Deployment

### Test 1: Check Backend Health

1. Open browser
2. Go to: `https://your-backend-url.onrender.com/api/health`
3. You should see:
   ```json
   {"status":"OK","message":"InterviewGPT AI Server Running"}
   ```

### Test 2: Check Frontend

1. Go to your frontend URL: `https://your-frontend-url.onrender.com`
2. You should see your landing page! 🎉

### Test 3: Register & Login

1. Click "Get Started" or "Register"
2. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: Test123456
3. Click "Register"
4. You should be redirected to dashboard!

### Test 4: Check DSA Problems

1. Click "DSA Practice" in sidebar
2. You should see 16 problems!
3. Click "Solve Problem" on any problem
4. Try writing a solution
5. Click "Submit Solution"
6. You should see test results!

---

## 🎉 You're Live!

**Your URLs:**
- Frontend (share this!): `https://interviewgpt.onrender.com`
- Backend API: `https://interviewgpt-api.onrender.com`

---

## 🐛 Troubleshooting

### Problem: "Build failed" on Backend

**Solution:**
1. Go to backend service
2. Click "Logs"
3. Look for error message
4. Common fix: Check environment variables are correct

### Problem: "Build failed" on Frontend

**Solution:**
1. Check `NEXT_PUBLIC_API_URL` is correct
2. Must end with `/api`
3. Must start with `https://`

### Problem: Frontend loads but shows errors

**Solution:**
1. Open browser console (F12)
2. Look for CORS errors
3. Make sure backend `CLIENT_URL` matches frontend URL exactly
4. Must include `https://`

### Problem: Can't connect to MongoDB

**Solution:**
1. Check MongoDB Atlas "Network Access"
2. Make sure 0.0.0.0/0 is whitelisted
3. Check connection string is correct
4. Make sure password doesn't have special characters

### Problem: DSA problems don't show

**Solution:**
1. Run seed command again locally
2. Make sure MongoDB URI is correct
3. Check backend logs for database errors

### Problem: Services are slow/timing out

**Solution:**
- This is normal on Render free tier
- Services sleep after 15 minutes of inactivity
- Takes 30-60 seconds to wake up on first request
- Subsequent requests are fast

---

## 📱 Share Your Project!

Now that your project is live:

1. **LinkedIn:** Share your frontend URL with project description
2. **Portfolio:** Add it to your portfolio website
3. **Resume:** Include the live link
4. **GitHub README:** Add live demo link
5. **Twitter:** Tweet about your project!

---

## 🔄 Making Updates

Every time you push to GitHub, Render auto-deploys!

```bash
# Make your changes locally
git add .
git commit -m "Added new feature"
git push origin main

# Render automatically deploys! ✨
# Check deployment status in Render dashboard
```

---

## 💡 Important Notes

### Free Tier Limitations

- **Services sleep** after 15 min inactivity
- **First request** after sleep is slow (30-60 sec)
- **750 hours/month** per service
- **512 MB RAM** per service

### Keeping Services Awake (Optional)

Use UptimeRobot (free):
1. Sign up at https://uptimerobot.com
2. Add monitors for both URLs
3. Set ping interval to 5 minutes
4. Services stay awake!

### Upgrading (Optional)

If you want always-on services:
- Starter plan: $7/month per service
- No sleeping
- Better performance
- Good for production use

---

## 🎊 Congratulations!

You've successfully deployed your full-stack AI Interview Platform!

**What you deployed:**
- ✅ Complete backend API with AI integrations
- ✅ Beautiful Next.js frontend
- ✅ 16 DSA problems with code execution
- ✅ Authentication system
- ✅ AI-powered features
- ✅ Database with MongoDB Atlas
- ✅ Automatic HTTPS
- ✅ Auto-deploy from GitHub

**This is a production-ready application that you can:**
- Share with recruiters
- Add to your portfolio
- Include in job applications
- Use as a learning platform
- Expand with more features

---

## 📞 Need Help?

If you get stuck:
1. Check Render logs (Logs tab in dashboard)
2. Check browser console (F12)
3. Review this guide again
4. Check MongoDB Atlas connection
5. Verify all environment variables

---

**You did it! Your project is live! 🚀🎉**
