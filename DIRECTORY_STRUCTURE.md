# 📂 Complete Directory Structure

## Team TEXAS Special Needs - File Organization

```
team-texas-special-needs/
│
├── 📁 src/                                    # Source code
│   │
│   ├── 📁 app/                                # Next.js App Router
│   │   │
│   │   ├── 📁 (public)/                       # Public website routes
│   │   │   ├── page.tsx                       # Home (/)
│   │   │   ├── layout.tsx                     # Public layout wrapper
│   │   │   │
│   │   │   ├── 📁 about/
│   │   │   │   └── page.tsx                   # About page
│   │   │   │
│   │   │   ├── 📁 services/
│   │   │   │   ├── page.tsx                   # Services listing
│   │   │   │   └── 📁 [slug]/
│   │   │   │       └── page.tsx               # Dynamic service detail
│   │   │   │
│   │   │   ├── 📁 gallery/
│   │   │   │   └── page.tsx                   # Image gallery
│   │   │   │
│   │   │   ├── 📁 testimonials/
│   │   │   │   └── page.tsx                   # Testimonials
│   │   │   │
│   │   │   ├── 📁 team/
│   │   │   │   └── page.tsx                   # Team members
│   │   │   │
│   │   │   ├── 📁 blog/
│   │   │   │   ├── page.tsx                   # Blog listing
│   │   │   │   └── 📁 [slug]/
│   │   │   │       └── page.tsx               # Blog post detail
│   │   │   │
│   │   │   ├── 📁 shop/
│   │   │   │   └── page.tsx                   # Product catalog
│   │   │   │
│   │   │   ├── 📁 pricing/
│   │   │   │   └── page.tsx                   # Pricing plans
│   │   │   │
│   │   │   ├── 📁 faq/
│   │   │   │   └── page.tsx                   # FAQ accordion
│   │   │   │
│   │   │   └── 📁 contact/
│   │   │       └── page.tsx                   # Contact form
│   │   │
│   │   ├── 📁 admin/                          # Admin CMS portal
│   │   │   ├── page.tsx                       # Dashboard
│   │   │   ├── layout.tsx                     # Admin layout with sidebar
│   │   │   │
│   │   │   ├── 📁 login/
│   │   │   │   └── page.tsx                   # Admin login
│   │   │   │
│   │   │   ├── 📁 pages/
│   │   │   │   └── page.tsx                   # Page management
│   │   │   │
│   │   │   ├── 📁 services/
│   │   │   │   └── page.tsx                   # Service CRUD
│   │   │   │
│   │   │   ├── 📁 gallery/
│   │   │   │   └── page.tsx                   # Gallery management
│   │   │   │
│   │   │   ├── 📁 testimonials/
│   │   │   │   └── page.tsx                   # Testimonial CRUD
│   │   │   │
│   │   │   ├── 📁 faqs/
│   │   │   │   └── page.tsx                   # FAQ management
│   │   │   │
│   │   │   ├── 📁 team/
│   │   │   │   └── page.tsx                   # Team member CRUD
│   │   │   │
│   │   │   ├── 📁 blog/
│   │   │   │   └── page.tsx                   # Blog post editor
│   │   │   │
│   │   │   ├── 📁 products/
│   │   │   │   └── page.tsx                   # Product management
│   │   │   │
│   │   │   ├── 📁 pricing/
│   │   │   │   └── page.tsx                   # Pricing plan CRUD
│   │   │   │
│   │   │   ├── 📁 inquiries/
│   │   │   │   └── page.tsx                   # Contact submissions
│   │   │   │
│   │   │   ├── 📁 media/
│   │   │   │   └── page.tsx                   # Media library
│   │   │   │
│   │   │   └── 📁 settings/
│   │   │       └── page.tsx                   # Global settings
│   │   │
│   │   ├── 📁 api/                            # API routes
│   │   │   ├── 📁 auth/
│   │   │   │   └── 📁 [...nextauth]/
│   │   │   │       └── route.ts               # NextAuth handler
│   │   │   │
│   │   │   └── 📁 contact/
│   │   │       └── route.ts                   # Contact form API
│   │   │
│   │   ├── layout.tsx                         # Root layout
│   │   ├── globals.css                        # Global styles + Tailwind
│   │   ├── not-found.tsx                      # 404 page
│   │   └── sitemap.ts                         # Dynamic sitemap
│   │
│   ├── 📁 components/                         # React components
│   │   │
│   │   ├── 📁 ui/                             # Reusable UI components
│   │   │   └── Button.tsx                     # Button component
│   │   │
│   │   └── 📁 layout/                         # Layout components
│   │       ├── Header.tsx                     # Site header
│   │       └── Footer.tsx                     # Site footer
│   │
│   ├── 📁 lib/                                # Utilities & config
│   │   ├── mongodb.ts                         # MongoDB connection
│   │   ├── auth.ts                            # NextAuth setup
│   │   ├── auth.config.ts                     # Auth configuration
│   │   ├── utils.ts                           # Helper functions
│   │   ├── validations.ts                     # Zod schemas
│   │   ├── seed.ts                            # Database seeding
│   │   │
│   │   └── 📁 storage/                        # Image storage
│   │       ├── index.ts                       # Storage adapter interface
│   │       ├── types.ts                       # Storage types
│   │       ├── local.ts                       # Local file storage
│   │       └── vercel-blob.ts                 # Vercel Blob storage
│   │
│   ├── 📁 models/                             # Mongoose schemas
│   │   ├── AdminUser.ts                       # Admin users
│   │   ├── SiteSettings.ts                    # Global settings
│   │   ├── Page.ts                            # Dynamic pages
│   │   ├── Service.ts                         # Services/programs
│   │   ├── GalleryCategory.ts                 # Gallery categories
│   │   ├── GalleryImage.ts                    # Gallery images
│   │   ├── Testimonial.ts                     # Testimonials
│   │   ├── FAQCategory.ts                     # FAQ categories
│   │   ├── FAQ.ts                             # FAQ items
│   │   ├── TeamMember.ts                      # Team profiles
│   │   ├── BlogPost.ts                        # Blog articles
│   │   ├── Product.ts                         # Shop products
│   │   ├── PricingPlan.ts                     # Pricing plans
│   │   ├── Inquiry.ts                         # Contact submissions
│   │   ├── MediaAsset.ts                      # Media library
│   │   └── AuditLog.ts                        # Admin activity log
│   │
│   ├── 📁 types/                              # TypeScript definitions
│   │   └── next-auth.d.ts                     # NextAuth types
│   │
│   ├── 📁 test/                               # Test utilities
│   │   └── setup.ts                           # Test configuration
│   │
│   └── middleware.ts                          # Route protection
│
├── 📁 e2e/                                    # End-to-end tests
│   ├── admin.spec.ts                          # Admin login tests
│   ├── contact.spec.ts                        # Contact form tests
│   └── navigation.spec.ts                     # Navigation tests
│
├── 📁 public/                                 # Static assets
│   ├── 📁 uploads/                            # Local image uploads
│   │   └── .gitkeep                           # Keep directory in git
│   ├── grain.svg                              # Texture effect
│   └── robots.txt                             # SEO robots file
│
├── 📁 .vscode/                                # VS Code settings
│   ├── settings.json                          # Editor settings
│   └── extensions.json                        # Recommended extensions
│
├── 📄 Configuration Files                     # Root config files
│   ├── package.json                           # Dependencies & scripts
│   ├── tsconfig.json                          # TypeScript config
│   ├── tailwind.config.ts                     # Tailwind design tokens
│   ├── next.config.mjs                        # Next.js configuration
│   ├── postcss.config.mjs                     # PostCSS config
│   ├── vitest.config.ts                       # Unit test config
│   ├── playwright.config.ts                   # E2E test config
│   ├── .eslintrc.json                         # ESLint rules
│   ├── .prettierrc                            # Prettier formatting
│   ├── .prettierignore                        # Prettier ignore rules
│   ├── .gitignore                             # Git ignore rules
│   ├── .env.example                           # Environment template
│   └── verify.mjs                             # Installation checker
│
└── 📄 Documentation Files                     # Project documentation
    ├── README.md                              # Main documentation
    ├── QUICKSTART.md                          # 5-minute setup guide
    ├── DEPLOYMENT.md                          # Production deployment
    ├── FEATURES.md                            # Feature checklist
    ├── PROJECT_SUMMARY.md                     # Architecture overview
    ├── CONTRIBUTING.md                        # Contribution guide
    ├── CHANGELOG.md                           # Version history
    ├── LICENSE                                # MIT license
    ├── INSTALLATION_COMPLETE.md               # Installation summary
    ├── DELIVERY_CHECKLIST.md                  # Delivery verification
    └── DIRECTORY_STRUCTURE.md                 # This file
```

