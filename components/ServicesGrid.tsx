import ServiceTag from "@/components/ServiceTag";
import { services } from "@/lib/business";

export default function ServicesGrid() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="mx-auto max-w-content px-4 py-10 sm:px-6 sm:py-16"
    >
      <div className="mb-8 flex flex-col gap-2 sm:mb-10">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-brass">
          The Menu
        </p>
        <h2
          id="services-heading"
          className="font-display text-2xl font-semibold text-forest sm:text-3xl md:text-4xl"
        >
          Services
        </h2>
        {/* FLAG: placeholder service names, prices and descriptions - replace with
            the client's real menu before the final version ships. */}
        <p className="max-w-xl font-body text-sm text-stone">
          Every service below is priced to be worry free, with no surprise fees
          at pickup.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 overflow-visible sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => (
          <ServiceTag
            key={service.name}
            name={service.name}
            price={service.price}
            description={service.description}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
