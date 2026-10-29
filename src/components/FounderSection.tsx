import connectDB from '@/lib/mongodb'
import TeamMember, { type ITeamMember } from '@/models/TeamMember'
import CmsImage from '@/components/ui/CmsImage'

/** Founder story block (photo left, text right). Content comes from the Team admin page. */
export default async function FounderSection() {
  await connectDB()
  const founder =
    (await TeamMember.findOne({ isPublished: true, role: /founder/i }).sort({ order: 1 }).lean<ITeamMember>()) ||
    (await TeamMember.findOne({ isPublished: true, isFeatured: true }).sort({ order: 1 }).lean<ITeamMember>())

  if (!founder) return null

  const paragraphs = founder.bio.split(/\n\s*\n/).filter(Boolean)

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="relative h-[28rem] lg:h-[34rem] rounded-2xl overflow-hidden shadow-2xl bg-warm-cream">
            {founder.photoUrl && (
              <CmsImage
                src={founder.photoUrl}
                alt={founder.photoAlt || founder.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
          </div>

          <div>
            <p className="text-victory-red font-bold uppercase tracking-wider text-sm mb-3">{founder.role}</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-midnight-navy mb-4">
              Meet {founder.name}
            </h2>
            <div className="w-16 h-1 bg-warm-gold mb-6"></div>
            <div className="space-y-4">
              {paragraphs.map((p, i) =>
                p.trim().startsWith('"') ? (
                  <blockquote
                    key={i}
                    className="border-l-4 border-victory-red pl-4 italic text-lg text-midnight-navy leading-relaxed"
                  >
                    {p}
                  </blockquote>
                ) : (
                  <p key={i} className="text-lg text-gray-700 leading-relaxed">
                    {p}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
