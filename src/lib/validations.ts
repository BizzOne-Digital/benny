import { z } from 'zod'

// Contact Form
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  interestType: z.string().min(1, 'Please select an interest type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().max(0).optional(), // Spam protection
})

// Service
export const serviceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  description: z.string().min(1, 'Description is required'),
  cardImage: z.string().url('Invalid image URL'),
  cardImageAlt: z.string().min(1, 'Image alt text is required'),
  heroImage: z.string().url().optional(),
  heroImageAlt: z.string().optional(),
  category: z.string().optional(),
  audience: z.string().optional(),
  benefits: z.array(z.string()).optional(),
  schedule: z.string().optional(),
  location: z.string().optional(),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  order: z.number().default(0),
})

// Testimonial
export const testimonialSchema = z.object({
  personName: z.string().min(1, 'Name is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  quote: z.string().min(1, 'Quote is required'),
  photoUrl: z.string().url().optional().or(z.literal('')),
  rating: z.number().min(1).max(5).optional(),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  order: z.number().default(0),
})

// FAQ
export const faqSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
  categoryId: z.string().min(1, 'Category is required'),
  order: z.number().default(0),
  isPublished: z.boolean().default(false),
})

// Blog Post
export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  coverImage: z.string().url('Invalid cover image URL'),
  coverImageAlt: z.string().min(1, 'Cover image alt text is required'),
  author: z.string().min(1, 'Author is required'),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  status: z.enum(['draft', 'published', 'scheduled']).default('draft'),
  publishDate: z.date().optional(),
  isFeatured: z.boolean().default(false),
})

// Team Member
export const teamMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  bio: z.string().min(1, 'Bio is required'),
  photoUrl: z.string().url().optional().or(z.literal('')),
  photoAlt: z.string().optional(),
  socialLinks: z
    .object({
      facebook: z.string().url().optional().or(z.literal('')),
      instagram: z.string().url().optional().or(z.literal('')),
      twitter: z.string().url().optional().or(z.literal('')),
      linkedin: z.string().url().optional().or(z.literal('')),
      email: z.string().email().optional().or(z.literal('')),
    })
    .optional(),
  order: z.number().default(0),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
})

// Product
export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().min(1, 'Description is required'),
  shortDescription: z.string().min(1, 'Short description is required'),
  price: z.number().min(0, 'Price must be positive'),
  compareAtPrice: z.number().min(0).optional(),
  images: z
    .array(
      z.object({
        url: z.string().url(),
        alt: z.string(),
      })
    )
    .min(1, 'At least one image is required'),
  category: z.string().optional(),
  availability: z
    .enum(['in-stock', 'out-of-stock', 'coming-soon', 'contact'])
    .default('contact'),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  order: z.number().default(0),
})

// Settings
export const settingsSchema = z.object({
  organizationName: z.string().min(1, 'Organization name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  contactRole: z.string().optional(),
  address: z.string().optional(),
  officeHours: z.string().optional(),
  socialLinks: z
    .object({
      facebook: z.string().url().optional().or(z.literal('')),
      instagram: z.string().url().optional().or(z.literal('')),
      twitter: z.string().url().optional().or(z.literal('')),
      linkedin: z.string().url().optional().or(z.literal('')),
      youtube: z.string().url().optional().or(z.literal('')),
    })
    .optional(),
  defaultCTAText: z.string().optional(),
  defaultCTAUrl: z.string().optional(),
  footerText: z.string().optional(),
  pricingVisibility: z.boolean().default(false),
})
