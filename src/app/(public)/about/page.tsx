import CmsImage from '@/components/ui/CmsImage'
import { getPageContent } from '@/lib/page-content'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'About Us | Team TEXAS Special Needs',
  description:
    'Learn about our mission to provide every special needs child and adult the opportunity to play sports.',
}

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const c = await getPageContent('about')

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <CmsImage
            src={c('hero.image')}
            alt="Team TEXAS athletes and coaches celebrating together"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight-navy/90 via-midnight-navy/70 to-midnight-navy/90"></div>
        </div>
        <div className="section-container relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <svg className="w-6 h-6 text-warm-gold" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">{c('hero.title')}</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
            {c('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight-navy mb-6">
              {c('mission.title')}
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              {c('mission.text')}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section with Images */}
      <section className="py-16 lg:py-24 bg-warm-cream">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <CmsImage
                src={c('story1.image')}
                alt="Team TEXAS athlete celebrating with coach"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-midnight-navy mb-6">
                {c('story1.title')}
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                {c('story1.p1')}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {c('story1.p2')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-midnight-navy mb-6">
                {c('story2.title')}
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                {c('story2.p1')}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {c('story2.p2')}
              </p>
            </div>

            {/* Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl order-1 lg:order-2">
              <CmsImage
                src={c('story2.image')}
                alt="Team TEXAS community together"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-midnight-navy text-white">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
              <div className="w-16 h-16 bg-victory-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">INCLUSION</h3>
              <p className="text-gray-300">
                Everyone is welcome, regardless of ability level. We celebrate diversity and create
                spaces where all athletes can thrive.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
              <div className="w-16 h-16 bg-warm-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">COMPASSION</h3>
              <p className="text-gray-300">
                We lead with kindness, understanding, and empathy in everything we do.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20">
              <div className="w-16 h-16 bg-texas-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">EXCELLENCE</h3>
              <p className="text-gray-300">
                We strive for the highest quality programs, coaching, and support for our athletes
                and families.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight-navy mb-4">
              {c('programs.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {c('programs.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg group">
              <CmsImage
                src={c('programs.image1')}
                alt="Adaptive Basketball"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-navy via-midnight-navy/50 to-transparent flex items-end">
                <div className="p-6 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2">Adaptive Basketball</h3>
                  <p className="text-gray-200 text-sm">High-energy game-day excitement</p>
                </div>
              </div>
            </div>

            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg group">
              <CmsImage
                src={c('programs.image2')}
                alt="Inclusive Soccer"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-navy via-midnight-navy/50 to-transparent flex items-end">
                <div className="p-6 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2">Inclusive Soccer</h3>
                  <p className="text-gray-200 text-sm">Fast-paced fun for all</p>
                </div>
              </div>
            </div>

            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg group">
              <CmsImage
                src={c('programs.image3')}
                alt="Community Sports Days"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-navy via-midnight-navy/50 to-transparent flex items-end">
                <div className="p-6 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2">Community Sports Days</h3>
                  <p className="text-gray-200 text-sm">Family-friendly events</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg">View All Programs</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-texas-blue text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{c('cta.title')}</h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            {c('cta.text')}
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="lg">
              Get Involved Today
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