---

## 📊 File Statistics

### Source Code
- **App Routes:** 35+ files
- **Components:** 5+ files
- **Models:** 15 files
- **Libraries:** 10+ files
- **Tests:** 4 files

### Configuration
- **Build Config:** 6 files
- **Code Quality:** 4 files
- **Environment:** 1 file

### Documentation
- **Guides:** 10 files
- **Total Pages:** 50+ pages

### Total Project
- **Files:** 97+
- **Directories:** 40+
- **Lines of Code:** 10,000+

---

## 🗂 Key Directories Explained

### `/src/app/(public)/`
All public-facing pages. The `(public)` folder is a route group that shares a layout without affecting URLs.

### `/src/app/admin/`
Complete admin CMS portal with authentication and all management features.

### `/src/models/`
Mongoose schemas defining database structure. Each file is a collection in MongoDB.

### `/src/lib/`
Shared utilities, configuration, and helper functions used throughout the app.

### `/src/components/`
Reusable React components organized by purpose (UI, layout, etc.).

### `/e2e/`
Playwright end-to-end tests for critical user flows.

### `/public/`
Static files served directly. Includes uploaded images (dev) and assets.

---

## 🔍 Finding Specific Features

### Need to Edit...

**Homepage Hero?**
→ `src/app/(public)/page.tsx`

