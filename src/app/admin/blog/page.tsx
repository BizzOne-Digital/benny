import Image from 'next/image'
import { auth } from '@/lib/auth'
import { formatDate } from '@/lib/utils'
import connectDB from '@/lib/mongodb'
import BlogPost, { type IBlogPost } from '@/models/BlogPost'

export default async function AdminBlogPage() {
  const session = await auth()
  if (!session) return null

  await connectDB()
  const posts = await BlogPost.find().sort({ createdAt: -1 }).lean<IBlogPost[]>()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-midnight-navy mb-2">Blog</h1>
          <p className="text-gray-600">Manage blog posts and articles</p>
        </div>
        <button className="px-6 py-3 bg-texas-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          + New Post
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <p className="text-xl text-gray-600 mb-6">No blog posts yet</p>
          <button className="px-6 py-3 bg-texas-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Create First Post
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post._id.toString()} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start gap-6">
                <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={post.coverImage}
                    alt={post.coverImageAlt}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-midnight-navy">{post.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        post.status === 'published'
                          ? 'bg-success/10 text-success'
                          : post.status === 'scheduled'
                            ? 'bg-warm-gold/10 text-warm-gold'
                            : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {post.status}
                    </span>
                    {post.isFeatured && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-texas-blue/10 text-texas-blue">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>By {post.author}</span>
                    <span>•</span>
                    <span>{formatDate(post.publishDate)}</span>
                    {post.categories.length > 0 && (
                      <>
                        <span>•</span>
                        <span>{post.categories.join(', ')}</span>
                      </>
                    )}
                  </div>
                </div>
                <button className="text-texas-blue font-semibold text-sm hover:underline">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
