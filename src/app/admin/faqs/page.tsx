import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import FAQCategory, { type IFAQCategory } from '@/models/FAQCategory'
import FAQ, { type IFAQ } from '@/models/FAQ'

export default async function AdminFAQsPage() {
  const session = await auth()
  if (!session) return null

  await connectDB()
  const categories = await FAQCategory.find().sort({ order: 1 }).lean<IFAQCategory[]>()
  const faqs = await FAQ.find()
    .populate<{ categoryId: IFAQCategory }>('categoryId')
    .sort({ order: 1 })
    .lean<(IFAQ & { categoryId: IFAQCategory })[]>()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-midnight-navy mb-2">FAQs</h1>
          <p className="text-gray-600">Manage frequently asked questions</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white border-2 border-texas-blue text-texas-blue rounded-lg font-semibold hover:bg-sky transition-colors">
            + Add Category
          </button>
          <button className="px-6 py-3 bg-texas-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            + Add FAQ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-midnight-navy mb-4">Categories</h3>
            {categories.length === 0 ? (
              <p className="text-sm text-gray-600">No categories yet</p>
            ) : (
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category._id.toString()}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-sky transition-colors cursor-pointer"
                  >
                    <h4 className="font-semibold text-midnight-navy">{category.name}</h4>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* FAQs List */}
        <div className="lg:col-span-3">
          {faqs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <p className="text-xl text-gray-600">No FAQs yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq._id.toString()} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">
                        {faq.categoryId?.name || 'Uncategorized'}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          faq.isPublished
                            ? 'bg-success/10 text-success'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {faq.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <button className="text-texas-blue font-semibold text-sm hover:underline">
                      Edit
                    </button>
                  </div>
                  <h4 className="text-lg font-bold text-midnight-navy mb-2">{faq.question}</h4>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
