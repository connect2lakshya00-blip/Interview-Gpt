# 🚀 Quick Deploy to Vercel - Step by Step

Follow these simple steps to deploy your InterviewGPT AI platform to Vercel.

---

## 📋 Prerequisites Checklist

Before deploying, make sure you have:

- [x] GitHub repository (✅ Already done!)
- [ ] Vercel account (Create at https://vercel.com)
- [ ] MongoDB Atlas account (Create at https://www.mongodb.com/cloud/atlas)
- [ ] API Keys ready:
  - Gemini API Key (https://makersuite.google.com/app/apikey)
  - OpenAI API Key (optional - https://platform.openai.com/api-keys)
  - Groq API Key (optional - https://console.groq.com)
  - Pinecone API Key (optional - https://www.pinecone.io)

---

## 🎯 Method 1: Deploy via Vercel Dashboard (EASIEST)

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Click "Sign Up"
3. Sign up with GitHub
4. Authorize Vercel to access your repositories

### Step 2: Set Up MongoDB Atlas
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up/Login
3. Create a new FREE cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster.mongodb.net/`)
6. Replace `<password>` with your actual password
7. Save this connection string - you'll need it

### Step 3: Deploy Backend

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New..." → "Project"

2. **Import Repository**
   - Find "connect2lakshya00-blip/Interview-Gpt"
   - Click "Import"

3. **Configure Backend**
   - **Project Name:** `interviewgpt-api` (or any name)
   - **Framework Preset:** Other
   - **Root Directory:** Click "Edit" → Select `backend`
   - **Build Command:** Leave empty
   - **Output Directory:** Leave empty
   - **Install Command:** `npm install`

4. **Add Environment Variables** (Click "Environment Variables")
   
   Add these one by one:
   
   **Required:**
   ```
   Name: MONGODB_URI
   Value: mongodb+srv://your-connection-string
   
   Name: JWT_SECRET
   Value: your-super-secret-key-min-32-characters-long
   
   Name: GEMINI_API_KEY
   Value: your-gemini-api-key
   
   Name: CLIENT_URL
   Value: https://localhost:3000 (we'll update this after frontend deploy)
   
   Name: NODE_ENV
   Value: production
   ```
   
   **Optional (if you have them):**
   ```
   Name: OPENAI_API_KEY
   Value: your-openai-key
   
   Name: GROQ_API_KEY
   Value: your-groq-key
   
   Name: PINECONE_API_KEY
   Value: your-pinecone-key
   
   Name: PINECONE_ENVIRONMENT
   Value: your-pinecone-environment
   
   Name: PINECONE_INDEX_NAME
   Value: your-index-name
   ```

5. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes
   - ✅ Backend deployed!
   - Copy your backend URL (e.g., `https://interviewgpt-api.vercel.app`)

### Step 4: Deploy Frontend

1. **Add New Project Again**
   - Go back to Vercel Dashboard
   - Click "Add New..." → "Project"
   - Import `connect2lakshya00-blip/Interview-Gpt` again

2. **Configure Frontend**
   - **Project Name:** `interviewgpt` (or any name)
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** Click "Edit" → Select `frontend`
   - Leave build settings as default

3. **Add Environment Variable**
   
   Add just one variable:
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: https://your-backend-url.vercel.app/api
   ```
   
   Replace `your-backend-url` with the URL from Step 3.5

4. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes
   - ✅ Frontend deployed!
   - Copy your frontend URL (e.g., `https://interviewgpt.vercel.app`)

### Step 5: Update Backend CLIENT_URL

1. Go to your **backend project** in Vercel Dashboard
2. Click "Settings" → "Environment Variables"
3. Find `CLIENT_URL`
4. Click "Edit"
5. Change value to your frontend URL: `https://interviewgpt.vercel.app`
6. Save
7. Go to "Deployments" tab
8. Click "..." on latest deployment → "Redeploy"

### Step 6: Seed Database (One-time)

Run this command locally to seed DSA problems:

```bash
# Make sure you're in the backend folder
cd backend

# Set MongoDB URI and run seed
MONGODB_URI="your-atlas-connection-string" npm run seed:dsa
```

### Step 7: Test Your Deployment! 🎉

1. Visit your frontend URL: `https://your-app.vercel.app`
2. Try registering a new account
3. Login
4. Check if DSA problems load
5. Try solving a problem
6. Test other features

---

## 🎯 Method 2: Deploy via Vercel CLI (ADVANCED)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

### Step 3: Deploy Backend

```bash
# Navigate to backend
cd backend

# Deploy
vercel

# Follow prompts:
# - Setup and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? interviewgpt-api
# - Directory? ./ (current)
# - Override settings? No

# Deploy to production
vercel --prod
```

Copy the deployment URL shown.

### Step 4: Add Backend Environment Variables

```bash
# Add environment variables
vercel env add MONGODB_URI production
# Paste your MongoDB connection string

vercel env add JWT_SECRET production
# Enter a secure random string

vercel env add GEMINI_API_KEY production
# Enter your Gemini API key

vercel env add CLIENT_URL production
# Enter: https://localhost:3000 (temporary)

# Add others as needed...
```

### Step 5: Redeploy Backend

```bash
vercel --prod
```

### Step 6: Deploy Frontend

```bash
# Navigate to frontend
cd ../frontend

# Add environment variable for backend URL
vercel env add NEXT_PUBLIC_API_URL production
# Enter: https://your-backend-url.vercel.app/api

# Deploy
vercel --prod
```

### Step 7: Update Backend CLIENT_URL

```bash
# Go back to backend
cd ../backend

# Update CLIENT_URL with actual frontend URL
vercel env add CLIENT_URL production
# Enter your frontend URL

# Redeploy
vercel --prod
```

---

## 🔧 Post-Deployment Configuration

### Update MongoDB Atlas IP Whitelist

1. Go to MongoDB Atlas
2. Click "Network Access"
3. Click "Add IP Address"
4. Select "Allow Access from Anywhere" (0.0.0.0/0)
5. Click "Confirm"

(Vercel serverless functions use dynamic IPs, so we need to allow all)

### Test API Health

```bash
curl https://your-backend-url.vercel.app/api/health
```

Should return:
```json
{"status":"OK","message":"InterviewGPT AI Server Running"}
```

---

## 🎨 Custom Domain (Optional)

### For Frontend:
1. Go to your frontend project in Vercel
2. Settings → Domains
3. Add your domain (e.g., `interviewgpt.com`)
4. Follow DNS configuration instructions
5. Vercel auto-provisions SSL

### For Backend:
1. Go to your backend project in Vercel
2. Settings → Domains
3. Add subdomain (e.g., `api.interviewgpt.com`)
4. Update frontend env: `NEXT_PUBLIC_API_URL=https://api.interviewgpt.com/api`

---

## ✅ Deployment Checklist

### Pre-Deployment
- [x] Code pushed to GitHub
- [ ] Vercel account created
- [ ] MongoDB Atlas setup
- [ ] API keys obtained

### Backend Deployment
- [ ] Project created on Vercel
- [ ] Root directory set to `backend`
- [ ] Environment variables added
- [ ] Deployed successfully
- [ ] Backend URL copied
- [ ] API health check passes

### Frontend Deployment
- [ ] Project created on Vercel
- [ ] Root directory set to `frontend`
- [ ] Backend URL added to env
- [ ] Deployed successfully
- [ ] Frontend URL copied

### Post-Deployment
- [ ] Backend CLIENT_URL updated
- [ ] Backend redeployed
- [ ] MongoDB IP whitelist updated
- [ ] Database seeded
- [ ] Registration works
- [ ] Login works
- [ ] DSA problems load
- [ ] All features tested

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution:** 
- Check MongoDB Atlas IP whitelist
- Add 0.0.0.0/0 to allow all IPs
- Verify connection string is correct

### Issue: "API endpoints return 404"
**Solution:**
- Check `NEXT_PUBLIC_API_URL` includes `/api` at the end
- Verify backend is deployed and running
- Check Vercel function logs

### Issue: "CORS errors"
**Solution:**
- Verify `CLIENT_URL` in backend matches frontend URL exactly
- Include https:// in the URL
- Redeploy backend after changing

### Issue: "Environment variables not working"
**Solution:**
- Redeploy after adding variables
- Use `NEXT_PUBLIC_` prefix for client-side vars
- Check variable names match exactly

### Issue: "File upload fails"
**Solution:**
- Vercel serverless has 50MB limit
- Consider using Vercel Blob or external storage
- Check file size limits in your code

---

## 📊 Your Deployment URLs

After completing deployment:

**Backend API:** `https://interviewgpt-api.vercel.app`
**Frontend App:** `https://interviewgpt.vercel.app`

**Share your frontend URL - that's your live app!** 🚀

---

## 🔄 Updating Your Deployment

Every time you push to GitHub, Vercel auto-deploys:

```bash
# Make your changes
git add .
git commit -m "Update features"
git push origin main

# Vercel automatically deploys! ✨
```

---

## 💰 Vercel Pricing (Free Tier Limits)

Your project should work fine on free tier:

- ✅ 100GB bandwidth/month
- ✅ 100GB-hrs serverless function execution
- ✅ Unlimited projects
- ✅ Automatic HTTPS
- ✅ CI/CD included

---

## 🎉 You're Done!

Your InterviewGPT AI platform is now live on Vercel!

**Next Steps:**
1. Share your frontend URL with friends/recruiters
2. Add it to your portfolio
3. Include it in your resume
4. Share on LinkedIn/Twitter
5. Get feedback and iterate

**Need help?** Check `VERCEL_DEPLOYMENT_GUIDE.md` for detailed troubleshooting.

---

**Congratulations on deploying your full-stack AI application! 🎊🚀**
