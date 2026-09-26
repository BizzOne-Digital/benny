import { put, del } from '@vercel/blob'
import sharp from 'sharp'
import type { StorageAdapter, UploadResult } from './types'

export class VercelBlobStorageAdapter implements StorageAdapter {
  async upload(file: File, folder = ''): Promise<UploadResult> {
    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const ext = file.name.split('.').pop()
    const filename = `${timestamp}-${randomString}.${ext}`
    const pathname = folder ? `${folder}/${filename}` : filename

    // Convert File to Buffer for dimension detection
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Get image dimensions if it's an image
    let width: number | undefined
    let height: number | undefined

    if (file.type.startsWith('image/')) {
      try {
        const metadata = await sharp(buffer).metadata()
        width = metadata.width
        height = metadata.height
      } catch (error) {
        console.warn('Failed to get image metadata:', error)
      }
    }

    // Upload to Vercel Blob
    const blob = await put(pathname, file, {
      access: 'public',
    })

    return {
      url: blob.url,
      key: pathname,
      size: buffer.length,
      width,
      height,
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await del(key)
    } catch (error) {
      console.warn('Failed to delete blob:', error)
    }
  }

  getUrl(key: string): string {
    // For Vercel Blob, the key is already the full URL in most cases
    // Or construct from the blob storage URL
    return key
  }
}
