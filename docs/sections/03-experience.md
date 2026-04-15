# Section Spec: Experience

## Purpose
Show Sonu's career progression with concrete impact metrics. This is the most content-heavy section and the most important for recruiters.

## Visual Design
- Vertical timeline with alternating left-right cards on desktop
- On mobile: single-column timeline (all left-aligned)
- Each card has: company logo area, role, duration, location, key impacts, tech tags
- Impact metrics highlighted with accent color (the numbers)
- Timeline line with dots at each company node

## Content

### Entry 1: Aerem Solutions
- **Role**: Sr. Software Engineer / Founding Engineer
- **Type**: Full-time | Series A Startup | Solar Fintech | Raised INR 160 Crore
- **Duration**: Feb 2023 – Present (~3 yrs 3 mos)
- **Location**: Mumbai, Maharashtra, India · Hybrid
- **Key Impacts**:
  1. Led foundational architecture decisions — selected tech stack (React, Node.js, PostgreSQL, AWS), designed DB schema, set up CI/CD, delivered MVP that helped secure Series A (INR 160 Crore)
  2. Built solar monitoring SaaS platform from zero to 500+ active plants, 200+ B2B customers, 100+ field installers
  3. Built real-time IoT data ingestion pipeline: 2M+ daily inverter readings, 6+ vendor integrations, reduced fault detection from 24+ hours to under 15 minutes
  4. Optimized PostgreSQL: bulk upserts, partitioned tables, connection pooling — 30-40% write latency reduction, ~35% infrastructure cost savings
  5. Engineered vendor-agnostic integration layer: new vendor onboarding from 3-4 weeks to under 3 days
  6. Built real-time dashboards (WebSocket), automated PDF reports, alert system — reduced support tickets by ~60%
  7. Unified auth system (TOTP OTP), consolidated 3 platforms into single codebase — 50% less maintenance
  8. Grew team from 1 to 5, mentored 2 junior engineers to independent ownership in 4 months
- **Tech**: React, Node.js, TypeScript, PostgreSQL, AWS Lambda, SQS, SNS, S3, CloudFront, Redis, WebSockets, REST APIs, CI/CD, Git

### Entry 2: Cimpress India (National Pen)
- **Role**: Software Engineer → Senior Software Engineer
- **Type**: Full-time | Global E-Commerce
- **Duration**: Aug 2020 – Feb 2023 (2 yrs 7 mos)
- **Location**: Mumbai, Maharashtra, India · Remote/Hybrid
- **Key Impacts**:
  1. Shipped Templates, Accessories, Premium product features — contributed 30-40% of total platform revenue, +18% average order value
  2. Built internal Campaign/Product Admin Platform — used by 30+ staff across 3 regions, cut campaign launch from 2 days to under 2 hours
  3. Integrated Pay Now/Pay Later payment workflows (WebSocket) — +12% checkout completion, -25% payment support tickets
  4. Built 15+ production REST APIs, added Redis caching — response time from 800ms to under 200ms, 50K+ daily requests, 99.9% uptime
  5. Built React storefronts with SSG on AWS S3 + CloudFront — sub-1.5s loads, 95+ Lighthouse, +22% organic search traffic
  6. Managed AWS infrastructure + CI/CD — 3-4 production releases per week, zero-downtime deployments
- **Tech**: React, Angular, Node.js, Express.js, JavaScript, TypeScript, Python, PostgreSQL, Redis, AWS, REST APIs, SSG, CI/CD, Git

### Entry 3: Kou Chan Knowledge Convergence
- **Role**: Android Developer Intern
- **Duration**: May 2018 – Jul 2018 (3 mos)
- **Location**: Mumbai, Maharashtra, India
- **Key Impacts**:
  1. Collaborated on M3 E-wallet in partnership with Yes Bank
  2. Developed "Book A Ride" app for local rides (similar to Ola/Uber)
  3. Developed HRMS app for employee attendance at project locations
- **Tech**: Java, Android, PHP

## Files to Create/Modify
1. `src/components/sections/experience.tsx` — Main section
2. `src/components/common/timeline.tsx` — Reusable timeline component
3. `src/data/experience.ts` — All experience data
4. `src/types/index.ts` — ExperienceEntry, Impact types

## Component Structure
```
<Experience>
  <SectionHeading title="Work Experience" />
  <Timeline>
    {experiences.map(exp => (
      <TimelineEntry key={exp.id}>
        <CompanyHeader logo role duration location />
        <ImpactList impacts={exp.impacts} />
        <TechTags tags={exp.tech} />
      </TimelineEntry>
    ))}
  </Timeline>
</Experience>
```

## Animations
- Timeline line draws on scroll
- Each entry slides in from alternate sides
- Impact numbers animate/pulse on scroll-into-view
- Tech tags fade-in staggered

## Done Condition
- [ ] All 3 companies rendered with correct data
- [ ] Impact metrics visually highlighted
- [ ] Timeline alternates on desktop, single-column on mobile
- [ ] Tech tags displayed as badges
- [ ] tsc + lint pass
