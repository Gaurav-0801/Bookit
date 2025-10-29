# BookIt Backend API

Express.js + TypeScript + PostgreSQL backend for the BookIt travel booking platform.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure environment (.env file)
DATABASE_URL='postgresql://...'
JWT_SECRET=your-secret-key
PORT=5000

# Push database schema
npm run db:push

# Seed database with sample data
npm run db:seed

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📝 Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## 🗄️ Database

Uses PostgreSQL with Prisma ORM. Schema includes:
- Users (authentication)
- Experiences (travel activities)
- Slots (available booking times)
- Bookings (user reservations)
- PromoCodes (discount codes)

## 🔐 Authentication

JWT-based authentication with bcryptjs for password hashing.

### Example Usage

```javascript
// Register
POST /api/auth/register
{ "email": "user@example.com", "password": "pass123", "name": "John" }

// Login - Returns JWT token
POST /api/auth/login
{ "email": "user@example.com", "password": "pass123" }

// Protected routes require Authorization header
Authorization: Bearer <jwt_token>
```

## 📚 API Endpoints

### Auth Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user (protected)

### Experience Routes (`/api/experiences`)
- `GET /` - Get all experiences (supports ?category= and ?search=)
- `GET /:id` - Get experience details with slots

### Booking Routes (`/api/bookings`) - All Protected
- `POST /` - Create new booking
- `GET /user/:userId` - Get user's bookings
- `GET /:id` - Get booking details

### Promo Routes (`/api/promo`)
- `POST /validate` - Validate promo code

## 🔧 Environment Variables

Required variables:

```env
DATABASE_URL='postgresql://user:password@host:port/database'
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 🛡️ Security Features

- Helmet.js for HTTP headers security
- CORS configuration
- JWT token validation
- Password hashing with bcryptjs
- Input validation with express-validator
- SQL injection protection (Prisma ORM)

## 🚀 Deployment

### Deploy to Render

1. Create new Web Service
2. Connect repository
3. Build Command: `npm install && npm run build`
4. Start Command: `npm start`
5. Add all environment variables
6. Create PostgreSQL database add-on
7. Deploy!

### Deploy to Railway

1. Create new project
2. Add PostgreSQL database
3. Add service from GitHub repo
4. Configure environment variables
5. Deploy automatically!

## 📦 Dependencies

**Production:**
- express - Web framework
- prisma/@prisma/client - Database ORM
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- cors - Cross-origin resource sharing
- helmet - Security middleware
- express-validator - Input validation
- dotenv - Environment variables

**Development:**
- typescript - Type safety
- ts-node - TypeScript execution
- nodemon - Auto-reload dev server
- @types/* - TypeScript definitions

## 🎯 Features

- ✅ RESTful API design
- ✅ TypeScript for type safety
- ✅ Prisma ORM with PostgreSQL
- ✅ JWT authentication
- ✅ Transaction support for bookings
- ✅ Slot capacity management
- ✅ Promo code system
- ✅ Comprehensive error handling
- ✅ Input validation
- ✅ CORS and security headers

## 📊 Database Seeding

The seed script (`prisma/seed.ts`) populates the database with:
- 12 unique travel experiences across different categories
- 1080+ time slots for the next 30 days
- 3 sample promo codes (SAVE10, FLAT100, WELCOME20)

Run with: `npm run db:seed`

## 🐛 Debugging

Use Prisma Studio to view/edit database:
```bash
npm run db:studio
```

## 📄 License

MIT


