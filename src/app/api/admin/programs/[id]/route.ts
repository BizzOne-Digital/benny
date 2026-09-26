import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Program from '@/models/Program'
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
  const existing = await Program.findById(id)
  if (!existing) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  }

  if (body?.image !== undefined && body.image !== existing.image && existing.image) {
    await deleteStoredUploadByUrl(existing.image)
  }

  if (body?.slug !== undefined) existing.slug = String(body.slug).toLowerCase().replace(/\s+/g, '-')
  if (body?.title !== undefined) existing.title = body.title
  if (body?.description !== undefined) existing.description = body.description
  if (body?.image !== undefined) existing.image = body.image
  if (body?.highlights !== undefined) existing.highlights = body.highlights
  if (body?.isPublished !== undefined) existing.isPublished = body.isPublished
  if (body?.order !== undefined) existing.order = body.order

  await existing.save()

  return NextResponse.json({ success: true, item: existing.toObject() })
}

export async function DELETE(_request: NextRequest, context: Ctx) {
  const { error } = await requireAdminApi()
  if (error) return error

  const { id } = await context.params
  await connectDB()
  const existing = await Program.findById(id)
  if (!existing) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  }

  await deleteStoredUploadByUrl(existing.image)
  await existing.deleteOne()

  return NextResponse.json({ success: true })
}
