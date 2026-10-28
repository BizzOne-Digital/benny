'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { adminFetch } from '@/lib/admin-fetch'
import { RESOURCES, type FieldConfig } from '@/lib/admin-resources'
import LocalImageField from './LocalImageField'
import AdminImagePreview from './AdminImagePreview'

type Item = Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any

const inputCls = 'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-texas-blue focus:outline-none'

function emptyItem(fields: FieldConfig[]): Item {
  const item: Item = {}
  for (const f of fields) {
    if (f.default !== undefined) item[f.name] = f.default
    else if (f.type === 'boolean') item[f.name] = false
    else if (f.type === 'lines' || f.type === 'imageList' || f.type === 'faqs' || f.type === 'sections') item[f.name] = []
    else item[f.name] = ''
  }
  return item
}

function thumbOf(item: Item, imageField?: string): string {
  if (!imageField) return ''
  const v = item[imageField]
  if (Array.isArray(v)) return v[0]?.url || ''
  return typeof v === 'string' ? v : ''
}

function Field({
  field,
  value,
  onChange,
}: {
  field: FieldConfig
  value: any // eslint-disable-line @typescript-eslint/no-explicit-any
  onChange: (v: unknown) => void
}) {
  const label = (
    <label className="block font-semibold text-gray-700 mb-1">
      {field.label}
      {field.required && <span className="text-victory-red"> *</span>}
    </label>
  )
  const hint = field.hint && <p className="text-xs text-gray-500 mb-1">{field.hint}</p>

  switch (field.type) {
    case 'textarea':
      return (
        <div>
          {label}
          {hint}
          <textarea rows={5} className={inputCls} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
        </div>
      )
    case 'number':
      return (
        <div>
          {label}
          <input type="number" step="any" className={inputCls} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
        </div>
      )
    case 'date':
      return (
        <div>
          {label}
          <input
            type="date"
            className={inputCls}
            value={value ? String(value).slice(0, 10) : ''}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      )
    case 'boolean':
      return (
        <label className="flex items-center gap-2 font-semibold text-gray-700">
          <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
          {field.label}
        </label>
      )
    case 'select':
      return (
        <div>
          {label}
          <select className={inputCls} value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
            <option value="">Select…</option>
            {(field.options || []).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      )
    case 'image':
      return (
        <LocalImageField
          label={field.label + (field.required ? ' *' : '')}
          folder={field.folder || 'misc'}
          value={value || ''}
          onChange={onChange}
          hint={field.hint}
        />
      )
    case 'lines':
      return (
        <div>
          {label}
          <textarea
            rows={5}
            className={inputCls}
            value={Array.isArray(value) ? value.join('\n') : value ?? ''}
            onChange={(e) => onChange(e.target.value.split('\n'))}
          />
        </div>
      )
    case 'imageList': {
      const list: Array<{ url: string; alt: string }> = Array.isArray(value) ? value : []
      return (
        <div className="space-y-3">
          {label}
          {list.map((img, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
              <LocalImageField
                label={`Image ${i + 1}`}
                folder={field.folder || 'products'}
                value={img.url}
                onChange={(url) => onChange(list.map((x, j) => (j === i ? { ...x, url } : x)))}
              />
              <input
                className={inputCls}
                placeholder="Image description (alt text)"
                value={img.alt}
                onChange={(e) => onChange(list.map((x, j) => (j === i ? { ...x, alt: e.target.value } : x)))}
              />
              <button type="button" className="text-sm text-victory-red font-semibold" onClick={() => onChange(list.filter((_, j) => j !== i))}>
                Remove image slot
              </button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => onChange([...list, { url: '', alt: '' }])}>
            + Add image
          </Button>
        </div>
      )
    }
    case 'faqs': {
      const list: Array<{ question: string; answer: string }> = Array.isArray(value) ? value : []
      return (
        <div className="space-y-3">
          {label}
          {list.map((q, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
              <input
                className={inputCls}
                placeholder="Question"
                value={q.question}
                onChange={(e) => onChange(list.map((x, j) => (j === i ? { ...x, question: e.target.value } : x)))}
              />
              <textarea
                rows={3}
                className={inputCls}
                placeholder="Answer"
                value={q.answer}
                onChange={(e) => onChange(list.map((x, j) => (j === i ? { ...x, answer: e.target.value } : x)))}
              />
              <button type="button" className="text-sm text-victory-red font-semibold" onClick={() => onChange(list.filter((_, j) => j !== i))}>
                Remove
              </button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={() => onChange([...list, { question: '', answer: '' }])}>
            + Add FAQ
          </Button>
        </div>
      )
    }
    case 'sections': {
      type Sec = { heading: string; body: string; imageUrl: string; imageAlt: string; enabled: boolean }
      const list: Sec[] = Array.isArray(value) ? value : []
      const patch = (i: number, p: Partial<Sec>) => onChange(list.map((x, j) => (j === i ? { ...x, ...p } : x)))
      const move = (i: number, d: number) => {
        const next = [...list]
        const k = i + d
        if (k < 0 || k >= next.length) return
        ;[next[i], next[k]] = [next[k], next[i]]
        onChange(next)
      }
      return (
        <div className="space-y-3">
          {label}
          {list.map((s, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2 bg-gray-50">
              <input className={inputCls} placeholder="Section heading" value={s.heading || ''} onChange={(e) => patch(i, { heading: e.target.value })} />
              <textarea rows={4} className={inputCls} placeholder="Section text" value={s.body || ''} onChange={(e) => patch(i, { body: e.target.value })} />
              <LocalImageField label="Section image (optional)" folder="pages" value={s.imageUrl || ''} onChange={(url) => patch(i, { imageUrl: url })} />
              <input className={inputCls} placeholder="Image description (alt text)" value={s.imageAlt || ''} onChange={(e) => patch(i, { imageAlt: e.target.value })} />
              <div className="flex gap-4 items-center text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={s.enabled !== false} onChange={(e) => patch(i, { enabled: e.target.checked })} /> Show
                </label>
                <button type="button" onClick={() => move(i, -1)}>Up</button>
                <button type="button" onClick={() => move(i, 1)}>Down</button>
                <button type="button" className="text-victory-red font-semibold" onClick={() => onChange(list.filter((_, j) => j !== i))}>
                  Remove section
                </button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onChange([...list, { heading: '', body: '', imageUrl: '', imageAlt: '', enabled: true }])}
          >
            + Add section
          </Button>
        </div>
      )
    }
    default:
      return (
        <div>
          {label}
          {hint}
          <input className={inputCls} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
        </div>
      )
  }
}

export default function ResourceManager({ resource }: { resource: string }) {
  const baseConfig = RESOURCES[resource]
  const { toast } = useToast()
  const [items, setItems] = useState<Item[]>([])
  const [categories, setCategories] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Item | null>(null)
  const [saving, setSaving] = useState(false)

  // FAQ category options come from the DB.
  const fields = useMemo(
    () =>
      baseConfig.fields.map((f) =>
        resource === 'faqs' && f.name === 'categoryId'
          ? { ...f, options: categories.map((c) => ({ value: c._id, label: c.name })) }
          : f
      ),
    [baseConfig, categories, resource]
  )

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await adminFetch(`/api/admin/resources/${resource}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setItems(data.items)
      if (resource === 'faqs') {
        const c = await (await adminFetch('/api/admin/resources/faq-categories')).json()
        setCategories(c.items || [])
      }
    } catch {
      toast('Failed to load data', 'error')
    } finally {
      setLoading(false)
    }
  }, [resource, toast])

  useEffect(() => {
    load()
  }, [load])

  const save = async () => {
    if (!editing) return
    setSaving(true)
    try {
      const isNew = !editing._id
      const res = await adminFetch(
        isNew ? `/api/admin/resources/${resource}` : `/api/admin/resources/${resource}/${editing._id}`,
        {
          method: isNew ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editing),
        }
      )
      const data = await res.json()
      if (!res.ok || !data.success) {
        toast(data.error || 'Save failed', 'error')
        return
      }
      toast(`${baseConfig.singular} saved`, 'success')
      setEditing(null)
      await load()
    } catch {
      toast('Save failed — check your connection', 'error')
    } finally {
      setSaving(false)
    }
  }

  const remove = async (item: Item) => {
    if (!window.confirm(`Delete "${item[baseConfig.titleField]}"? This cannot be undone.`)) return
    const res = await adminFetch(`/api/admin/resources/${resource}/${item._id}`, { method: 'DELETE' })
    if (res.ok) {
      toast('Deleted', 'success')
      await load()
    } else {
      toast('Delete failed', 'error')
    }
  }

  if (editing) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-5 max-w-3xl">
        <h2 className="text-2xl font-bold text-midnight-navy">
          {editing._id ? `Edit ${baseConfig.singular.toLowerCase()}` : `New ${baseConfig.singular.toLowerCase()}`}
        </h2>
        {resource === 'faqs' && categories.length === 0 && (
          <p className="text-sm text-victory-red">Create a FAQ category first (FAQs → Categories).</p>
        )}
        {fields.map((f) => (
          <Field key={f.name} field={f} value={editing[f.name]} onChange={(v) => setEditing((e) => ({ ...e!, [f.name]: v }))} />
        ))}
        <div className="flex gap-3 pt-2">
          <Button onClick={save} isLoading={saving}>
            Save
          </Button>
          <Button variant="outline" onClick={() => setEditing(null)} disabled={saving}>
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <p className="text-gray-600">{baseConfig.description}</p>
        <Button onClick={() => setEditing(emptyItem(fields))}>+ Add {baseConfig.singular.toLowerCase()}</Button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading…</p>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center text-gray-600">
          No {baseConfig.plural.toLowerCase()} yet.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg divide-y divide-gray-200">
          {items.map((item) => {
            const thumb = thumbOf(item, baseConfig.imageField)
            const published = baseConfig.publishField
              ? !!item[baseConfig.publishField]
              : item.status === 'published'
            return (
              <div key={item._id} className="flex items-center gap-4 p-4">
                {baseConfig.imageField && (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    {thumb && <AdminImagePreview src={thumb} alt="" cacheKey={0} />}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-midnight-navy truncate">{item[baseConfig.titleField]}</div>
                  {baseConfig.subtitleField && (
                    <div className="text-sm text-gray-600 line-clamp-1">{item[baseConfig.subtitleField]}</div>
                  )}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    published ? 'bg-success/10 text-success' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {published ? 'Live' : 'Hidden'}
                </span>
                <button className="text-texas-blue font-semibold text-sm" onClick={() => setEditing(item)}>
                  Edit
                </button>
                <button className="text-victory-red font-semibold text-sm" onClick={() => remove(item)}>
                  Delete
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
