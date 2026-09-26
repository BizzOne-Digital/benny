import mongoose, { Schema, Model } from 'mongoose'

export interface ISocialLinks {
  facebook?: string
  instagram?: string
  twitter?: string
  linkedin?: string
  email?: string
}

export interface ITeamMember {
  _id: mongoose.Types.ObjectId
  name: string
  role: string
  bio: string
  photoUrl?: string
  photoAlt?: string
  socialLinks?: ISocialLinks
  order: number
  isFeatured: boolean
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    photoUrl: String,
    photoAlt: String,
    socialLinks: {
      facebook: String,
      instagram: String,
      twitter: String,
      linkedin: String,
      email: String,
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

const TeamMember: Model<ITeamMember> =
  mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema)

export default TeamMember
