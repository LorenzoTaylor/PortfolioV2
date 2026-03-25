import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const SESSION_KEY = 'portfolio_intro_seen'

type LineType = 'info' | 'prompt' | 'tip' | 'success' | 'muted'

interface Line {
  type: LineType
  text: string
}

const LINES: Line[] = [
  { type: 'muted',   text: 'Initializing portfolio...' },
  { type: 'prompt',  text: 'loading assets' },
  { type: 'muted',   text: 'reticulating splines' },
  { type: 'tip',     text: 'Pro tip: The S in IoT stands for Security.' },
  { type: 'info',    text: 'Found 0 vulnerabilities. (suspicious)' },
  { type: 'tip',     text: "It's not a bug, it's an undocumented feature." },
  { type: 'muted',   text: '7f3a2b1  fix: finally' },
  { type: 'success', text: 'Ready.' },
]

const CHAR_DELAY = 14
const LINE_PAUSE = 140
const DONE_PAUSE = 900

function lineColor(type: LineType) {
  if (type === 'prompt')  return 'text-white'
  if (type === 'tip')     return 'text-zinc-400'
  if (type === 'info')    return 'text-blue-400'
  if (type === 'success') return 'text-emerald-400'
  return 'text-zinc-600'
}

function linePrefix(type: LineType) {
  if (type === 'prompt')  return '› '
  if (type === 'success') return '✓ '
  if (type === 'info')    return '  '
  return '  '
}

interface Props {
  onDone: () => void
}

export function TerminalLoader({ onDone }: Props) {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [currentTyped, setCurrentTyped] = useState('')
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const dismissed = useRef(false)

  const dismiss = () => {
    if (dismissed.current) return
    dismissed.current = true
    sessionStorage.setItem(SESSION_KEY, '1')
    setDone(true)
  }

  useEffect(() => {
    const handleKey = () => dismiss()
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    if (done) {
      const t = setTimeout(onDone, 450)
      return () => clearTimeout(t)
    }
  }, [done, onDone])

  // Progress bar tracks how many lines are done
  useEffect(() => {
    setProgress((visibleLines.length / LINES.length) * 100)
  }, [visibleLines.length])

  useEffect(() => {
    let cancelled = false
    let lineIndex = 0
    let charIndex = 0
    let timeout: ReturnType<typeof setTimeout>

    const typeNext = () => {
      if (cancelled || dismissed.current) return

      if (lineIndex >= LINES.length) {
        timeout = setTimeout(() => {
          if (!cancelled) dismiss()
        }, DONE_PAUSE)
        return
      }

      const line = LINES[lineIndex]
      const full = linePrefix(line.type) + line.text

      if (charIndex < full.length) {
        charIndex++
        setCurrentTyped(full.slice(0, charIndex))
        timeout = setTimeout(typeNext, CHAR_DELAY)
      } else {
        setVisibleLines(prev => [...prev, `${line.type}|||${linePrefix(line.type)}${line.text}`])
        setCurrentTyped('')
        lineIndex++
        charIndex = 0
        timeout = setTimeout(typeNext, LINE_PAUSE)
      }
    }

    timeout = setTimeout(typeNext, 250)
    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={dismiss}
        >
          {/* Subtle radial glow behind the card */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[300px] rounded-full bg-white/[0.03] blur-3xl" />
          </div>

          <motion.div
            className="relative w-full max-w-[480px] rounded-xl overflow-hidden border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_32px_64px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-950 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                {/* Vercel-style triangle logo */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white" className="opacity-80">
                  <path d="M12 2L2 19.8h20L12 2z" />
                </svg>
                <span className="text-[11px] text-zinc-500 font-mono tracking-wide">
                  portfolio — build
                </span>
              </div>
              <span className="text-[10px] text-zinc-700 font-mono">
                {Math.round(progress)}%
              </span>
            </div>

            {/* Terminal body */}
            <div className="bg-[#0a0a0a] px-5 py-4 font-mono text-[13px] min-h-[190px]">
              {visibleLines.map((encoded, i) => {
                const sepIdx = encoded.indexOf('|||')
                const type = encoded.slice(0, sepIdx) as LineType
                const text = encoded.slice(sepIdx + 3)
                return (
                  <div key={i} className={`${lineColor(type)} leading-[1.7] tracking-tight`}>
                    {text}
                  </div>
                )
              })}

              {currentTyped && (
                <div className={`${lineColor(LINES[visibleLines.length]?.type ?? 'muted')} leading-[1.7] tracking-tight`}>
                  {currentTyped}
                  <span className="inline-block w-[7px] h-[13px] ml-[1px] bg-current align-middle opacity-80 animate-pulse" />
                </div>
              )}

              {!currentTyped && visibleLines.length < LINES.length && (
                <div className="text-zinc-700 leading-[1.7]">
                  <span className="inline-block w-[7px] h-[13px] bg-current align-middle opacity-60 animate-pulse" />
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div className="h-[2px] bg-zinc-900">
              <motion.div
                className="h-full bg-white/30"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.3 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
