'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import LocalImageField from '@/components/admin/LocalImageField'
import AdminImagePreview from '@/components/admin/AdminImagePreview'
import { useToast } from '@/components/ui/Toast'
import { adminFetch } from '@/lib/admin-fetch'

type Category = { _id: string; name: string; slug: string }
type GalleryRow = {
  _id: string
  title: string
  caption?: string
  imageUrl: string
  imageAlt: string
  categoryId: string
  order: number
  isVisible: boolean
  isFeatured: boolean
}

export default function GalleryManager() {
  const { toast } = useToast()
  const [categories, setCategories] = useState<Category[]>([])
  const [images, setImages] = useState<GalleryRow[]>([])
  const [loading, setLoading] = useState(true)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newImage, setNewImage] = useState({
    title: '',
    imageUrl: '',
    imageAlt: '',
    categoryId: '',
  })

  const load = async () => {
    setLoading(true)
    const [catRes, imgRes] = await Promise.all([
      adminFetch('/api/admin/gallery/categories'),
      adminFetch('/api/admin/gallery/images'),
    ])
    const catData = await catRes.json()
    const imgData = await imgRes.json()
    if (catData.items) setCategories(catData.items)
    if (imgData.items) setImages(imgData.items)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const addCategory = async () => {
    if (!newCategoryName.trim()) return
    const res = await adminFetch('/api/admin/gallery/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newCategoryName.trim() }),
    })
    const data = await res.json()
    if (data.item) {
      setCategories((c) => [...c, data.item])
      setNewCategoryName('')
      toast('Category created', 'success')
    }
  }

  const addImage = async () => {
    if (!newImage.title || !newImage.imageUrl || !newImage.categoryId) {
      toast('Title, image, and category required', 'error')
      return
    }
    const res = await adminFetch('/api/admin/gallery/images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newImage,
        imageAlt: newImage.imageAlt || newImage.title,
        order: images.length,
        isVisible: true,
      }),
    })
    const data = await res.json()
    if (data.item) {
      setImages((i) => [...i, data.item])
      setNewImage({ title: '', imageUrl: '', imageAlt: '', categoryId: newImage.categoryId })
      toast('Gallery image added', 'success')
    }
  }

  const saveImage = async (row: GalleryRow) => {
    const res = await adminFetch(`/api/admin/gallery/images/${row._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(row),
    })
    if (res.ok) toast('Image saved', 'success')
  }

  const deleteImage = async (id: string) => {
    const res = await adminFetch(`/api/admin/gallery/images/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setImages((list) => list.filter((i) => i._id !== id))
      toast('Image deleted', 'success')
    }
  }

  if (loading) return <p className="text-gray-600">Loading…</p>

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-midnight-navy">Categories</h2>
        <div className="flex gap-2 flex-wrap">
          <input
            className="border rounded-lg px-3 py-2 flex-1 min-w-[200px]"
            placeholder="Category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <Button type="button" onClick={addCategory}>Add category</Button>
        </div>
        <ul className="text-sm text-gray-600 flex flex-wrap gap-2">
          {categories.map((c) => (
            <li key={c._id} className="bg-gray-100 px-3 py-1 rounded-full">{c.name}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-midnight-navy">Add gallery photo</h2>
        {categories.length === 0 && (
          <p className="text-amber-700 text-sm">Create a category first.</p>
        )}
        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Title"
          value={newImage.title}
          onChange={(e) => setNewImage((n) => ({ ...n, title: e.target.value }))}
        />
        <select
          className="w-full border rounded-lg px-3 py-2"
          value={newImage.categoryId}
          onChange={(e) => setNewImage((n) => ({ ...n, categoryId: e.target.value }))}
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        <LocalImageField
          label="Photo"
          folder="gallery"
          value={newImage.imageUrl}
          onChange={(url) => setNewImage((n) => ({ ...n, imageUrl: url }))}
        />
        <Button type="button" onClick={addImage}>Add to gallery</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((row) => (
            <div key={row._id} className="bg-white rounded-xl shadow-lg p-4 space-y-3">
              <div className="relative h-48 rounded-lg overflow-hidden bg-gray-100">
                <AdminImagePreview src={row.imageUrl} alt={row.imageAlt} />
              </div>
              <input
                className="w-full border rounded-lg px-2 py-1 text-sm"
                value={row.title}
                onChange={(e) =>
                  setImages((list) =>
                    list.map((i) => (i._id === row._id ? { ...i, title: e.target.value } : i))
                  )
                }
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={row.isVisible}
                  onChange={(e) =>
                    setImages((list) =>
                      list.map((i) =>
                        i._id === row._id ? { ...i, isVisible: e.target.checked } : i
                      )
                    )
                  }
                />
                Visible on site
              </label>
              <div className="flex gap-2">
                <Button type="button" size="sm" onClick={() => saveImage(row)}>Save</Button>
                <button
                  type="button"
                  className="text-sm text-victory-red font-semibold"
                  onClick={() => deleteImage(row._id)}
                >
                  Delete
                </button>
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}
