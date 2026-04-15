import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge = ({ children, className }: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium bg-accent-muted text-accent border border-accent/15 transition-colors hover:border-accent/30',
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
