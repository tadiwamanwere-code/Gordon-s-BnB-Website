"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY } from "@/lib/images";
import { Credit } from "./Credit";

export function GalleryGrid() {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + GALLERY.length) % GALLERY.length)),
    []
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % GALLERY.length)),
    []
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, prev, next]);

  const active = index === null ? null : GALLERY[index];

  return (
    <>
      <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
        {GALLERY.map((img, i) => (
          <button
            key={`${img.src}-${i}`}
            onClick={() => setIndex(i)}
            className="group relative block w-full overflow-hidden rounded-xl card-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-brass-500"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={600}
              height={800}
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
              className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-forest-900/0 transition-colors group-hover:bg-forest-900/20" />
          </button>
        ))}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-900/92 backdrop-blur-sm p-4"
          onClick={close}
        >
          <button
            aria-label="Close"
            onClick={close}
            className="absolute top-5 right-5 h-11 w-11 inline-flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
          >
            <X size={22} />
          </button>
          <button
            aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 sm:left-6 h-12 w-12 inline-flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
          >
            <ChevronLeft size={26} />
          </button>
          <button
            aria-label="Next"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 sm:right-6 h-12 w-12 inline-flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
          >
            <ChevronRight size={26} />
          </button>

          <figure className="relative max-h-[85vh] max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative mx-auto aspect-[3/2] max-h-[80vh] w-full">
              <Image src={active.src} alt={active.alt} fill sizes="90vw" className="object-contain" />
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm text-cream/80">
              <span className="line-clamp-1">{active.alt}</span>
              <Credit author={active.author} link={active.link} light />
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}
