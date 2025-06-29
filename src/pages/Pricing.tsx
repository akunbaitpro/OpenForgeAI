
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import PricingSection from "@/components/PricingSection";
import { Separator } from "@/components/ui/separator";

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <div className="pt-8 pb-16">
          <PricingSection />
        </div>
      </div>
      <Separator className="bg-gloria-dark-accent" />
      <FooterSection />
    </div>
  );
};

export default Pricing;
