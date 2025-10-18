"use client";

import classNames from "classnames";
import React from "react";

import type { StickerVariant } from "@/lib/constants";

const VARIANT_THEMES: Record<StickerVariant, {
  gradient: string;
  glowA: string;
  glowB: string;
  accent: string;
  accentSecondary: string;
}> = {
  sunrise: {
    gradient: "from-amber-200 via-orange-50 to-rose-200",
    glowA: "bg-amber-300/60",
    glowB: "bg-rose-300/50",
    accent: "bg-amber-500 text-white",
    accentSecondary: "bg-white/70"
  },
  lagoon: {
    gradient: "from-sky-200 via-cyan-50 to-blue-200",
    glowA: "bg-sky-300/50",
    glowB: "bg-indigo-300/40",
    accent: "bg-sky-600 text-white",
    accentSecondary: "bg-white/70"
  },
  meadow: {
    gradient: "from-lime-200 via-emerald-50 to-green-200",
    glowA: "bg-emerald-300/50",
    glowB: "bg-lime-400/40",
    accent: "bg-emerald-600 text-white",
    accentSecondary: "bg-white/70"
  },
  twilight: {
    gradient: "from-violet-200 via-fuchsia-50 to-purple-200",
    glowA: "bg-fuchsia-300/50",
    glowB: "bg-violet-400/40",
    accent: "bg-violet-600 text-white",
    accentSecondary: "bg-white/70"
  }
};

export interface MockStickerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: StickerVariant;
  caption?: string;
  subcaption?: string;
  animate?: boolean;
}

export function MockSticker({
  variant = "sunrise",
  caption = "Sticker preview",
  subcaption,
  animate = true,
  className,
  ...props
}: MockStickerProps) {
  const theme = VARIANT_THEMES[variant] ?? VARIANT_THEMES.sunrise;

  return (
    <div
      className={classNames(
        "relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br p-5 shadow-inner",
        "bg-gradient-to-br",
        theme.gradient,
        className
      )}
      {...props}
    >
      <div
        className={classNames(
          "pointer-events-none absolute -left-10 -top-12 h-32 w-32 rounded-full blur-3xl",
          theme.glowA,
          animate && "animate-[pulse_6s_ease-in-out_infinite]"
        )}
      />
      <div
        className={classNames(
          "pointer-events-none absolute -bottom-12 -right-10 h-32 w-32 rounded-full blur-3xl",
          theme.glowB,
          animate && "animate-[pulse_7s_ease-in-out_infinite]"
        )}
      />
      <div className="relative flex flex-col gap-4 text-slate-900">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600/80">
          <span>MoodClip</span>
          <span className={classNames("h-1 w-1 rounded-full", theme.accentSecondary)} />
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-white/60 p-4 shadow-lg">
          <div className="grid gap-2 text-sm font-semibold text-slate-700">
            <span className="block truncate text-xs uppercase tracking-wide text-slate-500">Prompt</span>
            <span className="text-lg leading-tight">{caption}</span>
            {subcaption ? <span className="text-xs text-slate-500">{subcaption}</span> : null}
          </div>
          <div className="absolute -bottom-6 right-6 h-16 w-16 rounded-full bg-white/60 shadow-lg" />
        </div>
      </div>
      <div className="relative mt-6 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
        <span className={classNames("rounded-full px-3 py-1 shadow-sm", theme.accent)}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)} mood
        </span>
        <div className="flex items-center gap-1 text-slate-600">
          <span className="h-2 w-6 rounded-full bg-white/70" />
          <span className="h-2 w-10 rounded-full bg-white/70" />
          <span className="h-2 w-8 rounded-full bg-white/70" />
        </div>
      </div>
    </div>
  );
}
