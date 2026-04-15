'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, Code2, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import SectionHeading from '@/components/ui/section-heading';
import { ABOUT_SUMMARY, HIGHLIGHT_CARDS, INTERESTS } from '@/data/personal';
import { SECTION_IDS } from '@/lib/constants';

const HIGHLIGHT_ICONS = [TrendingUp, Zap, Code2, Rocket];
const HIGHLIGHT_COLORS = ['#A78BFA', '#67E8F9', '#6EE7B7', '#F472B6'];

const AnimatedNumber = ({ value, color }: { value: string; color: string }) => {
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

  return <span ref={ref} className="tabular-nums" style={{ color }}>{display}{suffix}</span>;
};

const About = () => {
  return (
    <section id={SECTION_IDS.about} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading title="About Me" subtitle="Get to know the person behind the code" />

        {/* Stats row */}
        <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {HIGHLIGHT_CARDS.map((card, i) => {
            const Icon = HIGHLIGHT_ICONS[i];
            const color = HIGHLIGHT_COLORS[i];
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-2xl border border-border bg-card p-6 text-center card-premium"
              >
                <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl opacity-60" style={{ background: color }} />
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: color + '12' }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <div className="text-3xl font-extrabold">
                  <AnimatedNumber value={card.value} color={color} />
                </div>
                <div className="mt-1.5 text-xs font-medium text-muted">{card.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Content — photo + text */}
        <div className="grid gap-10 md:grid-cols-[auto_1fr]">
          {/* Photo — side portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="hidden md:block"
          >
            <div className="relative w-48 lg:w-64 overflow-hidden rounded-2xl border border-border/30">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/profile-about.png`}
                alt="Sonu Shahuji"
                width={256}
                height={380}
                className="w-full object-cover"
                unoptimized
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background to-transparent" />
            </div>
          </motion.div>

          {/* Text content */}
          <div>
            <div className="space-y-5">
              {ABOUT_SUMMARY.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-body-lg text-muted"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <h3 className="font-display text-lg font-bold text-foreground mb-4">
                What drives me
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {INTERESTS.map((interest, i) => (
                  <motion.div
                    key={interest}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card/50 p-3"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold" style={{ backgroundColor: HIGHLIGHT_COLORS[i] + '15', color: HIGHLIGHT_COLORS[i] }}>
                      {i + 1}
                    </span>
                    <span className="text-sm text-muted">{interest}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
