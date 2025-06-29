
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Cleans Perplexity API responses by removing markdown formatting
 * @param text - The text to clean
 * @returns Cleaned text without markdown formatting
 */
export function cleanPerplexityResponse(text: string): string {
  // Remove asterisks (bold formatting)
  let cleanedText = text.replace(/\*\*/g, '');
  
  // Remove citation references like [1], [2], [1][2]
  cleanedText = cleanedText.replace(/\[\d+\](?:\[\d+\])*/g, '');
  
  // Remove hashtags
  cleanedText = cleanedText.replace(/#/g, '');
  
  return cleanedText;
}
