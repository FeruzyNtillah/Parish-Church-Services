export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  status: 'Completed' | 'Upcoming' | 'Scheduled' | 'Planned';
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
