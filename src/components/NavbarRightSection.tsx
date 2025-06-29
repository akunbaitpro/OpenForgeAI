import { Button } from "@/components/ui/button";
import { Send, Twitter } from "lucide-react";
const NavbarRightSection = () => {
  return <div className="hidden md:flex items-center w-1/5 justify-end">
      <div className="flex items-center space-x-4 mr-4">
        {/* X (Twitter) Icon */}
        <a href="https://x.com/itsgloria_ai" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gloria-primary transition-colors duration-300 flex items-center justify-center" aria-label="X (Twitter)">
          <Twitter size={20} />
        </a>
        
        {/* Telegram Icon */}
        <a href="https://t.me/+Aubp8WOVsZM2Njc1" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gloria-primary transition-colors duration-300 flex items-center justify-center" aria-label="Telegram">
          <Send size={20} />
        </a>
        
        {/* Docs link */}
        <a href="https://gloriaai.gitbook.io/itsgloria" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white transition-all duration-200 flex items-center font-manrope group">
          
          
        </a>
      </div>

      {/* Open App Button */}
      <Button size="nav" asChild>
        <a href="https://app.itsgloria.ai/" target="_blank" rel="noopener noreferrer">Open App</a>
      </Button>
    </div>;
};
export default NavbarRightSection;