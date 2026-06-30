import Link from "next/link";
import Image from "next/image";
import { Users, BedDouble, Maximize, ArrowUpRight } from "lucide-react";
import type { Room } from "@/lib/rooms";

export function RoomCard({ room, priority = false }: { room: Room; priority?: boolean }) {
  return (
    <article className="group card-surface rounded-[var(--radius-xl2)] overflow-hidden flex flex-col">
      <Link href={`/booking?room=${room.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={room.image.src}
          alt={room.image.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/45 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 rounded-full bg-cream/90 backdrop-blur px-3.5 py-1.5 text-xs font-medium tracking-wide text-forest-700">
          from ${room.rate}{" "}
          <span className="text-stone font-normal">/ night</span>
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl text-forest-800">{room.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-stone flex-1">{room.short}</p>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-stone">
          <span className="inline-flex items-center gap-1.5">
            <Users size={15} className="text-brass-500" /> {room.guests} guests
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BedDouble size={15} className="text-brass-500" /> {room.bed}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Maximize size={15} className="text-brass-500" /> {room.size}
          </span>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-forest-700/10 pt-5">
          <Link
            href={`/rooms#${room.slug}`}
            className="link-underline text-sm font-medium text-forest-700"
          >
            View details
          </Link>
          <Link
            href={`/booking?room=${room.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-brass-600 hover:text-brass-500 transition-colors"
          >
            Book <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
