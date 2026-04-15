'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/section-heading';
import Badge from '@/components/ui/badge';
import Timeline from '@/components/common/timeline';
import { EXPERIENCES } from '@/data/experience';
import { SECTION_IDS } from '@/lib/constants';

const Experience = () => {
  return (
    <section id={SECTION_IDS.experience} className="section-alt py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          title="Work Experience"
          subtitle="My professional journey and the impact I've made"
        />

        <Timeline>
          {EXPERIENCES.map((exp, index) => (
            <Timeline.Item key={exp.id} isLast={index === EXPERIENCES.length - 1}>
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm shadow-shadow transition-all hover:border-border-hover hover:shadow-md hover:shadow-shadow">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-accent"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      exp.company
                    )}
                  </h3>
                  <span className="rounded-full bg-accent-muted px-2.5 py-0.5 text-xs font-medium text-accent">
                    {exp.duration}
                  </span>
                </div>
                <p className="mt-1.5 text-base font-medium text-gradient inline-block">{exp.role}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{exp.type} · {exp.location}</p>

                <ul className="mt-4 space-y-2.5">
                  {exp.impacts.map((impact, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className="flex items-start gap-2.5 text-sm text-muted"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/40" />
                      <span>
                        {impact.text}
                        {impact.metric && (
                          <span className="ml-1 font-semibold text-accent">
                            ({impact.metric})
                          </span>
                        )}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {exp.tech.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </div>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </section>
  );
};

export default Experience;
