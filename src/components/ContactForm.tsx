"use client";

import { useState } from "react";
import { Send, Check, Loader2 } from "lucide-react";
import { SITE } from "@/lib/site";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="card-surface rounded-[var(--radius-xl2)] p-10 text-center">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-forest-50 text-forest-600">
          <Check size={28} />
        </span>
        <h3 className="mt-5 font-display text-2xl text-forest-800">Message received</h3>
        <p className="mt-3 text-stone">
          Thank you for reaching out — we'll get back to you by email very soon. For
          anything urgent, write to us directly at{" "}
          <a href={`mailto:${SITE.email}`} className="text-forest-700 link-underline">{SITE.email}</a>.
        </p>
        <button onClick={() => setStatus("idle")} className="btn btn-outline mt-7">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card-surface rounded-[var(--radius-xl2)] p-7 sm:p-9 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" required placeholder="Jane Gordon" />
        <Field label="Email" name="email" type="email" required placeholder="you@email.com" />
      </div>
      <Field label="Subject" name="subject" placeholder="A question about my stay" />
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-forest-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us how we can help…"
          className="mt-2 w-full rounded-xl border border-forest-700/15 bg-cream/60 px-4 py-3 text-charcoal placeholder:text-mist outline-none transition focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 resize-y"
        />
      </div>

      {status === "error" ? (
        <p className="text-sm text-red-700">
          Something went wrong. Please email us directly at{" "}
          <a href={`mailto:${SITE.email}`} className="underline">{SITE.email}</a>.
        </p>
      ) : null}

      <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-70">
        {status === "sending" ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send message <Send size={17} />
          </>
        )}
      </button>
      <p className="text-center text-xs text-mist">
        We'll only ever use your details to reply to your enquiry.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-forest-700">
        {label} {required ? <span className="text-brass-600">*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-forest-700/15 bg-cream/60 px-4 py-3 text-charcoal placeholder:text-mist outline-none transition focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"
      />
    </div>
  );
}
