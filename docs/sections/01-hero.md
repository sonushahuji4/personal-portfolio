# Section Spec: Hero

## Purpose
First thing visitors see. Must communicate who Sonu is, what he does, and provide immediate navigation to key actions.

## Visual Design
- Full viewport height (100vh)
- Dark background with subtle animated pattern (CSS grid lines, gradient mesh, or floating particles)
- Name in large display font, title below it, one-liner tagline
- Two CTA buttons: primary "View My Work", secondary "Download Resume"
- Social icon links row: GitHub, LinkedIn, LeetCode, CodeChef, Email
- Scroll-down indicator at bottom

## Content

```
Name: Sonu Shahuji
Title: Full Stack Engineer
Tagline: "Founding Engineer at a Series A Solar Fintech Startup | 6+ Years Building Scalable Web Applications"
```

Social Links:
- GitHub: https://github.com/sonushahuji4
- LinkedIn: https://www.linkedin.com/in/sonushahuji/
- LeetCode: (leetcode profile URL)
- CodeChef: (codechef profile URL)
- Email: sonushahuji4@gmail.com

CTA:
- "View My Work" → scrolls to #projects
- "Download Resume" → links to /resume.pdf (Sonu_Shahuji_April_2026.pdf in public/)

## Files to Create/Modify
1. `src/components/sections/hero.tsx` — Main component
2. `src/data/personal.ts` — Name, title, tagline, social links
3. `src/types/index.ts` — SocialLink type (if not exists)
4. `src/app/page.tsx` — Import and render Hero

## Component Structure
```
<Hero>
  <BackgroundAnimation />  (CSS-only or lightweight canvas)
  <div container>
    <motion.h1>Name</motion.h1>
    <motion.p>Title</motion.p>
    <motion.p>Tagline</motion.p>
    <div CTAs>
      <Button primary>View My Work</Button>
      <Button secondary>Download Resume</Button>
    </div>
    <SocialLinks />
  </div>
  <ScrollIndicator />
</div>
```

## Animations
- Name: fade-in + slide-up on mount (delay 0.2s)
- Title: fade-in + slide-up (delay 0.4s)
- Tagline: fade-in + slide-up (delay 0.6s)
- CTAs: fade-in + slide-up (delay 0.8s)
- Social links: staggered fade-in (delay 1.0s, stagger 0.1s)
- Background: continuous subtle animation (CSS)

## Done Condition
- [ ] Renders full-height with all content
- [ ] Both CTAs work (scroll + download link)
- [ ] Social links open in new tabs
- [ ] Responsive: stacks vertically on mobile
- [ ] tsc + lint pass
