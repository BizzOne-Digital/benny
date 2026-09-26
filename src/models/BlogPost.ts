import mongoose, { Schema, Model } from 'mongoose'

export interface IBlogPost {
  _id: mongoose.Types.ObjectId
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  coverImageAlt: string
  author: string
  authorId?: mongoose.Types.ObjectId
  categories: string[]
  tags: string[]
  status: 'draft' | 'published' | 'scheduled'
  publishDate: Date
  isFeatured: boolean
  seoTitle?: string
  seoDescription?: string
  views: number
  createdAt: Date
  updatedAt: Date
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    coverImageAlt: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'AdminUser',
    },
    categories: {
      type: [String],
      default: [],
      index: true,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'scheduled'],
      default: 'draft',
      index: true,
    },
    publishDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    seoTitle: String,
    seoDescription: String,
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

BlogPostSchema.index({ status: 1, publishDate: -1 })

const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema)

export default BlogPost
