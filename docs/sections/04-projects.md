# Section Spec: Projects

## Purpose
Showcase both professional work and personal projects. Professional projects demonstrate scale and impact. Personal projects demonstrate initiative and breadth.

## Visual Design
- Tab/filter toggle: "Professional" | "Personal"
- Card grid: 2 columns on desktop, 1 on mobile
- Each card: gradient border on hover, title, description, tech tags, action links
- Professional cards: slightly larger, labeled "Professional"
- Personal cards: with demo + source links where available

## Content

### Professional Projects

**1. Aerem Solar Monitoring Platform**
- Description: A production-grade SaaS platform for real-time solar plant monitoring. Serves 500+ plants, 200+ B2B customers. Features real-time dashboards, energy analytics, IoT data ingestion (2M+ daily readings), automated reports, and alerting.
- Tech: React, Node.js, TypeScript, PostgreSQL, AWS, Redis, WebSockets
- Links: None (proprietary)
- Highlight: "Founding Engineer — Built from zero"

**2. National Pen E-Commerce Platform**
- Description: Global e-commerce platform for customizable products, live in 20+ countries serving millions of users. Built product features contributing 30-40% of revenue, internal admin tools, payment integrations, and SSG storefronts.
- Tech: React, Angular, Node.js, Express.js, TypeScript, Python, PostgreSQL, AWS, Redis
- Links: None (proprietary)
- Highlight: "Contributed 30-40% platform revenue"

### Personal Projects

**3. Comment System**
- Description: A user-friendly comment system with Google login. Users can view, interact with, and manage comments (create, modify, reply, like, delete).
- Tech: TypeScript, React, Node.js, Express.js
- Links: Demo (if available), Source: github.com/sonushahuji4/Comment-System-Frontend + Comment-System-Backend

**4. Eventos**
- Description: A social media platform for event enthusiasts to discover, track, and engage with events, including media, stories, live streams, posts, and connecting with friends.
- Tech: JavaScript, React
- Links: Source: github.com/sonushahuji4/Eventos
- Stars: 5

**5. WhatsApp Clone**
- Description: Real-time messaging application built to replicate WhatsApp's core functionality.
- Tech: TypeScript, React, Node.js
- Links: Source: github.com/sonushahuji4/WhatsAppClone

**6. Chat Application**
- Description: Real-time chat application using ReactJS, NodeJS, Express and Socket.io.
- Tech: TypeScript, React, Node.js, Express, Socket.io
- Links: Source: github.com/sonushahuji4/Chat-Application

**7. Machine Coding Solutions**
- Description: A collection of machine coding round solutions built from scratch — covering real-time systems, data structures, and full-stack problems.
- Tech: TypeScript, Node.js, HTML
- Links: Source: github.com/sonushahuji4/machine-coding-solution

**8. 36grd — Sky Hackathon**
- Description: Government of Chhattisgarh project conducted by Sky Hackathon (27/08/2018).
- Tech: Java
- Links: Source: github.com/sonushahuji4/36grd

## Files to Create/Modify
1. `src/components/sections/projects.tsx` — Main section
2. `src/data/projects.ts` — All project data
3. `src/types/index.ts` — Project type

## Done Condition
- [ ] Filter toggle works between Professional/Personal
- [ ] All projects render with correct data
- [ ] Links open in new tabs
- [ ] Cards have hover effects
- [ ] Responsive grid
- [ ] tsc + lint pass
