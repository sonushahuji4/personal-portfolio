import { SITE_CONFIG } from '@/lib/constants';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.author}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
