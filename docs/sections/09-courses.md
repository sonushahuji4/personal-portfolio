# Section Spec: Courses

## Purpose
Show continuous learning through structured courses completed outside of formal education.

## Visual Design
- Card list or grid
- Each course: name, instructor/platform, status (Completed), link to course page
- Subtle "Completed" badge on each card

## Content

### 1. Namaste JavaScript (Season 1 & 2)
- **Platform**: NamasteDev.com
- **Instructor**: Akshay Saini
- **Status**: Completed
- **URL**: https://namastedev.com/learn/namaste-javascript
- **Topics**: Deep dive into JavaScript internals, closures, event loop, promises, async/await

### 2. Namaste React
- **Platform**: NamasteDev.com
- **Instructor**: Akshay Saini
- **Status**: Completed
- **URL**: https://namastedev.com/learn/namaste-react
- **Topics**: React from scratch, hooks, routing, state management, optimization

### 3. Namaste Node.js
- **Platform**: NamasteDev.com
- **Instructor**: Akshay Saini
- **Status**: Completed
- **URL**: https://namastedev.com/learn/namaste-node
- **Topics**: Node.js internals, libuv, streams, clustering, building production servers

### 4. Scaler Academy
- **Platform**: Scaler
- **Status**: Completed (Apr 2023 – May 2025)
- **Topics**: 16 modules — DSA (Intermediate + Advanced), Databases & SQL, Backend LLD (3 modules), HLD, Backend Capstone, Data Engineering, DSA for Competitive Programming, Product Management
- **Achievements**: Cleared mock interviews in Advanced DSA, Backend LLD

## Files to Create/Modify
1. `src/components/sections/courses.tsx` — Main section
2. `src/data/courses.ts` — Course data
3. `src/types/index.ts` — Course type

## Done Condition
- [ ] All 4 courses render with correct data
- [ ] "Completed" status shown
- [ ] Links open in new tabs
- [ ] Responsive
- [ ] tsc + lint pass
