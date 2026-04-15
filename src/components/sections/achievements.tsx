'use client';

import { motion } from 'framer-motion';
import { Award, ShieldCheck, Quote } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import Card from '@/components/ui/card';
import { AWARDS, CERTIFICATIONS, RECOMMENDATIONS } from '@/data/achievements';
import { SECTION_IDS } from '@/lib/constants';

const Achievements = () => {
  return (
    <section id={SECTION_IDS.achievements} className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Achievements & Certifications"
          subtitle="Awards, certifications, and peer endorsements"
        />

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Awards + Certifications column */}
          <div className="space-y-8">
            {/* Awards */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
                  <Award size={18} className="text-amber-500" />
                </div>
                Awards
              </h3>
              <div className="space-y-3">
                {AWARDS.map((award, i) => (
                  <motion.div
                    key={award.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <Card>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-foreground">{award.title}</p>
                          <p className="text-sm text-muted">{award.issuer}</p>
                        </div>
                        <span className="shrink-0 rounded-full bg-accent-muted px-2.5 py-0.5 text-xs text-accent">{award.date}</span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                  <ShieldCheck size={18} className="text-emerald-500" />
                </div>
                Certifications
              </h3>
              <div className="space-y-3">
                {CERTIFICATIONS.map((cert, i) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <Card>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-foreground">{cert.name}</p>
                          <p className="text-sm text-muted">{cert.issuer}</p>
                        </div>
                        <span className="shrink-0 rounded-full bg-accent-muted px-2.5 py-0.5 text-xs text-accent">{cert.date}</span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations column */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-muted">
                <Quote size={18} className="text-accent" />
              </div>
              Recommendations
            </h3>
            <div className="space-y-4">
              {RECOMMENDATIONS.map((rec, i) => (
                <motion.div
                  key={rec.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                >
                  <Card gradient>
                    <div className="relative">
                      <span className="absolute -top-1 -left-1 text-4xl font-serif text-accent/15">&ldquo;</span>
                      <blockquote className="pl-4 text-sm italic leading-relaxed text-muted">
                        {rec.quote}
                      </blockquote>
                    </div>
                    <div className="mt-4 flex items-center gap-3 border-t border-border pt-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-muted text-sm font-bold text-accent">
                        {rec.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{rec.name}</p>
                        <p className="text-xs text-muted-foreground">{rec.title}</p>
                      </div>
                    </div>
                  </Card>
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
