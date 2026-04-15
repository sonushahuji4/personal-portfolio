'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TimelineItemProps {
  children: React.ReactNode;
  isLast?: boolean;
}

const TimelineItem = ({ children, isLast = false }: TimelineItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative pl-10"
    >
      {/* Glowing dot */}
      <div className="absolute left-0 top-2 z-10 flex h-5 w-5 items-center justify-center">
        <div className="h-3 w-3 rounded-full bg-accent shadow-[0_0_8px_var(--accent-glow)]" style={{ animation: 'glow-pulse 3s ease-in-out infinite' }} />
        <div className="absolute h-5 w-5 rounded-full border-2 border-accent/30" />
      </div>
      {/* Gradient line */}
      {!isLast && (
        <div className="absolute left-2.25 top-7 h-full w-0.5 bg-linear-to-b from-accent/40 via-accent/20 to-transparent" />
      )}
      <div className="pb-12">{children}</div>
    </motion.div>
  );
};

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

const Timeline = ({ children, className }: TimelineProps) => {
  return (
    <div className={cn('relative', className)}>
      {children}
    </div>
  );
};

Timeline.Item = TimelineItem;

export default Timeline;
