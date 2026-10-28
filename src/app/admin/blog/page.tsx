import ResourceManager from '@/components/admin/ResourceManager'

export default function AdminBlogPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-midnight-navy mb-6">Blog</h1>
      <ResourceManager resource="blog" />
    </div>
  )
}
