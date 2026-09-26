import mongoose, { Schema, Model } from 'mongoose'

export interface IGalleryCategory {
  _id: mongoose.Types.ObjectId
  name: string
  slug: string
  description?: string
  order: number
  isVisible: boolean
  createdAt: Date
  updatedAt: Date
}

const GalleryCategorySchema = new Schema<IGalleryCategory>(
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

const GalleryCategory: Model<IGalleryCategory> =
  mongoose.models.GalleryCategory ||
  mongoose.model<IGalleryCategory>('GalleryCategory', GalleryCategorySchema)

export default GalleryCategory
