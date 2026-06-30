// ============================================================
// Single source of truth for business details.
// Edit these values once and they update across the whole site.
// (No fabricated statistics or reviews — only real, editable info.)
// ============================================================

export const SITE = {
  name: "Gordon's Bnb",
  shortName: "Gordon's",
  tagline: "A quiet retreat, beautifully kept.",
  description:
    "Gordon's Bnb is a boutique bed & breakfast offering a handful of thoughtfully appointed rooms, slow mornings, and warm, personal hospitality.",
  // Contact — replace with your live details before launch.
  email: "stay@gordonsbnb.com",
  phone: "", // e.g. "+1 (555) 123 4567" — left blank intentionally
  phoneHref: "",
  address: {
    line1: "Set your address here",
    line2: "",
    region: "",
  },
  hours: {
    checkIn: "From 3:00 PM",
    checkOut: "Until 11:00 AM",
    reception: "Daily, 8:00 AM – 8:00 PM",
  },
  social: {
    instagram: "",
    facebook: "",
  },
  // Used for canonical URLs / metadata. Update to your Vercel/custom domain.
  url: "https://gordons-bnb.vercel.app",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
