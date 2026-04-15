'use client';

import { SITE_CONFIG } from '@/lib/constants';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 py-8">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.author}. All rights reserved.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Built with Next.js, TypeScript & Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
