# VoteWise

VoteWise is a politically-neutral mobile app that explains how Indian elections work. It is built on the Replit pnpm monorepo template.

## Artifacts

- `artifacts/votewise` — Expo (React Native + Expo Router) mobile app. Default preview.
- `artifacts/api-server` — Express API server. Hosts the `/api/chat` endpoint that proxies Claude (Anthropic) so the API key never ships to the client.
- `artifacts/mockup-sandbox` — Component preview sandbox (not used by VoteWise but shipped with the template).

## App features

- **Ask** — chat assistant powered by Anthropic Claude (`claude-sonnet-4-6`). Suggested starter prompts. Strict neutral system prompt covers ECI, EVM, VVPAT, NOTA, MCC, voter ID, etc.
- **Timeline** — interactive 7-step election timeline (announcement → nomination → scrutiny → campaign → polling → counting → results) with expandable details.
- **Quiz** — 10-question quiz on Indian elections with progress bar, per-question explanations, and best-score persistence.
- **Learn** — pocket-reference cards on ECI, EVM/VVPAT, NOTA, MCC, Lok Sabha vs Rajya Sabha, EPIC, and vote counting.

## Language

- Bilingual: English + हिंदी.
- Toggle in every screen header (`components/ScreenHeader.tsx`).
- Persisted in AsyncStorage via `contexts/LanguageContext.tsx`.
- All screen strings live in `constants/translations.ts`. All long-form content (timeline, learn cards, quiz) lives in `constants/electionContent.ts`.

## Networking

- Web client: `lib/api-client-react` (Orval-generated React Query hooks).
- Zod request/response validation on the server: `lib/api-zod`.
- The Expo app calls `setBaseUrl(\`https://${EXPO_PUBLIC_DOMAIN}\`)` in `app/_layout.tsx` so generated hooks (e.g. `useSendChatMessage`) hit the API server through the Replit proxy.

## Anthropic integration

- `lib/integrations-anthropic-ai/src/client.ts` reads `AI_INTEGRATIONS_ANTHROPIC_BASE_URL` and `AI_INTEGRATIONS_ANTHROPIC_API_KEY` (set via `setupReplitAIIntegrations`).
- The `/api/chat` route in `artifacts/api-server/src/routes/chat.ts` accepts `{ messages, language }`, picks the EN or HI system prompt, and returns `{ reply }`.

## Politically neutral

The system prompt forbids endorsing, opposing, or ranking parties or candidates and instructs the model to redirect "who should I vote for" questions back to the user. No party names, logos, slogans, or imagery appear anywhere in the UI.

## No emojis

By design the UI uses Feather/SF Symbols icons only — never emojis — to match the civic, official feel.

## Workflows

- `artifacts/api-server: API Server` — Express server on its own port.
- `artifacts/votewise: expo` — Expo dev server on its own port.
