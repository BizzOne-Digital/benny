import mongoose, { Schema, Model } from 'mongoose'

export interface ISocialLinks {
  facebook?: string
  instagram?: string
  twitter?: string
  linkedin?: string
  youtube?: string
}

export interface ISiteSettings {
  _id: mongoose.Types.ObjectId
  organizationName: string
  email: string
  phone: string
  contactRole: string
  address?: string
  officeHours?: string
  socialLinks: ISocialLinks
  logoUrl?: string
  faviconUrl?: string
  defaultCTAText: string
  defaultCTAUrl: string
  footerText?: string
  pricingVisibility: boolean
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  analyticsId?: string
  homeHeroEyebrow?: string
  homeHeroHeadline?: string
  homeHeroSubtext?: string
  createdAt: Date
  updatedAt: Date
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    organizationName: {
      type: String,
      required: true,
      default: 'Team TEXAS Special Needs',
    },
    email: {
      type: String,
      required: true,
      default: 'teamtexas.specialneeds@gmail.com',
    },
    phone: {
      type: String,
      required: true,
      default: '18325195390',
    },
    contactRole: {
      type: String,
      default: 'Founder, President & Coach — Team TEXAS Special Needs',
    },
    address: {
      type: String,
    },
    officeHours: {
      type: String,
    },
    socialLinks: {
      facebook: String,
      instagram: String,
      twitter: String,
      linkedin: String,
      youtube: String,
    },
    logoUrl: {
      type: String,
    },
    faviconUrl: {
      type: String,
    },
    defaultCTAText: {
      type: String,
      default: 'Get Involved',
    },
    defaultCTAUrl: {
      type: String,
      default: '/contact',
    },
    footerText: {
      type: String,
    },
    pricingVisibility: {
      type: Boolean,
      default: false,
    },
    seoTitle: {
      type: String,
    },
    seoDescription: {
      type: String,
    },
    seoKeywords: {
      type: [String],
      default: [],
    },
    analyticsId: {
      type: String,
    },
    homeHeroEyebrow: {
      type: String,
      default: 'WELCOME TO TEAM TEXAS SPECIAL NEEDS',
    },
    homeHeroHeadline: {
      type: String,
      default: 'EVERYONE DESERVES THEIR MOMENT TO PLAY.',
    },
    homeHeroSubtext: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema)

export default SiteSettings
