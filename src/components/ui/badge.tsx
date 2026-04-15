import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge = ({ children, className }: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-accent-muted text-accent border border-accent/20',
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
