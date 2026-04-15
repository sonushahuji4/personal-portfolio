'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'center' | 'left';
  accent?: string;
}

const SectionHeading = ({ title, subtitle, className, align = 'center', accent }: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'mb-14',
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      <div
        className={cn(
          'mt-3 h-1 w-16 rounded-full',
          align === 'center' ? 'mx-auto' : '',
        )}
        style={{ background: accent || 'linear-gradient(to right, var(--gradient-1), var(--gradient-2))' }}
      />
      {subtitle && (
        <p className={cn(
          'mt-4 max-w-2xl text-[15px] text-muted',
          align === 'center' ? 'mx-auto' : '',
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
