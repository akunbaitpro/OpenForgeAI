import { Database, Shield, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
const CombinedFeatureSection = () => {
  const differentiators = [{
    icon: <Database className="h-12 w-12 text-gloria-secondary" />,
    title: "High-Quality, Real-Time Curated Data",
    description: "Multiple verified streams across media, markets, and onchain activity with graph-based contextual relationships ensure comprehensive, real-time information."
  }, {
    icon: <Shield className="h-12 w-12 text-gloria-secondary" />,
    title: "Customizable Subfilters",
    description: "Domain presets, entity weighting, and personalized filters tailored to your specific AI agent requirements."
  }, {
    icon: <Users className="h-12 w-12 text-gloria-secondary" />,
    title: "Multi-Agent Architecture",
    description: "Our collaborative AI system ensures minimal hallucinations and maximum reliability for critical applications."
  }, {
    icon: <Award className="h-12 w-12 text-gloria-secondary" />,
    title: "Deep Industry Expertise",
    description: "Our agent Gloria on X is a live example of real-time, AI-driven news curation—showing how our platform delivers unbiased, context-rich updates."
  }];
  return;
};
export default CombinedFeatureSection;