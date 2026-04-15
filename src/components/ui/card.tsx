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
        'rounded-xl p-6 transition-all duration-300',
        glass
          ? 'glass-card'
          : 'border border-border bg-card shadow-sm shadow-shadow',
        hover && !gradient && 'hover:border-border-hover hover:bg-card-hover hover:shadow-md hover:shadow-shadow hover:-translate-y-0.5',
        gradient && 'gradient-border hover:-translate-y-0.5',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
