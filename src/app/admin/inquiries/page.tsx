import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Inquiry, { type IInquiry } from '@/models/Inquiry'
import { formatDate } from '@/lib/utils'

export default async function AdminInquiriesPage() {
  const session = await auth()
  if (!session) return null

  await connectDB()
  const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean<IInquiry[]>()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-midnight-navy mb-2">Inquiries</h1>
        <p className="text-gray-600">Manage contact form submissions</p>
      </div>

      {inquiries.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <p className="text-xl text-gray-600">No inquiries yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry._id.toString()}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-midnight-navy">{inquiry.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        inquiry.status === 'new'
                          ? 'bg-texas-blue/10 text-texas-blue'
                          : inquiry.status === 'read'
                            ? 'bg-warm-gold/10 text-warm-gold'
                            : inquiry.status === 'responded'
                              ? 'bg-success/10 text-success'
                              : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {inquiry.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{inquiry.email}</p>
                  {inquiry.phone && <p className="text-gray-600 mb-4">Phone: {inquiry.phone}</p>}
                  <p className="text-sm text-gray-500 mb-4">
                    Interest: {inquiry.interestType}
                  </p>
                  <p className="text-gray-700 whitespace-pre-wrap">{inquiry.message}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-sm text-gray-500">{formatDate(inquiry.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
