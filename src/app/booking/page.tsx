import type { Metadata } from "next";
import { Suspense } from "react";
import { ShieldCheck, Mail, CalendarCheck } from "lucide-react";
import { BookingFlow } from "@/components/BookingFlow";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a stay",
  description:
    "Check availability and request your stay at Gordon's Bnb in a few simple steps. No payment taken until your dates are confirmed.",
};

export default function BookingPage() {
  return (
    <section className="bg-cream bg-noise min-h-screen">
      <div className="container-x pt-32 md:pt-36 pb-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Reservations</p>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl text-forest-800 text-balance">
            Book your stay
          </h1>
          <p className="mt-5 text-lg text-stone text-pretty">
            Tell us when you'd like to come and we'll confirm availability personally.
            It only takes a minute — and nothing is charged until your stay is confirmed.
          </p>
        </div>

        {/* Reassurance bar */}
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-stone">
          <span className="inline-flex items-center gap-2">
            <CalendarCheck size={17} className="text-brass-500" /> Free to request
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck size={17} className="text-brass-500" /> No payment taken now
          </span>
          <span className="inline-flex items-center gap-2">
            <Mail size={17} className="text-brass-500" /> Personal email confirmation
          </span>
        </div>

        <div className="mt-12">
          <Suspense fallback={<div className="text-stone">Loading…</div>}>
            <BookingFlow />
          </Suspense>
        </div>

        <p className="mt-10 text-sm text-mist">
          Prefer to arrange by email? Write to us at{" "}
          <a href={`mailto:${SITE.email}`} className="text-forest-700 link-underline">{SITE.email}</a>.
        </p>
      </div>
    </section>
  );
}
