// Event Types
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  status: 'Completed' | 'Upcoming' | 'Scheduled' | 'Planned';
}

// Donation Types
export interface Donation {
  id: string;
  donorName: string;
  amount: number;
  date: string;
  paymentMethod: string;
  purpose: string;
}

// Database Types (matching Supabase schema)

// Family Types
export interface Family {
  id: string;
  familyName: string;
  createdAt: string;
}

// Member Types
export interface Member {
  id: string;
  fullName: string;
  phone?: string;
  gender?: string;
}

// Profile Types (linked to auth.users)
export interface Profile {
  id: string; // UUID
  email: string;
  full_name: string | null;
  role: string | null;
}

// Helper types for UI (computed from database types)
export interface MemberWithFamily extends Member {
  family?: Family;
}

export interface FamilyWithMembers extends Family {
  members?: Member[];
}

// Sermon Types
export interface Sermon {
  id: number;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  category: string;
  attendees: number;
  thumbnail: string;
}

// Common UI Types
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}
