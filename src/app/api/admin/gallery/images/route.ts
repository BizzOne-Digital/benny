import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import GalleryImage from '@/models/GalleryImage'
import GalleryCategory from '@/models/GalleryCategory'
import { requireAdminApi } from '@/lib/require-admin-api'

export const runtime = 'nodejs'

export async function GET() {
  const { error } = await requireAdminApi()
  if (error) return error

  await connectDB()
  const items = await GalleryImage.find().sort({ order: 1, createdAt: -1 }).lean()
  return NextResponse.json({ success: true, items })
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdminApi()
  if (error) return error

  const body = await request.json().catch(() => null)
  if (!body?.title || !body?.imageUrl || !body?.categoryId) {
    return NextResponse.json(
      { success: false, error: 'title, imageUrl, and categoryId required' },
      { status: 400 }
    )
  }

  await connectDB()
  const category = await GalleryCategory.findById(body.categoryId)
  if (!category) {
    return NextResponse.json({ success: false, error: 'Invalid category' }, { status: 400 })
  }

  const item = await GalleryImage.create({
    title: body.title,
    caption: body.caption || '',
    imageUrl: body.imageUrl,
    imageAlt: body.imageAlt || body.title,
    categoryId: body.categoryId,
    order: typeof body.order === 'number' ? body.order : 0,
    isFeatured: !!body.isFeatured,
    isVisible: body.isVisible !== false,
  })

  return NextResponse.json({ success: true, item: item.toObject() })
}
