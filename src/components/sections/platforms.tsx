'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import { PLATFORMS } from '@/data/platforms';
import { SECTION_IDS } from '@/lib/constants';

const AnimatedStat = ({ value }: { value: string }) => {
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
        const steps = 50;
        const inc = numericPart / steps;
        let step = 0;
        const timer = setInterval(() => {
          step++;
          setDisplay(Math.min(Math.floor(inc * step), numericPart).toLocaleString());
          if (step >= steps) { setDisplay(numericPart.toLocaleString()); clearInterval(timer); }
        }, 1200 / steps);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, numericPart]);

  return <span ref={ref} className="tabular-nums font-bold text-foreground text-lg">{display}{suffix}</span>;
};

const Platforms = () => {
  return (
    <section id={SECTION_IDS.platforms} className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading title="Online Platforms" subtitle="Competitive programming profiles and developer presence" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORMS.map((platform, i) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="gradient-border group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-shadow">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold" style={{ backgroundColor: platform.color + '15', color: platform.color }}>
                      {platform.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-foreground">{platform.name}</h3>
                      <p className="text-xs text-muted-foreground">@{platform.username}</p>
                    </div>
                  </div>
                  <a href={platform.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${platform.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-accent-muted hover:text-accent">
                    <ExternalLink size={14} />
                  </a>
                </div>

                <div className="space-y-3">
                  {platform.stats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="text-xs text-muted">{stat.label}</span>
                      <AnimatedStat value={stat.value} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platforms;
