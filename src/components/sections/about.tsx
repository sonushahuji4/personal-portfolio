'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import Card from '@/components/ui/card';
import { ABOUT_SUMMARY, HIGHLIGHT_CARDS, INTERESTS } from '@/data/personal';
import { SECTION_IDS } from '@/lib/constants';

const AnimatedNumber = ({ value, suffix = '' }: { value: string; suffix?: string }) => {
  const [display, setDisplay] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const numericPart = parseInt(value.replace(/[^0-9]/g, ''), 10);
          if (isNaN(numericPart)) {
            setDisplay(value);
            return;
          }
          const duration = 1500;
          const steps = 60;
          const increment = numericPart / steps;
          let current = 0;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            current = Math.min(Math.floor(increment * step), numericPart);
            setDisplay(current.toLocaleString());
            if (step >= steps) {
              setDisplay(numericPart.toLocaleString());
              clearInterval(timer);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  const nonNumeric = value.replace(/[0-9,]/g, '');

  return (
    <span ref={ref} className="tabular-nums">
      {display}{nonNumeric}{suffix}
    </span>
  );
};

const About = () => {
  return (
    <section id={SECTION_IDS.about} className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading title="About Me" subtitle="Get to know the person behind the code" />

        <div className="grid gap-12 md:grid-cols-[1fr_1.5fr]">
          {/* Left: Photo + Highlight Cards */}
          <div className="flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative"
            >
              <div className="flex h-48 w-48 items-center justify-center rounded-full border-2 border-accent/20 bg-card">
                <User size={72} className="text-accent/40" />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-full border border-dashed border-accent/10" style={{ animation: 'spin-slow 20s linear infinite' }} />
            </motion.div>

            <div className="grid w-full grid-cols-2 gap-3">
              {HIGHLIGHT_CARDS.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  <Card gradient className="text-center">
                    <div className="text-2xl font-bold text-gradient">
                      <AnimatedNumber value={card.value} />
                    </div>
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
                  transition={{ duration: 0.5, delay: i * 0.12 }}
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
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <h3 className="font-display text-lg font-semibold text-foreground">
                What I enjoy working on
              </h3>
              <ul className="mt-3 space-y-2.5">
                {INTERESTS.map((interest, i) => (
                  <motion.li
                    key={interest}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                    className="flex items-start gap-3 text-muted"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_6px_var(--accent-glow)]" />
                    {interest}
                  </motion.li>
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
