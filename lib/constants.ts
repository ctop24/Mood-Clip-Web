export const stickerVariants = ["sunrise", "lagoon", "meadow", "twilight"] as const;

export type StickerVariant = (typeof stickerVariants)[number];

export const styles = [
  {
    id: "paperclipish",
    name: "Paperclipish",
    description: "Playful hand-drawn loops",
    variant: "sunrise" as StickerVariant
  },
  {
    id: "binder-clip",
    name: "Binder-clip",
    description: "Clean and modern",
    variant: "lagoon" as StickerVariant
  },
  {
    id: "pushpin",
    name: "Pushpin",
    description: "Bold shapes, big feelings",
    variant: "twilight" as StickerVariant
  }
] as const;

export const backgrounds = [
  { id: "transparent", name: "Transparent" },
  { id: "desk", name: "Desk texture" },
  { id: "confetti", name: "Confetti" }
] as const;

export const intensities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
