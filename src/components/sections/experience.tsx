'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/section-heading';
import Badge from '@/components/ui/badge';
import { EXPERIENCES } from '@/data/experience';
import { SECTION_IDS } from '@/lib/constants';
import CompanyLogo, { COMPANY_LOGO_PATHS } from '@/components/common/company-logo';

const COMPANY_COLORS: Record<string, string> = {
  aerem: '#059669',
  cimpress: '#0891B2',
  kouchan: '#DB2777',
};

const Experience = () => {
  return (
    <section id={SECTION_IDS.experience} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-circuit opacity-20" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background via-transparent to-background" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <SectionHeading title="Work Experience" subtitle="Building products, leading teams, and shipping impact" accent="#6EE7B7" />

        {/* Year-based timeline */}
        <div className="relative">
          {/* Vertical line */}
          {/* MOBILE FIX: hide the timeline rail on mobile — it overlaps the year label and adds no value there */}
          <div className="hidden sm:block absolute left-6 sm:left-16 top-0 bottom-0 w-px bg-linear-to-b from-accent/30 via-accent/15 to-transparent" />

          {EXPERIENCES.map((exp, index) => {
            const color = COMPANY_COLORS[exp.id] || 'var(--accent)';
            const startYear = exp.duration.split('–')[0].trim().split(' ').pop() || '';

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                /* MOBILE FIX: remove the 64px left padding that existed only to make room for the rail/dot */
                className="group relative mb-6 last:mb-0 pl-0 sm:pl-32 sm:mb-10"
              >
                {/* Year label (desktop — absolute) */}
                {/* MOBILE FIX: hide the absolute-positioned year on mobile; year is rendered inside the card header instead */}
                <div className="hidden sm:block absolute left-0 sm:left-4 top-3">
                  <span className="font-display text-sm font-bold sm:text-base" style={{ color }}>{startYear}</span>
                </div>

                {/* Dot */}
                {/* MOBILE FIX: hide timeline dot on mobile — no rail, so dot has no anchor */}
                <div className="hidden sm:block absolute left-5.25 sm:left-15.25 top-4 z-10">
                  <div className="h-3 w-3 rounded-full transition-all duration-300 group-hover:scale-150"
                    style={{ backgroundColor: color, boxShadow: `0 0 0 4px ${color}20` }} />
                </div>

                {/* Connector */}
                {/* MOBILE FIX: hide connector on mobile — was part of the rail system */}
                <div className="hidden sm:block absolute left-6.75 sm:left-16.75 top-4.5 w-6 sm:w-12 h-px" style={{ backgroundColor: color + '30' }} />

                {/* Card */}
                <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-shadow">
                  <div className="h-1" style={{ background: color }} />
                  {/* MOBILE FIX: 16px min padding honored (p-4 = 16px on mobile, p-6 on sm+) */}
                  <div className="p-4 sm:p-6">
                    {/* MOBILE FIX: year badge at top of card on mobile — bold, clearly labels the period */}
                    <div className="sm:hidden mb-3">
                      <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide" style={{ backgroundColor: color + '18', color }}>
                        {exp.duration}
                      </span>
                    </div>

                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="shrink-0">
                        <CompanyLogo name={exp.company} src={COMPANY_LOGO_PATHS[exp.id] || ''} color={color} size={48} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h3 className="font-display text-base sm:text-lg font-bold text-foreground">
                            {exp.companyUrl ? (
                              <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
                                {exp.company}
                              </a>
                            ) : exp.company}
                          </h3>
                          {/* MOBILE FIX: show the inline duration chip only on sm+ — mobile already has the year badge above */}
                          <span className="hidden sm:inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold" style={{ backgroundColor: color + '15', color }}>
                            {exp.duration}
                          </span>
                        </div>
                        <p className="mt-1 text-sm sm:text-base font-semibold" style={{ color }}>{exp.role}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{exp.type}</p>
                        <p className="text-xs text-muted-foreground">{exp.location}</p>
                      </div>
                    </div>

                    <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                      {exp.impacts.map((impact, i) => (
                        <motion.li key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: i * 0.03 }}
                          className="flex items-start gap-2.5 text-sm text-muted leading-relaxed">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                          <span>
                            {impact.text}
                            {impact.metric && <span className="ml-1 font-bold" style={{ color }}>{impact.metric}</span>}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {exp.tech.map((tag) => <Badge key={tag}>{tag}</Badge>)}
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

export default Experience;
