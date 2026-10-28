import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { requireAdminApi } from '@/lib/require-admin-api'
import { buildPayload, getResource, missingRequired, sortFor } from '@/lib/admin-resource-server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Ctx = { params: Promise<{ resource: string }> }

export async function GET(_req: NextRequest, context: Ctx) {
  const { error } = await requireAdminApi()
  if (error) return error
  const res = getResource((await context.params).resource)
  if (!res) return NextResponse.json({ success: false, error: 'Unknown resource' }, { status: 404 })

  await connectDB()
  const items = await res.model.find().sort(sortFor(res.config.key)).lean()
  return NextResponse.json({ success: true, items: JSON.parse(JSON.stringify(items)) })
}

export async function POST(request: NextRequest, context: Ctx) {
  const { error } = await requireAdminApi()
  if (error) return error
  const res = getResource((await context.params).resource)
  if (!res) return NextResponse.json({ success: false, error: 'Unknown resource' }, { status: 404 })

  const body = await request.json().catch(() => null)
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ success: false, error: 'Invalid body' }, { status: 400 })
  }

  const payload = buildPayload(res.config, body)
  const missing = missingRequired(res.config, payload)
  if (missing.length) {
    return NextResponse.json(
      { success: false, error: `Required: ${missing.join(', ')}` },
      { status: 400 }
    )
  }

  await connectDB()
  try {
    const item = await res.model.create(payload)
    return NextResponse.json({ success: true, item: JSON.parse(JSON.stringify(item.toObject())) })
  } catch (err) {
    const code = (err as { code?: number })?.code
    const message =
      code === 11000
        ? 'An item with this slug/name already exists. Change the slug or title.'
        : err instanceof Error
          ? err.message
          : 'Create failed'
    return NextResponse.json({ success: false, error: message }, { status: code === 11000 ? 409 : 400 })
  }
}
