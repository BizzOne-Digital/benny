import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import GalleryImage from '@/models/GalleryImage'
import { requireAdminApi } from '@/lib/require-admin-api'
import { deleteStoredUploadByUrl } from '@/lib/uploads'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ id: string }> }

export async function PUT(request: NextRequest, context: Ctx) {
  const { error } = await requireAdminApi()
  if (error) return error

  const { id } = await context.params
  const body = await request.json().catch(() => null)

  await connectDB()
  const existing = await GalleryImage.findById(id)
  if (!existing) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  }

  if (body?.imageUrl !== undefined && body.imageUrl !== existing.imageUrl && existing.imageUrl) {
    await deleteStoredUploadByUrl(existing.imageUrl)
  }

  if (body?.title !== undefined) existing.title = body.title
  if (body?.caption !== undefined) existing.caption = body.caption
  if (body?.imageUrl !== undefined) existing.imageUrl = body.imageUrl
  if (body?.imageAlt !== undefined) existing.imageAlt = body.imageAlt
  if (body?.categoryId !== undefined) existing.categoryId = body.categoryId
  if (body?.order !== undefined) existing.order = body.order
  if (body?.isFeatured !== undefined) existing.isFeatured = body.isFeatured
  if (body?.isVisible !== undefined) existing.isVisible = body.isVisible

  await existing.save()

  return NextResponse.json({ success: true, item: existing.toObject() })
}

export async function DELETE(_request: NextRequest, context: Ctx) {
  const { error } = await requireAdminApi()
  if (error) return error

  const { id } = await context.params
  await connectDB()
  const existing = await GalleryImage.findById(id)
  if (!existing) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  }

  await deleteStoredUploadByUrl(existing.imageUrl)
  await existing.deleteOne()

  return NextResponse.json({ success: true })
}
