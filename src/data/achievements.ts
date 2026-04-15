import type { Award, Certification, Recommendation } from '@/types';

export const AWARDS: Award[] = [
  {
    title: 'Star of the Sprint',
    issuer: 'Cimpress India',
    date: 'Feb 2023',
  },
  {
    title: 'Certificate of Appreciation',
    issuer: 'Cimpress India',
    date: 'Mar 2021',
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'Low Level System Design',
    issuer: 'Scaler',
    date: 'May 2024',
  },
  {
    name: 'JavaScript Specialist Certification',
    issuer: 'Scaler',
    date: 'May 2024',
  },
  {
    name: 'Data Structures & Algorithms',
    issuer: 'Scaler',
    date: 'Dec 2023',
  },
];

export const RECOMMENDATIONS: Recommendation[] = [
  {
    name: 'Ankur Singh',
    title: 'Senior Software Engg. AI/ML | GenAI, LLM',
    company: 'IIT Mandi',
    quote:
      'Sonu is a very dedicated software engineer who believes in taking full ownership and delivering the project at hand. His strong technical knowledge, combined with excellent soft skills, makes him well-suited for roles requiring technical leadership, mentorship, and quality engineering.',
  },
  {
    name: 'Apurv Moroney',
    title: 'SWE III @Google | Ex-Amazon, Ex-Cimpress',
    company: 'Google',
    quote:
      'Having worked with Sonu for 2 years, I can definitely say that he is a hardworking, self-driven, and passionate developer. He has a keen eye for detail and a ready-to-learn attitude.',
  },
  {
    name: 'Jinal Shah',
    title: 'Product Manager',
    company: 'Cimpress India',
    quote:
      'He is always committed to his work and ready to tackle any challenge. He is one of the team members that routinely provides a solution along with the problem statement.',
  },
];
