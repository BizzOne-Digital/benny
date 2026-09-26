import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import PricingPlan, { type IPricingPlan } from '@/models/PricingPlan'

export default async function AdminPricingPage() {
  const session = await auth()
  if (!session) return null

  await connectDB()
  const plans = await PricingPlan.find().sort({ order: 1 }).lean<IPricingPlan[]>()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-midnight-navy mb-2">Pricing Plans</h1>
          <p className="text-gray-600">Manage pricing tiers and plans</p>
        </div>
        <button className="px-6 py-3 bg-texas-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          + Add Plan
        </button>
      </div>

      {plans.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <p className="text-xl text-gray-600 mb-6">No pricing plans yet</p>
          <button className="px-6 py-3 bg-texas-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Create First Plan
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan._id.toString()}
              className={`rounded-xl p-6 ${
                plan.isHighlighted
                  ? 'bg-texas-blue text-white ring-4 ring-texas-blue ring-offset-4'
                  : 'bg-white shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className={`text-2xl font-bold ${
                    plan.isHighlighted ? 'text-white' : 'text-midnight-navy'
                  }`}
                >
                  {plan.name}
                </h3>
                {plan.isHighlighted && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-texas-blue">
                    Highlighted
                  </span>
                )}
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.priceText}</span>
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
                  className={`mb-4 ${
                    plan.isHighlighted ? 'text-gray-100' : 'text-gray-600'
                  }`}
                >
                  {plan.description}
                </p>
              )}
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature: string, index: number) => (
                  <li
                    key={index}
                    className={`text-sm ${
                      plan.isHighlighted ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    ✓ {feature}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between pt-4 border-t border-gray-300">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    plan.isVisible
                      ? 'bg-success/20 text-success'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {plan.isVisible ? 'Visible' : 'Hidden'}
                </span>
                <button
                  className={`font-semibold text-sm hover:underline ${
                    plan.isHighlighted ? 'text-white' : 'text-texas-blue'
                  }`}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
