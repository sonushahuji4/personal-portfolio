'use client';

import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import Badge from '@/components/ui/badge';
import Timeline from '@/components/common/timeline';
import { EDUCATION } from '@/data/education';
import { EDUCATION_LOGOS } from '@/components/common/logos';
import { SECTION_IDS } from '@/lib/constants';

const EDU_COLORS = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b'];

const Education = () => {
  return (
    <section id={SECTION_IDS.education} className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading title="Education" subtitle="My academic journey and continuous learning" />

        <Timeline>
          {EDUCATION.map((entry, index) => {
            const color = EDU_COLORS[index] || 'var(--accent)';
            return (
              <Timeline.Item key={entry.id} isLast={index === EDUCATION.length - 1}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-border-hover hover:-translate-y-0.5 hover:shadow-lg hover:shadow-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      {EDUCATION_LOGOS[entry.id] ? (
                        (() => { const Logo = EDUCATION_LOGOS[entry.id]; return <Logo size={44} />; })()
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold" style={{ backgroundColor: color + '15', color }}>
                          <GraduationCap size={20} />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="font-display text-base font-bold text-foreground">{entry.institution}</h3>
                        <span className="rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ backgroundColor: color + '15', color }}>{entry.duration}</span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-accent">{entry.credential}</p>
                    </div>
                  </div>

                  {entry.description && (
                    <p className="mt-3 text-sm leading-relaxed text-muted">{entry.description}</p>
                  )}

                  {entry.activities && entry.activities.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {entry.activities.map((a) => <Badge key={a}>{a}</Badge>)}
                    </div>
                  )}
                </motion.div>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </div>
    </section>
  );
};

export default Education;
