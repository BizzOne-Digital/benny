import { getPageContent } from '@/lib/page-content'
import CmsImage from '@/components/ui/CmsImage'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import connectDB from '@/lib/mongodb'
import BlogPost, { type IBlogPost } from '@/models/BlogPost'

export const metadata = {
  title: 'Blog & News | Team TEXAS Special Needs',
  description: 'Latest news, stories, and updates from Team TEXAS Special Needs',
}

export default async function BlogPage() {
  const c = await getPageContent('blog')
  await connectDB()
  const posts = await BlogPost.find({ status: 'published' })
    .sort({ publishDate: -1 })
    .lean<IBlogPost[]>()

  return (
    <>
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-midnight-navy to-texas-blue text-white">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{c('hero.title')}</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
            {c('hero.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="section-container">
          {posts.length === 0 ? (
            <p className="text-center text-xl text-gray-600">
              Blog posts coming soon! Check back later for updates and stories.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post._id.toString()}
                  href={`/blog/${post.slug}`}
                  className="card group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <CmsImage
                      src={post.coverImage}
                      alt={post.coverImageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-texas-blue font-semibold mb-2">
                      {formatDate(post.publishDate)}
                    </p>
                    <h3 className="text-2xl font-bold text-midnight-navy mb-3">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <span className="text-texas-blue font-semibold inline-flex items-center group-hover:gap-2 transition-all">
                      Read More
                      <svg
                        className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export const dynamic = 'force-dynamic'
