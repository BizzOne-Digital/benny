import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Announcement from '@/models/Announcement'
import { requireAdminApi } from '@/lib/require-admin-api'

export const runtime = 'nodejs'

export async function GET() {
  const { error } = await requireAdminApi()
  if (error) return error

  await connectDB()
  const items = await Announcement.find().sort({ order: 1, createdAt: -1 }).lean()
  return NextResponse.json({ success: true, items })
}

export async function POST(request: NextRequest) {
  const { error } = await requireAdminApi()
  if (error) return error

  const body = await request.json().catch(() => null)
  if (!body?.title || !body?.message) {
    return NextResponse.json({ success: false, error: 'Title and message required' }, { status: 400 })
  }

  await connectDB()
  const item = await Announcement.create({
    title: body.title,
    message: body.message,
    dateLabel: body.dateLabel || '',
    isPublished: body.isPublished !== false,
    order: typeof body.order === 'number' ? body.order : 0,
  })

  return NextResponse.json({ success: true, item: item.toObject() })
}
