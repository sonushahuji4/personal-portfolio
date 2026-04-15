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

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Awards + Certifications column */}
          <div className="space-y-8">
            {/* Awards */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                <Award size={20} className="text-accent" />
                Awards
              </h3>
              <div className="space-y-3">
                {AWARDS.map((award, i) => (
                  <motion.div
                    key={award.title}
                    initial={{ opacity: 0, x: -16 }}
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
                        <span className="shrink-0 text-xs text-muted-foreground">{award.date}</span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                <ShieldCheck size={20} className="text-accent" />
                Certifications
              </h3>
              <div className="space-y-3">
                {CERTIFICATIONS.map((cert, i) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, x: -16 }}
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
                        <span className="shrink-0 text-xs text-muted-foreground">{cert.date}</span>
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
              <Quote size={20} className="text-accent" />
              Recommendations
            </h3>
            <div className="space-y-4">
              {RECOMMENDATIONS.map((rec, i) => (
                <motion.div
                  key={rec.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                >
                  <Card>
                    <blockquote className="text-sm italic leading-relaxed text-muted">
                      &ldquo;{rec.quote}&rdquo;
                    </blockquote>
                    <div className="mt-4 border-t border-border pt-3">
                      <p className="font-semibold text-foreground">{rec.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {rec.title} · {rec.company}
                      </p>
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
