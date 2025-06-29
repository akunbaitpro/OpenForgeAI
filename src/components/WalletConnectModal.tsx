
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WalletOption {
  name: string;
  icon: string;
  action: () => void;
}

interface WalletConnectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWalletConnect?: (walletName: string) => void;
}

export function WalletConnectModal({ 
  open, 
  onOpenChange, 
  onWalletConnect 
}: WalletConnectModalProps) {
  // Modified connect functions to use the callback
  const connectWithGoogle = () => {
    console.log("Signing in with Google");
    if (onWalletConnect) {
      onWalletConnect("Google");
    }
    onOpenChange(false);
  };

  const connectWallet = (walletName: string) => {
    console.log(`Connecting with ${walletName}`);
    if (onWalletConnect) {
      onWalletConnect(walletName);
    }
    onOpenChange(false);
  };

  const walletOptions: WalletOption[] = [
    {
      name: "MetaMask",
      icon: "/lovable-uploads/53aa3a48-2842-44e9-aec3-be7770ec0bf3.png",
      action: () => connectWallet("MetaMask")
    },
    {
      name: "Phantom",
      icon: "/lovable-uploads/5d1aa7be-782b-471b-b6f1-74296cd422a0.png",
      action: () => connectWallet("Phantom")
    },
    {
      name: "Coinbase Wallet",
      icon: "/lovable-uploads/7dd0a5d6-f5b7-40e7-9cb8-799d52428107.png",
      action: () => connectWallet("Coinbase Wallet")
    },
    {
      name: "Other Wallets",
      icon: "/lovable-uploads/6f566442-0a8a-4d60-837e-f03604c27437.png",
      action: () => connectWallet("Other Wallets")
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gloria-dark border-0 shadow-lg rounded-xl text-white p-6">
        <DialogHeader className="flex items-center border-b border-gray-800 pb-4 mb-4">
          <DialogTitle className="text-xl font-bold text-center">Connect Wallet</DialogTitle>
        </DialogHeader>
        
        {/* Google sign-in button */}
        <Button
          className="w-full py-6 bg-white hover:bg-gray-100 text-black font-medium flex items-center justify-center space-x-2 mb-6 rounded-lg transition-all duration-300 shadow-sm"
          onClick={connectWithGoogle}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign in with Google
        </Button>
        
        <div className="relative flex py-3 items-center">
          <div className="flex-grow border-t border-gray-800"></div>
          <span className="flex-shrink mx-4 text-sm text-gray-400">or connect with wallet</span>
          <div className="flex-grow border-t border-gray-800"></div>
        </div>
        
        {/* Wallet options list */}
        <div className="grid grid-cols-1 gap-3 mt-3">
          {walletOptions.map((wallet) => (
            <button
              key={wallet.name}
              onClick={wallet.action}
              className={cn(
                "flex items-center px-4 py-4 rounded-lg transition-all duration-200",
                "hover:bg-black/40 bg-black/20 group"
              )}
            >
              <img 
                src={wallet.icon} 
                alt={wallet.name}
                className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform"
              />
              <span className="text-gray-100 group-hover:text-white">{wallet.name}</span>
            </button>
          ))}
        </div>
        
        <div className="mt-5 text-center">
          <a 
            href="#" 
            className="text-sm text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
            onClick={(e) => {
              e.preventDefault();
              console.log("I don't have a wallet");
            }}
          >
            I don't have a wallet
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
