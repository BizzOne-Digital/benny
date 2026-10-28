import { getPageContent } from '@/lib/page-content'
import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import PricingPlan, { type IPricingPlan } from '@/models/PricingPlan'
import SiteSettings from '@/models/SiteSettings'
import Button from '@/components/ui/Button'

export const metadata = {
  title: 'Pricing | Team TEXAS Special Needs',
  description: 'Learn about our program pricing and registration options',
}

export default async function PricingPage() {
  const c = await getPageContent('pricing')
  await connectDB()
  const [plans, settings] = await Promise.all([
    PricingPlan.find({ isVisible: true }).sort({ order: 1 }).lean<IPricingPlan[]>(),
    SiteSettings.findOne().lean(),
  ])

  const pricingVisible = settings?.pricingVisibility ?? false

  return (
    <>
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-midnight-navy to-texas-blue text-white">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{c('hero.title')}</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
            {c('hero.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="section-container">
          {!pricingVisible && (
            <div className="max-w-3xl mx-auto text-center mb-12 p-8 bg-warm-cream rounded-2xl">
              <h2 className="text-2xl font-bold text-midnight-navy mb-4">
                Contact Us for Current Program Details
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Program pricing and availability vary by location and season. We're happy to discuss
                options that work for your family.
              </p>
              <Link href="/contact">
                <Button size="lg">Get in Touch</Button>
              </Link>
            </div>
          )}

          {plans.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan._id.toString()}
                  className={`rounded-2xl p-8 ${
                    plan.isHighlighted
                      ? 'bg-texas-blue text-white shadow-2xl ring-4 ring-texas-blue ring-offset-4'
                      : 'bg-white border-2 border-gray-200 shadow-lg'
                  }`}
                >
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      plan.isHighlighted ? 'text-white' : 'text-midnight-navy'
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.priceText}</span>
                    {plan.billingLabel && (
                      <span
                        className={`ml-2 text-sm ${
                          plan.isHighlighted ? 'text-gray-200' : 'text-gray-600'
                        }`}
                      >
                        {plan.billingLabel}
                      </span>
                    )}
                  </div>
                  {plan.description && (
                    <p
                      className={`mb-6 ${
                        plan.isHighlighted ? 'text-gray-100' : 'text-gray-600'
                      }`}
                    >
                      {plan.description}
                    </p>
                  )}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className={`w-6 h-6 flex-shrink-0 mr-3 ${
                            plan.isHighlighted ? 'text-white' : 'text-success'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span
                          className={plan.isHighlighted ? 'text-white' : 'text-gray-700'}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.ctaUrl || '/contact'}
                    className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                      plan.isHighlighted
                        ? 'bg-white text-texas-blue hover:bg-gray-100'
                        : 'bg-texas-blue text-white hover:bg-blue-700'
                    }`}
                  >
                    {plan.ctaText || 'Get Started'}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export const dynamic = 'force-dynamic'
