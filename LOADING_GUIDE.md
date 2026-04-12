# Loading Components Guide

This project uses **lottie-react** for beautiful, smooth loading animations.

## Components Created

### 1. Loading Component (`components/Loading.tsx`)
A reusable Lottie loading component with a sushi-themed animation.

**Usage:**
```tsx
import Loading from '@/components/Loading';

<Loading size={200} className="my-custom-class" />
```

**Props:**
- `size?: number` - Width/height of the animation (default: 200)
- `className?: string` - Additional CSS classes

### 2. SkeletonCard Component (`components/SkeletonCard.tsx`)
A skeleton placeholder that shows while menu item images are loading.

**Usage:**
```tsx
import SkeletonCard from '@/components/SkeletonCard';

{isLoading ? (
  Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
) : (
  <MenuItems />
)}
```

## Current Implementation

The Menu component (`components/Menu.tsx`) now shows:
1. **Lottie Loading Animation** - Displayed when switching categories (1.5s delay)
2. **Skeleton Cards** - Shown in the product grid while content loads
3. **Image Load Tracking** - Monitors which images have loaded

## How to Add More Lottie Animations

### Option 1: Use LottieFiles (Recommended)
1. Go to https://lottiefiles.com/
2. Find a free animation you like
3. Download the JSON file
4. Save it to `public/animations/your-animation.json`
5. Import and use it:

```tsx
import Lottie from 'lottie-react';
import animationData from '@/public/animations/sushi.json';

<Lottie animationData={animationData} loop={true} />
```

### Option 2: Use LottieFiles CDN URL
```tsx
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

const [data, setData] = useState(null);

useEffect(() => {
  fetch('https://lottie.host/your-animation-url.json')
    .then(res => res.json())
    .then(setData);
}, []);

{data && <Lottie animationData={data} loop={true} />}
```

## Popular Lottie Animation Categories

- **Food & Cooking**: https://lottiefiles.com/search?q=food&category=animations
- **Loading Spinners**: https://lottiefiles.com/search?q=loading&category=animations
- **Shopping/Cart**: https://lottiefiles.com/search?q=shopping&category=animations
- **Sushi**: https://lottiefiles.com/search?q=sushi&category=animations

## Tips

- Use `loop={true}` for continuous loading animations
- Use `autoplay={true}` to start immediately
- Keep animation files small (<500KB) for better performance
- Always provide a fallback in case the animation fails to load
