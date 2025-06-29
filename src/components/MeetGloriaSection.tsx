import { Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
const MeetGloriaSection = () => {
  return <section id="meet-gloria" className="py-8 md:py-12 bg-gloria-dark-accent bg-gloria-dark">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6 p-4 md:p-6 rounded-xl border border-gloria-primary/20 hover-card bg-gray-950 px-0 mx-0 py-[14px]">
            {/* Image */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="rounded-xl overflow-hidden border border-gloria-primary/30 shadow-lg shadow-gloria-primary/10">
                <img src="/lovable-uploads/7db54915-b06a-49bd-9c17-364128737dc8.png" alt="Gloria AI" className="w-full h-auto transform transition-all duration-500 hover:scale-105 object-cover" />
              </div>
            </div>
            
            {/* Content */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gloria-light text-center">
                Meet Gloria:<br />
                AI News in Action
              </h2>
              
              <p className="text-[#A1A1AA] text-base leading-relaxed mb-6 text-center">
                Our agent Gloria on X is a live example of real-time, AI-driven news curation—showing how our platform delivers unbiased, context-rich updates.
              </p>
              
              <div className="flex justify-center md:justify-start my-[29px] py-[8px]">
                <Button className="bg-gloria-primary hover:bg-gloria-primary/90 text-gloria-light py-3 px-6 text-base transition-all duration-300 font-manrope" onClick={() => window.open("https://x.com/itsgloria_ai", "_blank")}>
                  <Twitter className="mr-2 h-5 w-5" />
                  Follow Gloria on Twitter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default MeetGloriaSection;