# Section Spec: Online Platforms

## Purpose
Showcase Sonu's competitive programming profiles and developer presence. The numbers here tell a story of consistency and dedication.

## Visual Design
- Card grid: 4 cards (LeetCode, CodeChef, GitHub, LinkedIn)
- Each card: platform icon/logo, key stats, profile link
- Cards have distinct accent colors per platform
- Stats displayed prominently with labels

## Content

### LeetCode
- **Username**: sonushahuji4
- **Problems Solved**: 624 (232 Easy, 330 Medium, 62 Hard)
- **Contest Rating**: 2,059 (Knight)
- **Global Ranking**: 15,282 / 865,650 (Top 1.85%)
- **Contests Attended**: 25
- **Primary Language**: Python3 (638 problems)
- **Profile URL**: https://leetcode.com/sonushahuji4/

### CodeChef
- **Username**: sonushahuji4
- **Problems Solved**: 321
- **Rating**: 1,366 (Highest: 1,591)
- **Division**: Div 4 (1★)
- **Contests Participated**: 42
- **Profile URL**: https://www.codechef.com/users/sonushahuji4

### GitHub
- **Username**: sonushahuji4
- **Repositories**: 31
- **Followers**: 10 | Following: 11
- **Pinned Repos**: Competitive-Programming, CodeChef, SPOJ, DSA, Eventos, 36grd
- **Bio**: "If at first you don't succeed, call it version 1.0"
- **Profile URL**: https://github.com/sonushahuji4

### LinkedIn
- **Connections**: 500+
- **Followers**: 980
- **Recommendations**: 8 received
- **Profile URL**: https://www.linkedin.com/in/sonushahuji/

## Files to Create/Modify
1. `src/components/sections/platforms.tsx` — Main section
2. `src/data/platforms.ts` — Platform data
3. `src/types/index.ts` — Platform type

## Done Condition
- [ ] All 4 platform cards render with stats
- [ ] Each card links to actual profile (opens new tab)
- [ ] Platform-specific accent colors
- [ ] Responsive: 2x2 on desktop, 1-column on mobile
- [ ] tsc + lint pass
