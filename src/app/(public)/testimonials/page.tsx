import connectDB from '@/lib/mongodb'
import Testimonial, { type ITestimonial } from '@/models/Testimonial'
import { getPageContent } from '@/lib/page-content'
import TestimonialsClient from './TestimonialsClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Testimonials | Team TEXAS Special Needs',
  description: 'Hear from the families and athletes who make Team TEXAS special.',
}

export default async function TestimonialsPage() {
  const c = await getPageContent('testimonials')
  await connectDB()
  const docs = await Testimonial.find({ isPublished: true }).sort({ order: 1 }).lean<ITestimonial[]>()

  return (
    <TestimonialsClient
      title={c('hero.title')}
      subtitle={c('hero.subtitle')}
      heroImage={c('hero.image')}
      items={docs.map((t) => ({
        id: t._id.toString(),
        quote: t.quote,
        name: t.personName,
        role: t.relationship,
      }))}
    />
  )
}
