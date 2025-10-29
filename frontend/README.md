# BookIt Frontend

Next.js 14 + TypeScript + TailwindCSS frontend for the BookIt travel booking platform.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure environment (.env.local file)
NEXT_PUBLIC_API_URL=http://localhost:5000

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📝 Available Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#2563eb)
- **Secondary**: Slate (#64748b)
- **Accent**: Amber (#f59e0b)
- **Success**: Green (#10b981)
- **Error**: Red (#ef4444)

### Typography
- System fonts for optimal performance
- Font weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Breakpoints
- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+

## 📱 Pages

### Public Pages
- `/` - Home page with experience grid and filters
- `/experiences/[id]` - Experience details with slot selection
- `/login` - User login
- `/register` - User registration

### Protected Pages (Require Authentication)
- `/checkout` - Booking checkout with promo codes
- `/booking/[id]` - Booking confirmation/result
- `/my-bookings` - User's booking history

## 🔧 Project Structure

```
frontend/
├── src/
│   └── app/               # Next.js App Router pages
│       ├── layout.tsx     # Root layout
│       ├── page.tsx       # Home page
│       ├── login/         # Login page
│       ├── register/      # Register page
│       ├── experiences/[id]/ # Experience details
│       ├── checkout/      # Checkout page
│       ├── booking/[id]/  # Booking result
│       └── my-bookings/   # User bookings
├── components/            # Reusable components
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Site footer
│   ├── ExperienceCard.tsx # Experience display card
│   └── LoadingSpinner.tsx # Loading indicator
├── contexts/             # React contexts
│   └── AuthContext.tsx   # Authentication context
├── lib/                  # Utilities
│   └── api.ts           # API client (Axios)
├── types/               # TypeScript types
│   └── index.ts         # Shared types
└── hooks/               # Custom hooks
```

## 🔐 Authentication Flow

1. User registers/logs in
2. JWT token received and stored in localStorage
3. Token automatically added to API requests
4. AuthContext provides auth state globally
5. Protected routes redirect to login if not authenticated

## 📡 API Integration

All API calls go through `lib/api.ts` using Axios:

```typescript
import { experienceAPI, bookingAPI, authAPI, promoAPI } from '@/lib/api';

// Example: Fetch experiences
const { experiences } = await experienceAPI.getAll();

// Example: Create booking (requires auth)
const { booking } = await bookingAPI.create({
  experienceId: '...',
  slotId: '...',
  promoCode: 'SAVE10'
});
```

## 🎯 Key Features

### Experience Browsing
- Grid layout with beautiful cards
- Category filtering
- Search functionality
- Responsive design

### Booking Flow
1. Browse experiences
2. Select experience → View details
3. Choose date and time slot
4. Login (if not authenticated)
5. Checkout with optional promo code
6. Confirmation page

### Slot Selection
- Calendar-style date picker
- Time slot availability display
- Real-time capacity updates
- Sold-out slot indication

### Promo Code System
- Apply codes at checkout
- Real-time validation
- Price calculation with discounts
- Support for percentage & flat discounts

## 🌐 Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

For production, update to your deployed backend URL.

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project to Vercel
3. Set root directory: `frontend`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL=<your-backend-url>`
5. Deploy!

### Automatic Deployment
Vercel automatically deploys on every push to main branch.

## 📦 Dependencies

**Core:**
- next - React framework
- react & react-dom - UI library
- typescript - Type safety

**Styling:**
- tailwindcss - Utility-first CSS
- @tailwindcss/postcss - Tailwind v4 PostCSS

**Data Fetching & Forms:**
- axios - HTTP client
- react-hook-form - Form management
- zod - Schema validation
- @hookform/resolvers - Form + Zod integration

**Utilities:**
- date-fns - Date formatting

## 🎨 Component Library

### ExperienceCard
Displays experience with image, title, location, price, rating, and duration.

### Header
Navigation with logo, links, and auth buttons. Shows user name when logged in.

### Footer
Site footer with links and contact info.

### LoadingSpinner
Animated loading indicator with configurable sizes (sm/md/lg).

## 🔒 Protected Routes

Routes that require authentication automatically redirect to `/login`:
- `/checkout`
- `/booking/[id]`
- `/my-bookings`

Implemented using `useAuth()` hook and checking `isAuthenticated`.

## 🐛 Debugging

### Common Issues

**API not connecting:**
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure backend is running
- Check browser console for CORS errors

**Auth not persisting:**
- Check localStorage for 'token'
- Verify JWT token is valid
- Check token expiration

**Images not loading:**
- Next.js Image component requires proper configuration
- External images need domains added to `next.config.ts`

## 📱 Responsive Design

All pages are fully responsive:
- **Mobile**: Single column, stacked layout
- **Tablet**: 2-column grid for experiences
- **Desktop**: 3-column grid, side-by-side layouts

## ✨ Best Practices

- ✅ TypeScript for type safety
- ✅ Server and client components appropriately used
- ✅ Loading and error states
- ✅ Form validation
- ✅ Accessible HTML
- ✅ SEO-friendly metadata
- ✅ Optimized images
- ✅ Clean code structure

## 📄 License

MIT