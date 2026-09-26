import ContentEditor from './ContentEditor'

export default function AdminContentPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-midnight-navy mb-2">Home Content</h1>
        <p className="text-gray-600">Edit the home page welcome text, logo, and special announcements.</p>
      </div>
      <ContentEditor />
    </div>
  )
}
