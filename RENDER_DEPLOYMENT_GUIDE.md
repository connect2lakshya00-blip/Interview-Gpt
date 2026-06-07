# 🚀 Render Deployment Guide - InterviewGPT AI

Complete guide to deploy your full-stack application (Frontend + Backend) to Render.

---

## 🎯 Why Render?

- ✅ Easier than Vercel for full-stack apps
- ✅ Free tier includes 750 hours/month
- ✅ Automatic deployments from GitHub
- ✅ Built-in SSL certificates
- ✅ Simple environment variable management
- ✅ Better for long-running processes

---

## 📋 Prerequisites

1. ✅ GitHub repository (already done!)
2. ✅ Render account (free tier - https://render.com)
3. ✅ MongoDB Atlas account (free tier)
4. ✅ API keys (Gemini, OpenAI, etc.)

---

## 🚀 Step-by-Step Deployment

### Part 1: Create Render Account (1 minute)

1. Go to https://render.com
2. Click "Get Started"
3. Sign up with GitHub
4. Authorize Render to access your repositories

### Part 2: Set Up MongoDB Atlas (2 minutes)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account / Login
3. Create a new FREE cluster (M0)
4. Wait for cluster creation (2-3 minutes)
5. Click "Connect" → "Connect your application"
6. Copy connection string: `mongodb+srv://username:<password>@cluster.mongodb.net/`
7. Replace `<password>` with your actual password
8. **Save this connection string!**

### Part 3: Deploy Backend API (3 minutes)

#### Step 1: Create Web Service

1. From Render Dashboard, click "New +" → "Web Service"
2. Connect your repository: `connect2lakshya00-blip/Interview-Gpt`
3. If not listed, click "Configure account" to authorize

#### Step 2: Configure Backend Service

Fill in these settings:

**Basic Settings:**
- **Name:** `interviewgpt-api` (or any name)
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** `backend` ← IMPORTANT!
- **Runtime:** Node
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Select "Free" (750 hours/month)

#### Step 3: Add Environment Variables

Click "Advanced" → Add these environment variables:

```
MONGODB_URI = your-mongodb-atlas-connection-string
JWT_SECRET = any-random-string-32-characters-minimum
GEMINI_API_KEY = your-gemini-api-key
CLIENT_URL = https://localhost:3000
NODE_ENV = production
PORT = 10000
```

**Optional (if you have them):**
```
OPENAI_API_KEY = your-openai-key
GROQ_API_KEY = your-groq-key
PINECONE_API_KEY = your-pinecone-key
PINECONE_ENVIRONMENT = your-pinecone-env
PINECONE_INDEX_NAME = your-index-name
```

#### Step 4: Deploy Backend

1. Click "Create Web Service"
2. Wait 3-5 minutes for deployment
3. Once deployed, you'll see: ✅ "Live"
4. **Copy your backend URL:** `https://interviewgpt-api.onrender.com`

### Part 4: Deploy Frontend (3 minutes)

#### Step 1: Create Another Web Service

1. Click "New +" → "Web Service"
2. Connect same repository: `connect2lakshya00-blip/Interview-Gpt`

#### Step 2: Configure Frontend Service

**Basic Settings:**
- **Name:** `interviewgpt` (or any name)
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** `frontend` ← IMPORTANT!
- **Runtime:** Node
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`

**Instance Type:**
- Select "Free"

#### Step 3: Add Environment Variable

Click "Advanced" → Add:

```
NEXT_PUBLIC_API_URL = https://your-backend-url.onrender.com/api
```

Replace `your-backend-url` with the URL from Part 3, Step 4.

#### Step 4: Deploy Frontend

1. Click "Create Web Service"
2. Wait 5-7 minutes for deployment (Next.js takes longer)
3. Once deployed, you'll see: ✅ "Live"
4. **Copy your frontend URL:** `https://interviewgpt.onrender.com`

### Part 5: Update Backend CLIENT_URL (1 minute)

1. Go back to your **backend service** in Render Dashboard
2. Click "Environment" in left sidebar
3. Find `CLIENT_URL`
4. Click "Edit" → Change to your frontend URL
5. Save
6. Your backend will automatically redeploy

### Part 6: Configure MongoDB IP Whitelist (1 minute)

1. Go to MongoDB Atlas
2. Click "Network Access" in left sidebar
3. Click "Add IP Address"
4. Select "Allow Access from Anywhere" (0.0.0.0/0)
5. Click "Confirm"

(Render uses dynamic IPs, so we need to allow all)

### Part 7: Seed Database (2 minutes)

Run this locally to seed DSA problems:

```bash
cd backend
MONGODB_URI="your-atlas-connection-string" npm run seed:dsa
```

---

## ✅ Your Deployment is Complete! 🎉

**Backend API:** `https://interviewgpt-api.onrender.com`
**Frontend App:** `https://interviewgpt.onrender.com`

---

## 🧪 Test Your Deployment

### 1. Test API Health

Visit: `https://your-backend-url.onrender.com/api/health`

Should return:
```json
{"status":"OK","message":"InterviewGPT AI Server Running"}
```

### 2. Test Frontend

1. Visit your frontend URL
2. Click "Register"
3. Create account
4. Login
5. Go to "DSA Practice"
6. Check if problems load
7. Try solving "Two Sum"

---

## 🎨 Render Dashboard Features

### Auto-Deploy on Push

Every time you push to GitHub, Render automatically redeploys!

```bash
git add .
git commit -m "Update feature"
git push origin main
# Render deploys automatically! ✨
```

### View Logs

- Go to your service
- Click "Logs" tab
- See real-time logs
- Debug errors

### Manual Deploy

- Go to your service
- Click "Manual Deploy" → "Deploy latest commit"

### Environment Variables

- Easy to add/edit
- No need to redeploy manually
- Secure storage

---

## 🔧 Configuration Files for Render

Render works great without extra config files, but you can add these for more control:

### render.yaml (Optional - Monorepo Config)

Create in project root:

```yaml
services:
  - type: web
    name: interviewgpt-api
    env: node
    region: oregon
    plan: free
    branch: main
    rootDir: backend
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000

  - type: web
    name: interviewgpt-frontend
    env: node
    region: oregon
    plan: free
    branch: main
    rootDir: frontend
    buildCommand: npm install && npm run build
    startCommand: npm start
```

---

## 💡 Important Notes

### Free Tier Limitations

**Render Free Tier:**
- ✅ 750 hours/month per service
- ✅ Sleeps after 15 min of inactivity
- ✅ Takes 30-60 seconds to wake up
- ✅ 512 MB RAM
- ✅ Shared CPU

**Tips:**
- Services may sleep when inactive
- First request after sleep takes longer
- Consider upgrading for production use

### Keeping Services Awake (Optional)

Use a service like [UptimeRobot](https://uptimerobot.com):
1. Create free account
2. Add monitor for your URLs
3. Ping every 5 minutes
4. Keeps services awake

Or use [Render Cron Jobs](https://render.com/docs/cronjobs):
- Create cron job to ping your backend
- Schedule every 10 minutes

---

## 🐛 Troubleshooting

### Issue: Build Failed

**Solution:**
- Check logs in Render dashboard
- Verify `package.json` scripts
- Check Node version compatibility
- Ensure all dependencies are in `package.json`

### Issue: MongoDB Connection Failed

**Solution:**
- Check MongoDB IP whitelist (0.0.0.0/0)
- Verify connection string is correct
- Check username/password
- Ensure database name in connection string

### Issue: CORS Errors

**Solution:**
- Verify `CLIENT_URL` matches frontend URL exactly
- Include `https://` in URLs
- Redeploy backend after changes

### Issue: Environment Variables Not Working

**Solution:**
- Check spelling matches code exactly
- Redeploy after adding variables
- Use `NEXT_PUBLIC_` prefix for client-side
- Check Render dashboard for typos

### Issue: Frontend Shows 404

**Solution:**
- Check `NEXT_PUBLIC_API_URL` is correct
- Must end with `/api`
- Must include `https://`
- Redeploy frontend

### Issue: Service Sleeps / Slow First Load

**Solution:**
- This is normal on free tier
- Service wakes up in 30-60 seconds
- Consider paid plan for always-on
- Or use UptimeRobot to keep awake

---

## 📊 Deployment Checklist

### Pre-Deployment
- [x] Code pushed to GitHub
- [ ] Render account created
- [ ] MongoDB Atlas setup
- [ ] API keys ready

### Backend Deployment
- [ ] Web service created
- [ ] Root directory set to `backend`
- [ ] Environment variables added
- [ ] Deployed successfully
- [ ] Backend URL copied
- [ ] Health check passes

### Frontend Deployment
- [ ] Web service created
- [ ] Root directory set to `frontend`
- [ ] Backend URL added to env
- [ ] Deployed successfully
- [ ] Frontend URL copied

### Post-Deployment
- [ ] Backend CLIENT_URL updated
- [ ] MongoDB IP whitelist updated
- [ ] Database seeded
- [ ] All features tested
- [ ] Services are live

---

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use Render's secure env vars
   - Rotate secrets regularly

2. **MongoDB**
   - Use strong passwords
   - Enable database authentication
   - Regular backups

3. **API Keys**
   - Keep API keys secret
   - Monitor usage
   - Set rate limits

4. **HTTPS**
   - Render provides free SSL
   - Always use https:// URLs
   - Enable HSTS headers

---

## 🎨 Custom Domain (Optional)

### Add Custom Domain

1. **For Frontend:**
   - Go to frontend service
   - Click "Settings" → "Custom Domain"
   - Add `interviewgpt.com`
   - Update DNS records with your provider
   - Render auto-provisions SSL

2. **For Backend:**
   - Go to backend service
   - Add subdomain: `api.interviewgpt.com`
   - Update DNS
   - Update frontend env: `NEXT_PUBLIC_API_URL=https://api.interviewgpt.com/api`

---

## 📈 Monitoring & Analytics

### Built-in Metrics

Render provides:
- CPU usage
- Memory usage
- Request count
- Response times
- Logs

### External Monitoring

Consider adding:
- **Sentry** for error tracking
- **LogRocket** for session replay
- **Google Analytics** for user analytics

---

## 🔄 CI/CD Pipeline

Render automatically:
1. Detects push to GitHub
2. Pulls latest code
3. Runs build
4. Deploys if successful
5. Rolls back if failed

**No configuration needed!** ✨

---

## 💰 Pricing (If You Want to Upgrade)

**Starter Plan ($7/month):**
- Always on (no sleeping)
- 512 MB RAM
- Better for production

**Standard Plan ($25/month):**
- 2 GB RAM
- Priority support
- Better performance

---

## 🎯 Quick Commands Reference

### View Logs
```bash
# Install Render CLI (optional)
npm install -g @render-com/cli

# View logs
render logs -s your-service-name
```

### Trigger Deploy
```bash
# Just push to GitHub
git push origin main

# Or use Render dashboard
# Services → Manual Deploy
```

---

## 🌟 Advantages of Render

| Feature | Render | Vercel |
|---------|--------|--------|
| Full-stack apps | ✅ Easy | ⚠️ Complex |
| Auto-deploy | ✅ Yes | ✅ Yes |
| Free tier | ✅ 750 hrs | ✅ 100 GB |
| Serverless | ❌ No | ✅ Yes |
| Always-on (free) | ❌ Sleeps | ❌ Sleeps |
| Database | ✅ Can host | ❌ External only |
| Learning curve | ✅ Easy | ⚠️ Moderate |

---

## 📞 Support & Resources

- **Render Docs:** https://render.com/docs
- **Render Status:** https://status.render.com
- **Community Forum:** https://community.render.com
- **Support:** support@render.com

---

## 🎉 Success!

Your InterviewGPT AI platform is now live on Render!

**Share your URLs:**
- Backend: `https://interviewgpt-api.onrender.com`
- Frontend: `https://interviewgpt.onrender.com`

Add to portfolio, resume, LinkedIn! 🚀

---

**Congratulations on deploying your full-stack AI application! 🎊**
