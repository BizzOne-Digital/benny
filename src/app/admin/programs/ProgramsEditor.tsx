'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import LocalImageField from '@/components/admin/LocalImageField'
import { useToast } from '@/components/ui/Toast'
import { adminFetch } from '@/lib/admin-fetch'

type ProgramRow = {
  _id: string
  slug: string
  title: string
  description: string
  image: string
  highlights: string[]
  isPublished: boolean
  order: number
}

const emptyProgram = (): Omit<ProgramRow, '_id'> => ({
  slug: '',
  title: '',
  description: '',
  image: '',
  highlights: [],
  isPublished: true,
  order: 0,
})

export default function ProgramsEditor() {
  const { toast } = useToast()
  const [items, setItems] = useState<ProgramRow[]>([])
  const [loading, setLoading] = useState(true)
  const [draft, setDraft] = useState<Omit<ProgramRow, '_id'> | null>(null)

  const load = async () => {
    setLoading(true)
    const res = await adminFetch('/api/admin/programs')
    const data = await res.json()
    if (data.items) setItems(data.items)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const saveRow = async (row: ProgramRow) => {
    const res = await adminFetch(`/api/admin/programs/${row._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...row,
        highlights: row.highlights.filter(Boolean),
      }),
    })
    if (res.ok) toast('Program saved', 'success')
    else toast('Save failed', 'error')
  }

  const createRow = async () => {
    if (!draft?.slug || !draft.title) {
      toast('Slug and title required', 'error')
      return
    }
    const res = await adminFetch('/api/admin/programs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...draft,
        highlights: draft.highlights.filter(Boolean),
      }),
    })
    const data = await res.json()
    if (data.item) {
      setItems((prev) => [...prev, data.item])
      setDraft(null)
      toast('Program created', 'success')
    } else toast('Create failed', 'error')
  }

  const deleteRow = async (id: string) => {
    const res = await adminFetch(`/api/admin/programs/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setItems((prev) => prev.filter((p) => p._id !== id))
      toast('Program deleted', 'success')
    }
  }

  if (loading) return <p className="text-gray-600">Loading…</p>

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <Button type="button" onClick={() => setDraft(emptyProgram())}>+ Add program</Button>
      </div>

      {draft && (
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4 border-2 border-texas-blue">
          <h3 className="font-bold text-lg">New program</h3>
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="slug (e.g. bowling)"
            value={draft.slug}
            onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
          />
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Title"
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          />
          <textarea
            className="w-full border rounded-lg px-3 py-2"
            rows={3}
            placeholder="Description"
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
          />
          <LocalImageField
            label="Program image"
            folder="gallery"
            value={draft.image}
            onChange={(url) => setDraft({ ...draft, image: url })}
          />
          <textarea
            className="w-full border rounded-lg px-3 py-2 text-sm"
            rows={3}
            placeholder="Highlights (one per line)"
            value={draft.highlights.join('\n')}
            onChange={(e) =>
              setDraft({ ...draft, highlights: e.target.value.split('\n').map((s) => s.trim()) })
            }
          />
          <div className="flex gap-2">
            <Button type="button" onClick={createRow}>Create</Button>
            <Button type="button" variant="secondary" onClick={() => setDraft(null)}>Cancel</Button>
          </div>
        </div>
      )}

      {items.map((row) => (
        <div key={row._id} className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="border rounded-lg px-3 py-2"
              value={row.slug}
              onChange={(e) =>
                setItems((list) =>
                  list.map((p) => (p._id === row._id ? { ...p, slug: e.target.value } : p))
                )
              }
            />
            <input
              className="border rounded-lg px-3 py-2 font-semibold"
              value={row.title}
              onChange={(e) =>
                setItems((list) =>
                  list.map((p) => (p._id === row._id ? { ...p, title: e.target.value } : p))
                )
              }
            />
          </div>
          <textarea
            className="w-full border rounded-lg px-3 py-2"
            rows={3}
            value={row.description}
            onChange={(e) =>
              setItems((list) =>
                list.map((p) => (p._id === row._id ? { ...p, description: e.target.value } : p))
              )
            }
          />
          <LocalImageField
            label="Program image"
            folder="gallery"
            value={row.image}
            onChange={(url) =>
              setItems((list) => list.map((p) => (p._id === row._id ? { ...p, image: url } : p)))
            }
          />
          <textarea
            className="w-full border rounded-lg px-3 py-2 text-sm"
            rows={3}
            value={(row.highlights || []).join('\n')}
            onChange={(e) =>
              setItems((list) =>
                list.map((p) =>
                  p._id === row._id
                    ? { ...p, highlights: e.target.value.split('\n').map((s) => s.trim()) }
                    : p
                )
              )
            }
          />
          <div className="flex flex-wrap gap-4 items-center">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={row.isPublished}
                onChange={(e) =>
                  setItems((list) =>
                    list.map((p) =>
                      p._id === row._id ? { ...p, isPublished: e.target.checked } : p
                    )
                  )
                }
              />
              Published
            </label>
            <input
              type="number"
              className="w-24 border rounded-lg px-2 py-1 text-sm"
              value={row.order}
              onChange={(e) =>
                setItems((list) =>
                  list.map((p) =>
                    p._id === row._id ? { ...p, order: Number(e.target.value) } : p
                  )
                )
              }
            />
            <Button type="button" size="sm" onClick={() => saveRow(row)}>Save</Button>
            <button
              type="button"
              className="text-sm text-victory-red font-semibold"
              onClick={() => deleteRow(row._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
