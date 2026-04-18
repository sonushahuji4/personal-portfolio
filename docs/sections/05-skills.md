# Section Spec: Skills

## Purpose
Display technical skills organized by category. Show breadth and depth. Not just a flat list — give visual hierarchy.

## Visual Design
- Categorized grid: each category is a card/group with a heading and skill items inside
- Skill items: name + optional proficiency indicator (years or level)
- 6 categories in a 3x2 grid on desktop, 2x3 on tablet, 1-column on mobile
- Each category card has a subtle icon or emoji

## Content

### Frontend
JavaScript (ES6+), TypeScript, React.js, Next.js, Angular, Redux, HTML5, CSS3, Responsive Design, SSG/SSR, GatsbyJS

### Backend
Node.js, Express.js, Python, REST APIs, Microservices, Serverless Architecture, WebSockets, Background Workers, Authentication, PHP

### Database & Caching
PostgreSQL, MySQL, SQL, Redis, Caching, Query Optimization, Database Indexing, Bulk Inserts

### Cloud & DevOps
AWS (Lambda, SQS, SNS, S3, CloudFront), CI/CD Pipelines, Git, GitHub Actions, Serverless Framework

### Architecture & Practices
System Design, Low-Level Design, Data Structures & Algorithms, Design Patterns, Clean Architecture, OOP, Agile, Scrum, Code Reviews, TDD

### Domain Knowledge
SaaS, IoT, E-Commerce, Payment Integration, Real-Time Systems, Performance Optimization, Full-Stack Development

## Files to Create/Modify
1. `src/components/sections/skills.tsx` — Main section
2. `src/data/skills.ts` — Categorized skills data
3. `src/types/index.ts` — SkillCategory, Skill types

## Done Condition
- [ ] All 6 categories render with correct skills
- [ ] Responsive grid layout
- [ ] Visual distinction between categories
- [ ] tsc + lint pass
