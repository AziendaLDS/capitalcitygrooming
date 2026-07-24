type ServiceTagProps = {
  name: string;
  price: string;
  description: string;
  /** Alternating tilt for the hand-hung feel. Even = left, odd = right. */
  index?: number;
};

// Signature "Supply Tag" module: a stamped kraft hardware-store hang-tag.
// Punched hole, alternating 1-2deg tilt, settles to 0deg + lift on hover/focus.
// tabIndex makes each tag keyboard-reachable so the settle state is focusable.
// Rotation + settle are disabled under prefers-reduced-motion (globals.css).
export default function ServiceTag({
  name,
  price,
  description,
  index = 0,
}: ServiceTagProps) {
  const tilt = index % 2 === 0 ? "-1.5deg" : "1.5deg";

  return (
    <article
      tabIndex={0}
      className="supply-tag group relative rounded-xl border border-forest/15 bg-paper px-5 pb-6 pt-10 shadow-sm sm:px-6"
      style={{ ["--tag-tilt" as string]: tilt }}
    >
      <span
        aria-hidden="true"
        className="absolute left-6 top-4 h-3 w-3 rounded-full border-2 border-forest/25 bg-[color-mix(in_srgb,var(--forest)_8%,var(--paper))]"
      />
      <span
        aria-hidden="true"
        className="absolute left-4 right-4 top-10 h-px bg-forest/10"
      />

      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-xl font-semibold leading-tight text-forest">
          {name}
        </h3>
        {/* FLAG: placeholder price */}
        <span className="whitespace-nowrap font-mono text-sm text-brass">
          {price}
        </span>
      </div>
      <p className="mt-2 font-body text-sm leading-relaxed text-stone">
        {description}
      </p>
    </article>
  );
}
