'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/section-heading';
import Badge from '@/components/ui/badge';
import Timeline from '@/components/common/timeline';
import { EDUCATION } from '@/data/education';
import { SECTION_IDS } from '@/lib/constants';

const Education = () => {
  return (
    <section id={SECTION_IDS.education} className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          title="Education"
          subtitle="My academic journey and continuous learning"
        />

        <Timeline>
          {EDUCATION.map((entry, index) => (
            <Timeline.Item key={entry.id} isLast={index === EDUCATION.length - 1}>
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm shadow-shadow transition-all hover:border-border-hover hover:shadow-md hover:shadow-shadow">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {entry.institution}
                  </h3>
                  <span className="rounded-full bg-accent-muted px-2.5 py-0.5 text-xs font-medium text-accent">
                    {entry.duration}
                  </span>
                </div>
                <p className="mt-1 text-base font-medium text-gradient inline-block">{entry.credential}</p>

                {entry.description && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="mt-3 text-sm leading-relaxed text-muted"
                  >
                    {entry.description}
                  </motion.p>
                )}

                {entry.activities && entry.activities.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {entry.activities.map((activity) => (
                      <Badge key={activity}>{activity}</Badge>
                    ))}
                  </div>
                )}
              </div>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </section>
  );
};

export default Education;
