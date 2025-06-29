import React, { useState, useContext, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import NewsFeed from "../NewsFeed";
import ChatPanel from "@/components/ChatPanel";
import { TabContext } from "@/components/DashboardLayout";
import { WalletContext } from "@/components/DashboardHeader";
import WalletConnectionLanding from "@/components/WalletConnectionLanding";

interface DashboardLayoutContext {
  setChatPanelOpen: (isOpen: boolean) => void;
}

const Dashboard = () => {
  const [chatPanelOpen, setChatPanelOpen] = useState(false);
  const [activeSignal, setActiveSignal] = useState("");
  const { setChatPanelOpen: setLayoutChatPanelOpen } = useOutletContext<DashboardLayoutContext>();
  const { activeTab, setActiveTab, visibleTabs } = useContext(TabContext);
  const { isWalletConnected, setIsWalletConnected, setWalletName } = useContext(WalletContext);

  // If activeTab is "RWA" and it's no longer in visibleTabs, switch to "All"
  useEffect(() => {
    if (activeTab === "RWA" && !visibleTabs.includes("RWA")) {
      setActiveTab("All");
    }
  }, [activeTab, visibleTabs, setActiveTab]);

  console.log("Dashboard component active tab:", activeTab);
  console.log("Wallet connected status:", isWalletConnected);

  // Convert tab name to API format (lowercase)
  const normalizeTabName = (tabName: string): string => {
    console.log("normalizeTabName input:", tabName);
    
    // Special case for "All" tab
    if (tabName.toLowerCase() === "all") {
      return "all"; // Return 'all' for the All tab
    }
    
    // Special case for AI_Agents to match the API endpoint
    if (tabName.toLowerCase() === "ai_agents") {
      return "ai_agents";
    }
    
    return tabName.toLowerCase();
  };

  // Get active feeds for the "All" tab (exclude "All" itself)
  const getActiveFeeds = (): string[] => {
    return visibleTabs
      .filter(tab => tab.toLowerCase() !== "all")
      .map(tab => normalizeTabName(tab));
  };

  const activeFeeds = getActiveFeeds();
  
  const handleChatToggle = (isOpen: boolean, signal?: string) => {
    // If we're closing the panel, clear the active signal
    if (!isOpen) {
      setActiveSignal("");
    }
    // If we're opening the panel and have a signal, set it
    else if (signal) {
      setActiveSignal(signal);
    }
    
    setChatPanelOpen(isOpen);
    setLayoutChatPanelOpen(isOpen); // Update the layout state
  };

  const handleConnectWallet = (walletName?: string) => {
    setIsWalletConnected(true);
    if (walletName) {
      setWalletName(walletName);
    }
  };

  // Log when activeTab changes (for debugging)
  useEffect(() => {
    console.log(`Active tab in Dashboard changed to: ${activeTab}`);
    console.log(`Active feeds for All tab:`, activeFeeds);
  }, [activeTab, activeFeeds]);

  const currentFeedType = normalizeTabName(activeTab);
  console.log("Current feed type:", currentFeedType);
  
  // Define a fixed width for the chat panel - should match the value in ChatPanel.tsx
  const chatPanelWidthPercentage = 40;

  // If wallet is not connected, show the landing screen
  if (!isWalletConnected) {
    return <WalletConnectionLanding onConnectWallet={handleConnectWallet} />;
  }

  // Otherwise, show the regular dashboard
  return (
    <>
      <div className="flex justify-center relative">
        <ChatPanel 
          isOpen={chatPanelOpen} 
          signal={activeSignal}
          onClose={() => handleChatToggle(false)} 
        />
        
        {/* Updated animation to move exactly the width of the chat panel */}
        <div 
          className="transition-all duration-700 ease-in-out container mx-auto px-0"
          style={{
            width: "100%",
            maxWidth: "72ch", // Keep max-width at 72 characters
            position: "relative",
            transform: chatPanelOpen ? `translateX(${chatPanelWidthPercentage}%)` : "translateX(0)", // Move content right by exact panel width
            transitionProperty: "transform",
            transitionDuration: "700ms",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          <NewsFeed 
            onChatToggle={handleChatToggle} 
            activeChatSignal={activeSignal}
            feedType={currentFeedType}
            activeFeeds={activeFeeds}
            key={activeTab} // Force remount on tab change
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
