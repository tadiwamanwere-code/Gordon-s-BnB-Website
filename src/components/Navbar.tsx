"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SITE, NAV_LINKS } from "@/lib/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open || pathname !== "/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-cream/85 backdrop-blur-md border-b border-forest-700/10 shadow-[0_8px_30px_-24px_rgba(15,31,23,0.5)]"
          : "bg-transparent"
      }`}
    >
      <nav className="container-x flex items-center justify-between h-20 py-3.5">
        <Link href="/" className="flex items-center gap-3 group">
          <span
            className={`relative h-11 w-11 rounded-full overflow-hidden ring-1 transition ${
              solid ? "ring-forest-700/15 bg-paper" : "ring-white/30 bg-white/10 backdrop-blur"
            }`}
          >
            <Image src="/logo.png" alt={SITE.name} fill sizes="44px" className="object-contain p-1" />
          </span>
          <span
            className={`font-display text-xl leading-none tracking-tight transition-colors ${
              solid ? "text-forest-800" : "text-white"
            }`}
          >
            {SITE.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`link-underline text-sm tracking-wide transition-colors ${
                  solid
                    ? active
                      ? "text-forest-700 font-medium"
                      : "text-stone hover:text-forest-700"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link href="/booking" className={solid ? "btn btn-primary text-sm" : "btn btn-gold text-sm"}>
            Book a stay
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full transition ${
            solid ? "text-forest-800 hover:bg-forest-700/10" : "text-white hover:bg-white/10"
          }`}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden bg-cream/98 backdrop-blur-md border-b border-forest-700/10 transition-[max-height,opacity] duration-500 ${
          open ? "max-h-[26rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-x py-6 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`py-3 text-lg font-display border-b border-forest-700/10 ${
                pathname === l.href ? "text-forest-700" : "text-charcoal"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/booking" className="btn btn-primary mt-4 w-full">
            Book a stay
          </Link>
        </div>
      </div>
    </header>
  );
}

