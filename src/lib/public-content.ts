import connectDB from '@/lib/mongodb'
import Program from '@/models/Program'
import Announcement from '@/models/Announcement'
import { TEAM_TEXAS_PROGRAMS } from '@/lib/programs'
import { SPECIAL_ANNOUNCEMENTS } from '@/lib/announcements'

export type PublicProgram = {
  id: string
  title: string
  description: string
  image: string
  highlights?: string[]
}

export type PublicAnnouncement = {
  id: string
  title: string
  message: string
  dateLabel?: string
}

export async function getPublicPrograms(): Promise<PublicProgram[]> {
  await connectDB()
  const docs = await Program.find({ isPublished: true }).sort({ order: 1 }).lean()

  if (docs.length > 0) {
    return docs.map((p) => ({
      id: p.slug,
      title: p.title,
      description: p.description,
      image: p.image,
      highlights: p.highlights,
    }))
  }

  return TEAM_TEXAS_PROGRAMS.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    image: p.image,
    highlights: p.highlights,
  }))
}

export async function getPublicAnnouncements(): Promise<PublicAnnouncement[]> {
  await connectDB()
  const docs = await Announcement.find({ isPublished: true }).sort({ order: 1 }).lean()

  if (docs.length > 0) {
    return docs.map((a) => ({
      id: a._id.toString(),
      title: a.title,
      message: a.message,
      dateLabel: a.dateLabel,
    }))
  }

  return SPECIAL_ANNOUNCEMENTS.map((a) => ({
    id: a.id,
    title: a.title,
    message: a.message,
    dateLabel: a.dateLabel,
  }))
}
