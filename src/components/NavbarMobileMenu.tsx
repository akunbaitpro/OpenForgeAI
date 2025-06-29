
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Send, Twitter } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
  isExternal: boolean;
}

interface NavbarMobileMenuProps {
  centerNavLinks: NavLink[];
  onCloseMobileMenu: () => void;
  onJoinWaitlist: () => void;
}

const NavbarMobileMenu = ({ 
  centerNavLinks, 
  onCloseMobileMenu, 
  onJoinWaitlist 
}: NavbarMobileMenuProps) => {
  return (
    <>
      {/* Full screen black overlay */}
      <div 
        className="fixed top-0 left-0 w-full h-full bg-black z-40" 
        style={{ opacity: 1 }}
        onClick={onCloseMobileMenu}
      />
      
      {/* Mobile Navigation (on top of overlay) */}
      <div 
        className="md:hidden fixed top-[53px] left-0 w-full py-6 z-[9999] border-t border-gloria-primary/20" 
        style={{ 
          backgroundColor: "#000000", 
          backdropFilter: "none", 
          zIndex: 100 
        }}
      >
        <div className="container mx-auto flex flex-col space-y-5">
          {centerNavLinks.map((link) => (
            link.href.startsWith('#') ? (
              <a
                key={link.name}
                href={link.href}
                className="py-2 font-manrope group flex items-center space-x-2 relative transition-colors duration-300 cursor-pointer text-white hover:text-white"
                onClick={onCloseMobileMenu}
              >
                <span className="relative">
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gloria-primary origin-left transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </span>
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="text-white hover:text-white py-2 transition-colors duration-300 font-manrope group flex items-center space-x-2 relative"
                onClick={onCloseMobileMenu}
              >
                <span className="relative">
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gloria-primary origin-left transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </span>
              </Link>
            )
          ))}
          
          {/* Mobile Social Icons */}
          <div className="flex items-center space-x-6 py-2">
            <a 
              href="https://x.com/itsgloria_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gloria-primary transition-colors duration-300"
              onClick={onCloseMobileMenu}
              aria-label="X (Twitter)"
            >
              <Twitter size={24} />
            </a>
            <a 
              href="https://t.me/+Aubp8WOVsZM2Njc1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gloria-primary transition-colors duration-300"
              onClick={onCloseMobileMenu}
              aria-label="Telegram"
            >
              <Send size={24} />
            </a>
          </div>
          
          <a 
            href="https://gloriaai.gitbook.io/itsgloria"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white py-2 transition-all duration-200 flex items-center font-manrope group"
            onClick={onCloseMobileMenu}
          >
            <span>Docs</span>
            <span className="ml-1.5 transform group-hover:translate-x-[2px] transition-transform duration-200">{'>'}</span>
          </a>
          
          {/* Mobile Open App Button */}
          <Button className="w-full" asChild>
            <a href="https://app.itsgloria.ai/" target="_blank" rel="noopener noreferrer" onClick={onCloseMobileMenu}>Open App</a>
          </Button>
          
          <Button 
            withArrow
            className="w-full"
            onClick={() => {
              onCloseMobileMenu();
              onJoinWaitlist();
            }}
          >
            Join Waitlist
          </Button>
        </div>
      </div>
    </>
  );
};

export default NavbarMobileMenu;
