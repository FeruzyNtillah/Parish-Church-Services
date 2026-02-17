import type { Member, Family, FamilyMember } from '../types';

export const membersData: Member[] = [
  { id: 1001, family_id: 1001, first_name: 'John', last_name: 'Mwakalinga', gender: 'Male', created_at: '2024-06-01' },
  { id: 1002, family_id: 1001, first_name: 'Mary', last_name: 'Mwakalinga', gender: 'Female', created_at: '2024-06-01' },
  { id: 1003, family_id: 1001, first_name: 'David', last_name: 'Mwakalinga', gender: 'Male', created_at: '2024-06-01' },
  { id: 1004, family_id: 1002, first_name: 'Alice', last_name: 'Ngoma', gender: 'Female', created_at: '2024-07-12' },
  { id: 1005, family_id: 1002, first_name: 'Peter', last_name: 'Kim', gender: 'Male', created_at: '2024-07-12' },
];

export const familiesData: Family[] = [
  { id: 1001, family_name: 'Mwakalinga Family', created_at: '2024-06-01' },
  { id: 1002, family_name: 'Ngoma Family', created_at: '2024-07-12' },
];

export const familyMembersData: FamilyMember[] = [
  { id: 'FM1001', familyId: 1001, memberId: 1001, role: 'Father', addedAt: '2024-06-02' },
  { id: 'FM1002', familyId: 1001, memberId: 1002, role: 'Mother', addedAt: '2024-06-02' },
  { id: 'FM1003', familyId: 1001, memberId: 1003, role: 'Child', addedAt: '2024-06-02' },
  { id: 'FM1004', familyId: 1002, memberId: 1004, role: 'Mother', addedAt: '2024-07-13' },
];
