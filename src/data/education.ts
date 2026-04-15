import type { EducationEntry } from '@/types';

export const EDUCATION: EducationEntry[] = [
  {
    id: 'scaler',
    institution: 'Scaler',
    credential: 'Professional Certificate — Software Engineering (DSA, System Design & Full Stack Development)',
    duration: 'Apr 2023 – May 2025',
    activities: [
      'DSA Problem Solving',
      'System Design',
      'Backend Development',
      'Mock Interviews',
      'Competitive Programming',
    ],
    description:
      'Completed a 16-module intensive program covering DSA, System Design, and Backend Development alongside full-time work. Cleared mock interviews in Advanced DSA, Backend LLD.',
  },
  {
    id: 'dbit',
    institution: 'Don Bosco Institute of Technology, Kurla, Mumbai',
    credential: 'Bachelor of Engineering (Honors), Computer Science',
    duration: 'Aug 2016 – Jun 2020',
    activities: [
      'Technical Club',
      'Coding Competitions',
      'Hackathons',
      'Project Exhibitions',
    ],
    description:
      'Built a strong foundation in core CS fundamentals including data structures, algorithms, OOP, DBMS, OS, and computer networks.',
  },
  {
    id: 'hsc',
    institution: 'Don Bosco High School and Junior College, Lonavala',
    credential: 'Higher Secondary Certificate (HSC), Science',
    duration: 'Jun 2014 – Mar 2016',
  },
  {
    id: 'ssc',
    institution: 'St. Dominic Savio High School, Andheri',
    credential: 'SSC',
    duration: '2006 – 2014',
  },
];
