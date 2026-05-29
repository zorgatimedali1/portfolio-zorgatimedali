import { ScrollProvider, useScrollContext } from "@/context/ScrollContext";
import { useLenis } from "@/hooks/useLenis";
import PageLoader from "@/components/PageLoader";
import Navigation from "@/components/Navigation";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import ProjectsSection from "@/sections/ProjectsSection";
import ExperienceSection from "@/sections/ExperienceSection";
import SkillsSection from "@/sections/SkillsSection";
import ServicesSection from "@/sections/ServicesSection";
import ContactSection from "@/sections/ContactSection";

function AppContent() {
  useLenis();
  const { isLoaded } = useScrollContext();

  if (!isLoaded) return <PageLoader />;

  return (
    <div className="relative bg-deep-navy min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <ScrollProvider>
      <AppContent />
    </ScrollProvider>
  );
}
