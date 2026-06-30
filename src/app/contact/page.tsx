import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Gordon's Bnb — ask a question, check availability or plan your stay. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you."
        intro="A question about a room, a special request, or just planning ahead — drop us a line and we'll reply personally."
        image={IMAGES.garden}
      />

      <section className="bg-cream bg-noise">
        <div className="container-x py-24 md:py-32 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Details */}
          <Reveal>
            <p className="eyebrow">Get in touch</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl text-forest-800 text-balance">
              However you'd like to reach us.
            </h2>
            <p className="mt-5 text-stone leading-relaxed max-w-md">
              We answer every message ourselves, usually within a day. For the quickest
              reply, email is best.
            </p>

            <ul className="mt-9 space-y-6">
              <ContactRow icon={Mail} label="Email">
                <a href={`mailto:${SITE.email}`} className="link-underline text-forest-700">
                  {SITE.email}
                </a>
              </ContactRow>

              {SITE.phone ? (
                <ContactRow icon={Phone} label="Phone">
                  <a href={`tel:${SITE.phoneHref}`} className="link-underline text-forest-700">
                    {SITE.phone}
                  </a>
                </ContactRow>
              ) : null}

              <ContactRow icon={MapPin} label="Where to find us">
                <span className="text-stone">
                  {SITE.address.line1}
                  {SITE.address.region ? <>, {SITE.address.region}</> : null}
                </span>
              </ContactRow>

              <ContactRow icon={Clock} label="Front desk hours">
                <span className="text-stone">{SITE.hours.reception}</span>
              </ContactRow>
            </ul>

            <div className="mt-10 rounded-2xl border border-forest-700/10 bg-paper p-6">
              <p className="text-sm text-stone leading-relaxed">
                <span className="font-medium text-forest-700">Check-in</span> {SITE.hours.checkIn.toLowerCase()} ·{" "}
                <span className="font-medium text-forest-700">Check-out</span> {SITE.hours.checkOut.toLowerCase()}.
                Early arrivals and late departures can often be arranged — just ask.
              </p>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-forest-50 text-forest-600 shrink-0">
        <Icon size={19} />
      </span>
      <div>
        <p className="text-xs uppercase tracking-widest text-mist">{label}</p>
        <p className="mt-1 text-base">{children}</p>
      </div>
    </li>
  );
}
