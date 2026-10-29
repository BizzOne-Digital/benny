import ResourceManager from '@/components/admin/ResourceManager'

export default function AdminSponsorsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-midnight-navy mb-6">Sponsors</h1>
      <ResourceManager resource="sponsors" />
    </div>
  )
}
