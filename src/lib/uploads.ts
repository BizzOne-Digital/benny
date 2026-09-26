import 'server-only'
import crypto from 'crypto'
import connectDB from '@/lib/mongodb'
import StoredUpload from '@/models/StoredUpload'

import { UPLOAD_FOLDERS, type UploadFolder } from './upload-constants'

export { resolveImageMimeFromFile, isAllowedImageMime } from './image-mime'

export { UPLOAD_FOLDERS, type UploadFolder }

export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
] as const

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024

const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
}

export function isUploadFolder(value: string): value is UploadFolder {
  return (UPLOAD_FOLDERS as readonly string[]).includes(value)
}

export function generateUploadFilename(mimeType: string): string {
  const ext = MIME_TO_EXT[mimeType] || 'bin'
  const randomHex = crypto.randomBytes(8).toString('hex')
  return `${Date.now()}-${randomHex}.${ext}`
}

export function buildUploadPublicUrl(folder: UploadFolder, filename: string): string {
  return `/api/uploads/${folder}/${filename}`
}

export function parseStoredUploadUrl(
  url: string
): { folder: UploadFolder; filename: string } | null {
  if (!url.startsWith('/api/uploads/')) return null
  const parts = url.replace(/^\/api\/uploads\//, '').split('/')
  if (parts.length !== 2) return null
  const [folder, filename] = parts
  if (!folder || !filename) return null
  if (filename.includes('..') || filename.includes('/') || folder.includes('..')) return null
  if (!isUploadFolder(folder)) return null
  return { folder, filename }
}

export function sanitizeUploadFilename(filename: string): boolean {
  if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return false
  }
  return true
}

export async function deleteStoredUploadByUrl(url: string | null | undefined): Promise<boolean> {
  const parsed = url ? parseStoredUploadUrl(url) : null
  if (!parsed) return false

  await connectDB()
  const result = await StoredUpload.deleteOne({
    folder: parsed.folder,
    filename: parsed.filename,
  })
  return result.deletedCount > 0
}
