import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center max-w-2xl" : "max-w-2xl"}`}>
      {eyebrow ? (
        <Reveal>
          <p className={`eyebrow ${centered ? "is-centered" : ""}`}>{eyebrow}</p>
        </Reveal>
      ) : null}
      <Reveal delay={0.05}>
        <h2
          className={`mt-5 font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.05] text-balance ${
            light ? "text-cream" : "text-forest-800"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={0.1}>
          <p
            className={`mt-5 text-base sm:text-lg leading-relaxed text-pretty ${
              light ? "text-forest-100/80" : "text-stone"
            }`}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
