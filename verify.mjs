#!/usr/bin/env node

/**
 * Installation Verification Script
 * Checks that all required files and configurations are in place
 */

import { existsSync } from 'fs'
import { resolve } from 'path'

const checks = {
  '📦 Core Files': [
    'package.json',
    'tsconfig.json',
    'next.config.mjs',
    'tailwind.config.ts',
    'postcss.config.mjs',
  ],
  '🔧 Configuration': [
    '.env.example',
    '.gitignore',
    '.eslintrc.json',
    '.prettierrc',
  ],
  '📁 Source Directories': [
    'src/app',
    'src/components',
    'src/lib',
    'src/models',
  ],
  '🌐 Public Routes': [
    'src/app/(public)/page.tsx',
    'src/app/(public)/about/page.tsx',
    'src/app/(public)/services/page.tsx',
    'src/app/(public)/contact/page.tsx',
  ],
  '🔐 Admin Portal': [
    'src/app/admin/page.tsx',
    'src/app/admin/login/page.tsx',
    'src/app/admin/layout.tsx',
  ],
  '💾 Database Models': [
    'src/models/AdminUser.ts',
    'src/models/SiteSettings.ts',
    'src/models/Service.ts',
    'src/models/Page.ts',
  ],
  '🎨 Components': [
    'src/components/ui/Button.tsx',
    'src/components/layout/Header.tsx',
    'src/components/layout/Footer.tsx',
  ],
  '🛠 Utilities': [
    'src/lib/mongodb.ts',
    'src/lib/auth.ts',
    'src/lib/utils.ts',
    'src/lib/validations.ts',
    'src/lib/seed.ts',
  ],
  '📚 Documentation': [
    'README.md',
    'QUICKSTART.md',
    'DEPLOYMENT.md',
    'FEATURES.md',
    'PROJECT_SUMMARY.md',
  ],
  '🧪 Testing': [
    'vitest.config.ts',
    'playwright.config.ts',
    'e2e/admin.spec.ts',
    'e2e/contact.spec.ts',
  ],
}

console.log('🔍 Verifying Team TEXAS Special Needs Installation...\n')

let allPassed = true
let totalChecks = 0
let passedChecks = 0

for (const [category, files] of Object.entries(checks)) {
  console.log(`\n${category}`)
  console.log('━'.repeat(50))

  for (const file of files) {
    totalChecks++
    const path = resolve(process.cwd(), file)
    const exists = existsSync(path)

    if (exists) {
      console.log(`  ✅ ${file}`)
      passedChecks++
    } else {
      console.log(`  ❌ ${file} (missing)`)
      allPassed = false
    }
  }
}

console.log('\n' + '━'.repeat(50))
console.log(`\n📊 Results: ${passedChecks}/${totalChecks} checks passed`)

if (allPassed) {
  console.log('\n✅ All files verified! Installation is complete.')
  console.log('\n🚀 Next steps:')
  console.log('   1. Copy .env.example to .env')
  console.log('   2. Configure your MongoDB URI')
  console.log('   3. Run: npm run seed')
  console.log('   4. Run: npm run dev')
  console.log('\n📖 See QUICKSTART.md for detailed setup instructions.\n')
  process.exit(0)
} else {
  console.log('\n⚠️  Some files are missing. Please check the installation.')
  console.log('   Run: npm install')
  console.log('   Or re-clone the repository\n')
  process.exit(1)
}
