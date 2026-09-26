import mongoose, { Schema, Model } from 'mongoose'

export interface IPricingPlan {
  _id: mongoose.Types.ObjectId
  name: string
  slug: string
  priceText: string
  billingLabel?: string
  description?: string
  features: string[]
  relatedServiceId?: mongoose.Types.ObjectId
  ctaText?: string
  ctaUrl?: string
  isHighlighted: boolean
  isVisible: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const PricingPlanSchema = new Schema<IPricingPlan>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    priceText: {
      type: String,
      required: true,
    },
    billingLabel: String,
    description: String,
    features: {
      type: [String],
      default: [],
    },
    relatedServiceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
    },
    ctaText: {
      type: String,
      default: 'Contact Us',
    },
    ctaUrl: {
      type: String,
      default: '/contact',
    },
    isHighlighted: {
      type: Boolean,
      default: false,
    },
    isVisible: {
      type: Boolean,
      default: true,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  {
    timestamps: true,
  }
)

const PricingPlan: Model<IPricingPlan> =
  mongoose.models.PricingPlan || mongoose.model<IPricingPlan>('PricingPlan', PricingPlanSchema)

export default PricingPlan
