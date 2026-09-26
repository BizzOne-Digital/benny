import mongoose, { Schema, Model } from 'mongoose'

export interface IMediaAsset {
  _id: mongoose.Types.ObjectId
  filename: string
  originalFilename: string
  url: string
  altText?: string
  mimeType: string
  size: number
  width?: number
  height?: number
  storageKey?: string
  uploadedBy?: mongoose.Types.ObjectId
  usageCount: number
  createdAt: Date
  updatedAt: Date
}

const MediaAssetSchema = new Schema<IMediaAsset>(
  {
    filename: {
      type: String,
      required: true,
    },
    originalFilename: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    altText: String,
    mimeType: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    width: Number,
    height: Number,
    storageKey: String,
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'AdminUser',
    },
    usageCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

MediaAssetSchema.index({ createdAt: -1 })

const MediaAsset: Model<IMediaAsset> =
  mongoose.models.MediaAsset || mongoose.model<IMediaAsset>('MediaAsset', MediaAssetSchema)

export default MediaAsset
