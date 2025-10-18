import { StickerGrid } from "@/components/ui/sticker-grid";

const placeholderStickers = [
  {
    id: "1",
    prompt: "Deadline panic but hopeful",
    style: "Paperclipish",
    background: "Confetti",
    createdAt: "2 hours ago",
    variant: "sunrise"
  },
  {
    id: "2",
    prompt: "Friday victory lap",
    style: "Binder-clip",
    background: "Transparent",
    createdAt: "Yesterday",
    variant: "lagoon"
  },
  {
    id: "3",
    prompt: "Focus time",
    style: "Pushpin",
    background: "Desk",
    createdAt: "Last week",
    variant: "twilight"
  }
];

export default function LibraryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Your sticker library</h1>
          <p className="mt-2 max-w-2xl text-base text-slate-600">
            Sign in to unlock unlimited history, quick regeneration, and Teams share links. Anonymous stickers remain for seven days.
          </p>
        </div>
        <button className="self-start rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700">
          Sign in with Microsoft
        </button>
      </div>
      <StickerGrid className="mt-8" stickers={placeholderStickers} />
    </div>
  );
}
