import classNames from "classnames";

import { MockSticker } from "@/components/ui/mock-sticker";
import type { StickerVariant } from "@/lib/constants";

interface StickerGridProps {
  stickers: Array<{
    id: string;
    prompt: string;
    style: string;
    background: string;
    createdAt: string;
    gifUrl?: string | null;
    variant?: StickerVariant;
  }>;
  className?: string;
}

export function StickerGrid({ stickers, className }: StickerGridProps) {
  return (
    <div className={classNames("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {stickers.map((sticker) => (
        <article
          key={sticker.id}
          className="group flex flex-col rounded-3xl border border-white/50 bg-white/70 p-4 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/70">
            {sticker.gifUrl ? (
              <img alt={sticker.prompt} className="h-full w-full object-cover" src={sticker.gifUrl} />
            ) : (
              <MockSticker
                animate
                caption={sticker.prompt}
                className="h-full w-full"
                subcaption={`${sticker.style} • ${sticker.background}`}
                variant={sticker.variant ?? "sunrise"}
              />
            )}
          </div>
          <div className="mt-4 flex flex-1 flex-col">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-slate-900">{sticker.prompt}</h3>
              <p className="text-sm text-slate-600">
                {sticker.style} • {sticker.background}
              </p>
            </div>
            <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
              <span>{sticker.createdAt}</span>
              <button className="rounded-full px-3 py-1 font-semibold text-primary-600 transition hover:bg-primary-100" type="button">
                Regenerate
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
