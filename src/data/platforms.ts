export interface PlatformData {
  id: string;
  name: string;
  username: string;
  url: string;
  color: string;
  icon: 'leetcode' | 'github' | 'codechef' | 'linkedin';
  featured: boolean;
  primaryStat: { value: string; label: string };
  secondaryStats?: { label: string; value: string }[];
  badge?: { text: string };
  progress?: { label: string; percentage: number };
  description: string;
}

export const PLATFORMS_DATA: PlatformData[] = [
  {
    id: 'leetcode',
    name: 'LeetCode',
    username: 'sonushahuji4',
    url: 'https://leetcode.com/u/sonushahuji4/',
    color: '#EF9F27',
    icon: 'leetcode',
    featured: true,
    primaryStat: { value: '2,059', label: 'rating' },
    badge: { text: 'Knight' },
    progress: { label: '624 solved', percentage: 62 },
    secondaryStats: [{ label: 'contests', value: '25' }],
    description: 'Top 1.9% worldwide',
  },
  {
    id: 'github',
    name: 'GitHub',
    username: 'sonushahuji4',
    url: 'https://github.com/sonushahuji4',
    color: '#7F77DD',
    icon: 'github',
    featured: false,
    primaryStat: { value: '1,200+', label: 'contributions' },
    description: '31 repos · 6 pinned',
  },
  {
    id: 'codechef',
    name: 'CodeChef',
    username: 'sonushahuji4',
    url: 'https://www.codechef.com/users/sonushahuji4',
    color: '#D85A30',
    icon: 'codechef',
    featured: false,
    primaryStat: { value: '1,591', label: 'highest rating' },
    description: '42 contests · 321 solved',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    username: 'sonushahuji',
    url: 'https://www.linkedin.com/in/sonushahuji/',
    color: '#378ADD',
    icon: 'linkedin',
    featured: false,
    primaryStat: { value: '500+', label: 'connections' },
    description: 'Open to collaborations & opportunities',
  },
];
