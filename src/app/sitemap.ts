import { MetadataRoute } from 'next'
import connectDB from '@/lib/mongodb'
import Service, { type IService } from '@/models/Service'
import BlogPost, { type IBlogPost } from '@/models/BlogPost'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.teamtexasspecialneeds.com'

  await connectDB()

  // Fetch dynamic routes
  const services = await Service.find({ isPublished: true })
    .select('slug updatedAt')
    .lean<Pick<IService, 'slug' | 'updatedAt'>[]>()
  const posts = await BlogPost.find({ status: 'published' })
    .select('slug updatedAt')
    .lean<Pick<IBlogPost, 'slug' | 'updatedAt'>[]>()

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/testimonials',
    '/team',
    '/sponsors',
    '/blog',
    '/shop',
    '/pricing',
    '/faq',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(service.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes]
}
