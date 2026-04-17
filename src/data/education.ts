import type { EducationEntry } from '@/types';

// Chronological order: oldest first (for the book)
export const EDUCATION: EducationEntry[] = [
  {
    id: 'ssc',
    institution: 'St. Dominic Savio High School, Andheri',
    credential: 'Secondary School Certificate (SSC)',
    duration: '2006 – 2014',
    activities: ['Foundational Academics', 'Creative Arts', 'Public Speaking'],
    description: 'Consistently engaged in academics and extra-curricular activities. Developed early interests in logic and creative arts while building a disciplined learning habit.',
  },
  {
    id: 'hsc',
    institution: 'Don Bosco High School and Junior College, Lonavala',
    credential: 'Higher Secondary Certificate (HSC), Science',
    duration: 'Jun 2014 – Mar 2016',
    activities: ['Science & Mathematics', 'Analytical Thinking', 'Time Management'],
    description: 'Focused on Physics, Chemistry, and Mathematics (PCM). Developed a strong analytical mindset and problem-solving skills during these formative pre-engineering years.',
  },
  {
    id: 'dbit',
    institution: 'Don Bosco Institute of Technology, Kurla, Mumbai',
    credential: 'Bachelor of Engineering (Honors), Computer Science',
    duration: 'Aug 2016 – Jun 2020',
    activities: ['Technical Club', 'Coding Competitions', 'Hackathons', 'Project Exhibitions'],
    description: 'Built a strong foundation in core CS fundamentals including data structures, algorithms, OOP, DBMS, OS, and computer networks.',
  },
  {
    id: 'scaler',
    institution: 'Scaler',
    credential: 'Professional Certificate — DSA, System Design & Full Stack',
    duration: 'Apr 2023 – May 2025',
    activities: ['DSA Problem Solving', 'System Design', 'Backend Development', 'Mock Interviews'],
    description: 'Completed a 16-module intensive program covering DSA, System Design, and Backend Development alongside full-time work. Cleared mock interviews in Advanced DSA and Backend LLD.',
  },
];
