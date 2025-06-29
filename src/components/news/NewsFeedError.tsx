
import React from "react";
import { AlertCircle } from "lucide-react";

interface NewsFeedErrorProps {
  useMockData: boolean;
}

const NewsFeedError: React.FC<NewsFeedErrorProps> = ({ useMockData }) => {
  if (!useMockData) return null;
  
  return (
    <div className="bg-amber-900/30 border border-amber-600/30 rounded-md p-3 mb-4">
      <div className="flex items-center gap-2">
        <AlertCircle size={18} className="text-amber-400" />
        <p className="text-amber-200 text-sm">
          Using mock data because the API request failed. This is demo data for display purposes.
        </p>
      </div>
    </div>
  );
};

export default NewsFeedError;
