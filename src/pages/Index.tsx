
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import CombinedFeatureSection from "@/components/CombinedFeatureSection";
import MeetGloriaSection from "@/components/MeetGloriaSection";
import RoadmapSection from "@/components/RoadmapSection";
import EmailSubscribeSection from "@/components/EmailSubscribeSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <CombinedFeatureSection />
      <MeetGloriaSection />
      <RoadmapSection />
      <EmailSubscribeSection />
      <FooterSection />
    </div>
  );
};

export default Index;
