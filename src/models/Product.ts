import mongoose, { Schema, Model } from 'mongoose'

export interface IProductVariant {
  name: string
  value: string
  priceModifier?: number
}

export interface IProduct {
  _id: mongoose.Types.ObjectId
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  compareAtPrice?: number
  images: Array<{ url: string; alt: string }>
  category?: string
  variants?: IProductVariant[]
  availability: 'in-stock' | 'out-of-stock' | 'coming-soon' | 'contact'
  sku?: string
  isFeatured: boolean
  isPublished: boolean
  order: number
  seoTitle?: string
  seoDescription?: string
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    compareAtPrice: Number,
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, required: true },
      },
    ],
    category: String,
    variants: [
      {
        name: { type: String, required: true },
        value: { type: String, required: true },
        priceModifier: Number,
      },
    ],
    availability: {
      type: String,
      enum: ['in-stock', 'out-of-stock', 'coming-soon', 'contact'],
      default: 'contact',
    },
    sku: String,
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
    seoTitle: String,
    seoDescription: String,
  },
  {
    timestamps: true,
  }
)

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)

export default Product
