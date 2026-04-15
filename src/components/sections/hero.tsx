'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, ChevronDown, Code, Trophy, Mail } from 'lucide-react';
import type { Easing } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/button';
import { PERSONAL, SOCIAL_LINKS } from '@/data/personal';
import { SECTION_IDS } from '@/lib/constants';

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  Github: GithubIcon, Linkedin: LinkedinIcon, Code, Trophy, Mail,
};

const ease: Easing = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease, delay },
  }),
};

const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTitleIndex((i) => (i + 1) % PERSONAL.titles.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id={SECTION_IDS.hero} className="relative min-h-screen overflow-hidden">
      {/* Photo — right 50%, blending into background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 top-0 h-full w-[85%] sm:w-[50%]">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/profile.png`}
            alt="Sonu Shahuji"
            fill
            className="object-cover object-top"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
          <div className="max-w-lg">
            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0}
              className="mb-4 text-sm font-medium tracking-[0.2em] uppercase text-accent">
              Hello, I&apos;m
            </motion.p>

            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
              className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {PERSONAL.name}
            </motion.h1>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
              className="mt-3 h-px w-20 bg-accent/60" />

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.25}
              className="mt-4 h-8 overflow-hidden sm:h-10">
              <motion.p
                key={titleIndex}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease }}
                className="text-lg font-medium text-white/70 sm:text-xl">
                {PERSONAL.titles[titleIndex]}
              </motion.p>
            </motion.div>

            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.4}
              className="mt-5 max-w-md text-sm leading-relaxed text-white/50 sm:text-[15px]">
              {PERSONAL.tagline}
            </motion.p>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.55}
              className="mt-8 flex flex-wrap gap-3">
              <Button href={`#${SECTION_IDS.projects}`} size="lg" className="group hover-glow">
                View My Work
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href={PERSONAL.resumeUrl} variant="outline" size="lg">
                <Download size={16} />
                Resume
              </Button>
            </motion.div>

            {/* Social links — from data */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.7}
              className="mt-10 flex items-center gap-2">
              <span className="h-px w-8 bg-white/20" />
              {SOCIAL_LINKS.map((link) => {
                const Icon = ICON_MAP[link.icon];
                return (
                  <a
                    key={link.name} href={link.url}
                    target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                    rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    aria-label={link.name}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/50 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:text-white hover:-translate-y-0.5"
                  >
                    {Icon && <Icon size={16} />}
                  </a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href={`#${SECTION_IDS.about}`}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 transition-colors hover:text-accent"
        aria-label="Scroll down"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default Hero;
