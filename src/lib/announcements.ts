export type SpecialAnnouncement = {
  id: string
  title: string
  message: string
  /** ISO date string or display label */
  dateLabel?: string
}

/**
 * Special announcements shown on the home page.
 * Update this list or move to CMS when ready.
 */
export const SPECIAL_ANNOUNCEMENTS: SpecialAnnouncement[] = [
  {
    id: 'registration-open',
    title: 'League registration is open',
    message:
      'Sign up for Baseball, Softball, Bowling, Basketball, Soccer, Flag Football, Kickball, and Unified programs. Download your league registration and background forms below.',
    dateLabel: 'Spring 2026',
  },
  {
    id: 'unified-partners',
    title: 'Youth partners needed',
    message:
      'Unified Baseball, Softball, Basketball, Soccer, and Kickball need youth player partners ages 11–18. Contact us to learn how to get involved.',
    dateLabel: 'Ongoing',
  },
]
