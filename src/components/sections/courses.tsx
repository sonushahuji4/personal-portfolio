'use client';

import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import Badge from '@/components/ui/badge';
import { COURSES } from '@/data/courses';
import { SECTION_IDS } from '@/lib/constants';
import CompanyLogo, { COURSE_LOGO_PATHS } from '@/components/common/company-logo';

const Courses = () => {
  return (
    <section id={SECTION_IDS.courses} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Bracket pattern */}
      <div className="pointer-events-none absolute inset-0 bg-brackets opacity-40" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background via-transparent to-background" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading title="Courses" subtitle="Structured programs I completed alongside full-time work" accent="#f59e0b" />

        <div className="grid gap-5 sm:grid-cols-2">
          {COURSES.map((course, i) => {
            return (
              <motion.div
                key={course.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="group relative h-full rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-shadow">
                  <div className="h-0.5 bg-linear-to-r from-amber-500 to-orange-500" />
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0">
                          <CompanyLogo name={course.platform} src={COURSE_LOGO_PATHS[course.platform] || ''} color="#f59e0b" size={40} />
                        </div>
                        <div>
                          <h3 className="font-display text-base font-bold text-foreground">{course.name}</h3>
                          <p className="mt-0.5 text-xs text-muted">{course.platform} · {course.instructor}</p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 capitalize">
                        <CheckCircle size={11} />
                        {course.status.replace('-', ' ')}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {course.topics.map((topic) => <Badge key={topic}>{topic}</Badge>)}
                    </div>

                    <div className="mt-4 border-t border-border pt-3">
                      <a href={course.url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-500 transition-all hover:text-amber-400 hover:underline underline-offset-4">
                        <ExternalLink size={13} /> View Course
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Courses;
