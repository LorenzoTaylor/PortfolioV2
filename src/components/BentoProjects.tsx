import { useNavigate } from 'react-router-dom'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { BentoGrid } from '@/registry/magicui/bento-grid'
import { PROJECTS } from '@/data/projects'

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      onClick={() => navigate(`/projects/${project.slug}`)}
      className={cn(
        // Magic UI BentoCard base
        'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl cursor-pointer',
        // light
        'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
        // dark — the signature inset glow at bottom
        'transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
        project.colSpan,
      )}
    >
      {/* Background: project screenshot or video with mask fade */}
      <div className="absolute inset-0 overflow-hidden">
        {project.videoUrl ? (
          <video
            src={project.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-top scale-100 transition-transform duration-500 ease-out group-hover:scale-[1.04] [mask-image:linear-gradient(to_bottom,#000_30%,transparent_100%)]"
          />
        ) : (
          <img
            src={project.images[0]}
            alt=""
            aria-hidden
            className="w-full h-full object-cover object-top scale-100 transition-transform duration-500 ease-out group-hover:scale-[1.04] [mask-image:linear-gradient(to_bottom,#000_30%,transparent_100%)]"
          />
        )}
      </div>

      {/* Content — slides up on hover */}
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10 mt-auto">
        <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 tabular-nums mb-1">
          {project.year}
        </span>
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
          {project.title}
        </h3>
        <p className="max-w-xs text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {project.shortDesc}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/60"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* CTA — slides in from bottom on hover */}
      <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-10">
        <span className="pointer-events-auto flex items-center gap-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300">
          View project
          <ArrowRightIcon className="h-4 w-4" />
        </span>
      </div>

      {/* Hover overlay tint */}
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </motion.div>
  )
}

export function BentoProjects() {
  return (
    <section id="projects" className="px-6 md:px-12 lg:px-24 py-24 pb-32">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-xs text-zinc-400 dark:text-zinc-600 mb-2">~/work</p>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Projects
          </h2>
        </div>
        <BentoGrid>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
