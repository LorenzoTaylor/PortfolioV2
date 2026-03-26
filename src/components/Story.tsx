import { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValueEvent } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { DottedMapSVG } from '@/components/ui/dotted-map'
import jamaica1 from '@/assets/jamaica1.png'
import jamaica2 from '@/assets/jamaica2.png'
import jamaica3 from '@/assets/jamaica3.png'
import nyc1 from '@/assets/nyc1.png'
import sf1 from '@/assets/sf1.jpg'
import sf2 from '@/assets/sf2.png'
import sf3 from '@/assets/sf3.png'

const CHAPTERS = [
  {
    id: 'jamaica',
    title: 'Carterwood, Jamaica',
    subtitle: 'Where it started.',
    blurb:
      'Grew up surrounded by music, warmth, and hustle. The island shaped how I see the world resourceful, curious, and always finding the rhythm in the chaos.',
    marker: { x: 32.5, y: 29.4 },
    photos: [
      { id: 1, bg: 'bg-zinc-300 dark:bg-zinc-700', src: jamaica1 },
      { id: 2, bg: 'bg-zinc-200 dark:bg-zinc-600', src: jamaica2, horizontal: true },
      { id: 3, bg: 'bg-zinc-100 dark:bg-zinc-500', src: jamaica3, horizontal: true },
    ],
  },
  {
    id: 'nyc',
    title: 'New York City',
    subtitle: 'The grind.',
    blurb:
      'Coming from Jamaica it was a huge culture shock (as you can see below that was my first NYC winter) but I thrived in the energy and diversity. It’s where I discovered my passion for building and made my first projects.',
    marker: { x: 33.5, y: 20.8 },
    photos: [
      { id: 1, bg: 'bg-zinc-300 dark:bg-zinc-700', src: nyc1, vertical: true },
    ],
  },
  {
    id: 'sf',
    title: 'San Francisco',
    subtitle: 'Now.',
    blurb:
      'Moved here to study computer science at University of San Francisco and fell in love with the city. Love the food and most of all getting to build awesome things each day.',
    marker: { x: 16.0, y: 21.65 },
    photos: [
      { id: 1, bg: 'bg-zinc-300 dark:bg-zinc-700', src: sf1 },
      { id: 2, bg: 'bg-zinc-200 dark:bg-zinc-600', src: sf2 },
      { id: 3, bg: 'bg-zinc-100 dark:bg-zinc-500', src: sf3, horizontal: true },
    ],
  },
]

const ZOOM = 3.2
const VW = 119
const VH = 60

const TRANSFORMS = CHAPTERS.map(c => ({
  scale: ZOOM,
  xPct: ZOOM * (0.5 - c.marker.x / VW) * 100,
  yPct: ZOOM * (0.5 - c.marker.y / VH) * 100,
}))

// ─── PhotoBento ──────────────────────────────────────────────────────────────

interface PhotoGridProps {
  photos: { id: number; bg: string; src?: string; horizontal?: boolean; vertical?: boolean }[]
}

