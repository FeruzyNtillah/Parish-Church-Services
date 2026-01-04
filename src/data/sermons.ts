import type { Sermon } from '../types';

export const sermonsData: Sermon[] = [
  {
    id: 1,
    title: "The Power of Faith",
    speaker: "Pastor John Smith",
    date: "2023-06-15",
    duration: "45:22",
    category: "Inspiration",
    attendees: 125,
    thumbnail: "/sermon1.jpg"
  },
  {
    id: 2,
    title: "Finding Peace in Troubled Times",
    speaker: "Reverend Sarah Johnson",
    date: "2023-06-08",
    duration: "38:15",
    category: "Comfort",
    attendees: 98,
    thumbnail: "/sermon2.jpg"
  },
  {
    id: 3,
    title: "The Prodigal Son Revisited",
    speaker: "Pastor Michael Brown",
    date: "2023-06-01",
    duration: "52:40",
    category: "Teaching",
    attendees: 142,
    thumbnail: "/sermon3.jpg"
  },
  {
    id: 4,
    title: "Building Strong Communities",
    speaker: "Deacon Emily Wilson",
    date: "2023-05-25",
    duration: "41:05",
    category: "Community",
    attendees: 87,
    thumbnail: "/sermon4.jpg"
  }
];
