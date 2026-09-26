import Image from 'next/image'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import connectDB from '@/lib/mongodb'
import BlogPost, { type IBlogPost } from '@/models/BlogPost'

export async function generateStaticParams() {
  await connectDB()
  const posts = await BlogPost.find({ status: 'published' }).select('slug').lean<Pick<IBlogPost, 'slug'>[]>()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  await connectDB()
  const post = await BlogPost.findOne({ slug, status: 'published' }).lean()
  
  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: `${post.title} | Team TEXAS Special Needs Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  await connectDB()
  const post = await BlogPost.findOne({ slug, status: 'published' }).lean()

  if (!post) {
    notFound()
  }

  return (
    <>
      <article className="py-16 lg:py-24">
        <div className="section-container max-w-4xl">
          <div className="mb-8">
            <p className="text-texas-blue font-semibold mb-4">{formatDate(post.publishDate)}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-midnight-navy mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>By {post.author}</span>
              {post.categories.length > 0 && (
                <span>• {post.categories.join(', ')}</span>
              )}
            </div>
          </div>

          <div className="relative h-96 mb-12 rounded-2xl overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-sky text-texas-blue rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  )
}
