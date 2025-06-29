
import React, { useState, createContext } from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader, { WalletContext } from "./DashboardHeader";

// Create a new context for the active tab
export const TabContext = createContext<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
  visibleTabs: string[];
  setVisibleTabs: (tabs: string[]) => void;
  hiddenTabs: string[];
  setHiddenTabs: (tabs: string[]) => void;
}>({
  activeTab: "All",
  setActiveTab: () => {},
  visibleTabs: [],
  setVisibleTabs: () => {},
  hiddenTabs: [],
  setHiddenTabs: () => {}
});

const DashboardLayout: React.FC = () => {
  const [chatPanelOpen, setChatPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  
  // Initial tab configuration - moved RWA to hiddenTabs
  const [visibleTabs, setVisibleTabs] = useState<string[]>(["All", "Crypto", "AI_Agents"]);
  const [hiddenTabs, setHiddenTabs] = useState<string[]>(["Ondo", "Aptos", "RWA"]); 
  
  // Add wallet connection state - default to false so landing screen shows
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletName, setWalletName] = useState("");
  
  // Function to handle tab changes
  const handleTabChange = (tab: string) => {
    console.log(`Tab changed to: ${tab}`);
    setActiveTab(tab);
  };
  
  return (
    <TabContext.Provider value={{ 
      activeTab, 
      setActiveTab,
      visibleTabs,
      setVisibleTabs,
      hiddenTabs,
      setHiddenTabs
    }}>
      <WalletContext.Provider value={{
        isWalletConnected,
        setIsWalletConnected,
        walletName,
        setWalletName
      }}>
        <div className="min-h-screen bg-gloria-dark text-white overflow-x-hidden">
          <DashboardHeader 
            chatPanelOpen={chatPanelOpen} 
            visibleTabs={visibleTabs} 
            hiddenTabs={hiddenTabs}
            activeTab={activeTab} 
            handleTabChange={handleTabChange} 
          />
          <main className="pb-12 flex justify-center relative">
            <div className="w-full">
              <Outlet context={{ setChatPanelOpen }} />
            </div>
          </main>
        </div>
      </WalletContext.Provider>
    </TabContext.Provider>
  );
};

export default DashboardLayout;
