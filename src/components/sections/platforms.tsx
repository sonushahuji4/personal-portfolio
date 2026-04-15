'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import Card from '@/components/ui/card';
import { PLATFORMS } from '@/data/platforms';
import { SECTION_IDS } from '@/lib/constants';

const AnimatedStat = ({ value }: { value: string }) => {
  const numericPart = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const suffix = value.replace(/[0-9,]/g, '');
  const [display, setDisplay] = useState('0');
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
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
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, numericPart, started]);

  return <span ref={ref} className="tabular-nums font-semibold text-foreground">{display}{suffix}</span>;
};

const Platforms = () => {
  return (
    <section id={SECTION_IDS.platforms} className="section-alt py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Online Platforms"
          subtitle="Competitive programming profiles and developer presence"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORMS.map((platform, i) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card gradient className="h-full">
                <div className="mb-1 flex items-center justify-between">
                  <h3
                    className="font-display text-lg font-bold"
                    style={{ color: platform.color }}
                  >
                    {platform.name}
                  </h3>
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${platform.name} profile`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-all hover:bg-accent-muted hover:text-accent"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
                <p className="mb-4 text-xs text-muted-foreground">@{platform.username}</p>
                <div className="space-y-3">
                  {platform.stats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="text-xs text-muted">{stat.label}</span>
                      <AnimatedStat value={stat.value} />
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platforms;
