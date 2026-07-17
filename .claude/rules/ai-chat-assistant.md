# AI chat assistant ("which tool should I use?")

A floating chat widget (bottom-right, `components/chat/chat-widget.tsx`) lets users describe what they're trying to do and get 2-3 tool recommendations pulled **only** from our own mock dataset — the model is never allowed to recommend a tool that doesn't exist in `lib/data/tools.ts`.

## Request flow

`ChatWidget` (client) → dispatches `sendChatMessage` thunk → `lib/api/axios.ts` (`api.post`) → `POST /api/recommend` (`app/api/recommend/route.ts`, server-only) → `lib/ai/recommend.ts` → `lib/ai/gemini.ts` → Google's Gemini API.

- The Gemini API key never reaches the client — every Gemini call happens inside the `/api/recommend` route handler, which runs server-side only.
- `lib/ai/recommend.ts` builds the system prompt (full tool dataset as context + instructions to only use listed slugs) and, critically, **re-validates the model's response against the real dataset** after the fact — any `toolSlug` the model returns that isn't in `lib/data/tools.ts` is silently dropped before it reaches the client. Don't remove this check; it's the actual guarantee against hallucinated tools, not just prompt wording.
- `lib/ai/gemini.ts` is the only file that knows Gemini's request/response shape. Swapping providers later means rewriting this file, not its callers.

## Gemini API specifics (verified by testing directly, not just docs)

- Gemini's API moved to a new **Interactions API** (`POST https://generativelanguage.googleapis.com/v1beta/interactions`), replacing the older `generateContent` REST shape most docs/training data describe. Auth is a `x-goog-api-key` header, not a query param.
- Structured JSON output is requested via `response_format: { type: "text", mime_type: "application/json", schema }` in the request body.
- **The response has no `output_text` convenience field in practice**, despite some docs implying otherwise — the generated text is nested at `steps[].content[].text` where `steps[].type === "model_output"`. `lib/ai/gemini.ts`'s `extractOutputText()` handles this.
- Default model is `gemini-3.1-flash-lite`, not `gemini-3.5-flash`. The latter returns a 500 "currently experiencing high demand" error very frequently on the free tier — confirmed by direct testing, not assumed. `gemini-3.1-flash-lite` is reliable on the same free-tier key. Override via `GEMINI_MODEL` if needed.
- `lib/ai/gemini.ts` retries once or twice on 500/503 responses with a short backoff, since Google's own error message says these spikes are usually transient.

## Environment setup

- Copy `.env.local.example` → `.env.local` (gitignored, never committed) and set `GEMINI_API_KEY` to a key from Google AI Studio (aistudio.google.com/apikey — free tier works).
- Optional `GEMINI_MODEL` env var overrides the default model.
- `.env.local.example` IS committed (there's a `.gitignore` exception for it specifically) — keep real secrets out of it, only the blank template.

## Frontend state: Redux Toolkit + Axios (not raw `fetch`)

Per project convention, frontend calls to our own API go through Redux + Axios, not direct `fetch`/component `useState`:

- `lib/api/axios.ts` — a shared axios instance (`baseURL: "/api"`).
- `lib/store/chat-slice.ts` — a Redux Toolkit slice owning all chat message state (`entries`, `loading`). `sendChatMessage` is a `createAsyncThunk` that reads existing history from `getState()`, posts it via the axios instance, and lets `pending`/`fulfilled`/`rejected` reducers handle adding the user message, the assistant's response (with recommendations), or an error bubble.
- `lib/store/store.ts` / `lib/store/hooks.ts` — store setup and typed `useAppDispatch`/`useAppSelector`.
- `components/providers/redux-provider.tsx` — client-only `<Provider>` wrapper, mounted in `app/layout.tsx` around everything else.
- `ChatWidget` only keeps `open` (panel visibility) and `input` (draft text) as local `useState` — genuinely ephemeral UI state that doesn't need to be global. All chat data and the network call live in Redux.
- This convention (Redux Toolkit + Axios for talking to our own API routes) applies specifically to frontend → our-backend calls. Server-to-third-party calls (like `lib/ai/gemini.ts` → Google's API) still use plain `fetch`, since Redux is a React state-management library with no role server-side.
