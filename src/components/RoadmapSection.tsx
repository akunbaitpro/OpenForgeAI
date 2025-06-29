import { CheckCircle, Calendar, Flag, Milestone } from "lucide-react";

const RoadmapSection = () => {
  const roadmapItems = [{
    phase: "Phase 1",
    title: "AI Integration",
    status: "Completed",
    description: "Foundation of AI-powered news aggregation and initial knowledge graph implementation.",
    icon: CheckCircle,
    isCompleted: true
  }, {
    phase: "Phase 2",
    title: "Smart Data Delivery",
    status: "Q1 - Q2 2025",
    description: "Launch of curated feeds and enhanced graph-based RAG capabilities for improved context.",
    icon: Calendar,
    isCompleted: false
  }, {
    phase: "Phase 3",
    title: "Premium Features & Customization",
    status: "Q3 2025",
    description: "Introduction of premium features, custom feed creation, and advanced filtering options.",
    icon: Flag,
    isCompleted: false
  }, {
    phase: "Phase 4",
    title: "Expansion",
    status: "Q4 2025",
    description: "Platform expansion to additional verticals and deeper integration options for AI developers.",
    icon: Milestone,
    isCompleted: false
  }];

  return <section id="roadmap" className="section-padding bg-gloria-dark pb-32 md:pb-40">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mt-8 mb-10 text-center text-gloria-light">Our Roadmap</h2>
          
          <p className="text-gloria-light text-lg text-center mb-16 max-w-3xl mx-auto leading-relaxed">
            Here's what we've accomplished and where we're headed on our mission to deliver the ultimate AI-powered news platform.
          </p>
          
          <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-4 md:gap-4">
            {roadmapItems.map((item, index) => {
            const IconComponent = item.icon;
            return <div key={index} className={`relative pt-8 hover-card overflow-visible ${item.isCompleted ? 'bg-gloria-dark-accent bg-opacity-50 border-gloria-primary cyber-border' : 'bg-gloria-dark-accent/30 border-gloria-gray/30'} rounded-xl p-5 border transition-all flex flex-col`}>
                  <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full ${item.isCompleted ? 'bg-gloria-primary' : 'bg-gloria-dark-accent border border-gloria-gray/30'}`} style={{
                zIndex: 10
              }}>
                    {item.isCompleted ? <IconComponent className="h-5 w-5 text-white" /> : <IconComponent className="h-5 w-5 text-gloria-secondary" />}
                  </div>
                  
                  <div className="mt-2 flex flex-col h-full">
                    <div className="text-sm font-medium text-gloria-primary mb-0.5">{item.phase}</div>
                    <h3 className="text-lg font-semibold mt-0 mb-1 text-gloria-light">{item.title}</h3>
                    
                    <div className="roadmap-status h-6 flex items-center">
                      <span className={`text-sm whitespace-nowrap leading-none ${item.isCompleted ? 'text-green-400' : 'text-blue-400'}`}>
                        {item.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-[#A1A1AA] leading-relaxed mt-1" style={{
                  whiteSpace: 'normal',
                  wordBreak: 'keep-all',
                  hyphens: 'none',
                  overflowWrap: 'normal',
                  borderBottom: 'none',
                  textAlign: 'left',
                  minWidth: '100%'
                }}>
                      {item.description}
                    </p>
                  </div>
                </div>;
          })}
          </div>
        </div>
      </div>
    </section>;
};

export default RoadmapSection;
