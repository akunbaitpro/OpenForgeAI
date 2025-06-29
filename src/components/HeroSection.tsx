
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { EmailFormDialog } from "@/components/EmailFormDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import ProductBySection from "@/components/ProductBySection";
import AITechBackground from "@/components/AITechBackground";

const HeroSection = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const rotatingWords = ["AI Agents", "Hedge Funds", "DeFAI"];
  const [index, setIndex] = useState(0);
  const isMobile = useIsMobile();

  // Track if image has been loaded to prevent layout shifts
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => prev + 1);
    }, 2500); // 1.5s animation + 1s pause = 2.5s total cycle

    return () => clearInterval(interval);
  }, []);

  // Different paragraph text based on device size
  const paragraphText = isMobile ? "Gloria AI makes it easy to stream real-time news into any workflow—all through a simple API." : "Gloria AI makes it easy to deliver real-time data into any workflow. Access curated feeds, filter through a dynamic knowledge graph, and deliver context-rich insights—all powered by a simple API.";

  return (
    <section id="hero" className="min-h-[80vh] flex items-center hero-section overflow-x-hidden relative">
      <AITechBackground />
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-full relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center animate-fade-in pt-2 md:pt-2 lg:pt-2">
          
          {/* Logo and heading in horizontal layout */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src="/lovable-uploads/bdf1e23f-c4f2-4240-875e-37b1eae5a73b.png" 
              alt="Gloria AI Logo" 
              className="h-16 md:h-20 lg:h-24" 
            />
            <h1 className="text-4xl md:text-[3.5rem] lg:text-7xl font-bold text-gloria-light tracking-tight leading-tight font-manrope font-[400] locked-font-weight" style={{
              letterSpacing: "-0.01em",
            }}>
              <span className="inline-block whitespace-nowrap font-normal">OpenForge AI</span>
            </h1>
          </div>
          
          <div className="relative h-[4rem] md:h-[6rem] lg:h-[7rem] overflow-visible mt-8 md:mt-16 mx-auto min-w-[10rem] md:min-w-[12rem]" style={{
            width: isMobile ? "100%" : "min-content",
            perspective: "1000px"
          }}>
            <div className="transition-transform duration-[1500ms] ease-in-out" style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${index * 120}deg)`,
              transitionDuration: "1500ms"
            }}>
              {rotatingWords.map((word, i) => <div key={i} className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white whitespace-nowrap text-4xl md:text-[3.5rem] lg:text-7xl text-center" style={{
                transform: `rotateX(-${i * 120}deg) translateZ(${isMobile ? "2.5rem" : "4rem"})`,
                backfaceVisibility: "hidden",
                opacity: 1,
                backgroundColor: "#000000",
                padding: "0 10px"
              }}>
                {word}
              </div>)}
            </div>
          </div>
          
          <p className="text-[#F3F3F3] text-lg mb-5 font-poppins mx-auto text-center max-w-[825px]" style={{
            marginTop: "0"
          }}>
            {paragraphText}
          </p>
          
          <ProductBySection />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-16 max-w-xs sm:max-w-lg mx-auto px-4">
            <Button size="lg" onClick={() => setDialogOpen(true)} className="bg-gloria-primary text-white hover:bg-gloria-primary/90 px-4 text-sm font-manrope py-[13px] rounded-3xl">
              Join Waitlist
            </Button>
            <a href="https://app.virtuals.io/virtuals/22418" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-white text-white bg-transparent hover:bg-white/10 py-3 px-4 text-sm font-manrope w-full" size="lg">
                Buy $GLORIA
              </Button>
            </a>
          </div>
        </div>
      </div>

      <EmailFormDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
};

export default HeroSection;
