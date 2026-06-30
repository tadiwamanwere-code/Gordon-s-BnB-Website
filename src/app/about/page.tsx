import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Heart, Leaf, HandHeart, ArrowRight } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Credit } from "@/components/Credit";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Gordon's Bnb — a small guesthouse built on warm hospitality, careful detail and a love of slow mornings.",
};

const values = [
  {
    icon: HandHeart,
    title: "Genuine hospitality",
    body: "We treat guests the way we'd want to be treated — warmly, honestly, and without fuss. You're a person here, not a booking reference.",
  },
  {
    icon: Leaf,
    title: "Care for the details",
    body: "Crisp linen, fresh flowers, the right reading light. The small things aren't small to us — they're the whole point.",
  },
  {
    icon: Heart,
    title: "A place that's loved",
    body: "This is a home first. It's looked after the way you only look after somewhere you truly care about.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="A small house with a big heart."
        intro="Gordon's Bnb began with a simple idea — that a night away should feel less like a hotel and more like staying with a friend who happens to be a wonderful host."
        image={IMAGES.exterior}
      />

      {/* Story */}
      <section className="bg-cream bg-noise">
        <div className="container-x py-24 md:py-32 grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="How it started" title="Built around the welcome." />
            <div className="mt-6 space-y-5 text-base leading-relaxed text-stone text-pretty max-w-xl">
              <p>
                {SITE.name} was created for people who travel for the quiet moments
                as much as the destination — the slow coffee, the comfortable chair,
                the morning with nowhere to be.
              </p>
              <p>
                We kept the house small on purpose. With only a handful of rooms, we
                can give each stay the attention it deserves: a tidy room, a proper
                breakfast, and a host who actually has time to point you toward the
                good walks and the better coffee.
              </p>
              <p>
                It isn't grand, and it was never meant to be. It's simply somewhere
                comfortable, beautifully kept, and genuinely glad to have you.
              </p>
            </div>
          </div>
          <Reveal>
            <div className="relative aspect-[4/5] rounded-[var(--radius-xl2)] overflow-hidden card-surface">
              <Image src={IMAGES.lounge.src} alt={IMAGES.lounge.alt} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              <Credit author={IMAGES.lounge.author} link={IMAGES.lounge.link} className="absolute bottom-3 right-3" light />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-ivory">
        <div className="container-x py-24 md:py-32">
          <SectionHeading
            align="center"
            eyebrow="What we believe"
            title="The things we never cut corners on."
          />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <StaggerItem key={v.title} className="card-surface rounded-[var(--radius-xl2)] p-8">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-forest-50 text-forest-600">
                  <v.icon size={22} strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 font-display text-xl text-forest-800">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone">{v.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Location teaser */}
      <section className="relative bg-forest-800 text-cream overflow-hidden">
        <div className="absolute inset-0">
          <Image src={IMAGES.landscape.src} alt={IMAGES.landscape.alt} fill sizes="100vw" className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-forest-900/60" />
        </div>
        <div className="container-x relative py-24 md:py-32 grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            light
            eyebrow="The setting"
            title="Quiet surroundings, easy to reach."
            intro="Tucked away enough to feel like an escape, yet close enough to everything worth seeing. Wake to birdsong, spend the day exploring, and come home to calm."
          />
          <Reveal className="lg:justify-self-end">
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn btn-gold">Find us & get in touch</Link>
              <Link href="/booking" className="btn btn-ghost-light">Book a stay <ArrowRight size={18} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
