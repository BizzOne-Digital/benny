import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: 'Team TEXAS Special Needs | Every Ability. Every Athlete. One Team.',
  description:
    'Team TEXAS creates welcoming sports opportunities where children and adults with special needs can build confidence, friendships, and unforgettable memories.',
  keywords: [
    'special needs sports',
    'adaptive athletics',
    'inclusive sports',
    'Texas',
    'special needs children',
    'special needs adults',
    'sports programs',
  ],
  authors: [{ name: 'Team TEXAS Special Needs' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Team TEXAS Special Needs',
    title: 'Team TEXAS Special Needs | Every Ability. Every Athlete. One Team.',
    description:
      'Team TEXAS creates welcoming sports opportunities where children and adults with special needs can build confidence, friendships, and unforgettable memories.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Team TEXAS Special Needs',
    description: 'Every Ability. Every Athlete. One Team.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} overflow-x-hidden`}>
        <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  )
}
