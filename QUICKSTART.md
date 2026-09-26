# Quick Start Guide

Get Team TEXAS Special Needs website running in 5 minutes!

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- MongoDB Atlas account (free tier works)

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

```bash
# Copy environment template
cp .env.example .env

# Generate a secure secret
openssl rand -base64 32
```

Edit `.env` with your values:

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/teamtexas
NEXTAUTH_SECRET=paste-generated-secret-here
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=ChangeThisPassword123!
NODE_ENV=development
```

### 3. Get MongoDB Connection String

**Option A: MongoDB Atlas (Recommended)**

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (for dev)
5. Click "Connect" → "Connect your application"
6. Copy connection string to `.env`

**Option B: Local MongoDB**

```bash
# If you have MongoDB installed locally
MONGODB_URI=mongodb://localhost:27017/teamtexas
```

### 4. Seed Database

```bash
npm run seed
```

Output shows your admin credentials.

### 5. Start Development Server

```bash
npm run dev
```

Visit:
- **Public Site:** http://localhost:3000
- **Admin Portal:** http://localhost:3000/admin

## First Steps After Setup

### 1. Login to Admin

1. Go to http://localhost:3000/admin/login
2. Use credentials from seed output
3. You'll see the dashboard

### 2. Update Site Settings

1. Admin → Settings
2. Update organization details
3. Add social media links
4. Save changes

### 3. Customize Homepage

1. Admin → Pages → Home
2. Edit hero section
3. Change text and images
4. Save

### 4. Add Your First Service

1. Admin → Services → Add New
2. Fill in details
3. Upload image
4. Publish

### 5. Test Contact Form

1. Go to http://localhost:3000/contact
2. Fill out form
3. Submit
4. Check Admin → Inquiries

## Common Issues

### "Cannot connect to MongoDB"

- Check `MONGODB_URI` is correct
- Verify network access in Atlas
- Confirm database user credentials

### "Invalid credentials" on login

- Run seed script again: `npm run seed`
- Check `.env` has correct credentials
- Verify database is accessible

### Port 3000 already in use

```bash
# Use different port
PORT=3001 npm run dev
```

### Images not uploading

- Check `public/uploads` folder exists
- Verify folder permissions
- For production, set up Vercel Blob

## Next Steps

1. **Customize Content**
   - Replace placeholder images
   - Update all text content
   - Add real team members

2. **Configure Features**
   - Add gallery categories and images
   - Create FAQs
   - Write blog posts

3. **Deploy**
   - See [DEPLOYMENT.md](DEPLOYMENT.md)
   - Push to GitHub
   - Deploy to Vercel

## Development Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Check TypeScript

# Testing
npm test                 # Run unit tests
npm run test:e2e        # Run E2E tests

# Database
npm run seed            # Seed database
```

## Getting Help

- Check [README.md](README.md) for full documentation
- Review [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
- See [FEATURES.md](FEATURES.md) for feature list
- Check [CONTRIBUTING.md](CONTRIBUTING.md) for development guide

## Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── (public)/       # Public routes
│   ├── admin/          # Admin portal
│   └── api/            # API routes
├── components/         # React components
├── lib/                # Utilities
├── models/             # Database models
└── types/              # TypeScript types
```

## Key Files

- `src/lib/mongodb.ts` - Database connection
- `src/lib/auth.ts` - Authentication setup
- `src/models/` - All database schemas
- `tailwind.config.ts` - Design system
- `.env` - Environment configuration

---

**You're all set! 🚀**

Start customizing your site through the admin panel at http://localhost:3000/admin
