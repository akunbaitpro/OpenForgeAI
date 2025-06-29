
import React, { useEffect } from "react";
import { useNewsFeed } from "@/hooks/useNewsFeed";
import { NewsItem as NewsItemType } from "@/types/news";
import NewsItem from "@/components/news/NewsItem";
import FeedbackDialog from "@/components/news/FeedbackDialog";
import NewsFeedError from "@/components/news/NewsFeedError";
import NewsFeedSearch from "@/components/news/NewsFeedSearch";
import NewsFeedPagination from "@/components/news/NewsFeedPagination";
import LoadingState from "@/components/news/LoadingState";
import { TabContext } from "@/components/DashboardLayout";
import { useContext } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import PopoverTabs from "@/components/PopoverTabs";

interface NewsFeedProps {
  onChatToggle?: (isOpen: boolean, signal?: string) => void;
  activeChatSignal?: string;
  feedType?: string;
  activeFeeds?: string[];
}

const NewsFeed = ({ 
  onChatToggle, 
  activeChatSignal, 
  feedType = "crypto", 
  activeFeeds 
}: NewsFeedProps) => {
  const {
    selectedArticle,
    isLoading,
    useMockData,
    paginatedItems,
    feedbackDialogOpen,
    feedbackText,
    page,
    totalPages,
    searchTerm,
    handleArticleClick,
    handleLike,
    handleDislike,
    setFeedbackDialogOpen,
    setFeedbackText,
    submitFeedback,
    setPage,
    refetch,
    handleDateRangeChange,
    handleSearchChange
  } = useNewsFeed(feedType, activeFeeds);

  const { activeTab, setActiveTab, visibleTabs, setVisibleTabs, hiddenTabs, setHiddenTabs } = useContext(TabContext);
  const [hoveredTab, setHoveredTab] = React.useState<string | null>(null);

  // Log when feedType changes and trigger refetch (for debugging)
  useEffect(() => {
    console.log(`NewsFeed component received feedType: ${feedType}`);
  }, [feedType]);

  // Function to handle logo click to open chat
  const handleLogoClick = (item: NewsItemType, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onChatToggle) {
      // Toggle the chat panel, passing the signal only when opening
      const isCurrentlyActive = activeChatSignal === item.signal;
      onChatToggle(!isCurrentlyActive, isCurrentlyActive ? undefined : item.signal);
    }
  };

  // Format feed type for display
  const displayFeedType = () => {
    if (feedType === "ai_agents") return "AI Agent";
    // Capitalize first letter of each word
    return feedType.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Handle adding a tab from the hidden tabs to visible tabs
  const handleTabAdd = (tab: string) => {
    // Add the tab to visible tabs
    const updatedTabs = [...visibleTabs, tab];
    setVisibleTabs(updatedTabs);
    
    // Remove the tab from hidden tabs
    const updatedHiddenTabs = hiddenTabs.filter(t => t !== tab);
    setHiddenTabs(updatedHiddenTabs);
    
    // Activate the newly added tab
    setActiveTab(tab);
  };

  // Handle removing a tab from visible tabs
  const handleTabRemove = (tab: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering tab change
    
    // Don't allow removing the last tab or the "All" tab
    if (visibleTabs.length <= 1 || tab === "All") {
      return;
    }
    
    // Remove the tab from visible tabs
    const updatedTabs = visibleTabs.filter(t => t !== tab);
    setVisibleTabs(updatedTabs);
    
    // Add the tab to hidden tabs
    const updatedHiddenTabs = [...hiddenTabs, tab];
    setHiddenTabs(updatedHiddenTabs);
    
    // If the removed tab was active, switch to the first available tab
    if (activeTab === tab) {
      setActiveTab(updatedTabs[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gloria-dark text-white">
      <div className="container mx-auto">
        {/* New shared alignment container with consistent padding */}
        <div className="relative max-w-[72ch] mx-auto">
          {/* Tabs with increased font size */}
          <div className="flex space-x-6 overflow-x-auto mb-4 px-0.5">
            {visibleTabs.map((tab) => (
              <div 
                key={tab} 
                className="flex items-center relative"
                onMouseEnter={() => setHoveredTab(tab)}
                onMouseLeave={() => setHoveredTab(null)}
              >
                <button 
                  className={`relative font-bold text-lg transition-all duration-200 transform hover:scale-105 ${
                    activeTab === tab ? 'text-white' : 'text-gray-400'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.replace('_', ' ')}
                  {/* Active tab underline */}
                  {activeTab === tab && (
                    <div className="absolute -bottom-1 left-0 w-full h-1 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.7)]" />
                  )}
                </button>
                
                {/* Close icon that appears on hover, except for "All" tab */}
                {tab !== "All" && (
                  <div 
                    className={cn(
                      "absolute -top-1 -right-3 opacity-0 transition-opacity duration-200 cursor-pointer",
                      hoveredTab === tab && "opacity-100"
                    )}
                    onClick={(e) => handleTabRemove(tab, e)}
                  >
                    <X size={14} className="text-gray-400 hover:text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Plus button with popover for hidden tabs */}
            <div className="flex items-center">
              <PopoverTabs 
                hiddenTabs={hiddenTabs} 
                onTabAdd={handleTabAdd} 
                onRequestCustomFeed={() => {/* Handle request custom feed */}}
              />
            </div>
          </div>

          {/* Search bar - now positioned after tabs */}
          <div className="mb-[-1px] relative z-10">
            <NewsFeedSearch 
              onDateRangeChange={handleDateRangeChange}
              onSearchChange={handleSearchChange}
            />
          </div>
          
          <div className="bg-gloria-dark-accent/10 rounded-md rounded-t-none overflow-hidden relative z-0">
            <NewsFeedError useMockData={useMockData} />

            {/* Display search context if there's a search term */}
            {searchTerm && (
              <div className="px-4 py-2 bg-gloria-primary/10 border-b border-gloria-primary/30 text-gloria-primary text-sm">
                Showing results for: <span className="font-semibold">{searchTerm}</span>
              </div>
            )}
            
            {isLoading ? (
              <LoadingState />
            ) : paginatedItems?.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                {searchTerm ? (
                  <p>No results found for "{searchTerm}". Try a different search term.</p>
                ) : (
                  <p>No news items available for this category.</p>
                )}
              </div>
            ) : (
              <>
                {paginatedItems?.map((item, index) => (
                  <NewsItem
                    key={item.id}
                    item={item}
                    isSelected={selectedArticle?.id === item.id}
                    activeChatSignal={activeChatSignal}
                    onItemClick={handleArticleClick}
                    onLike={handleLike}
                    onDislike={handleDislike}
                    onLogoClick={handleLogoClick}
                    isLast={index === paginatedItems.length - 1}
                  />
                ))}
              </>
            )}
          </div>

          {/* Feedback Dialog */}
          <FeedbackDialog
            open={feedbackDialogOpen}
            onOpenChange={setFeedbackDialogOpen}
            feedbackText={feedbackText}
            onFeedbackTextChange={setFeedbackText}
            onSubmit={submitFeedback}
          />

          {/* Pagination */}
          <NewsFeedPagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
