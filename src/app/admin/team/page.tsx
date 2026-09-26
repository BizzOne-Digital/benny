import Image from 'next/image'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import TeamMember, { type ITeamMember } from '@/models/TeamMember'

export default async function AdminTeamPage() {
  const session = await auth()
  if (!session) return null

  await connectDB()
  const team = await TeamMember.find().sort({ order: 1 }).lean<ITeamMember[]>()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-midnight-navy mb-2">Team</h1>
          <p className="text-gray-600">Manage team members and staff</p>
        </div>
        <button className="px-6 py-3 bg-texas-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          + Add Team Member
        </button>
      </div>

      {team.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <p className="text-xl text-gray-600 mb-6">No team members yet</p>
          <button className="px-6 py-3 bg-texas-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Add First Team Member
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div key={member._id.toString()} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {member.photoUrl && (
                <div className="relative h-64">
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
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-midnight-navy">{member.name}</h3>
                  {member.isFeatured && (
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-warm-gold/10 text-warm-gold">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-texas-blue font-semibold mb-3">{member.role}</p>
                <p className="text-gray-700 text-sm line-clamp-3 mb-4">{member.bio}</p>
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      member.isPublished
                        ? 'bg-success/10 text-success'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {member.isPublished ? 'Published' : 'Draft'}
                  </span>
                  <button className="text-texas-blue font-semibold text-sm hover:underline">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
