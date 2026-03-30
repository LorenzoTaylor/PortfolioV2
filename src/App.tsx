import { useEffect, useRef, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { TerminalLoader } from '@/components/ui/TerminalLoader'
import Badge from '@/components/badge/Badge'
import { DockDemo } from '@/components/DockDemo'
import { Hero } from '@/components/Hero'
import { BentoProjects } from '@/components/BentoProjects'
import { Story } from '@/components/Story'
import { Footer } from '@/components/Footer'
import { ProjectDetail } from '@/pages/ProjectDetail'

function Portfolio() {
  const [showLoader, setShowLoader] = useState(() => !sessionStorage.getItem('portfolio_intro_seen'))
  const [footerVisible, setFooterVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      {showLoader && <TerminalLoader onDone={() => setShowLoader(false)} />}

      {/* Hero */}
      <main className="relative flex flex-col min-h-screen overflow-hidden md:justify-center">
        <Badge />
        <Hero />
      </main>

      {/* Projects */}
      <BentoProjects />

      {/* Story */}
      <Story />

      {/* Footer */}
      <Footer ref={footerRef} />

      {/* Dock */}
      <div className={`fixed bottom-6 left-0 right-0 flex justify-center z-50 ${footerVisible ? 'pointer-events-none' : ''}`}>
        <DockDemo hidden={footerVisible} />
      </div>
    </div>
  )
}

function App() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <>
      <ThemeToggle dark={dark} onToggle={() => setDark((d) => !d)} />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
      <Analytics />
    </>
  )
}

export default App
