'use client'

import { useCallback, useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import LocalImageField from '@/components/admin/LocalImageField'
import { useToast } from '@/components/ui/Toast'
import { adminFetch } from '@/lib/admin-fetch'

type AnnouncementRow = {
  _id: string
  title: string
  message: string
  dateLabel?: string
  isPublished: boolean
  order: number
}

export default function ContentEditor() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [hero, setHero] = useState({
    homeHeroEyebrow: '',
    homeHeroHeadline: '',
    homeHeroSubtext: '',
    logoUrl: '',
  })
  const [announcements, setAnnouncements] = useState<AnnouncementRow[]>([])

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [settingsRes, annRes] = await Promise.all([
        adminFetch('/api/admin/settings'),
        adminFetch('/api/admin/announcements'),
      ])
      const settingsData = await settingsRes.json()
      const annData = await annRes.json()

      if (settingsData.settings) {
        setHero({
          homeHeroEyebrow: settingsData.settings.homeHeroEyebrow || '',
          homeHeroHeadline: settingsData.settings.homeHeroHeadline || '',
          homeHeroSubtext: settingsData.settings.homeHeroSubtext || '',
          logoUrl: settingsData.settings.logoUrl || '',
        })
      }
      if (annData.items) setAnnouncements(annData.items)
    } catch {
      toast('Failed to load content', 'error')
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    load()
  }, [load])

  const saveHero = async () => {
    setSaving(true)
    try {
      const res = await adminFetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hero),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast('Home content saved', 'success')
    } catch {
      toast('Save failed', 'error')
    } finally {
      setSaving(false)
    }
  }

  const addAnnouncement = async () => {
    const res = await adminFetch('/api/admin/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'New announcement',
        message: 'Update this message in the admin panel.',
        dateLabel: '',
        isPublished: true,
        order: announcements.length,
      }),
    })
    const data = await res.json()
    if (data.item) {
      setAnnouncements((prev) => [...prev, data.item])
      toast('Announcement added', 'success')
    }
  }

  const updateAnnouncement = async (row: AnnouncementRow) => {
    const res = await adminFetch(`/api/admin/announcements/${row._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(row),
    })
    if (res.ok) toast('Announcement saved', 'success')
    else toast('Save failed', 'error')
  }

  const deleteAnnouncement = async (id: string) => {
    const res = await adminFetch(`/api/admin/announcements/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setAnnouncements((prev) => prev.filter((a) => a._id !== id))
      toast('Announcement deleted', 'success')
    }
  }

  if (loading) {
    return <p className="text-gray-600">Loading…</p>
  }

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-midnight-navy">Home page hero</h2>
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Welcome line (eyebrow)</label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            value={hero.homeHeroEyebrow}
            onChange={(e) => setHero((h) => ({ ...h, homeHeroEyebrow: e.target.value }))}
            placeholder="WELCOME TO TEAM TEXAS SPECIAL NEEDS"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Headline</label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            value={hero.homeHeroHeadline}
            onChange={(e) => setHero((h) => ({ ...h, homeHeroHeadline: e.target.value }))}
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Subtext</label>
          <textarea
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            value={hero.homeHeroSubtext}
            onChange={(e) => setHero((h) => ({ ...h, homeHeroSubtext: e.target.value }))}
          />
        </div>
        <LocalImageField
          label="Site logo (header & footer)"
          folder="pages"
          value={hero.logoUrl}
          onChange={(url) => setHero((h) => ({ ...h, logoUrl: url }))}
        />
        <Button onClick={saveHero} isLoading={saving}>Save home content</Button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-midnight-navy">Special announcements</h2>
          <Button type="button" onClick={addAnnouncement}>+ Add announcement</Button>
        </div>
        {announcements.length === 0 && (
          <p className="text-gray-600">No announcements yet. Add one to show on the home page.</p>
        )}
        {announcements.map((row) => (
          <div key={row._id} className="border border-gray-200 rounded-xl p-4 space-y-3">
            <input
              className="w-full px-3 py-2 border rounded-lg font-semibold"
              value={row.title}
              onChange={(e) =>
                setAnnouncements((list) =>
                  list.map((a) => (a._id === row._id ? { ...a, title: e.target.value } : a))
                )
              }
            />
            <textarea
              rows={3}
              className="w-full px-3 py-2 border rounded-lg"
              value={row.message}
              onChange={(e) =>
                setAnnouncements((list) =>
                  list.map((a) => (a._id === row._id ? { ...a, message: e.target.value } : a))
                )
              }
            />
            <div className="flex flex-wrap gap-4 items-center">
              <input
                className="px-3 py-2 border rounded-lg text-sm"
                placeholder="Date label (e.g. Spring 2026)"
                value={row.dateLabel || ''}
                onChange={(e) =>
                  setAnnouncements((list) =>
                    list.map((a) => (a._id === row._id ? { ...a, dateLabel: e.target.value } : a))
                  )
                }
              />
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={row.isPublished}
                  onChange={(e) =>
                    setAnnouncements((list) =>
                      list.map((a) =>
                        a._id === row._id ? { ...a, isPublished: e.target.checked } : a
                      )
                    )
                  }
                />
                Published on site
              </label>
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  const current = announcements.find((a) => a._id === row._id)
                  if (current) updateAnnouncement(current)
                }}
              >
                Save
              </Button>
              <button
                type="button"
                className="text-sm text-victory-red font-semibold"
                onClick={() => deleteAnnouncement(row._id)}
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
