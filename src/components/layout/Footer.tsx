import Link from 'next/link'
import Image from 'next/image'
import { formatPhone } from '@/lib/utils'
import { getSiteSettings } from '@/lib/site-settings'
import { resolveImageSrc } from '@/lib/image-url'

export default async function Footer() {
  const settings = await getSiteSettings()
  const logoSrc = settings.logoUrl ? resolveImageSrc(settings.logoUrl) : '/logo.jpg'

  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Programs', href: '/services' },
    { name: 'Stories', href: '/testimonials' },
    { name: 'Team', href: '/team' },
    { name: 'Blog', href: '/blog' },
    { name: 'Shop', href: '/shop' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <footer className="bg-midnight-navy text-white">
      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src={logoSrc}
                  alt="Team TEXAS Special Needs Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  unoptimized={logoSrc.startsWith('/api/uploads/')}
                />
              </div>
              <span className="font-bold text-xl">
                {settings?.organizationName || 'Team TEXAS Special Needs'}
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Every Ability. Every Athlete. One Team. Creating welcoming sports opportunities for
              children and adults with special needs.
            </p>
            <Link
              href={settings?.defaultCTAUrl || '/contact'}
              className="inline-flex items-center px-6 py-3 bg-texas-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-texas-blue focus:ring-offset-2 focus:ring-offset-midnight-navy"
            >
              {settings?.defaultCTAText || 'Get Involved'}
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <address className="not-italic space-y-3 text-gray-300">
              {settings?.email && (
                <p>
                  <a
                    href={`mailto:${settings.email}`}
                    className="hover:text-white transition-colors focus:outline-none focus:underline"
                  >
                    {settings.email}
                  </a>
                </p>
              )}
              {settings?.phone && (
                <p>
                  <a
                    href={`tel:+${settings.phone}`}
                    className="hover:text-white transition-colors focus:outline-none focus:underline"
                  >
                    {formatPhone(settings.phone)}
                  </a>
                </p>
              )}
              {settings?.contactRole && (
                <p className="text-sm text-gray-400">{settings.contactRole}</p>
              )}
            </address>

            {/* Social Links */}
            {settings?.socialLinks && (
              <div className="flex space-x-4 mt-6">
                {settings.socialLinks.facebook && (
                  <a
                    href={settings.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                )}
                {settings.socialLinks.instagram && (
                  <a
                    href={settings.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © {currentYear} {settings?.organizationName || 'Team TEXAS Special Needs'}. All rights
            reserved.
          </p>
          {settings?.footerText && (
            <p className="text-gray-400 text-sm text-center md:text-right">
              {settings.footerText}
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
