
import { NewsItem } from "@/types/news";

// Mock data to use when API fails
export const mockNewsData: NewsItem[] = [
  {
    id: "e4c2d1b0-a9f8-47e3-b5c6-3d2a1f09e8b7",
    signal: "Trump taps Space Force general to lead $831B 'Golden Dome' missile shield",
    timestamp: Math.floor(Date.now() / 1000) - 1800, // 30 minutes ago
    enrichment: "President Trump's selection of Space Force General Michael Guetlein to lead the $831 billion \"Golden Dome\" missile defense initiative represents a significant shift in national security strategy. The Golden Dome project aims to create a comprehensive missile defense system leveraging advanced technologies including satellite networks and AI-powered interception systems. Gen. Guetlein's background in space operations and missile defense technologies makes him a strategic choice for this ambitious national security undertaking.",
    likes: 28,
    dislikes: 4
  },
  {
    id: "f5d3e2c1-b0a9-48f4-c6b5-4e3d2c1b0a9f",
    signal: "Arbus and BIOS integrate via BasisOS to enhance DeFAI agents in Virtuals.io ecosystem",
    timestamp: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
    enrichment: "The integration of ARBUS and BIOS through BasisOS represents a significant advancement in decentralized financial AI (DeFAI) agent technology. By merging BasisOS's sophisticated agent framework with ARBUS's robust data infrastructure, the collaboration creates a more powerful ecosystem for automated financial interactions. This partnership is expected to dramatically improve scalability and efficiency within the virtuals.io platform, potentially revolutionizing how decentralized autonomous organizations operate and interact with financial markets.",
    likes: 15,
    dislikes: 2
  },
  {
    id: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    signal: "World raises $135 million from a16z and Bain Capital Crypto for network expansion",
    timestamp: Math.floor(Date.now() / 1000) - 7200, // 2 hours ago
    enrichment: "The successful $135 million funding round led by Andreessen Horowitz and Bain Capital Crypto marks a significant milestone for World's network expansion plans. This substantial investment reflects growing institutional confidence in decentralized infrastructure projects. The capital is expected to accelerate World's development roadmap, enhance scalability, and expand their global presence in the rapidly evolving digital ecosystem landscape.",
    likes: 34,
    dislikes: 1
  },
  {
    id: "b5c72e9d-12a4-4b1c-8e9f-67d921e87520",
    signal: "Trump in serious peace talks with Iran",
    timestamp: Math.floor(Date.now() / 1000) - 14400, // 4 hours ago
    enrichment: "President Trump's diplomatic engagement with Iran represents a potential breakthrough in Middle East relations. These negotiations are focusing on addressing key areas of contention including nuclear capabilities, economic sanctions, and regional security concerns. Diplomatic sources suggest that both sides are showing unprecedented willingness to compromise on previously intractable issues, potentially opening the door to a comprehensive peace agreement that could reshape geopolitical dynamics across the region.",
    likes: 45,
    dislikes: 12
  },
  {
    id: "7d8e5f4c-3b2a-1d0e-9f8g-6h5j4k3l2m1n",
    signal: "Telegram shuts down Haowang Guarantee, suspected Chinese darknet hub for crypto scams",
    timestamp: Math.floor(Date.now() / 1000) - 86400, // 1 day ago
    enrichment: "Telegram's decisive action against Haowang Guarantee marks a significant blow to cryptocurrency-based criminal operations. The marketplace had become notorious for facilitating various illicit activities including fraud, money laundering, and the distribution of compromised financial data. This shutdown follows a months-long investigation coordinated between Telegram's security team and international law enforcement agencies. The operation highlights growing efforts by digital platforms to combat the use of their infrastructure for criminal enterprises, particularly those exploiting cryptocurrency transactions.",
    likes: 56,
    dislikes: 3
  }
];
