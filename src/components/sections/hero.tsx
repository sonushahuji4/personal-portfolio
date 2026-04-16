'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, ChevronDown, Code, Trophy, Mail, Briefcase } from 'lucide-react';
import type { Easing } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/button';
import { PERSONAL, SOCIAL_LINKS } from '@/data/personal';
import { SECTION_IDS } from '@/lib/constants';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

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

const COMPANIES = [
  { name: 'Aerem Solutions', logo: `${basePath}/logos/aerem.avif` },
  { name: 'Cimpress India', logo: `${basePath}/logos/cimpress.png` },
  { name: 'Kou-Chan', logo: `${basePath}/logos/kouchan.jpeg` },
];

const ease: Easing = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease, delay },
  }),
};

const Hero = () => {
  return (
    <section id={SECTION_IDS.hero} className="relative min-h-screen overflow-hidden bg-background">
      {/* Photo — right 50% */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 top-0 h-full w-[85%] sm:w-[50%]">
          <Image
            src={`${basePath}/images/profile.png`}
            alt="Sonu Shahuji"
            fill
            className="object-cover object-top"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-linear-to-r from-background from-10% via-background/70 via-40% to-transparent to-80%" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />
          <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-background/50 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
          <div className="max-w-xl">
            {/* Intro */}
            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0}
              className="mb-4 text-sm font-medium tracking-[0.2em] uppercase text-accent">
              Hello, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
              className="font-display text-4xl font-extrabold tracking-[-0.04em] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              {PERSONAL.name.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.03, ease }}
                  className="inline-block"
                  style={{ marginRight: char === ' ' ? '0.25em' : undefined }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h1>

            {/* Title */}
            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.5}
              className="mt-3 text-lg font-medium text-muted sm:text-xl">
              {PERSONAL.title}
            </motion.p>

            {/* Badge */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.6}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-muted px-4 py-1.5 text-sm font-semibold text-accent backdrop-blur-sm">
              <Briefcase size={14} />
              Founding Engineer · 500+ Solar Plants · 2M+ IoT Events/Day
            </motion.div>

            {/* Tagline */}
            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.7}
              className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              Building scalable products from zero to one. 6+ years across solar fintech, e-commerce, and real-time systems.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.85}
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

            {/* Social links */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1.0}
              className="mt-8 flex items-center gap-2">
              <span className="h-px w-8 bg-border" />
              {SOCIAL_LINKS.map((link) => {
                const Icon = ICON_MAP[link.icon];
                return (
                  <a key={link.name} href={link.url}
                    target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                    rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    aria-label={link.name}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:text-accent hover:-translate-y-0.5 hover:bg-accent-muted">
                    {Icon && <Icon size={16} />}
                  </a>
                );
              })}
            </motion.div>

            {/* Worked with — all 3 inline, aligned with content */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1.15}
              className="mt-10">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                Worked with
              </p>
              <div className="flex items-center gap-4 sm:gap-6">
                {COMPANIES.map((company, i) => (
                  <motion.div
                    key={company.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
                    className="flex items-center gap-2 rounded-xl border border-border bg-card/50 px-3 py-2 backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:bg-card"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white">
                      <Image src={company.logo} alt={company.name} width={22} height={22} className="object-contain" unoptimized />
                    </div>
                    <span className="hidden text-xs font-medium text-foreground sm:block">{company.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href={`#${SECTION_IDS.about}`}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/50 transition-colors hover:text-accent"
        aria-label="Scroll down"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }}>
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default Hero;
