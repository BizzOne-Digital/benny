import ResourceManager from '@/components/admin/ResourceManager'

export default function AdminServicesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-midnight-navy mb-6">Services</h1>
      <ResourceManager resource="services" />
    </div>
  )
}
