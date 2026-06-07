# 🛠️ Setup Guide - InterviewGPT AI

## Quick Start (5 minutes)

### 1. Clone & Install

```bash
# Install root dependencies
npm install

# Install all dependencies (frontend + backend)
npm run install-all
```

### 2. Setup Environment Variables

**Backend (.env):**

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/interviewgpt
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
OPENAI_API_KEY=sk-your-openai-api-key
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_ENVIRONMENT=your-pinecone-environment
PINECONE_INDEX=interviewgpt-knowledge
NODE_ENV=development
```

**Frontend (.env.local):**

```bash
cd frontend
cp .env.local.example .env.local
```

Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

### 3. Start Development Servers

```bash
# From root directory
npm run dev
```

This starts:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## Detailed Setup

### MongoDB Atlas Setup

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select region closest to you
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password
   - Set role to "Atlas Admin"

4. **Whitelist IP**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, use specific IPs

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `interviewgpt`

### OpenAI API Setup

1. **Create Account**
   - Go to https://platform.openai.com/
   - Sign up or login

2. **Get API Key**
   - Go to https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Copy the key (starts with `sk-`)
   - Add to backend `.env`

3. **Add Credits**
   - Go to Billing
   - Add payment method
   - Add credits ($5 minimum)

### Pinecone Setup (Optional - for RAG features)

1. **Create Account**
   - Go to https://www.pinecone.io/
   - Sign up for free account

2. **Create Index**
   - Click "Create Index"
   - Name: `interviewgpt-knowledge`
   - Dimensions: `1536` (for OpenAI embeddings)
   - Metric: `cosine`
   - Click "Create Index"

3. **Get API Key**
   - Go to "API Keys"
   - Copy your API key
   - Copy environment name
   - Add both to backend `.env`

### Google OAuth Setup (Optional)

1. **Create Project**
   - Go to https://console.cloud.google.com/
   - Create new project

2. **Enable OAuth**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Configure consent screen
   - Application type: "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
     - `https://your-domain.com/api/auth/callback/google`

3. **Get Credentials**
   - Copy Client ID
   - Copy Client Secret
   - Add to backend `.env`

## Project Structure

```
interviewgpt-ai/
├── backend/
│   ├── controllers/       # Request handlers
│   ├── models/           # Database schemas
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── middleware/       # Auth, upload, etc.
│   ├── uploads/          # File uploads
│   └── server.js         # Entry point
├── frontend/
│   ├── app/              # Next.js pages
│   │   ├── dashboard/    # Dashboard pages
│   │   ├── login/        # Auth pages
│   │   └── page.tsx      # Landing page
│   ├── components/       # React components
│   ├── lib/              # Utilities
│   │   ├── api.ts        # API client
│   │   ├── store.ts      # State management
│   │   └── utils.ts      # Helper functions
│   └── public/           # Static assets
└── README.md
```

## Development Workflow

### Running Backend Only

```bash
cd backend
npm run dev
```

### Running Frontend Only

```bash
cd frontend
npm run dev
```

### Running Both

```bash
# From root
npm run dev
```

## Testing API Endpoints

### Health Check

```bash
curl http://localhost:5000/api/health
```

### Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Common Issues

### Port Already in Use

```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 3000
npx kill-port 3000
```

### MongoDB Connection Error

- Check MongoDB URI format
- Verify username/password
- Check IP whitelist
- Ensure cluster is running

### OpenAI API Error

- Verify API key is correct
- Check billing/credits
- Ensure API key has proper permissions

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- Frontend: Automatic with Next.js
- Backend: Using nodemon

### Debugging

**Backend:**
```bash
cd backend
node --inspect server.js
```

**Frontend:**
- Use React DevTools
- Check browser console
- Use Next.js built-in error overlay

### Database GUI

Use MongoDB Compass:
1. Download from https://www.mongodb.com/products/compass
2. Connect using your MongoDB URI
3. Browse collections and documents

## Next Steps

1. ✅ Complete environment setup
2. ✅ Start development servers
3. ✅ Create test account
4. ✅ Test all features
5. ✅ Customize UI/branding
6. ✅ Deploy to production

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [OpenAI API Reference](https://platform.openai.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## Support

For issues or questions:
1. Check this guide
2. Review error logs
3. Check MongoDB/OpenAI status
4. Review API documentation
