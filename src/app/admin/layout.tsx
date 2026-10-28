'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { ToastProvider } from '@/components/ui/Toast'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: 'dashboard' },
  { name: 'Home Content', href: '/admin/content', icon: 'content' },
  { name: 'Programs', href: '/admin/programs', icon: 'programs' },
  { name: 'Page Content', href: '/admin/pages', icon: 'pages' },
  { name: 'Services', href: '/admin/services', icon: 'services' },
  { name: 'Gallery', href: '/admin/gallery', icon: 'gallery' },
  { name: 'Testimonials', href: '/admin/testimonials', icon: 'testimonials' },
  { name: 'FAQs', href: '/admin/faqs', icon: 'faqs' },
  { name: 'Team', href: '/admin/team', icon: 'team' },
  { name: 'Blog', href: '/admin/blog', icon: 'blog' },
  { name: 'Products', href: '/admin/products', icon: 'products' },
  { name: 'Pricing', href: '/admin/pricing', icon: 'pricing' },
  { name: 'Inquiries', href: '/admin/inquiries', icon: 'inquiries' },
  { name: 'Media', href: '/admin/media', icon: 'media' },
  { name: 'Settings', href: '/admin/settings', icon: 'settings' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return children
  }

  return (
    <ToastProvider>
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-midnight-navy text-white overflow-y-auto">
        <div className="p-6">
          <Link href="/" className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-texas-blue rounded-full flex items-center justify-center">
              <span className="text-white font-bold">TT</span>
            </div>
            <div>
              <div className="font-bold">Team TEXAS</div>
              <div className="text-xs text-gray-400">Admin Panel</div>
            </div>
          </Link>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block px-4 py-3 rounded-lg transition-colors font-medium',
                    isActive
                      ? 'bg-texas-blue text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
    </ToastProvider>
  )
}
