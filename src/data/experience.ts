import type { ExperienceEntry } from '@/types';

export const EXPERIENCES: ExperienceEntry[] = [
  {
    id: 'aerem',
    company: 'Aerem Solutions',
    role: 'Sr. Software Engineer / Founding Engineer',
    type: 'Full-time | Series A Startup | Solar Fintech | Raised INR 160 Crore',
    duration: 'Feb 2023 – Present',
    location: 'Mumbai, Maharashtra, India · Hybrid',
    companyUrl: 'https://www.aerem.co',
    impacts: [
      {
        text: 'Led foundational architecture decisions — selected tech stack (React, Node.js, PostgreSQL, AWS), designed DB schema, set up CI/CD, delivered MVP that helped secure Series A',
        metric: 'INR 160 Crore',
      },
      {
        text: 'Built solar monitoring SaaS platform from zero to production',
        metric: '500+ plants, 200+ B2B customers, 100+ field installers',
      },
      {
        text: 'Built real-time IoT data ingestion pipeline with 6+ vendor integrations, reduced fault detection from 24+ hours to under 15 minutes',
        metric: '2M+ daily readings',
      },
      {
        text: 'Optimized PostgreSQL: bulk upserts, partitioned tables, connection pooling',
        metric: '30-40% write latency reduction, ~35% infra cost savings',
      },
      {
        text: 'Engineered vendor-agnostic integration layer: new vendor onboarding reduced',
        metric: '3-4 weeks → under 3 days',
      },
      {
        text: 'Built real-time dashboards (WebSocket), automated PDF reports, alert system',
        metric: '~60% fewer support tickets',
      },
      {
        text: 'Unified auth system (TOTP OTP), consolidated 3 platforms into single codebase',
        metric: '50% less maintenance',
      },
      {
        text: 'Grew team from 1 to 5, mentored 2 junior engineers to independent ownership in 4 months',
      },
    ],
    tech: [
      'React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS Lambda', 'SQS', 'SNS',
      'S3', 'CloudFront', 'Redis', 'WebSockets', 'REST APIs', 'CI/CD', 'Git',
    ],
  },
  {
    id: 'cimpress',
    company: 'Cimpress India (National Pen)',
    role: 'Software Engineer → Senior Software Engineer',
    type: 'Full-time | Global E-Commerce',
    duration: 'Aug 2020 – Feb 2023',
    location: 'Mumbai, Maharashtra, India · Remote/Hybrid',
    impacts: [
      {
        text: 'Shipped Templates, Accessories, Premium product features',
        metric: '30-40% of total revenue, +18% avg order value',
      },
      {
        text: 'Built internal Campaign/Product Admin Platform used by 30+ staff across 3 regions',
        metric: 'Campaign launch: 2 days → under 2 hours',
      },
      {
        text: 'Integrated Pay Now/Pay Later payment workflows (WebSocket)',
        metric: '+12% checkout completion, -25% payment tickets',
      },
      {
        text: 'Built 15+ production REST APIs, added Redis caching',
        metric: '800ms → under 200ms, 50K+ daily requests, 99.9% uptime',
      },
      {
        text: 'Built React storefronts with SSG on AWS S3 + CloudFront',
        metric: 'Sub-1.5s loads, 95+ Lighthouse, +22% organic traffic',
      },
      {
        text: 'Managed AWS infrastructure + CI/CD — 3-4 production releases per week, zero-downtime deployments',
      },
    ],
    tech: [
      'React', 'Angular', 'Node.js', 'Express.js', 'JavaScript', 'TypeScript',
      'Python', 'PostgreSQL', 'Redis', 'AWS', 'REST APIs', 'SSG', 'CI/CD', 'Git',
    ],
  },
  {
    id: 'kouchan',
    company: 'Kou Chan Knowledge Convergence',
    role: 'Android Developer Intern',
    type: 'Internship',
    duration: 'May 2018 – Jul 2018',
    location: 'Mumbai, Maharashtra, India',
    impacts: [
      { text: 'Collaborated on M3 E-wallet in partnership with Yes Bank' },
      { text: 'Developed "Book A Ride" app for local rides (similar to Ola/Uber)' },
      { text: 'Developed HRMS app for employee attendance at project locations' },
    ],
    tech: ['Java', 'Android', 'PHP'],
  },
];
