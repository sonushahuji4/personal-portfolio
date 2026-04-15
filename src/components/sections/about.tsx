'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Zap, Users, TrendingUp } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import { ABOUT_SUMMARY, HIGHLIGHT_CARDS, INTERESTS } from '@/data/personal';
import { SECTION_IDS } from '@/lib/constants';

const HIGHLIGHT_ICONS = [TrendingUp, Zap, Code2, Users];

const AnimatedNumber = ({ value }: { value: string }) => {
  const numericPart = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const suffix = value.replace(/[0-9,]/g, '');
  const [display, setDisplay] = useState('0');
  const startedRef = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !startedRef.current) {
        startedRef.current = true;
        if (isNaN(numericPart)) { setDisplay(value); return; }
        const steps = 60;
        const inc = numericPart / steps;
        let step = 0;
        const timer = setInterval(() => {
          step++;
          setDisplay(Math.min(Math.floor(inc * step), numericPart).toLocaleString());
          if (step >= steps) { setDisplay(numericPart.toLocaleString()); clearInterval(timer); }
        }, 1500 / steps);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, numericPart]);

  return <span ref={ref} className="tabular-nums">{display}{suffix}</span>;
};

const About = () => {
  return (
    <section id={SECTION_IDS.about} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading title="About Me" subtitle="Get to know the person behind the code" />

        {/* Bento Grid Stats */}
        <div className="mb-16 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {HIGHLIGHT_CARDS.map((card, i) => {
            const Icon = HIGHLIGHT_ICONS[i];
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="gradient-border group rounded-2xl border border-border bg-card p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-muted transition-colors group-hover:bg-accent/20">
                  <Icon size={20} className="text-accent" />
                </div>
                <div className="text-3xl font-extrabold text-gradient">
                  <AnimatedNumber value={card.value} />
                </div>
                <div className="mt-1 text-xs text-muted">{card.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Content */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-5">
            {ABOUT_SUMMARY.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-base leading-[1.8] text-muted sm:text-[17px]"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h3 className="font-display text-lg font-semibold text-foreground">
              What I enjoy working on
            </h3>
            <ul className="mt-4 space-y-3">
              {INTERESTS.map((interest, i) => (
                <motion.li
                  key={interest}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3 text-[15px] text-muted"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_var(--accent-glow)]" />
                  {interest}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
