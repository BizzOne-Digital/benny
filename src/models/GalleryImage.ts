import mongoose, { Schema, Model } from 'mongoose'

export interface IGalleryImage {
  _id: mongoose.Types.ObjectId
  title: string
  caption?: string
  imageUrl: string
  imageAlt: string
  thumbnailUrl?: string
  categoryId: mongoose.Types.ObjectId
  order: number
  isFeatured: boolean
  isVisible: boolean
  width?: number
  height?: number
  createdAt: Date
  updatedAt: Date
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    title: {
      type: String,
      required: true,
    },
    caption: String,
    imageUrl: {
      type: String,
      required: true,
    },
    imageAlt: {
      type: String,
      required: true,
    },
    thumbnailUrl: String,
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'GalleryCategory',
      required: true,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    width: Number,
    height: Number,
  },
  {
    timestamps: true,
  }
)

GalleryImageSchema.index({ categoryId: 1, order: 1 })

const GalleryImage: Model<IGalleryImage> =
  mongoose.models.GalleryImage || mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema)

export default GalleryImage
