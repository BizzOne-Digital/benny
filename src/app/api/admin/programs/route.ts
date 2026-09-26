import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Program from '@/models/Program'
import { requireAdminApi } from '@/lib/require-admin-api'

export const runtime = 'nodejs'

export async function GET() {
  const { error } = await requireAdminApi()
  if (error) return error

  await connectDB()
  const items = await Program.find().sort({ order: 1 }).lean()
  return NextResponse.json({ success: true, items })
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdminApi()
  if (error) return error

  const body = await request.json().catch(() => null)
  if (!body?.slug || !body?.title || !body?.description) {
    return NextResponse.json(
      { success: false, error: 'slug, title, and description required' },
      { status: 400 }
    )
  }

  await connectDB()
  const item = await Program.create({
    slug: String(body.slug).toLowerCase().replace(/\s+/g, '-'),
    title: body.title,
    description: body.description,
    image: body.image || '/grain.svg',
    highlights: Array.isArray(body.highlights) ? body.highlights : [],
    isPublished: body.isPublished !== false,
    order: typeof body.order === 'number' ? body.order : 0,
  })

  return NextResponse.json({ success: true, item: item.toObject() })
}
