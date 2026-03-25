import gitGardenGif from '@/assets/gitgarden-preview.gif'
import gitGarden1 from '@/assets/GitGarden1.png'
import herewith from '@/assets/Herewith.png'
import herewith1 from '@/assets/Herewith1.png'
import herewith2 from '@/assets/Herewith2.png'
import renumerate from '@/assets/Renumerate.png'
import renumerate1 from '@/assets/Renumerate1.png'
import renumerate2 from '@/assets/Renumerate2.png'
import renumerate3 from '@/assets/Renumerate3.png'
import youtube from '@/assets/Youtube.png'
import youtube1 from '@/assets/Youtube1.png'
import youtube3 from '@/assets/Youtube3.png'

export type Project = {
  slug: string
  title: string
  year: string
  shortDesc: string
  role: string
  description: string
  technicalWriteup: string
  stack: string[]
  images: string[]
  videoUrl?: string   // shown at top of screenshots in detail page
  colSpan: string
  href?: string
  repo?: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'gitgarden',
    title: 'GitGarden',
    year: '2026',
    shortDesc: 'GitHub activity as a living pixel-art character in your README.',
    role: 'Solo Developer',
    description:
      'Turn your GitHub activity into a living pixel-art character that lives in your README. Design a sprite, grab one embed URL, and it updates automatically as you ship code. No extensions or GitHub apps needed.',
    technicalWriteup:
      'Backend is Rust with Axum and PostgreSQL. I used SQLx for compile-time verified queries which I genuinely love because if the query doesnt match the schema it wont even compile. Sprite rendering is all server-side, layers from a sprite sheet get alpha-composited onto a background GIF frame by frame with stats text baked in using a pixel font. GitHub data comes from their GraphQL API and gets cached in memory so I stay within rate limits. The final card is an animated GIF that also gets cached. Frontend is React and TypeScript with Vite and Tailwind. I built a real-time character creator so you can preview your sprite live, save multiple outfits, and grab your embed code. Frontend is on Vercel, backend on Railway, and GitHub Actions runs lint, type checks, and tests on every PR.',
    stack: ['Rust', 'Axum', 'PostgreSQL', 'SQLx', 'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'GitHub GraphQL API'],
    images: [gitGardenGif, gitGarden1],
    videoUrl: '/gitgarden-creator.mov',
    colSpan: 'col-span-3 lg:col-span-2',
    href: 'https://trygitgarden.com',
    repo: 'https://github.com/LorenzoTaylor/GitGarden',
  },
  {
    slug: 'herewith',
    title: 'Herewith',
    year: '2024',
    shortDesc: 'In-home senior care marketplace, families find vetted caregivers directly.',
    role: 'Full Stack Engineer',
    description:
      'A marketplace connecting families with background-checked caregivers for in-home senior care. No agency contracts, no minimum hours. Families pay less, caregivers earn more. Covers the full care lifecycle from caregiver discovery and vetting to shift scheduling, in-app messaging, and payments. Services range from companion and memory care to meal prep and 24-hour live-in.',
    technicalWriteup:
      'I built all the frontend for herewith.com and helped with networking on their mobile app. Stack was TypeScript and React on the frontend, Node.js on the backend with PostgreSQL and REST APIs powering everything.',
    stack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'REST API'],
    images: [herewith, herewith1, herewith2],
    colSpan: 'col-span-3 lg:col-span-1',
    href: 'https://herewith.com',
  },
  {
    slug: 'youtube-clone',
    title: 'YouTube Clone',
    year: '2024',
    shortDesc: 'Video platform clone with live YouTube API data, search, and channel pages.',
    role: 'Solo Developer',
    description:
      'A YouTube clone I built to get comfortable with third-party APIs and real-world data. Browse, search, and watch videos with live data from the YouTube API. The main challenge was handling the YouTube API response shape, lots of nesting and inconsistent fields depending on the endpoint.',
    technicalWriteup:
      'Used Rapid API to proxy YouTube data and Axios for fetching. UI is Material UI because I wanted to stay close to YouTube\'s actual layout. The main thing I took away from this was learning how to structure a component tree around data that comes in different shapes. Video results, channel info, and related videos all have slightly different schemas so figuring out how to handle that cleanly was the real challenge.',
    stack: ['React', 'Material UI', 'Axios', 'Rapid API'],
    images: [youtube, youtube1, youtube3],
    colSpan: 'col-span-3 lg:col-span-1',
    href: 'https://dynamic-tapioca-4e369d.netlify.app/',
    repo: 'https://github.com/LorenzoTaylor/youtube',
  },
  {
    slug: 'renumerate',
    title: 'Renumerate',
    year: '2025',
    shortDesc: 'Subscription retention infrastructure that helps reduce churn with smart cancellation flows.',
    role: 'Founding Engineer',
    description:
      'Helps subscription businesses reduce churn. Merchants embed a cancellation flow, collect exit survey data, and trigger winback campaigns without writing any backend logic. When a customer tries to cancel we intercept with a branded retention flow, collect survey data, and kick off winback campaigns. Merchants embed the SDK and thats it.',
    technicalWriteup:
      'I was the first engineer on the team and worked directly with our CTO building features end to end. The SDK talks via PostMessage and REST to a multi-AZ Rust backend on AWS, routed across four subdomains for the dashboard, cancellation flow, subscription portal, and external API. SQLx handles compile-time verified queries against RDS PostgreSQL 15. We built a background job queue that handles retention events, winback emails, AI survey analysis, and analytics exports. Frontend is Astro and React with TypeScript types generated from Rust structs so theres full type safety end to end which honestly made shipping way faster. Feature flags go through Statsig, email through Postmark and Resend.',
    stack: ['Rust', 'Axum', 'AWS', 'PostgreSQL', 'SQLx', 'Astro', 'React', 'TypeScript', 'Stripe', 'Recurly'],
    images: [renumerate1, renumerate, renumerate2, renumerate3],
    colSpan: 'col-span-3 lg:col-span-2',
    href: 'https://renumerate.com',
  },
]