**Header Navigation?**
→ `src/components/layout/Header.tsx`

**Footer Content?**
→ `src/components/layout/Footer.tsx`

**Service Pages?**
→ `src/app/(public)/services/[slug]/page.tsx`

**Admin Dashboard?**
→ `src/app/admin/page.tsx`

**Database Models?**
→ `src/models/` (all models)

**Styling?**
→ `src/app/globals.css` & `tailwind.config.ts`

**Environment?**
→ `.env` (create from `.env.example`)

---

## 🎯 Entry Points

### Development
```bash
npm run dev
# Starts at: src/app/layout.tsx
```

### Public Site
```
URL: http://localhost:3000
Entry: src/app/(public)/page.tsx
Layout: src/app/(public)/layout.tsx
```

### Admin Portal
```
URL: http://localhost:3000/admin
Entry: src/app/admin/page.tsx
Layout: src/app/admin/layout.tsx
Auth: src/app/admin/login/page.tsx
```

### API Routes
```
URL: http://localhost:3000/api/*
Auth: src/app/api/auth/[...nextauth]/route.ts
Contact: src/app/api/contact/route.ts
```

---

## 📝 File Naming Conventions

### Pages
- `page.tsx` - Route component
- `layout.tsx` - Layout wrapper
- `loading.tsx` - Loading state
- `error.tsx` - Error boundary
- `not-found.tsx` - 404 handler

### Components
- `ComponentName.tsx` - PascalCase
- Exported as default or named

### Models
- `ModelName.ts` - Singular PascalCase
- Exports model and interface

### Utilities
- `feature.ts` - camelCase or kebab-case
- Named exports preferred

---

## 🚀 Quick Navigation

| Need to... | Go to... |
|------------|----------|
| Edit homepage | `src/app/(public)/page.tsx` |
| Add a route | `src/app/(public)/new-page/page.tsx` |
| Create model | `src/models/NewModel.ts` |
| Add component | `src/components/ui/NewComponent.tsx` |
| Configure build | `next.config.mjs` |
| Add dependency | `package.json` |
| Change colors | `tailwind.config.ts` |
| Update docs | Markdown files in root |

---

## 💡 Pro Tips

### Adding a New Page

1. Create in `src/app/(public)/new-page/page.tsx`
2. Add to navigation in `Header.tsx`
3. Add to sitemap in `src/app/sitemap.ts`
4. Create admin page in `src/app/admin/new-page/`

### Adding a New Model

1. Create schema in `src/models/NewModel.ts`
2. Add validation in `src/lib/validations.ts`
3. Create API routes
4. Add admin management page
5. Update seed script

### Finding Related Files

- **Public page** → Same folder structure in admin
- **Model** → Validation in `validations.ts`
- **Admin page** → API route in `src/app/api/`
- **Component** → Used in pages via imports

---

**📂 Navigate with Confidence!**

This structure follows Next.js 15 App Router best practices with clear separation of concerns and logical organization.
