import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import SiteContent from '@/models/SiteContent'
import { requireAdminApi } from '@/lib/require-admin-api'
import { CONTENT_PAGES } from '@/lib/page-content-registry'
import { deleteStoredUploadByUrl } from '@/lib/uploads'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const { error } = await requireAdminApi()
  if (error) return error

  await connectDB()
  const docs = await SiteContent.find().lean()
  const values: Record<string, string> = {}
  for (const d of docs) values[d.key] = d.value
  return NextResponse.json({ success: true, values })
}

/** Body: { slug, values: { "hero.title": "…" } } — empty string resets the field to its default. */
export async function PUT(request: NextRequest) {
  const { error } = await requireAdminApi()
  if (error) return error

  const body = await request.json().catch(() => null)
  const page = CONTENT_PAGES.find((p) => p.slug === body?.slug)
  if (!page || typeof body?.values !== 'object' || !body.values) {
    return NextResponse.json({ success: false, error: 'Invalid body' }, { status: 400 })
  }

  await connectDB()
  for (const field of page.fields) {
    if (!(field.key in body.values)) continue
    const key = `${page.slug}.${field.key}`
    const next = typeof body.values[field.key] === 'string' ? body.values[field.key].trim() : ''
    const prev = await SiteContent.findOne({ key })

    if (prev && prev.value !== next && field.type === 'image') {
      await deleteStoredUploadByUrl(prev.value)
    }

    // Same as default or empty → drop the override.
    if (!next || next === field.default) {
      if (prev) await SiteContent.deleteOne({ key })
    } else {
      await SiteContent.updateOne({ key }, { $set: { value: next } }, { upsert: true })
    }
  }

  return NextResponse.json({ success: true })
}
