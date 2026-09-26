export type TeamTexasProgram = {
  id: string
  title: string
  description: string
  image: string
  highlights?: string[]
}

/** Programs offered by Team TEXAS Special Needs */
export const TEAM_TEXAS_PROGRAMS: TeamTexasProgram[] = [
  {
    id: 'baseball-softball',
    title: 'Baseball & Softball',
    description:
      'Baseball and softball by helping the player—skill-building, encouragement, and game-day fun tailored to each athlete.',
    image: '/home-3.png',
    highlights: ['Player-focused coaching', 'Adaptive skill development', 'Team camaraderie'],
  },
  {
    id: 'unified-baseball-softball',
    title: 'Unified Baseball & Softball',
    description:
      'Unified Baseball and Softball teams combine 5 special needs players with 5 youth player partners (ages 11–18) for inclusive competition and friendship.',
    image: '/home-3.png',
    highlights: [
      '5 special needs athletes + 5 youth partners per team',
      'Partners ages 11–18',
      'Inclusive league play',
    ],
  },
  {
    id: 'bowling',
    title: 'Bowling',
    description:
      'Bowling leagues and practices in a welcoming environment—great for coordination, social skills, and celebrating every strike and spare.',
    image: '/home-5.png',
    highlights: ['League and recreational options', 'All ability levels welcome'],
  },
  {
    id: 'basketball',
    title: 'Basketball & Unified Basketball',
    description:
      'High-energy basketball and Unified Basketball programs where athletes build skills, confidence, and teamwork on the court.',
    image: '/home-3.png',
    highlights: ['Traditional and Unified teams', 'Skill drills and game days'],
  },
  {
    id: 'soccer',
    title: 'Soccer & Unified Soccer',
    description:
      'Soccer and Unified Soccer programs focused on fun, fitness, and the love of the game—inclusive of every player on the field.',
    image: '/home-4.png',
    highlights: ['Soccer and Unified Soccer options', 'Modified play for accessibility'],
  },
  {
    id: 'flag-football',
    title: 'Flag Football',
    description:
      'Flag football with an emphasis on safety, teamwork, and excitement—every athlete gets their moment to run, catch, and score.',
    image: '/home-4.png',
    highlights: ['Non-contact format', 'Team spirit and sportsmanship'],
  },
  {
    id: 'kickball',
    title: 'Kickball & Unified Kickball',
    description:
      'Kickball and Unified Kickball bring classic playground fun to the league—easy to learn, joyful to play, and built for inclusion.',
    image: '/home-5.png',
    highlights: ['Kickball and Unified Kickball', 'Family-friendly atmosphere'],
  },
]
