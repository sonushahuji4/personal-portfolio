'use client';

import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import Badge from '@/components/ui/badge';
import Timeline from '@/components/common/timeline';
import { EDUCATION } from '@/data/education';
import { SECTION_IDS } from '@/lib/constants';
import { EDUCATION_LOGOS } from '@/components/common/logos';

const EDU_COLORS = ['#6366f1', '#0891b2', '#0891b2', '#166534'];

const Education = () => {
  return (
    <section id={SECTION_IDS.education} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Notebook lines background */}
      <div className="pointer-events-none absolute inset-0 bg-notebook opacity-20" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background via-transparent to-background" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <SectionHeading
          title="Education"
          subtitle="From school to professional certifications"
          accent="#0891b2"
        />

        <Timeline>
          {EDUCATION.map((entry, index) => {
            const color = EDU_COLORS[index] || 'var(--accent)';
            const Logo = EDUCATION_LOGOS[entry.id];
            return (
              <Timeline.Item key={entry.id} isLast={index === EDUCATION.length - 1}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-shadow"
                >
                  <div className="h-0.5" style={{ background: color }} />
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0">
                        {Logo ? <Logo size={44} /> : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: color + '12', color }}>
                            <GraduationCap size={20} />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h3 className="font-display text-base font-bold text-foreground">{entry.institution}</h3>
                          <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold" style={{ backgroundColor: color + '12', color }}>{entry.duration}</span>
                        </div>
                        <p className="mt-1 text-sm font-semibold" style={{ color }}>{entry.credential}</p>
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
                  </div>
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
