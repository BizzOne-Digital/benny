import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import StoredUpload from '@/models/StoredUpload'
import { requireAdminApi } from '@/lib/require-admin-api'
import { buildUploadPublicUrl, type UploadFolder } from '@/lib/uploads'

export const runtime = 'nodejs'

export async function GET() {
  const { error } = await requireAdminApi()
  if (error) return error

  await connectDB()
  const docs = await StoredUpload.find()
    .select('folder filename mimeType size createdAt')
    .sort({ createdAt: -1 })
    .limit(200)
    .lean()

  const items = docs.map((doc) => ({
    folder: doc.folder as UploadFolder,
    filename: doc.filename,
    mimeType: doc.mimeType,
    size: doc.size,
    createdAt: doc.createdAt,
    url: buildUploadPublicUrl(doc.folder as UploadFolder, doc.filename),
  }))

  return NextResponse.json({ success: true, items })
}
