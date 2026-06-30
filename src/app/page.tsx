import Link from "next/link";
import Image from "next/image";
import {
  Coffee,
  Wifi,
  Leaf,
  Croissant,
  KeyRound,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Quote,
} from "lucide-react";
import { IMAGES } from "@/lib/images";
import { ROOMS, lowestRate } from "@/lib/rooms";
import { SITE } from "@/lib/site";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { SectionHeading } from "@/components/Section";
import { RoomCard } from "@/components/RoomCard";
import { Credit } from "@/components/Credit";

const experiences = [
  {
    icon: Croissant,
    title: "Breakfast, made each morning",
    body: "A generous spread of fresh pastries, fruit, eggs and good coffee — served slowly, the way mornings should be.",
  },
  {
    icon: Leaf,
    title: "A garden to wander",
    body: "Mature planting, quiet corners and a sun-warmed terrace for an afternoon book or an evening glass of wine.",
  },
  {
    icon: KeyRound,
    title: "Only a handful of rooms",
    body: "Small by design. Fewer rooms means more attention, more quiet, and a house that never feels like a hotel.",
  },
  {
    icon: Coffee,
    title: "A proper coffee station",
    body: "Nespresso, a kettle and locally roasted beans in every room — for the moments between adventures.",
  },
  {
    icon: Wifi,
    title: "Fast, reliable Wi-Fi",
    body: "Stay connected when you need to, switch off when you don't. Full-strength signal throughout the house.",
  },
  {
    icon: Sparkles,
    title: "Kept beautifully",
    body: "Crisp linen, daily housekeeping and the kind of small touches you only notice because they're done right.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={IMAGES.exterior.src}
            alt={IMAGES.exterior.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover animate-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest-900/55 via-forest-900/25 to-forest-900/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900/50 to-transparent" />
        </div>

        <div className="container-x relative z-10 pb-20 pt-36 md:pb-28">
          <Reveal>
            <p className="eyebrow text-brass-300">
              Boutique bed &amp; breakfast
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-3xl font-display text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-7xl text-cream text-balance">
              A quiet retreat,
              <br />
              beautifully kept.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85 text-pretty">
              {SITE.name} is a small guesthouse built around slow mornings, warm
              hospitality and a handful of rooms made to feel like your own.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/booking" className="btn btn-gold text-base">
                Check availability
              </Link>
              <Link href="/rooms" className="btn btn-ghost-light text-base">
                Explore the rooms <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-8 text-sm text-cream/70">
              Rooms from{" "}
              <span className="text-cream font-medium">${lowestRate}</span> per night
            </p>
          </Reveal>
        </div>

        <Credit author={IMAGES.exterior.author} link={IMAGES.exterior.link} className="absolute bottom-4 right-5 z-10" light />
      </section>

      {/* ============ WELCOME ============ */}
      <section className="bg-cream bg-noise">
        <div className="container-x py-24 md:py-32 grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <Reveal>
              <div className="relative aspect-[4/5] rounded-[var(--radius-xl2)] overflow-hidden card-surface">
                <Image
                  src={IMAGES.lounge.src}
                  alt={IMAGES.lounge.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <Credit author={IMAGES.lounge.author} link={IMAGES.lounge.link} className="absolute bottom-3 right-3" light />
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="hidden sm:block absolute -bottom-8 -right-6 w-48 rounded-2xl card-surface p-5 bg-paper animate-floaty">
                <p className="font-display text-3xl text-forest-700">Hello.</p>
                <p className="mt-1 text-sm text-stone">
                  We're so glad you found us.
                </p>
              </div>
            </Reveal>
          </div>

          <div>
            <SectionHeading
              eyebrow="Welcome"
              title="Hospitality, the unhurried way."
              intro="There's no front desk, no queue and no rush. Just a comfortable house, a thoughtful host, and the small things done well — from the linen on the bed to the coffee in your hand."
            />
            <Reveal delay={0.15}>
              <p className="mt-5 text-base leading-relaxed text-stone text-pretty max-w-xl">
                Whether you're here for a weekend away, a stop on a longer journey,
                or simply somewhere calm to land, you'll be looked after like an old
                friend — and left in peace whenever you'd like it.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-forest-700 font-medium link-underline">
                Read our story <ArrowUpRight size={18} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ ROOMS ============ */}
      <section className="bg-ivory">
        <div className="container-x py-24 md:py-32">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="The Rooms"
              title="A room for every kind of stay."
              intro="Three distinct rooms, each with its own character — and all with the comfort, quiet and care you came for."
            />
            <Reveal delay={0.1}>
              <Link href="/rooms" className="btn btn-outline shrink-0">
                View all rooms <ArrowRight size={18} />
              </Link>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {ROOMS.map((room, i) => (
              <Reveal key={room.slug} delay={i * 0.08}>
                <RoomCard room={room} priority={i === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EXPERIENCE / AMENITIES ============ */}
      <section className="relative bg-forest-800 text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]">
          <Image src={IMAGES.garden.src} alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="container-x relative py-24 md:py-32">
          <SectionHeading
            light
            align="center"
            eyebrow="What's included"
            title="The comforts of a hotel, the warmth of a home."
            intro="Every stay comes with the things that matter — and a few that simply make it lovelier."
          />
          <Stagger className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-xl2)] border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((e) => (
              <StaggerItem key={e.title} className="group bg-forest-800 p-8 transition-colors hover:bg-forest-700">
                <e.icon size={28} className="text-brass-400" strokeWidth={1.5} />
                <h3 className="mt-5 font-display text-xl text-cream">{e.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-forest-100/75">{e.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ============ BREAKFAST FEATURE ============ */}
      <section className="bg-cream">
        <div className="container-x py-24 md:py-32 grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <SectionHeading
              eyebrow="The Breakfast"
              title="The best part of waking up here."
              intro="Breakfast is never an afterthought. Each morning brings warm pastries, seasonal fruit, eggs cooked to order and coffee worth getting up for — served in the garden room or out on the terrace."
            />
            <Stagger className="mt-8 grid grid-cols-2 gap-4">
              {[
                "Freshly baked pastries",
                "Eggs cooked to order",
                "Seasonal local fruit",
                "Locally roasted coffee",
                "Loose-leaf teas",
                "Dietary needs catered",
              ].map((item) => (
                <StaggerItem key={item} className="flex items-center gap-3 text-sm text-stone">
                  <span className="h-1.5 w-1.5 rounded-full bg-brass-500 shrink-0" />
                  {item}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <Reveal className="relative aspect-[3/4] rounded-2xl overflow-hidden card-surface">
              <Image src={IMAGES.breakfast.src} alt={IMAGES.breakfast.alt} fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover" />
            </Reveal>
            <Reveal delay={0.12} className="relative aspect-[3/4] rounded-2xl overflow-hidden card-surface mt-8">
              <Image src={IMAGES.coffee.src} alt={IMAGES.coffee.alt} fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ GALLERY STRIP ============ */}
      <section className="bg-ivory">
        <div className="container-x pt-24 md:pt-32">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="The House"
              title="Moments around Gordon's."
            />
            <Reveal delay={0.1}>
              <Link href="/gallery" className="btn btn-outline shrink-0">
                Open the gallery <ArrowRight size={18} />
              </Link>
            </Reveal>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[IMAGES.bedroomLuxe, IMAGES.bathroom, IMAGES.terrace, IMAGES.readingNook].map((img, i) => (
            <Reveal key={i} delay={i * 0.06} className="relative aspect-square overflow-hidden group">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width:640px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-forest-900/0 transition-colors group-hover:bg-forest-900/15" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ INVITATION ============ */}
      <section className="bg-cream">
        <div className="container-x py-24 md:py-32">
          <Reveal className="relative overflow-hidden rounded-[var(--radius-xl2)]">
            <div className="absolute inset-0">
              <Image src={IMAGES.evening.src} alt={IMAGES.evening.alt} fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-forest-900/70" />
            </div>
            <div className="relative px-6 py-20 md:px-16 md:py-28 text-center">
              <Quote size={40} className="mx-auto text-brass-400" strokeWidth={1.25} />
              <p className="mx-auto mt-6 max-w-2xl font-display text-2xl sm:text-3xl leading-snug text-cream text-balance">
                Some places you visit. Others you settle into, exhale, and wish you
                could stay a little longer.
              </p>
              <div className="mt-10">
                <Link href="/booking" className="btn btn-gold text-base">
                  Reserve your stay
                </Link>
              </div>
            </div>
            <Credit author={IMAGES.evening.author} link={IMAGES.evening.link} className="absolute bottom-3 right-3" light />
          </Reveal>
        </div>
      </section>
    </>
  );
}
