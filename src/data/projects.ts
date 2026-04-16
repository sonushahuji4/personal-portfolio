import type { Project } from '@/types';

export const PROJECTS: Project[] = [
  {
    id: 'aerem-platform',
    title: 'Aerem Solar Monitoring Platform',
    description:
      'A production-grade SaaS platform for real-time solar plant monitoring. Serves 500+ plants, 200+ B2B customers. Features real-time dashboards, energy analytics, IoT data ingestion (2M+ daily readings), automated reports, and alerting.',
    tech: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Redis', 'WebSockets'],
    category: 'professional',
    links: [],
    highlight: 'Founding Engineer — Built from zero',
  },
  {
    id: 'national-pen',
    title: 'National Pen E-Commerce Platform',
    description:
      'Global e-commerce platform for customizable products, live in 20+ countries serving millions of users. Built product features contributing 30-40% of revenue, internal admin tools, payment integrations, and SSG storefronts.',
    tech: ['React', 'Angular', 'Node.js', 'Express.js', 'TypeScript', 'Python', 'PostgreSQL', 'AWS', 'Redis'],
    category: 'professional',
    links: [],
    highlight: 'Contributed 30-40% platform revenue',
  },
  {
    id: 'eventos',
    title: 'Eventos',
    description:
      'A social media platform for event enthusiasts to discover, track, and engage with events, including media, stories, live streams, posts, and connecting with friends.',
    tech: ['JavaScript', 'React'],
    category: 'personal',
    links: [
      { label: 'Source', url: 'https://github.com/sonushahuji4/Eventos' },
    ],
  },
  {
    id: 'chat-app',
    title: 'Chat Application',
    description:
      'Real-time chat application using ReactJS, NodeJS, Express and Socket.io with instant messaging and room support.',
    tech: ['TypeScript', 'React', 'Node.js', 'Express', 'Socket.io'],
    category: 'personal',
    links: [
      { label: 'Source', url: 'https://github.com/sonushahuji4/Chat-Application' },
    ],
  },
];
