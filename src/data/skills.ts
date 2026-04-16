import type { SkillCategory } from '@/types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Frontend',
    icon: 'Monitor',
    skills: [
      { name: 'JavaScript', years: 6 },
      { name: 'TypeScript', years: 5 },
      { name: 'React.js', years: 5 },
      { name: 'Next.js', years: 3 },
      { name: 'Angular', years: 2 },
      { name: 'Redux', years: 4 },
      { name: 'HTML5', years: 6 },
      { name: 'CSS3', years: 6 },
      { name: 'Tailwind', years: 3 },
    ],
  },
  {
    name: 'Backend',
    icon: 'Server',
    skills: [
      { name: 'Node.js', years: 6 },
      { name: 'Express.js', years: 5 },
      { name: 'Python', years: 2 },
      { name: 'REST APIs', years: 6 },
      { name: 'Microservices', years: 3 },
      { name: 'WebSockets', years: 3 },
      { name: 'Serverless', years: 3 },
      { name: 'Authentication', years: 5 },
    ],
  },
  {
    name: 'Database',
    icon: 'Database',
    skills: [
      { name: 'PostgreSQL', years: 5 },
      { name: 'MySQL', years: 4 },
      { name: 'Redis', years: 4 },
      { name: 'SQL', years: 6 },
      { name: 'Query Optimization', years: 4 },
      { name: 'Database Design', years: 5 },
    ],
  },
  {
    name: 'Cloud',
    icon: 'Cloud',
    skills: [
      { name: 'AWS Lambda', years: 3 },
      { name: 'AWS S3', years: 4 },
      { name: 'SQS / SNS', years: 3 },
      { name: 'CloudFront', years: 3 },
      { name: 'CI/CD', years: 5 },
      { name: 'Git', years: 6 },
      { name: 'GitHub Actions', years: 3 },
    ],
  },
  {
    name: 'Architecture',
    icon: 'Blocks',
    skills: [
      { name: 'System Design', years: 3 },
      { name: 'Low-Level Design', years: 3 },
      { name: 'DSA', years: 4 },
      { name: 'Design Patterns', years: 4 },
      { name: 'Clean Architecture', years: 3 },
      { name: 'Agile / Scrum', years: 5 },
      { name: 'Code Reviews', years: 5 },
    ],
  },
  {
    name: 'Domain',
    icon: 'Lightbulb',
    skills: [
      { name: 'SaaS', years: 3 },
      { name: 'IoT', years: 3 },
      { name: 'E-Commerce', years: 3 },
      { name: 'Payments', years: 2 },
      { name: 'Real-Time Systems', years: 3 },
      { name: 'Performance', years: 4 },
    ],
  },
];
