'use client';

import { motion } from 'framer-motion';

/**
 * Animated developer scene — a developer at their desk with floating tech elements.
 * Pure SVG, no external images.
 */
const DeveloperScene = () => {
  return (
    <div className="relative w-full max-w-md mx-auto" aria-hidden="true">
      <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Desk */}
        <rect x="80" y="200" width="240" height="8" rx="4" fill="var(--border)" />
        <rect x="120" y="208" width="8" height="60" rx="2" fill="var(--border)" />
        <rect x="272" y="208" width="8" height="60" rx="2" fill="var(--border)" />

        {/* Monitor */}
        <rect x="130" y="120" width="140" height="80" rx="8" fill="var(--card-solid)" stroke="var(--border)" strokeWidth="2" />
        <rect x="138" y="128" width="124" height="60" rx="4" fill="var(--background)" />

        {/* Code lines on screen */}
        <motion.rect x="146" y="138" width="60" height="3" rx="1.5" fill="var(--accent)" fillOpacity="0.6"
          animate={{ width: [30, 60, 45] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.rect x="146" y="146" width="80" height="3" rx="1.5" fill="var(--gradient-2)" fillOpacity="0.4"
          animate={{ width: [50, 80, 65] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
        <motion.rect x="158" y="154" width="50" height="3" rx="1.5" fill="var(--gradient-3)" fillOpacity="0.4"
          animate={{ width: [30, 50, 40] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
        <motion.rect x="158" y="162" width="70" height="3" rx="1.5" fill="var(--accent)" fillOpacity="0.3"
          animate={{ width: [40, 70, 55] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} />
        <motion.rect x="146" y="170" width="40" height="3" rx="1.5" fill="var(--gradient-2)" fillOpacity="0.3"
          animate={{ width: [20, 40, 30] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
        <rect x="146" y="178" width="55" height="3" rx="1.5" fill="var(--accent)" fillOpacity="0.2" />

        {/* Cursor blink */}
        <motion.rect x="201" y="178" width="2" height="6" fill="var(--accent)"
          animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />

        {/* Monitor stand */}
        <rect x="190" y="200" width="20" height="4" rx="2" fill="var(--border)" />
        <rect x="196" y="196" width="8" height="4" rx="1" fill="var(--border)" />

        {/* Coffee cup */}
        <rect x="290" y="186" width="18" height="14" rx="3" fill="var(--card-solid)" stroke="var(--border)" strokeWidth="1.5" />
        <path d="M308 190c4 0 6 2 6 5s-2 5-6 5" stroke="var(--border)" strokeWidth="1.5" fill="none" />
        <motion.path d="M295 183c1-4 3-6 4-8M299 183c1-4 3-6 4-8M303 183c1-4 3-6 4-8"
          stroke="var(--muted-foreground)" strokeWidth="1" strokeLinecap="round" fillOpacity="0.3"
          animate={{ y: [0, -3, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />

        {/* Plant */}
        <rect x="88" y="188" width="16" height="12" rx="3" fill="var(--gradient-3)" fillOpacity="0.15" stroke="var(--gradient-3)" strokeWidth="1" strokeOpacity="0.3" />
        <motion.path d="M96 188c-2-8-8-12-10-12M96 188c0-10 4-14 8-14M96 188c2-6 6-8 6-10"
          stroke="var(--gradient-3)" strokeWidth="1.5" strokeLinecap="round" fillOpacity="0.5"
          animate={{ d: ['M96 188c-2-8-8-12-10-12M96 188c0-10 4-14 8-14M96 188c2-6 6-8 6-10', 'M96 188c-3-8-9-11-11-11M96 188c0-10 5-13 9-13M96 188c2-6 7-7 7-9'] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }} />
      </svg>

      {/* Floating tech icons around the scene */}
      <motion.div className="absolute top-4 right-8 text-accent/20 text-xs font-mono"
        animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        {'{ }'}
      </motion.div>
      <motion.div className="absolute top-12 left-4 text-secondary/20 text-xs font-mono"
        animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
        {'</>'}
      </motion.div>
      <motion.div className="absolute bottom-24 right-4 text-tertiary/20 text-xs font-mono"
        animate={{ y: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
        {'fn()'}
      </motion.div>
      <motion.div className="absolute top-20 right-20 text-accent/15 text-xs font-mono"
        animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}>
        {'=>'}
      </motion.div>
    </div>
  );
};

export default DeveloperScene;
