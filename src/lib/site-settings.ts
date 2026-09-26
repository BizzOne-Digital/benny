import connectDB from '@/lib/mongodb'
import SiteSettings from '@/models/SiteSettings'

export async function getSiteSettings() {
  await connectDB()
  let settings = await SiteSettings.findOne().lean()
  if (!settings) {
    const created = await SiteSettings.create({})
    settings = created.toObject()
  }
  return settings
}
