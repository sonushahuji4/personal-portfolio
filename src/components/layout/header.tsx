'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Code, Globe, Puzzle, Target, Medal, Dumbbell, Piano, Lightbulb } from 'lucide-react';
import { NAV_LINKS, NAV_MORE_LINKS, SECTION_IDS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ui/theme-toggle';
import BrandLogo from '@/components/common/brand-logo';
import { HOBBIES } from '@/data/hobbies';

const SECTION_ORDER = Object.values(SECTION_IDS);
const ALL_MOBILE_LINKS = [...NAV_LINKS.slice(0, -1), ...NAV_MORE_LINKS, NAV_LINKS[NAV_LINKS.length - 1]];

const HOBBY_ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  Code, Globe, Puzzle, Target, Medal, Dumbbell, Piano, Lightbulb,
};
const CATEGORY_META: Record<string, { color: string }> = {
  Tech: { color: '#06B6D4' },
  Sports: { color: '#F59E0B' },
  Music: { color: '#D946EF' },
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollPos = window.scrollY + 120;
      for (let i = SECTION_ORDER.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_ORDER[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTION_ORDER[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const [isHobbyOpen, setIsHobbyOpen] = useState(false);
  const hobbyTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleHobbyEnter = () => {
    clearTimeout(hobbyTimeout.current);
    setIsHobbyOpen(true);
  };
  const handleHobbyLeave = () => {
    hobbyTimeout.current = setTimeout(() => setIsHobbyOpen(false), 200);
  };

  const moreIsActive = NAV_MORE_LINKS.some((l) => activeSection === l.href.replace('#', ''));

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-sm shadow-shadow'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo + hobby slide-in tray */}
        <div
          className="relative flex items-center"
          onMouseEnter={handleHobbyEnter}
          onMouseLeave={handleHobbyLeave}
        >
          <a href="#hero" className="relative z-10 transition-transform hover:scale-105" aria-label="Go to top">
            <BrandLogo size={36} />
          </a>

          {/* Slide-in hobby tray */}
          <AnimatePresence>
            {isHobbyOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="hidden md:flex items-center overflow-hidden ml-3"
              >
                <div className="flex items-center gap-1.5 pl-3 border-l border-border/50">
                  {HOBBIES.map((hobby) => {
                    const Icon = HOBBY_ICON_MAP[hobby.icon];
                    const meta = CATEGORY_META[hobby.category];
                    return (
                      <motion.span
                        key={hobby.name}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="group relative flex items-center justify-center h-7 w-7 rounded-full border border-border/50 bg-card/80 backdrop-blur-sm shrink-0 cursor-default"
                        title={hobby.name}
                      >
                        {Icon && (
                          <span style={{ color: meta.color }}>
                            <Icon size={13} />
                          </span>
                        )}
                        {/* Tooltip */}
                        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap rounded-md bg-foreground text-background px-2 py-1 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">
                          {hobby.name}
                        </span>
                      </motion.span>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={cn(
                      'relative rounded-lg px-3 py-1.5 text-sm transition-all',
                      isActive ? 'text-accent font-medium' : 'text-muted hover:text-foreground hover:bg-card/50'
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-accent"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}

            {/* More dropdown */}
            <li>
              <div ref={moreRef} className="relative">
                <button
                  onClick={() => setIsMoreOpen((v) => !v)}
                  className={cn(
                    'relative flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm transition-all',
                    moreIsActive ? 'text-accent font-medium' : 'text-muted hover:text-foreground hover:bg-card/50'
                  )}
                >
                  More
                  <ChevronDown
                    size={14}
                    className={cn('transition-transform duration-200', isMoreOpen && 'rotate-180')}
                  />
                  {moreIsActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {isMoreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-border bg-background/95 backdrop-blur-xl py-1.5 shadow-lg shadow-shadow"
                    >
                      {NAV_MORE_LINKS.map((link) => {
                        const sectionId = link.href.replace('#', '');
                        const isActive = activeSection === sectionId;
                        return (
                          <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setIsMoreOpen(false)}
                            className={cn(
                              'block px-4 py-2 text-sm transition-colors',
                              isActive ? 'text-accent font-medium bg-accent-muted' : 'text-muted hover:text-foreground hover:bg-card/50'
                            )}
                          >
                            {link.label}
                          </a>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
          </ul>
          <div className="ml-4 flex items-center gap-2">
            <ThemeToggle />
            <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/resume.pdf`}
              className="flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20 active:scale-[0.98]"
              aria-label="Download Resume">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Resume
            </a>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted transition-all hover:text-foreground hover:bg-card/50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — shows all links flat */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {ALL_MOBILE_LINKS.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={cn(
                        'block rounded-lg px-4 py-3 text-sm transition-colors',
                        isActive ? 'bg-accent-muted text-accent font-medium' : 'text-muted hover:bg-card hover:text-foreground'
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
