# Section Spec: About

## Purpose
Give visitors a deeper understanding of who Sonu is — professional summary plus key metrics that immediately establish credibility.

## Visual Design
- Two-column layout: left side has photo placeholder + highlight cards, right side has text
- On mobile: stacks vertically (photo on top, text, then cards)
- Profile photo: circular with accent color border/ring
- Highlight cards: 4 cards in a 2x2 grid with large numbers and labels

## Content

### Professional Summary
"Full Stack Engineer with 6 years of experience working on scalable web applications using Node.js, React.js, JavaScript, TypeScript, Next.js, PostgreSQL, and AWS.

Currently working as a Founding Engineer at Aerem Solutions, a solar fintech startup. I joined at an early stage and got the opportunity to make foundational decisions around the tech stack, database design, and CI/CD setup, and helped deliver the MVP. Over time, the platform has grown to monitor 500+ solar plants, serve 200+ B2B customers, and process 2M+ daily IoT data points.

Before Aerem, I spent close to 3 years at Cimpress India (National Pen), a global e-commerce platform serving users across 20+ countries. I worked across the full stack — contributing to product features, building REST APIs, and setting up React storefronts with a focus on performance and reliability."

### Highlight Cards
1. **6+** — Years of Experience
2. **500+** — Solar Plants Monitored
3. **624** — LeetCode Problems Solved
4. **2M+** — Daily IoT Data Points

### Areas of Interest
- Building products from zero to one
- Real-time systems — IoT pipelines, WebSocket dashboards
- Performance optimization — DB tuning, caching
- Helping teams grow — code reviews, mentoring

## Files to Create/Modify
1. `src/components/sections/about.tsx` — Main component
2. `src/data/personal.ts` — Add summary, highlights, interests
3. `src/types/index.ts` — HighlightCard type
4. `src/app/page.tsx` — Import and render About

## Component Structure
```
<About>
  <SectionHeading title="About Me" />
  <div grid>
    <div left>
      <ProfilePhoto />  (placeholder avatar with accent ring)
      <HighlightCards>  (2x2 grid)
        <Card number="6+" label="Years Experience" />
        <Card number="500+" label="Solar Plants" />
        <Card number="624" label="LeetCode Solved" />
        <Card number="2M+" label="Daily IoT Data" />
      </HighlightCards>
    </div>
    <div right>
      <p>Summary paragraph 1</p>
      <p>Summary paragraph 2</p>
      <p>Summary paragraph 3</p>
      <InterestsList />
    </div>
  </div>
</About>
```

## Animations
- Section heading: fade-in on scroll
- Photo: scale-in on scroll
- Highlight cards: staggered count-up animation for numbers
- Text paragraphs: fade-in slide-up staggered

## Done Condition
- [ ] Two-column on desktop, stacked on mobile
- [ ] Highlight numbers are visually prominent
- [ ] Photo placeholder renders with accent border
- [ ] tsc + lint pass
