import { IMAGES, type Img } from "./images";

// Room product configuration — real, editable details (not placeholder stats).
// Rates are nightly, in USD, and are the owner's to set.

export type Room = {
  slug: string;
  name: string;
  short: string;
  description: string;
  longDescription: string[];
  rate: number; // nightly, USD
  guests: number;
  bed: string;
  size: string; // e.g. "28 m²"
  view: string;
  amenities: string[];
  image: Img;
  gallery: Img[];
};

export const ROOMS: Room[] = [
  {
    slug: "garden-suite",
    name: "The Garden Suite",
    short: "Our most spacious room, opening onto the garden.",
    description:
      "A bright, generous suite with a king bed, a private sitting area, and doors that open to the garden terrace.",
    longDescription: [
      "The Garden Suite is the largest of our rooms — a calm, light-filled space designed for longer, slower stays.",
      "Wake to garden views, take coffee on the private terrace, and unwind in the deep soaking tub after a day out.",
    ],
    rate: 185,
    guests: 2,
    bed: "King bed",
    size: "32 m²",
    view: "Garden & terrace",
    amenities: ["Private terrace", "Soaking tub", "Garden view", "Nespresso", "Smart TV", "Workspace"],
    image: IMAGES.bedroomLuxe,
    gallery: [IMAGES.bedroomLuxe, IMAGES.bathroom, IMAGES.garden],
  },
  {
    slug: "the-loft",
    name: "The Loft",
    short: "A characterful top-floor room with beamed ceilings.",
    description:
      "Tucked under the eaves, The Loft pairs original beams with a plush king bed and a quiet reading nook.",
    longDescription: [
      "The Loft sits at the top of the house, full of character with its sloped, beamed ceilings and soft afternoon light.",
      "A leather armchair and reading lamp make the perfect corner to settle in with a book from the house library.",
    ],
    rate: 165,
    guests: 2,
    bed: "King bed",
    size: "26 m²",
    view: "Rooftops & sky",
    amenities: ["Reading nook", "Beamed ceilings", "Nespresso", "Smart TV", "Rainfall shower", "Workspace"],
    image: IMAGES.readingNook,
    gallery: [IMAGES.readingNook, IMAGES.kingBed, IMAGES.coffee],
  },
  {
    slug: "the-snug",
    name: "The Snug",
    short: "A cosy, well-priced double — ideal for a short escape.",
    description:
      "Compact and comfortable, The Snug is a warm double room with everything you need for a restful night.",
    longDescription: [
      "The Snug is our most intimate room — thoughtfully arranged so every corner earns its place.",
      "It is the easy choice for a weekend away: comfortable, quiet, and a few steps from the breakfast room.",
    ],
    rate: 135,
    guests: 2,
    bed: "Queen bed",
    size: "20 m²",
    view: "Courtyard",
    amenities: ["Courtyard view", "Nespresso", "Smart TV", "Rainfall shower", "Daily housekeeping"],
    image: IMAGES.kingBed,
    gallery: [IMAGES.kingBed, IMAGES.lounge, IMAGES.coffee],
  },
];

export function getRoom(slug: string): Room | undefined {
  return ROOMS.find((r) => r.slug === slug);
}

export const lowestRate = Math.min(...ROOMS.map((r) => r.rate));
