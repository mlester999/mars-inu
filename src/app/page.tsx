import { About } from "@/components/About";
import { ClankBanner } from "@/components/ClankBanner";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowToBuy } from "@/components/HowToBuy";
import { MarsMission } from "@/components/MarsMission";
import { MarketOverview } from "@/components/MarketOverview";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />
        <MarketOverview />
        <About />
        <MarsMission />
        <HowToBuy />
        <ClankBanner />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
