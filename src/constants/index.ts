// Family Role Options
export const FAMILY_ROLES = ['Father', 'Mother', 'Child', 'Guardian', 'Other'] as const;

// Event Status Options
export const EVENT_STATUSES = ['Completed', 'Upcoming', 'Scheduled', 'Planned'] as const;

// Payment Methods
export const PAYMENT_METHODS = ['Credit Card', 'Bank Transfer', 'Cash', 'Mobile Money', 'Check'] as const;

// Donation Purposes
export const DONATION_PURPOSES = ['Tithes', 'Offering', 'Building Fund', 'Missions', 'Outreach', 'Other'] as const;

// Sermon Categories
export const SERMON_CATEGORIES = ['Inspiration', 'Teaching', 'Comfort', 'Community', 'Worship', 'Other'] as const;

// Pagination
export const DEFAULT_ITEMS_PER_PAGE = 12;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  DATETIME: 'MMM dd, yyyy HH:mm'
} as const;

// Colors for UI
export const COLORS = {
  PRIMARY: '#10b981',
  SECONDARY: '#3b82f6',
  SUCCESS: '#22c55e',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#6366f1'
} as const;
