import Image from "next/image";
import type { Img } from "@/lib/images";
import { Reveal } from "./Reveal";
import { Credit } from "./Credit";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image: Img;
}) {
  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden pt-24">
      <div className="absolute inset-0">
        <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/55 via-forest-900/30 to-forest-900/80" />
      </div>
      <div className="container-x relative z-10 pb-16 md:pb-20">
        {eyebrow ? (
          <Reveal>
            <p className="eyebrow text-brass-300">{eyebrow}</p>
          </Reveal>
        ) : null}
        <Reveal delay={0.08}>
          <h1 className="mt-5 max-w-3xl font-display text-[2.5rem] leading-[1.04] sm:text-5xl lg:text-6xl text-cream text-balance">
            {title}
          </h1>
        </Reveal>
        {intro ? (
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/85 text-pretty">{intro}</p>
          </Reveal>
        ) : null}
      </div>
      <Credit author={image.author} link={image.link} className="absolute bottom-4 right-5 z-10" light />
    </section>
  );
}
