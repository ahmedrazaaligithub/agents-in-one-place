# Design system decisions

- Base palette is shadcn's `neutral` (grayscale) with a single **violet/purple accent** (`--primary`, `--ring`, `--sidebar-primary` set to Tailwind's `violet-600` in light mode / `violet-400` in dark mode) — everything else (backgrounds, borders, muted text) stays neutral gray for a clean, premium SaaS look rather than a colorful one. Gradients mix in `fuchsia-500`/`violet-600` alongside `primary` for variety (hero headline, CTA band, avatar monograms).
- Radius is `0.75rem` base (`--radius`), scaled via the `--radius-sm/md/lg/xl/2xl/3xl/4xl` tokens shadcn generates.
- Font: Geist Sans for everything (`--font-sans` and `--font-heading` both point at `--font-geist-sans`), Geist Mono for code/mono contexts. No separate display font.
- Dark mode is class-based (`.dark` on `<html>`), toggled via `next-themes`, defaults to system preference.
- Motion: scroll-reveal (fade + rise) on section entry via `Reveal`/`RevealGroup`/`RevealItem`; hero has a looping floating "product preview" mockup plus an animated blurred-blob background (`components/motion/animated-background.tsx`, reused in the CTA band); card hover states use CSS transitions only. Standard ease curve is `[0.22, 1, 0.36, 1]`. Background blobs use large-amplitude, fairly short loops (11-15s, ~100-140px of travel) — smaller/slower motion under heavy blur reads as "not animating" at a glance, so err toward more perceptible movement over subtlety here specifically.
- Brand name used throughout: **Agentory**.
