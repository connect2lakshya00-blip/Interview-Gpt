# 🚀 InterviewGPT AI - Frontend

A futuristic, billion-dollar AI SaaS product UI built with Next.js, Tailwind CSS, Framer Motion, and ShadCN UI.

## ✨ Features

### 🎨 Premium UI/UX
- **Glassmorphism Design**: Frosted glass effects throughout
- **Dynamic Gradients**: Animated gradient backgrounds
- **Smooth Animations**: Framer Motion powered interactions
- **AI-Themed**: Futuristic dark theme with neon accents
- **Fully Responsive**: Mobile-first design approach

### 📄 Pages Included
1. **Landing Page**
   - Hero section with animated orbs
   - Features showcase
   - Pricing section (3 tiers)
   - Testimonials
   - Footer with links

2. **Authentication**
   - Login page
   - Register page
   - Forgot password (ready)
   - JWT integration ready

3. **Dashboard**
   - Main dashboard with stats
   - Analytics page with charts
   - Technical interview practice
   - HR interview practice
   - DSA practice
   - Voice interview
   - Resume analysis
   - Knowledge base
   - Settings

### 🧩 Reusable Components
- `AnimatedButton` - Gradient buttons with loading states
- `GlassCard` - Glassmorphism cards with hover effects
- `AILoader` - AI-themed loading animation
- `GradientBorder` - Animated gradient borders
- `FloatingPanel` - Floating panels with animations
- `StatCard` - Dashboard stat cards
- `ProgressChart` - Performance charts

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: ShadCN UI + Custom
- **Icons**: Lucide React
- **Charts**: Recharts
- **State**: Zustand
- **HTTP**: Axios

## 📦 Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── (landing)/          # Landing page
│   ├── (auth)/             # Auth pages
│   ├── (dashboard)/        # Dashboard pages
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── landing/            # Landing sections
│   └── dashboard/          # Dashboard components
├── hooks/                  # Custom hooks
├── services/               # API services
└── lib/                    # Utilities
```

## 🎨 Design System

### Colors
```css
Primary: #3b82f6 (Blue)
Secondary: #8b5cf6 (Purple)
Accent: #ec4899 (Pink)
Background: #000000 (Black)
```

### Gradients
- Blue to Purple: `from-blue-500 to-purple-500`
- Purple to Pink: `from-purple-500 to-pink-500`
- Blue to Cyan: `from-blue-500 to-cyan-500`

### Components Usage

#### Animated Button
```tsx
import { AnimatedButton } from "@/components/ui/animated-button";

<AnimatedButton 
  variant="primary"
  size="lg"
  loading={false}
  icon={<Icon />}
>
  Click Me
</AnimatedButton>
```

#### Glass Card
```tsx
import { GlassCard } from "@/components/ui/glass-card";

<GlassCard hover glow gradient>
  <h3>Card Title</h3>
  <p>Card content</p>
</GlassCard>
```

#### AI Loader
```tsx
import { AILoader } from "@/components/ui/ai-loader";

<AILoader text="Processing..." size="md" />
```

## 🚀 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📱 Responsive Design

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components are fully responsive and optimized for all screen sizes.

## ⚡ Performance

- Code splitting with Next.js App Router
- Image optimization
- Lazy loading
- Minimal bundle size
- Fast page transitions

## 🎯 Key Features

### Landing Page
- Animated hero with floating orbs
- Feature cards with icons
- Pricing comparison
- User testimonials
- Responsive navigation

### Dashboard
- Sidebar navigation
- Top navbar with search
- Analytics cards
- Performance charts
- Recent activity feed

### Authentication
- Email/password login
- User registration
- Password recovery
- JWT token management

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Tailwind Config
Custom animations, colors, and utilities are configured in `tailwind.config.js`

## 📚 Documentation

See [FRONTEND_ARCHITECTURE.md](./FRONTEND_ARCHITECTURE.md) for detailed architecture documentation.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this in your projects!

## 🎉 Credits

Built with ❤️ using:
- Next.js
- Tailwind CSS
- Framer Motion
- ShadCN UI
- Lucide Icons

---

**Made for InterviewGPT AI** 🚀
