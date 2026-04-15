import type { Course } from '@/types';

export const COURSES: Course[] = [
  {
    name: 'Namaste JavaScript (Season 1 & 2)',
    platform: 'NamasteDev.com',
    instructor: 'Akshay Saini',
    status: 'completed',
    url: 'https://namastedev.com/learn/namaste-javascript',
    topics: [
      'JavaScript internals',
      'Closures',
      'Event loop',
      'Promises',
      'Async/Await',
    ],
  },
  {
    name: 'Namaste React',
    platform: 'NamasteDev.com',
    instructor: 'Akshay Saini',
    status: 'completed',
    url: 'https://namastedev.com/learn/namaste-react',
    topics: [
      'React from scratch',
      'Hooks',
      'Routing',
      'State management',
      'Optimization',
    ],
  },
  {
    name: 'Namaste Node.js',
    platform: 'NamasteDev.com',
    instructor: 'Akshay Saini',
    status: 'completed',
    url: 'https://namastedev.com/learn/namaste-node',
    topics: [
      'Node.js internals',
      'libuv',
      'Streams',
      'Clustering',
      'Production servers',
    ],
  },
  {
    name: 'Scaler Academy',
    platform: 'Scaler',
    instructor: 'Multiple Instructors',
    status: 'completed',
    url: 'https://www.scaler.com/',
    topics: [
      'DSA (Intermediate + Advanced)',
      'Databases & SQL',
      'Backend LLD',
      'HLD',
      'Backend Capstone',
      'Data Engineering',
      'DSA for Competitive Programming',
      'Product Management',
    ],
  },
];
