# InterviewGPT AI - Frontend Architecture

## 🎨 Design System

### Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: ShadCN UI + Custom Components
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: Zustand
- **API Client**: Axios

### Design Principles
- **Futuristic AI Aesthetic**: Dark theme with neon accents
- **Glassmorphism**: Frosted glass effects throughout
- **Smooth Animations**: Framer Motion for all interactions
- **Responsive**: Mobile-first approach
- **Performance**: Optimized for speed and efficiency

## 📁 Folder Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── (landing)/          # Landing page group
│   │   │   └── page.tsx
│   │   ├── (auth)/             # Auth pages group
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/        # Dashboard group
│   │   │   └── dashboard/
│   │   │       ├── layout.tsx
│   │   │       ├── page.tsx
│   │   │       ├── technical/
│   │   │       ├── analytics/
│   │   │       └── ...
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── animated-button.tsx
│   │   │   ├── glass-card.tsx
│   │   │   ├── ai-loader.tsx
│   │   │   ├── gradient-border.tsx
│   │   │   ├── floating-panel.tsx
│   │   │   └── page-transition.tsx
│   │   ├── landing/            # Landing page sections
│   │   │   ├── navbar.tsx
│   │   │   ├── hero-section.tsx
│   │   │   ├── features-section.tsx
│   │   │   ├── pricing-section.tsx
│   │   │   ├── testimonials-section.tsx
│   │   │   └── footer.tsx
│   │   └── dashboard/          # Dashboard components
│   │       ├── dashboard-sidebar.tsx
│   │       ├── dashboard-navbar.tsx
│   │       ├── stat-card.tsx
│   │       └── progress-chart.tsx
│   ├── hooks/                  # Custom React hooks
│   │   └── useAuth.ts
│   ├── services/               # API services
│   │   └── api.ts
│   └── lib/                    # Utilities
│       └── utils.ts
├── public/
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🎯 Key Features

### 1. Landing Page
- **Hero Section**: Animated background with floating orbs
- **Features Grid**: 6 feature cards with icons and gradients
- **Pricing Cards**: 3-tier pricing with gradient borders
- **Testimonials**: User reviews with ratings
- **Responsive Navbar**: Glassmorphism with smooth animations

### 2. Authentication
- **Login Page**: Email/password with remember me
- **Register Page**: Full name, email, password fields
- **Forgot Password**: Password recovery flow
- **JWT Integration**: Token-based authentication ready

### 3. Dashboard
- **Sidebar Navigation**: Fixed sidebar with active states
- **Top Navbar**: Search, notifications, user profile
- **Analytics Cards**: Stats with icons and trends
- **Progress Charts**: Line charts showing performance
- **Recent Activity**: List of recent interviews

### 4. Reusable Components

#### AnimatedButton
```tsx
<AnimatedButton 
  variant="primary|secondary|outline|ghost"
  size="sm|md|lg"
  loading={boolean}
  icon={ReactNode}
>
  Button Text
</AnimatedButton>
```

#### GlassCard
```tsx
<GlassCard 
  hover={boolean}
  glow={boolean}
  gradient={boolean}
>
  Content
</GlassCard>
```

#### AILoader
```tsx
<AILoader 
  text="Processing..."
  size="sm|md|lg"
/>
```

#### GradientBorder
```tsx
<GradientBorder animate={boolean}>
  Content
</GradientBorder>
```

## 🎨 Design Tokens

### Colors
- **Primary**: Blue (#3b82f6)
- **Secondary**: Purple (#8b5cf6)
- **Accent**: Pink (#ec4899)
- **Background**: Black (#000000)
- **Glass**: rgba(255, 255, 255, 0.05)

### Gradients
- **Blue-Purple**: from-blue-500 to-purple-500
- **Purple-Pink**: from-purple-500 to-pink-500
- **Blue-Cyan**: from-blue-500 to-cyan-500

### Animations
- **Float**: Smooth up/down movement
- **Glow**: Pulsing shadow effect
- **Slide Up**: Entry animation
- **Fade In**: Opacity transition

## 🚀 Getting Started

### Installation
```bash
cd frontend
npm install
```

### Environment Setup
```bash
cp .env.local.example .env.local
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
npm start
```

## 📱 Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ⚡ Performance Optimizations
- Code splitting with Next.js App Router
- Image optimization with next/image
- Lazy loading for heavy components
- Memoization for expensive calculations
- CSS-in-JS with Tailwind for minimal bundle size

## 🎭 Animation Guidelines
- Use Framer Motion for all animations
- Keep animations under 500ms for interactions
- Use spring animations for natural feel
- Respect user's motion preferences

## 🔒 Security
- JWT token storage in localStorage
- Protected routes with middleware
- XSS protection with React
- CSRF tokens for forms

## 📊 State Management
- Zustand for global state
- React hooks for local state
- Server state with React Query (optional)

## 🧪 Testing (Future)
- Jest for unit tests
- React Testing Library for component tests
- Playwright for E2E tests

## 📝 Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Consistent naming conventions

## 🎯 Next Steps
1. Implement remaining dashboard pages
2. Add real API integration
3. Implement voice interview UI
4. Add code editor for technical interviews
5. Create mobile app version
6. Add dark/light theme toggle
7. Implement real-time features with WebSockets
