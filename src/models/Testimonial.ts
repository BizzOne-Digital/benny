import mongoose, { Schema, Model } from 'mongoose'

export interface ITestimonial {
  _id: mongoose.Types.ObjectId
  personName: string
  relationship: string
  quote: string
  photoUrl?: string
  rating?: number
  isFeatured: boolean
  isPublished: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    personName: {
      type: String,
      required: true,
    },
    relationship: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
      required: true,
    },
    photoUrl: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
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

const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema)

export default Testimonial
