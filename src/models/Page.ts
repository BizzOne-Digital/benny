import mongoose, { Schema, Model } from 'mongoose'

export interface IPageSection {
  _id?: mongoose.Types.ObjectId
  type: string
  enabled: boolean
  eyebrow?: string
  heading?: string
  body?: string
  richBody?: string
  ctaText?: string
  ctaUrl?: string
  imageUrl?: string
  imageAlt?: string
  imageFocalPoint?: string
  order: number
  data?: Record<string, unknown>
}

export interface IPage {
  _id: mongoose.Types.ObjectId
  name: string
  slug: string
  title: string
  description?: string
  sections: IPageSection[]
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  ogImage?: string
  isPublished: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const PageSectionSchema = new Schema<IPageSection>(
  {
    type: {
      type: String,
      required: true,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    eyebrow: String,
    heading: String,
    body: String,
    richBody: String,
    ctaText: String,
    ctaUrl: String,
    imageUrl: String,
    imageAlt: String,
    imageFocalPoint: {
      type: String,
      default: 'center',
    },
    order: {
      type: Number,
      required: true,
    },
    data: {
      type: Schema.Types.Mixed,
    },
  },
  { _id: true }
)

const PageSchema = new Schema<IPage>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    sections: {
      type: [PageSectionSchema],
      default: [],
    },
    seoTitle: String,
    seoDescription: String,
    seoKeywords: [String],
    ogImage: String,
    isPublished: {
      type: Boolean,
      default: true,
    },
    publishedAt: Date,
  },
  {
    timestamps: true,
  }
)

const Page: Model<IPage> = mongoose.models.Page || mongoose.model<IPage>('Page', PageSchema)

export default Page
