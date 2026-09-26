export type RegistrationFormLink = {
  id: string
  title: string
  description: string
  /** Path under /public — add PDF files here when ready */
  href: string
  programSlug?: string
}

export const LEAGUE_REGISTRATION_FORMS: RegistrationFormLink[] = [
  {
    id: 'general-league',
    title: 'General League Registration',
    description: 'Primary registration form for all Team TEXAS Special Needs league programs.',
    href: '/forms/league-registration.pdf',
  },
  {
    id: 'baseball-softball',
    title: 'Baseball & Softball Registration',
    description: 'Registration for baseball and softball leagues.',
    href: '/forms/baseball-softball-registration.pdf',
    programSlug: 'baseball-softball',
  },
  {
    id: 'unified-baseball-softball',
    title: 'Unified Baseball & Softball Registration',
    description: 'Registration for unified teams (5 special needs players + 5 youth partners).',
    href: '/forms/unified-baseball-softball-registration.pdf',
    programSlug: 'unified-baseball-softball',
  },
  {
    id: 'bowling',
    title: 'Bowling Registration',
    description: 'Registration for bowling leagues.',
    href: '/forms/bowling-registration.pdf',
    programSlug: 'bowling',
  },
  {
    id: 'basketball',
    title: 'Basketball & Unified Basketball Registration',
    description: 'Registration for basketball and unified basketball.',
    href: '/forms/basketball-registration.pdf',
    programSlug: 'basketball',
  },
  {
    id: 'soccer',
    title: 'Soccer & Unified Soccer Registration',
    description: 'Registration for soccer and unified soccer.',
    href: '/forms/soccer-registration.pdf',
    programSlug: 'soccer',
  },
  {
    id: 'flag-football',
    title: 'Flag Football Registration',
    description: 'Registration for flag football leagues.',
    href: '/forms/flag-football-registration.pdf',
    programSlug: 'flag-football',
  },
  {
    id: 'kickball',
    title: 'Kickball & Unified Kickball Registration',
    description: 'Registration for kickball and unified kickball.',
    href: '/forms/kickball-registration.pdf',
    programSlug: 'kickball',
  },
]

export const BACKGROUND_FORMS: RegistrationFormLink[] = [
  {
    id: 'volunteer-background',
    title: 'Volunteer & Coach Background Check',
    description:
      'Required for coaches, volunteers, and youth partners. Please complete and return before the season starts.',
    href: '/forms/background-check.pdf',
  },
  {
    id: 'youth-partner',
    title: 'Youth Partner Registration',
    description: 'Registration and consent form for youth player partners (ages 11–18) in unified programs.',
    href: '/forms/youth-partner-registration.pdf',
  },
]

/** Default gallery images until photos are uploaded via admin or /public/uploads */
export const DEFAULT_GALLERY_IMAGES = [
  { src: '/home-1.png', alt: 'Team TEXAS athlete high-fiving coach' },
  { src: '/home-2.png', alt: 'Coach with Team TEXAS athlete outdoors' },
  { src: '/home-3.png', alt: 'Team TEXAS basketball program' },
  { src: '/home-4.png', alt: 'Team TEXAS soccer program' },
  { src: '/home-5.png', alt: 'Team TEXAS community sports' },
  { src: '/home-6.png', alt: 'Team TEXAS athlete celebrating with teammates' },
]
