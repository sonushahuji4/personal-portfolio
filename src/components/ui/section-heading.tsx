import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionHeading = ({ title, subtitle, className }: SectionHeadingProps) => {
  return (
    <div className={cn('mb-14 text-center', className)}>
      <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-linear-to-r from-accent to-secondary" />
      {subtitle && (
        <p className="mx-auto mt-5 max-w-2xl text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
