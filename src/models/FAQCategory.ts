import mongoose, { Schema, Model } from 'mongoose'

export interface IFAQCategory {
  _id: mongoose.Types.ObjectId
  name: string
  slug: string
  description?: string
  order: number
  isVisible: boolean
  createdAt: Date
  updatedAt: Date
}

const FAQCategorySchema = new Schema<IFAQCategory>(
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
    description: String,
    order: {
      type: Number,
      default: 0,
      index: true,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

const FAQCategory: Model<IFAQCategory> =
  mongoose.models.FAQCategory || mongoose.model<IFAQCategory>('FAQCategory', FAQCategorySchema)

export default FAQCategory
