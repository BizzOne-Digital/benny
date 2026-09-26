import mongoose, { Schema, Model } from 'mongoose'

export interface IProgram {
  _id: mongoose.Types.ObjectId
  slug: string
  title: string
  description: string
  image: string
  highlights: string[]
  isPublished: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

const ProgramSchema = new Schema<IProgram>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    highlights: { type: [String], default: [] },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

const Program: Model<IProgram> =
  mongoose.models.Program || mongoose.model<IProgram>('Program', ProgramSchema)

export default Program
