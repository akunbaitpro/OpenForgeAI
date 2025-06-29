
/**
 * Format timestamp to relative time (e.g., "5h ago")
 */
export const formatTimeAgo = (timestamp: number) => {
  const now = Date.now() / 1000;
  const diffSeconds = now - timestamp;
  
  if (diffSeconds < 60) {
    return 'just now';
  } else if (diffSeconds < 3600) {
    const minutes = Math.floor(diffSeconds / 60);
    return `${minutes}m`;
  } else if (diffSeconds < 86400) {
    const hours = Math.floor(diffSeconds / 3600);
    return `${hours}h`;
  } else {
    const days = Math.floor(diffSeconds / 86400);
    return `${days}d`;
  }
};

/**
 * Gets the date range for API requests
 */
export const getDateRange = (startDate?: Date, endDate?: Date) => {
  const today = new Date();
  const toDate = endDate 
    ? endDate.toISOString().split('T')[0]
    : today.toISOString().split('T')[0];
  
  // Default from date is May 1, 2025 if not provided or explicitly cleared
  const fromDate = startDate
    ? startDate.toISOString().split('T')[0]
    : "2025-05-01";
  
  return {
    fromDate,
    toDate
  };
};
