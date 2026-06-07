# 📦 Installation Guide - InterviewGPT AI Frontend

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.0 or higher
- **npm** 9.0 or higher (comes with Node.js)
- **Git** (optional, for cloning)

Check your versions:
```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 9.0.0 or higher
```

## Step-by-Step Installation

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Recharts
- Zustand
- Axios
- And more...

**Installation time**: ~2-3 minutes depending on your internet speed.

### 3. Setup Environment Variables
```bash
# Copy the example environment file
cp .env.local.example .env.local
```

Edit `.env.local` with your settings:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server
```bash
npm run dev
```

The application will start on [http://localhost:3000](http://localhost:3000)

You should see:
```
✓ Ready in 2.5s
○ Local:        http://localhost:3000
```

### 5. Open in Browser
Visit [http://localhost:3000](http://localhost:3000)

You should see the beautiful landing page! 🎉

## Verify Installation

### Check Pages
Visit these URLs to verify everything works:

**Public Pages:**
- Landing: http://localhost:3000/
- Login: http://localhost:3000/login
- Register: http://localhost:3000/register
- Forgot Password: http://localhost:3000/forgot-password

**Dashboard Pages:**
- Dashboard: http://localhost:3000/dashboard
- Technical: http://localhost:3000/dashboard/technical
- Analytics: http://localhost:3000/dashboard/analytics

### Check Console
Open browser console (F12) - you should see no errors.

### Check Build
```bash
npm run build
```

Should complete without errors.

## Troubleshooting

### Issue: Port 3000 Already in Use

**Solution 1**: Kill the process
```bash
# Windows
npx kill-port 3000

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**Solution 2**: Use different port
```bash
npm run dev -- -p 3001
```

### Issue: Module Not Found

**Solution**: Clear cache and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript Errors

**Solution**: Check TypeScript version
```bash
npm install typescript@latest --save-dev
```

### Issue: Build Fails

**Solution**: Clear Next.js cache
```bash
rm -rf .next
npm run build
```

### Issue: Slow Installation

**Solution**: Use different registry
```bash
npm install --registry=https://registry.npmjs.org/
```

### Issue: Permission Denied

**Solution**: Use sudo (Mac/Linux) or run as administrator (Windows)
```bash
sudo npm install
```

## Package Details

### Core Dependencies
```json
{
  "next": "14.0.4",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.3.3"
}
```

### Styling
```json
{
  "tailwindcss": "^3.4.0",
  "autoprefixer": "^10.4.16",
  "postcss": "^8.4.32"
}
```

### Animations
```json
{
  "framer-motion": "^10.16.16"
}
```

### UI Components
```json
{
  "@radix-ui/react-dialog": "^1.0.5",
  "@radix-ui/react-dropdown-menu": "^2.0.6",
  "@radix-ui/react-select": "^2.0.0",
  "@radix-ui/react-tabs": "^1.0.4",
  "@radix-ui/react-toast": "^1.1.5",
  "@radix-ui/react-avatar": "^1.0.4",
  "@radix-ui/react-progress": "^1.0.3"
}
```

### Icons & Charts
```json
{
  "lucide-react": "^0.294.0",
  "recharts": "^2.10.3"
}
```

### Utilities
```json
{
  "axios": "^1.6.2",
  "zustand": "^4.4.7",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.2.0",
  "class-variance-authority": "^0.7.0"
}
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type checking
npm run type-check
```

## File Structure After Installation

```
frontend/
├── node_modules/           # Dependencies (auto-generated)
├── .next/                  # Build output (auto-generated)
├── src/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── lib/
├── public/
├── .env.local              # Your environment variables
├── package.json
├── package-lock.json       # Lock file (auto-generated)
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── postcss.config.js
```

## Next Steps After Installation

1. **Explore the UI**
   - Visit all pages
   - Test responsive design
   - Check animations

2. **Read Documentation**
   - FRONTEND_ARCHITECTURE.md
   - COMPONENT_SHOWCASE.md
   - QUICKSTART.md

3. **Start Development**
   - Create new pages
   - Customize components
   - Connect to backend

4. **Test Everything**
   - Test on mobile
   - Test on tablet
   - Test on desktop

## Production Build

### Build for Production
```bash
npm run build
```

### Test Production Build Locally
```bash
npm start
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

## Environment Setup

### Development
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Production
```env
NEXT_PUBLIC_API_URL=https://api.yourapp.com
NEXT_PUBLIC_APP_URL=https://yourapp.com
NODE_ENV=production
```

## Performance Tips

1. **Use Production Build**
   ```bash
   npm run build
   npm start
   ```

2. **Enable Compression**
   - Vercel/Netlify handle this automatically
   - For custom servers, use compression middleware

3. **Optimize Images**
   - Use next/image component
   - Serve images from CDN

4. **Code Splitting**
   - Already configured with Next.js
   - Use dynamic imports for heavy components

5. **Caching**
   - Configure in next.config.js
   - Use CDN for static assets

## Support

### Common Issues
- Check [Troubleshooting](#troubleshooting) section
- Read error messages carefully
- Check browser console for errors

### Resources
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/

### Getting Help
1. Check documentation files
2. Search for error messages
3. Check GitHub issues
4. Ask in community forums

## Success Checklist

- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] Environment variables configured
- [ ] Development server running
- [ ] Landing page loads correctly
- [ ] No console errors
- [ ] All pages accessible
- [ ] Responsive design works
- [ ] Animations smooth
- [ ] Build completes successfully

## Congratulations! 🎉

You've successfully installed InterviewGPT AI Frontend!

**What's Next?**
1. Explore the beautiful UI
2. Read the documentation
3. Start building features
4. Connect to backend API
5. Deploy to production

**Happy Coding!** 🚀
