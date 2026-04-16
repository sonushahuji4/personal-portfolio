export interface RadioStation {
  id: string;
  frequency: string;
  stationName: string;
  nowPlaying: string;
  title: string;
  subtitle: string;
  description: string;
  stats: { value: string; label: string }[];
  tags: string[];
  category: 'professional' | 'personal';
  url?: string;
}

export const RADIO_STATIONS: RadioStation[] = [
  {
    id: 'aerem',
    frequency: '88.1',
    stationName: 'Aerem',
    nowPlaying: 'Now playing · founding engineer',
    title: 'Aerem Solar Monitoring',
    subtitle: 'Production SaaS · 2023 — present',
    description: 'Real-time solar plant monitoring platform. Built the IoT pipeline processing 2M+ daily readings, energy dashboards, automated alerting, and unified auth as the founding engineer.',
    stats: [
      { value: '500+', label: 'Plants' },
      { value: '2M+', label: 'Daily' },
      { value: '200+', label: 'B2B' },
      { value: '-60%', label: 'Tickets' },
    ],
    tags: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Redis'],
    category: 'professional',
  },
  {
    id: 'cimpress',
    frequency: '92.5',
    stationName: 'Cimpress',
    nowPlaying: 'Now playing · senior sde',
    title: 'National Pen E-Commerce',
    subtitle: 'Global platform · 2020 — 2023',
    description: 'E-commerce serving millions across 20+ countries. Built product features driving 30-40% revenue, payment workflows, 15+ APIs with Redis caching, and storefronts with 95+ Lighthouse.',
    stats: [
      { value: '30-40%', label: 'Revenue' },
      { value: '15+', label: 'APIs' },
      { value: '99.9%', label: 'Uptime' },
      { value: '95+', label: 'Lighthouse' },
    ],
    tags: ['React', 'Angular', 'Node.js', 'Express', 'Python', 'PostgreSQL'],
    category: 'professional',
  },
  {
    id: 'eventos',
    frequency: '97.3',
    stationName: 'Eventos',
    nowPlaying: 'Now playing · personal project',
    title: 'Eventos',
    subtitle: 'Social events platform',
    description: 'A platform for event enthusiasts to discover, track, and engage with events. Features media sharing, stories, live streams, and connecting with friends.',
    stats: [],
    tags: ['JavaScript', 'React'],
    category: 'personal',
    url: 'https://github.com/sonushahuji4/Eventos',
  },
  {
    id: 'chat',
    frequency: '101.7',
    stationName: 'Chat',
    nowPlaying: 'Now playing · personal project',
    title: 'Chat Application',
    subtitle: 'Real-time messaging with rooms',
    description: 'Instant messaging application with room support, delivery indicators, and live WebSocket communication.',
    stats: [],
    tags: ['TypeScript', 'React', 'Node.js', 'Express', 'Socket.io'],
    category: 'personal',
    url: 'https://github.com/sonushahuji4/Chat-Application',
  },
];
