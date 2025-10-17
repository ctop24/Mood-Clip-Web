# MoodClip Web App MVP — Software Design Document

## 1. Overview
MoodClip is a web-first experience for creating animated mood stickers that can be easily shared inside Microsoft Teams conversations. The MVP focuses on a frictionless prompt-to-sticker flow for anonymous and authenticated users while laying the groundwork for future Teams integrations and administrative tooling.

## 2. Goals & Non-Goals
- **Goals**
  - Transform a short natural-language prompt into an animated sticker (GIF with PNG fallback).
  - Provide intuitive actions for copying, downloading, or dragging stickers into Teams.
  - Offer optional sign-in for a richer library experience while supporting limited anonymous usage.
- **Non-Goals (MVP)**
  - Deep Teams integration beyond optional "Share to Teams" link-out.
  - Full admin console (deferred to v1.1).
  - Distributed rendering queue; synchronous rendering is acceptable initially.

## 3. Core User Flows
### 3.1 Create Sticker
1. Landing page → "Create" CTA.
2. User enters prompt (e.g., "deadline panic but hopeful").
3. Select style (Paperclipish, Binder-clip, Pushpin), background (transparent/desk/confetti), intensity, optional caption.
4. Submit to generate preview (10–30 frame loop).
5. Actions available: Copy, Download, Copy link, optional Share to Teams.

### 3.2 Browse History
- Authenticated users view and reuse previous stickers with ability to regenerate.

### 3.3 Admin (Post-MVP)
- Upload rigs, manage backgrounds, profanity list, analytics.

## 4. Product Scope
- Prompt-to-mood mapping via rule set or lightweight LLM for emotional attributes.
- Rigged animation engine (Lottie/Rive) producing frames; ffmpeg encodes optimized GIF + PNG poster.
- CDN-hosted assets with 7-day lifecycle for anonymous users; persistent storage for authenticated owners.
- Copy/Download UX with drag-and-drop hint for Teams.
- Basic rate limiting and abuse filtering.
- Anonymous mode with limits; NextAuth-powered Email/Google/Microsoft sign-in for full features.

## 5. Architecture & Tech Stack
- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS.
- **Auth:** NextAuth with Email, Google, Microsoft providers.
- **Backend:** Next.js API routes (Edge for light tasks; Node runtime for rendering jobs).
- **Render Service:** Containerized worker (Node or Python) executing headless Lottie/Rive + ffmpeg pipeline.
- **Queue:** Start synchronous; future upgrade to Redis-based job queue (Upstash/Azure Cache).
- **Storage/CDN:** Azure Blob Storage + Azure CDN (alternatively Cloudflare R2 + CDN).
- **Database:** PostgreSQL (Neon/Supabase/Azure PostgreSQL) storing users, stickers, configurations.
- **Observability:** Vercel Analytics, Sentry (frontend), OpenTelemetry/App Insights (worker).

## 6. Data Model (Simplified)
- **users**: `id (uuid)`, `email`, `provider`, `created_at`.
- **stickers**: `id (uuid)`, `owner_id (nullable)`, `prompt`, `mood`, `style`, `background`, `intensity`, `caption`, `gif_url`, `png_url`, `width`, `height`, `size_bytes`, `render_ms`, `created_at`.
- **style_packs** (post-MVP): `id`, `name`, `rig_json_url`, `thumbs`, `enabled`.
- **abuse_events**: `id`, `ip_hash`, `reason`, `created_at`.

## 7. API Endpoints (Draft)
- `POST /api/generate`
  - Request: `{ prompt, style, background, intensity, caption }`
  - Response: `{ stickerId, gifUrl, pngUrl, width, height, sizeBytes }`
- `GET /api/stickers?mine=true` → paginated list (auth required).
- `GET /api/styles` → available styles/backgrounds.
- `POST /api/share/teams` (future) → posts sticker link into Teams after Microsoft consent.

## 8. Rendering Pipeline
1. Prompt maps to parameters `{ emotion, pose, eyes, mouth, bounce }`, plus caption polishing.
2. Compose parameters into Lottie/Rive rig (vector parts, timing curves).
3. Render headless frames (PNG, 10–30 frames @ 12–15 fps, 512×512).
4. Encode optimized GIF via `ffmpeg palettegen/paletteuse`; create PNG poster.
5. Upload to Blob/CDN, persist DB row, return asset URLs.
6. Performance levers: frame count, resolution, fps, palette size. Deterministic rendering via seed for caching.

## 9. Security & Abuse Controls
- Prompt moderation (block slurs/NSFW) and user reporting.
- Rate limiting per IP and per user (e.g., 10/min IP; 60/hr authenticated user).
- Storage TTL enforcement: anonymous assets expire after 7 days; authenticated assets persist.
- Security best practices: HttpOnly cookies, CSRF protection, strict CORS, optional signed asset URLs.
- Legal: maintain original character art; avoid infringing Microsoft IP.

## 10. UI Outline
- **Home:** Hero section with "Create sticker" CTA, optional community examples.
- **Create Page:** Prompt input, style/background/intensity controls, generate button, preview, action buttons.
- **Library:** Grid of user stickers with filters.
- **Auth Modal:** Quick sign-in options (Google/Microsoft/email magic link).
- **Admin (v1.1):** Manage rigs, toggle styles, view analytics.

## 11. DevOps & Deployment
- Frontend/API deployed on Vercel with preview environments per PR.
- Rendering worker on Azure Container Apps or Fly.io (no GPU required initially).
- Asset storage on Azure Blob Storage + CDN; leverage SAS or signed paths.
- Secrets managed via Vercel environment variables and Azure Key Vault.
- CI/CD through GitHub Actions for lint/test/build; database migrations via Prisma.

## 12. Milestones (Accelerated Schedule)
- **Week 1:** Project setup, auth scaffolding, basic UI with dummy preview.
- **Week 2:** First rig/composer, synchronous render, storage/CDN integration, copy/download UX.
- **Week 3:** Prompt-to-parameter mapper, compression tuning, error states, library page.
- **Week 4:** Rate limiting, moderation, analytics, polish, launch readiness.

## 13. Migration Path to Teams Extension
- Build a Teams Message Extension that opens a prompt dialog, calls `/api/generate`, and inserts the GIF into chat.
- Reuse existing auth, database, and CDN infrastructure; add bot manifest and handlers only.

## 14. Initial Ticket Breakdown
- **FE-01:** Next.js app scaffolding, Tailwind setup, shared layout.
- **FE-02:** Create screen (prompt/controls), preview pane.
- **FE-03:** Sticker actions (Copy, Download, Copy link) + drag-and-drop guidance.
- **BE-01:** `/api/generate` endpoint with validation and renderer integration.
- **WK-01:** Rendering worker (rig load, composition, frame generation, ffmpeg encoding, upload).
- **BE-02:** Database schema design and `/api/stickers` listing.
- **SEC-01:** Rate limiting and moderation pipeline.
- **OPS-01:** Blob/CDN configuration, retention policies.
- **QA-01:** Cross-browser checks, Teams drag/drop behavior verification.
- **DOC-01:** README updates and environment variable documentation.
