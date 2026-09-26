import { writeFile, mkdir, unlink } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import sharp from 'sharp'
import type { StorageAdapter, UploadResult } from './types'

export class LocalStorageAdapter implements StorageAdapter {
  private uploadDir = join(process.cwd(), 'public', 'uploads')

  async upload(file: File, folder = ''): Promise<UploadResult> {
    // Create upload directory if it doesn't exist
    const targetDir = folder ? join(this.uploadDir, folder) : this.uploadDir
    if (!existsSync(targetDir)) {
      await mkdir(targetDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const ext = file.name.split('.').pop()
    const filename = `${timestamp}-${randomString}.${ext}`
    const key = folder ? `${folder}/${filename}` : filename
    const filepath = join(this.uploadDir, key)

    // Convert File to Buffer
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

    // Write file
    await writeFile(filepath, buffer)

    return {
      url: `/uploads/${key}`,
      key,
      size: buffer.length,
      width,
      height,
    }
  }

  async delete(key: string): Promise<void> {
    const filepath = join(this.uploadDir, key)
    try {
      await unlink(filepath)
    } catch (error) {
      console.warn('Failed to delete file:', error)
    }
  }

  getUrl(key: string): string {
    return `/uploads/${key}`
  }
}
