# MoodClip Web

MoodClip is a Next.js application for creating animated mood stickers that can be shared in Microsoft Teams conversations. This MVP implements the core flows described in the accompanying Software Design Document.

## Getting started

```bash
npm install
npm run dev
```

The development server runs on [http://localhost:3000](http://localhost:3000).

## Features

- Prompt-to-sticker creation flow with style, background, intensity, and caption controls.
- Preview pane with copy and download actions.
- Library page showcasing recent stickers (placeholder data for now).
- API stubs for `POST /api/generate`, `GET /api/stickers`, and `GET /api/styles`.
- Tailwind CSS-powered UI with responsive layout and accessible navigation.

## Next steps

- Connect the generation endpoint to the rendering service and storage pipeline.
- Implement authentication via NextAuth and persist sticker history in a database.
- Integrate moderation, rate limiting, and telemetry as described in the SDD.
