'use client'

import { useState } from 'react'
import Image from 'next/image'
import { formatPhone } from '@/lib/utils'
import Button from '@/components/ui/Button'

export default function ContactClient({ title, subtitle }: { title: string; subtitle: string }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interestType: '',
    message: '',
    honeypot: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        interestType: '',
        message: '',
        honeypot: '',
      })
    } catch (error: unknown) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-midnight-navy to-texas-blue text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1920"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="section-container relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{title}</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-midnight-navy mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-midnight-navy mb-2">Email</h3>
                  <a
                    href="mailto:teamtexas.specialneeds@gmail.com"
                    className="text-texas-blue hover:underline"
                  >
                    teamtexas.specialneeds@gmail.com
                  </a>
                </div>

                <div>
                  <h3 className="font-bold text-midnight-navy mb-2">Phone</h3>
                  <a href="tel:+18325195390" className="text-texas-blue hover:underline">
                    {formatPhone('18325195390')}
                  </a>
                </div>

                <div>
                  <h3 className="font-bold text-midnight-navy mb-2">Contact</h3>
                  <p className="text-gray-700">Founder, President & Coach — Team TEXAS Special Needs</p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-warm-cream rounded-xl">
                <h3 className="font-bold text-midnight-navy mb-3">Office Hours</h3>
                <p className="text-gray-700">
                  We're here to help! Contact us anytime and we'll get back to you as soon as
                  possible.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-midnight-navy mb-6">Send Us a Message</h2>

              {status === 'success' ? (
                <div className="bg-success/10 border border-success text-success rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-2">Thank you for your message!</h3>
                  <p>We've received your inquiry and will get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === 'error' && (
                    <div className="bg-victory-red/10 border border-victory-red text-victory-red rounded-xl p-4">
                      {errorMessage}
                    </div>
                  )}

                  {/* Honeypot field - hidden from users */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    style={{ position: 'absolute', left: '-9999px' }}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block font-semibold text-gray-700 mb-2">
                        Name <span className="text-victory-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-texas-blue focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block font-semibold text-gray-700 mb-2">
                        Email <span className="text-victory-red">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-texas-blue focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block font-semibold text-gray-700 mb-2">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-texas-blue focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="interestType"
                        className="block font-semibold text-gray-700 mb-2"
                      >
                        I'm interested in <span className="text-victory-red">*</span>
                      </label>
                      <select
                        id="interestType"
                        name="interestType"
                        required
                        value={formData.interestType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-texas-blue focus:border-transparent"
                      >
                        <option value="">Select an option</option>
                        <option value="athlete">Registering an Athlete</option>
                        <option value="volunteer">Volunteering</option>
                        <option value="sponsor">Sponsorship Opportunities</option>
                        <option value="donation">Making a Donation</option>
                        <option value="partnership">Community Partnership</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-semibold text-gray-700 mb-2">
                      Message <span className="text-victory-red">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-texas-blue focus:border-transparent"
                    />
                  </div>

                  <Button type="submit" size="lg" isLoading={status === 'loading'}>
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
