import type { Metadata } from "next";
import { IMAGES } from "@/lib/images";
import { PageHero } from "@/components/PageHero";
import { GalleryGrid } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look around Gordon's Bnb — the rooms, the garden, the breakfast table and the quiet corners in between.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A look around the house."
        intro="Wander through the rooms, the garden and the gentle details that make a stay here feel like home."
        image={IMAGES.terrace}
      />

      <section className="bg-cream bg-noise">
        <div className="container-x py-20 md:py-28">
          <GalleryGrid />
          <p className="mt-10 text-center text-xs text-mist">
            All photography via Unsplash — tap any image to view it larger.
          </p>
        </div>
      </section>
    </>
  );
}
