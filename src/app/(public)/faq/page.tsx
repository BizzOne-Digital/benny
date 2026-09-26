'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

// This would be fetched from database in real implementation
const faqs = [
  {
    category: 'General',
    items: [
      {
        question: 'Who can participate in Team TEXAS programs?',
        answer: 'Our programs are open to children and adults with special needs of all ability levels. We welcome anyone who wants to experience the joy of sports in a supportive, inclusive environment.',
      },
      {
        question: 'Do I need prior sports experience to join?',
        answer: 'Not at all! Our programs are designed for all skill levels, from complete beginners to experienced athletes. Our coaches adapt activities to meet each participant where they are.',
      },
      {
        question: 'How do I register for a program?',
        answer: 'You can get started by contacting us through our contact form or calling us directly. We\'ll discuss your needs and help you find the perfect program.',
      },
    ],
  },
  {
    category: 'Programs',
    items: [
      {
        question: 'What programs do you offer?',
        answer: 'We offer a variety of adaptive sports programs including basketball, soccer, skills clinics, and community sports days. Check our Programs page for the full list.',
      },
      {
        question: 'How long do programs last?',
        answer: 'Program lengths vary by activity. Most programs run seasonally, with sessions typically lasting 8-12 weeks. Contact us for specific program schedules.',
      },
    ],
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null)

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id)
  }

  return (
    <>
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-midnight-navy to-texas-blue text-white">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
            Find answers to common questions about our programs
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="section-container max-w-4xl">
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <h2 className="text-3xl font-bold text-midnight-navy mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.items.map((faq, itemIndex) => {
                  const id = `${catIndex}-${itemIndex}`
                  const isOpen = openIndex === id
                  return (
                    <div
                      key={id}
                      className="bg-warm-cream rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(id)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-sky transition-colors focus:outline-none focus:ring-2 focus:ring-texas-blue focus:ring-inset"
                        aria-expanded={isOpen}
                      >
                        <span className="text-lg font-semibold text-midnight-navy pr-4">
                          {faq.question}
                        </span>
                        <svg
                          className={cn(
                            'w-6 h-6 text-texas-blue flex-shrink-0 transition-transform',
                            isOpen && 'rotate-180'
                          )}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          <div className="mt-12 p-8 bg-sky rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-midnight-navy mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-700 mb-6">
              We're here to help! Contact us and we'll be happy to answer any questions you have.
            </p>
            <a
              href="/contact"
              className="inline-flex px-6 py-3 bg-texas-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
