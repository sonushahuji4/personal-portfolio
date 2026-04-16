import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes } from 'react';

const variants = {
  primary:
    'bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20 hover:shadow-accent/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]',
  secondary:
    'bg-card-solid text-foreground hover:bg-card-hover border border-border hover:border-border-hover hover:-translate-y-0.5 active:scale-[0.98]',
  outline:
    'border border-accent/30 text-accent hover:bg-accent-muted hover:border-accent/50 hover:-translate-y-0.5 active:scale-[0.98]',
  ghost:
    'text-muted hover:text-foreground hover:bg-card',
} as const;

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
}

const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  href,
  children,
  ...props
}: ButtonProps) => {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-250 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <a href={href} className={classes} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
