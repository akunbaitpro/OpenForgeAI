import React, { useState } from "react";
import { Search, CalendarRange, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { DateRange } from "react-day-picker";

interface NewsFeedSearchProps {
  onDateRangeChange?: (startDate?: Date, endDate?: Date) => void;
  onSearchChange?: (searchTerm: string) => void;
}

const NewsFeedSearch: React.FC<NewsFeedSearchProps> = ({ 
  onDateRangeChange,
  onSearchChange 
}) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<Date | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  const handleApply = () => {
    if (onDateRangeChange) {
      onDateRangeChange(dateRange?.from, dateRange?.to);
    }
    setIsOpen(false);
  };

  const handleClear = () => {
    setDateRange(undefined);
    setHoveredDate(undefined);
    if (onDateRangeChange) {
      onDateRangeChange(undefined, undefined);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearchChange) {
      onSearchChange(searchTerm);
    }
  };

  const handleSearchButtonClick = () => {
    if (onSearchChange) {
      onSearchChange(searchTerm);
    }
  };

  const displayDateRange = () => {
    if (dateRange?.from && dateRange?.to) {
      return `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d, yyyy")}`;
    }
    if (dateRange?.from) {
      return `${format(dateRange.from, "MMM d, yyyy")}`;
    }
    return "Add dates";
  };

  const getDisplayRange = (): DateRange | undefined => {
    if (!dateRange?.from) {
      return undefined;
    }
    if (dateRange.to) {
      return dateRange;
    }
    if (hoveredDate && hoveredDate > dateRange.from) {
      return { from: dateRange.from, to: hoveredDate };
    }
    return { from: dateRange.from, to: dateRange.from };
  };

  const handleDayMouseEnter = (date: Date) => {
    if (dateRange?.from && !dateRange.to) {
      setHoveredDate(date);
    }
  };

  const handleCalendarMouseLeave = () => {
    setHoveredDate(undefined);
  };

  return (
    <div className="flex items-center bg-[#1E1E24] border border-[#2A2A33] shadow-sm w-full rounded-full mb-0 relative">
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        <div className="w-px h-[50%] bg-gray-400/30 absolute left-[-1px] bottom-0 z-0"></div>
        <div className="w-px h-[50%] bg-gray-400/30 absolute right-[-1px] bottom-0 z-0"></div>
      </div>

      <div className="flex-1 flex items-center pl-4 z-10">
        <Input
          placeholder="Search"
          className="border-0 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0 h-12 p-0 text-[#CCC] placeholder:text-[#BBB]"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
        />
      </div>

      <Separator orientation="vertical" className="h-8 bg-gray-400/30 z-10" />

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button className="flex items-center justify-center px-4 h-12 focus:outline-none z-10 hover:bg-[#2A2A33]/30 rounded-r-full transition-colors">
            <div className="flex flex-col items-start mr-2">
              <span className="text-sm font-medium text-[#CCC]">Date</span>
              <span className="text-sm text-[#BBB]">
                {displayDateRange()}
              </span>
            </div>
            <CalendarRange size={18} className="text-[#CCC]" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <div className="flex flex-col" onMouseLeave={handleCalendarMouseLeave}>
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              defaultMonth={dateRange?.from}
              onDayMouseEnter={handleDayMouseEnter}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
              modifiersClassNames={{
                hover: "day-hover-range",
              }}
            />
            <div className="flex justify-between p-3 border-t border-gray-200">
              <Button 
                onClick={handleClear} 
                size="sm" 
                variant="outline"
                className="hover:bg-red-100/10 hover:text-red-400 hover:border-red-400/30"
                disabled={!dateRange}
              >
                <X size={16} className="mr-1" /> Clear
              </Button>
              <Button 
                onClick={handleApply} 
                size="sm" 
                className="bg-gloria-primary hover:bg-gloria-primary/90"
              >
                <Check size={16} className="mr-1" /> Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Button
        size="icon"
        className="rounded-full w-10 h-10 m-1 bg-[#232329] border border-[#3A3A45] hover:bg-[#2A2A33] transition-colors z-10"
        onClick={handleSearchButtonClick}
      >
        <Search size={18} className="text-[#CCC]" />
      </Button>
    </div>
  );
};

export default NewsFeedSearch;
