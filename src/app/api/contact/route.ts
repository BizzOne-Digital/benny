import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Inquiry from '@/models/Inquiry'
import { contactFormSchema } from '@/lib/validations'
import { ZodError } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validated = contactFormSchema.parse(body)

    // Check honeypot
    if (validated.honeypot) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
    }

    await connectDB()

    // Create inquiry
    const inquiry = await Inquiry.create({
      name: validated.name,
      email: validated.email,
      phone: validated.phone || '',
      interestType: validated.interestType,
      message: validated.message,
      status: 'new',
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
      userAgent: request.headers.get('user-agent') || '',
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your inquiry! We will get back to you soon.',
        id: inquiry._id,
      },
      { status: 201 }
    )
  } catch (error: unknown) {
    console.error('Contact form error:', error)

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to submit inquiry. Please try again.' },
      { status: 500 }
    )
  }
}
