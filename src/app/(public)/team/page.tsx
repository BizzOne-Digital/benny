import Image from 'next/image'
import connectDB from '@/lib/mongodb'
import TeamMember, { type ITeamMember } from '@/models/TeamMember'

export const metadata = {
  title: 'Our Team | Team TEXAS Special Needs',
  description: 'Meet the dedicated coaches and staff behind Team TEXAS Special Needs',
}

export default async function TeamPage() {
  await connectDB()
  const team = await TeamMember.find({ isPublished: true }).sort({ order: 1 }).lean<ITeamMember[]>()

  return (
    <>
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-midnight-navy to-texas-blue text-white">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Team</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
            Meet the passionate people making a difference in our community
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="section-container">
          {team.length === 0 ? (
            <p className="text-center text-xl text-gray-600">Team information coming soon!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <div key={member._id.toString()} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  {member.photoUrl && (
                    <div className="relative h-80">
                      <Image
                        src={member.photoUrl}
                        alt={member.photoAlt || member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-midnight-navy mb-2">{member.name}</h3>
                    <p className="text-texas-blue font-semibold mb-4">{member.role}</p>
                    <p className="text-gray-700 leading-relaxed mb-4">{member.bio}</p>
                    {member.socialLinks && (
                      <div className="flex space-x-3">
                        {member.socialLinks.email && (
                          <a
                            href={`mailto:${member.socialLinks.email}`}
                            className="text-gray-600 hover:text-texas-blue transition-colors"
                            aria-label="Email"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                          </a>
                        )}
                        {member.socialLinks.linkedin && (
                          <a
                            href={member.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-texas-blue transition-colors"
                            aria-label="LinkedIn"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
