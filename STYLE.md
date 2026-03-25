# Style Guidelines — PortfolioV2

## Design Direction
**Vercel-style UI with Magic UI elements** — minimal, sharp, dark-first. Clean whitespace, monospace accents, subtle motion. Use Magic UI components wherever possible (`BentoGrid`, `Marquee`, `Dock`, `TextAnimate`, etc.). Glassmorphic elements preferred for cards and overlays.

## Color Palette

### Dark Theme (default)
- **Background:** Black (`#000000` / `zinc-950`)
- **Foreground / Text:** Silver / Light Gray (`zinc-400`, `zinc-300`)
- **Borders:** `zinc-800` default · `zinc-600/50` on hover/glow elements
- **Glow:** `rgba(161,161,170,0.12)` (zinc-based subtle glow)

### Light Theme
- **Background:** White (`#ffffff`)
- **Foreground / Text:** Black (`#000000` / `zinc-900`)
- **Borders:** `zinc-200`

## Typography
- System font stack (no custom font yet)
- Monospace (`font-mono`) used for labels, paths, stack tags, and section slugs

## Motion
- Dock magnification spring: `mass: 0.1`, `stiffness: 150`, `damping: 12`
- Card tilt spring: `stiffness: 300`, `damping: 30`, `mass: 0.5`
- Scroll entrance: `opacity 0→1`, `y 32→0`, `duration 0.5`, staggered by `0.07–0.08s`
- Easing: `[0.25, 0.1, 0.25, 1]` (ease-in-out-quad) throughout

## Components
- **Dock:** Magic UI `Dock`/`DockIcon` (fixed bottom-center) + Radix UI tooltips
- **Theme toggle:** Rounded button, fixed top-right
- **BentoGrid / BentoCard:** Magic UI registry (`src/registry/magicui/bento-grid.tsx`)
- **Marquee:** Magic UI registry (`src/registry/magicui/marquee.tsx`)

## Project Sections (all three available — pick the best)
1. **Terminal Cards** — `<Projects />` · macOS-style terminal windows, monospace output, traffic lights
2. **Bento Grid** — `<BentoProjects />` · Magic UI asymmetric grid, animated backgrounds per card
3. **Floating Masonry** — `<MasonryProjects />` · 2-col staggered layout, 3D tilt on hover, per-project accent glow
