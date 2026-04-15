import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionHeading = ({ title, subtitle, className }: SectionHeadingProps) => {
  return (
    <div className={cn('mb-12 text-center', className)}>
      <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-accent" />
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
