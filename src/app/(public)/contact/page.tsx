import { getPageContent } from '@/lib/page-content'
import ContactClient from './ContactClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Contact | Team TEXAS Special Needs',
  description: 'Get in touch with Team TEXAS Special Needs.',
}

export default async function ContactPage() {
  const c = await getPageContent('contact')
  return <ContactClient title={c('hero.title')} subtitle={c('hero.subtitle')} />
}
