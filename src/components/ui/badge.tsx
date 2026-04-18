import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge = ({ children, className }: BadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium bg-card-solid text-muted border border-border transition-all duration-300 hover:text-accent hover:border-accent/20',
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
