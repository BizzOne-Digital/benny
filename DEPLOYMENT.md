# Deployment Guide - Team TEXAS Special Needs

## Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Vercel account (for deployment)
- Git installed

## Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/team-texas?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_SECRET=your-secure-random-string-here
NEXTAUTH_URL=http://localhost:3000

# Admin Credentials (for seeding)
ADMIN_EMAIL=admin@teamtexasspecialneeds.org
ADMIN_PASSWORD=YourSecurePassword123!

# Node Environment
NODE_ENV=development
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address (or use `0.0.0.0/0` for development)
5. Get connection string and add to `.env` as `MONGODB_URI`

### 4. Seed the Database

```bash
npm run seed
```

This creates:
- Admin user with credentials from `.env`
- Site settings with organization info
- Sample pages, services, FAQs
- Gallery categories

### 5. Run Development Server

```bash
npm run dev
```

Visit:
- Public site: http://localhost:3000
- Admin portal: http://localhost:3000/admin

**Admin Login:** Use `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env`

## Production Deployment (Vercel)

### 1. Prepare Repository

Ensure your code is in a Git repository:

```bash
git init
git add .
git commit -m "Initial commit"
```

Push to GitHub, GitLab, or Bitbucket.

### 2. Deploy to Vercel

#### Option A: Vercel Dashboard

1. Go to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** ./
   - **Build Command:** npm run build
   - **Output Directory:** .next

#### Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

### 3. Configure Environment Variables in Vercel

Go to your project settings → Environment Variables and add:

```env
MONGODB_URI=your-production-mongodb-uri
NEXTAUTH_SECRET=your-secure-random-string
NEXTAUTH_URL=https://your-domain.vercel.app
ADMIN_EMAIL=admin@teamtexasspecialneeds.org
ADMIN_PASSWORD=your-secure-password
NODE_ENV=production
```

### 4. Set Up Vercel Blob Storage (for Production Images)

Images need persistent storage in production (local uploads won't work on Vercel):

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Link your project
vercel link

# Create a blob store
vercel blob create production
```

This generates `BLOB_READ_WRITE_TOKEN`. Add it to Vercel environment variables:

```env
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
```

### 5. Redeploy

After adding environment variables:

```bash
vercel --prod
```

Or trigger a new deployment from the Vercel dashboard.

### 6. Seed Production Database

After first deployment, seed the production database:

```bash
# Using Vercel CLI with production environment
vercel env pull .env.production.local
npm run seed
```

Or run the seed script through a one-time serverless function.

## Custom Domain Setup

1. Go to Vercel project settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` environment variable to your custom domain
5. Redeploy

## MongoDB Compass (Local Database Inspection)

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Open Compass
3. Paste your `MONGODB_URI` connection string
4. Click "Connect"
5. Browse collections, run queries, manage data

## Post-Deployment Checklist

- [ ] Verify MongoDB connection is working
- [ ] Test admin login at `/admin/login`
- [ ] Check all public pages load correctly
- [ ] Test contact form submission
- [ ] Verify images upload and display correctly
- [ ] Test responsive design on mobile/tablet
- [ ] Check browser console for errors
- [ ] Test all admin CRUD operations
- [ ] Verify settings changes update header/footer
- [ ] Check SEO metadata is rendering
- [ ] Test 404 page
- [ ] Confirm reduced motion works

## Troubleshooting

### Build Errors

**"Module not found" errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**
```bash
npm run type-check
```

### Database Connection Issues

**"MongoServerError: Authentication failed":**
- Check username/password in connection string
- Verify database user has correct permissions

**"Connection timeout":**
- Check IP whitelist in MongoDB Atlas
- Verify connection string format

### Image Upload Issues

**Local development:**
- Ensure `public/uploads` directory exists
- Check folder permissions

**Production:**
- Verify `BLOB_READ_WRITE_TOKEN` is set
- Check Vercel Blob storage is created
- Review function logs for errors

### NextAuth Errors

**"NEXTAUTH_URL is not set":**
- Add `NEXTAUTH_URL` to environment variables
- Must match your deployment URL exactly

**"Invalid credentials":**
- Verify admin user exists in database
- Check password was hashed correctly during seed

## Updating Content

### Through Admin Portal

1. Login to `/admin`
2. Navigate to section (Pages, Services, etc.)
3. Edit content
4. Save changes
5. Changes appear immediately on public site

### Direct Database Editing

Use MongoDB Compass or Atlas dashboard to directly edit documents. Useful for:
- Bulk updates
- Schema fixes
- Emergency content changes

## Monitoring

### Vercel Analytics

Enable in project settings → Analytics for:
- Page views
- Performance metrics
- User insights

### Error Tracking

Check Vercel logs:
```bash
vercel logs
```

Or view in dashboard → Deployments → Select deployment → Logs

## Backup Strategy

### Database Backups

**MongoDB Atlas:** Automatic backups included in paid tiers

**Manual Export:**
```bash
mongodump --uri="your-mongodb-uri"
```

### Code Backups

Keep Git repository updated:
```bash
git push origin main
```

## Performance Optimization

1. **Enable Vercel Speed Insights**
2. **Optimize images:** Use WebP/AVIF formats
3. **Enable caching:** Already configured in `next.config.mjs`
4. **Monitor Core Web Vitals** through Vercel Analytics

## Security Best Practices

- [ ] Change default admin password immediately
- [ ] Use strong, unique passwords
- [ ] Keep dependencies updated: `npm update`
- [ ] Review audit logs regularly
- [ ] Enable 2FA on Vercel and MongoDB Atlas accounts
- [ ] Never commit `.env` files
- [ ] Rotate `NEXTAUTH_SECRET` periodically
- [ ] Monitor failed login attempts

## Support

For technical issues with this codebase:
- Check `README.md` for architecture details
- Review model schemas in `src/models/`
- Check validation rules in `src/lib/validations.ts`
- Examine API routes in `src/app/api/`

---

**Deployment Status Checklist:**

- [ ] Local development working
- [ ] Database seeded successfully  
- [ ] Admin login functional
- [ ] Production deployed to Vercel
- [ ] Environment variables configured
- [ ] Blob storage set up
- [ ] Custom domain configured (if applicable)
- [ ] Content editable through admin
- [ ] Contact form receiving submissions
- [ ] All pages accessible and responsive

**You're ready to go! 🚀**
