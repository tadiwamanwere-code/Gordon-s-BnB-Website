import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-cream bg-noise min-h-[80vh] flex items-center">
      <div className="container-x text-center py-32">
        <p className="eyebrow is-centered justify-center">Lost your way?</p>
        <h1 className="mt-6 font-display text-6xl sm:text-8xl text-forest-800">404</h1>
        <p className="mx-auto mt-5 max-w-md text-stone text-lg">
          We couldn't find that page — but your room is still waiting. Let's get you
          back somewhere comfortable.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn btn-primary">Back to home</Link>
          <Link href="/booking" className="btn btn-outline">Book a stay</Link>
        </div>
      </div>
    </section>
  );
}
