# 🚀 Deployment Guide - InterviewGPT AI

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account
- OpenAI API key
- Pinecone account (optional for RAG features)

## Backend Deployment (Railway/Render)

### 1. Prepare Backend

```bash
cd backend
npm install
```

### 2. Environment Variables

Create `.env` file with:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRE=7d
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment
PINECONE_INDEX=interviewgpt-knowledge
NODE_ENV=production
CLIENT_URL=https://your-frontend-url.vercel.app
```

### 3. Deploy to Railway

1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Initialize: `railway init`
4. Deploy: `railway up`
5. Add environment variables in Railway dashboard

### 4. Deploy to Render

1. Connect GitHub repository
2. Select "Web Service"
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Add environment variables in Render dashboard

## Frontend Deployment (Vercel)

### 1. Prepare Frontend

```bash
cd frontend
npm install
```

### 2. Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

### 3. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Production deployment
vercel --prod
```

Or use Vercel Dashboard:
1. Import GitHub repository
2. Framework: Next.js
3. Add environment variables
4. Deploy

## Database Setup (MongoDB Atlas)

1. Create MongoDB Atlas account
2. Create new cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all)
5. Get connection string
6. Replace in backend `.env`

## API Keys Setup

### OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Create new secret key
3. Add to backend environment variables

### Pinecone (Optional)

1. Sign up at https://www.pinecone.io/
2. Create new index
3. Get API key and environment
4. Add to backend environment variables

## Post-Deployment

### 1. Test Backend

```bash
curl https://your-backend-url.railway.app/api/health
```

### 2. Test Frontend

Visit: `https://your-app.vercel.app`

### 3. Create Admin User

Use the register endpoint or MongoDB directly

## Monitoring

- Backend logs: Railway/Render dashboard
- Frontend logs: Vercel dashboard
- Database: MongoDB Atlas monitoring

## Scaling

### Backend
- Railway: Upgrade plan for more resources
- Render: Scale instances in dashboard

### Frontend
- Vercel automatically scales
- Enable Edge Functions for better performance

## Security Checklist

- ✅ Environment variables set correctly
- ✅ CORS configured for production domain
- ✅ Rate limiting enabled
- ✅ JWT secret is strong and unique
- ✅ MongoDB IP whitelist configured
- ✅ HTTPS enabled (automatic on Vercel/Railway)

## Troubleshooting

### Backend Issues

**Connection refused:**
- Check MongoDB URI
- Verify IP whitelist in MongoDB Atlas

**API errors:**
- Check OpenAI API key
- Verify environment variables

### Frontend Issues

**API calls failing:**
- Check NEXT_PUBLIC_API_URL
- Verify CORS settings in backend

**Build errors:**
- Run `npm run build` locally first
- Check TypeScript errors

## Cost Optimization

- Use MongoDB Atlas free tier (512MB)
- OpenAI API: Monitor usage
- Railway: $5/month for hobby plan
- Vercel: Free for personal projects
- Pinecone: Free tier available

## Backup Strategy

1. MongoDB Atlas automatic backups
2. Git repository for code
3. Export environment variables securely

## Updates

```bash
# Backend
cd backend
git pull
railway up

# Frontend
cd frontend
git pull
vercel --prod
```

## Support

For issues, check:
- Railway logs
- Vercel logs
- MongoDB Atlas logs
- Browser console (frontend)
