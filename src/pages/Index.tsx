import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import ExecutiveProfile from "@/components/portfolio/ExecutiveProfile";
import CareerTimeline from "@/components/portfolio/CareerTimeline";
import CoreExpertise from "@/components/portfolio/CoreExpertise";
import PerformanceMetrics from "@/components/portfolio/PerformanceMetrics";
import PromotionalMedia from "@/components/portfolio/PromotionalMediaSimple";
import SectorExperience from "@/components/portfolio/SectorExperience";
import LeadershipPhilosophy from "@/components/portfolio/LeadershipPhilosophy";
import DigitalSystems from "@/components/portfolio/DigitalSystems";
import EducationCertifications from "@/components/portfolio/EducationCertifications";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";

const Index = () => {
  return (
    <main className="scroll-smooth">
      <Navbar />
      <HeroSection />
      <ExecutiveProfile />

      {/* Swapped sections as requested */}
      <CoreExpertise />
      <SectorExperience />
      <PerformanceMetrics />
      <PromotionalMedia />
      <CareerTimeline />

      <LeadershipPhilosophy />
      <DigitalSystems />
      <EducationCertifications />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
