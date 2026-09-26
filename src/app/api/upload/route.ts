import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import StoredUpload from '@/models/StoredUpload'
import { requireAdminApi } from '@/lib/require-admin-api'
import { resolveImageMimeFromFile } from '@/lib/image-mime'
import {
  MAX_UPLOAD_BYTES,
  buildUploadPublicUrl,
  deleteStoredUploadByUrl,
  generateUploadFilename,
  isUploadFolder,
} from '@/lib/uploads'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function POST(request: NextRequest) {
  const { error } = await requireAdminApi()
  if (error) return error

  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const folderRaw = formData.get('folder')

    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: 'Missing file' }, { status: 400 })
    }

    const folder = typeof folderRaw === 'string' ? folderRaw : ''
    if (!isUploadFolder(folder)) {
      return NextResponse.json({ success: false, error: 'Invalid folder' }, { status: 400 })
    }

    const mimeType = resolveImageMimeFromFile(file)
    if (!mimeType) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Use JPEG, PNG, WebP, or GIF.' },
        { status: 400 }
      )
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ success: false, error: 'File exceeds 8MB limit' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    if (buffer.length === 0) {
      return NextResponse.json({ success: false, error: 'Empty file' }, { status: 400 })
    }

    await connectDB()

    let filename = generateUploadFilename(mimeType)
    let attempts = 0
    while (attempts < 3) {
      try {
        await StoredUpload.create({
          folder,
          filename,
          mimeType,
          size: buffer.length,
          data: buffer,
        })
        break
      } catch (err: unknown) {
        const code = (err as { code?: number })?.code
        if (code === 11000 && attempts < 2) {
          filename = generateUploadFilename(mimeType)
          attempts++
          continue
        }
        throw err
      }
    }

    const url = buildUploadPublicUrl(folder, filename)

    return NextResponse.json({
      success: true,
      url,
      filename,
      size: buffer.length,
      folder,
    })
  } catch (err) {
    console.error('Upload error:', err)
    const message =
      err instanceof Error && err.message.includes('MONGODB')
        ? 'Database connection failed'
        : 'Upload failed'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const { error } = await requireAdminApi()
  if (error) return error

  try {
    const body = await request.json().catch(() => ({}))
    const url = typeof body.url === 'string' ? body.url : ''

    if (!url) {
      return NextResponse.json({ success: false, error: 'Missing url' }, { status: 400 })
    }

    const deleted = await deleteStoredUploadByUrl(url)
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Upload not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Delete upload error:', err)
    return NextResponse.json({ success: false, error: 'Delete failed' }, { status: 500 })
  }
}
