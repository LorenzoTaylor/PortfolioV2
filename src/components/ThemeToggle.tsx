import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

type ThemeToggleProps = {
  dark: boolean
  onToggle: () => void
  className?: string
}

export function ThemeToggle({ dark, onToggle, className }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'fixed top-4 right-4 z-50',
        'flex items-center justify-center',
        'h-10 w-10 rounded-full',
        'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md',
        'border border-zinc-200 dark:border-zinc-700/50',
        'shadow-md shadow-black/10 dark:shadow-black/30',
        'text-zinc-600 dark:text-zinc-400',
        'hover:text-zinc-900 dark:hover:text-zinc-100',
        'hover:bg-zinc-100 dark:hover:bg-zinc-800',
        'transition-all duration-200 cursor-pointer',
        className,
      )}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
