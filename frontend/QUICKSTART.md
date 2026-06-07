# 🚀 Quick Start Guide - InterviewGPT AI Frontend

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## Installation Steps

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Setup Environment
```bash
# Copy the example env file
cp .env.local.example .env.local

# Edit .env.local with your settings
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📄 Available Pages

### Public Pages
- **Landing**: `http://localhost:3000/`
- **Login**: `http://localhost:3000/login`
- **Register**: `http://localhost:3000/register`
- **Forgot Password**: `http://localhost:3000/forgot-password`

### Dashboard Pages (Protected)
- **Dashboard**: `http://localhost:3000/dashboard`
- **Technical**: `http://localhost:3000/dashboard/technical`
- **HR Interview**: `http://localhost:3000/dashboard/hr-interview`
- **DSA Practice**: `http://localhost:3000/dashboard/dsa`
- **Voice Interview**: `http://localhost:3000/dashboard/voice`
- **Resume**: `http://localhost:3000/dashboard/resume`
- **Knowledge**: `http://localhost:3000/dashboard/knowledge`
- **Analytics**: `http://localhost:3000/dashboard/analytics`
- **Settings**: `http://localhost:3000/dashboard/settings`

## 🎨 Component Examples

### Using Animated Button
```tsx
import { AnimatedButton } from "@/components/ui/animated-button";
import { Zap } from "lucide-react";

<AnimatedButton 
  variant="primary"
  size="lg"
  icon={<Zap className="w-5 h-5" />}
>
  Start Now
</AnimatedButton>
```

### Using Glass Card
```tsx
import { GlassCard } from "@/components/ui/glass-card";

<GlassCard hover glow>
  <h3 className="text-xl font-bold mb-2">Card Title</h3>
  <p className="text-gray-400">Card content goes here</p>
</GlassCard>
```

### Using AI Loader
```tsx
import { AILoader } from "@/components/ui/ai-loader";

<AILoader text="AI Processing..." size="md" />
```

### Using Gradient Border
```tsx
import { GradientBorder } from "@/components/ui/gradient-border";

<GradientBorder animate>
  <div className="p-8">
    <h3>Content with animated gradient border</h3>
  </div>
</GradientBorder>
```

## 🎯 Key Features to Explore

### 1. Landing Page
- Animated hero section with floating orbs
- Feature showcase with 6 cards
- 3-tier pricing section
- User testimonials
- Responsive navigation

### 2. Authentication Flow
- Login with email/password
- Registration form
- Password reset functionality
- JWT token management

### 3. Dashboard
- Sidebar navigation with active states
- Top navbar with search and notifications
- Analytics cards with stats
- Performance charts
- Recent activity feed

## 🛠️ Development Commands

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

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize colors:
```js
colors: {
  primary: "your-color",
  secondary: "your-color",
  // ...
}
```

### Animations
Edit `tailwind.config.js` to add custom animations:
```js
animation: {
  'custom': 'custom 2s ease-in-out infinite',
}
keyframes: {
  custom: {
    '0%, 100%': { /* styles */ },
    '50%': { /* styles */ },
  }
}
```

### Global Styles
Edit `src/app/globals.css` for global styles and utilities.

## 📱 Responsive Testing

Test on different screen sizes:
- Mobile: 375px, 414px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1920px

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 📚 Next Steps

1. **Connect Backend**: Update API endpoints in `src/services/api.ts`
2. **Add Authentication**: Implement JWT logic in `src/hooks/useAuth.ts`
3. **Create More Pages**: Add interview practice pages
4. **Add Real Data**: Connect to actual API endpoints
5. **Deploy**: Deploy to Vercel, Netlify, or your preferred platform

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Build for Production
```bash
npm run build
npm start
```

## 💡 Tips

1. Use `@/` alias for imports (configured in tsconfig.json)
2. All components are TypeScript for type safety
3. Framer Motion is used for all animations
4. Tailwind CSS for styling - no CSS modules needed
5. Use Lucide React for icons

## 🎉 You're Ready!

Start building amazing features on top of this futuristic UI foundation!

For detailed architecture, see [FRONTEND_ARCHITECTURE.md](./FRONTEND_ARCHITECTURE.md)
