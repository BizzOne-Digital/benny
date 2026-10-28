import { getPageContent } from '@/lib/page-content'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import CmsImage from '@/components/ui/CmsImage'
import connectDB from '@/lib/mongodb'
import Service, { type IService } from '@/models/Service'
import { getPublicPrograms } from '@/lib/public-content'
import { BACKGROUND_FORMS, LEAGUE_REGISTRATION_FORMS } from '@/lib/registration-forms'

export const metadata = {
  title: 'Our Programs | Team TEXAS Special Needs',
  description:
    'Baseball, softball, bowling, basketball, soccer, flag football, kickball, and unified programs for special needs athletes and youth partners.',
}

export default async function ServicesPage() {
  const c = await getPageContent('services')
  const programs = await getPublicPrograms()
  await connectDB()
  const services = await Service.find({ isPublished: true }).sort({ order: 1 }).lean<IService[]>()

  return (
    <>
      <section className="relative py-20 lg:py-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <CmsImage
            src={c('hero.image')}
            alt="Team TEXAS sports programs"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight-navy/90 via-texas-blue/80 to-midnight-navy/90"></div>
        </div>
        <div className="section-container relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg className="w-6 h-6 text-warm-gold" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            {c('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
            {c('hero.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="section-container">
          <div className="space-y-24">
            {programs.map((program, index) => (
              <div
                key={program.id}
                id={program.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center scroll-mt-28 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`relative h-96 rounded-2xl overflow-hidden shadow-2xl ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <CmsImage
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight-navy mb-6">
                    {program.title}
                  </h2>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">{program.description}</p>
                  {program.highlights && program.highlights.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-midnight-navy mb-4">Program highlights:</h3>
                      <ul className="space-y-3">
                        {program.highlights.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <svg
                              className="w-6 h-6 text-victory-red flex-shrink-0 mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <Link href="/#registration">
                    <Button size="lg">Register &amp; download forms</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {services.length > 0 && (
        <section className="py-16 lg:py-24 bg-warm-cream">
          <div className="section-container">
            <h2 className="text-3xl md:text-4xl font-black text-midnight-navy text-center mb-12">
              More ways to get involved
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <Link
                  key={service._id.toString()}
                  href={`/services/${service.slug}`}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-56">
                    <CmsImage
                      src={service.cardImage}
                      alt={service.cardImageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-midnight-navy mb-2">{service.title}</h3>
                    <p className="text-gray-700 line-clamp-3">{service.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-warm-cream">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-black text-midnight-navy text-center mb-12">
            Registration &amp; background forms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-midnight-navy mb-4">League registration</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                {LEAGUE_REGISTRATION_FORMS.map((f) => (
                  <li key={f.id}>
                    <a href={f.href} download className="text-texas-blue font-semibold hover:underline">
                      {f.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-midnight-navy mb-4">Background &amp; partners</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                {BACKGROUND_FORMS.map((f) => (
                  <li key={f.id}>
                    <a href={f.href} download className="text-texas-blue font-semibold hover:underline">
                      {f.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-texas-blue text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Ready to Join Team TEXAS?</h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            We&apos;re here to help you find the perfect program for your family. Get in touch today!
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="lg">Contact Us Today</Button>
          </Link>
        </div>
      </section>
    </>
  )
}

export const dynamic = 'force-dynamic'
