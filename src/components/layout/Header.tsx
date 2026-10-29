'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Programs', href: '/services' },
  { name: 'Register', href: '/#registration' },
  { name: 'Stories', href: '/testimonials' },
  { name: 'Sponsors', href: '/sponsors' },
  { name: 'Contact', href: '/contact' },
]

type HeaderProps = {
  logoSrc?: string
  organizationName?: string
}

export default function Header({
  logoSrc = '/logo.jpg',
  organizationName = 'Team TEXAS Special Needs',
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Top Banner */}
      <div className="bg-midnight-navy text-white py-2 text-center text-xs md:text-sm font-semibold tracking-wider">
        <div className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4 text-victory-red" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-warm-gold">★</span>
          <span>EVERY ATHLETE. EVERY ABILITY. ONE TEAM.</span>
          <span className="text-warm-gold">★</span>
          <svg className="w-4 h-4 text-texas-blue" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300 bg-white w-full',
          isScrolled ? 'shadow-lg' : 'shadow-md'
        )}
      >
        <nav className="section-container" aria-label="Main navigation">
          <div className="flex items-center justify-between py-3 md:py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 md:space-x-3 focus-ring rounded-lg flex-shrink-0">
              <div className="relative w-12 h-12 md:w-16 md:h-16">
                <Image
                  src={logoSrc}
                  alt="Team TEXAS Special Needs Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                  priority
                  unoptimized={logoSrc.startsWith('/api/uploads/')}
                />
              </div>
              <div className="hidden sm:block">
                <div className="font-black text-base md:text-xl text-midnight-navy leading-none">
                  {organizationName.split(' ').slice(0, 2).join(' ') || 'TEAM TEXAS'}
                </div>
                <div className="text-victory-red font-bold text-xs md:text-sm">
                  {organizationName.includes('Special Needs')
                    ? 'SPECIAL NEEDS'
                    : organizationName.split(' ').slice(2).join(' ') || 'SPECIAL NEEDS'}
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'px-4 py-2 rounded-lg font-semibold transition-all focus-ring text-sm',
                      isActive
                        ? 'text-texas-blue bg-sky'
                        : 'text-gray-700 hover:text-texas-blue hover:bg-gray-100'
                    )}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block flex-shrink-0">
              <Link
                href="/contact"
                className="px-4 lg:px-6 py-2 lg:py-3 bg-victory-red text-white rounded-lg font-bold hover:bg-red-700 transition-all shadow-lg flex items-center gap-2 text-sm lg:text-base whitespace-nowrap"
              >
                JOIN THE TEAM
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg focus-ring text-midnight-navy"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'px-4 py-3 rounded-lg font-semibold transition-colors',
                        isActive
                          ? 'bg-texas-blue text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                })}
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 bg-victory-red text-white rounded-lg font-bold hover:bg-red-700 transition-colors mt-2 text-center"
                >
                  JOIN THE TEAM →
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  )
}
