'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SECTION_IDS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ui/theme-toggle';
import BrandLogo from '@/components/common/brand-logo';

const SECTION_ORDER = Object.values(SECTION_IDS);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Scrollspy — find which section is in view
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
        <a href="#hero" className="transition-transform hover:scale-105" aria-label="Go to top">
          <BrandLogo size={36} />
        </a>

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
                      isActive ? 'text-accent font-medium' : 'text-muted hover:text-foreground'
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
          </ul>
          <div className="ml-4 flex items-center gap-2">
            <ThemeToggle />
            <a href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/resume.pdf`}
              className="rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20 active:scale-[0.98]">
              Resume
            </a>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted transition-colors hover:text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
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
              {NAV_LINKS.map((link) => {
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
