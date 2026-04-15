# PROJECT_SPEC.md — Sonu Shahuji Portfolio

## 1. Vision

A personal portfolio that tells the story of Sonu Shahuji's engineering journey — from school in Lonavala to founding engineer at a Series A startup in Mumbai. Not a generic template. Every section should communicate impact, growth, and craft.

## 2. Target Audience

- Engineering hiring managers and recruiters
- Fellow engineers and tech community
- Potential collaborators

## 3. Design Direction

- **Theme**: Dark, techy developer aesthetic
- **Mood**: Professional but with personality — not corporate, not flashy
- **Typography**: Distinctive display font for headings + clean readable body font
- **Color palette**: Dark background (#0a0a0a range), with a strong accent color (electric blue or emerald green), muted grays for text hierarchy
- **Layout**: Full-width sections with generous whitespace, asymmetric elements where appropriate
- **Motion**: Scroll-triggered reveals, staggered list animations, subtle hover states. Not over-animated.
- **Mobile**: Fully responsive, mobile-first. Hamburger nav on mobile.

## 4. Sections Specification

### 4.1 Hero
- Full viewport height
- Name: "Sonu Shahuji"
- Title: "Full Stack Engineer"
- Subtitle/tagline: One-liner about founding engineer + 6 years experience
- CTA buttons: "View My Work" (scrolls to projects), "Download Resume" (PDF link)
- Social links: GitHub, LinkedIn, LeetCode, CodeChef, Email
- Subtle background animation (grid pattern, particles, or gradient mesh)

### 4.2 About
- Professional summary (2-3 paragraphs from LinkedIn about)
- Key highlight cards: "6+ Years Experience", "500+ Solar Plants Monitored", "624 LeetCode Problems", "Series A Founding Engineer"
- Profile photo placeholder (circular, with border accent)

### 4.3 Experience (Timeline)
- Vertical timeline, most recent first
- Three entries:
  1. **Aerem Solutions** (Feb 2023 – Present) — Founding Engineer / Sr. Software Engineer
  2. **Cimpress India / National Pen** (Aug 2020 – Feb 2023) — SDE → Sr. SDE
  3. **Kou Chan Knowledge Convergence** (May 2018 – Jul 2018) — Android Developer Intern
- Each entry: company, role, duration, location, key impacts (3-5 bullets with metrics), tech stack tags
- Impact metrics should be visually prominent (colored, larger font, or highlighted)

### 4.4 Projects
- Grid or card layout
- Two categories: "Professional" and "Personal"
- Professional: Aerem SaaS Platform, National Pen E-commerce
- Personal: Comment System, Eventos, WhatsApp Clone, Chat Application, Machine Coding Solutions
- Each card: title, description, tech tags, links (demo/source where available)
- Professional projects won't have source links (proprietary)

### 4.5 Skills
- Categorized display (not just a list of badges)
- Categories: Frontend, Backend, Database & Caching, Cloud & DevOps, Architecture & Practices, Domain Knowledge
- Each skill with relative proficiency or years of usage
- Visual representation: skill bars, radar chart, or categorized grid

### 4.6 Education (Timeline)
- Vertical timeline, chronological (oldest first or newest first — consistent with experience)
- Entries:
  1. St. Dominic Savio High School, Andheri (SSC, 2006–2014)
  2. Don Bosco High School & Junior College, Lonavala (HSC Science, 2014–2016)
  3. Don Bosco Institute of Technology, Mumbai (B.E. Hons CS, 2016–2020)
  4. Scaler (Professional Certificate — DSA, System Design, Full Stack, 2023–2025)

### 4.7 Online Platforms
- Card-based display with stats
- **LeetCode**: 624 solved, Rating 2059 (Knight), Top 1.85%, 25 contests
- **CodeChef**: 321 solved, Rating 1366 (Highest 1591), 42 contests
- **GitHub**: 31 repos, 10 followers, pinned repos
- **LinkedIn**: 500+ connections, 8 recommendations, 980 followers
- Each card links to the actual profile

### 4.8 Achievements & Certifications
- **Awards**: Star of the Sprint (Cimpress, Feb 2023), Certificate of Appreciation (Mar 2021)
- **Certifications**: Low Level System Design (Scaler, May 2024), JavaScript Specialist (Scaler, May 2024), DSA (Scaler, Dec 2023)
- **Recommendations**: Display 2-3 key quotes from LinkedIn recommendations (Ankur Singh, Siby Thampi, Apurv Moroney)

### 4.9 Courses
- **Namaste JavaScript** (Season 1 & 2) — by Akshay Saini — Completed
- **Namaste React** — by Akshay Saini — Completed
- **Namaste Node.js** — by Akshay Saini — Completed
- **Scaler Academy** — DSA, System Design, Full Stack Development (16 modules) — Completed
- Each with link to course page

### 4.10 Hobbies & Interests
- Playful section with icons/illustrations
- Music: Guitar, Piano
- Sports: Football, Hockey, Basketball
- Additional: Coding (competitive programming), Tech exploration, Problem solving
- Light, fun visual treatment — contrast with the technical sections above

### 4.11 Contact / Footer
- "Let's Connect" heading
- Email: sonushahuji4@gmail.com
- Phone: +91 9594196932
- LinkedIn, GitHub links
- "Download Resume" button (links to April 2026 resume PDF)
- Copyright footer

## 5. Technical Requirements

- Lighthouse score: 90+ on all metrics
- Fully accessible (semantic HTML, ARIA labels, keyboard navigation)
- SEO optimized (meta tags, Open Graph, structured data)
- Fast: under 2s load time on 3G
- No external API calls — all data is static
- Resume PDF served from public/ folder

## 6. Deployment

- GitHub Pages (free)
- GitHub Actions for CI/CD
- Auto-deploy on push to main branch
- URL: https://sonushahuji4.github.io/sonu-portfolio/
