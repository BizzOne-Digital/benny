import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import GalleryImage from '@/models/GalleryImage'
import CmsImage from '@/components/ui/CmsImage'
import { getPageContent } from '@/lib/page-content'
import { getSiteSettings } from '@/lib/site-settings'
import { getPublicAnnouncements, getPublicPrograms } from '@/lib/public-content'
import {
  BACKGROUND_FORMS,
  DEFAULT_GALLERY_IMAGES,
  LEAGUE_REGISTRATION_FORMS,
} from '@/lib/registration-forms'

export const metadata = {
  title: 'Team TEXAS Special Needs | Every Ability. Every Athlete. One Team.',
  description:
    'Team TEXAS creates welcoming sports opportunities where children and adults with special needs can build confidence, friendships, and unforgettable memories.',
}

export default async function HomePage() {
  await connectDB()

  const c = await getPageContent('home')
  const settings = await getSiteSettings()
  const programs = await getPublicPrograms()
  const specialAnnouncements = await getPublicAnnouncements()

  // Last two words of the headline are shown in red, the rest in white.
  const headlineWords = (settings.homeHeroHeadline || 'EVERYONE DESERVES THEIR MOMENT TO PLAY.')
    .trim()
    .split(/\s+/)
  const headlineMain = headlineWords.slice(0, -2).join(' ')
  const headlineAccent = headlineWords.slice(-2).join(' ')
  const heroEyebrow =
    settings.homeHeroEyebrow || 'WELCOME TO TEAM TEXAS SPECIAL NEEDS'
  const heroSubtext =
    settings.homeHeroSubtext ||
    'Inclusive sports experiences where children and adults with special needs build confidence, friendships and unforgettable memories.'

  const galleryFromDb = await GalleryImage.find({ isVisible: true })
    .sort({ order: 1 })
    .limit(12)
    .lean()

  const galleryImages =
    galleryFromDb.length > 0
      ? galleryFromDb.map((img) => ({
          src: img.imageUrl,
          alt: img.imageAlt || img.title,
        }))
      : DEFAULT_GALLERY_IMAGES

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-start overflow-hidden bg-midnight-navy pt-8">
        {/* Background Image - hero-bg.png */}
        <div className="absolute inset-0 z-0">
          <CmsImage
            src={c('hero.image')}
            alt="Inclusive basketball - young athlete in wheelchair shooting basketball with team cheering"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight-navy/95 via-midnight-navy/60 to-transparent" />
        </div>

        {/* Decorative Scoreboard Graphic */}
        <div className="absolute right-[45%] top-1/4 z-10 hidden lg:block opacity-20">
          <div className="relative">
            {/* Curved Line */}
            <svg width="400" height="400" viewBox="0 0 400 400" className="absolute -left-40 -top-20">
              <path
                d="M 50 200 Q 200 50 350 200"
                stroke="#EF3340"
                strokeWidth="2"
                fill="none"
                opacity="0.5"
              />
            </svg>
            {/* Scoreboard */}
            <div className="bg-midnight-navy/90 border-2 border-victory-red rounded-lg p-4 backdrop-blur-sm">
              <div className="flex gap-6 items-center">
                <div className="text-center">
                  <div className="text-xs text-warm-gold mb-1">TEAM TEXAS</div>
                  <div className="text-5xl font-bold text-white">24</div>
                  <div className="text-xs text-gray-400 mt-1">POINTS</div>
                </div>
                <div className="text-center border-l border-r border-gray-600 px-6">
                  <div className="text-xs text-warm-gold mb-1">Q2:19</div>
                  <div className="text-sm text-white">Period 2</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-400 mb-1">VISITOR</div>
                  <div className="text-5xl font-bold text-white">18</div>
                  <div className="text-xs text-gray-400 mt-1">POINTS</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full pt-16 lg:pt-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-2xl ml-8 lg:ml-16">
              {/* Star Badge */}
              <div className="flex items-center gap-2 mb-6 animate-fade-in">
                <svg className="w-6 h-6 text-victory-red" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-warm-gold text-sm font-bold uppercase tracking-wider">
                  {heroEyebrow}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 animate-slide-up leading-tight">
                <span className="text-white block">{headlineMain}</span>
                <span className="text-victory-red block">{headlineAccent}</span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-300 mb-10 animate-slide-up leading-relaxed max-w-xl">
                {heroSubtext}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up">
                <Link href="/services">
                  <button className="px-8 py-4 bg-victory-red text-white rounded-lg font-bold text-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg">
                    FIND A PROGRAM
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </Link>
                <Link href="/about">
                  <button className="px-8 py-4 bg-transparent text-white rounded-lg font-bold text-lg border-2 border-white hover:bg-white hover:text-midnight-navy transition-all">
                    OUR STORY
                  </button>
                </Link>
              </div>

              {/* Features */}
              <div className="flex flex-col sm:flex-row gap-6 text-white animate-fade-in">
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-victory-red flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-semibold">Inclusive</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-texas-blue flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <span className="text-sm font-semibold">Supportive</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-warm-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold">Built for Every Ability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Announcements */}
      {specialAnnouncements.length > 0 && (
        <section className="bg-victory-red text-white py-6 lg:py-8 border-b-4 border-warm-gold" aria-label="Special announcements">
          <div className="section-container">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 text-warm-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                  clipRule="evenodd"
                />
              </svg>
              <h2 className="text-lg md:text-xl font-black uppercase tracking-wide">Special Announcements</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specialAnnouncements.map((item) => (
                <div
                  key={item.id}
                  className="bg-midnight-navy/40 rounded-xl p-5 border border-white/20 backdrop-blur-sm"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    {item.dateLabel && (
                      <span className="text-xs font-semibold uppercase tracking-wider bg-warm-gold text-midnight-navy px-2 py-0.5 rounded">
                        {item.dateLabel}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-100 text-sm md:text-base leading-relaxed">{item.message}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* More Than A Game Section */}
      <section className="py-16 lg:py-24 bg-warm-cream">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-6 h-6 text-victory-red" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-midnight-navy mb-2">
                {c('intro.title1')}
              </h2>
              <h2 className="text-4xl lg:text-5xl font-black text-victory-red mb-6">
                {c('intro.title2')}
              </h2>
              <div className="w-16 h-1 bg-warm-gold mb-6"></div>
              <p className="text-xl text-ink mb-6 leading-relaxed">
                {c('intro.text')}
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-texas-blue font-bold hover:gap-3 transition-all">
                Discover Our Mission
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Right Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                <CmsImage
                  src={c('intro.image1')}
                  alt="Team TEXAS athlete high-fiving coach"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg mt-8">
                <CmsImage
                  src={c('intro.image2')}
                  alt="Coach with Team TEXAS athlete outdoors"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs for Every Athlete */}
      <section className="py-16 lg:py-24 bg-midnight-navy text-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg className="w-6 h-6 text-warm-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              THE PROGRAMS <span className="text-warm-gold">WE OFFER</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg">
              Baseball, softball, bowling, basketball, soccer, flag football, kickball—and unified teams
              with youth partners ages 11–18.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {programs.map((program) => (
              <div
                key={program.id}
                id={program.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg group scroll-mt-24"
              >
                <div className="relative h-48">
                  <CmsImage
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 text-midnight-navy">
                  <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">{program.description}</p>
                  {program.highlights && (
                    <ul className="text-xs text-gray-500 space-y-1 mb-3">
                      {program.highlights.map((line) => (
                        <li key={line}>• {line}</li>
                      ))}
                    </ul>
                  )}
                  <Link
                    href={`/services#${program.id}`}
                    className="inline-flex items-center gap-2 text-texas-blue font-bold text-sm hover:gap-3 transition-all"
                  >
                    Learn more
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/services">
              <button className="px-8 py-3 bg-warm-gold text-midnight-navy rounded-lg font-bold hover:bg-yellow-400 transition-all">
                View all program details
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* League registration & background forms */}
      <section className="py-16 lg:py-24 bg-warm-cream" id="registration">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-midnight-navy mb-4">
              League Registration &amp; Forms
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Download registration forms for each program. Return completed forms to Team TEXAS Special
              Needs—questions?{' '}
              <Link href="/contact" className="text-texas-blue font-bold hover:underline">
                Contact us
              </Link>
              .
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-midnight-navy mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-victory-red rounded" aria-hidden />
                League registration forms
              </h3>
              <ul className="space-y-4">
                {LEAGUE_REGISTRATION_FORMS.map((form) => (
                  <li key={form.id}>
                    <a
                      href={form.href}
                      download
                      className="block bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:border-texas-blue hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-bold text-midnight-navy group-hover:text-texas-blue">
                            {form.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">{form.description}</p>
                        </div>
                        <svg
                          className="w-6 h-6 text-victory-red flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                Need a paper copy or help completing a form?{' '}
                <Link href="/contact" className="text-texas-blue font-semibold hover:underline">
                  Reach out to our team
                </Link>
                .
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-midnight-navy mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-texas-blue rounded" aria-hidden />
                Background &amp; partner forms
              </h3>
              <ul className="space-y-4">
                {BACKGROUND_FORMS.map((form) => (
                  <li key={form.id}>
                    <a
                      href={form.href}
                      download
                      className="block bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:border-texas-blue hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-bold text-midnight-navy group-hover:text-texas-blue">
                            {form.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">{form.description}</p>
                        </div>
                        <svg
                          className="w-6 h-6 text-texas-blue flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="py-16 lg:py-24 bg-white" id="gallery">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-midnight-navy mb-4">Team moments</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Photos from our athletes, families, and community—more team pictures are added throughout the
              season.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((img, index) => (
              <div
                key={`${img.src}-${index}`}
                className="relative aspect-square rounded-xl overflow-hidden shadow-md group"
              >
                <CmsImage
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section - One Team, Endless Courage */}
      <section className="py-16 lg:py-24 bg-warm-cream">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Values Text */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-black text-texas-blue mb-2">
                ONE TEAM
              </h2>
              <h2 className="text-4xl lg:text-5xl font-black text-victory-red mb-2">
                ENDLESS COURAGE
              </h2>
              <h2 className="text-4xl lg:text-5xl font-black text-midnight-navy mb-8">
                EVERY VICTORY MATTERS
              </h2>
              <div className="w-16 h-1 bg-warm-gold mb-8"></div>
            </div>

            {/* Right - Icon Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Belong */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-victory-red rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-midnight-navy mb-2">BELONG</h3>
                <p className="text-gray-600 text-sm">A welcoming team where everyone fits in</p>
              </div>

              {/* Grow */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-warm-gold rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-midnight-navy mb-2">GROW</h3>
                <p className="text-gray-600 text-sm">Confidence through play and achievement</p>
              </div>

              {/* Celebrate */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-texas-blue rounded-full mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-midnight-navy mb-2">CELEBRATE</h3>
                <p className="text-gray-600 text-sm">Every victory matters, big or small</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories From Our Team */}
      <section className="py-16 lg:py-24 bg-midnight-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <CmsImage
            src="/hero-bg.png"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="section-container relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg className="w-6 h-6 text-warm-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">STORIES FROM OUR TEAM</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <CmsImage
                src="/home-6.png"
                alt="Team TEXAS athlete celebrating on court with teammates"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Testimonial */}
            <div>
              <svg className="w-12 h-12 text-victory-red mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-2xl lg:text-3xl mb-6 leading-relaxed">
                Being part of Team Texas has changed our lives. My son has more confidence, more friends and a place where he truly belongs.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-warm-gold"></div>
                <p className="text-warm-gold font-bold uppercase text-sm">PARENT TESTIMONIAL (COACHING STAFF)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Text Only Section - White Background */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight-navy mb-6">
              Our Mission
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              To provide every special needs child or adult the opportunity to play sports in a
              safe, supportive, and joyful environment where abilities are celebrated and friendships
              flourish.
            </p>
          </div>
        </div>
      </section>

      {/* Ready to Play CTA */}
      <section className="relative py-24 lg:py-32 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <CmsImage
            src={c('cta.image')}
            alt="Team TEXAS athlete ready to play"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-victory-red/95 via-victory-red/80 to-midnight-navy/90"></div>
        </div>

        {/* Content */}
        <div className="section-container relative z-10">
          <div className="max-w-4xl">
            <h2 className="text-5xl lg:text-6xl font-black mb-6">
              {c('cta.title')}
            </h2>
            <p className="text-2xl lg:text-3xl mb-10 leading-relaxed max-w-2xl">
              {c('cta.text')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <button className="px-10 py-5 bg-white text-victory-red rounded-lg font-black text-lg hover:bg-warm-cream transition-all shadow-2xl">
                  GET STARTED TODAY
                </button>
              </Link>
              <Link href="/services">
                <button className="px-10 py-5 bg-transparent text-white rounded-lg font-bold text-lg border-2 border-white hover:bg-white hover:text-victory-red transition-all">
                  EXPLORE PROGRAMS
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const dynamic = 'force-dynamic'
