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

// Member Types
export interface Member {
  id: string;
  fullName: string;
  phone?: string;
  gender?: 'Male' | 'Female' | 'Other';
  [key: string]: unknown;
}

// Family Types
export interface Family {
  id: string;
  familyName: string;
  createdAt: string;
}

export interface FamilyMember {
  id: string;
  familyId: string;
  memberId: string;
  role: string; // Father, Mother, Child, Guardian, etc.
  addedAt: string;
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
