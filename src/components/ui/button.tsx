import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes } from 'react';

const variants = {
  primary:
    'bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/25 hover:shadow-accent/40',
  secondary:
    'bg-card text-foreground hover:bg-card-hover border border-border hover:border-border-hover',
  outline:
    'border border-accent/25 text-accent hover:bg-accent-muted hover:border-accent/40',
  ghost:
    'text-muted hover:text-foreground hover:bg-card',
} as const;

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-2.5 text-sm rounded-xl',
  lg: 'px-7 py-3 text-base rounded-xl',
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
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed',
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
