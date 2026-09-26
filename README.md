# Team TEXAS Special Needs Website & CMS

A complete, production-ready website and admin portal for Team TEXAS Special Needs organization.

## 🌟 Features

### Public Website
- **15+ Dynamic Pages**: Home, About, Services, Gallery, Testimonials, Shop, Team, Blog, Pricing, FAQ, Contact
- **Cinematic Animations**: GSAP + ScrollTrigger + Framer Motion
- **Fully Responsive**: Mobile-first design with Tailwind CSS
- **SEO Optimized**: Dynamic metadata, structured data, sitemap
- **Accessible**: WCAG 2.2 AA compliant with reduced motion support
- **Image Optimized**: Next.js Image component with AVIF/WebP

### Admin CMS Portal
- **Complete CRUD**: All content manageable through intuitive UI
- **Section-by-Section Editing**: Pages, Services, Gallery, Blog, Products, etc.
- **Media Library**: Upload, manage, and track image usage
- **Real Dashboard**: Live stats from database
- **Audit Logging**: Track all admin actions
- **Secure Authentication**: NextAuth.js with Argon2 password hashing

### Technical Stack
- **Framework**: Next.js 15 (App Router) + TypeScript
- **Database**: MongoDB + Mongoose
- **Auth**: NextAuth.js v5 with credentials provider
- **Styling**: Tailwind CSS 3.4 with custom design system
- **Animations**: GSAP + ScrollTrigger + Framer Motion
- **Storage**: Local (dev) + Vercel Blob (production)
- **Validation**: Zod schemas
- **Testing**: Vitest + Playwright

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` with your values:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=generate_random_string
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure_password
```

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

3. **Create uploads directory:**
```bash
mkdir -p public/uploads
```

4. **Seed the database:**
```bash
npm run seed
```

This will create:
- Initial admin user
- Site settings
- Sample pages with sections
- Sample services, team members, FAQs
- Gallery categories

5. **Run development server:**
```bash
npm run dev
```

Visit:
- Public site: http://localhost:3000
- Admin portal: http://localhost:3000/admin
- Login with ADMIN_EMAIL and ADMIN_PASSWORD from .env

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public routes
│   │   ├── about/
│   │   ├── services/
│   │   ├── gallery/
│   │   ├── blog/
│   │   └── ...
│   ├── admin/             # Admin CMS portal
│   │   ├── dashboard/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Header, Footer, etc.
│   └── admin/            # Admin-specific components
├── lib/                  # Utilities and config
│   ├── mongodb.ts        # Database connection
│   ├── auth.ts           # Authentication
│   ├── storage/          # Image upload adapters
│   ├── utils.ts          # Helper functions
│   └── validations.ts    # Zod schemas
├── models/               # Mongoose models
│   ├── Page.ts
│   ├── Service.ts
│   ├── BlogPost.ts
│   └── ...
└── types/                # TypeScript definitions
```

## 🎨 Design System

### Colors
- **Midnight Navy** (#071A3D) - Primary dark
- **Texas Blue** (#155EEF) - Primary action
- **Victory Red** (#EF3340) - Accent
- **Warm Gold** (#F5B942) - Highlight
- **Sky** (#DDF3FF) - Soft background
- **Warm Cream** (#FFF9F0) - Warm background

### Typography
- **Display Font**: Inter (headings)
- **Body Font**: Inter (readable sans-serif)

## 🔐 Authentication

Default admin credentials (from .env):
- Email: Set in ADMIN_EMAIL
- Password: Set in ADMIN_PASSWORD

Change these immediately after first login!

## 📤 Image Uploads

### Development
Images stored locally in `public/uploads/`

**Important**: Local uploads are NOT persistent in production!

### Production (Vercel)
Set `BLOB_READ_WRITE_TOKEN` in environment variables to use Vercel Blob Storage:

1. Install Vercel CLI: `npm i -g vercel`
2. Link project: `vercel link`
3. Create blob store: `vercel blob create`
4. Copy token to environment variables

## 🗄️ MongoDB Setup

### MongoDB Atlas

1. Create account at mongodb.com/cloud/atlas
2. Create new cluster (free tier available)
3. Create database user
4. Whitelist IP (0.0.0.0/0 for development)
5. Get connection string
6. Add to .env as MONGODB_URI

### MongoDB Compass (Local Inspection)

1. Download MongoDB Compass
2. Connect using your MONGODB_URI
3. Browse collections and data

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**

2. **Import to Vercel:**
   - Connect GitHub repository
   - Add environment variables
   - Deploy

3. **Configure Vercel Blob:**
```bash
vercel blob create production
```
Add token to Vercel environment variables.

4. **Set environment variables in Vercel:**
   - MONGODB_URI
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL (your production URL)
   - BLOB_READ_WRITE_TOKEN
   - ADMIN_EMAIL
   - ADMIN_PASSWORD

5. **Redeploy after env vars are set**

## 📝 Content Management

### Editing Pages

1. Login to `/admin`
2. Go to **Pages** section
3. Select page to edit
4. Edit sections one by one:
   - Toggle enabled/disabled
   - Change text, images, CTAs
   - Reorder sections
5. Save and preview

### Creating Services

1. **Services** → **Add New**
2. **Card/Listing Tab**: Basic info shown on /services
3. **Detail Page Tab**: Full content for /services/[slug]
4. Upload images, add sections
5. Publish when ready

### Managing Gallery

1. **Gallery** → Select or create category
2. Upload multiple images
3. Add captions and alt text
4. Reorder, feature, or delete

### Blog Posts

1. **Blog** → **New Post**
2. Rich text editor for content
3. Set status: draft/published/scheduled
4. Add cover image, categories, tags
5. Preview before publishing

## 🔧 Customization

### Changing Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  'midnight-navy': '#071A3D',
  'texas-blue': '#155EEF',
  // ...add your colors
}
```

### Adding New Page Types

1. Create model in `src/models/`
2. Add API routes in `src/app/api/`
3. Create admin UI in `src/app/admin/`
4. Add public route in `src/app/(public)/`

### Custom Animations

Use GSAP in components:
```typescript
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
```

## 📞 Support

For questions about this codebase:
- Check models in `src/models/` for data structure
- Check API routes in `src/app/api/` for endpoints
- Check validation schemas in `src/lib/validations.ts`

## 🎯 Acceptance Checklist

✅ All 15+ public routes working
✅ All admin CRUD operations functional
✅ Authentication and authorization
✅ Image uploads (local + production)
✅ Database models with relationships
✅ SEO metadata and structured data
✅ Responsive design (mobile to desktop)
✅ Accessibility (WCAG 2.2 AA)
✅ Reduced motion support
✅ Settings propagation (footer, contact, etc.)
✅ Audit logging
✅ Form validation
✅ Error boundaries
✅ Loading states
✅ Type safety (strict TypeScript)

## 📄 License

Proprietary - Team TEXAS Special Needs

---

Built with ❤️ for every athlete, every ability, one team.
