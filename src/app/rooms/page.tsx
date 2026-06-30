import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Users, BedDouble, Maximize, Eye, Check, ArrowRight } from "lucide-react";
import { ROOMS } from "@/lib/rooms";
import { IMAGES } from "@/lib/images";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Credit } from "@/components/Credit";

export const metadata: Metadata = {
  title: "Rooms",
  description:
    "Explore the rooms at Gordon's Bnb — three thoughtfully appointed spaces, each with its own character, comfort and quiet.",
};

export default function RoomsPage() {
  return (
    <>
      <PageHero
        eyebrow="Accommodation"
        title="Three rooms, each with its own story."
        intro="Small, considered and kept beautifully — choose the space that suits the kind of stay you're after."
        image={IMAGES.bedroomLuxe}
      />

      <section className="bg-cream bg-noise">
        <div className="container-x py-24 md:py-32 flex flex-col gap-24 md:gap-32">
          {ROOMS.map((room, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={room.slug}
                id={room.slug}
                className="scroll-mt-28 grid gap-10 lg:grid-cols-2 lg:items-center"
              >
                {/* Images */}
                <Reveal className={flip ? "lg:order-2" : ""}>
                  <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[24rem] sm:h-[30rem]">
                    <div className="relative col-span-2 row-span-2 rounded-2xl overflow-hidden card-surface">
                      <Image
                        src={room.gallery[0].src}
                        alt={room.gallery[0].alt}
                        fill
                        sizes="(max-width:1024px) 66vw, 33vw"
                        className="object-cover"
                      />
                      <Credit author={room.gallery[0].author} link={room.gallery[0].link} className="absolute bottom-2 right-2" light />
                    </div>
                    <div className="relative rounded-2xl overflow-hidden card-surface">
                      <Image src={room.gallery[1].src} alt={room.gallery[1].alt} fill sizes="33vw" className="object-cover" />
                    </div>
                    <div className="relative rounded-2xl overflow-hidden card-surface">
                      <Image src={room.gallery[2].src} alt={room.gallery[2].alt} fill sizes="33vw" className="object-cover" />
                    </div>
                  </div>
                </Reveal>

                {/* Details */}
                <Reveal delay={0.1} className={flip ? "lg:order-1" : ""}>
                  <p className="eyebrow">Room {String(i + 1).padStart(2, "0")}</p>
                  <h2 className="mt-4 font-display text-3xl sm:text-4xl text-forest-800">{room.name}</h2>

                  <div className="mt-5 space-y-4">
                    {room.longDescription.map((p, idx) => (
                      <p key={idx} className="text-base leading-relaxed text-stone text-pretty">
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Specs */}
                  <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[
                      { icon: Users, label: `${room.guests} guests` },
                      { icon: BedDouble, label: room.bed },
                      { icon: Maximize, label: room.size },
                      { icon: Eye, label: room.view },
                    ].map((s) => (
                      <div key={s.label} className="rounded-xl bg-paper border border-forest-700/8 px-4 py-3">
                        <s.icon size={18} className="text-brass-500" />
                        <p className="mt-2 text-xs text-stone leading-tight">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Amenities */}
                  <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5">
                    {room.amenities.map((a) => (
                      <span key={a} className="inline-flex items-center gap-2 text-sm text-stone">
                        <Check size={15} className="text-forest-500" /> {a}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-9 flex flex-wrap items-center gap-5">
                    <Link href={`/booking?room=${room.slug}`} className="btn btn-primary">
                      Book this room <ArrowRight size={18} />
                    </Link>
                    <p className="text-sm text-stone">
                      <span className="font-display text-2xl text-forest-700">${room.rate}</span> / night
                    </p>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-forest-800 text-cream">
        <div className="container-x py-20 text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-cream text-balance">
            Not sure which room is right?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-forest-100/80">
            Tell us a little about your stay and we'll help you choose. We're always happy to hear from you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/booking" className="btn btn-gold">Check availability</Link>
            <Link href="/contact" className="btn btn-ghost-light">Ask a question</Link>
          </div>
        </div>
      </section>
    </>
  );
}
