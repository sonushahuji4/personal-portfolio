import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card = ({ children, className, hover = true }: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card p-6',
        hover && 'transition-all duration-200 hover:border-border-hover hover:bg-card-hover',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
