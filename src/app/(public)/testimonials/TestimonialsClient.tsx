'use client'

import { useState, useEffect } from 'react'
import CmsImage from '@/components/ui/CmsImage'

type Item = { id: string | number; quote: string; name: string; role: string }

export default function TestimonialsClient({
  title,
  subtitle,
  heroImage,
  items,
}: {
  title: string
  subtitle: string
  heroImage: string
  items: Item[]
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const fallback: Item[] = [
    {
      id: 1,
      quote: "Being part of Team Texas has changed our lives. My son has more confidence, more friends and a place where he truly belongs.",
      name: "Sarah Martinez",
      role: "Parent of Basketball Program Participant",
    },
    {
      id: 2,
      quote: "The coaches at Team TEXAS understand my daughter's needs and celebrate her victories. She looks forward to practice every week!",
      name: "James Wilson",
      role: "Parent of Soccer Program Participant",
    },
    {
      id: 3,
      quote: "I've watched my nephew grow so much through this program. The inclusive environment has made all the difference in his confidence.",
      name: "Maria Rodriguez",
      role: "Family Member",
    },
    {
      id: 4,
      quote: "Team TEXAS gave our son the opportunity to be part of a team. The friendships he's made here are priceless.",
      name: "David Chen",
      role: "Parent and Volunteer Coach",
    },
    {
      id: 5,
      quote: "This program has brought our entire family together. We love being part of the Team TEXAS community!",
      name: "Amanda Thompson",
      role: "Parent of Two Athletes",
    },
  ]
  const testimonials = items.length > 0 ? items : fallback

  // Auto-scroll effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000) // Change every 5 seconds

    return () => clearInterval(timer)
  }, [testimonials.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <CmsImage
            src={heroImage}
            alt="Team TEXAS community"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight-navy/95 via-midnight-navy/80 to-midnight-navy/95"></div>
        </div>
        <div className="section-container relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <svg className="w-6 h-6 text-warm-gold" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">{title}</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Auto-Scrolling Testimonials */}
      <section className="py-16 lg:py-24 bg-midnight-navy text-white">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            {/* Testimonial Slider */}
            <div className="relative min-h-[500px] flex items-center">
              {/* Navigation Buttons */}
              <button
                onClick={goToPrevious}
                className="absolute left-0 z-10 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={goToNext}
                className="absolute right-0 z-10 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Testimonials */}
              <div className="w-full px-12">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`transition-opacity duration-500 ${
                      index === currentIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
                    }`}
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
                      {/* Quote Icon */}
                      <svg className="w-16 h-16 text-victory-red mb-6 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>

                      {/* Quote */}
                      <p className="text-2xl md:text-3xl lg:text-4xl text-center mb-8 leading-relaxed font-light">
                        {testimonial.quote}
                      </p>

                      {/* Author */}
                      <div className="text-center">
                        <div className="w-16 h-1 bg-warm-gold mx-auto mb-4"></div>
                        <h3 className="text-xl font-bold text-warm-gold mb-2">{testimonial.name}</h3>
                        <p className="text-gray-300">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-3 mt-12">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-warm-gold w-8'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight-navy text-center mb-12">
            Moments That Matter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <CmsImage
                src="/home-1.png"
                alt="Team TEXAS moment"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <CmsImage
                src="/home-2.png"
                alt="Team TEXAS moment"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <CmsImage
                src="/home-3.png"
                alt="Team TEXAS moment"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-texas-blue text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Be Part of Our Story
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Join the Team TEXAS family and create your own unforgettable moments
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 bg-white text-texas-blue rounded-lg font-bold text-lg hover:bg-warm-cream transition-all shadow-lg"
          >
            Get Started Today
          </a>
        </div>
      </section>
    </>
  )
}
