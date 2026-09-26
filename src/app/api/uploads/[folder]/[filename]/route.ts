import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import StoredUpload from '@/models/StoredUpload'
import { bufferFromStored } from '@/lib/buffer-from-stored'
import { isUploadFolder, sanitizeUploadFilename } from '@/lib/uploads'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

type RouteContext = { params: Promise<{ folder: string; filename: string }> }

export async function GET(request: NextRequest, context: RouteContext) {
  const { folder, filename } = await context.params

  if (!isUploadFolder(folder) || !sanitizeUploadFilename(filename)) {
    return new NextResponse('Not found', { status: 404 })
  }

  try {
    await connectDB()
    const doc = await StoredUpload.findOne({ folder, filename }).select('data mimeType size')

    if (!doc) {
      return new NextResponse('Not found', { status: 404 })
    }

    const body = bufferFromStored(doc.data)
    if (!body || body.length === 0) {
      console.error('Stored upload has no binary data:', folder, filename)
      return new NextResponse('Not found', { status: 404 })
    }

    const mimeType = doc.mimeType || 'application/octet-stream'

    return new NextResponse(new Uint8Array(body), {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Length': String(body.length),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Disposition': 'inline',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (err) {
    console.error('Serve upload error:', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
