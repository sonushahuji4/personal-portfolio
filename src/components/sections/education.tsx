'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/section-heading';
import Badge from '@/components/ui/badge';
import { EDUCATION } from '@/data/education';
import { SECTION_IDS } from '@/lib/constants';
import CompanyLogo, { EDUCATION_LOGO_PATHS } from '@/components/common/company-logo';

const EDU_COLORS = ['#A78BFA', '#67E8F9', '#6EE7B7', '#F472B6'];

const Education = () => {
  return (
    <section id={SECTION_IDS.education} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-notebook opacity-15" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background via-transparent to-background" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <SectionHeading title="Education" subtitle="From school to professional certifications" accent="#67E8F9" />

        {/* Year-based timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-16 top-0 bottom-0 w-px bg-linear-to-b from-accent/30 via-accent/15 to-transparent" />

          {EDUCATION.map((entry, index) => {
            const color = EDU_COLORS[index];
            const startYear = entry.duration.split('–')[0].trim().split(' ').pop() || '';

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative mb-10 last:mb-0 pl-16 sm:pl-32"
              >
                {/* Year label on the timeline */}
                <div className="absolute left-0 sm:left-4 top-3 flex items-center gap-2">
                  <span className="font-display text-sm font-bold sm:text-base" style={{ color }}>{startYear}</span>
                </div>

                {/* Dot on timeline */}
                <div className="absolute left-5.25 sm:left-15.25 top-4 z-10">
                  <div className="h-3 w-3 rounded-full transition-all duration-300 group-hover:scale-150"
                    style={{ backgroundColor: color, boxShadow: `0 0 0 4px ${color}20` }} />
                </div>

                {/* Connector line from dot to card */}
                <div className="absolute left-6.75 sm:left-16.75 top-4.5 w-6 sm:w-12 h-px" style={{ backgroundColor: color + '30' }} />

                {/* Card */}
                <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-shadow">
                  <div className="h-0.5" style={{ background: color }} />
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="shrink-0">
                        <CompanyLogo name={entry.institution} src={EDUCATION_LOGO_PATHS[entry.id] || ''} color={color} size={40} />
                      </div>
                      <div>
                        <h3 className="font-display text-base font-bold text-foreground">{entry.institution}</h3>
                        <p className="text-sm font-medium mt-0.5" style={{ color }}>{entry.credential}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{entry.duration}</p>
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
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
