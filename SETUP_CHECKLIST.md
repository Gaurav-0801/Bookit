# BookIt Setup Checklist

## ✅ Local Development Setup

### Backend Setup
- [ ] Navigate to `backend` directory
- [ ] Run `npm install`
- [ ] Create `.env` file with:
  ```env
  DATABASE_URL='postgresql://neondb_owner:npg_Zsa1exiFm2AY@ep-falling-wave-a47k7nmv-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
  JWT_SECRET=your-super-secret-jwt-key
  JWT_EXPIRES_IN=7d
  PORT=5000
  NODE_ENV=development
  FRONTEND_URL=http://localhost:3000
  ```
- [ ] Run `npx prisma generate`
- [ ] Run `npx prisma db push`
- [ ] Run `npm run db:seed`
- [ ] Run `npm run dev`
- [ ] Verify backend is running at `http://localhost:5000`
- [ ] Test health endpoint: `http://localhost:5000/health`

### Frontend Setup
- [ ] Navigate to `frontend` directory
- [ ] Run `npm install`
- [ ] Create `.env.local` file with:
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:5000
  ```
- [ ] Run `npm run dev`
- [ ] Verify frontend is running at `http://localhost:3000`
- [ ] Test home page loads experiences

### Local Testing
- [ ] Register a new user
- [ ] Login with created user
- [ ] Browse experiences
- [ ] Select an experience and view details
- [ ] Choose a date and time slot
- [ ] Complete checkout (try promo codes: SAVE10, FLAT100, WELCOME20)
- [ ] View booking confirmation
- [ ] Check "My Bookings" page
- [ ] Logout and login again

## 🚀 Production Deployment

### Database (Neon) - Already Set Up ✅
- [x] Database URL provided and working
- [ ] Note down the connection string for deployment

### Backend Deployment (Render or Railway)

#### Option A: Render
- [ ] Create Render account
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Set root directory to `backend`
- [ ] Set build command: `npm install && npx prisma generate && npm run build`
- [ ] Set start command: `npm start`
- [ ] Add environment variables:
  - DATABASE_URL (Neon connection string)
  - JWT_SECRET (generate secure key)
  - JWT_EXPIRES_IN=7d
  - PORT=5000
  - NODE_ENV=production
  - FRONTEND_URL (will update after frontend deployment)
- [ ] Deploy service
- [ ] Note down backend URL (e.g., `https://bookit-backend.onrender.com`)
- [ ] Open Shell and run:
  ```bash
  npx prisma db push
  npx ts-node prisma/seed.ts
  ```
- [ ] Test API: `curl https://your-backend-url/health`

#### Option B: Railway
- [ ] Create Railway account
- [ ] Create new project from GitHub repo
- [ ] Add PostgreSQL database (or use Neon connection string)
- [ ] Configure environment variables (same as Render)
- [ ] Deploy automatically
- [ ] Run seed command in Shell
- [ ] Test API endpoint

### Frontend Deployment (Vercel)
- [ ] Create Vercel account
- [ ] Import GitHub repository
- [ ] Set framework preset to Next.js
- [ ] Set root directory to `frontend`
- [ ] Add environment variable:
  - NEXT_PUBLIC_API_URL=<your-backend-url>
- [ ] Deploy
- [ ] Note down frontend URL (e.g., `https://bookit.vercel.app`)
- [ ] Go back to backend and update FRONTEND_URL env var
- [ ] Redeploy backend

### Post-Deployment Testing
- [ ] Visit frontend URL
- [ ] Verify experiences load
- [ ] Test user registration
- [ ] Test user login
- [ ] Complete full booking flow
- [ ] Test promo codes work
- [ ] Check booking confirmation
- [ ] Verify "My Bookings" page
- [ ] Test on mobile device
- [ ] Test on tablet
- [ ] Check console for errors

## 📝 Submission Checklist

### Code Quality
- [ ] All TypeScript types properly defined
- [ ] No console errors in browser
- [ ] No linter errors
- [ ] Clean code structure
- [ ] Comments where necessary

### Functionality
- [ ] Full authentication system working
- [ ] Experience browsing with filters
- [ ] Slot selection working
- [ ] Booking flow complete
- [ ] Promo codes functional
- [ ] Booking history visible
- [ ] Responsive on all devices

### Documentation
- [ ] Root README.md complete
- [ ] Backend README.md complete
- [ ] Frontend README.md complete
- [ ] DEPLOYMENT.md with full instructions
- [ ] All environment variables documented
- [ ] API endpoints documented

### Deployment
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Database seeded with sample data
- [ ] All features working in production
- [ ] URLs provided for review

## 🎯 Deliverables

### GitHub Repository
- [ ] Code pushed to GitHub
- [ ] Clear commit history
- [ ] README in root directory

### Live URLs
- [ ] Backend API URL: ____________________
- [ ] Frontend App URL: ____________________

### Documentation
- [ ] Setup instructions clear
- [ ] API documentation complete
- [ ] Deployment guide provided

### Features Checklist
- [ ] Home page with experience grid ✨
- [ ] Search and filter functionality 🔍
- [ ] Experience details page 📄
- [ ] Slot selection with calendar 📅
- [ ] User authentication (register/login) 🔐
- [ ] Checkout with promo codes 💳
- [ ] Booking confirmation page ✅
- [ ] My Bookings page 📋
- [ ] Responsive design 📱
- [ ] Loading states ⏳
- [ ] Error handling ⚠️
- [ ] Form validation ✔️

## 🎨 Design Fidelity
- [ ] Clean, modern UI
- [ ] Consistent spacing
- [ ] Proper typography
- [ ] Color scheme consistent
- [ ] Professional appearance
- [ ] Mobile-friendly
- [ ] Good UX patterns

## 🔧 Technical Requirements
- [ ] Frontend: Next.js + TypeScript + TailwindCSS
- [ ] Backend: Express.js + TypeScript
- [ ] Database: PostgreSQL with Prisma
- [ ] Authentication: JWT-based
- [ ] API: RESTful endpoints
- [ ] Validation: Form and server-side
- [ ] Transaction handling for bookings
- [ ] Prevents double-booking

## 📊 Testing Scenarios

### User Registration & Authentication
- [ ] New user can register
- [ ] User can login
- [ ] Invalid credentials rejected
- [ ] Token persists across page reloads
- [ ] User can logout
- [ ] Protected routes redirect to login

### Experience Browsing
- [ ] All experiences display correctly
- [ ] Category filter works
- [ ] Search functionality works
- [ ] Experience cards show all info
- [ ] Click opens details page

### Booking Flow
- [ ] Can select experience
- [ ] Can choose date
- [ ] Can select time slot
- [ ] Sold-out slots shown correctly
- [ ] Capacity limits respected
- [ ] Checkout shows correct info
- [ ] Promo codes apply discount
- [ ] Invalid promo codes rejected
- [ ] Booking creates successfully
- [ ] Confirmation shows all details

### My Bookings
- [ ] All user bookings displayed
- [ ] Booking details accessible
- [ ] Status shown correctly
- [ ] Empty state for no bookings

## 🐛 Known Issues to Check
- [ ] CORS configured correctly
- [ ] Image loading works
- [ ] Date formatting correct
- [ ] Price calculations accurate
- [ ] Timezone handling
- [ ] Mobile menu works
- [ ] Form submission handling

## 💡 Bonus Points
- [ ] Beautiful, polished UI
- [ ] Smooth animations/transitions
- [ ] Good error messages
- [ ] Loading states
- [ ] Empty states
- [ ] Professional presentation
- [ ] Extra features beyond requirements

---

**Ready for submission when all checkboxes are checked! ✅**


