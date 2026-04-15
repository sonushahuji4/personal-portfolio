'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/section-heading';
import Badge from '@/components/ui/badge';
import Timeline from '@/components/common/timeline';
import { EXPERIENCES } from '@/data/experience';
import { SECTION_IDS } from '@/lib/constants';
import { COMPANY_LOGOS } from '@/components/common/logos';

const COMPANY_COLORS: Record<string, string> = {
  aerem: '#14b8a6',
  cimpress: '#6366f1',
  kouchan: '#f59e0b',
};

const Experience = () => {
  return (
    <section id={SECTION_IDS.experience} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Circuit board pattern background */}
      <div className="pointer-events-none absolute inset-0 bg-circuit opacity-30" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background via-transparent to-background" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <SectionHeading
          title="Work Experience"
          subtitle="Building products, leading teams, and shipping impact"
          accent="#14b8a6"
        />

        <Timeline>
          {EXPERIENCES.map((exp, index) => {
            const color = COMPANY_COLORS[exp.id] || 'var(--accent)';
            const Logo = COMPANY_LOGOS[exp.id];
            return (
              <Timeline.Item key={exp.id} isLast={index === EXPERIENCES.length - 1}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-sm shadow-shadow transition-all duration-300 hover:shadow-lg hover:shadow-shadow overflow-hidden"
                >
                  {/* Top color stripe */}
                  <div className="h-1" style={{ background: color }} />

                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0">
                        {Logo ? <Logo size={48} /> : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold" style={{ backgroundColor: color + '15', color }}>
                            {exp.company.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h3 className="font-display text-xl font-bold text-foreground">
                            {exp.companyUrl ? (
                              <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                                {exp.company}
                              </a>
                            ) : exp.company}
                          </h3>
                          <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold" style={{ backgroundColor: color + '15', color }}>
                            {exp.duration}
                          </span>
                        </div>
                        <p className="mt-1 text-base font-semibold" style={{ color }}>{exp.role}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{exp.type}</p>
                        <p className="text-xs text-muted-foreground">{exp.location}</p>
                      </div>
                    </div>

                    <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                      {exp.impacts.map((impact, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: i * 0.03 }}
                          className="flex items-start gap-2.5 text-sm text-muted leading-relaxed"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                          <span>
                            {impact.text}
                            {impact.metric && (
                              <span className="ml-1 font-bold" style={{ color }}>
                                {impact.metric}
                              </span>
                            )}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {exp.tech.map((tag) => <Badge key={tag}>{tag}</Badge>)}
                    </div>
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

export default Experience;
