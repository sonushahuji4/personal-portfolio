# Section Spec: Education

## Purpose
Show Sonu's educational journey from school to engineering to professional certifications.

## Visual Design
- Vertical timeline (reuse Timeline component from Experience section)
- Chronological order: oldest at bottom, newest at top (consistent with Experience)
- Each entry: institution name, degree/certificate, duration, activities, description

## Content

### Entry 1: Scaler (Most Recent)
- **Institution**: Scaler
- **Credential**: Professional Certificate — Software Engineering (DSA, System Design & Full Stack Development)
- **Duration**: Apr 2023 – May 2025
- **Activities**: DSA Problem Solving, System Design, Backend Development, Mock Interviews, Competitive Programming
- **Description**: Completed a 16-module intensive program covering DSA, System Design, and Backend Development alongside full-time work. Modules: Problem Solving, Advanced DSA (4 modules), Databases & SQL, Backend LLD (3 modules), HLD, Backend Capstone, Data Engineering, DSA for Competitive Programming, Product Management. Cleared mock interviews in Advanced DSA, Backend LLD.

### Entry 2: Don Bosco Institute of Technology, Mumbai
- **Institution**: Don Bosco Institute of Technology, Kurla, Mumbai
- **Credential**: Bachelor of Engineering (Honors), Computer Science
- **Duration**: Aug 2016 – Jun 2020
- **Activities**: Technical Club, Coding Competitions, Hackathons, Project Exhibitions
- **Description**: Built a strong foundation in core CS fundamentals including data structures, algorithms, OOP, DBMS, OS, and computer networks.

### Entry 3: Don Bosco High School & Junior College, Lonavala
- **Institution**: Don Bosco High School and Junior College, Lonavala
- **Credential**: Higher Secondary Certificate (HSC), Science
- **Duration**: Jun 2014 – Mar 2016

### Entry 4: St. Dominic Savio High School, Andheri
- **Institution**: St. Dominic Savio High School, Andheri
- **Credential**: SSC
- **Duration**: 2006 – 2014

## Files to Create/Modify
1. `src/components/sections/education.tsx` — Main section
2. `src/data/education.ts` — Education data
3. `src/types/index.ts` — EducationEntry type

## Done Condition
- [ ] All 4 entries render correctly
- [ ] Reuses Timeline component from Experience
- [ ] Responsive
- [ ] tsc + lint pass
