import { config } from 'dotenv'
import connectDB from './mongodb'
import { hashPassword } from './password'

// Load environment variables
config()
import AdminUser from '@/models/AdminUser'
import SiteSettings from '@/models/SiteSettings'
import Page from '@/models/Page'
import Service from '@/models/Service'
import GalleryCategory from '@/models/GalleryCategory'
import FAQCategory from '@/models/FAQCategory'
import FAQ from '@/models/FAQ'
import TeamMember from '@/models/TeamMember'
import PricingPlan from '@/models/PricingPlan'
import Testimonial from '@/models/Testimonial'
import Program from '@/models/Program'
import Announcement from '@/models/Announcement'
import { TEAM_TEXAS_PROGRAMS } from '@/lib/programs'
import { SPECIAL_ANNOUNCEMENTS } from '@/lib/announcements'

async function seed() {
  try {
    console.log('🌱 Starting database seed...')
    
    await connectDB()

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@teamtexasspecialneeds.org'
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!@#'
    
    const existingAdmin = await AdminUser.findOne({ email: adminEmail })
    if (!existingAdmin) {
      const hashedPassword = await hashPassword(adminPassword)
      await AdminUser.create({
        email: adminEmail,
        password: hashedPassword,
        name: 'Admin User',
        role: 'superadmin',
        isActive: true,
      })
      console.log('✅ Admin user created')
    } else {
      console.log('ℹ️  Admin user already exists')
    }

    // Create site settings
    const existingSettings = await SiteSettings.findOne()
    if (!existingSettings) {
      await SiteSettings.create({
        organizationName: 'Team TEXAS Special Needs',
        email: 'teamtexas.specialneeds@gmail.com',
        phone: '18325195390',
        contactRole: 'Founder, President & Coach — Team TEXAS Special Needs',
        defaultCTAText: 'Get Involved',
        defaultCTAUrl: '/contact',
        pricingVisibility: false,
        socialLinks: {},
        seoTitle: 'Team TEXAS Special Needs | Every Ability. Every Athlete. One Team.',
        seoDescription:
          'Team TEXAS creates welcoming sports opportunities where children and adults with special needs can build confidence, friendships, and unforgettable memories.',
        homeHeroEyebrow: 'WELCOME TO TEAM TEXAS SPECIAL NEEDS',
        homeHeroHeadline: 'EVERYONE DESERVES THEIR MOMENT TO PLAY.',
        homeHeroSubtext:
          'Inclusive sports experiences where children and adults with special needs build confidence, friendships and unforgettable memories.',
      })
      console.log('✅ Site settings created')
    } else {
      console.log('ℹ️  Site settings already exist')
    }

    // Create pages
    const pages = [
      {
        name: 'Home',
        slug: 'home',
        title: 'Team TEXAS Special Needs',
        sections: [
          {
            type: 'hero',
            enabled: true,
            eyebrow: 'Every Ability. Every Athlete. One Team.',
            heading: 'Everyone Deserves Their Moment to Play',
            body: 'Team TEXAS creates welcoming sports opportunities where children and adults with special needs can build confidence, friendships, and unforgettable memories.',
            ctaText: 'Find a Program',
            ctaUrl: '/services',
            imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1920',
            imageAlt: 'Children playing sports together on a sunny field',
            order: 1,
          },
        ],
      },
      {
        name: 'About',
        slug: 'about',
        title: 'About Us',
        sections: [],
      },
      {
        name: 'Services',
        slug: 'services',
        title: 'Our Programs',
        sections: [],
      },
    ]

    for (const pageData of pages) {
      const exists = await Page.findOne({ slug: pageData.slug })
      if (!exists) {
        await Page.create(pageData)
      }
    }
    console.log('✅ Pages created')

    // Create sample services
    const services = [
      {
        title: 'Adaptive Basketball',
        slug: 'adaptive-basketball',
        excerpt:
          'Modified basketball program designed for all ability levels, focusing on fun, teamwork, and skill development.',
        description:
          'Our Adaptive Basketball program welcomes athletes of all abilities to experience the joy of the game. With modified rules, specialized equipment, and supportive coaching, every participant can play, learn, and grow.',
        cardImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
        cardImageAlt: 'Young athletes playing adaptive basketball',
        category: 'Team Sports',
        audience: 'Children and adults with physical or developmental disabilities',
        benefits: [
          'Physical fitness and coordination',
          'Social skills and teamwork',
          'Confidence building',
          'Fun and inclusive environment',
        ],
        isPublished: true,
        isFeatured: true,
        order: 1,
        sections: [],
      },
      {
        title: 'Inclusive Soccer',
        slug: 'inclusive-soccer',
        excerpt:
          'Welcoming soccer program that brings together athletes of all abilities for fun, friendship, and skill-building.',
        description:
          'Experience the beautiful game in a fully inclusive environment. Our soccer program pairs athletes with buddies and provides adaptive equipment to ensure everyone can participate fully.',
        cardImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
        cardImageAlt: 'Inclusive soccer match with diverse athletes',
        category: 'Team Sports',
        isPublished: true,
        order: 2,
        sections: [],
      },
    ]

    for (const serviceData of services) {
      const exists = await Service.findOne({ slug: serviceData.slug })
      if (!exists) {
        await Service.create(serviceData)
      }
    }
    console.log('✅ Services created')

    for (const [index, program] of TEAM_TEXAS_PROGRAMS.entries()) {
      const exists = await Program.findOne({ slug: program.id })
      if (!exists) {
        await Program.create({
          slug: program.id,
          title: program.title,
          description: program.description,
          image: program.image,
          highlights: program.highlights || [],
          isPublished: true,
          order: index,
        })
      }
    }
    console.log('✅ Programs created')

    for (const [index, item] of SPECIAL_ANNOUNCEMENTS.entries()) {
      const exists = await Announcement.findOne({ title: item.title })
      if (!exists) {
        await Announcement.create({
          title: item.title,
          message: item.message,
          dateLabel: item.dateLabel,
          isPublished: true,
          order: index,
        })
      }
    }
    console.log('✅ Announcements created')

    // Create gallery categories
    const galleryCategories = ['Events', 'Training', 'Competitions', 'Community']
    for (const catName of galleryCategories) {
      const exists = await GalleryCategory.findOne({ name: catName })
      if (!exists) {
        await GalleryCategory.create({
          name: catName,
          slug: catName.toLowerCase().replace(/\s+/g, '-'),
          order: galleryCategories.indexOf(catName),
          isVisible: true,
        })
      }
    }
    console.log('✅ Gallery categories created')

    // Create FAQ categories and FAQs
    const faqCategoryGeneral = await FAQCategory.findOneAndUpdate(
      { slug: 'general' },
      {
        name: 'General',
        slug: 'general',
        order: 1,
        isVisible: true,
      },
      { upsert: true, new: true }
    )

    const faqs = [
      {
        question: 'Who can participate in Team TEXAS programs?',
        answer:
          'Our programs are open to children and adults with special needs of all ability levels. We welcome anyone who wants to experience the joy of sports in a supportive, inclusive environment.',
        categoryId: faqCategoryGeneral._id,
        order: 1,
        isPublished: true,
      },
      {
        question: 'Do I need prior sports experience to join?',
        answer:
          'Not at all! Our programs are designed for all skill levels, from complete beginners to experienced athletes. Our coaches adapt activities to meet each participant where they are.',
        categoryId: faqCategoryGeneral._id,
        order: 2,
        isPublished: true,
      },
    ]

    for (const faqData of faqs) {
      const exists = await FAQ.findOne({
        question: faqData.question,
        categoryId: faqData.categoryId,
      })
      if (!exists) {
        await FAQ.create(faqData)
      }
    }
    console.log('✅ FAQs created')

    // Create founder team member
    const founderExists = await TeamMember.findOne({ name: 'Coach Johnson' })
    if (!founderExists) {
      await TeamMember.create({
        name: 'Coach Johnson',
        role: 'Founder, President & Coach',
        bio: 'With over 15 years of experience in adaptive sports, Coach Johnson founded Team TEXAS with a vision to create truly inclusive sports opportunities for everyone. (This is editable placeholder content - please update with actual founder information)',
        photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
        photoAlt: 'Coach Johnson smiling',
        order: 1,
        isFeatured: true,
        isPublished: true,
      })
      console.log('✅ Team member created')
    }

    // Create sample testimonial (unpublished draft)
    const testimonialExists = await Testimonial.findOne({ personName: 'Sample Parent' })
    if (!testimonialExists) {
      await Testimonial.create({
        personName: 'Sample Parent',
        relationship: 'Parent of Athlete',
        quote:
          'This is a sample testimonial. Please add real testimonials from actual families through the admin panel.',
        isPublished: false,
        isFeatured: false,
        order: 1,
      })
      console.log('✅ Sample testimonial created (unpublished)')
    }

    // Create sample pricing plan
    const pricingExists = await PricingPlan.findOne({ slug: 'contact-for-pricing' })
    if (!pricingExists) {
      await PricingPlan.create({
        name: 'Program Registration',
        slug: 'contact-for-pricing',
        priceText: 'Contact Us',
        billingLabel: 'for current program details',
        description: 'Get in touch to learn about program availability, schedules, and pricing.',
        features: [
          'Personalized program recommendations',
          'Flexible scheduling options',
          'Family support services',
          'All equipment provided',
        ],
        ctaText: 'Contact Us',
        ctaUrl: '/contact',
        isVisible: true,
        order: 1,
      })
      console.log('✅ Pricing plan created')
    }

    console.log('🎉 Seed completed successfully!')
    console.log(`\n📧 Admin Email: ${adminEmail}`)
    console.log(`🔑 Admin Password: ${adminPassword}`)
    console.log('\n🚀 You can now run: npm run dev')
    console.log('🔐 Admin login: http://localhost:3000/admin/login\n')

    process.exit(0)
  } catch (error) {
    console.error('❌ Seed error:', error)
    process.exit(1)
  }
}

seed()
