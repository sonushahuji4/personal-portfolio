'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/section-heading';
import Badge from '@/components/ui/badge';
import { EDUCATION } from '@/data/education';
import { SECTION_IDS } from '@/lib/constants';
import CompanyLogo, { EDUCATION_LOGO_PATHS } from '@/components/common/company-logo';

const EDU_COLORS = ['#7C3AED', '#0891B2', '#059669', '#DB2777'];

const Education = () => {
  return (
    <section id={SECTION_IDS.education} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-notebook opacity-15" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background via-transparent to-background" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading title="Education" subtitle="From school to professional certifications" accent="#0891B2" />

        {/* 2x2 Priority Grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {EDUCATION.map((entry, index) => {
            const color = EDU_COLORS[index];
            const isPrimary = index < 2; // Scaler + DBIT are primary

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden card-premium"
              >
                <div className="h-0.5" style={{ background: color }} />
                <div className={isPrimary ? 'p-6' : 'p-5'}>
                  {/* Header: Logo + Title + Date */}
                  <div className="flex items-start gap-3">
                    <div className="shrink-0">
                      <CompanyLogo name={entry.institution} src={EDUCATION_LOGO_PATHS[entry.id] || ''} color={color} size={isPrimary ? 44 : 36} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
                        <h3 className={`font-display font-bold text-foreground ${isPrimary ? 'text-base' : 'text-sm'}`}>
                          {entry.institution}
                        </h3>
                        <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: color + '12', color }}>
                          {entry.duration}
                        </span>
                      </div>
                      <p className={`font-medium mt-0.5 ${isPrimary ? 'text-sm' : 'text-xs'}`} style={{ color }}>
                        {entry.credential}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  {entry.description && (
                    <p className={`mt-3 leading-relaxed text-muted ${isPrimary ? 'text-sm' : 'text-xs'}`}>
                      {entry.description}
                    </p>
                  )}

                  {/* Tags */}
                  {entry.activities && entry.activities.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {entry.activities.map((a) => <Badge key={a}>{a}</Badge>)}
                    </div>
                  )}
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
