
// API configuration
export const API_DOMAIN = "https://ai-hub.cryptobriefing.com";
export const API_KEY = "99f444d7-843a-4b39-ac96-e82331d79e8a";

/**
 * Fetches news data from the API
 */
export const fetchNewsData = async (feedType: string, fromDate: string, toDate: string) => {
  // Ensure feedType is normalized
  let normalizedFeedType = feedType.toLowerCase();
  
  // Special case for AI_Agent to match the API endpoint
  if (normalizedFeedType === "ai_agent") {
    normalizedFeedType = "ai_agents";
  }
  
  // Include API key as a URL parameter instead of a header
  const url = `${API_DOMAIN}/news/${normalizedFeedType}?from_date=${fromDate}&to_date=${toDate}&api_key=${API_KEY}`;
  
  console.log(`Fetching URL: ${url}`);
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const text = await response.text();
      console.error('API response not ok:', response.status, response.statusText, text);
      throw new Error(`API ${response.status} ${response.statusText}: ${text}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log(`API data received for ${normalizedFeedType}:`, data.length);
      return data;
    } else {
      const text = await response.text();
      throw new Error(`Expected JSON but got ${contentType}: ${text}`);
    }
  } catch (error) {
    console.error(`Error fetching ${normalizedFeedType} news:`, error);
    throw error;
  }
};
