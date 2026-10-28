import ResourceManager from '@/components/admin/ResourceManager'

export default function AdminProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-midnight-navy mb-6">Products</h1>
      <ResourceManager resource="products" />
    </div>
  )
}
