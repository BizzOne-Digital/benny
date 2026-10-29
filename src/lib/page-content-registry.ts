/**
 * Editable text/images for the public pages that have fixed layouts.
 * Defaults here MUST match the original copy so the site looks unchanged until an admin edits it.
 * Pure data — safe for client and server.
 */
export type ContentField = {
  key: string
  label: string
  type: 'text' | 'textarea' | 'image'
  default: string
}

export type ContentPage = {
  slug: string
  name: string
  path: string
  fields: ContentField[]
}

const hero = (title: string, subtitle: string, image?: string): ContentField[] => [
  { key: 'hero.title', label: 'Page title', type: 'text', default: title },
  { key: 'hero.subtitle', label: 'Page subtitle', type: 'textarea', default: subtitle },
  ...(image
    ? [{ key: 'hero.image', label: 'Banner background image', type: 'image' as const, default: image }]
    : []),
]

export const CONTENT_PAGES: ContentPage[] = [
  {
    slug: 'home',
    name: 'Home',
    path: '/',
    fields: [
      { key: 'hero.image', label: 'Hero background image', type: 'image', default: '/hero-bg.png' },
      { key: 'intro.title1', label: 'Intro heading (line 1)', type: 'text', default: 'MORE THAN' },
      { key: 'intro.title2', label: 'Intro heading (line 2, red)', type: 'text', default: 'A GAME.' },
      {
        key: 'intro.text',
        label: 'Intro text',
        type: 'textarea',
        default: 'We create a place to belong, grow and celebrate every victory.',
      },
      { key: 'intro.image1', label: 'Intro image 1', type: 'image', default: '/home-1.png' },
      { key: 'intro.image2', label: 'Intro image 2', type: 'image', default: '/home-2.png' },
      { key: 'cta.title', label: 'Bottom banner heading', type: 'text', default: 'READY TO PLAY?' },
      {
        key: 'cta.text',
        label: 'Bottom banner text',
        type: 'textarea',
        default: 'Join Team Texas and give your athlete the opportunity to grow, compete and thrive.',
      },
      { key: 'cta.image', label: 'Bottom banner background image', type: 'image', default: '/hero-bg.png' },
    ],
  },
  {
    slug: 'about',
    name: 'About',
    path: '/about',
    fields: [
      ...hero('OUR STORY', 'Building a community where every athlete belongs', '/home-6.png'),
      { key: 'mission.title', label: 'Mission heading', type: 'text', default: 'Our Mission' },
      {
        key: 'mission.text',
        label: 'Mission text',
        type: 'textarea',
        default:
          'To provide every special needs child or adult the opportunity to play sports in a safe, supportive, and joyful environment where abilities are celebrated and friendships flourish.',
      },
      { key: 'story1.title', label: 'Story block 1 heading', type: 'text', default: 'Where Every Ability Shines' },
      {
        key: 'story1.p1',
        label: 'Story block 1 paragraph 1',
        type: 'textarea',
        default:
          "Team TEXAS Special Needs was founded on a simple belief: everyone deserves their moment to play. We've built a community where children and adults with special needs can experience the joy of sports in an environment designed for their success.",
      },
      {
        key: 'story1.p2',
        label: 'Story block 1 paragraph 2',
        type: 'textarea',
        default:
          "Through adaptive sports programs, we're not just teaching skills—we're building confidence, creating lifelong friendships, and celebrating every victory, big or small.",
      },
      { key: 'story1.image', label: 'Story block 1 image', type: 'image', default: '/home-1.png' },
      { key: 'story2.title', label: 'Story block 2 heading', type: 'text', default: 'A Community Built on Support' },
      {
        key: 'story2.p1',
        label: 'Story block 2 paragraph 1',
        type: 'textarea',
        default:
          'Our programs are led by dedicated coaches and volunteers who understand that every athlete is unique. We adapt activities to meet individual needs while fostering teamwork and sportsmanship.',
      },
      {
        key: 'story2.p2',
        label: 'Story block 2 paragraph 2',
        type: 'textarea',
        default:
          'From basketball and soccer to community sports days, we create experiences that bring families together and build lasting memories.',
      },
      { key: 'story2.image', label: 'Story block 2 image', type: 'image', default: '/home-2.png' },
      { key: 'programs.title', label: 'Programs heading', type: 'text', default: 'Our Programs' },
      {
        key: 'programs.subtitle',
        label: 'Programs subtitle',
        type: 'text',
        default: 'Discover the adaptive sports programs that make Team TEXAS special',
      },
      { key: 'programs.image1', label: 'Program card 1 image', type: 'image', default: '/home-3.png' },
      { key: 'programs.image2', label: 'Program card 2 image', type: 'image', default: '/home-4.png' },
      { key: 'programs.image3', label: 'Program card 3 image', type: 'image', default: '/home-5.png' },
      { key: 'cta.title', label: 'Bottom banner heading', type: 'text', default: 'Join Our Team' },
      {
        key: 'cta.text',
        label: 'Bottom banner text',
        type: 'textarea',
        default:
          "Whether you're looking to register an athlete, volunteer, or support our mission, we'd love to have you as part of the Team TEXAS family.",
      },
    ],
  },
  {
    slug: 'services',
    name: 'Programs / Services page',
    path: '/services',
    fields: hero(
      'THE PROGRAMS WE OFFER',
      'Team TEXAS Special Needs offers inclusive leagues and unified teams—helping every player belong, grow, and play.',
      '/hero-bg.png'
    ),
  },
  {
    slug: 'testimonials',
    name: 'Testimonials',
    path: '/testimonials',
    fields: hero(
      'STORIES FROM OUR TEAM',
      'Hear from the families and athletes who make Team TEXAS special',
      '/home-6.png'
    ),
  },
  {
    slug: 'faq',
    name: 'FAQ',
    path: '/faq',
    fields: hero('Frequently Asked Questions', 'Find answers to common questions about our programs'),
  },
  {
    slug: 'sponsors',
    name: 'Sponsors',
    path: '/sponsors',
    fields: [
      ...hero('Our Sponsors', 'Thank you to the businesses and neighbors who help every athlete play.'),
      { key: 'cta.title', label: 'Become a sponsor heading', type: 'text', default: 'Become a Sponsor' },
      {
        key: 'cta.text',
        label: 'Become a sponsor text',
        type: 'textarea',
        default:
          'Your support helps children and adults with special needs enjoy sports, make friends and build confidence. Contact us to learn how your business can join our team of sponsors.',
      },
    ],
  },
  { slug: 'team', name: 'Team', path: '/team', fields: hero('Our Team', 'Meet the passionate people making a difference in our community') },
  { slug: 'shop', name: 'Shop', path: '/shop', fields: hero('Shop', 'Support Team TEXAS with official merchandise') },
  {
    slug: 'pricing',
    name: 'Pricing',
    path: '/pricing',
    fields: hero('Pricing', 'Affordable programs designed to be accessible for all families'),
  },
  { slug: 'blog', name: 'Blog', path: '/blog', fields: hero('Blog & News', 'Stay up to date with the latest from Team TEXAS') },
  {
    slug: 'contact',
    name: 'Contact',
    path: '/contact',
    fields: hero('Get in Touch', "Have questions? Want to get involved? We'd love to hear from you!"),
  },
]
