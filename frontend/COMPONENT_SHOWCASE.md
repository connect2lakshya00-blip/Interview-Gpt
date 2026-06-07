# 🎨 Component Showcase - InterviewGPT AI

## UI Components Library

### 1. AnimatedButton

Premium gradient buttons with smooth animations and loading states.

**Variants:**
- `primary` - Blue to purple gradient
- `secondary` - Purple to pink gradient
- `outline` - Transparent with border
- `ghost` - Minimal style

**Sizes:**
- `sm` - Small (px-4 py-2)
- `md` - Medium (px-6 py-3)
- `lg` - Large (px-8 py-4)

**Usage:**
```tsx
import { AnimatedButton } from "@/components/ui/animated-button";
import { Zap } from "lucide-react";

// Primary button
<AnimatedButton variant="primary" size="lg">
  Get Started
</AnimatedButton>

// With icon
<AnimatedButton 
  variant="primary" 
  icon={<Zap className="w-5 h-5" />}
>
  Start Now
</AnimatedButton>

// Loading state
<AnimatedButton loading={true}>
  Processing...
</AnimatedButton>

// Outline variant
<AnimatedButton variant="outline">
  Learn More
</AnimatedButton>
```

**Features:**
- Hover scale animation (1.05x)
- Tap scale animation (0.95x)
- Loading spinner
- Icon support
- Disabled state
- Gradient backgrounds

---

### 2. GlassCard

Glassmorphism cards with backdrop blur and hover effects.

**Props:**
- `hover` - Enable hover animation (default: true)
- `glow` - Add glow effect (default: false)
- `gradient` - Gradient background (default: false)

**Usage:**
```tsx
import { GlassCard } from "@/components/ui/glass-card";

// Basic card
<GlassCard>
  <h3>Card Title</h3>
  <p>Card content</p>
</GlassCard>

// With glow effect
<GlassCard glow>
  <h3>Important Card</h3>
</GlassCard>

// With gradient
<GlassCard gradient glow>
  <h3>Premium Card</h3>
</GlassCard>

// No hover effect
<GlassCard hover={false}>
  <h3>Static Card</h3>
</GlassCard>
```

**Features:**
- Glassmorphism effect
- Backdrop blur
- Hover lift animation
- Glow shadow effect
- Gradient backgrounds
- Smooth transitions

---

### 3. AILoader

AI-themed loading animation with rotating brain icon.

**Sizes:**
- `sm` - 8x8 (32px)
- `md` - 12x12 (48px)
- `lg` - 16x16 (64px)

**Usage:**
```tsx
import { AILoader } from "@/components/ui/ai-loader";

// Default
<AILoader />

// Custom text
<AILoader text="Analyzing your response..." />

// Different size
<AILoader size="lg" text="Processing..." />

// Small loader
<AILoader size="sm" text="Loading..." />
```

**Features:**
- Rotating brain icon
- Pulsing sparkles
- Customizable text
- Size variants
- Smooth animations
- AI-themed colors

---

### 4. GradientBorder

Animated gradient border wrapper component.

**Props:**
- `animate` - Enable animation (default: true)
- `borderWidth` - Border thickness (default: 2)

**Usage:**
```tsx
import { GradientBorder } from "@/components/ui/gradient-border";

// Animated border
<GradientBorder>
  <div className="p-8">
    <h3>Content with animated border</h3>
  </div>
</GradientBorder>

// Static border
<GradientBorder animate={false}>
  <div className="p-8">
    <h3>Content with static border</h3>
  </div>
</GradientBorder>

// Custom border width
<GradientBorder borderWidth={4}>
  <div className="p-8">
    <h3>Thick border</h3>
  </div>
</GradientBorder>
```

**Features:**
- Animated gradient
- Blue-purple-pink colors
- Smooth transitions
- Customizable width
- Rounded corners

---

### 5. FloatingPanel

Floating panel with smooth animations and glassmorphism.

**Props:**
- `delay` - Animation delay (default: 0)

**Usage:**
```tsx
import { FloatingPanel } from "@/components/ui/floating-panel";

// Basic panel
<FloatingPanel>
  <h3>Floating Content</h3>
  <p>This panel floats smoothly</p>
</FloatingPanel>

// With delay
<FloatingPanel delay={0.2}>
  <h3>Delayed Panel</h3>
</FloatingPanel>

// Multiple panels
<div className="grid grid-cols-3 gap-6">
  <FloatingPanel delay={0}>Panel 1</FloatingPanel>
  <FloatingPanel delay={0.1}>Panel 2</FloatingPanel>
  <FloatingPanel delay={0.2}>Panel 3</FloatingPanel>
</div>
```

**Features:**
- Float animation
- Glassmorphism
- Staggered delays
- Shadow effects
- Smooth transitions

---

### 6. AIWidget

AI status widget with animated indicators.

**Status:**
- `active` - Green indicator
- `idle` - Gray indicator
- `processing` - Blue indicator with animation

**Usage:**
```tsx
import { AIWidget } from "@/components/ui/ai-widget";

// Active widget
<AIWidget
  title="Interview Analysis"
  description="AI is analyzing your responses"
  status="active"
/>

// Processing widget
<AIWidget
  title="Generating Feedback"
  description="Creating personalized feedback"
  status="processing"
/>

// Idle widget
<AIWidget
  title="Voice Recognition"
  description="Ready to start"
  status="idle"
/>
```

**Features:**
- Status indicators
- Animated brain icon
- Sparkles effect
- Color-coded status
- Smooth animations

---

### 7. PageTransition

Page transition wrapper for smooth navigation.

**Usage:**
```tsx
import { PageTransition } from "@/components/ui/page-transition";

export default function MyPage() {
  return (
    <PageTransition>
      <div>
        <h1>Page Content</h1>
        <p>This page will transition smoothly</p>
      </div>
    </PageTransition>
  );
}
```

