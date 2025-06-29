import { Button } from "@/components/ui/button";
import { Twitter, BookOpen, Send } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const FooterSection = () => {
  return (
    <footer className="bg-gloria-dark/95 pt-20 pb-10 border-t border-gloria-primary/20">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div>
              <h3 className="font-semibold text-[#A3A3A3] text-sm mb-5 font-manrope uppercase">Quick Links</h3>
              <ul className="space-y-3 font-poppins">
                <li><a href="#hero" className="text-[#A3A3A3] hover:text-gloria-primary transition-colors duration-300">Home</a></li>
                <li><a href="#problem" className="text-[#A3A3A3] hover:text-gloria-primary transition-colors duration-300">The Problem</a></li>
                <li><a href="#features" className="text-[#A3A3A3] hover:text-gloria-primary transition-colors duration-300">Why Gloria</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-[#A3A3A3] text-sm mb-5 font-manrope uppercase">Resources</h3>
              <ul className="space-y-3 font-poppins">
                <li>
                  <a href="https://gloriaai.gitbook.io/itsgloria" target="_blank" rel="noopener noreferrer" className="text-[#A3A3A3] hover:text-gloria-primary transition-colors duration-300">
                    Documentation
                  </a>
                </li>
                <li><a href="mailto:hello@gloria.ai" className="text-[#A3A3A3] hover:text-gloria-primary transition-colors duration-300">Contact Us</a></li>
                <li>
                  <a href="https://gloriaai.gitbook.io/itsgloria/gloria-news-data-platform/api-integration" target="_blank" rel="noopener noreferrer" className="text-[#A3A3A3] hover:text-gloria-primary transition-colors duration-300">
                    API Reference
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[#A3A3A3] text-sm mb-5 font-manrope uppercase">Follow Us</h3>
              <div className="flex space-x-6">
                <a href="https://x.com/itsgloria_ai" target="_blank" rel="noopener noreferrer" className="text-[#A3A3A3] hover:text-gloria-primary transition-colors duration-300">
                  <Twitter size={22} />
                </a>
                <a href="https://t.me/+Aubp8WOVsZM2Njc1" target="_blank" rel="noopener noreferrer" className="text-[#A3A3A3] hover:text-gloria-primary transition-colors duration-300">
                  <Send size={22} />
                </a>
                <a href="https://gloriaai.gitbook.io/itsgloria" target="_blank" rel="noopener noreferrer" className="text-[#A3A3A3] hover:text-gloria-primary transition-colors duration-300">
                  <BookOpen size={22} />
                </a>
              </div>
            </div>
          </div>
          
          <Separator className="bg-[#333333] my-12" />
          
          <div className="flex justify-between items-center">
            <div className="text-[#A3A3A3] text-sm font-poppins">
              &copy; {new Date().getFullYear()} Gloria AI
            </div>
            <div className="text-[#A3A3A3] text-sm font-poppins">
              <a href="#" className="hover:text-gloria-primary transition-colors duration-300 mr-6">Terms of Use</a>
              <a href="#" className="hover:text-gloria-primary transition-colors duration-300">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
