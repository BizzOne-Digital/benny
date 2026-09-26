import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Page from '@/models/Page'
import Service from '@/models/Service'
import BlogPost from '@/models/BlogPost'
import Product from '@/models/Product'
import Inquiry from '@/models/Inquiry'
import GalleryImage from '@/models/GalleryImage'
import Testimonial from '@/models/Testimonial'
import FAQ from '@/models/FAQ'
import type { IInquiry } from '@/models/Inquiry'

export default async function AdminDashboard() {
  const session = await auth()
  
  if (!session) {
    return null
  }

  await connectDB()

  // Fetch real stats
  const [
    pagesCount,
    servicesCount,
    publishedServices,
    blogPosts,
    draftPosts,
    productsCount,
    newInquiries,
    totalInquiries,
    galleryImages,
    testimonialsCount,
    faqsCount,
  ] = await Promise.all([
    Page.countDocuments(),
    Service.countDocuments(),
    Service.countDocuments({ isPublished: true }),
    BlogPost.countDocuments({ status: 'published' }),
    BlogPost.countDocuments({ status: 'draft' }),
    Product.countDocuments({ isPublished: true }),
    Inquiry.countDocuments({ status: 'new' }),
    Inquiry.countDocuments(),
    GalleryImage.countDocuments(),
    Testimonial.countDocuments({ isPublished: true }),
    FAQ.countDocuments({ isPublished: true }),
  ])

  const recentInquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(5).lean<IInquiry[]>()

  const stats = [
    { label: 'Total Pages', value: pagesCount, color: 'bg-texas-blue' },
    { label: 'Published Services', value: publishedServices, color: 'bg-success' },
    { label: 'Published Blog Posts', value: blogPosts, color: 'bg-warm-gold' },
    { label: 'Draft Posts', value: draftPosts, color: 'bg-gray-400' },
    { label: 'Products', value: productsCount, color: 'bg-victory-red' },
    { label: 'New Inquiries', value: newInquiries, color: 'bg-texas-blue', highlight: newInquiries > 0 },
    { label: 'Gallery Images', value: galleryImages, color: 'bg-warm-gold' },
    { label: 'Published Testimonials', value: testimonialsCount, color: 'bg-success' },
    { label: 'Total Services', value: servicesCount, color: 'bg-gray-500' },
    { label: 'Total Inquiries', value: totalInquiries, color: 'bg-midnight-navy' },
    { label: 'Published FAQs', value: faqsCount, color: 'bg-success' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-midnight-navy mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {session.user.name}!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${stat.highlight ? 'border-victory-red' : 'border-transparent'}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-midnight-navy">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-midnight-navy">Recent Inquiries</h2>
          <a
            href="/admin/inquiries"
            className="text-texas-blue hover:underline font-semibold text-sm"
          >
            View All →
          </a>
        </div>

        {recentInquiries.length === 0 ? (
          <p className="text-gray-600 py-8 text-center">No inquiries yet</p>
        ) : (
          <div className="space-y-4">
            {recentInquiries.map((inquiry) => (
              <div
                key={inquiry._id.toString()}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-midnight-navy">{inquiry.name}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          inquiry.status === 'new'
                            ? 'bg-texas-blue/10 text-texas-blue'
                            : inquiry.status === 'read'
                              ? 'bg-warm-gold/10 text-warm-gold'
                              : 'bg-success/10 text-success'
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{inquiry.email}</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{inquiry.message}</p>
                  </div>
                  <span className="text-xs text-gray-500 ml-4">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href="/admin/pages"
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <h3 className="text-lg font-bold text-midnight-navy mb-2">Manage Pages</h3>
          <p className="text-gray-600 text-sm">Edit homepage, about, and other pages</p>
        </a>
        <a
          href="/admin/services"
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <h3 className="text-lg font-bold text-midnight-navy mb-2">Manage Services</h3>
          <p className="text-gray-600 text-sm">Add or update program offerings</p>
        </a>
        <a
          href="/admin/settings"
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <h3 className="text-lg font-bold text-midnight-navy mb-2">Site Settings</h3>
          <p className="text-gray-600 text-sm">Configure global site settings</p>
        </a>
      </div>
    </div>
  )
}
