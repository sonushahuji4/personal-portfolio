import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  gradient?: boolean;
}

const Card = ({ children, className, hover = true, glass = false, gradient = false }: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-2xl p-6',
        glass
          ? 'glass-card'
          : 'border border-border bg-card shadow-sm shadow-shadow',
        hover && 'card-premium',
        gradient && 'gradient-border',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
