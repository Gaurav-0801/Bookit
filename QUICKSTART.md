# 🚀 BookIt - Quick Start Guide

Get the BookIt application running locally in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn installed
- The database is already set up (Neon PostgreSQL)

## Step 1: Clone & Install (2 minutes)

```bash
# Navigate to project directory
cd Travel

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
cd ..
```

## Step 2: Backend Setup (1 minute)

```bash
cd backend

# The .env file should already exist with database credentials
# If not, create .env file:
# DATABASE_URL='postgresql://neondb_owner:npg_Zsa1exiFm2AY@ep-falling-wave-a47k7nmv-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
# JWT_SECRET=your-super-secret-jwt-key
# JWT_EXPIRES_IN=7d
# PORT=5000
# NODE_ENV=development
# FRONTEND_URL=http://localhost:3000

# Generate Prisma Client
npx prisma generate

# Push database schema (if not already done)
npx prisma db push

# Seed database with sample data
npm run db:seed

# Start backend server
npm run dev
```

Backend will run on **http://localhost:5000**

## Step 3: Frontend Setup (1 minute)

Open a new terminal:

```bash
cd frontend

# Create .env.local file:
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local

# Start frontend server
npm run dev
```

Frontend will run on **http://localhost:3000**

## Step 4: Test the Application (1 minute)

1. Open **http://localhost:3000** in your browser
2. You should see the home page with 12 travel experiences
3. Click on any experience to view details
4. Try the search and filter features

### Test Account Registration

1. Click **"Sign Up"** in the header
2. Create a new account:
   - Name: John Doe
   - Email: john@example.com
   - Password: test123
3. You'll be automatically logged in

### Test Booking Flow

1. Select an experience (e.g., "Sunset Safari Adventure")
2. Choose a date from the calendar
3. Select an available time slot
4. Click **"Book Now"**
5. On the checkout page, try a promo code:
   - **SAVE10** (10% discount)
   - **FLAT100** ($100 off)
   - **WELCOME20** (20% discount)
6. Click **"Confirm Booking"**
7. See your booking confirmation!

### View Your Bookings

1. Click **"My Bookings"** in the header
2. See all your completed bookings
3. Click **"View Details"** on any booking

## 🎯 Sample Data

The database is seeded with:
- **12 unique experiences** across categories:
  - Adventure
  - Cultural
  - Food & Wine
  - Nature
  - Water Sports
- **1080+ time slots** for the next 30 days
- **3 promo codes**: SAVE10, FLAT100, WELCOME20

## 🔧 Troubleshooting

### Backend won't start
```bash
# Make sure .env file exists
cd backend
ls -la .env

# Check database connection
npx prisma db pull
```

### Frontend can't connect to backend
```bash
# Verify .env.local exists
cd frontend
cat .env.local

# Should show: NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Database errors
```bash
# Reset and reseed database
cd backend
npx prisma db push --force-reset
npm run db:seed
```

### Port already in use
```bash
# Backend (port 5000)
# Change PORT in backend/.env to different port like 5001

# Frontend (port 3000)
# Next.js will prompt to use 3001 automatically
```

## 📱 Test on Mobile

1. Find your local IP address:
   ```bash
   # Mac/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. Update frontend/.env.local:
   ```env
   NEXT_PUBLIC_API_URL=http://YOUR_IP:5000
   ```

3. Update backend/.env:
   ```env
   FRONTEND_URL=http://YOUR_IP:3000
   ```

4. Restart both servers

5. Visit `http://YOUR_IP:3000` on your mobile device

## 🎨 Features to Test

### ✅ Authentication
- [x] Register new user
- [x] Login with credentials
- [x] Logout
- [x] Protected routes redirect to login
- [x] User info persists

### ✅ Experience Browsing
- [x] View all experiences
- [x] Filter by category
- [x] Search experiences
- [x] View experience details
- [x] See available slots

### ✅ Booking
- [x] Select date and time
- [x] Checkout process
- [x] Apply promo codes
- [x] Create booking
- [x] View confirmation
- [x] See booking history

### ✅ Responsive Design
- [x] Mobile layout
- [x] Tablet layout
- [x] Desktop layout

## 🚀 Ready to Deploy?

Check out [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step deployment instructions to Render/Railway (backend) and Vercel (frontend).

## 📚 Need More Help?

- **Full documentation**: See [README.md](./README.md)
- **API docs**: See [backend/README.md](./backend/README.md)
- **Frontend guide**: See [frontend/README.md](./frontend/README.md)
- **Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Setup checklist**: See [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)

---

**Happy coding! 🎉**


