
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface PopoverTabsProps {
  hiddenTabs: string[];
  onTabAdd: (tab: string) => void;
  onRequestCustomFeed: () => void;
}

const PopoverTabs: React.FC<PopoverTabsProps> = ({ 
  hiddenTabs, 
  onTabAdd,
  onRequestCustomFeed
}) => {
  const handleTabAdd = (tab: string) => {
    onTabAdd(tab);
    toast({
      description: `${tab} feed added to your dashboard`,
      duration: 3000,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-transparent transition-transform duration-200 transform hover:scale-105"
        >
          <Plus size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-48 p-2 bg-[#111] border-gloria-dark-accent/50 text-white"
        sideOffset={10}
        align="center"
      >
        <div className="space-y-2">
          {hiddenTabs.length > 0 && (
            <>
              <h4 className="text-xs font-medium text-gray-400 mb-1">Pre-curated Feeds</h4>
              <div className="flex flex-col space-y-1">
                {hiddenTabs.map((tab) => (
                  <Button
                    key={tab}
                    variant="ghost" 
                    className="justify-start px-2 py-1.5 h-auto text-sm text-gray-300 hover:text-white hover:bg-gloria-dark-accent/20"
                    onClick={() => handleTabAdd(tab)}
                  >
                    {tab.replace('_', ' ')}
                  </Button>
                ))}
              </div>
              <div className="border-t border-gloria-dark-accent/30 my-1"></div>
            </>
          )}
          <Button
            variant="ghost" 
            className="justify-start w-full px-2 py-1.5 h-auto text-sm text-gray-300 hover:text-white hover:bg-gloria-dark-accent/20"
            onClick={onRequestCustomFeed}
          >
            Request Custom Feed
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverTabs;
