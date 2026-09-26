import mongoose, { Schema, Model } from 'mongoose'

export interface IAnnouncement {
  _id: mongoose.Types.ObjectId
  title: string
  message: string
  dateLabel?: string
  isPublished: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const AnnouncementSchema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    dateLabel: String,
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

AnnouncementSchema.index({ order: 1, createdAt: -1 })

const Announcement: Model<IAnnouncement> =
  mongoose.models.Announcement || mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema)

export default Announcement
