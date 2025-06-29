
import React from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const SocialMediaButtons = () => {
  const isMobile = useIsMobile();
  
  return (
    <div 
      className={`flex flex-wrap gap-3 justify-center w-full px-4 ${isMobile ? 'mb-10' : 'mb-4'}`}
      style={{ 
        opacity: 1,
        minHeight: '44px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <a 
        href="https://x.com/itsgloria_ai" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex-shrink-0 block"
        style={{ display: 'block', minWidth: '80px' }}
      >
        <Button 
          className="py-2 px-4 sm:py-4 sm:px-6 text-sm transition-all duration-300 font-manrope min-w-[80px]"
          variant="default"
        >
          X
        </Button>
      </a>
      <a 
        href="https://t.me/+Aubp8WOVsZM2Njc1" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex-shrink-0 block"
        style={{ display: 'block', minWidth: '80px' }}
      >
        <Button 
          className="py-2 px-4 sm:py-4 sm:px-6 text-sm transition-all duration-300 font-manrope min-w-[80px]"
          variant="default"
        >
          Telegram
        </Button>
      </a>
      <a 
        href="https://gloriaai.gitbook.io/itsgloria" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex-shrink-0 block"
        style={{ display: 'block', minWidth: '80px' }}
      >
        <Button 
          className="py-2 px-4 sm:py-4 sm:px-6 text-sm transition-all duration-300 font-manrope min-w-[80px]"
          variant="default"
        >
          Gitbook
        </Button>
      </a>
    </div>
  );
};

export default SocialMediaButtons;
