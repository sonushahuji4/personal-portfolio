'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Trophy } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import { PLATFORMS } from '@/data/platforms';
import { SECTION_IDS } from '@/lib/constants';
import CompanyLogo, { PLATFORM_LOGO_PATHS } from '@/components/common/company-logo';

const AnimatedNumber = ({ value, color }: { value: string; color: string }) => {
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
        }, 900 / steps);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [numericPart]);

  return <span ref={ref} className="tabular-nums" style={{ color }}>{display}{suffix}</span>;
};

const leetcode = PLATFORMS[0];
const github = PLATFORMS[1];
const codechef = PLATFORMS[2];
const linkedin = PLATFORMS[3];

const Platforms = () => {
  return (
    <section id={SECTION_IDS.platforms} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-15" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading title="Online Presence" subtitle="Where I build, compete, and connect" accent="#FFA116" />

        {/* Bento Grid — unequal sizes */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto">

          {/* ═══ LEETCODE — Hero card (spans 2 rows on lg) ═══ */}
          <motion.a
            href={leetcode.url} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative lg:row-span-2 rounded-2xl border border-[#FFA116]/20 bg-card/80 backdrop-blur-sm overflow-hidden card-premium"
          >
            {/* Glow border */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: 'inset 0 0 30px rgba(255, 161, 22, 0.08)' }} />
            <div className="h-1 bg-[#FFA116]" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <CompanyLogo name="LeetCode" src={PLATFORM_LOGO_PATHS.LeetCode || ''} color="#FFA116" size={36} />
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground">LeetCode</h3>
                    <p className="text-xs text-muted-foreground">@{leetcode.username}</p>
                  </div>
                </div>
                <ExternalLink size={14} className="text-muted-foreground group-hover:text-[#FFA116] transition-colors" />
              </div>

              {/* Hero stat — Rating */}
              <div className="mb-6 text-center">
                <div className="text-5xl font-extrabold font-display">
                  <AnimatedNumber value="2,059" color="#FFA116" />
                </div>
                <div className="mt-1 flex items-center justify-center gap-2">
                  <Trophy size={14} className="text-[#FFA116]" />
                  <span className="text-sm font-semibold text-[#FFA116]">Knight Rank</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Top 1.9% Worldwide</p>
              </div>

              {/* Progress bar — problems solved */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Algorithms Mastered</span>
                  <span className="font-bold text-foreground">624</span>
                </div>
                <div className="h-2 rounded-full bg-border overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '62%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full rounded-full bg-[#FFA116]"
                  />
                </div>
              </div>

              {/* Contests */}
              <div className="flex justify-between text-sm border-t border-border pt-3">
                <span className="text-muted-foreground">Contests</span>
                <span className="font-bold text-foreground">25</span>
              </div>
            </div>
          </motion.a>

          {/* ═══ GITHUB — Medium card ═══ */}
          <motion.a
            href={github.url} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden card-premium"
          >
            <div className="h-1 bg-[#6E40C9]" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <CompanyLogo name="GitHub" src={PLATFORM_LOGO_PATHS.GitHub || ''} color="#6E40C9" size={36} />
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground">GitHub</h3>
                    <p className="text-xs text-muted-foreground">@{github.username}</p>
                  </div>
                </div>
                <ExternalLink size={14} className="text-muted-foreground group-hover:text-[#6E40C9] transition-colors" />
              </div>

              {/* Main stat */}
              <div className="text-3xl font-extrabold font-display mb-1">
                <AnimatedNumber value="1,200" color="#6E40C9" /><span className="text-lg text-[#6E40C9]">+</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Contributions</p>

              {/* Sub stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-background/50 p-3 text-center">
                  <div className="text-lg font-bold text-foreground">31</div>
                  <div className="text-[10px] text-muted-foreground">Repositories</div>
                </div>
                <div className="rounded-xl bg-background/50 p-3 text-center">
                  <div className="text-lg font-bold text-foreground">6</div>
                  <div className="text-[10px] text-muted-foreground">Pinned</div>
                </div>
              </div>
            </div>
          </motion.a>

          {/* ═══ CODECHEF — Small card ═══ */}
          <motion.a
            href={codechef.url} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden card-premium"
          >
            <div className="h-1 bg-[#5B4638]" />
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CompanyLogo name="CodeChef" src={PLATFORM_LOGO_PATHS.CodeChef || ''} color="#5B4638" size={32} />
                  <h3 className="font-display text-sm font-bold text-foreground">CodeChef</h3>
                </div>
                <ExternalLink size={13} className="text-muted-foreground group-hover:text-[#5B4638] transition-colors" />
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-extrabold text-foreground">1,591</span>
                <span className="text-xs text-muted-foreground">Highest Rating</span>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                <span><strong className="text-foreground">42</strong> Contests</span>
                <span><strong className="text-foreground">321</strong> Solved</span>
              </div>
            </div>
          </motion.a>

          {/* ═══ LINKEDIN — Small card ═══ */}
          <motion.a
            href={linkedin.url} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden card-premium sm:col-span-2 lg:col-span-1"
          >
            <div className="h-1 bg-[#0A66C2]" />
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CompanyLogo name="LinkedIn" src={PLATFORM_LOGO_PATHS.LinkedIn || ''} color="#0A66C2" size={32} />
                  <h3 className="font-display text-sm font-bold text-foreground">LinkedIn</h3>
                </div>
                <ExternalLink size={13} className="text-muted-foreground group-hover:text-[#0A66C2] transition-colors" />
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-extrabold text-foreground">500+</span>
                <span className="text-xs text-muted-foreground">Connections</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Open to collaborations & opportunities</p>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Platforms;
