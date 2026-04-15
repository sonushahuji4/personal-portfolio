'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import { PLATFORMS } from '@/data/platforms';
import { SECTION_IDS } from '@/lib/constants';
import { PLATFORM_LOGOS } from '@/components/common/logos';

const AnimatedStat = ({ value, color }: { value: string; color: string }) => {
  const numericPart = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const suffix = value.replace(/[0-9,]/g, '');
  const [display, setDisplay] = useState(isNaN(numericPart) ? value : '0');
  const startedRef = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isNaN(numericPart)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !startedRef.current) {
        startedRef.current = true;
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
  }, [numericPart]);

  return <span ref={ref} className="tabular-nums text-lg font-bold" style={{ color }}>{display}{suffix}</span>;
};

const Platforms = () => {
  return (
    <section id={SECTION_IDS.platforms} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading title="Online Presence" subtitle="Competitive programming profiles and developer activity" accent="#FFA116" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORMS.map((platform, i) => {
            const Logo = PLATFORM_LOGOS[platform.name];
            return (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative block rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-shadow"
              >
                {/* Top stripe */}
                <div className="h-1" style={{ background: platform.color }} />

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      {Logo ? <Logo size={36} /> : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold" style={{ backgroundColor: platform.color + '15', color: platform.color }}>
                          {platform.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-display text-base font-bold text-foreground">{platform.name}</h3>
                        <p className="text-xs text-muted-foreground">@{platform.username}</p>
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-muted-foreground transition-colors group-hover:text-accent" />
                  </div>

                  <div className="space-y-3">
                    {platform.stats.map((stat) => (
                      <div key={stat.label} className="flex items-center justify-between">
                        <span className="text-xs text-muted">{stat.label}</span>
                        <AnimatedStat value={stat.value} color={platform.color} />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Platforms;
