"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { MockSticker } from "@/components/ui/mock-sticker";
import { backgrounds, intensities, styles, type StickerVariant } from "@/lib/constants";
import { useToast } from "@/components/ui/toaster";

interface GeneratedSticker {
  stickerId: string;
  gifUrl?: string | null;
  pngUrl?: string | null;
  width: number;
  height: number;
  sizeBytes: number;
  variant: StickerVariant;
}

type ApiGeneratedSticker = Omit<GeneratedSticker, "variant"> & {
  variant?: StickerVariant | null;
};

export default function CreatePage() {
  const { addToast } = useToast();
  const router = useRouter();
  const [prompt, setPrompt] = React.useState("");
  const [style, setStyle] = React.useState<(typeof styles)[number]["id"]>(styles[0]?.id ?? "paperclipish");
  const [background, setBackground] = React.useState(backgrounds[0]?.id ?? "transparent");
  const [intensity, setIntensity] = React.useState(5);
  const [caption, setCaption] = React.useState("");
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [preview, setPreview] = React.useState<GeneratedSticker | null>(null);

  const activeStyle = React.useMemo(() => styles.find((option) => option.id === style), [style]);
  const activeBackground = React.useMemo(
    () => backgrounds.find((option) => option.id === background),
    [background]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt, style, background, intensity, caption })
      });

      if (!response.ok) {
        throw new Error("Failed to generate sticker");
      }

      const data = (await response.json()) as ApiGeneratedSticker;
      const fallbackVariant =
        data.variant ?? styles.find((entry) => entry.id === style)?.variant ?? "sunrise";
      setPreview({ ...data, variant: fallbackVariant } as GeneratedSticker);
      addToast({
        title: "Sticker ready",
        description: "Try copying or downloading the new animation."
      });
    } catch (error) {
      console.error(error);
      addToast({
        title: "Generation failed",
        description: "Please try again in a moment."
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLink = async () => {
    if (!preview) return;
    if (!('clipboard' in navigator)) {
      addToast({
        title: "Clipboard unavailable",
        description: "Copy the link from the browser address bar instead."
      });
      return;
    }
    if (!preview.gifUrl) {
      addToast({
        title: "No link available yet",
        description: "Connect the renderer to return a GIF URL."
      });
      return;
    }
    await navigator.clipboard.writeText(preview.gifUrl);
    addToast({
      title: "Link copied",
      description: "Send it in Teams or anywhere else."
    });
  };

  const handleDownload = () => {
    if (!preview || !preview.gifUrl) {
      addToast({
        title: "Download unavailable",
        description: "Connect the renderer to return a GIF URL."
      });
      return;
    }
    const link = document.createElement("a");
    link.href = preview.gifUrl;
    link.download = "moodclip.gif";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast({
      title: "Download started",
      description: "Your browser will save the sticker."
    });
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr]">
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Create a sticker</h1>
          <p className="mt-2 text-base text-slate-600">
            Describe the vibe, then fine-tune the rig. Anonymous users can create up to five stickers per day.
          </p>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700" htmlFor="prompt">
            Prompt
          </label>
          <textarea
            className="w-full rounded-2xl border border-slate-200 bg-white/90 p-4 text-base shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            id="prompt"
            minLength={4}
            placeholder="Deadline panic but hopeful"
            required
            rows={3}
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Style</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {styles.map((option) => {
              const isActive = option.id === style;
              return (
                <button
                  key={option.id}
                  className={`group flex flex-col gap-3 rounded-2xl border bg-white/80 p-4 text-left shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary-300 ${isActive ? "border-primary-400 ring-2 ring-primary-200" : "border-transparent"}`}
                  type="button"
                  onClick={() => setStyle(option.id)}
                >
                  <div className="relative h-28 w-full overflow-hidden rounded-xl">
                    <MockSticker
                      animate={isActive}
                      caption={option.name}
                      className="h-full w-full"
                      subcaption={option.description}
                      variant={option.variant}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{option.name}</p>
                    <p className="text-sm text-slate-600">{option.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">Background</span>
            <select
              className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-base shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              value={background}
              onChange={(event) => setBackground(event.target.value)}
            >
              {backgrounds.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2">
            <span className="flex items-center justify-between text-sm font-semibold uppercase tracking-wide text-slate-500">
              Intensity
              <span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700">{intensity}</span>
            </span>
            <input
              className="w-full"
              max={9}
              min={1}
              step={1}
              type="range"
              value={intensity}
              onChange={(event) => setIntensity(Number(event.target.value))}
            />
            <div className="flex justify-between text-xs text-slate-500">
              {intensities.map((value) => (
                <span key={value}>{value}</span>
              ))}
            </div>
          </label>
        </div>
        <label className="block space-y-2">
          <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">Caption (optional)</span>
          <input
            className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-base shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            placeholder="Add a quick caption"
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
          />
        </label>
        <div className="flex items-center gap-3">
          <button
            className="inline-flex items-center rounded-full bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-primary-300"
            disabled={isGenerating}
            type="submit"
          >
            {isGenerating ? "Generating…" : "Generate sticker"}
          </button>
          <button
            className="text-sm font-semibold text-slate-600 hover:text-primary-600"
            type="button"
            onClick={() => router.push("/library")}
          >
            View history
          </button>
        </div>
      </form>
      <aside className="space-y-6">
        <div className="rounded-3xl border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur">
          <h2 className="text-lg font-semibold text-slate-900">Preview</h2>
          <p className="mt-1 text-sm text-slate-600">
            Stickers render in 512×512. Drag the preview into Teams or use the actions below.
          </p>
          <div className="mt-6 flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-dashed border-primary-200 bg-gradient-to-br from-primary-50 via-white to-accent/40">
            {preview ? (
              preview.gifUrl ? (
                <img
                  alt="Sticker preview"
                  className="h-full w-full object-contain"
                  height={preview.height}
                  src={preview.gifUrl}
                  width={preview.width}
                />
              ) : (
                <MockSticker
                  animate
                  caption={prompt || "Deadline panic but hopeful"}
                  className="h-full w-full"
                  subcaption={`${activeStyle?.name ?? style} • ${activeBackground?.name ?? background}`}
                  variant={preview.variant}
                />
              )
            ) : (
              <div className="space-y-2 text-center text-sm text-slate-500">
                <p>Generate your first sticker to preview it here.</p>
                <p>PNG fallback automatically included.</p>
              </div>
            )}
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-4 text-xs text-slate-500">
            <div>
              <dt className="font-semibold text-slate-900">Dimensions</dt>
              <dd>{preview ? `${preview.width}×${preview.height}` : "512×512"}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">File size</dt>
              <dd>{preview ? `${(preview.sizeBytes / 1024).toFixed(1)} KB` : "—"}</dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              className="rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-primary-300"
              disabled={!preview}
              type="button"
              onClick={handleCopyLink}
            >
              Copy link
            </button>
            <button
              className="rounded-full border border-primary-200 bg-white px-4 py-2 text-sm font-semibold text-primary-700 shadow-sm transition hover:border-primary-300 hover:text-primary-800 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!preview}
              type="button"
              onClick={handleDownload}
            >
              Download GIF
            </button>
          </div>
        </div>
        <div className="rounded-3xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur">
          <h3 className="text-base font-semibold text-slate-900">Pro tips</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Keep prompts short and specific ("Victory dance" beats "We launched the project and everyone is happy").</li>
            <li>Intensity controls motion curves and expressions.</li>
            <li>Signed-in creators get unlimited history and Teams share links.</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
