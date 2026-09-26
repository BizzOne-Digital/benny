import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import SiteSettings from '@/models/SiteSettings'
import { requireAdminApi } from '@/lib/require-admin-api'

export const runtime = 'nodejs'

export async function GET() {
  const { error } = await requireAdminApi()
  if (error) return error

  await connectDB()
  let doc = await SiteSettings.findOne()
  if (!doc) {
    doc = await SiteSettings.create({})
  }

  return NextResponse.json({ success: true, settings: doc.toObject() })
}

export async function PUT(request: NextRequest) {
  const { error } = await requireAdminApi()
  if (error) return error

  const body = await request.json().catch(() => null)
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ success: false, error: 'Invalid body' }, { status: 400 })
  }

  await connectDB()
  let doc = await SiteSettings.findOne()
  if (!doc) {
    doc = await SiteSettings.create({})
  }

  const allowed = [
    'organizationName',
    'email',
    'phone',
    'contactRole',
    'address',
    'officeHours',
    'socialLinks',
    'logoUrl',
    'faviconUrl',
    'defaultCTAText',
    'defaultCTAUrl',
    'footerText',
    'pricingVisibility',
    'seoTitle',
    'seoDescription',
    'seoKeywords',
    'homeHeroEyebrow',
    'homeHeroHeadline',
    'homeHeroSubtext',
  ] as const

  for (const key of allowed) {
    if (key in body && body[key] !== undefined) {
      doc.set(key, body[key])
    }
  }

  await doc.save()

  return NextResponse.json({ success: true, settings: doc.toObject() })
}
