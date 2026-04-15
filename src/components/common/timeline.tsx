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
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="relative pl-8"
    >
      {/* Dot */}
      <div className="absolute left-0 top-2 h-3 w-3 rounded-full border-2 border-accent bg-background" />
      {/* Line */}
      {!isLast && (
        <div className="absolute left-[5px] top-5 h-full w-px bg-border" />
      )}
      <div className="pb-10">{children}</div>
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
