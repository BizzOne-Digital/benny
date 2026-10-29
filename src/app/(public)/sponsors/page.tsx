import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import Sponsor, { type ISponsor } from '@/models/Sponsor'
import CmsImage from '@/components/ui/CmsImage'
import Button from '@/components/ui/Button'
import { getPageContent } from '@/lib/page-content'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Our Sponsors | Team TEXAS Special Needs',
  description:
    'Thank you to the businesses and neighbors who sponsor Team TEXAS Special Needs and help every athlete play.',
}

function safeUrl(url?: string) {
  if (!url) return ''
  const withProtocol = /^https?:\/\//i.test(url) ? url : `https://${url}`
  try {
    return new URL(withProtocol).toString()
  } catch {
    return ''
  }
}

function SponsorCard({ sponsor, featured }: { sponsor: ISponsor; featured?: boolean }) {
  const href = safeUrl(sponsor.website)
  const body = (
    <div
      className={`bg-white rounded-2xl shadow-lg h-full flex flex-col items-center text-center ${
        featured ? 'p-10 border-2 border-warm-gold' : 'p-8'
      }`}
    >
      <div className={`relative w-full ${featured ? 'h-40' : 'h-28'} mb-6`}>
        {sponsor.logoUrl ? (
          <CmsImage
            src={sponsor.logoUrl}
            alt={`${sponsor.name} logo`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-2xl font-black text-midnight-navy">
            {sponsor.name}
          </div>
        )}
      </div>
      <p className="text-victory-red font-bold uppercase tracking-wider text-xs mb-2">{sponsor.tier}</p>
      <h3 className="text-2xl font-bold text-midnight-navy mb-3">{sponsor.name}</h3>
      {sponsor.description && <p className="text-gray-700 leading-relaxed mb-4">{sponsor.description}</p>}
      {href && <span className="mt-auto text-texas-blue font-semibold">Visit website →</span>}
    </div>
  )

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer sponsored" className="block hover:-translate-y-1 transition-transform">
      {body}
    </a>
  ) : (
    body
  )
}

export default async function SponsorsPage() {
  const c = await getPageContent('sponsors')
  await connectDB()
  const sponsors = await Sponsor.find({ isPublished: true }).sort({ order: 1 }).lean<ISponsor[]>()

  const founding = sponsors.filter((s) => s.tier === 'Founding Sponsor')
  const others = sponsors.filter((s) => s.tier !== 'Founding Sponsor')

  return (
    <>
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-midnight-navy to-texas-blue text-white">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{c('hero.title')}</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">{c('hero.subtitle')}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-warm-cream">
        <div className="section-container">
          {sponsors.length === 0 ? (
            <p className="text-center text-xl text-gray-600">Our sponsors will be listed here soon.</p>
          ) : (
            <div className="space-y-16">
              {founding.length > 0 && (
                <div>
                  <h2 className="text-3xl font-black text-midnight-navy text-center mb-8">Founding Sponsor</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {founding.map((s) => (
                      <SponsorCard key={s._id.toString()} sponsor={s} featured />
                    ))}
                  </div>
                </div>
              )}
              {others.length > 0 && (
                <div>
                  {founding.length > 0 && (
                    <h2 className="text-3xl font-black text-midnight-navy text-center mb-8">Our Sponsors</h2>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {others.map((s) => (
                      <SponsorCard key={s._id.toString()} sponsor={s} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-texas-blue text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{c('cta.title')}</h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">{c('cta.text')}</p>
          <Link href="/contact">
            <Button variant="secondary" size="lg">
              Contact Us About Sponsorship
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
