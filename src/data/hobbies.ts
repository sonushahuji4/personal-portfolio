import type { Hobby } from '@/types';

export const HOBBIES: Hobby[] = [
  // Tech Zone
  { name: 'Hackathons', icon: 'Code', category: 'Tech' },
  { name: 'Open Source', icon: 'Globe', category: 'Tech' },
  { name: 'Competitive Programming', icon: 'Puzzle', category: 'Tech' },

  // Sports Zone
  { name: 'Football', icon: 'Target', category: 'Sports' },
  { name: 'Marathons', icon: 'Medal', category: 'Sports' },
  { name: 'Basketball & Hockey', icon: 'Dumbbell', category: 'Sports' },

  // Music & Chill Zone
  { name: 'Music Appreciation', icon: 'Piano', category: 'Music' },
  { name: 'Exploration & Travel', icon: 'Globe', category: 'Music' },
  { name: 'Creative Roots', icon: 'Lightbulb', category: 'Music' },
];
