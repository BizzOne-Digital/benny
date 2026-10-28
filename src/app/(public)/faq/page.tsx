import connectDB from '@/lib/mongodb'
import FAQ, { type IFAQ } from '@/models/FAQ'
import FAQCategory, { type IFAQCategory } from '@/models/FAQCategory'
import { getPageContent } from '@/lib/page-content'
import FaqClient from './FaqClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'FAQ | Team TEXAS Special Needs',
  description: 'Answers to common questions about Team TEXAS programs.',
}

export default async function FAQPage() {
  const c = await getPageContent('faq')
  await connectDB()
  const categories = await FAQCategory.find({ isVisible: true }).sort({ order: 1 }).lean<IFAQCategory[]>()
  const faqs = await FAQ.find({ isPublished: true }).sort({ order: 1 }).lean<IFAQ[]>()

  const groups = categories
    .map((cat) => ({
      category: cat.name,
      items: faqs
        .filter((f) => f.categoryId.toString() === cat._id.toString())
        .map((f) => ({ question: f.question, answer: f.answer })),
    }))
    .filter((g) => g.items.length > 0)

  return <FaqClient title={c('hero.title')} subtitle={c('hero.subtitle')} groups={groups} />
}
