"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  CalendarDays,
  Users,
  BedDouble,
  Loader2,
  PartyPopper,
} from "lucide-react";
import { ROOMS, getRoom } from "@/lib/rooms";
import { SITE } from "@/lib/site";

type Step = 0 | 1 | 2;

function todayISO() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}
function addDaysISO(iso: string, days: number) {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
function nightsBetween(a: string, b: string) {
  if (!a || !b) return 0;
  return Math.max(0, Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86_400_000));
}
function prettyDate(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const steps = ["Your stay", "Your details", "Review"];

export function BookingFlow() {
  const params = useSearchParams();
  const initialRoom = params.get("room");

  const [step, setStep] = useState<Step>(0);
  const [roomSlug, setRoomSlug] = useState(
    getRoom(initialRoom ?? "")?.slug ?? ROOMS[0].slug
  );
  const today = todayISO();
  const [checkIn, setCheckIn] = useState(addDaysISO(today, 7));
  const [checkOut, setCheckOut] = useState(addDaysISO(today, 9));
  const [guests, setGuests] = useState(2);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [reference, setReference] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const room = useMemo(() => getRoom(roomSlug)!, [roomSlug]);
  const nights = nightsBetween(checkIn, checkOut);
  const total = nights * room.rate;

  const stayValid = nights > 0 && guests > 0 && guests <= room.guests;
  const detailsValid =
    name.trim().length > 1 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

  async function submit() {
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomSlug, checkIn, checkOut, guests, name, email, phone, notes }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      setReference(data.reference);
      setStatus("done");
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="mx-auto max-w-2xl card-surface rounded-[var(--radius-xl2)] p-8 sm:p-12 text-center">
        <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-forest-50 text-forest-600">
          <PartyPopper size={30} />
        </span>
        <h2 className="mt-6 font-display text-3xl text-forest-800">Request received</h2>
        <p className="mt-3 text-stone">
          Thank you, {name.split(" ")[0]}. We've received your request and will confirm
          availability by email shortly. No payment has been taken yet.
        </p>

        <div className="mt-8 rounded-2xl bg-ivory p-6 text-left">
          <div className="flex items-center justify-between">
            <span className="text-sm text-stone">Reference</span>
            <span className="font-mono font-semibold text-forest-700">{reference}</span>
          </div>
          <hr className="my-4 border-forest-700/10" />
          <Row label="Room" value={room.name} />
          <Row label="Dates" value={`${prettyDate(checkIn)} → ${prettyDate(checkOut)}`} />
          <Row label="Nights" value={`${nights}`} />
          <Row label="Guests" value={`${guests}`} />
          <hr className="my-4 border-forest-700/10" />
          <div className="flex items-center justify-between">
            <span className="font-medium text-forest-800">Estimated total</span>
            <span className="font-display text-2xl text-forest-700">${total}</span>
          </div>
        </div>

        <p className="mt-6 text-sm text-stone">
          A confirmation will be sent to <span className="text-forest-700">{email}</span>.
          Questions? Email us at{" "}
          <a href={`mailto:${SITE.email}`} className="text-forest-700 link-underline">{SITE.email}</a>.
        </p>
        <Link href="/" className="btn btn-outline mt-8">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
      {/* Left: steps */}
      <div>
        {/* Stepper */}
        <ol className="flex items-center gap-2 sm:gap-4">
          {steps.map((label, i) => {
            const active = i === step;
            const done = i < step;
            return (
              <li key={label} className="flex flex-1 items-center gap-2 sm:gap-3">
                <span
                  className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-medium transition ${
                    done
                      ? "bg-forest-600 text-cream"
                      : active
                        ? "bg-brass-500 text-forest-900"
                        : "bg-forest-700/10 text-stone"
                  }`}
                >
                  {done ? <Check size={16} /> : i + 1}
                </span>
                <span className={`hidden sm:block text-sm ${active ? "text-forest-800 font-medium" : "text-stone"}`}>
                  {label}
                </span>
                {i < steps.length - 1 ? (
                  <span className="flex-1 h-px bg-forest-700/10" />
                ) : null}
              </li>
            );
          })}
        </ol>

        <div className="mt-8 card-surface rounded-[var(--radius-xl2)] p-6 sm:p-8">
          {/* STEP 0 — Stay */}
          {step === 0 ? (
            <div>
              <h2 className="font-display text-2xl text-forest-800">Choose your stay</h2>

              <p className="mt-6 text-sm font-medium text-forest-700">Room</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {ROOMS.map((r) => {
                  const selected = r.slug === roomSlug;
                  return (
                    <button
                      key={r.slug}
                      type="button"
                      onClick={() => {
                        setRoomSlug(r.slug);
                        if (guests > r.guests) setGuests(r.guests);
                      }}
                      className={`group text-left rounded-2xl border p-1.5 transition ${
                        selected ? "border-brass-500 ring-2 ring-brass-500/30" : "border-forest-700/12 hover:border-forest-700/30"
                      }`}
                    >
                      <span className="relative block aspect-[4/3] overflow-hidden rounded-xl">
                        <Image src={r.image.src} alt={r.image.alt} fill sizes="200px" className="object-cover" />
                      </span>
                      <span className="block px-2 pt-2 pb-1">
                        <span className="block text-sm font-medium text-forest-800">{r.name}</span>
                        <span className="block text-xs text-stone">${r.rate} / night</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <DateField
                  label="Check-in"
                  value={checkIn}
                  min={today}
                  onChange={(v) => {
                    setCheckIn(v);
                    if (nightsBetween(v, checkOut) <= 0) setCheckOut(addDaysISO(v, 2));
                  }}
                />
                <DateField
                  label="Check-out"
                  value={checkOut}
                  min={addDaysISO(checkIn, 1)}
                  onChange={setCheckOut}
                />
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium text-forest-700">Guests</p>
                <div className="mt-3 inline-flex items-center gap-4 rounded-full border border-forest-700/15 bg-cream/60 px-2 py-1.5">
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    className="h-9 w-9 rounded-full bg-paper border border-forest-700/10 text-forest-700 hover:bg-forest-50 transition"
                    aria-label="Fewer guests"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-medium text-forest-800">{guests}</span>
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.min(room.guests, g + 1))}
                    className="h-9 w-9 rounded-full bg-paper border border-forest-700/10 text-forest-700 hover:bg-forest-50 transition disabled:opacity-40"
                    disabled={guests >= room.guests}
                    aria-label="More guests"
                  >
                    +
                  </button>
                  <span className="pl-2 text-xs text-stone">Max {room.guests} in this room</span>
                </div>
              </div>

              <div className="mt-9 flex justify-end">
                <button
                  type="button"
                  disabled={!stayValid}
                  onClick={() => setStep(1)}
                  className="btn btn-primary disabled:opacity-50"
                >
                  Continue <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ) : null}

          {/* STEP 1 — Details */}
          {step === 1 ? (
            <div>
              <h2 className="font-display text-2xl text-forest-800">Your details</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Input label="Full name" value={name} onChange={setName} required placeholder="Jane Gordon" />
                <Input label="Email" type="email" value={email} onChange={setEmail} required placeholder="you@email.com" />
              </div>
              <div className="mt-5">
                <Input label="Phone (optional)" type="tel" value={phone} onChange={setPhone} placeholder="Best number to reach you" />
              </div>
              <div className="mt-5">
                <label className="block text-sm font-medium text-forest-700">Special requests (optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Arrival time, dietary needs, a celebration…"
                  className="mt-2 w-full rounded-xl border border-forest-700/15 bg-cream/60 px-4 py-3 text-charcoal placeholder:text-mist outline-none transition focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 resize-y"
                />
              </div>

              <div className="mt-9 flex justify-between">
                <button type="button" onClick={() => setStep(0)} className="btn btn-outline">
                  <ChevronLeft size={18} /> Back
                </button>
                <button
                  type="button"
                  disabled={!detailsValid}
                  onClick={() => setStep(2)}
                  className="btn btn-primary disabled:opacity-50"
                >
                  Review <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ) : null}

          {/* STEP 2 — Review */}
          {step === 2 ? (
            <div>
              <h2 className="font-display text-2xl text-forest-800">Review &amp; confirm</h2>
              <p className="mt-2 text-sm text-stone">
                Please check the details below. We'll confirm availability by email — no
                payment is taken now.
              </p>

              <dl className="mt-6 divide-y divide-forest-700/10 rounded-2xl bg-ivory px-5">
                <ReviewRow label="Name" value={name} />
                <ReviewRow label="Email" value={email} />
                {phone ? <ReviewRow label="Phone" value={phone} /> : null}
                <ReviewRow label="Room" value={room.name} />
                <ReviewRow label="Check-in" value={prettyDate(checkIn)} />
                <ReviewRow label="Check-out" value={prettyDate(checkOut)} />
                <ReviewRow label="Guests" value={`${guests}`} />
                {notes ? <ReviewRow label="Requests" value={notes} /> : null}
              </dl>

              {status === "error" ? (
                <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errorMsg}</p>
              ) : null}

              <div className="mt-9 flex justify-between">
                <button type="button" onClick={() => setStep(1)} className="btn btn-outline">
                  <ChevronLeft size={18} /> Back
                </button>
                <button
                  type="button"
                  onClick={submit}
                  disabled={status === "sending"}
                  className="btn btn-gold disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>Confirm request</>
                  )}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Right: live summary */}
      <aside className="lg:sticky lg:top-28 self-start">
        <div className="card-surface rounded-[var(--radius-xl2)] overflow-hidden">
          <div className="relative aspect-[16/10]">
            <Image src={room.image.src} alt={room.image.alt} fill sizes="(max-width:1024px) 100vw, 33vw" className="object-cover" />
            <span className="absolute top-3 left-3 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-forest-700">
              {room.name}
            </span>
          </div>
          <div className="p-6">
            <p className="text-sm text-stone">{room.short}</p>

            <ul className="mt-5 space-y-3 text-sm text-stone">
              <li className="flex items-center gap-2.5">
                <CalendarDays size={16} className="text-brass-500" />
                {prettyDate(checkIn)} → {prettyDate(checkOut)}
              </li>
              <li className="flex items-center gap-2.5">
                <BedDouble size={16} className="text-brass-500" /> {room.bed}
              </li>
              <li className="flex items-center gap-2.5">
                <Users size={16} className="text-brass-500" /> {guests} guest{guests > 1 ? "s" : ""}
              </li>
            </ul>

            <div className="mt-6 space-y-2 border-t border-forest-700/10 pt-5 text-sm">
              <div className="flex justify-between text-stone">
                <span>${room.rate} × {nights || 0} night{nights === 1 ? "" : "s"}</span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between font-medium text-forest-800">
                <span>Estimated total</span>
                <span className="font-display text-xl text-forest-700">${total}</span>
              </div>
              <p className="pt-1 text-xs text-mist">Taxes and any extras confirmed on booking.</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-stone">{label}</span>
      <span className="text-forest-800 font-medium">{value}</span>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-6 py-3.5 text-sm">
      <span className="text-stone shrink-0">{label}</span>
      <span className="text-forest-800 text-right">{value}</span>
    </div>
  );
}

function DateField({
  label,
  value,
  min,
  onChange,
}: {
  label: string;
  value: string;
  min?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-forest-700">{label}</label>
      <input
        type="date"
        value={value}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-forest-700/15 bg-cream/60 px-4 py-3 text-charcoal outline-none transition focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"
      />
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-forest-700">
        {label} {required ? <span className="text-brass-600">*</span> : null}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-forest-700/15 bg-cream/60 px-4 py-3 text-charcoal placeholder:text-mist outline-none transition focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"
      />
    </div>
  );
}
