import Hero from "./sections/Hero";
import WhyGalaxrxSection from "./sections/WhyGalaxrxSection";
import SolutionsSection from "./sections/SolutionsSection";
import ResultsSection from "./sections/ResultsSection";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import ParticlesBackground from "./components/ParticlesBackground";

export default function Home() {
  return (
    <>
      <ParticlesBackground />
      <div className="relative z-10">
        <Hero />
        <WhyGalaxrxSection />
        <SolutionsSection />
        <ResultsSection />
        <AboutSection />
        <ContactSection />
      </div>
    </>
  );
}
