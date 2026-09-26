import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight-navy to-texas-blue flex items-center justify-center px-4">
      <div className="text-center text-white">
        <h1 className="text-9xl font-bold mb-4">404</h1>
        <h2 className="text-4xl font-bold mb-6">Page Not Found</h2>
        <p className="text-xl mb-8 max-w-md mx-auto text-gray-200">
          Sorry, we couldn't find the page you're looking for. Let's get you back on track.
        </p>
        <Link href="/">
          <Button size="lg" variant="secondary">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
