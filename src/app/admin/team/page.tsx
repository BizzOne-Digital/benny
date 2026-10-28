import ResourceManager from '@/components/admin/ResourceManager'

export default function AdminTeamPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-midnight-navy mb-6">Team</h1>
      <ResourceManager resource="team" />
    </div>
  )
}
