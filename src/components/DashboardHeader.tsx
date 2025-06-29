import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Key, FileSearch, Settings, LogOut, X } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import FeedRequestDialog from "./FeedRequestDialog";
import PopoverTabs from "./PopoverTabs";
import { AspectRatio } from "./ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { TabContext } from "./DashboardLayout";
import { WalletConnectModal } from '@/components/WalletConnectModal';
import ApiKeysModal from '@/components/ApiKeysModal';

// Create context to share state with other components
export const ChatPanelContext = React.createContext<{
  chatPanelOpen: boolean;
}>({
  chatPanelOpen: false
});

// New wallet connection context
export const WalletContext = React.createContext<{
  isWalletConnected: boolean;
  setIsWalletConnected: (connected: boolean) => void;
  walletName: string;
  setWalletName: (name: string) => void;
}>({
  isWalletConnected: false,
  setIsWalletConnected: () => {},
  walletName: "",
  setWalletName: () => {}
});

interface DashboardHeaderProps {
  chatPanelOpen?: boolean;
  visibleTabs?: string[];
  hiddenTabs?: string[];
  activeTab?: string;
  handleTabChange?: (tab: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  chatPanelOpen = false, 
  visibleTabs = [], 
  hiddenTabs = [],
  activeTab = "", 
  handleTabChange = () => {} 
}) => {
  const navigate = useNavigate();
  const [feedRequestOpen, setFeedRequestOpen] = useState(false);
  const [currentTabs, setCurrentTabs] = useState<string[]>(visibleTabs);
  const [currentHiddenTabs, setCurrentHiddenTabs] = useState<string[]>(hiddenTabs);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [apiKeysModalOpen, setApiKeysModalOpen] = useState(false);
  
  // Get wallet context data instead of managing locally
  const { isWalletConnected, setIsWalletConnected, walletName, setWalletName } = useContext(WalletContext);
  
  const { setVisibleTabs, setHiddenTabs } = useContext(TabContext);
  
  // Handle wallet connection
  const handleWalletConnect = (name: string) => {
    console.log("Header: Connecting wallet:", name);
    setIsWalletConnected(true);
    setWalletName(name);
    setWalletModalOpen(false);
  };
  
  // Handle adding a tab from the hidden tabs to visible tabs
  const handleTabAdd = (tab: string) => {
    // Add the tab to visible tabs
    const updatedTabs = [...currentTabs, tab];
    setCurrentTabs(updatedTabs);
    setVisibleTabs(updatedTabs);
    
    // Remove the tab from hidden tabs
    const updatedHiddenTabs = currentHiddenTabs.filter(t => t !== tab);
    setCurrentHiddenTabs(updatedHiddenTabs);
    setHiddenTabs(updatedHiddenTabs);
    
    // Activate the newly added tab
    handleTabChange(tab);
  };

  // Handle removing a tab from visible tabs
  const handleTabRemove = (tab: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering tab change
    
    // Don't allow removing the last tab or the "All" tab
    if (currentTabs.length <= 1 || tab === "All") {
      return;
    }
    
    // Remove the tab from visible tabs
    const updatedTabs = currentTabs.filter(t => t !== tab);
    setCurrentTabs(updatedTabs);
    setVisibleTabs(updatedTabs);
    
    // Add the tab to hidden tabs
    const updatedHiddenTabs = [...currentHiddenTabs, tab];
    setCurrentHiddenTabs(updatedHiddenTabs);
    setHiddenTabs(updatedHiddenTabs);
    
    // If the removed tab was active, switch to the first available tab
    if (activeTab === tab) {
      handleTabChange(updatedTabs[0]);
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-gloria-dark border-b border-gloria-dark-accent/30">
      <div className="flex justify-between items-center w-full px-6 py-3">
        {/* Logo - Positioned at the very left */}
        <div className="flex items-center">
          <Link to="/" className="flex">
            <img 
              src="/lovable-uploads/9ed4b056-9282-4173-ab95-b84c9a0ff402.png" 
              alt="Gloria AI Logo" 
              className="h-6"
            />
          </Link>
        </div>
        
        {/* Center section */}
        <div 
          className={`flex-grow transition-all duration-700 ease-in-out ${
            chatPanelOpen ? "mr-[-20%]" : ""
          }`}
          style={{
            transitionProperty: "transform, opacity, margin",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          <div className="flex justify-center"></div>
        </div>
        
        {/* Right section - Positioned at the very right */}
        <div className="flex items-center">
          {/* Conditional rendering based on wallet connection status */}
          {!isWalletConnected ? (
            <Button 
              size="nav"
              withArrow
              onClick={() => setWalletModalOpen(true)}
            >
              Connect Wallet
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center">
                <Avatar className="bg-transparent rounded-full w-10 h-10 flex items-center justify-center">
                  <AvatarImage src="/lovable-uploads/a472f503-75e8-4dfe-8a42-36ab9c61247c.png" alt="User avatar" />
                  <AvatarFallback>D</AvatarFallback>
                </Avatar>
                <ChevronDown size={16} className="text-white ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#111] border-gloria-dark-accent/50 text-white">
                <DropdownMenuItem className="hover:bg-gloria-dark-accent/20 focus:bg-gloria-dark-accent/20">
                  <Link to="/dashboard" className="flex items-center w-full">
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="hover:bg-gloria-dark-accent/20 focus:bg-gloria-dark-accent/20"
                  onClick={() => setApiKeysModalOpen(true)}
                >
                  <div className="flex items-center w-full cursor-pointer">
                    <Key size={16} className="mr-2" />
                    <span>API Keys</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gloria-dark-accent/20 focus:bg-gloria-dark-accent/20">
                  <Link to="/dashboard/request-feed" className="flex items-center w-full">
                    <FileSearch size={16} className="mr-2" />
                    <span>Request Feed</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gloria-dark-accent/20 focus:bg-gloria-dark-accent/20">
                  <Link to="/dashboard/settings" className="flex items-center w-full">
                    <Settings size={16} className="mr-2" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gloria-dark-accent/30" />
                <DropdownMenuItem className="hover:bg-gloria-dark-accent/20 focus:bg-gloria-dark-accent/20 text-red-400">
                  <button 
                    className="flex items-center w-full"
                    onClick={() => setIsWalletConnected(false)}
                  >
                    <LogOut size={16} className="mr-2" />
                    <span>Disconnect Wallet</span>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      
      {/* Feed Request Dialog */}
      <FeedRequestDialog open={feedRequestOpen} onOpenChange={setFeedRequestOpen} />
      
      {/* Modified Wallet Connect Modal */}
      <WalletConnectModal 
        open={walletModalOpen} 
        onOpenChange={setWalletModalOpen} 
        onWalletConnect={handleWalletConnect}
      />
      
      {/* API Keys Modal */}
      <ApiKeysModal 
        open={apiKeysModalOpen} 
        onOpenChange={setApiKeysModalOpen} 
      />
    </header>
  );
};

export default DashboardHeader;
