import 'server-only'
import type { Model } from 'mongoose'
import Service from '@/models/Service'
import Product from '@/models/Product'
import TeamMember from '@/models/TeamMember'
import Testimonial from '@/models/Testimonial'
import FAQ from '@/models/FAQ'
import FAQCategory from '@/models/FAQCategory'
import PricingPlan from '@/models/PricingPlan'
import BlogPost from '@/models/BlogPost'
import Sponsor from '@/models/Sponsor'
import { RESOURCES, slugify, type FieldConfig, type ResourceConfig } from './admin-resources'
import { deleteStoredUploadByUrl } from './uploads'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MODELS: Record<string, Model<any>> = {
  services: Service,
  products: Product,
  team: TeamMember,
  testimonials: Testimonial,
  faqs: FAQ,
  'faq-categories': FAQCategory,
  pricing: PricingPlan,
  blog: BlogPost,
  sponsors: Sponsor,
}

export function getResource(key: string) {
  const config: ResourceConfig | undefined = RESOURCES[key]
  const model = MODELS[key]
  if (!config || !model) return null
  return { config, model }
}

export function sortFor(key: string): Record<string, 1 | -1> {
  if (key === 'blog') return { publishDate: -1 }
  return { order: 1 }
}

const str = (v: unknown) => (typeof v === 'string' ? v : v == null ? '' : String(v))

function coerce(field: FieldConfig, value: unknown): unknown {
  switch (field.type) {
    case 'number': {
      if (value === '' || value == null) return undefined
      const n = Number(value)
      return Number.isFinite(n) ? n : undefined
    }
    case 'boolean':
      return value === true || value === 'true'
    case 'date':
      return value ? new Date(str(value)) : undefined
    case 'lines':
      return (Array.isArray(value) ? value : str(value).split('\n'))
        .map((s) => str(s).trim())
        .filter(Boolean)
    case 'imageList':
      return (Array.isArray(value) ? value : [])
        .map((i) => ({ url: str(i?.url).trim(), alt: str(i?.alt).trim() }))
        .filter((i) => i.url)
        .map((i) => ({ ...i, alt: i.alt || 'Image' }))
    case 'faqs':
      return (Array.isArray(value) ? value : [])
        .map((i) => ({ question: str(i?.question).trim(), answer: str(i?.answer).trim() }))
        .filter((i) => i.question && i.answer)
    case 'sections':
      return (Array.isArray(value) ? value : []).map((s, index) => ({
        type: 'content',
        enabled: s?.enabled !== false,
        heading: str(s?.heading),
        body: str(s?.body),
        imageUrl: str(s?.imageUrl),
        imageAlt: str(s?.imageAlt),
        order: index,
      }))
    default:
      return typeof value === 'string' ? value.trim() : value
  }
}

/** Build a Mongo update/create payload from a request body using only configured fields. */
export function buildPayload(config: ResourceConfig, body: Record<string, unknown>, partial = false) {
  const payload: Record<string, unknown> = {}
  for (const field of config.fields) {
    if (!(field.name in body)) {
      if (!partial && field.default !== undefined) payload[field.name] = field.default
      continue
    }
    const v = coerce(field, body[field.name])
    if (v !== undefined) payload[field.name] = v
    else if (partial) payload[field.name] = null
  }
  if (config.fields.some((f) => f.name === 'slug')) {
    const base = str(payload.slug) || str(body[config.titleField])
    if (base) payload.slug = slugify(base)
  }
  return payload
}

export function missingRequired(config: ResourceConfig, payload: Record<string, unknown>) {
  return config.fields
    .filter((f) => f.required)
    .filter((f) => {
      const v = payload[f.name]
      return v === undefined || v === null || v === ''
    })
    .map((f) => f.label)
}

/** Every stored-upload URL referenced by a document. */
export function collectUploadUrls(config: ResourceConfig, doc: Record<string, unknown>): string[] {
  const urls: string[] = []
  for (const f of config.fields) {
    const v = doc[f.name]
    if (f.type === 'image' && typeof v === 'string') urls.push(v)
    if (f.type === 'imageList' && Array.isArray(v)) v.forEach((i) => i?.url && urls.push(i.url))
    if (f.type === 'sections' && Array.isArray(v)) v.forEach((s) => s?.imageUrl && urls.push(s.imageUrl))
  }
  return urls.filter((u) => u.startsWith('/api/uploads/'))
}

export async function deleteUnusedUploads(before: string[], after: string[]) {
  const keep = new Set(after)
  for (const url of before) if (!keep.has(url)) await deleteStoredUploadByUrl(url)
}
