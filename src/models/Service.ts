import mongoose, { Schema, Model } from 'mongoose'

export interface IServiceSection {
  _id?: mongoose.Types.ObjectId
  type: string
  enabled: boolean
  heading?: string
  body?: string
  imageUrl?: string
  imageAlt?: string
  order: number
  data?: Record<string, unknown>
}

export interface IService {
  _id: mongoose.Types.ObjectId
  title: string
  slug: string
  excerpt: string
  description: string
  cardImage: string
  cardImageAlt: string
  heroImage?: string
  heroImageAlt?: string
  icon?: string
  category?: string
  audience?: string
  benefits?: string[]
  schedule?: string
  location?: string
  sections: IServiceSection[]
  faqs?: Array<{ question: string; answer: string }>
  relatedServices?: mongoose.Types.ObjectId[]
  pricingPlanId?: mongoose.Types.ObjectId
  ctaText?: string
  ctaUrl?: string
  seoTitle?: string
  seoDescription?: string
  isPublished: boolean
  isFeatured: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const ServiceSectionSchema = new Schema<IServiceSection>(
  {
    type: {
      type: String,
      required: true,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    heading: String,
    body: String,
    imageUrl: String,
    imageAlt: String,
    order: {
      type: Number,
      required: true,
    },
    data: Schema.Types.Mixed,
  },
  { _id: true }
)

const ServiceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cardImage: {
      type: String,
      required: true,
    },
    cardImageAlt: {
      type: String,
      required: true,
    },
    heroImage: String,
    heroImageAlt: String,
    icon: String,
    category: String,
    audience: String,
    benefits: [String],
    schedule: String,
    location: String,
    sections: [ServiceSectionSchema],
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    relatedServices: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    pricingPlanId: { type: Schema.Types.ObjectId, ref: 'PricingPlan' },
    ctaText: String,
    ctaUrl: String,
    seoTitle: String,
    seoDescription: String,
    isPublished: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
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

const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema)

export default Service
