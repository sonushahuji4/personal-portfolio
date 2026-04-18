'use client';

import { ArrowUp } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import BrandLogo from '@/components/common/brand-logo';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30 py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Left: brand */}
          <div>
            <BrandLogo size={28} />
            <p className="mt-1 text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} {SITE_CONFIG.author}
            </p>
          </div>

          {/* Center: built with */}
          <p className="text-xs text-muted-foreground">
            Crafted with Next.js, TypeScript & Tailwind CSS
          </p>

          {/* Right: back to top */}
          <a
            href="#hero"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all hover:border-accent/30 hover:bg-accent-muted hover:text-accent hover:-translate-y-0.5"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
