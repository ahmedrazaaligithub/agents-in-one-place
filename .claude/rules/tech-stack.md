# Tech stack

- **Next.js 16** (App Router, Turbopack by default). Route params/searchParams are **async** (`Promise`) — always `await props.params`. See `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md` for the full list of v16 breaking changes before assuming anything from older Next.js knowledge.
- **React 19.2** (canary features via the App Router: View Transitions, `useEffectEvent`, Activity).
- **Tailwind CSS v4** — config lives in CSS (`app/globals.css`), not `tailwind.config.js`. Design tokens are CSS custom properties in `:root` / `.dark`, exposed to Tailwind via `@theme inline`. Gradient utilities are renamed: use `bg-linear-to-*` (canonical), not `bg-gradient-to-*` (old name, still parses but flagged by the linter).
- **shadcn/ui** — this project's installed version is built on **`@base-ui/react`**, not Radix UI. Key API differences from the Radix-based shadcn you may know:
  - Polymorphism uses a **`render`** prop (e.g. `<Button render={<Link href="/x" />}>`), not `asChild`. When `render` swaps a `Button` to a non-`<button>` element (like `Link`/`<a>`), also pass `nativeButton={false}` or Base UI logs a console warning.
  - Data-state styling uses `data-open`/`data-closed`/`data-popup-open` custom variants (see `node_modules/shadcn/dist/tailwind.css`), not Radix's `data-state`.
  - `TooltipProvider` takes a `delay` prop, not `delayDuration`.
  - Components live in `components/ui/`. Add new ones with `npx shadcn@latest add <name>` rather than hand-writing them, since the generated code follows the base-ui conventions above.
  - Style preset: `base-nova`, base color: `neutral`. Config in `components.json`.
- **Framer Motion** (`framer-motion` package) for animation — scroll reveals via a shared `Reveal` / `RevealGroup` / `RevealItem` helper in `components/motion/reveal.tsx`, plus hand-rolled hero animations. Card hover states are CSS-only (no JS) for cheapness.
- **lucide-react v1** for icons. Note: brand/logo icons (GitHub, Twitter, LinkedIn, etc.) were removed from this version — use generic icons as stand-ins.
- **next-themes** for dark mode (class-based, `attribute="class"`, wired in `components/theme-provider.tsx` + toggle in `components/theme-toggle.tsx`).
- **Redux Toolkit + Axios** for frontend state/data-fetching — this is the convention for any client component that talks to our own API routes; don't call `fetch` directly from a component. See `@rules/ai-chat-assistant.md` for the concrete pattern (`lib/store/`, `lib/api/axios.ts`).
- **Google Gemini** (`lib/ai/gemini.ts`, server-only) powers the "which tool should I use?" chat assistant. See `@rules/ai-chat-assistant.md` for the API's actual shape (it differs from most training-data-era docs) and the model choice.
- **Supabase** (`@supabase/supabase-js`) is the database for categories/tools — no more static mock arrays. Public read-only (anon key + RLS), no auth. See `@rules/data-layer.md` for schema, setup steps, and the row↔type mapping.
