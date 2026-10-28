import mongoose, { Schema, Model } from 'mongoose'

/** One admin-edited override for a fixed-layout page field, keyed like "about.hero.title". */
export interface ISiteContent {
  _id: mongoose.Types.ObjectId
  key: string
  value: string
  createdAt: Date
  updatedAt: Date
}

const SiteContentSchema = new Schema<ISiteContent>(
  {
    key: { type: String, required: true, unique: true, index: true },
    value: { type: String, required: true },
  },
  { timestamps: true }
)

const SiteContent: Model<ISiteContent> =
  mongoose.models.SiteContent || mongoose.model<ISiteContent>('SiteContent', SiteContentSchema)

export default SiteContent
