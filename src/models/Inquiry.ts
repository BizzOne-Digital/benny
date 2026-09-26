import mongoose, { Schema, Model } from 'mongoose'

export interface IInquiry {
  _id: mongoose.Types.ObjectId
  name: string
  email: string
  phone?: string
  interestType: string
  message: string
  status: 'new' | 'read' | 'responded' | 'archived'
  internalNotes?: string
  ipAddress?: string
  userAgent?: string
  createdAt: Date
  updatedAt: Date
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: String,
    interestType: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['new', 'read', 'responded', 'archived'],
      default: 'new',
      index: true,
    },
    internalNotes: String,
    ipAddress: String,
    userAgent: String,
  },
  {
    timestamps: true,
  }
)

InquirySchema.index({ status: 1, createdAt: -1 })

const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema)

export default Inquiry
