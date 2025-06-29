
import React, { useEffect, useRef, useState } from "react";
import { History, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchPerplexityResponse, Message } from "@/utils/perplexityApi";
import { toast } from "@/components/ui/use-toast";
import { cleanPerplexityResponse } from "@/lib/utils";

interface ChatPanelProps {
  isOpen: boolean;
  signal: string;
  onClose: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, signal, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Initialize system message
  const systemMessage: Message = {
    role: "system",
    content: "You are Gloria AI, a helpful assistant focused on providing information about cryptocurrency, blockchain, and financial markets. Be concise, accurate, and helpful."
  };

  // Initialize chat with the signal as the first message
  useEffect(() => {
    if (signal && isOpen) {
      const initialMessages: Message[] = [
        systemMessage,
        {
          role: "user",
          content: signal,
        }
      ];
      
      setMessages([
        {
          role: "user",
          content: signal,
        }
      ]);
      
      // Fetch response from Perplexity
      setIsLoading(true);
      fetchPerplexityResponse(initialMessages)
        .then(responseContent => {
          // Clean the response before adding it to messages
          const cleanedResponse = cleanPerplexityResponse(responseContent);
          setMessages(prev => [
            ...prev,
            {
              role: "assistant",
              content: cleanedResponse
            }
          ]);
        })
        .catch(error => {
          console.error("Error initializing chat:", error);
          toast({
            title: "Error",
            description: "Failed to initialize chat. Please try again.",
            variant: "destructive"
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [signal, isOpen]);

  // Auto-focus the input when the panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300); // Small delay to wait for the animation
    }
  }, [isOpen]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close on ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleEsc);
    
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user", 
      content: input
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input
    setInput("");
    
    // Prepare the full conversation history for context
    const conversationHistory = [
      systemMessage,
      ...messages.filter(msg => msg.role !== "system"),
      userMessage
    ];
    
    // Show loading state
    setIsLoading(true);
    
    try {
      // Get AI response from Perplexity
      const responseContent = await fetchPerplexityResponse(conversationHistory);
      
      // Clean the response before adding it to messages
      const cleanedResponse = cleanPerplexityResponse(responseContent);
      
      // Add AI response to chat
      setMessages(prev => [
        ...prev, 
        { 
          role: "assistant", 
          content: cleanedResponse
        }
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Calculate the panel width as a percentage - this will be used in Dashboard.tsx to match exact sliding
  const panelWidthPercentage = 40;

  return (
    <div 
      className={`fixed left-0 top-0 h-full shadow-lg z-50 transition-transform duration-700 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ 
        width: `${panelWidthPercentage}%`, // Set width to 40%
        backgroundColor: "#1A1A1A", 
        borderRight: "1px solid rgba(255, 255, 255, 0.1)" 
      }}
    >
      {/* Header - fixed at the top */}
      <div className="absolute top-0 left-0 right-0 p-4 border-b border-gray-800 flex items-center justify-between bg-[#1A1A1A] z-10">
        <div className="flex items-center gap-2">
          {/* Only the Gloria logo, removed the text */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/b32b7939-47b0-42da-89c4-2d6229ceb0e7.png" 
              alt="Gloria Logo" 
              className="h-5 w-5"
            />
          </div>
        </div>
        
        {/* Control buttons moved to the right */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400 hover:text-white p-1 h-9 w-9"
          >
            <History size={20} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="text-gray-400 hover:text-white p-1 h-9 w-9"
          >
            <X size={20} />
          </Button>
        </div>
      </div>

      {/* Chat messages - scrollable area in the middle */}
      <ScrollArea 
        className="flex-1 p-4 h-[calc(100%-8rem)] mt-16 mb-[4.5rem]"
        style={{ color: "white" }}
      >
        <div className="space-y-4">
          {messages.map((message, index) => (
            message.role === "assistant" ? (
              // Assistant messages with Gloria icon
              <div key={index} className="mb-6">
                <div className="flex items-center mb-2">
                  <img 
                    src="/lovable-uploads/b32b7939-47b0-42da-89c4-2d6229ceb0e7.png" 
                    alt="Gloria Logo" 
                    className="h-5 w-5 mr-2"
                  />
                </div>
                <div className="text-white whitespace-pre-wrap">
                  {message.content}
                </div>
              </div>
            ) : (
              // User messages (right-aligned with bubble)
              <Card 
                key={index} 
                className="p-3 max-w-[85%] ml-auto bg-[#232321] text-white"
              >
                {message.content}
              </Card>
            )
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-400">
              <div className="animate-bounce">●</div>
              <div className="animate-bounce" style={{ animationDelay: "0.2s" }}>●</div>
              <div className="animate-bounce" style={{ animationDelay: "0.4s" }}>●</div>
            </div>
          )}
          
          {/* Invisible div at the bottom for scrolling */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input area - fixed at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 bg-[#1A1A1A]">
        <div className="flex items-end gap-2">
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Message Gloria AI..."
            className="resize-none bg-[#232321] border-gray-700 min-h-[60px] rounded-md text-white"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            className="h-10 w-10 rounded-full p-2 flex items-center justify-center"
            disabled={!input.trim() || isLoading}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
