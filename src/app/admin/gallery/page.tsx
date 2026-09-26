import GalleryManager from './GalleryManager'

export default function AdminGalleryPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-midnight-navy mb-2">Gallery</h1>
        <p className="text-gray-600">
          Upload photos for the home page gallery. Files are stored in MongoDB and served from{' '}
          <code className="text-sm bg-gray-100 px-1 rounded">/api/uploads/gallery/…</code>
        </p>
      </div>
      <GalleryManager />
    </div>
  )
}
