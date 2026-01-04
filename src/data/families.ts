import type { Member, Family, FamilyMember } from '../types';

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
