import { useState, useEffect } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { NewsItem } from "@/types/news";
import { mockNewsData } from "@/data/mockNewsData";
import { fetchNewsData } from "@/utils/apiConfig";
import { getDateRange } from "@/utils/dateUtils";

export const useNewsFeed = (feedType = "crypto", activeFeeds?: string[]) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [useMockData, setUseMockData] = useState(false);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [feedbackItem, setFeedbackItem] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [customDateRange, setCustomDateRange] = useState<{startDate?: Date, endDate?: Date}>({});
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 30;

  const { fromDate, toDate } = getDateRange(customDateRange.startDate, customDateRange.endDate);

  // Normalize feed type to ensure it matches API expectations
  const normalizeType = (type: string): string => {
    let normalized = type.toLowerCase();
    if (normalized === "ai_agent") {
      normalized = "ai_agents";
    }
    return normalized;
  };
  
  const normalizedFeedType = normalizeType(feedType);
  
  // Reset selection when feed type changes
  useEffect(() => {
    console.log(`Feed type changed to: ${normalizedFeedType}`);
    setSelectedArticle(null);
    setPage(1); // Reset to first page when changing feeds
  }, [normalizedFeedType]);
  
  // Handle the "All" feed type by aggregating multiple feeds
  const isAllFeed = normalizedFeedType === "all";

  // For "All" feed type, fetch all active feeds in parallel
  const feedQueries = useQueries({
    queries: isAllFeed && activeFeeds && activeFeeds.length > 0 
      ? activeFeeds.map(feed => {
          const normalizedFeed = normalizeType(feed);
          return {
            queryKey: ['news', normalizedFeed, fromDate, toDate],
            queryFn: () => fetchNewsData(normalizedFeed, fromDate, toDate),
            enabled: isAllFeed,
            retry: 2,
            staleTime: 5 * 60 * 1000 // 5 minutes
          };
        })
      : [],
  });
  
  // Standard query for single feed types
  const { data, isLoading: isSingleFeedLoading, error: singleFeedError, refetch } = useQuery({
    queryKey: ['news', normalizedFeedType, fromDate, toDate],
    queryFn: async () => {
      console.log(`Fetching news for: ${normalizedFeedType}`);
      return fetchNewsData(normalizedFeedType, fromDate, toDate);
    },
    enabled: !isAllFeed,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Determine loading state across all queries
  const isLoading = isAllFeed 
    ? feedQueries.some(query => query.isLoading) 
    : isSingleFeedLoading;

  // Determine error state across all queries
  const error = isAllFeed 
    ? feedQueries.find(query => query.error)?.error 
    : singleFeedError;
  
  // Update date range
  const handleDateRangeChange = (startDate?: Date, endDate?: Date) => {
    console.log("Date range changed:", { startDate, endDate });
    setCustomDateRange({ startDate, endDate });
    // Force a refetch with the new date range
    if (!isAllFeed) {
      refetch();
    }
  };

  // Handle search term changes
  const handleSearchChange = (term: string) => {
    console.log("Search term changed:", term);
    setSearchTerm(term);
    setPage(1); // Reset to first page when search changes
  };

  // Filter news items by search term - updated to match whole words only
  const filterItemsBySearchTerm = (items: NewsItem[]): NewsItem[] => {
    if (!searchTerm.trim()) {
      return items;
    }

    const searchTerms = searchTerm.toLowerCase().trim().split(/\s+/);
    
    return items.filter(item => {
      // Search in signal (title) only
      const signalText = item.signal?.toLowerCase() || "";
      
      // Check if ANY of the search terms is found as a whole word or standalone term
      return searchTerms.some(term => {
        const termRegex = new RegExp(`\\b${term}\\b`, 'i');
        return termRegex.test(signalText);
      });
    });
  };

  // Update newsItems based on query results
  useEffect(() => {
    if (isAllFeed && activeFeeds && activeFeeds.length > 0) {
      // Combine and sort all results from parallel queries
      const allNewsItems = feedQueries
        .filter(query => query.data && Array.isArray(query.data))
        .flatMap(query => query.data || []);
      
      if (allNewsItems.length > 0) {
        // Sort by timestamp (newest first) and deduplicate by id
        const uniqueItems = [...new Map(allNewsItems.map(item => [item.id, item])).values()]
          .sort((a, b) => b.timestamp - a.timestamp);
        
        console.log(`Combined ${allNewsItems.length} items from ${feedQueries.length} feeds into ${uniqueItems.length} unique items`);
        setNewsItems(uniqueItems);
        setUseMockData(false);
      } else if (feedQueries.some(query => query.error)) {
        console.log('Falling back to mock data due to errors in feed queries');
        setNewsItems(mockNewsData);
        setUseMockData(true);
      }
    } else if (data) {
      // Standard single feed
      console.log(`Received ${data.length} news items for ${normalizedFeedType}`);
      setNewsItems(data);
      setUseMockData(false);
    } else if (error) {
      console.log('Falling back to mock data due to error:', error);
      setNewsItems(mockNewsData);
      setUseMockData(true);
    }
  }, [data, error, isAllFeed, feedQueries, activeFeeds, normalizedFeedType]);

  // Handle error with toast
  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading news",
        description: `Using mock data. API error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    }
  }, [error]);

  // Function to handle article click
  const handleArticleClick = (article: NewsItem) => {
    setSelectedArticle(article === selectedArticle ? null : article);
  };

  // Function to handle like
  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNewsItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          return { ...item, likes: (item.likes || 0) + 1 };
        }
        return item;
      })
    );
    toast({
      title: "Thank you for your feedback",
      description: "You've marked this item as helpful.",
      duration: 3000,
    });
  };

  // Function to handle dislike and open feedback dialog
  const handleDislike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFeedbackItem(id);
    setFeedbackDialogOpen(true);
  };

  // Function to submit feedback
  const submitFeedback = () => {
    if (!feedbackItem) return;
    
    // Update dislike count
    setNewsItems(prevItems => 
      prevItems.map(item => {
        if (item.id === feedbackItem) {
          return { ...item, dislikes: (item.dislikes || 0) + 1 };
        }
        return item;
      })
    );
    
    // Close dialog and reset state
    setFeedbackDialogOpen(false);
    toast({
      title: "Feedback submitted",
      description: "Thank you for helping us improve.",
      duration: 3000,
    });
    setFeedbackItem(null);
    setFeedbackText("");
  };

  // Apply search filtering to items
  const filteredItems = filterItemsBySearchTerm(newsItems);

  // Calculate pagination
  const totalPages = Math.ceil((filteredItems?.length || 0) / itemsPerPage);
  const paginatedItems = filteredItems?.slice(
    (page - 1) * itemsPerPage, 
    page * itemsPerPage
  );

  return {
    selectedArticle,
    isLoading,
    error,
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
  };
};
