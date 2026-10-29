import mongoose, { Schema, Model } from 'mongoose'

export interface ISponsor {
  _id: mongoose.Types.ObjectId
  name: string
  logoUrl?: string
  website?: string
  tier: string
  description?: string
  isPublished: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const SponsorSchema = new Schema<ISponsor>(
  {
    name: { type: String, required: true },
    logoUrl: String,
    website: String,
    tier: { type: String, default: 'Community Sponsor' },
    description: String,
    isPublished: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
)

const Sponsor: Model<ISponsor> =
  mongoose.models.Sponsor || mongoose.model<ISponsor>('Sponsor', SponsorSchema)

export default Sponsor
