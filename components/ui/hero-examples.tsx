"use client";

import React from "react";

import { MockSticker } from "@/components/ui/mock-sticker";
import type { StickerVariant } from "@/lib/constants";

const samples: Array<{ title: string; description: string; variant: StickerVariant }> = [
  {
    title: "Deadline panic",
    description: "Paperclipish • Intensity 7",
    variant: "sunrise"
  },
  {
    title: "Friday victory lap",
    description: "Binder-clip • Intensity 4",
    variant: "lagoon"
  },
  {
    title: "Focus time",
    description: "Pushpin • Intensity 5",
    variant: "twilight"
  }
];

export function HeroExamples() {
  return (
    <div className="relative">
      <div className="grid gap-6">
        {samples.map((sample, index) => (
          <div
            key={sample.title}
            className="group rounded-3xl bg-white/60 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl"
            style={{
              transformOrigin: index === 1 ? "center" : index === 0 ? "left center" : "right center"
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{sample.title}</h3>
                <p className="text-sm text-slate-600">{sample.description}</p>
              </div>
              <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-primary-600 shadow">GIF</span>
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/60 shadow-inner">
              <div className="relative h-48 w-full">
                <MockSticker
                  animate
                  caption={sample.title}
                  className="h-full w-full"
                  subcaption={sample.description}
                  variant={sample.variant}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute -left-4 -top-6 h-24 w-24 rounded-full bg-accent/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-8 right-0 h-32 w-32 rounded-full bg-primary-200/60 blur-3xl" />
    </div>
  );
}
