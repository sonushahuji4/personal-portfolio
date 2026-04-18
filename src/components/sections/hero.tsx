'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { Easing } from 'framer-motion';
import Image from 'next/image';
import { PERSONAL } from '@/data/personal';
import { SECTION_IDS } from '@/lib/constants';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

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

      {/* Content — clean and simple */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
          <div className="max-w-xl">
            {/* Intro */}
            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0}
              className="mb-4 text-sm font-medium tracking-[0.2em] uppercase text-accent">
              Hello, I&apos;m
            </motion.p>

            {/* Name — letter by letter */}
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

            {/* Tagline — simple, one line */}
            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.6}
              className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              Building scalable products from zero to one. 6+ years across solar fintech, e-commerce, and real-time systems.
            </motion.p>

            {/* Worked with */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.8}
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
                    transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
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
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default Hero;
