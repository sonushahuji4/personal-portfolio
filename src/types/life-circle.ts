export type ChapterMood =
  | 'warm-sepia'
  | 'playful-green'
  | 'blue-hour'
  | 'electric-neon'
  | 'eager-yellow'
  | 'muted-gray'
  | 'warm-amber'
  | 'red-orange'
  | 'solar-gold'
  | 'midnight-blue'
  | 'morning-light'
  | 'shimmer';

export interface Chapter {
  id: number;
  number: string;
  title: string;
  era: string;
  mood: ChapterMood;
  icon: string;
  teaser: string;
  story: string;
  accentColor: string;
  isUnknown?: boolean;
}
