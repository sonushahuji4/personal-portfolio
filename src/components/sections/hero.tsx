'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Trophy, Mail, ChevronDown, ArrowRight, Download, Sparkles } from 'lucide-react';
import type { Easing } from 'framer-motion';
import Button from '@/components/ui/button';
import { PERSONAL, SOCIAL_LINKS } from '@/data/personal';
import { SECTION_IDS } from '@/lib/constants';
import CodeRain from '@/components/common/code-rain';
import DeveloperScene from '@/components/common/developer-scene';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = { Code, Trophy, Mail };

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const BRAND_ICONS: Record<string, React.ComponentType<{ size?: number }>> = { Github: GithubIcon, Linkedin: LinkedinIcon };
const getIcon = (iconName: string) => BRAND_ICONS[iconName] || ICON_MAP[iconName];

const TITLES = ['Full Stack Engineer', 'Founding Engineer', 'Problem Solver', 'System Designer'];

const ease: Easing = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease, delay },
  }),
};

const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTitleIndex((i) => (i + 1) % TITLES.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id={SECTION_IDS.hero} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Code Rain Canvas Background */}
      <CodeRain />

      {/* Gradient mesh blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-[var(--gradient-1)] opacity-[0.06] blur-[120px] mesh-gradient" />
        <div className="absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full bg-[var(--gradient-2)] opacity-[0.04] blur-[120px] mesh-gradient" style={{ animationDelay: '-5s' }} />
        <div className="absolute left-1/3 -bottom-32 h-[350px] w-[350px] rounded-full bg-[var(--gradient-3)] opacity-[0.03] blur-[100px] mesh-gradient" style={{ animationDelay: '-10s' }} />
      </div>

      {/* Noise texture */}
      <div className="pointer-events-none absolute inset-0 noise-overlay" aria-hidden="true" />

      {/* Content — split layout on large screens */}
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-8 px-6 lg:grid-cols-[1.2fr_1fr]">
        {/* Left: Text content */}
        <div className="text-center lg:text-left">
          {/* Status badge */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="lg:justify-start flex justify-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-muted px-4 py-1.5 text-sm text-accent backdrop-blur-sm">
              <Sparkles size={14} />
              <span>Available for opportunities</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400" style={{ animation: 'glow-pulse 2s ease-in-out infinite' }} />
            </div>
          </motion.div>

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.15}
            className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="text-gradient">{PERSONAL.name}</span>
          </motion.h1>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.3}
            className="mt-4 h-10 overflow-hidden sm:mt-5 sm:h-12">
            <motion.p
              key={titleIndex}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease }}
              className="font-display text-xl font-medium text-muted sm:text-2xl md:text-3xl">
              {TITLES[titleIndex]}
            </motion.p>
          </motion.div>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.45}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            {PERSONAL.tagline}
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.6}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <Button href={`#${SECTION_IDS.projects}`} size="lg" className="group hover-glow">
              View My Work
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Button>
            <Button href={PERSONAL.resumeUrl} variant="outline" size="lg">
              <Download size={18} />
              Resume
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.75}
            className="mt-12 flex items-center justify-center gap-2 lg:justify-start">
            {SOCIAL_LINKS.map((link, i) => {
              const Icon = getIcon(link.icon);
              return (
                <motion.a
                  key={link.name} href={link.url}
                  target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={link.name}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:bg-accent-muted hover:text-accent hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.06 }}>
                  {Icon && <Icon size={18} />}
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        {/* Right: Developer scene illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease, delay: 0.5 }}
          className="hidden lg:block">
          <DeveloperScene />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href={`#${SECTION_IDS.about}`}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 transition-colors hover:text-accent"
        aria-label="Scroll down"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }}>
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default Hero;
