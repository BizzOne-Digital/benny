import MediaLibrary from './MediaLibrary'

export default function AdminMediaPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-midnight-navy mb-2">Media Library</h1>
        <p className="text-gray-600">Upload and browse images stored in MongoDB (production-safe).</p>
      </div>
      <MediaLibrary />
    </div>
  )
}
