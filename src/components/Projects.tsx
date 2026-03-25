import { motion } from 'motion/react'
import { ExternalLink, GitBranch } from 'lucide-react'

const PROJECTS = [
  {
    path: '~/projects/synthwave-ui',
    branch: 'main',
    description: 'A component library built on top of Radix UI with animated primitives and a dark-first design system.',
    stack: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    lines: [
      { prompt: '$', cmd: 'npm run dev', out: null },
      { prompt: '>', cmd: null, out: 'ready on http://localhost:5173' },
      { prompt: '$', cmd: 'git log --oneline -3', out: null },
      { prompt: null, cmd: null, out: 'a3f92c1 feat: add motion blur on scroll' },
      { prompt: null, cmd: null, out: '8d1e047 fix: dark mode flicker on mount' },
      { prompt: null, cmd: null, out: '2b9f3a4 chore: upgrade tailwind v4' },
    ],
    href: '#',
    repo: '#',
    accent: 'from-violet-500/10 to-transparent',
    dot: 'bg-violet-400',
  },
  {
    path: '~/projects/renumerate',
    branch: 'feat/parser',
    description: 'CLI tool that auto-renumbers ordered markdown lists. Piped directly into your editor workflow.',
    stack: ['Node.js', 'TypeScript', 'Commander.js'],
    lines: [
      { prompt: '$', cmd: 'renumerate ./README.md', out: null },
      { prompt: '>', cmd: null, out: '✓ renumbered 14 items across 3 lists' },
      { prompt: '$', cmd: 'cat README.md | grep "^[0-9]"', out: null },
      { prompt: null, cmd: null, out: '1. Install dependencies' },
      { prompt: null, cmd: null, out: '2. Configure your editor' },
      { prompt: null, cmd: null, out: '3. Run on save' },
    ],
    href: '#',
    repo: '#',
    accent: 'from-emerald-500/10 to-transparent',
    dot: 'bg-emerald-400',
  },
  {
    path: '~/projects/infilla',
    branch: 'main',
    description: 'Real estate platform connecting developers with infill lot opportunities. Full-stack with map integration.',
    stack: ['Next.js', 'Postgres', 'Prisma', 'Mapbox'],
    lines: [
      { prompt: '$', cmd: 'npx prisma db push', out: null },
      { prompt: '>', cmd: null, out: '✓ schema synced to database' },
      { prompt: '$', cmd: 'curl /api/lots?city=austin', out: null },
      { prompt: null, cmd: null, out: '{ "count": 312, "available": 47 }' },
      { prompt: '$', cmd: 'vercel deploy --prod', out: null },
      { prompt: '>', cmd: null, out: '✓ deployed to infilla.app' },
    ],
    href: '#',
    repo: '#',
    accent: 'from-sky-500/10 to-transparent',
    dot: 'bg-sky-400',
  },
  {
    path: '~/projects/hashira',
    branch: 'dev',
    description: 'Anime tracking app with a social layer. Log episodes, rate seasons, and see what your friends are watching.',
    stack: ['React Native', 'Expo', 'Supabase', 'AniList API'],
    lines: [
      { prompt: '$', cmd: 'expo start --tunnel', out: null },
      { prompt: '>', cmd: null, out: 'Metro waiting on exp://192.168.1.5:8081' },
      { prompt: '$', cmd: 'supabase db diff --use-migra', out: null },
      { prompt: null, cmd: null, out: 'alter table "watchlist" add column' },
      { prompt: null, cmd: null, out: '"episode_progress" integer default 0;' },
    ],
    href: '#',
    repo: '#',
    accent: 'from-rose-500/10 to-transparent',
    dot: 'bg-rose-400',
  },
]

function TrafficLights() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
      <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
      <span className="w-3 h-3 rounded-full bg-[#28c840]" />
    </div>
  )
}

function TerminalCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative flex flex-col rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm dark:shadow-none hover:border-zinc-300 dark:hover:border-zinc-600/70 dark:hover:shadow-[0_0_24px_rgba(161,161,170,0.07)] transition-all duration-300"
    >
      {/* subtle accent glow top-left */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60">
        <div className="flex items-center gap-3">
          <TrafficLights />
          <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 ml-1">
            {project.path}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-600">
          <GitBranch size={11} />
          <span className="text-xs font-mono">{project.branch}</span>
        </div>
      </div>

      {/* Terminal body */}
      <div className="flex-1 px-4 py-4 font-mono text-xs leading-relaxed space-y-0.5 min-h-[144px]">
        {project.lines.map((line, i) => (
          <div key={i} className="flex gap-2">
            {line.prompt && (
              <span className={`shrink-0 ${line.prompt === '$' ? 'text-zinc-400 dark:text-zinc-500' : 'text-emerald-500 dark:text-emerald-400'}`}>
                {line.prompt}
              </span>
            )}
            {line.cmd && (
              <span className="text-zinc-800 dark:text-zinc-200">{line.cmd}</span>
            )}
            {line.out && !line.cmd && !line.prompt && (
              <span className="text-zinc-500 dark:text-zinc-500 pl-4">{line.out}</span>
            )}
            {line.out && (line.cmd || line.prompt === '>') && (
              <span className="text-zinc-500 dark:text-zinc-500">{line.out}</span>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-zinc-100 dark:border-zinc-800 flex items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/60"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={project.repo}
            aria-label="View source"
            className="p-2 rounded-lg text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <svg viewBox="0 0 438.549 438.549" className="w-4 h-4" fill="currentColor">
              <path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z" />
            </svg>
          </a>
          <a
            href={project.href}
            aria-label="View live"
            className="p-2 rounded-lg text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="px-6 md:px-12 lg:px-24 py-24 pb-32">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p className="font-mono text-xs text-zinc-400 dark:text-zinc-600 mb-2">~/work</p>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Projects
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROJECTS.map((project, i) => (
            <TerminalCard key={project.path} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
