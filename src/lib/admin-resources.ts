import type { UploadFolder } from './upload-constants'

/**
 * Field configuration shared by the admin UI (forms) and the admin API (allow-list).
 * Pure data — safe to import from client and server code.
 */
export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'boolean'
  | 'select'
  | 'image'
  | 'lines' // string[] edited one-per-line
  | 'imageList' // [{ url, alt }]
  | 'faqs' // [{ question, answer }]
  | 'sections' // [{ heading, body, imageUrl, imageAlt, enabled }]
  | 'date'

export type FieldConfig = {
  name: string
  label: string
  type: FieldType
  required?: boolean
  hint?: string
  folder?: UploadFolder
  options?: Array<{ value: string; label: string }>
  default?: unknown
}

export type ResourceConfig = {
  key: string
  singular: string
  plural: string
  description: string
  /** field used as the card/row title */
  titleField: string
  /** field used as the thumbnail in list view (image url or imageList) */
  imageField?: string
  subtitleField?: string
  /** boolean field that controls published state (shown as a badge) */
  publishField?: string
  fields: FieldConfig[]
}

const slugField: FieldConfig = {
  name: 'slug',
  label: 'URL slug',
  type: 'text',
  required: true,
  hint: 'Lowercase letters, numbers and dashes only. Leave blank to auto-generate from the title.',
}
const orderField: FieldConfig = { name: 'order', label: 'Display order', type: 'number', default: 0 }

