'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ShieldCheck, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import { AWARDS, CERTIFICATIONS, RECOMMENDATIONS } from '@/data/achievements';
import { SECTION_IDS } from '@/lib/constants';

const Achievements = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => setActiveTestimonial((i) => (i + 1) % RECOMMENDATIONS.length);
  const prevTestimonial = () => setActiveTestimonial((i) => (i - 1 + RECOMMENDATIONS.length) % RECOMMENDATIONS.length);

  return (
    <section id={SECTION_IDS.achievements} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 noise-overlay" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading title="Achievements" subtitle="Awards, certifications, and what people say" accent="#f59e0b" />

        {/* Top row: Awards + Certifications — horizontal cards */}
        <div className="mb-16 grid gap-6 sm:grid-cols-2">
          {/* Awards */}
          <div>
            <h3 className="mb-4 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider text-amber-500">
              <Award size={16} />
              Awards
            </h3>
            <div className="space-y-3">
              {AWARDS.map((award, i) => (
                <motion.div key={award.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center justify-between rounded-xl border border-border bg-card/80 backdrop-blur-sm p-4 card-premium">
                  <div>
                    <p className="font-semibold text-foreground">{award.title}</p>
                    <p className="text-xs text-muted">{award.issuer}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-500">{award.date}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="mb-4 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider text-emerald-500">
              <ShieldCheck size={16} />
              Certifications
            </h3>
            <div className="space-y-3">
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div key={cert.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center justify-between rounded-xl border border-border bg-card/80 backdrop-blur-sm p-4 card-premium">
                  <div>
                    <p className="font-semibold text-foreground">{cert.name}</p>
                    <p className="text-xs text-muted">{cert.issuer}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-500">{cert.date}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial carousel — one at a time with navigation */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider text-accent">
              <MessageCircle size={16} />
              What People Say
            </h3>
            <div className="flex gap-2">
              <button onClick={prevTestimonial} className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-muted transition-all hover:border-accent/30 hover:text-accent" aria-label="Previous testimonial">
                <ChevronLeft size={18} />
              </button>
              <button onClick={nextTestimonial} className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-muted transition-all hover:border-accent/30 hover:text-accent" aria-label="Next testimonial">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-8 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="absolute top-4 left-6 font-serif text-6xl text-accent/10 leading-none">&ldquo;</span>
                <blockquote className="relative z-10 text-lg leading-relaxed text-muted italic sm:text-xl">
                  {RECOMMENDATIONS[activeTestimonial].quote}
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-accent to-secondary text-sm font-bold text-white">
                    {RECOMMENDATIONS[activeTestimonial].name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{RECOMMENDATIONS[activeTestimonial].name}</p>
                    <p className="text-sm text-muted-foreground">{RECOMMENDATIONS[activeTestimonial].title} · {RECOMMENDATIONS[activeTestimonial].company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots indicator */}
            <div className="mt-6 flex justify-center gap-1">
              {RECOMMENDATIONS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className="flex items-center justify-center p-2"
                  aria-label={`Go to testimonial ${i + 1}`}
                >
                  <span className={`block h-2 rounded-full transition-all duration-300 ${i === activeTestimonial ? 'w-8 bg-accent' : 'w-2 bg-border hover:bg-border-hover'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
