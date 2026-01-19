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
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dateOfBirth?: string;
  relation?: string;
  baptismDate?: string;
  communionDate?: string;
  confirmationDate?: string;
  maritalStatus?: 'single' | 'married';
  marriageDate?: string;
  spouseName?: string;
}

// Profile Types (linked to auth.users)
export interface Profile {
  id: string; // UUID
  email: string;
  full_name: string | null;
  role: string | null;
}

// Family Member Types
export interface FamilyMember {
  id: string;
  familyId: string;
  memberId: string;
  role: string;
  addedAt: string;
}

// Helper types for UI (computed from database types)
export interface MemberWithFamily extends Member {
  family?: Family;
}

export interface FamilyWithMembers extends Family {
  members?: Member[];
}

// Common UI Types
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
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
