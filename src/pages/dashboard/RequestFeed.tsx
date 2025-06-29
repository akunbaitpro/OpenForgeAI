
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { AlertCircle } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const requestFormSchema = z.object({
  name: z.string().min(3, {
    message: "Feed name must be at least 3 characters.",
  }),
  topic: z.string().optional(),
  reason: z.string().optional(),
});

type RequestFormValues = z.infer<typeof requestFormSchema>;

interface FeedRequest {
  id: string;
  name: string;
  topic: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

const RequestFeed = () => {
  const [submitting, setSubmitting] = useState(false);
  const [requests, setRequests] = useState<FeedRequest[]>([
    {
      id: "request-1",
      name: "Ethereum NFT Activity",
      topic: "Ethereum",
      reason: "Tracking NFT market activity",
      status: "pending",
      createdAt: "2025-05-07T14:20:00Z",
    },
  ]);

  const form = useForm<RequestFormValues>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      name: "",
      topic: "",
      reason: "",
    },
  });

  function onSubmit(data: RequestFormValues) {
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newRequest: FeedRequest = {
        id: `request-${Date.now()}`,
        name: data.name,
        topic: data.topic || "",
        reason: data.reason || "",
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      
      setRequests(prev => [newRequest, ...prev]);
      form.reset();
      setSubmitting(false);
      
      toast({
        title: "Feed request submitted",
        description: "We've received your custom feed request. We'll review it shortly.",
      });
    }, 800);
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Request Custom Feed</h1>
      
      <div className="bg-gloria-dark-accent/10 rounded-lg p-6 mb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feed Name*</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., DeFi Governance Updates" 
                      className="bg-black border-gray-700"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500">
                    A descriptive name for your custom feed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chain or Topic (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Solana, DeFi, NFTs" 
                      className="bg-black border-gray-700"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500">
                    Specific blockchain, project, or topic area.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason / Use Case (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="What will you use this feed for?" 
                      className="bg-black border-gray-700"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500">
                    Help us understand your needs better.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </Form>
      </div>
      
      <div>
        <h2 className="text-xl font-medium mb-4">Your Feed Requests</h2>
        
        {requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((request) => (
              <div 
                key={request.id} 
                className="p-4 bg-gloria-dark-accent/10 rounded-lg border border-gloria-dark-accent/20"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{request.name}</h3>
                  <span 
                    className={`text-xs px-2 py-1 rounded ${
                      request.status === "pending" 
                        ? "bg-yellow-900/30 text-yellow-500" 
                        : request.status === "approved"
                        ? "bg-green-900/30 text-green-500"
                        : "bg-red-900/30 text-red-500"
                    }`}
                  >
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </div>
                
                {request.topic && (
                  <p className="text-sm text-gray-400 mb-2">
                    <strong>Topic:</strong> {request.topic}
                  </p>
                )}
                
                {request.reason && (
                  <p className="text-sm text-gray-400 mb-2">
                    <strong>Reason:</strong> {request.reason}
                  </p>
                )}
                
                <p className="text-xs text-gray-500">
                  Requested on {formatDate(request.createdAt)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 border border-dashed border-gray-700 rounded text-center">
            <p className="text-gray-400">No feed requests yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestFeed;
