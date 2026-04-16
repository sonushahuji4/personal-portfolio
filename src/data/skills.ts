export type SkillCategory = 'frontend' | 'backend' | 'database' | 'cloud' | 'architecture' | 'tools';

export interface Skill {
  id: string;
  name: string;
  shortName?: string;
  logoUrl: string;
  lucideIcon?: string;
  category: SkillCategory;
  years?: number;
  isDarkLogo?: boolean;
}

export interface SkillCategoryInfo {
  id: SkillCategory;
  title: string;
}

export const SKILL_CATEGORIES: SkillCategoryInfo[] = [
  { id: 'frontend', title: 'Frontend' },
  { id: 'backend', title: 'Backend' },
  { id: 'database', title: 'Database & Caching' },
  { id: 'cloud', title: 'Cloud & DevOps' },
  { id: 'architecture', title: 'Architecture' },
  { id: 'tools', title: 'Tools' },
];

const D = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

export const SKILLS: Skill[] = [
  // Frontend
  { id: 'javascript', name: 'JavaScript', shortName: 'JS', logoUrl: `${D}/javascript/javascript-original.svg`, category: 'frontend', years: 6 },
  { id: 'typescript', name: 'TypeScript', shortName: 'TS', logoUrl: `${D}/typescript/typescript-original.svg`, category: 'frontend', years: 5 },
  { id: 'react', name: 'React.js', shortName: 'React', logoUrl: `${D}/react/react-original.svg`, category: 'frontend', years: 5 },
  { id: 'nextjs', name: 'Next.js', shortName: 'Next', logoUrl: `${D}/nextjs/nextjs-original.svg`, category: 'frontend', years: 3, isDarkLogo: true },
  { id: 'angular', name: 'Angular', logoUrl: `${D}/angular/angular-original.svg`, category: 'frontend', years: 2 },
  { id: 'html5', name: 'HTML5', shortName: 'HTML', logoUrl: `${D}/html5/html5-original.svg`, category: 'frontend', years: 6 },
  { id: 'css3', name: 'CSS3', shortName: 'CSS', logoUrl: `${D}/css3/css3-original.svg`, category: 'frontend', years: 6 },
  { id: 'tailwind', name: 'Tailwind CSS', shortName: 'Tailwind', logoUrl: `${D}/tailwindcss/tailwindcss-original.svg`, category: 'frontend', years: 3 },
  { id: 'redux', name: 'Redux', logoUrl: `${D}/redux/redux-original.svg`, category: 'frontend', years: 4 },

  // Backend
  { id: 'nodejs', name: 'Node.js', shortName: 'Node', logoUrl: `${D}/nodejs/nodejs-original.svg`, category: 'backend', years: 6 },
  { id: 'express', name: 'Express.js', shortName: 'Express', logoUrl: `${D}/express/express-original.svg`, category: 'backend', years: 5, isDarkLogo: true },
  { id: 'python', name: 'Python', logoUrl: `${D}/python/python-original.svg`, category: 'backend', years: 2 },
  { id: 'php', name: 'PHP', logoUrl: `${D}/php/php-original.svg`, category: 'backend', years: 1 },

  // Database & Caching
  { id: 'postgresql', name: 'PostgreSQL', shortName: 'Postgres', logoUrl: `${D}/postgresql/postgresql-original.svg`, category: 'database', years: 5 },
  { id: 'mysql', name: 'MySQL', logoUrl: `${D}/mysql/mysql-original.svg`, category: 'database', years: 4 },
  { id: 'redis', name: 'Redis', logoUrl: `${D}/redis/redis-original.svg`, category: 'database', years: 4 },
  { id: 'mongodb', name: 'MongoDB', shortName: 'Mongo', logoUrl: `${D}/mongodb/mongodb-original.svg`, category: 'database', years: 2 },

  // Cloud & DevOps
  { id: 'aws', name: 'AWS', logoUrl: `${D}/amazonwebservices/amazonwebservices-plain-wordmark.svg`, category: 'cloud', years: 4 },
  { id: 'docker', name: 'Docker', logoUrl: `${D}/docker/docker-original.svg`, category: 'cloud', years: 2 },
  { id: 'git', name: 'Git', logoUrl: `${D}/git/git-original.svg`, category: 'cloud', years: 6 },
  { id: 'github', name: 'GitHub', logoUrl: `${D}/github/github-original.svg`, category: 'cloud', years: 6, isDarkLogo: true },
  { id: 'githubactions', name: 'GitHub Actions', shortName: 'Actions', logoUrl: `${D}/githubactions/githubactions-original.svg`, category: 'cloud', years: 3 },

  // Architecture & Practices
  { id: 'rest-api', name: 'REST APIs', shortName: 'REST', logoUrl: '', lucideIcon: 'Globe', category: 'architecture', years: 6 },
  { id: 'websockets', name: 'WebSockets', shortName: 'WS', logoUrl: '', lucideIcon: 'Radio', category: 'architecture', years: 3 },
  { id: 'system-design', name: 'System Design', shortName: 'SysDes', logoUrl: '', lucideIcon: 'Network', category: 'architecture', years: 3 },
  { id: 'cicd', name: 'CI/CD', logoUrl: '', lucideIcon: 'GitBranch', category: 'architecture', years: 5 },
  { id: 'agile', name: 'Agile / Scrum', shortName: 'Agile', logoUrl: '', lucideIcon: 'KanbanSquare', category: 'architecture', years: 5 },

  // Tools
  { id: 'vscode', name: 'VS Code', logoUrl: `${D}/vscode/vscode-original.svg`, category: 'tools', years: 6 },
  { id: 'postman', name: 'Postman', logoUrl: `${D}/postman/postman-original.svg`, category: 'tools', years: 5 },
  { id: 'jira', name: 'Jira', logoUrl: `${D}/jira/jira-original.svg`, category: 'tools', years: 4 },
  { id: 'npm', name: 'npm', logoUrl: `${D}/npm/npm-original-wordmark.svg`, category: 'tools', years: 6 },
];
