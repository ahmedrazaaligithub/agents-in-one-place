# Data layer: Supabase

Categories and tools moved from static in-memory arrays (`lib/data/*.ts`) to a real Supabase Postgres database. The public-facing shape didn't change — `Category`, `Tool`, and every helper function name from `lib/data/` are the same as before. **What changed: every helper is now `async`.** Any Server Component calling `getCategories`, `getCategoryBySlug`, `getTools`, `getToolBySlug`, `getToolsByCategory`, `getFeaturedTools`, `searchTools`, or `getCategoriesWithCounts` must `await` it. This is a read-only public directory — there's no auth, no user accounts, no writes from the app itself.

## One-time setup (per environment)

1. Create a Supabase project at supabase.com if you don't have one yet.
2. In the Supabase SQL Editor, run `supabase/schema.sql` (creates `categories`/`tools` tables + RLS policies), then `supabase/seed.sql` (inserts the original mock dataset — safe to re-run, uses `ON CONFLICT DO UPDATE`).
3. In Project Settings → Data API, copy the Project URL and anon public key into `.env.local` as `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` (see `.env.local.example`).
4. Restart the dev server so the new env vars load.

Without those env vars, every page that reads categories/tools throws a clear error at request time (`lib/supabase/client.ts` checks lazily, on first query — it doesn't crash at import time, so at least static/non-data pages still render).

## Schema

- `categories(slug pk, name, description, icon)`
- `tools(slug pk, name, tagline, description, category_slugs text[], pricing, price_from, website, features text[], featured, rating, review_count)`
- `pricing` has a check constraint matching `PricingType` (`free` | `freemium` | `paid` | `open-source`).
- `tools.category_slugs` is a Postgres array (not a join table) — matches `Tool.categorySlugs` in `lib/types.ts` 1:1. `getToolsByCategory` uses `.contains("category_slugs", [slug])`.
- RLS is **on** for both tables with a public-read-only policy (`for select using (true)`) and no write policies — inserts/updates only happen via the Supabase SQL Editor or a service-role key, never through the app's anon-key client.

## Row ↔ type mapping

Postgres columns are `snake_case`; app types stay `camelCase` (`category_slugs` → `categorySlugs`, `price_from` → `priceFrom`, `review_count` → `reviewCount`). The `mapCategoryRow`/`mapToolRow` functions inside `lib/data/categories.ts` / `lib/data/tools.ts` are the only place this translation happens — components never see snake_case.

## Why this is safe to keep changing later

`lib/supabase/client.ts` is the only file that constructs the Supabase client. If the project ever needs a different backend, only `lib/data/*.ts` (the query implementations) and this client file need to change — the function signatures and `Category`/`Tool` shapes stay put, so nothing in `app/` or `components/` needs to know.
