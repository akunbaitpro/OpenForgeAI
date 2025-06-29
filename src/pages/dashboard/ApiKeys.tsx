
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ApiKeysModal from "@/components/ApiKeysModal";

const ApiKeys = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-left">API Tokens</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          Manage API Tokens
        </Button>
      </div>
      
      <div className="bg-gloria-dark-accent/20 border border-gloria-dark-accent/30 rounded-lg p-6">
        <p className="text-gray-400 mb-4">
          Manage your API tokens to access Gloria AI's real-time WebSocket feeds and archival data.
        </p>
        <Button onClick={() => setIsModalOpen(true)} variant="outline">
          Open API Tokens Manager
        </Button>
      </div>

      <ApiKeysModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </div>
  );
};

export default ApiKeys;
