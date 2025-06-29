
import { useToast as useToastOriginal, toast as toastOriginal } from "@/hooks/use-toast";

// Re-export the hooks for easier import
export const useToast = useToastOriginal;
export const toast = toastOriginal;
