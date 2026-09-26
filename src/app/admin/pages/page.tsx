import Link from 'next/link'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Page, { type IPage } from '@/models/Page'

export default async function AdminPagesPage() {
  const session = await auth()
  if (!session) return null

  await connectDB()
  const pages = await Page.find().sort({ name: 1 }).lean<IPage[]>()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-midnight-navy mb-2">Pages</h1>
          <p className="text-gray-600">Manage your site pages and content sections</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <Link
            key={page._id.toString()}
            href={`/admin/pages/${page._id}`}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-bold text-midnight-navy mb-2">{page.name}</h3>
            <p className="text-sm text-gray-600 mb-4">Slug: /{page.slug}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {page.sections?.length || 0} sections
              </span>
              <span className="text-texas-blue font-semibold text-sm">Edit →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
