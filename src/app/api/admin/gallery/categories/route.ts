import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import GalleryCategory from '@/models/GalleryCategory'
import { requireAdminApi } from '@/lib/require-admin-api'

export const runtime = 'nodejs'

export async function GET() {
  const { error } = await requireAdminApi()
  if (error) return error

  await connectDB()
  const items = await GalleryCategory.find().sort({ order: 1 }).lean()
  return NextResponse.json({ success: true, items })
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdminApi()
  if (error) return error

  const body = await request.json().catch(() => null)
  if (!body?.name) {
    return NextResponse.json({ success: false, error: 'Name required' }, { status: 400 })
  }

  const slug =
    body.slug ||
    String(body.name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

  await connectDB()
  const item = await GalleryCategory.create({
    name: body.name,
    slug,
    description: body.description || '',
    order: typeof body.order === 'number' ? body.order : 0,
    isVisible: body.isVisible !== false,
  })

  return NextResponse.json({ success: true, item: item.toObject() })
}
