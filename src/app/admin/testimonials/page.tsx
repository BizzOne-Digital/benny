import ResourceManager from '@/components/admin/ResourceManager'

export default function AdminTestimonialsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-midnight-navy mb-6">Testimonials</h1>
      <ResourceManager resource="testimonials" />
    </div>
  )
}
