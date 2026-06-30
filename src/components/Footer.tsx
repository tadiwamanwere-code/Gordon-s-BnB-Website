import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { SITE, NAV_LINKS } from "@/lib/site";

export function Footer() {
  const year = 2026;
  const socials = [
    { label: "Instagram", href: SITE.social.instagram },
    { label: "Facebook", href: SITE.social.facebook },
  ].filter((s) => s.href);

  return (
    <footer className="bg-forest-800 text-forest-100">
      {/* CTA band */}
      <div className="container-x">
        <div className="-mt-px border-t border-white/10 py-16 md:py-20 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow text-brass-400">Your room is waiting</p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl text-cream max-w-md text-balance">
              Slow mornings and a warm welcome — book your stay.
            </h2>
          </div>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <Link href="/booking" className="btn btn-gold">
              Check availability
            </Link>
            <Link href="/rooms" className="btn btn-ghost-light">
              Browse rooms
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-14 grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <span className="relative h-11 w-11 rounded-full overflow-hidden bg-white/5 ring-1 ring-white/15">
                <Image src="/logo.png" alt={SITE.name} fill sizes="44px" className="object-contain p-1" />
              </span>
              <span className="font-display text-xl text-cream">{SITE.name}</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-forest-100/70 max-w-xs">
              {SITE.tagline}
            </p>
            {socials.length > 0 ? (
              <div className="mt-5 flex gap-4 text-sm">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forest-100/75 hover:text-brass-300 transition-colors link-underline"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-cream text-sm font-semibold tracking-widest uppercase">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-forest-100/75 hover:text-brass-300 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/booking" className="text-forest-100/75 hover:text-brass-300 transition-colors">
                  Book a stay
                </Link>
              </li>
            </ul>
          </div>

          {/* Visit */}
          <div>
            <h3 className="text-cream text-sm font-semibold tracking-widest uppercase">Visit</h3>
            <ul className="mt-5 space-y-3 text-sm text-forest-100/75">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-brass-400 shrink-0" />
                <span>
                  {SITE.address.line1}
                  {SITE.address.region ? `, ${SITE.address.region}` : ""}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 text-brass-400 shrink-0" />
                <span>
                  Check-in {SITE.hours.checkIn.toLowerCase()} · Check-out {SITE.hours.checkOut.toLowerCase()}
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-cream text-sm font-semibold tracking-widest uppercase">Get in touch</h3>
            <ul className="mt-5 space-y-3 text-sm text-forest-100/75">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-brass-400 shrink-0" />
                <a href={`mailto:${SITE.email}`} className="hover:text-brass-300 transition-colors break-all">
                  {SITE.email}
                </a>
              </li>
              {SITE.phone ? (
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-brass-400 shrink-0" />
                  <a href={`tel:${SITE.phoneHref}`} className="hover:text-brass-300 transition-colors">
                    {SITE.phone}
                  </a>
                </li>
              ) : null}
            </ul>
            <Link href="/contact" className="mt-5 inline-block text-sm text-brass-300 link-underline">
              Send us a message
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-forest-100/55">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <p>Photography via Unsplash. Crafted with care.</p>
        </div>
      </div>
    </footer>
  );
}
