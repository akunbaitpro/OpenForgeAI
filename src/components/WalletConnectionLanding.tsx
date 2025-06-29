
import React, { useState } from "react";
import { WalletConnectModal } from "./WalletConnectModal";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { EmailFormDialog } from "./EmailFormDialog";

interface WalletConnectionLandingProps {
  onConnectWallet: (walletName?: string) => void;
}

const WalletConnectionLanding: React.FC<WalletConnectionLandingProps> = ({ onConnectWallet }) => {
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [emailFormOpen, setEmailFormOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleWalletConnect = (walletName: string) => {
    console.log("Landing: Connecting wallet:", walletName);
    onConnectWallet(walletName);
    setWalletModalOpen(false);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gloria-dark px-4 py-10">
      {/* Container with negative top margin to shift content upward */}
      <div className="flex flex-col items-center mt-[-10vh]">
        {/* Logo - Increased size and reduced bottom margin */}
        <div className="mb-6">
          <img 
            src="/lovable-uploads/579f3c90-5010-4a15-889b-3ce7bde9575e.png" 
            alt="Gloria AI Logo" 
            className="h-20 w-20 object-contain"
          />
        </div>
        
        {/* Headline */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
          Log in to access Gloria AI
        </h1>
        
        {/* Subheading - Increased max width from max-w-lg to max-w-2xl */}
        <p className="text-gloria-gray text-lg md:text-xl mb-8 text-center max-w-2xl">
          Access is by invitation only. Join the waitlist to request access.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Button 
            className="w-full py-6 text-lg rounded-full"
            onClick={() => setWalletModalOpen(true)}
          >
            Log In
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full py-6 text-lg rounded-full"
            onClick={() => setEmailFormOpen(true)}
          >
            Join Waitlist
          </Button>
        </div>
      </div>
      
      {/* Wallet Connect Modal */}
      <WalletConnectModal 
        open={walletModalOpen} 
        onOpenChange={setWalletModalOpen} 
        onWalletConnect={handleWalletConnect}
      />
      
      {/* Email Form Dialog */}
      <EmailFormDialog
        open={emailFormOpen}
        onOpenChange={setEmailFormOpen}
      />
    </div>
  );
};

export default WalletConnectionLanding;