function PhotoBento({ photos }: PhotoGridProps) {
  const count = photos.length

  const imgClass = 'w-full h-full object-cover object-center'

  if (count === 1) {
    const p = photos[0]
    if (p.vertical) {
      return (
        <div className="flex justify-start">
          <motion.div
            className={`w-[52%] h-[39vh] rounded-xl overflow-hidden ${p.bg}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {p.src && <img src={p.src} alt="" className={imgClass} />}
          </motion.div>
        </div>
      )
    }
    return (
      <motion.div
        className={`w-full h-[39vh] rounded-xl overflow-hidden ${p.bg}`}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {p.src && <img src={p.src} alt="" className={imgClass} />}
      </motion.div>
    )
  }

  if (count === 2) {
    return (
      <div className="flex w-full" style={{ gap: '10px' }}>
        {photos.map((p, i) => (
          <motion.div
            key={p.id}
            className={`flex-1 h-[39vh] rounded-xl overflow-hidden ${p.bg}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
          >
            {p.src && <img src={p.src} alt="" className={imgClass} />}
          </motion.div>
        ))}
      </div>
    )
  }

  // 3 photos — left tall (vertical), right stacked (two)
  return (
    <div className="flex w-full h-[45vh]" style={{ gap: '10px' }}>
      <motion.div
        className={`w-[48%] h-full min-h-50 rounded-xl overflow-hidden ${photos[0].bg}`}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {photos[0].src && <img src={photos[0].src} alt="" className={imgClass} />}
      </motion.div>
      <div className="flex flex-col flex-1 h-full" style={{ gap: '10px' }}>
        {photos.slice(1).map((p, i) => (
          <motion.div
            key={p.id}
            className={`flex-1 rounded-xl overflow-hidden ${p.bg}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: (i + 1) * 0.07 }}
          >
            {p.src && <img src={p.src} alt="" className={imgClass}/>}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── ScrollDownBadge ──────────────────────────────────────────────────────────

function ScrollDownBadge() {
  return (
    <div
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono text-zinc-400 dark:text-zinc-500 select-none"
      style={{
        background: 'linear-gradient(#fafafa, #fafafa) padding-box, conic-gradient(from var(--shine-angle), transparent 20%, rgba(160,160,160,0.6) 40%, transparent 60%) border-box',
        border: '1px solid transparent',
        animation: 'shine-rotate 2.5s linear infinite',
      }}
    >
      scroll down
      <ChevronDown size={10} />
    </div>
  )
}

// dark version override — swap bg colour
function ScrollDownBadgeDark() {
  return (
    <div
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono text-zinc-500 select-none"
      style={{
        background: 'linear-gradient(#09090b, #09090b) padding-box, conic-gradient(from var(--shine-angle), transparent 20%, rgba(161,161,170,0.7) 40%, transparent 60%) border-box',
        border: '1px solid transparent',
        animation: 'shine-rotate 2.5s linear infinite',
      }}
    >
      scroll down
      <ChevronDown size={10} />
    </div>
  )
}

function ShineBadge() {
  return (
    <>
      <span className="dark:hidden"><ScrollDownBadge /></span>
      <span className="hidden dark:inline-flex"><ScrollDownBadgeDark /></span>
    </>
  )
}

// ─── ChapterPanel ─────────────────────────────────────────────────────────────

interface ChapterPanelProps {
  chapter: (typeof CHAPTERS)[number]
  index: number
  isFirst?: boolean
  mobile?: boolean
}

function ChapterPanel({ chapter, index, isFirst, mobile }: ChapterPanelProps) {
  return (
    <motion.div
      key={chapter.id}
      className={`absolute inset-0 flex flex-col ${mobile ? 'justify-end pb-6 px-5' : 'justify-center px-8 lg:px-14'}`}
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className={`font-mono text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.22em] ${mobile ? 'text-[9px] mb-2' : 'text-[10px] mb-3'}`}>
        {String(index + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')}
      </p>

      <div className="flex items-center justify-between gap-2">
        <h2 className={`font-bold text-zinc-900 dark:text-zinc-50 leading-tight ${mobile ? 'text-lg mb-0.5' : 'text-2xl lg:text-[28px]'}`}>
          {chapter.title}
        </h2>
        {isFirst && !mobile && <ShineBadge />}
      </div>
      <p className={`font-medium text-zinc-400 dark:text-zinc-500 ${mobile ? 'text-sm mb-2' : 'text-base mb-5'}`}>
        {chapter.subtitle}
      </p>

      <p className={`text-zinc-500 dark:text-zinc-400 leading-relaxed ${mobile ? 'text-xs mb-4 line-clamp-2' : 'text-sm max-w-[300px] mb-10'}`}>
        {chapter.blurb}
      </p>

      <AnimatePresence mode="wait">
        <PhotoBento key={chapter.id} photos={chapter.photos} />
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Story ────────────────────────────────────────────────────────────────────

export function Story() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeChapter, setActiveChapter] = useState(0)
  const snapIndexRef = useRef(0)
  const isAnimatingRef = useRef(false)
  const touchStartY = useRef(0)

  const SNAP_COUNT = CHAPTERS.length // 3 chapters → indices 0,1,2

  const scrollToSnap = useCallback((index: number) => {
    const el = sectionRef.current
    if (!el) return
    const clamped = Math.max(0, Math.min(SNAP_COUNT - 1, index))
    if (clamped === snapIndexRef.current && isAnimatingRef.current) return
    snapIndexRef.current = clamped
    isAnimatingRef.current = true

    // Each chapter occupies 1/(SNAP_COUNT-1) of the scrollable range
    // scrollable range = el.scrollHeight - viewport height
    const scrollableHeight = el.scrollHeight - window.innerHeight
    const targetScroll = el.offsetTop + (clamped / (SNAP_COUNT - 1)) * scrollableHeight

    window.scrollTo({ top: targetScroll, behavior: 'smooth' })

    // Release lock after scroll animation completes
    setTimeout(() => {
      isAnimatingRef.current = false
    }, 850)
  }, [SNAP_COUNT])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const handleWheel = (e: WheelEvent) => {
      // Check if the section is in the viewport and sticky
      const rect = el.getBoundingClientRect()
      const sectionTop = rect.top
      const sectionBottom = rect.bottom

      // Only hijack scroll when we're inside the story section
      if (sectionTop > 0 || sectionBottom < window.innerHeight) return

      if (isAnimatingRef.current) {
        e.preventDefault()
        return
      }

      const direction = e.deltaY > 0 ? 1 : -1
      const nextIndex = snapIndexRef.current + direction

      // Let normal scroll take over if going past boundaries
      if (nextIndex < 0 || nextIndex >= SNAP_COUNT) return

      e.preventDefault()
      scrollToSnap(nextIndex)
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      const rect = el.getBoundingClientRect()
      if (rect.top > 0 || rect.bottom < window.innerHeight) return

      if (isAnimatingRef.current) {
        e.preventDefault()
        return
      }

      const deltaY = touchStartY.current - e.touches[0].clientY
      if (Math.abs(deltaY) < 30) return // threshold to avoid accidental triggers

      const direction = deltaY > 0 ? 1 : -1
      const nextIndex = snapIndexRef.current + direction

      if (nextIndex < 0 || nextIndex >= SNAP_COUNT) return

      e.preventDefault()
      scrollToSnap(nextIndex)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [scrollToSnap, SNAP_COUNT])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const rawProgress = useTransform(scrollYProgress, [0, 1], [0, 2])
  const smoothProgress = useSpring(rawProgress, { stiffness: 60, damping: 18 })

  useMotionValueEvent(scrollYProgress, 'change', v => {
    const next = v < 0.34 ? 0 : v < 0.67 ? 1 : 2
    snapIndexRef.current = next
    setActiveChapter(prev => (prev !== next ? next : prev))
  })

  const mapScale = useTransform(smoothProgress, [0, 1, 2], TRANSFORMS.map(t => t.scale))
  const mapXPct = useTransform(smoothProgress, [0, 1, 2], TRANSFORMS.map(t => t.xPct))
  const mapYPct = useTransform(smoothProgress, [0, 1, 2], TRANSFORMS.map(t => t.yPct))

  const mapXStr = useTransform(mapXPct, v => `${v}%`)
  const mapYStr = useTransform(mapYPct, v => `${v}%`)

  const allMarkers = useMemo(
    () => CHAPTERS.map(c => ({ x: c.marker.x, y: c.marker.y })),
    []
  )

  const mapMotion = (
    <motion.div
      className="w-full h-full"
      style={{ scale: mapScale, x: mapXStr, y: mapYStr }}
    >
      <DottedMapSVG markers={allMarkers} dotColor="rgba(120,120,120,0.35)" />
    </motion.div>
  )

  return (
    <>
      <div className="px-6 md:px-12 lg:px-24 pt-24 pb-10 bg-zinc-50 dark:bg-zinc-950">
        <p className="font-mono text-xs text-zinc-400 dark:text-zinc-600 mb-2">~/life</p>
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Story
        </h2>
      </div>

    <div ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">

        {/* ── Mobile layout: map top, content bottom ─────────── */}
        <div className="flex flex-col h-full md:hidden">
          {/* Map — top 45% */}
          <div className="relative overflow-hidden bg-white dark:bg-black" style={{ height: '45%' }}>
            <div
              className="absolute inset-0 z-10 pointer-events-none dark:hidden"
              style={{ background: 'radial-gradient(ellipse at center, transparent 20%, rgba(255,255,255,0.92) 100%)' }}
            />
            <div
              className="absolute inset-0 z-10 pointer-events-none hidden dark:block"
              style={{ background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.9) 100%)' }}
            />
            {mapMotion}
          </div>

          {/* Content — bottom 55% */}
          <div className="relative overflow-hidden bg-zinc-50 dark:bg-zinc-950 border-t border-black/[0.06] dark:border-white/[0.04]" style={{ height: '55%' }}>
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-[2px] bg-black/10 dark:bg-white/10 origin-top"
              style={{ scaleY: scrollYProgress }}
            />
            <AnimatePresence mode="wait">
              <ChapterPanel
                key={CHAPTERS[activeChapter].id}
                chapter={CHAPTERS[activeChapter]}
                index={activeChapter}
                isFirst={activeChapter === 0}
                mobile
              />
            </AnimatePresence>
            {/* Chapter dots */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2.5">
              {CHAPTERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSnap(i)}
                  className="w-4 h-4 flex items-center justify-center cursor-pointer"
                  aria-label={`Go to chapter ${i + 1}`}
                >
                  <div
                    className="w-1 h-1 rounded-full transition-all duration-300"
                    style={{
                      background: 'currentColor',
                      opacity: activeChapter === i ? 1 : 0.2,
                      transform: `scale(${activeChapter === i ? 1.5 : 1})`,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Desktop layout: map left, content right ─────────── */}
        <div className="hidden md:flex h-full">
          {/* Map */}
          <div className="relative w-[55%] h-full overflow-hidden bg-white dark:bg-black flex items-center justify-center">
            <div
              className="absolute inset-0 z-10 pointer-events-none dark:hidden"
              style={{ background: 'radial-gradient(ellipse at center, transparent 20%, rgba(255,255,255,0.92) 100%)' }}
            />
            <div
              className="absolute inset-0 z-10 pointer-events-none hidden dark:block"
              style={{ background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.9) 100%)' }}
            />
            {mapMotion}
            <div className="absolute bottom-8 left-8 z-20">
              <p className="text-[10px] font-mono text-zinc-300 dark:text-zinc-700 uppercase tracking-[0.2em]">
                journey
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="relative w-[45%] h-full border-l border-black/[0.06] dark:border-white/[0.04] bg-zinc-50 dark:bg-zinc-950">
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-[1px] bg-black/10 dark:bg-white/10 origin-top"
              style={{ scaleY: scrollYProgress }}
            />
            <AnimatePresence mode="wait">
              <ChapterPanel
                key={CHAPTERS[activeChapter].id}
                chapter={CHAPTERS[activeChapter]}
                index={activeChapter}
                isFirst={activeChapter === 0}
              />
            </AnimatePresence>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3">
              {CHAPTERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSnap(i)}
                  className="w-5 h-5 flex items-center justify-center cursor-pointer"
                  aria-label={`Go to chapter ${i + 1}`}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                    style={{
                      background: 'currentColor',
                      opacity: activeChapter === i ? 1 : 0.2,
                      transform: `scale(${activeChapter === i ? 1.4 : 1})`,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  )
}
