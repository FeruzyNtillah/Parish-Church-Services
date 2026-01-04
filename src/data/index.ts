// Re-export all data from individual files
export { eventsData } from './events';
export { donationsData } from './donations';
export { membersData, familiesData, familyMembersData } from './families';
export { sermonsData } from './sermons';

// Re-export types for convenience
export type { 
  Event, 
  Donation, 
  Member, 
  Family, 
  FamilyMember, 
  Sermon 
} from '../types';
