'use client'

import { useState } from 'react'
import ResourceManager from '@/components/admin/ResourceManager'
import { cn } from '@/lib/utils'

export default function AdminFAQsPage() {
  const [tab, setTab] = useState<'faqs' | 'faq-categories'>('faqs')
  return (
    <div>
      <h1 className="text-3xl font-bold text-midnight-navy mb-6">FAQs</h1>
      <div className="flex gap-2 mb-6">
        {(['faqs', 'faq-categories'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              'px-5 py-2 rounded-lg font-semibold',
              tab === t ? 'bg-texas-blue text-white' : 'bg-white text-gray-700 border border-gray-300'
            )}
          >
            {t === 'faqs' ? 'Questions' : 'Categories'}
          </button>
        ))}
      </div>
      <ResourceManager key={tab} resource={tab} />
    </div>
  )
}
