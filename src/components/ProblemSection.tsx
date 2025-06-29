import { AlertTriangle, Clock, TrendingDown } from "lucide-react";
const ProblemSection = () => {
  const problems = [{
    icon: <AlertTriangle className="h-8 w-8 text-gloria-secondary" />,
    title: "Information Overload",
    description: "AI agents struggle to filter relevant data from the massive volume of information available across different sources."
  }, {
    icon: <Clock className="h-8 w-8 text-gloria-secondary" />,
    title: "Delayed Insights",
    description: "Critical market movements and news often get processed too late, missing valuable opportunities for timely decision-making."
  }, {
    icon: <TrendingDown className="h-8 w-8 text-gloria-secondary" />,
    title: "Context-Poor Data",
    description: "Raw data feeds lack the contextual relationships and signal extraction needed for AI agents to make informed decisions."
  }];
  return;
};
export default ProblemSection;