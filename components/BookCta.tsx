"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { business } from "@/lib/business";

const fieldClass =
  "mt-1 min-h-11 w-full rounded-lg border border-forest/15 bg-paper px-4 py-3 font-body text-base text-forest outline-none transition-colors placeholder:text-stone/60 focus-visible:border-brass focus-visible:ring-2 focus-visible:ring-brass/30";

const labelClass =
  "font-mono text-xs font-medium uppercase tracking-[0.18em] text-stone";

export default function BookCta() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const dog = String(data.get("dog") ?? "").trim();
    const date = String(data.get("date") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const body = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Dog's name & breed: ${dog}`,
      `Preferred date: ${date || "Not specified"}`,
      "",
      message || "(No additional message)",
    ].join("\n");

    // FLAG: replace with a real shop email or booking endpoint when the client provides one.
    const mailto = `mailto:?subject=${encodeURIComponent(
      `Booking request from ${name || "website"}`,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setStatus("sent");
    form.reset();
  }

  return (
    <section
      id="book"
      aria-labelledby="book-cta-heading"
      className="book-cta-section bg-forest"
    >
      <div className="mx-auto grid max-w-content gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-12 lg:grid-cols-2 lg:items-stretch lg:gap-16">
        <div className="flex h-full flex-col">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-brass">
            Appointments
          </p>
          <h2
            id="book-cta-heading"
            className="mt-2 font-display text-2xl font-semibold text-paper sm:text-3xl md:text-4xl"
          >
            Ready to book?
          </h2>
          <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-paper">
            Gentle with anxious pets. Skilled with every breed. Priced&nbsp;fair.
          </p>

          <p className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.22em] text-brass">
            Fastest way to book
          </p>
          <a
            href={business.phoneHref}
            className="mt-2 inline-flex min-h-11 items-center font-display text-2xl font-semibold tracking-tight text-paper transition-colors hover:text-brass sm:text-3xl md:text-4xl"
          >
            {business.phoneDisplay}
          </a>

          <div className="relative mt-6 aspect-[4/3] w-full max-w-xs overflow-hidden rounded-xl border border-paper/15 sm:max-w-sm lg:mt-auto lg:max-w-none">
            <Image
              src="/images/book.png"
              alt="Freshly groomed dog on the table at Capital City Grooming & Supply"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover object-[center_20%]"
              loading="lazy"
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex h-full flex-col rounded-2xl border border-paper/10 bg-paper p-5 shadow-sm sm:p-6"
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label htmlFor="book-name" className={labelClass}>
                Name
              </label>
              <input
                id="book-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className={fieldClass}
              />
            </div>
            <div className="sm:col-span-1">
              <label htmlFor="book-phone" className={labelClass}>
                Phone
              </label>
              <input
                id="book-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                required
                className={fieldClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="book-dog" className={labelClass}>
                Dog&rsquo;s name &amp; breed
              </label>
              <input
                id="book-dog"
                name="dog"
                type="text"
                required
                className={fieldClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="book-date" className={labelClass}>
                Preferred date
              </label>
              <input
                id="book-date"
                name="date"
                type="date"
                className={`${fieldClass} appearance-none`}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="book-message" className={labelClass}>
                Message
              </label>
              <textarea
                id="book-message"
                name="message"
                rows={4}
                className={`${fieldClass} min-h-[6.5rem] resize-y`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-brass px-6 py-4 font-mono text-sm font-medium uppercase tracking-wider text-paper transition-colors hover:bg-[color-mix(in_srgb,var(--brass)_88%,black)]"
          >
            Send Request
          </button>

          {status === "sent" && (
            <p className="mt-4 font-body text-sm text-stone" role="status">
              Opening your email app with the request. For the fastest answer,
              call{" "}
              <a href={business.phoneHref} className="text-brass underline">
                {business.phoneDisplay}
              </a>
              .
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