**Features:**
- Fade in/out
- Slide animation
- Automatic on route change
- Smooth transitions

---

## Dashboard Components

### 1. StatCard

Statistics card with icon and trend indicator.

**Usage:**
```tsx
import { StatCard } from "@/components/dashboard/stat-card";
import { Target } from "lucide-react";

<StatCard
  title="Total Interviews"
  value={47}
  change="+12% this week"
  icon={Target}
  gradient="from-blue-500 to-cyan-500"
  trend="up"
/>
```

**Features:**
- Icon with gradient
- Value display
- Trend indicator
- Change percentage
- Hover effects

---

### 2. ProgressChart

Performance chart with line graph.

**Usage:**
```tsx
import { ProgressChart } from "@/components/dashboard/progress-chart";

<ProgressChart />
```

**Features:**
- Responsive chart
- Custom styling
- Tooltip
- Grid lines
- Smooth curves

---

### 3. DashboardSidebar

Navigation sidebar with menu items.

**Usage:**
```tsx
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

<DashboardSidebar />
```

**Features:**
- 9 menu items
- Active states
- Hover animations
- Icons
- Logo

---

### 4. DashboardNavbar

Top navigation bar with search and profile.

**Usage:**
```tsx
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";

<DashboardNavbar />
```

**Features:**
- Search bar
- Notifications
- User profile
- Glassmorphism
- Fixed position

---

## Landing Components

### 1. Navbar

Responsive navigation with glassmorphism.

**Usage:**
```tsx
import { Navbar } from "@/components/landing/navbar";

<Navbar />
```

**Features:**
- Glassmorphism
- Mobile menu
- Smooth animations
- CTA buttons

---

### 2. HeroSection

Premium hero section with animations.

**Usage:**
```tsx
import { HeroSection } from "@/components/landing/hero-section";

<HeroSection />
```

**Features:**
- Animated orbs
- Grid background
- Stats display
- CTA buttons
- Scroll indicator

---

### 3. FeaturesSection

Feature showcase with cards.

**Usage:**
```tsx
import { FeaturesSection } from "@/components/landing/features-section";

<FeaturesSection />
```

**Features:**
- 6 feature cards
- Icon gradients
- Hover effects
- Responsive grid

---

### 4. PricingSection

Pricing tiers with gradient borders.

**Usage:**
```tsx
import { PricingSection } from "@/components/landing/pricing-section";

<PricingSection />
```

**Features:**
- 3 pricing plans
- Gradient borders
- Feature lists
- Popular badge
- CTA buttons

---

### 5. TestimonialsSection

User testimonials with ratings.

**Usage:**
```tsx
import { TestimonialsSection } from "@/components/landing/testimonials-section";

<TestimonialsSection />
```

**Features:**
- 6 testimonials
- Star ratings
- User avatars
- Responsive grid

---

### 6. Footer

Site footer with links.

**Usage:**
```tsx
import { Footer } from "@/components/landing/footer";

<Footer />
```

**Features:**
- Link sections
- Social icons
- Copyright
- Responsive layout

---

## Color Palette

### Gradients
```tsx
// Blue to Cyan
className="bg-gradient-to-r from-blue-500 to-cyan-500"

// Purple to Pink
className="bg-gradient-to-r from-purple-500 to-pink-500"

// Green to Emerald
className="bg-gradient-to-r from-green-500 to-emerald-500"

// Orange to Red
className="bg-gradient-to-r from-orange-500 to-red-500"

// Blue to Purple
className="bg-gradient-to-r from-blue-500 to-purple-500"
```

### Text Gradients
```tsx
className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
```

### Glassmorphism
```tsx
className="bg-white/5 backdrop-blur-xl border border-white/10"
```

---

## Animation Examples

### Hover Scale
```tsx
<motion.div whileHover={{ scale: 1.05 }}>
  Content
</motion.div>
```

### Fade In
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Slide Up
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Rotate
```tsx
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 2, repeat: Infinity }}
>
  Content
</motion.div>
```

---

## Responsive Utilities

### Grid Layouts
```tsx
// 1 column mobile, 2 tablet, 3 desktop
className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"

// 1 column mobile, 2 tablet, 4 desktop
className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
```

### Text Sizes
```tsx
// Responsive heading
className="text-4xl md:text-6xl lg:text-8xl"

// Responsive body
className="text-base md:text-lg lg:text-xl"
```

### Spacing
```tsx
// Responsive padding
className="p-4 md:p-6 lg:p-8"

// Responsive margin
className="mb-4 md:mb-6 lg:mb-8"
```

---

## Best Practices

1. **Always use TypeScript** for type safety
2. **Use Framer Motion** for animations
3. **Follow naming conventions** (PascalCase for components)
4. **Keep components small** and focused
5. **Use Tailwind utilities** instead of custom CSS
6. **Make components reusable** with props
7. **Add proper TypeScript types** for all props
8. **Use Lucide icons** for consistency
9. **Test on mobile** devices
10. **Optimize performance** with lazy loading

---

## Quick Reference

### Import Paths
```tsx
// UI Components
import { AnimatedButton } from "@/components/ui/animated-button";
import { GlassCard } from "@/components/ui/glass-card";
import { AILoader } from "@/components/ui/ai-loader";

// Dashboard Components
import { StatCard } from "@/components/dashboard/stat-card";
import { ProgressChart } from "@/components/dashboard/progress-chart";

// Landing Components
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";

// Hooks
import { useAuth } from "@/hooks/useAuth";

// Services
import { api } from "@/services/api";

// Utils
import { cn } from "@/lib/utils";
```

---

**All components are production-ready and fully responsive!** 🚀
