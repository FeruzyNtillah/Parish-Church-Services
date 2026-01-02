export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  status: 'Completed' | 'Upcoming' | 'Scheduled' | 'Planned';
}

export interface Donation {
  id: string;
  donorName: string;
  amount: number;
  date: string;
  paymentMethod: string;
  purpose: string;
}

export const eventsData: Event[] = [
  { id: 'EVT1001', title: 'Sunday Service', date: '2023-06-04', time: '09:00 AM', location: 'Main Sanctuary', type: 'Weekly Service', status: 'Completed' },
  { id: 'EVT1002', title: 'Bible Study', date: '2023-06-07', time: '07:00 PM', location: 'Fellowship Hall', type: 'Weekly Study', status: 'Completed' },
  { id: 'EVT1003', title: 'Youth Fellowship', date: '2023-06-10', time: '04:00 PM', location: 'Youth Center', type: 'Youth Event', status: 'Completed' },
  { id: 'EVT1004', title: 'Men\'s Breakfast', date: '2023-06-11', time: '08:00 AM', location: 'Church Cafeteria', type: 'Men\'s Ministry', status: 'Upcoming' },
  { id: 'EVT1005', title: 'Women\'s Conference', date: '2023-06-17', time: '10:00 AM', location: 'Main Sanctuary', type: 'Special Event', status: 'Upcoming' },
  { id: 'EVT1006', title: 'Community Outreach', date: '2023-06-18', time: '01:00 PM', location: 'City Park', type: 'Outreach', status: 'Upcoming' },
  { id: 'EVT1007', title: 'Choir Rehearsal', date: '2023-06-21', time: '06:30 PM', location: 'Music Room', type: 'Weekly Rehearsal', status: 'Scheduled' },
  { id: 'EVT1008', title: 'Marriage Seminar', date: '2023-06-24', time: '09:00 AM', location: 'Fellowship Hall', type: 'Special Event', status: 'Scheduled' },
  { id: 'EVT1009', title: 'Prayer Night', date: '2023-06-28', time: '07:00 PM', location: 'Main Sanctuary', type: 'Monthly Prayer', status: 'Scheduled' },
  { id: 'EVT1010', title: 'Vacation Bible School', date: '2023-07-10', time: '09:00 AM', location: 'Education Wing', type: 'Children\'s Event', status: 'Planned' },
];

export const donationsData: Donation[] = [
  { id: 'DON1001', donorName: 'John Doe', amount: 150, date: '2023-01-05', paymentMethod: 'Credit Card', purpose: 'Tithes' },
  { id: 'DON1002', donorName: 'Jane Smith', amount: 75, date: '2023-01-12', paymentMethod: 'Bank Transfer', purpose: 'Offering' },
  { id: 'DON1003', donorName: 'Michael Brown', amount: 200, date: '2023-01-15', paymentMethod: 'Cash', purpose: 'Building Fund' },
  { id: 'DON1004', donorName: 'Sarah Wilson', amount: 50, date: '2023-01-20', paymentMethod: 'Mobile Money', purpose: 'Missions' },
  { id: 'DON1005', donorName: 'David Lee', amount: 100, date: '2023-02-02', paymentMethod: 'Credit Card', purpose: 'Tithes' },
  { id: 'DON1006', donorName: 'Olivia Martinez', amount: 250, date: '2023-02-10', paymentMethod: 'Bank Transfer', purpose: 'Building Fund' },
  { id: 'DON1007', donorName: 'James Taylor', amount: 60, date: '2023-02-18', paymentMethod: 'Cash', purpose: 'Offering' },
  { id: 'DON1008', donorName: 'Sophia Clark', amount: 180, date: '2023-03-05', paymentMethod: 'Mobile Money', purpose: 'Missions' },
  { id: 'DON1009', donorName: 'Robert Johnson', amount: 120, date: '2023-03-12', paymentMethod: 'Credit Card', purpose: 'Tithes' },
  { id: 'DON1010', donorName: 'Emily Davis', amount: 90, date: '2023-03-20', paymentMethod: 'Bank Transfer', purpose: 'Offering' },
];

// --- Members and Families Mock Data ---
export interface Member {
  id: string;
  fullName: string;
  phone?: string;
  gender?: 'Male' | 'Female' | 'Other';
  [key: string]: unknown;
}

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

export const membersData: Member[] = [
  { id: 'MBR1001', fullName: 'John Mwakalinga', phone: '+255700000001', gender: 'Male' },
  { id: 'MBR1002', fullName: 'Mary Mwakalinga', phone: '+255700000002', gender: 'Female' },
  { id: 'MBR1003', fullName: 'David Mwakalinga', phone: '+255700000003', gender: 'Male' },
  { id: 'MBR1004', fullName: 'Alice Ngoma', phone: '+255700000004', gender: 'Female' },
  { id: 'MBR1005', fullName: 'Peter Kim', phone: '+255700000005', gender: 'Male' },
];

export const familiesData: Family[] = [
  { id: 'FAM1001', familyName: 'Mwakalinga Family', createdAt: '2024-06-01' },
  { id: 'FAM1002', familyName: 'Ngoma Family', createdAt: '2024-07-12' },
];

export const familyMembersData: FamilyMember[] = [
  { id: 'FM1001', familyId: 'FAM1001', memberId: 'MBR1001', role: 'Father', addedAt: '2024-06-02' },
  { id: 'FM1002', familyId: 'FAM1001', memberId: 'MBR1002', role: 'Mother', addedAt: '2024-06-02' },
  { id: 'FM1003', familyId: 'FAM1001', memberId: 'MBR1003', role: 'Child', addedAt: '2024-06-02' },
  { id: 'FM1004', familyId: 'FAM1002', memberId: 'MBR1004', role: 'Mother', addedAt: '2024-07-13' },
];
