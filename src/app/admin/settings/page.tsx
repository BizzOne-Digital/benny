'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import LocalImageField from '@/components/admin/LocalImageField'
import { useToast } from '@/components/ui/Toast'
import { adminFetch } from '@/lib/admin-fetch'

export default function AdminSettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    organizationName: '',
    email: '',
    phone: '',
    contactRole: '',
    address: '',
    officeHours: '',
    socialLinks: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      youtube: '',
    },
    logoUrl: '',
    defaultCTAText: 'Get Involved',
    defaultCTAUrl: '/contact',
    footerText: '',
    pricingVisibility: false,
    seoTitle: '',
    seoDescription: '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminFetch('/api/admin/settings')
      .then((r) => r.json())
      .then((data) => {
        if (data.settings) {
          setSettings({
            organizationName: data.settings.organizationName || '',
            email: data.settings.email || '',
            phone: data.settings.phone || '',
            contactRole: data.settings.contactRole || '',
            address: data.settings.address || '',
            officeHours: data.settings.officeHours || '',
            socialLinks: {
              facebook: data.settings.socialLinks?.facebook || '',
              instagram: data.settings.socialLinks?.instagram || '',
              twitter: data.settings.socialLinks?.twitter || '',
              linkedin: data.settings.socialLinks?.linkedin || '',
              youtube: data.settings.socialLinks?.youtube || '',
            },
            logoUrl: data.settings.logoUrl || '',
            defaultCTAText: data.settings.defaultCTAText || 'Get Involved',
            defaultCTAUrl: data.settings.defaultCTAUrl || '/contact',
            footerText: data.settings.footerText || '',
            pricingVisibility: !!data.settings.pricingVisibility,
            seoTitle: data.settings.seoTitle || '',
            seoDescription: data.settings.seoDescription || '',
          })
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      const res = await adminFetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      toast('Settings saved', 'success')
    } catch {
      toast('Save failed', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    if (name.startsWith('socialLinks.')) {
      const key = name.split('.')[1]
      setSettings((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [key]: value },
      }))
    } else {
      setSettings((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }))
    }
  }

  if (loading) return <p className="text-gray-600">Loading settings…</p>

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-midnight-navy mb-2">Site Settings</h1>
        <p className="text-gray-600">Manage global site configuration</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <h2 className="text-2xl font-bold text-midnight-navy mb-2">Branding</h2>
          <LocalImageField
            label="Logo"
            folder="pages"
            value={settings.logoUrl}
            onChange={(url) => setSettings((s) => ({ ...s, logoUrl: url }))}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-midnight-navy mb-6">Organization Information</h2>
          <div className="space-y-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Organization Name</label>
              <input
                type="text"
                name="organizationName"
                value={settings.organizationName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Contact Role</label>
              <input
                type="text"
                name="contactRole"
                value={settings.contactRole}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Address</label>
              <textarea
                name="address"
                value={settings.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Office Hours</label>
              <input
                type="text"
                name="officeHours"
                value={settings.officeHours}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-midnight-navy mb-6">Social Media</h2>
          {(['facebook', 'instagram', 'twitter'] as const).map((key) => (
            <div key={key} className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2 capitalize">{key}</label>
              <input
                type="url"
                name={`socialLinks.${key}`}
                value={settings.socialLinks[key]}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <h2 className="text-2xl font-bold text-midnight-navy">SEO</h2>
          <input
            name="seoTitle"
            value={settings.seoTitle}
            onChange={handleChange}
            placeholder="SEO title"
            className="w-full px-4 py-3 border rounded-lg"
          />
          <textarea
            name="seoDescription"
            value={settings.seoDescription}
            onChange={handleChange}
            rows={2}
            placeholder="SEO description"
            className="w-full px-4 py-3 border rounded-lg"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" size="lg" isLoading={isSaving}>Save Settings</Button>
        </div>
      </form>
    </div>
  )
}
