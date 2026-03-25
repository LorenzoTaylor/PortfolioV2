import { TextAnimate } from '@/registry/magicui/text-animate'

export function Hero() {
  return (
    <div className="relative z-10 flex flex-col gap-2 px-8 md:px-16 lg:px-24 select-none items-center text-center md:items-start md:text-left">
      <TextAnimate
        as="h1"
        animation="slideLeft"
        by="character"
        once
        className="text-4xl md:text-6xl font-light tracking-tight text-zinc-900 dark:text-zinc-50"
      >
        Hi, I'm Lorenzo
      </TextAnimate>

      <TextAnimate
        as="p"
        animation="slideLeft"
        by="character"
        delay={0.3}
        once
        className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-light"
      >
        I build things for the web.
      </TextAnimate>
    </div>
  )
}
