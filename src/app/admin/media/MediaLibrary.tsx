'use client'

import { useEffect, useState } from 'react'
import LocalImageField from '@/components/admin/LocalImageField'
import AdminImagePreview from '@/components/admin/AdminImagePreview'
import { useToast } from '@/components/ui/Toast'
import { adminFetch } from '@/lib/admin-fetch'
import type { UploadFolder } from '@/lib/upload-constants'

type StoredItem = {
  url: string
  folder: UploadFolder
  filename: string
  mimeType: string
  size: number
  createdAt: string
}

export default function MediaLibrary() {
  const { toast } = useToast()
  const [items, setItems] = useState<StoredItem[]>([])
  const [folder, setFolder] = useState<UploadFolder>('misc')
  const [uploadUrl, setUploadUrl] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const res = await adminFetch('/api/admin/stored-uploads')
    const data = await res.json()
    if (data.items) setItems(data.items)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const onUploaded = (url: string) => {
    setUploadUrl(url)
    toast('Upload complete — copy URL into content fields', 'success')
    load()
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-midnight-navy">Upload new file</h2>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Folder</label>
          <select
            className="border rounded-lg px-3 py-2"
            value={folder}
            onChange={(e) => setFolder(e.target.value as UploadFolder)}
          >
            <option value="gallery">gallery</option>
            <option value="pages">pages</option>
            <option value="products">products</option>
            <option value="misc">misc</option>
          </select>
        </div>
        <LocalImageField
          label="Image"
          folder={folder}
          value={uploadUrl}
          onChange={onUploaded}
          hint="Uploaded images persist across Vercel deploys (MongoDB storage)."
        />
      </div>

      {loading ? (
        <p className="text-gray-600">Loading library…</p>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-midnight-navy mb-4">Recent uploads</h2>
          {items.length === 0 ? (
            <p className="text-gray-600">No uploads yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {items.map((item) => (
                  <div key={item.url} className="text-xs">
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-1">
                      {item.mimeType.startsWith('image/') ? (
                        <AdminImagePreview src={item.url} alt={item.filename} />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">File</div>
                      )}
                    </div>
                    <p className="truncate font-medium">{item.filename}</p>
                    <p className="text-gray-500">{item.folder} · {formatSize(item.size)}</p>
                    <button
                      type="button"
                      className="text-texas-blue hover:underline mt-1"
                      onClick={() => {
                        navigator.clipboard.writeText(item.url)
                        toast('URL copied', 'success')
                      }}
                    >
                      Copy URL
                    </button>
                  </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
