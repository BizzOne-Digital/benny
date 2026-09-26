import ProgramsEditor from './ProgramsEditor'

export default function AdminProgramsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-midnight-navy mb-2">Programs</h1>
        <p className="text-gray-600">
          Manage sports programs shown on the home page and programs page. Images are stored in MongoDB
          (serverless-safe).
        </p>
      </div>
      <ProgramsEditor />
    </div>
  )
}
