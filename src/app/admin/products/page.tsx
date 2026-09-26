import Image from 'next/image'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Product, { type IProduct } from '@/models/Product'

export default async function AdminProductsPage() {
  const session = await auth()
  if (!session) return null

  await connectDB()
  const products = await Product.find().sort({ order: 1 }).lean<IProduct[]>()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-midnight-navy mb-2">Products</h1>
          <p className="text-gray-600">Manage shop products and merchandise</p>
        </div>
        <button className="px-6 py-3 bg-texas-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          + Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <p className="text-xl text-gray-600 mb-6">No products yet</p>
          <button className="px-6 py-3 bg-texas-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Add First Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id.toString()} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={product.images[0]?.url || ''}
                  alt={product.images[0]?.alt || product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-midnight-navy">{product.name}</h3>
                  {product.isFeatured && (
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-warm-gold/10 text-warm-gold">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-3">{product.shortDescription}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-texas-blue">
                    ${product.price.toFixed(2)}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.availability === 'in-stock'
                        ? 'bg-success/10 text-success'
                        : product.availability === 'coming-soon'
                          ? 'bg-warm-gold/10 text-warm-gold'
                          : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {product.availability}
                  </span>
                </div>
                <button className="w-full text-center text-texas-blue font-semibold text-sm hover:underline">
                  Edit Product
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
