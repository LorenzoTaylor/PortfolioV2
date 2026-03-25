import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

const PROJECTS = [
  {
    title: "synthwave-ui",
    description: "Dark-first animated component library built on Radix UI with Motion primitives. Ships with 30+ components.",
    stack: ["React", "TypeScript", "Motion"],
    accent: "from-violet-500/20 via-violet-500/5 to-transparent",
    border: "dark:hover:border-violet-500/40",
    glow: "dark:hover:shadow-[0_0_30px_rgba(139,92,246,0.12)]",
    href: "#",
    size: "tall",
  },
  {
    title: "infilla",
    description: "Real-estate platform for infill lot opportunities with Mapbox integration.",
    stack: ["Next.js", "Postgres", "Mapbox"],
    accent: "from-sky-500/20 via-sky-500/5 to-transparent",
    border: "dark:hover:border-sky-500/40",
    glow: "dark:hover:shadow-[0_0_30px_rgba(14,165,233,0.12)]",
    href: "#",
    size: "short",
  },
  {
    title: "hashira",
    description: "Anime tracking app with social features — log episodes, rate seasons, see what friends watch.",
    stack: ["React Native", "Expo", "Supabase"],
    accent: "from-rose-500/20 via-rose-500/5 to-transparent",
    border: "dark:hover:border-rose-500/40",
    glow: "dark:hover:shadow-[0_0_30px_rgba(244,63,94,0.12)]",
    href: "#",
    size: "short",
  },
  {
    title: "renumerate",
    description: "CLI that auto-renumbers ordered markdown lists. Pipes into your editor save workflow.",
    stack: ["Node.js", "TypeScript", "Commander"],
    accent: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    border: "dark:hover:border-emerald-500/40",
    glow: "dark:hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]",
    href: "#",
    size: "tall",
  },
  {
    title: "portfolio v2",
    description: "This site — built with Vite, React, Tailwind v4, Motion, and Magic UI components.",
    stack: ["Vite", "Tailwind v4", "Magic UI"],
    accent: "from-amber-500/20 via-amber-500/5 to-transparent",
    border: "dark:hover:border-amber-500/40",
    glow: "dark:hover:shadow-[0_0_30px_rgba(245,158,11,0.12)]",
    href: "#",
    size: "short",
  },
]

const TILT = 12
const SPRING = { stiffness: 300, damping: 30, mass: 0.5 }

function TiltCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [TILT, -TILT]), SPRING)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-TILT, TILT]), SPRING)
  const glowX = useTransform(mouseX, [-0.5, 0.5], [0, 100])
  const glowY = useTransform(mouseY, [-0.5, 0.5], [0, 100])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] }}
      style={{ perspective: 800 }}
      className={cn("w-full", project.size === "tall" ? "row-span-2" : "")}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn(
          "relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 cursor-default",
          "h-full min-h-[180px]",
          project.size === "tall" ? "min-h-[300px]" : "min-h-[160px]",
          "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900",
          "transition-[border-color,box-shadow] duration-300",
          project.border,
          project.glow,
          // light glassmorphic
          "backdrop-blur-sm",
          "[box-shadow:0_2px_12px_rgba(0,0,0,0.06)]",
        )}
      >
        {/* gradient overlay follows mouse */}
        <motion.div
          className={cn("pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300", project.accent)}
          style={{
            background: undefined,
            opacity: 0.6,
          }}
        />
        {/* static accent */}
        <div className={cn("absolute inset-0 rounded-2xl bg-gradient-to-br opacity-40", project.accent)} />

        {/* shimmer on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 hover:opacity-100"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
            ),
          }}
        />

        <div className="relative z-10 space-y-3">
          <h3 className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            ./{project.title}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="relative z-10 mt-4 flex items-end justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-zinc-200 dark:border-zinc-700/60 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-600 dark:text-zinc-400"
              >
                {s}
              </span>
            ))}
          </div>
          <a
            href={project.href}
            className="shrink-0 rounded-lg p-1.5 text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function MasonryProjects() {
  const col1 = PROJECTS.filter((_, i) => i % 2 === 0)
  const col2 = PROJECTS.filter((_, i) => i % 2 === 1)

  return (
    <section id="masonry" className="px-6 md:px-12 lg:px-24 py-24 pb-32">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-xs text-zinc-400 dark:text-zinc-600 mb-2">~/projects</p>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Masonry
          </h2>
        </div>

        {/* 2-col masonry via independent columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
          <div className="flex flex-col gap-4">
            {col1.map((p, i) => (
              <TiltCard key={p.title} project={p} index={i * 2} />
            ))}
          </div>
          <div className="flex flex-col gap-4 sm:mt-8">
            {col2.map((p, i) => (
              <TiltCard key={p.title} project={p} index={i * 2 + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
