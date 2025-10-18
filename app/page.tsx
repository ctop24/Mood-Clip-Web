import Link from "next/link";

import { HeroExamples } from "@/components/ui/hero-examples";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700">
            New • Sticker magic for Teams
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Turn moods into animated stickers in seconds.
          </h1>
          <p className="text-lg text-slate-600">
            MoodClip helps your team express how they really feel. Describe the vibe, pick a style, and instantly get a loop-ready
            sticker you can drop into Microsoft Teams.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              className="rounded-full bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-primary-700"
              href="/create"
            >
              Create a sticker
            </Link>
            <Link className="text-base font-semibold text-primary-700" href="/library">
              Browse your library →
            </Link>
          </div>
          <dl className="grid grid-cols-2 gap-4 text-sm text-slate-600 sm:grid-cols-3">
            <div>
              <dt className="font-semibold text-slate-900">Three art styles</dt>
              <dd>Paperclipish, Binder-clip, Pushpin.</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Instant actions</dt>
              <dd>Copy, download, share links.</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Works anonymously</dt>
              <dd>Or sign in for history.</dd>
            </div>
          </dl>
        </div>
        <HeroExamples />
      </div>
    </div>
  );
}
