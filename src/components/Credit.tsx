import { Camera } from "lucide-react";

// Photographer attribution, per Unsplash guidelines.
export function Credit({
  author,
  link,
  className = "",
  light = false,
}: {
  author: string;
  link: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] tracking-wide backdrop-blur transition ${
        light
          ? "bg-forest-900/35 text-white/75 hover:text-white"
          : "bg-cream/70 text-stone hover:text-forest-700"
      } ${className}`}
      title={`Photo by ${author} on Unsplash`}
    >
      <Camera size={11} className="opacity-70" />
      <span className="opacity-90">{author}</span>
    </a>
  );
}
