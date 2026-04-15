'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import { PLATFORMS } from '@/data/platforms';
import { SECTION_IDS } from '@/lib/constants';
import CompanyLogo, { PLATFORM_LOGO_PATHS } from '@/components/common/company-logo';

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section id={SECTION_IDS.platforms} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-20" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between mb-10">
          <SectionHeading title="Online Presence" subtitle="Competitive programming & developer activity" accent="#FFA116" className="mb-0 text-left" align="left" />
          <div className="hidden sm:flex gap-2">
            <button onClick={() => scroll('left')} className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted transition-all hover:border-accent/30 hover:text-accent" aria-label="Scroll left">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll('right')} className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted transition-all hover:border-accent/30 hover:text-accent" aria-label="Scroll right">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PLATFORMS.map((platform, i) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative block min-w-70 shrink-0 snap-start rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden card-premium"
            >
              <div className="h-1" style={{ background: platform.color }} />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <CompanyLogo name={platform.name} src={PLATFORM_LOGO_PATHS[platform.name] || ''} color={platform.color} size={36} />
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platforms;
