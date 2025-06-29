import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Trash2, Check, Plus, Minus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ApiKeysModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ApiKey {
  id: string;
  token: string;
  expires: string;
  categories?: string[];
  name?: string;
}

const FEED_CATEGORIES = [
  "Crypto",
  "AI Agents", 
  "RWA",
  "Ondo",
  "Aptos"
];

const ApiKeysModal: React.FC<ApiKeysModalProps> = ({ open, onOpenChange }) => {
  
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "1",
      token: "eyJhb...CJONE",
      expires: "5/20/2030",
      categories: ["Crypto", "AI Agents"],
      name: "Trading Bot API"
    },
    {
      id: "2", 
      token: "eyJhb...K4eVo",
      expires: "5/25/2030",
      categories: ["RWA", "Ondo"],
      name: "Analytics Dashboard"
    },
    {
      id: "3",
      token: "eyJhb...M9XyZ",
      expires: "6/15/2030",
      categories: ["Crypto", "AI Agents", "RWA", "Ondo", "Aptos"],
      name: "Full Access Token"
    }
  ]);

  const [showCategorySelection, setShowCategorySelection] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [tokenName, setTokenName] = useState("");
  const [showExampleSection, setShowExampleSection] = useState(false);
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

  const handleCopyKey = (token: string) => {
    navigator.clipboard.writeText(token);
    toast({
      title: "API key copied",
      description: "Your API key has been copied to the clipboard.",
      duration: 2000,
    });
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    toast({
      title: "API key deleted",
      description: "The API key has been deleted successfully.",
      duration: 2000,
    });
  };

  const handleStartGenerateKey = () => {
    setSelectedCategories([]);
    setTokenName("");
    setShowCategorySelection(true);
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleGenerateKey = () => {
    if (!tokenName.trim()) {
      toast({
        title: "Token name required",
        description: "Please enter a name for your API token.",
        duration: 2000,
      });
      return;
    }

    if (selectedCategories.length === 0) {
      toast({
        title: "No categories selected",
        description: "Please select at least one feed category.",
        duration: 2000,
      });
      return;
    }

    const newKey = {
      id: Date.now().toString(),
      token: "eyJhb..." + Math.random().toString(36).substring(2, 7),
      expires: "5/26/2031",
      categories: selectedCategories,
      name: tokenName
    };
    
    setApiKeys([...apiKeys, newKey]);
    setShowCategorySelection(false);
    setSelectedCategories([]);
    setTokenName("");
    
    toast({
      title: "New API key generated",
      description: `API key "${tokenName}" created with access to ${selectedCategories.join(", ")}.`,
      duration: 2000,
    });
  };

  const handleCancelGeneration = () => {
    setShowCategorySelection(false);
    setSelectedCategories([]);
    setTokenName("");
  };

  // Helper function to format categories display
  const formatCategories = (categories: string[] = []) => {
    if (categories.length === 0) return "All";
    if (categories.length <= 3) return categories.join(", ");
    return `${categories.slice(0, 3).join(", ")}…`;
  };

  const renderToken = (key: ApiKey) => {
    // Show last 4 characters with dots for the rest
    const lastFour = key.token.slice(-4);
    return `••••••${lastFour}`;
  };

  const handleCopyCode = (code: string, codeId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedStates(prev => ({ ...prev, [codeId]: true }));
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [codeId]: false }));
    }, 2000);
    
    toast({
      title: "Code copied",
      description: "The code has been copied to your clipboard.",
      duration: 2000,
    });
  };

  const CodeBlock = ({ code, language, codeId }: { code: string; language: string; codeId: string }) => {
    const isCopied = copiedStates[codeId];
    
    const renderHighlightedCode = (code: string, language: string) => {
      if (language === 'curl') {
        return (
          <span>
            <span className="text-emerald-400">curl</span>{' '}
            <span className="text-yellow-300">-X</span>{' '}
            <span className="text-orange-300">GET</span>{' '}
            <span className="text-blue-300">"https://ai-hub.cryptobriefing.com/news/crypto?api_key=</span>
            <span className="text-pink-300">{'{{api_key}}'}</span>
            <span className="text-blue-300">&from_date=2025-05-01&to_date=2025-05-07"</span>
          </span>
        );
      } else if (language === 'javascript') {
        return (
          <div>
            <div className="block">
              <span className="text-purple-400">const</span>{' '}
              <span className="text-blue-300">fetchNews</span>{' '}
              <span className="text-white">=</span>{' '}
              <span className="text-purple-400">async</span>{' '}
              <span className="text-white">() =&gt; {'{'}</span>
            </div>
            <div className="block">
              {'  '}<span className="text-purple-400">const</span>{' '}
              <span className="text-blue-300">response</span>{' '}
              <span className="text-white">=</span>{' '}
              <span className="text-purple-400">await</span>{' '}
              <span className="text-yellow-300">fetch</span>
              <span className="text-white">(</span>
            </div>
            <div className="block">
              {'    '}<span className="text-green-300">'https://ai-hub.cryptobriefing.com/news/crypto?api_key=</span>
              <span className="text-pink-300">{'{{api_key}}'}</span>
              <span className="text-green-300">&from_date=2025-05-01&to_date=2025-05-10'</span>
            </div>
            <div className="block">
              {'  '}<span className="text-white">);</span>
            </div>
            <div className="block">
              {'  '}
            </div>
            <div className="block">
              {'  '}<span className="text-purple-400">if</span>{' '}
              <span className="text-white">(!response.ok) {'{'}</span>
            </div>
            <div className="block">
              {'    '}<span className="text-purple-400">throw</span>{' '}
              <span className="text-purple-400">new</span>{' '}
              <span className="text-yellow-300">Error</span>
              <span className="text-white">(</span>
              <span className="text-green-300">`HTTP error! Status: $</span>
              <span className="text-green-300">{'{'}</span>
              <span className="text-green-300">response.status</span>
              <span className="text-green-300">{'}'}`</span>
              <span className="text-white">);</span>
            </div>
            <div className="block">
              {'  '}<span className="text-white">{'}'}</span>
            </div>
            <div className="block">
              {'  '}
            </div>
            <div className="block">
              {'  '}<span className="text-purple-400">const</span>{' '}
              <span className="text-blue-300">data</span>{' '}
              <span className="text-white">=</span>{' '}
              <span className="text-purple-400">await</span>{' '}
              <span className="text-blue-300">response</span>
              <span className="text-white">.</span>
              <span className="text-yellow-300">json</span>
              <span className="text-white">();</span>
            </div>
            <div className="block">
              {'  '}<span className="text-purple-400">return</span>{' '}
              <span className="text-blue-300">data</span>
              <span className="text-white">;</span>
            </div>
            <div className="block">
              <span className="text-white">{'};'}</span>
            </div>
            <div className="block">
              {''}
            </div>
            <div className="block">
              <span className="text-gray-500">// Usage</span>
            </div>
            <div className="block">
              <span className="text-yellow-300">fetchNews</span>
              <span className="text-white">()</span>
            </div>
            <div className="block">
              {'  '}<span className="text-white">.</span>
              <span className="text-yellow-300">then</span>
              <span className="text-white">(</span>
              <span className="text-blue-300">newsItems</span>{' '}
              <span className="text-white">=&gt; {'{'}</span>
            </div>
            <div className="block">
              {'    '}<span className="text-blue-300">console</span>
              <span className="text-white">.</span>
              <span className="text-yellow-300">log</span>
              <span className="text-white">(</span>
              <span className="text-green-300">`Received $</span>
              <span className="text-green-300">{'{'}</span>
              <span className="text-green-300">newsItems.length</span>
              <span className="text-green-300">{'}'} news items`</span>
              <span className="text-white">);</span>
            </div>
            <div className="block">
              {'    '}<span className="text-blue-300">newsItems</span>
              <span className="text-white">.</span>
              <span className="text-yellow-300">forEach</span>
              <span className="text-white">(</span>
              <span className="text-blue-300">item</span>{' '}
              <span className="text-white">=&gt; {'{'}</span>
            </div>
            <div className="block">
              {'      '}<span className="text-blue-300">console</span>
              <span className="text-white">.</span>
              <span className="text-yellow-300">log</span>
              <span className="text-white">(</span>
              <span className="text-green-300">`$</span>
              <span className="text-green-300">{'{'}</span>
              <span className="text-green-300">new Date(item.timestamp * 1000).toLocaleString()</span>
              <span className="text-green-300">{'}'}: $</span>
              <span className="text-green-300">{'{'}</span>
              <span className="text-green-300">item.signal</span>
              <span className="text-green-300">{'}'}`</span>
              <span className="text-white">);</span>
            </div>
            <div className="block">
              {'    '}<span className="text-white">{'});'}</span>
            </div>
            <div className="block">
              {'  '}<span className="text-white">{'}'}</span>
            </div>
            <div className="block">
              {'  '}<span className="text-white">.</span>
              <span className="text-yellow-300">catch</span>
              <span className="text-white">(</span>
              <span className="text-blue-300">error</span>{' '}
              <span className="text-white">=&gt; {'{'}</span>
            </div>
            <div className="block">
              {'    '}<span className="text-blue-300">console</span>
              <span className="text-white">.</span>
              <span className="text-red-400">error</span>
              <span className="text-white">(</span>
              <span className="text-green-300">'Error fetching news:'</span>
              <span className="text-white">,</span>{' '}
              <span className="text-blue-300">error</span>
              <span className="text-white">);</span>
            </div>
            <div className="block">
              {'  '}<span className="text-white">{'});'}</span>
            </div>
          </div>
        );
      } else if (language === 'websocket') {
        // Use a simpler pre element with plain text to avoid JSX parsing issues
        return (
          <pre className="text-gray-300 whitespace-pre-wrap text-xs">
{`// Create WebSocket connection
const socket = new WebSocket('wss://ai-hub.cryptobriefing.com/ws/feed?api_key={{api_key}}');

// Connection opened
socket.addEventListener('open', (event) => {
  console.log('Connected to WebSocket server');
  
  // Subscribe to a feed
  socket.send(JSON.stringify({
    type: 'subscribe',
    timeline: 'crypto'
  }));
});

// Listen for messages
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  
  switch(message.type) {
    case 'data':
      if (message.content) {
        console.log(\`New update for \${message.timeline}:\`, message.content.signal);
      } else if (message.action === 'subscribed') {
        console.log(\`Successfully subscribed to \${message.timeline}\`);
      } else {
        console.log('Data message:', message);
      }
      break;
    case 'error':
      console.error('Error:', message.error, message.details);
      break;
    case 'ping':
      // Respond with pong to keep connection alive
      socket.send(JSON.stringify({
        type: 'pong',
        timestamp: message.timestamp
      }));
      break;
  }
});

// Handle connection close
socket.addEventListener('close', (event) => {
  console.log('Connection closed:', event.code, event.reason);
});

// Handle errors
socket.addEventListener('error', (event) => {
  console.error('WebSocket error:', event);
});`}
          </pre>
        );
      }
      return <span className="text-gray-300">{code}</span>;
    };

    return (
      <div className="relative bg-gray-900/60 rounded border border-gray-700 p-3">
        <button
          onClick={() => handleCopyCode(code, codeId)}
          className="absolute top-2 right-2 p-1.5 rounded bg-gray-800/80 hover:bg-gray-700/80 transition-colors text-gray-300 hover:text-white"
          title={isCopied ? "Copied!" : "Copy code"}
        >
          {isCopied ? <Check size={14} /> : <Copy size={14} />}
        </button>
        <code className="text-xs font-mono block pr-8">
          {renderHighlightedCode(code, language)}
        </code>
      </div>
    );
  };

  return (
    <TooltipProvider>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-4xl bg-gloria-dark border-gloria-primary/20 max-h-[90vh] overflow-auto">
          <DialogHeader className="border-b border-gray-700 py-4">
            <div className="flex items-center justify-between h-10">
              <DialogTitle className="text-gloria-light text-2xl font-normal flex items-center h-full">
                {showCategorySelection ? "Generate new API token" : "API tokens"}
              </DialogTitle>
              {!showCategorySelection && (
                <Button 
                  onClick={handleStartGenerateKey}
                  className="bg-white text-black hover:bg-gray-200 rounded-full py-2 px-4 h-10 flex items-center"
                >
                  Generate new token
                </Button>
              )}
            </div>
          </DialogHeader>
        
        {showCategorySelection ? (
          <div className="mt-6">
            <div className="max-w-md mx-auto space-y-6">
              {/* Token Name Field */}
              <div className="flex items-center gap-4">
                <Label htmlFor="token-name" className="text-gloria-light text-sm font-medium min-w-fit">
                  Token name *
                </Label>
                <Input
                  id="token-name"
                  placeholder="Enter a name for your API token"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  className="bg-gloria-dark-accent/60 border-white/30 text-gloria-light placeholder:text-[#A1A1AA] flex-1"
                />
              </div>

              {/* Feed Category Access */}
              <div className="flex items-start gap-4">
                <Label className="text-gloria-light text-sm font-medium min-w-fit pt-1">
                  Feed category access *
                </Label>
                
                {/* Category Options in Grid */}
                <div className="flex-1 grid grid-cols-1 gap-3">
                  {FEED_CATEGORIES.map((category) => (
                    <div key={category} className="flex items-center space-x-3">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryToggle(category)}
                      />
                      <label 
                        htmlFor={category} 
                        className="text-white text-sm cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-700 flex justify-center gap-3">
              <Button 
                onClick={handleGenerateKey}
                className="px-8 bg-white text-black hover:bg-gray-200 rounded-full py-3"
              >
                Generate Token
              </Button>
              <Button 
                onClick={handleCancelGeneration}
                variant="outline"
                className="px-8"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            {/* Table Header */}
            <div className="grid grid-cols-[1fr_1.2fr_1.5fr_0.8fr_minmax(100px,1fr)] gap-6 pb-4 border-b border-gray-700">
              <div className="text-white font-medium text-left">Token name</div>
              <div className="text-white font-medium text-left pl-4">Token</div>
              <div className="text-white font-medium text-left">Categories</div>
              <div className="text-white font-medium text-left">Expiration</div>
              <div className="text-white font-medium text-center">Actions</div>
            </div>
            
            {/* API Keys List */}
            <div className="space-y-4 mt-4">
              {apiKeys.map((key) => (
                <div key={key.id} className="grid grid-cols-[1fr_1.2fr_1.5fr_0.8fr_minmax(100px,1fr)] gap-6 items-center py-2">
                  <div className="text-white text-sm text-left">{key.name || "Unnamed"}</div>
                  <div className="text-white text-sm text-left pl-4">
                    <button
                      onClick={() => handleCopyKey(key.token)}
                      className="text-white hover:text-gray-200 transition-colors cursor-pointer flex items-center gap-2 group"
                      title="Click to copy token"
                    >
                      <span>{renderToken(key)}</span>
                      <Copy size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>
                  <div className="text-white text-sm text-left">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help">
                          {formatCategories(key.categories)}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent 
                        side="top" 
                        className="bg-gloria-dark border-gloria-primary/20 text-gloria-light max-w-xs"
                      >
                        <p className="text-sm">
                          {key.categories && key.categories.length > 0 
                            ? key.categories.join(", ") 
                            : "All categories"
                          }
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="text-white text-sm text-left">{key.expires}</div>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => handleRevokeKey(key.id)}
                      className="text-red-400 hover:text-red-300 transition-colors p-1"
                      title="Delete token"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* API Documentation Link */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-white text-left text-sm">
                The API documentation can be found at{" "}
                <a 
                  href="https://gloriaai.gitbook.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline transition-colors"
                >
                  gloriaai.gitbook.io
                </a>
              </p>
              
              {/* Clean Outlined Accordion for API Examples */}
              <div className="mt-3">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="api-examples" className="border-[0.25px] border-gray-600/50 rounded-lg">
                    <AccordionTrigger useCustomIcon className="text-white hover:text-gray-200 px-6 py-2 data-[state=open]:border-b data-[state=open]:border-gray-600/50">
                      <span className="text-sm font-medium text-left">API usage examples</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-0">
                      <div className="bg-gray-800/40 rounded-lg p-4 space-y-6">
                        {/* REST (HTTP) Section */}
                        <div className="space-y-3">
                          <h3 className="text-white font-medium text-sm">REST (HTTP):</h3>
                          <div>
                            <p className="text-gray-400 text-xs mb-2">cURL:</p>
                            <CodeBlock 
                              code='curl -X GET "https://ai-hub.cryptobriefing.com/news/crypto?api_key={{api_key}}&from_date=2025-05-01&to_date=2025-05-07"'
                              language="curl"
                              codeId="curl-example"
                            />
                          </div>
                          
                          <div>
                            <p className="text-gray-400 text-xs mb-2">JavaScript (fetch):</p>
                            <CodeBlock 
                              code={`const fetchNews = async () => {
  const response = await fetch(
    'https://ai-hub.cryptobriefing.com/news/crypto?api_key={{api_key}}&from_date=2025-05-01&to_date=2025-05-10'
  );
  
  if (!response.ok) {
    throw new Error(\`HTTP error! Status: \${response.status}\`);
  }
  
  const data = await response.json();
  return data;
};

// Usage
fetchNews()
  .then(newsItems => {
    console.log(\`Received \${newsItems.length} news items\`);
    newsItems.forEach(item => {
      console.log(\`\${new Date(item.timestamp * 1000).toLocaleString()}: \${item.signal}\`);
    });
  })
  .catch(error => {
    console.error('Error fetching news:', error);
  });`}
                              language="javascript"
                              codeId="js-example"
                            />
                          </div>
                        </div>

                        {/* WebSocket (JavaScript) Section */}
                        <div className="space-y-3">
                          <h3 className="text-white font-medium text-sm">WebSocket (JavaScript):</h3>
                          <div>
                            <CodeBlock 
                              code={`// Create WebSocket connection
const socket = new WebSocket('wss://ai-hub.cryptobriefing.com/ws/feed?api_key={{api_key}}');

// Connection opened
socket.addEventListener('open', (event) => {
  console.log('Connected to WebSocket server');
  
  // Subscribe to a feed
  socket.send(JSON.stringify({
    type: 'subscribe',
    timeline: 'crypto'
  }));
});

// Listen for messages
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  
  switch(message.type) {
    case 'data':
      if (message.content) {
        console.log(\`New update for \${message.timeline}:\`, message.content.signal);
      } else if (message.action === 'subscribed') {
        console.log(\`Successfully subscribed to \${message.timeline}\`);
      } else {
        console.log('Data message:', message);
      }
      break;
    case 'error':
      console.error('Error:', message.error, message.details);
      break;
    case 'ping':
      // Respond with pong to keep connection alive
      socket.send(JSON.stringify({
        type: 'pong',
        timestamp: message.timestamp
      }));
      break;
  }
});

// Handle connection close
socket.addEventListener('close', (event) => {
  console.log('Connection closed:', event.code, event.reason);
});

// Handle errors
socket.addEventListener('error', (event) => {
  console.error('WebSocket error:', event);
});`}
                              language="websocket"
                              codeId="websocket-example"
                            />
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default ApiKeysModal;
