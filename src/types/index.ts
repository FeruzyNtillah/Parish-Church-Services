// Event Types
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  type: string;
  status: "Upcoming" | "Completed" | "Scheduled" | "Planned";
  description?: string;
  parish?: string;
}

// Database Types (matching Supabase schema)

// Family Types
export interface Family {
  id: number;
  family_name: string;
  parish?: string;
  province?: string;
  jummuiya?: string;
  created_at: string;
}

// Member Types
export interface Member {
  id: number;
  family_id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  date_of_birth?: string;
  gender?: string;
  relation?: string;
  baptism_date?: string;
  communion_date?: string;
  confirmation_date?: string;
  is_married?: boolean;
  marriage_date?: string;
  spouse?: string;
  parish?: string;
  jummuiya?: string;
  created_at: string;
}

// Profile Types (linked to auth.users)
export interface Profile {
  id: string; // UUID
  email: string;
  full_name: string | null;
  role: string | null;
}

// Family Member Types (for UI convenience - not a direct Supabase table)
export interface FamilyMember {
  id: string;
  familyId: number;
  memberId: number;
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
