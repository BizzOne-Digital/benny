import mongoose, { Schema, Model } from 'mongoose'

export interface IFAQ {
  _id: mongoose.Types.ObjectId
  question: string
  answer: string
  categoryId: mongoose.Types.ObjectId
  order: number
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

const FAQSchema = new Schema<IFAQ>(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'FAQCategory',
      required: true,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
)

FAQSchema.index({ categoryId: 1, order: 1 })

const FAQ: Model<IFAQ> = mongoose.models.FAQ || mongoose.model<IFAQ>('FAQ', FAQSchema)

export default FAQ
