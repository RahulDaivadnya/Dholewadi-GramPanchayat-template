import HeroSection from "../components/home/HeroSection";
import StatsStrip from "../components/home/StatsStrip";
import QuickServicesSection from "../components/home/QuickServicesSection";
import NewsHighlightsSection from "../components/home/NewsHighlightsSection";

function HomePage() {
  return (
    <div>
      <HeroSection />
      <StatsStrip />
      <QuickServicesSection />
      <NewsHighlightsSection />
    </div>
  );
}

export default HomePage;
