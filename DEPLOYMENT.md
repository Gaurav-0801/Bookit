# Deployment Guide

This guide covers deploying the BookIt application to production.

## 📋 Prerequisites

- GitHub account
- Render/Railway account (for backend)
- Vercel account (for frontend)
- PostgreSQL database (Neon recommended)

## 🗄️ Database Setup (Neon)

1. Go to [Neon](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Connection string format:
   ```
   postgresql://user:password@host/database?sslmode=require
   ```

## 🔧 Backend Deployment (Render)

### Step 1: Prepare Repository

Ensure your backend code is pushed to GitHub.

### Step 2: Create Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure service:
   - **Name**: `bookit-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm start`

### Step 3: Environment Variables

Add the following environment variables:

```env
DATABASE_URL=<your-neon-connection-string>
JWT_SECRET=<generate-a-secure-random-string>
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=production
FRONTEND_URL=<your-vercel-frontend-url>
```

**Generate secure JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait for build to complete
3. Once deployed, copy the service URL (e.g., `https://bookit-backend.onrender.com`)

### Step 5: Initialize Database

In Render dashboard, open Shell and run:

```bash
npx prisma db push
npx ts-node prisma/seed.ts
```

Or create a one-time job to seed the database.

## ⚡ Backend Deployment (Railway) - Alternative

### Step 1: Create Project

1. Go to [Railway](https://railway.app)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**

### Step 2: Add Database

1. Click **"+ New"** → **"Database"** → **"PostgreSQL"**
2. Railway automatically creates DATABASE_URL

### Step 3: Configure Service

1. Select your backend service
2. Go to **Settings** → **Environment Variables**
3. Add all environment variables (except DATABASE_URL - already added)

### Step 4: Configure Build

In Settings:
- **Root Directory**: `backend`
- **Build Command**: `npm install && npx prisma generate && npm run build`
- **Start Command**: `npm start`

### Step 5: Deploy & Seed

1. Deploy automatically starts
2. After deployment, open Shell and run:
   ```bash
   npm run db:push
   npm run db:seed
   ```

## 🎨 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

Ensure your frontend code is pushed to GitHub.

### Step 2: Import Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your GitHub repository

### Step 3: Configure Project

- **Framework Preset**: Next.js
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)

### Step 4: Environment Variables

Add environment variable:

```env
NEXT_PUBLIC_API_URL=<your-backend-url>
```

Example: `https://bookit-backend.onrender.com`

⚠️ **Important**: Remove trailing slash from URL!

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (usually 1-2 minutes)
3. Your app will be live at `https://your-project.vercel.app`

### Step 6: Update Backend CORS

Go back to your backend deployment (Render/Railway) and update the `FRONTEND_URL` environment variable with your Vercel URL:

```env
FRONTEND_URL=https://your-project.vercel.app
```

Then redeploy the backend service.

## 🔄 Continuous Deployment

Both Vercel and Render/Railway support automatic deployments:

- **Push to `main` branch** → Automatic deployment
- **Pull requests** → Preview deployments (Vercel)

## ✅ Post-Deployment Checklist

### Backend Health Check

```bash
curl https://your-backend.onrender.com/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "2025-10-28T..."
}
```

### Test API Endpoints

```bash
# Get experiences
curl https://your-backend.onrender.com/api/experiences

# Register user
curl -X POST https://your-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'
```

### Frontend Verification

1. Visit your Vercel URL
2. Check experiences load correctly
3. Test registration and login
4. Complete a full booking flow
5. Verify promo codes work
6. Check "My Bookings" page

## 🐛 Common Issues

### Issue: CORS Error

**Solution:** 
- Verify `FRONTEND_URL` is set correctly in backend
- No trailing slash in URLs
- Redeploy backend after changing env vars

### Issue: Database Connection Failed

**Solution:**
- Check DATABASE_URL format
- Ensure `?sslmode=require` is in connection string
- Verify database is running (Neon/Railway)

### Issue: API Requests Fail from Frontend

**Solution:**
- Check `NEXT_PUBLIC_API_URL` in Vercel
- Verify backend is deployed and running
- Check browser console for specific errors
- Ensure backend URL doesn't have trailing slash

### Issue: Images Not Loading

**Solution:**
- Add image domains to `next.config.ts`:
```typescript
images: {
  domains: ['images.unsplash.com'],
}
```

### Issue: Prisma Client Not Found

**Solution:**
- Ensure `npx prisma generate` runs in build command
- Check build logs for errors

## 🔐 Security Considerations

### Production Checklist

- ✅ Use strong JWT_SECRET (32+ characters, random)
- ✅ Enable HTTPS (automatic on Render/Vercel)
- ✅ Set secure CORS policy
- ✅ Use environment variables for all secrets
- ✅ Never commit `.env` files
- ✅ Use connection pooling for database (Neon provides this)
- ✅ Implement rate limiting (future enhancement)
- ✅ Keep dependencies updated

### Environment Variable Management

**Never:**
- Commit `.env` files to git
- Share `.env` files publicly
- Use development secrets in production

**Always:**
- Use platform environment variables
- Rotate secrets periodically
- Use different secrets per environment

## 📊 Monitoring

### Render
- View logs in dashboard
- Set up health checks
- Monitor resource usage

### Vercel
- View deployment logs
- Analytics dashboard
- Performance insights

### Database (Neon)
- Monitor connection count
- Check query performance
- Review storage usage

## 🚀 Performance Optimization

### Backend
- Enable caching headers
- Use database indexes (Prisma)
- Optimize queries
- Enable compression

### Frontend
- Next.js automatic optimization
- Image optimization enabled
- Static page generation where possible
- CDN by default (Vercel)

## 💰 Cost Estimation

### Free Tier Limits

**Neon (Database):**
- 1 free project
- 3 GB storage
- Suitable for testing/demo

**Render:**
- Free tier available
- May sleep after 15 min inactivity
- 750 hours/month free

**Railway:**
- $5 free credit/month
- Pay-as-you-go after that

**Vercel:**
- Unlimited hobby projects
- 100 GB bandwidth/month
- Perfect for this project

### Estimated Monthly Cost
- **Development/Demo**: $0 (using free tiers)
- **Production (Low Traffic)**: $5-10/month
- **Production (Medium Traffic)**: $25-50/month

## 📱 Custom Domain (Optional)

### Vercel (Frontend)
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS as instructed

### Render (Backend)
1. Go to Service Settings → Custom Domain
2. Add your API subdomain (e.g., `api.yourdomain.com`)
3. Configure DNS

## 🔄 Update Workflow

1. **Make changes locally**
2. **Test locally** (both frontend & backend)
3. **Commit and push** to GitHub
4. **Automatic deployment** triggers
5. **Verify deployment** on live sites
6. **Monitor** logs for any issues

## 📞 Support Resources

- [Render Docs](https://render.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [Neon Docs](https://neon.tech/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Next.js Docs](https://nextjs.org/docs)

---

**Deployment complete! Your BookIt application is now live! 🎉**


