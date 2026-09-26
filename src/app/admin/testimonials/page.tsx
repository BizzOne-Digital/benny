import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Testimonial, { type ITestimonial } from '@/models/Testimonial'

export default async function AdminTestimonialsPage() {
  const session = await auth()
  if (!session) return null

  await connectDB()
  const testimonials = await Testimonial.find().sort({ order: 1 }).lean<ITestimonial[]>()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-midnight-navy mb-2">Testimonials</h1>
          <p className="text-gray-600">Manage testimonials from families and athletes</p>
        </div>
        <button className="px-6 py-3 bg-texas-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          + Add Testimonial
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <p className="text-xl text-gray-600 mb-6">No testimonials yet</p>
          <button className="px-6 py-3 bg-texas-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Create First Testimonial
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id.toString()}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-midnight-navy">
                      {testimonial.personName}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        testimonial.isPublished
                          ? 'bg-success/10 text-success'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {testimonial.isPublished ? 'Published' : 'Draft'}
                    </span>
                    {testimonial.isFeatured && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-warm-gold/10 text-warm-gold">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{testimonial.relationship}</p>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </div>
                <button className="ml-4 text-texas-blue font-semibold text-sm hover:underline">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
