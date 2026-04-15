'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Trophy, Mail, ChevronDown, ArrowRight, Download } from 'lucide-react';
import type { Easing } from 'framer-motion';
import Button from '@/components/ui/button';
import { PERSONAL, SOCIAL_LINKS } from '@/data/personal';
import { SECTION_IDS } from '@/lib/constants';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  Code, Trophy, Mail,
};

const GithubIcon = ({ size = 22 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 22 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const BRAND_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
};

const getIcon = (iconName: string) => BRAND_ICONS[iconName] || ICON_MAP[iconName];

const TITLES = ['Full Stack Engineer', 'Founding Engineer', 'Problem Solver', 'System Designer'];

const ease: Easing = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay },
  }),
};

const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((i) => (i + 1) % TITLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id={SECTION_IDS.hero}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_at_center,black_20%,transparent_65%)]" />
        {/* Primary glow */}
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-[100px]" />
        {/* Secondary glow */}
        <div className="absolute right-1/4 bottom-1/3 h-72 w-72 rounded-full bg-secondary/6 blur-[100px]" />
        {/* Floating decorative elements */}
        <div className="absolute left-[15%] top-[20%] h-2 w-2 rounded-full bg-accent/20" style={{ animation: 'float 6s ease-in-out infinite' }} />
        <div className="absolute right-[20%] top-[30%] h-1.5 w-1.5 rounded-full bg-secondary/25" style={{ animation: 'float 8s ease-in-out infinite 1s' }} />
        <div className="absolute left-[70%] bottom-[25%] h-1 w-1 rounded-full bg-accent/30" style={{ animation: 'float 7s ease-in-out infinite 2s' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-muted px-4 py-1.5 text-sm text-accent"
        >
          <span className="h-2 w-2 rounded-full bg-accent" style={{ animation: 'glow-pulse 2s ease-in-out infinite' }} />
          Available for opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="text-gradient">{PERSONAL.name}</span>
        </motion.h1>

        {/* Rotating title */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="mt-5 h-10 overflow-hidden"
        >
          <motion.p
            key={titleIndex}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-xl font-medium text-accent sm:text-2xl md:text-3xl"
          >
            {TITLES[titleIndex]}
          </motion.p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {PERSONAL.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href={`#${SECTION_IDS.projects}`} size="lg" className="group hover-glow">
            View My Work
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Button>
          <Button href={PERSONAL.resumeUrl} variant="outline" size="lg">
            <Download size={18} />
            Download Resume
          </Button>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.0}
          className="mt-14 flex items-center justify-center gap-3"
        >
          {SOCIAL_LINKS.map((link, i) => {
            const Icon = getIcon(link.icon);
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                aria-label={link.name}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all hover:border-accent/30 hover:bg-accent-muted hover:text-accent hover:-translate-y-0.5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.0 + i * 0.08 }}
              >
                {Icon && <Icon size={18} />}
              </motion.a>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href={`#${SECTION_IDS.about}`}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default Hero;
