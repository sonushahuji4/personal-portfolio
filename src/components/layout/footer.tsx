'use client';

import { SITE_CONFIG } from '@/lib/constants';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.author}
          </p>
          <p className="text-xs text-muted-foreground">
            Crafted with Next.js, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
