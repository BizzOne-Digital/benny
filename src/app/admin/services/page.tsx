import Link from 'next/link'
import Image from 'next/image'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Service, { type IService } from '@/models/Service'

export default async function AdminServicesPage() {
  const session = await auth()
  if (!session) return null

  await connectDB()
  const services = await Service.find().sort({ order: 1 }).lean<IService[]>()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-midnight-navy mb-2">Services</h1>
          <p className="text-gray-600">Manage your programs and services</p>
        </div>
        <Link
          href="/admin/services/new"
          className="px-6 py-3 bg-texas-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          + Add Service
        </Link>
      </div>

      {services.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <p className="text-xl text-gray-600 mb-6">No services yet</p>
          <Link
            href="/admin/services/new"
            className="inline-flex px-6 py-3 bg-texas-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Create First Service
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Order
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {services.map((service) => (
                  <tr key={service._id.toString()} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={service.cardImage}
                            alt={service.cardImageAlt}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-midnight-navy">{service.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-1">{service.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {service.category || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          service.isPublished
                            ? 'bg-success/10 text-success'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {service.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{service.order}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/services/${service._id}`}
                        className="text-texas-blue hover:underline font-semibold text-sm"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
