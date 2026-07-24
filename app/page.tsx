import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import BookCta from "@/components/BookCta";
import LocationHours from "@/components/LocationHours";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main">
        <div id="top" tabIndex={-1} className="outline-none" />
        <Hero />
        <About />
        <ServicesGrid />
        <Gallery />
        <Reviews />
        <BookCta />
        <LocationHours />
      </main>
      <Footer />
    </>
  );
}
