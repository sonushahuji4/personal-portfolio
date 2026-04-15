'use client';

import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import Card from '@/components/ui/card';
import Badge from '@/components/ui/badge';
import { COURSES } from '@/data/courses';
import { SECTION_IDS } from '@/lib/constants';

const Courses = () => {
  return (
    <section id={SECTION_IDS.courses} className="section-alt py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Courses"
          subtitle="Continuous learning through structured programs"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {COURSES.map((course, i) => (
            <motion.div
              key={course.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card gradient className="h-full">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {course.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {course.platform} · {course.instructor}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 capitalize">
                    <CheckCircle size={12} />
                    {course.status.replace('-', ' ')}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {course.topics.map((topic) => (
                    <Badge key={topic}>{topic}</Badge>
                  ))}
                </div>

                <div className="mt-4 border-t border-border pt-3">
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-hover"
                  >
                    <ExternalLink size={13} />
                    View Course
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
