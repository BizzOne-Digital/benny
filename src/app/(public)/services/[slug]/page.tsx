import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import connectDB from '@/lib/mongodb'
import Service, { type IService } from '@/models/Service'
import Button from '@/components/ui/Button'

export async function generateStaticParams() {
  await connectDB()
  const services = await Service.find({ isPublished: true }).select('slug').lean<Pick<IService, 'slug'>[]>()
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  await connectDB()
  const service = await Service.findOne({ slug, isPublished: true }).lean()
  
  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: `${service.title} | Team TEXAS Special Needs`,
    description: service.excerpt,
    openGraph: {
      title: service.title,
      description: service.excerpt,
      images: [service.heroImage || service.cardImage],
    },
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  await connectDB()
  const service = await Service.findOne({ slug, isPublished: true })
    .populate('relatedServices')
    .lean()

  if (!service) {
    notFound()
  }

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-32 bg-midnight-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.heroImage || service.cardImage}
            alt={service.heroImageAlt || service.cardImageAlt}
            fill
            className="object-cover opacity-40"
            sizes="100vw"
            priority
          />
        </div>
        <div className="section-container relative z-10">
          {service.category && (
            <p className="text-warm-gold font-bold uppercase tracking-wide mb-4">
              {service.category}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{service.title}</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl">{service.excerpt}</p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-midnight-navy mb-6">
              Program Overview
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed">{service.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      {service.benefits && service.benefits.length > 0 && (
        <section className="py-16 lg:py-24 bg-warm-cream">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-midnight-navy mb-8 text-center">
                Program Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.benefits.map((benefit: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <svg
                      className="w-6 h-6 text-success flex-shrink-0 mt-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Who is this for */}
      {service.audience && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-midnight-navy mb-6">
                Who Can Participate?
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">{service.audience}</p>
            </div>
          </div>
        </section>
      )}

      {/* Schedule & Location */}
      {(service.schedule || service.location) && (
        <section className="py-16 lg:py-24 bg-sky">
          <div className="section-container">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.schedule && (
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-midnight-navy mb-4">Schedule</h3>
                  <p className="text-gray-700">{service.schedule}</p>
                </div>
              )}
              {service.location && (
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-midnight-navy mb-4">Location</h3>
                  <p className="text-gray-700">{service.location}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-midnight-navy mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {service.faqs.map((faq, index: number) => (
                  <div key={index} className="bg-warm-cream rounded-xl p-6">
                    <h3 className="text-xl font-bold text-midnight-navy mb-3">{faq.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-texas-blue text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join {service.title}?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to learn more and get started!
          </p>
          <Link href="/contact">
            <Button variant="secondary" size="lg">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
