import PageContentEditor from './PageContentEditor'

export default function AdminPagesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-midnight-navy mb-2">Page Content</h1>
        <p className="text-gray-600">
          Edit the headings, text and pictures of each page. Changes go live as soon as you save.
        </p>
      </div>
      <PageContentEditor />
    </div>
  )
}
