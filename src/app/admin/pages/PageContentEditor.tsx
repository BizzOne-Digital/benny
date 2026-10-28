'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import LocalImageField from '@/components/admin/LocalImageField'
import { useToast } from '@/components/ui/Toast'
import { adminFetch } from '@/lib/admin-fetch'
import { CONTENT_PAGES } from '@/lib/page-content-registry'
import { cn } from '@/lib/utils'

const inputCls = 'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-texas-blue focus:outline-none'

export default function PageContentEditor() {
  const { toast } = useToast()
  const [slug, setSlug] = useState(CONTENT_PAGES[0].slug)
  const [overrides, setOverrides] = useState<Record<string, string>>({})
  const [draft, setDraft] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const page = CONTENT_PAGES.find((p) => p.slug === slug)!

  useEffect(() => {
    adminFetch('/api/admin/page-content')
      .then((r) => r.json())
      .then((d) => setOverrides(d.values || {}))
      .catch(() => toast('Failed to load page content', 'error'))
      .finally(() => setLoading(false))
  }, [toast])

  // Rebuild the draft whenever the page or the saved values change.
  useEffect(() => {
    const next: Record<string, string> = {}
    for (const f of page.fields) next[f.key] = overrides[`${page.slug}.${f.key}`] ?? f.default
    setDraft(next)
  }, [page, overrides])

  const save = async () => {
    setSaving(true)
    try {
      const res = await adminFetch('/api/admin/page-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: page.slug, values: draft }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error)
      const fresh = await (await adminFetch('/api/admin/page-content')).json()
      setOverrides(fresh.values || {})
      toast(`${page.name} page saved`, 'success')
    } catch {
      toast('Save failed', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-gray-600">Loading…</p>

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {CONTENT_PAGES.map((p) => (
          <button
            key={p.slug}
            onClick={() => setSlug(p.slug)}
            className={cn(
              'px-4 py-2 rounded-lg font-semibold text-sm',
              slug === p.slug ? 'bg-texas-blue text-white' : 'bg-white border border-gray-300 text-gray-700'
            )}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 max-w-3xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-midnight-navy">{page.name} page</h2>
          <a href={page.path} target="_blank" rel="noreferrer" className="text-texas-blue font-semibold text-sm">
            View page →
          </a>
        </div>
        <p className="text-sm text-gray-500">
          Leave a field as it is to keep the current text. Clear a field to go back to the original.
        </p>
        {page.fields.map((f) =>
          f.type === 'image' ? (
            <LocalImageField
              key={`${page.slug}.${f.key}`}
              label={f.label}
              folder="pages"
              value={draft[f.key] ?? ''}
              onChange={(url) => setDraft((d) => ({ ...d, [f.key]: url }))}
              hint={draft[f.key] === f.default ? 'Currently using the original image.' : undefined}
            />
          ) : (
            <div key={`${page.slug}.${f.key}`}>
              <label className="block font-semibold text-gray-700 mb-1">{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea
                  rows={4}
                  className={inputCls}
                  value={draft[f.key] ?? ''}
                  onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                />
              ) : (
                <input
                  className={inputCls}
                  value={draft[f.key] ?? ''}
                  onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                />
              )}
            </div>
          )
        )}
        <Button onClick={save} isLoading={saving}>
          Save {page.name} page
        </Button>
      </div>
    </div>
  )
}
