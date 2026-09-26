import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Announcement from '@/models/Announcement'
import { requireAdminApi } from '@/lib/require-admin-api'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ id: string }> }

export async function PUT(request: NextRequest, context: Ctx) {
  const { error } = await requireAdminApi()
  if (error) return error

  const { id } = await context.params
  const body = await request.json().catch(() => null)

  await connectDB()
  const item = await Announcement.findByIdAndUpdate(
    id,
    {
      ...(body?.title !== undefined && { title: body.title }),
      ...(body?.message !== undefined && { message: body.message }),
      ...(body?.dateLabel !== undefined && { dateLabel: body.dateLabel }),
      ...(body?.isPublished !== undefined && { isPublished: body.isPublished }),
      ...(body?.order !== undefined && { order: body.order }),
    },
    { new: true }
  )

  if (!item) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true, item: item.toObject() })
}

export async function DELETE(_request: NextRequest, context: Ctx) {
  const { error } = await requireAdminApi()
  if (error) return error

  const { id } = await context.params
  await connectDB()
  const result = await Announcement.findByIdAndDelete(id)

  if (!result) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
