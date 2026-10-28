import connectDB from '@/lib/mongodb'
import SiteContent from '@/models/SiteContent'
import { CONTENT_PAGES } from '@/lib/page-content-registry'

/**
 * Returns a getter for a page's editable content: admin override if set, otherwise the registry default.
 * Usage: const c = await getPageContent('about'); c('hero.title')
 */
export async function getPageContent(slug: string) {
  const page = CONTENT_PAGES.find((p) => p.slug === slug)
  const defaults = new Map((page?.fields || []).map((f) => [f.key, f.default]))
  const overrides = new Map<string, string>()

  try {
    await connectDB()
    const docs = await SiteContent.find({ key: { $regex: `^${slug}\\.` } }).lean()
    for (const d of docs) overrides.set(d.key.slice(slug.length + 1), d.value)
  } catch (err) {
    console.error('getPageContent failed, using defaults:', err)
  }

  return (key: string): string => overrides.get(key) || defaults.get(key) || ''
}
