'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import Badge from '@/components/ui/badge';
import { COURSES } from '@/data/courses';
import { SECTION_IDS } from '@/lib/constants';
import CompanyLogo, { COURSE_LOGO_PATHS } from '@/components/common/company-logo';

const Courses = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -340 : 340, behavior: 'smooth' });
  };

  return (
    <section id={SECTION_IDS.courses} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-brackets opacity-30" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background via-transparent to-background" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between mb-10">
          <SectionHeading title="Courses" subtitle="Structured programs completed alongside full-time work" accent="#f59e0b" className="mb-0 text-left" align="left" />
          <div className="hidden sm:flex gap-2">
            <button onClick={() => scroll('left')} className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted transition-all hover:border-accent/30 hover:text-accent" aria-label="Scroll left">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll('right')} className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted transition-all hover:border-accent/30 hover:text-accent" aria-label="Scroll right">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {COURSES.map((course, i) => (
            <motion.div
              key={course.name}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="min-w-75 max-w-85 shrink-0 snap-start"
            >
              <div className="group relative h-full rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden card-premium">
                <div className="h-0.5 bg-linear-to-r from-amber-500 to-orange-500" />
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <CompanyLogo name={course.platform} src={COURSE_LOGO_PATHS[course.platform] || ''} color="#f59e0b" size={40} />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-base font-bold text-foreground leading-tight">{course.name}</h3>
                      <p className="mt-0.5 text-xs text-muted">{course.platform}</p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mb-3">by {course.instructor}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {course.topics.slice(0, 4).map((topic) => <Badge key={topic}>{topic}</Badge>)}
                    {course.topics.length > 4 && (
                      <span className="text-xs text-muted-foreground">+{course.topics.length - 4} more</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                      <CheckCircle size={12} />
                      {course.status.replace('-', ' ')}
                    </div>
                    <a href={course.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-amber-500 transition-all hover:text-amber-400">
                      <ExternalLink size={12} /> View
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
