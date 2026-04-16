'use client';

import dynamic from 'next/dynamic';
import SectionHeading from '@/components/ui/section-heading';
import { SECTION_IDS } from '@/lib/constants';

// Dynamic import — react-pageflip needs window
const EducationBook = dynamic(() => import('./education-book'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="h-8 w-8 mx-auto rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
        <p className="mt-3 text-xs text-muted-foreground">Loading book...</p>
      </div>
    </div>
  ),
});

const Education = () => {
  return (
    <section id={SECTION_IDS.education} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-notebook opacity-10" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <SectionHeading
          title="Education"
          subtitle="Flip through the pages of my academic journey"
          accent="#0891B2"
        />
        <EducationBook />
      </div>
    </section>
  );
};

export default Education;
