import { getPageContent } from '@/lib/page-content'
import CmsImage from '@/components/ui/CmsImage'
import connectDB from '@/lib/mongodb'
import Product, { type IProduct } from '@/models/Product'

export const metadata = {
  title: 'Shop | Team TEXAS Special Needs',
  description: 'Support Team TEXAS with official merchandise and apparel',
}

export default async function ShopPage() {
  const c = await getPageContent('shop')
  await connectDB()
  const products = await Product.find({ isPublished: true }).sort({ order: 1 }).lean<IProduct[]>()

  return (
    <>
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-midnight-navy to-texas-blue text-white">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{c('hero.title')}</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
            {c('hero.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="section-container">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-midnight-navy mb-4">Shop Coming Soon!</h2>
              <p className="text-xl text-gray-600">
                We're working on bringing you official Team TEXAS merchandise. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product._id.toString()} className="card">
                  <div className="relative h-80">
                    <CmsImage
                      src={product.images[0]?.url || ''}
                      alt={product.images[0]?.alt || product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {product.availability === 'coming-soon' && (
                      <div className="absolute top-4 right-4 bg-warm-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Coming Soon
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-midnight-navy mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-texas-blue">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="ml-2 text-gray-500 line-through">
                            ${product.compareAtPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      {product.availability === 'contact' && (
                        <a
                          href="/contact"
                          className="px-4 py-2 bg-texas-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                          Contact Us
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export const dynamic = 'force-dynamic'
