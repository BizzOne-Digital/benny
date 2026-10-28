import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { requireAdminApi } from '@/lib/require-admin-api'
import {
  buildPayload,
  collectUploadUrls,
  deleteUnusedUploads,
  getResource,
  missingRequired,
} from '@/lib/admin-resource-server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Ctx = { params: Promise<{ resource: string; id: string }> }

export async function PUT(request: NextRequest, context: Ctx) {
  const { error } = await requireAdminApi()
  if (error) return error
  const { resource, id } = await context.params
  const res = getResource(resource)
  if (!res) return NextResponse.json({ success: false, error: 'Unknown resource' }, { status: 404 })

  const body = await request.json().catch(() => null)
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ success: false, error: 'Invalid body' }, { status: 400 })
  }

  await connectDB()
  const existing = await res.model.findById(id)
  if (!existing) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })

  const payload = buildPayload(res.config, body, true)
  const missing = missingRequired(res.config, { ...existing.toObject(), ...payload })
  if (missing.length) {
    return NextResponse.json(
      { success: false, error: `Required: ${missing.join(', ')}` },
      { status: 400 }
    )
  }

  const before = collectUploadUrls(res.config, existing.toObject())
  try {
    existing.set(payload)
    await existing.save()
  } catch (err) {
    const code = (err as { code?: number })?.code
    const message =
      code === 11000
        ? 'An item with this slug/name already exists. Change the slug or title.'
        : err instanceof Error
          ? err.message
          : 'Save failed'
    return NextResponse.json({ success: false, error: message }, { status: code === 11000 ? 409 : 400 })
  }

  const saved = existing.toObject()
  await deleteUnusedUploads(before, collectUploadUrls(res.config, saved))
  return NextResponse.json({ success: true, item: JSON.parse(JSON.stringify(saved)) })
}

export async function DELETE(_req: NextRequest, context: Ctx) {
  const { error } = await requireAdminApi()
  if (error) return error
  const { resource, id } = await context.params
  const res = getResource(resource)
  if (!res) return NextResponse.json({ success: false, error: 'Unknown resource' }, { status: 404 })

  await connectDB()
  const existing = await res.model.findById(id)
  if (!existing) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })

  const urls = collectUploadUrls(res.config, existing.toObject())
  await existing.deleteOne()
  await deleteUnusedUploads(urls, [])
  return NextResponse.json({ success: true })
}
