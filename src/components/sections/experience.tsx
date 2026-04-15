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
    <section id={SECTION_IDS.experience} className="section-alt relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 noise-overlay" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <SectionHeading title="Work Experience" subtitle="My professional journey and the impact I've made" />

        <Timeline>
          {EXPERIENCES.map((exp, index) => {
            const color = COMPANY_COLORS[exp.id] || 'var(--accent)';
            return (
              <Timeline.Item key={exp.id} isLast={index === EXPERIENCES.length - 1}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="gradient-border rounded-2xl border border-border bg-card p-6 shadow-sm shadow-shadow backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-shadow"
                >
                  <div className="flex items-start gap-4">
                    {/* Company logo */}
                    <div className="shrink-0">
                      {COMPANY_LOGOS[exp.id] ? (
                        (() => { const Logo = COMPANY_LOGOS[exp.id]; return <Logo size={48} />; })()
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold" style={{ backgroundColor: color + '20', color }}>
                          {exp.company.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="font-display text-lg font-bold text-foreground">
                          {exp.companyUrl ? (
                            <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                              {exp.company}
                            </a>
                          ) : exp.company}
                        </h3>
                        <span className="rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ backgroundColor: color + '15', color }}>
                          {exp.duration}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-accent">{exp.role}</p>
                      <p className="text-xs text-muted-foreground">{exp.type} · {exp.location}</p>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {exp.impacts.map((impact, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.03 }}
                        className="flex items-start gap-2.5 text-sm text-muted"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                        <span>
                          {impact.text}
                          {impact.metric && (
                            <span className="ml-1 font-semibold" style={{ color }}>
                              ({impact.metric})
                            </span>
                          )}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {exp.tech.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
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
