'use client';

import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle, BookOpen } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import Badge from '@/components/ui/badge';
import { COURSES } from '@/data/courses';
import { SECTION_IDS } from '@/lib/constants';

const Courses = () => {
  return (
    <section id={SECTION_IDS.courses} className="section-alt relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 noise-overlay" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading title="Courses" subtitle="Continuous learning through structured programs" />

        <div className="grid gap-5 sm:grid-cols-2">
          {COURSES.map((course, i) => (
            <motion.div
              key={course.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="gradient-border group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-shadow">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-muted">
                      <BookOpen size={18} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-foreground">{course.name}</h3>
                      <p className="mt-0.5 text-xs text-muted">{course.platform} · {course.instructor}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 capitalize">
                    <CheckCircle size={11} />
                    {course.status.replace('-', ' ')}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {course.topics.map((topic) => <Badge key={topic}>{topic}</Badge>)}
                </div>

                <div className="mt-4 border-t border-border pt-3">
                  <a href={course.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-accent transition-all hover:text-accent-hover hover:underline underline-offset-4">
                    <ExternalLink size={13} /> View Course
                  </a>
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
