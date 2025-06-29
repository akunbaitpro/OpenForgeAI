
export interface NewsItem {
  id: string;
  signal: string;
  timestamp: number;
  enrichment: string;
  likes?: number;
  dislikes?: number;
}

export interface NewsFeedProps {
  onChatToggle?: (isOpen: boolean, signal?: string) => void;
  activeChatSignal?: string;
  feedType?: string;
  activeFeeds?: string[];
}
