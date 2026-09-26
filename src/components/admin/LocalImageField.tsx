'use client'

import { useRef, useState } from 'react'
import { useToast } from '@/components/ui/Toast'
import { adminFetch } from '@/lib/admin-fetch'
import { resolveImageMimeFromFile } from '@/lib/image-mime'
import type { UploadFolder } from '@/lib/upload-constants'
import { cn } from '@/lib/utils'
import AdminImagePreview from './AdminImagePreview'

type LocalImageFieldProps = {
  label: string
  value: string
  onChange: (url: string) => void
  folder: UploadFolder
  alt?: string
  className?: string
  hint?: string
}

async function deleteUploadUrl(url: string) {
  if (!url.startsWith('/api/uploads/')) return
  await adminFetch('/api/upload', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  })
}

export default function LocalImageField({
  label,
  value,
  onChange,
  folder,
  alt = 'Image preview',
  className,
  hint,
}: LocalImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [previewKey, setPreviewKey] = useState(0)
  const { toast } = useToast()

  const handleFile = async (file: File | null) => {
    if (!file) return

    const mime = resolveImageMimeFromFile(file)
    if (!mime) {
      toast('Please choose a JPEG, PNG, WebP, or GIF image', 'error')
      return
    }

    if (file.size > 8 * 1024 * 1024) {
      toast('Image must be 8MB or smaller', 'error')
      return
    }

    setUploading(true)
    try {
      const previousUrl = value

      const formData = new FormData()
      formData.append('file', file, file.name)
      formData.append('folder', folder)

      const res = await adminFetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      let data: { success?: boolean; url?: string; error?: string } = {}
      const text = await res.text()
      try {
        data = text ? JSON.parse(text) : {}
      } catch {
        data = {}
      }

      if (!res.ok || !data.success || !data.url) {
        const message =
          data.error ||
          (res.status === 401
            ? 'Session expired — please log in again'
            : res.status === 413
              ? 'File too large (max 8MB)'
              : `Upload failed (${res.status})`)
        toast(message, 'error')
        return
      }

      onChange(data.url)
      setPreviewKey((k) => k + 1)
      toast('Image uploaded', 'success')

      if (previousUrl && previousUrl !== data.url) {
        await deleteUploadUrl(previousUrl)
      }
    } catch {
      toast('Upload failed — check your connection', 'error')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const handleRemove = async () => {
    const previousUrl = value
    onChange('')
    setPreviewKey((k) => k + 1)
    if (previousUrl) {
      try {
        await deleteUploadUrl(previousUrl)
        toast('Image removed', 'success')
      } catch {
        toast('Could not delete stored image', 'error')
      }
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      <label className="block font-semibold text-gray-700">{label}</label>
      {hint && <p className="text-sm text-gray-500">{hint}</p>}

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
          {value ? (
            <AdminImagePreview src={value} alt={alt} cacheKey={previewKey} />
          ) : (
            <div className="flex items-center justify-center h-full text-xs text-gray-400 p-2 text-center">
              No image
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif"
            className="hidden"
            disabled={uploading}
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />
          <div className="flex gap-2 flex-wrap">
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-texas-blue text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading ? 'Uploading…' : value ? 'Replace' : 'Upload image'}
            </button>
            {value && (
              <button
                type="button"
                disabled={uploading}
                onClick={handleRemove}
                className="px-4 py-2 text-sm font-semibold rounded-lg border border-victory-red text-victory-red hover:bg-red-50 disabled:opacity-50"
              >
                Remove
              </button>
            )}
          </div>
          {value && (
            <p className="text-xs text-gray-500 break-all max-w-md">{value}</p>
          )}
        </div>
      </div>
    </div>
  )
}
