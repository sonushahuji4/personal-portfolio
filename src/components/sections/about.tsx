'use client';

import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import Card from '@/components/ui/card';
import { ABOUT_SUMMARY, HIGHLIGHT_CARDS, INTERESTS } from '@/data/personal';
import { SECTION_IDS } from '@/lib/constants';

const About = () => {
  return (
    <section id={SECTION_IDS.about} className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading title="About Me" />

        <div className="grid gap-12 md:grid-cols-[1fr_1.5fr]">
          {/* Left: Photo + Highlight Cards */}
          <div className="flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex h-48 w-48 items-center justify-center rounded-full border-4 border-accent/30 bg-card"
            >
              <User size={80} className="text-accent/50" />
            </motion.div>

            <div className="grid w-full grid-cols-2 gap-4">
              {HIGHLIGHT_CARDS.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Card className="text-center">
                    <div className="text-2xl font-bold text-accent">{card.value}</div>
                    <div className="mt-1 text-xs text-muted">{card.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Summary + Interests */}
          <div>
            <div className="space-y-4">
              {ABOUT_SUMMARY.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="text-base leading-relaxed text-muted sm:text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8"
            >
              <h3 className="font-display text-lg font-semibold text-foreground">
                What I enjoy working on
              </h3>
              <ul className="mt-3 space-y-2">
                {INTERESTS.map((interest) => (
                  <li key={interest} className="flex items-start gap-2 text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {interest}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
