'use client';

import { motion } from 'framer-motion';
import { Award, ShieldCheck, MessageCircle } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import { AWARDS, CERTIFICATIONS, RECOMMENDATIONS } from '@/data/achievements';
import { SECTION_IDS } from '@/lib/constants';

const Achievements = () => {
  return (
    <section id={SECTION_IDS.achievements} className="section-alt relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 noise-overlay" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading title="Achievements" subtitle="Awards, certifications, and what people say" accent="#f59e0b" />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Left: Awards + Certs */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-4 flex items-center gap-2.5 font-display text-base font-semibold text-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10"><Award size={16} className="text-amber-500" /></div>
                Awards
              </h3>
              <div className="space-y-3">
                {AWARDS.map((award, i) => (
                  <motion.div key={award.title} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-border-hover hover:-translate-y-0.5">
                    <div>
                      <p className="font-medium text-foreground">{award.title}</p>
                      <p className="text-xs text-muted">{award.issuer}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-500">{award.date}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 flex items-center gap-2.5 font-display text-base font-semibold text-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10"><ShieldCheck size={16} className="text-emerald-500" /></div>
                Certifications
              </h3>
              <div className="space-y-3">
                {CERTIFICATIONS.map((cert, i) => (
                  <motion.div key={cert.name} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-border-hover hover:-translate-y-0.5">
                    <div>
                      <p className="font-medium text-foreground">{cert.name}</p>
                      <p className="text-xs text-muted">{cert.issuer}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500">{cert.date}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Recommendations */}
          <div>
            <h3 className="mb-4 flex items-center gap-2.5 font-display text-base font-semibold text-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-muted"><MessageCircle size={16} className="text-accent" /></div>
              What People Say
            </h3>
            <div className="space-y-4">
              {RECOMMENDATIONS.map((rec, i) => (
                <motion.div key={rec.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="gradient-border rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-shadow">
                  <div className="relative">
                    <span className="absolute -top-2 -left-1 font-serif text-5xl text-accent/10">&ldquo;</span>
                    <blockquote className="relative z-10 pl-3 text-sm italic leading-relaxed text-muted">
                      {rec.quote}
                    </blockquote>
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-accent to-secondary text-xs font-bold text-white">
                      {rec.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{rec.name}</p>
                      <p className="text-xs text-muted-foreground">{rec.title} · {rec.company}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
