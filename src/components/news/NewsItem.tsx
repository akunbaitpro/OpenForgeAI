
import React, { useState } from "react";
import { ThumbsDown, ThumbsUp, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewsItem as NewsItemType } from "@/types/news";
import { formatTimeAgo } from "@/utils/dateUtils";

interface NewsItemProps {
  item: NewsItemType;
  isSelected: boolean;
  activeChatSignal?: string;
  onItemClick: (item: NewsItemType) => void;
  onLike: (id: string, e: React.MouseEvent) => void;
  onDislike: (id: string, e: React.MouseEvent) => void;
  onLogoClick: (item: NewsItemType, e: React.MouseEvent) => void;
  isLast?: boolean;
}

const NewsItem: React.FC<NewsItemProps> = ({
  item,
  isSelected,
  activeChatSignal,
  onItemClick,
  onLike,
  onDislike,
  onLogoClick,
  isLast = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = activeChatSignal === item.signal;
  
  return (
    <div
      className={`px-4 py-3 ${
        isSelected || isActive || isHovered
          ? "bg-amber-50/10"
          : "bg-gloria-dark-accent/10"
      } transition-colors duration-200 border-b border-gray-400/30 relative`}
      onClick={() => onItemClick(item)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Vertical left gray line */}
      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gray-400/30"></div>
      
      {/* Vertical right gray line */}
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gray-400/30"></div>
      
      <div>
        <h3 className="font-medium text-[15px] mb-2">{item.signal}</h3>
        
        {/* Footer row with time, logo, dots and interaction buttons */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            {/* Time ago */}
            <span className="whitespace-nowrap">
              {formatTimeAgo(item.timestamp)}
            </span>
            
            {/* Thumbs up button - added between time and thumbs down */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 hover:bg-gloria-dark-accent/30"
              onClick={(e) => onLike(item.id, e)}
            >
              <ThumbsUp size={16} className="text-gray-400 hover:text-green-400" />
            </Button>
            
            {/* Thumbs down button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 hover:bg-gloria-dark-accent/30"
              onClick={(e) => onDislike(item.id, e)}
            >
              <ThumbsDown size={16} className="text-gray-400 hover:text-red-400" />
            </Button>
          </div>
          
          {/* Logo and three dots menu aligned with time */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className={`p-1 h-auto ${isActive ? "text-gloria-primary" : "text-gray-400 hover:text-white"}`}
              onClick={(e) => onLogoClick(item, e)}
            >
              <img 
                src="/lovable-uploads/b32b7939-47b0-42da-89c4-2d6229ceb0e7.png" 
                alt="Gloria Logo" 
                className={`h-4 w-4 transition-transform duration-200 ${isActive ? "ring-1 ring-gloria-primary" : ""}`}
              />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 h-auto text-gray-400 hover:text-white"
            >
              <MoreHorizontal size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