export const RESOURCES: Record<string, ResourceConfig> = {
  services: {
    key: 'services',
    singular: 'Service',
    plural: 'Services',
    description: 'Programs and services shown on the Services page and each service detail page.',
    titleField: 'title',
    imageField: 'cardImage',
    subtitleField: 'excerpt',
    publishField: 'isPublished',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      slugField,
      { name: 'excerpt', label: 'Short summary (card text)', type: 'textarea', required: true },
      { name: 'description', label: 'Full description', type: 'textarea', required: true },
      { name: 'cardImage', label: 'Card image', type: 'image', folder: 'pages', required: true },
      { name: 'cardImageAlt', label: 'Card image description (alt text)', type: 'text', required: true },
      { name: 'heroImage', label: 'Detail page hero image', type: 'image', folder: 'pages' },
      { name: 'heroImageAlt', label: 'Hero image description (alt text)', type: 'text' },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'audience', label: 'Who is it for', type: 'text' },
      { name: 'schedule', label: 'Schedule', type: 'text' },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'benefits', label: 'Benefits (one per line)', type: 'lines' },
      { name: 'sections', label: 'Extra content sections', type: 'sections' },
      { name: 'faqs', label: 'FAQs for this service', type: 'faqs' },
      { name: 'ctaText', label: 'Button text', type: 'text' },
      { name: 'ctaUrl', label: 'Button link', type: 'text' },
      { name: 'seoTitle', label: 'SEO title', type: 'text' },
      { name: 'seoDescription', label: 'SEO description', type: 'textarea' },
      { name: 'isFeatured', label: 'Featured', type: 'boolean' },
      { name: 'isPublished', label: 'Published on site', type: 'boolean', default: true },
      orderField,
    ],
  },
  products: {
    key: 'products',
    singular: 'Product',
    plural: 'Products',
    description: 'Merchandise shown on the Shop page.',
    titleField: 'name',
    imageField: 'images',
    subtitleField: 'shortDescription',
    publishField: 'isPublished',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { ...slugField },
      { name: 'shortDescription', label: 'Short description', type: 'textarea', required: true },
      { name: 'description', label: 'Full description', type: 'textarea', required: true },
      { name: 'price', label: 'Price (USD)', type: 'number', required: true, default: 0 },
      { name: 'compareAtPrice', label: 'Compare-at price (optional)', type: 'number' },
      { name: 'images', label: 'Product images', type: 'imageList', folder: 'products' },
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'sku', label: 'SKU', type: 'text' },
      {
        name: 'availability',
        label: 'Availability',
        type: 'select',
        default: 'contact',
        options: [
          { value: 'in-stock', label: 'In stock' },
          { value: 'out-of-stock', label: 'Out of stock' },
          { value: 'coming-soon', label: 'Coming soon' },
          { value: 'contact', label: 'Contact us' },
        ],
      },
      { name: 'isFeatured', label: 'Featured', type: 'boolean' },
      { name: 'isPublished', label: 'Published on site', type: 'boolean', default: true },
      orderField,
    ],
  },
  team: {
    key: 'team',
    singular: 'Team member',
    plural: 'Team',
    description: 'Coaches and staff shown on the Team page.',
    titleField: 'name',
    imageField: 'photoUrl',
    subtitleField: 'role',
    publishField: 'isPublished',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'role', label: 'Role', type: 'text', required: true },
      { name: 'bio', label: 'Bio', type: 'textarea', required: true },
      { name: 'photoUrl', label: 'Photo', type: 'image', folder: 'pages' },
      { name: 'photoAlt', label: 'Photo description (alt text)', type: 'text' },
      { name: 'isFeatured', label: 'Featured', type: 'boolean' },
      { name: 'isPublished', label: 'Published on site', type: 'boolean', default: true },
      orderField,
    ],
  },
  testimonials: {
    key: 'testimonials',
    singular: 'Testimonial',
    plural: 'Testimonials',
    description: 'Stories from families and athletes shown on the Testimonials page.',
    titleField: 'personName',
    imageField: 'photoUrl',
    subtitleField: 'quote',
    publishField: 'isPublished',
    fields: [
      { name: 'personName', label: 'Name', type: 'text', required: true },
      { name: 'relationship', label: 'Relationship (e.g. Parent of Athlete)', type: 'text', required: true },
      { name: 'quote', label: 'Quote', type: 'textarea', required: true },
      { name: 'photoUrl', label: 'Photo', type: 'image', folder: 'pages' },
      { name: 'rating', label: 'Rating (1-5, optional)', type: 'number' },
      { name: 'isFeatured', label: 'Featured', type: 'boolean' },
      { name: 'isPublished', label: 'Published on site', type: 'boolean', default: true },
      orderField,
    ],
  },
  faqs: {
    key: 'faqs',
    singular: 'FAQ',
    plural: 'FAQs',
    description: 'Questions shown on the FAQ page, grouped by category.',
    titleField: 'question',
    subtitleField: 'answer',
    publishField: 'isPublished',
    fields: [
      { name: 'question', label: 'Question', type: 'text', required: true },
      { name: 'answer', label: 'Answer', type: 'textarea', required: true },
      { name: 'categoryId', label: 'Category', type: 'select', required: true, options: [] },
      { name: 'isPublished', label: 'Published on site', type: 'boolean', default: true },
      orderField,
    ],
  },
  'faq-categories': {
    key: 'faq-categories',
    singular: 'FAQ category',
    plural: 'FAQ categories',
    description: 'Groups used to organise FAQs.',
    titleField: 'name',
    subtitleField: 'description',
    publishField: 'isVisible',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { ...slugField },
      { name: 'description', label: 'Description', type: 'text' },
      { name: 'isVisible', label: 'Visible on site', type: 'boolean', default: true },
      orderField,
    ],
  },
  pricing: {
    key: 'pricing',
    singular: 'Pricing plan',
    plural: 'Pricing',
    description: 'Plans shown on the Pricing page (visible only when pricing is enabled in Settings).',
    titleField: 'name',
    subtitleField: 'priceText',
    publishField: 'isVisible',
    fields: [
      { name: 'name', label: 'Plan name', type: 'text', required: true },
      { ...slugField },
      { name: 'priceText', label: 'Price text (e.g. $50 or Contact Us)', type: 'text', required: true },
      { name: 'billingLabel', label: 'Billing label (e.g. per season)', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'features', label: 'Features (one per line)', type: 'lines' },
      { name: 'ctaText', label: 'Button text', type: 'text', default: 'Contact Us' },
      { name: 'ctaUrl', label: 'Button link', type: 'text', default: '/contact' },
      { name: 'isHighlighted', label: 'Highlight as recommended', type: 'boolean' },
      { name: 'isVisible', label: 'Visible on site', type: 'boolean', default: true },
      orderField,
    ],
  },
  sponsors: {
    key: 'sponsors',
    singular: 'Sponsor',
    plural: 'Sponsors',
    description: 'Businesses and people who support Team TEXAS, shown on the Sponsors page.',
    titleField: 'name',
    imageField: 'logoUrl',
    subtitleField: 'tier',
    publishField: 'isPublished',
    fields: [
      { name: 'name', label: 'Sponsor name', type: 'text', required: true },
      { name: 'logoUrl', label: 'Logo', type: 'image', folder: 'pages' },
      { name: 'website', label: 'Website link (https://...)', type: 'text' },
      {
        name: 'tier',
        label: 'Sponsor level',
        type: 'select',
        default: 'Community Sponsor',
        options: [
          { value: 'Founding Sponsor', label: 'Founding Sponsor' },
          { value: 'Gold Sponsor', label: 'Gold Sponsor' },
          { value: 'Silver Sponsor', label: 'Silver Sponsor' },
          { value: 'Bronze Sponsor', label: 'Bronze Sponsor' },
          { value: 'Community Sponsor', label: 'Community Sponsor' },
        ],
      },
      { name: 'description', label: 'About the sponsor', type: 'textarea' },
      { name: 'isPublished', label: 'Published on site', type: 'boolean', default: true },
      orderField,
    ],
  },
  blog: {
    key: 'blog',
    singular: 'Blog post',
    plural: 'Blog',
    description: 'News and stories shown on the Blog page.',
    titleField: 'title',
    imageField: 'coverImage',
    subtitleField: 'excerpt',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { ...slugField },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea', required: true },
      { name: 'content', label: 'Content', type: 'textarea', required: true },
      { name: 'coverImage', label: 'Cover image', type: 'image', folder: 'pages', required: true },
      { name: 'coverImageAlt', label: 'Cover image description (alt text)', type: 'text', required: true },
      { name: 'author', label: 'Author', type: 'text', default: 'Team TEXAS' },
      { name: 'categories', label: 'Categories (one per line)', type: 'lines' },
      { name: 'tags', label: 'Tags (one per line)', type: 'lines' },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        default: 'published',
        options: [
          { value: 'draft', label: 'Draft (hidden)' },
          { value: 'published', label: 'Published' },
        ],
      },
      { name: 'publishDate', label: 'Publish date', type: 'date' },
      { name: 'isFeatured', label: 'Featured', type: 'boolean' },
      { name: 'seoTitle', label: 'SEO title', type: 'text' },
      { name: 'seoDescription', label: 'SEO description', type: 'textarea' },
    ],
  },
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
