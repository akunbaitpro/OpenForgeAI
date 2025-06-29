
import { toast } from "@/components/ui/use-toast";

// The API key should ideally not be hardcoded and instead be stored in environment variables
// For this implementation we're using it directly but in production it should be secured
const PERPLEXITY_API_KEY = "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";

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function fetchPerplexityResponse(messages: Message[]): Promise<string> {
  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: messages,
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 1000,
        return_images: false,
        return_related_questions: false,
        search_recency_filter: 'month',
        frequency_penalty: 1,
        presence_penalty: 0
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Perplexity API error:", errorData);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching from Perplexity API:", error);
    toast({
      title: "AI Response Error",
      description: "Failed to get a response from the AI. Please try again.",
      variant: "destructive",
    });
    return "I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
  }
}
