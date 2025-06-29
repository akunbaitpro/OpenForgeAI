
import { useState } from 'react';
import { Menu } from "lucide-react";
import { EmailFormDialog } from '@/components/EmailFormDialog';
import NavbarLogo from './NavbarLogo';
import NavbarCenterLinks from './NavbarCenterLinks';
import NavbarRightSection from './NavbarRightSection';
import NavbarMobileMenu from './NavbarMobileMenu';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const centerNavLinks = [
    { 
      name: 'Roadmap', 
      href: '#roadmap', 
      isExternal: false
    },
    { 
      name: 'Why Gloria', 
      href: '#features', 
      isExternal: false
    },
  ];

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleJoinWaitlist = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <div style={{ paddingTop: '39px' }}>
        <nav className="w-full bg-gloria-dark/90 backdrop-blur-md py-3 shadow-md" style={{ position: "relative", zIndex: "9998" }}>
          <div className="container mx-auto flex justify-between items-center">
            <NavbarLogo />
            <NavbarCenterLinks centerNavLinks={centerNavLinks} />
            <NavbarRightSection />

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gloria-light" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <img 
                  src="/lovable-uploads/080726b4-e019-457f-990d-87be34333e29.png" 
                  alt="Close" 
                  className="w-6 h-6"
                />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>

          {/* Mobile Navigation with full screen overlay */}
          {mobileMenuOpen && (
            <NavbarMobileMenu 
              centerNavLinks={centerNavLinks}
              onCloseMobileMenu={handleCloseMobileMenu}
              onJoinWaitlist={handleJoinWaitlist}
            />
          )}
        </nav>
      </div>

      <EmailFormDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
};

export default Navbar;
