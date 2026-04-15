'use client';

/**
 * Brand name — clean "Sonu S." text mark.
 */
const BrandLogo = ({ size = 32 }: { size?: number }) => {
  const fontSize = size * 0.5;
  return (
    <span
      className="font-display font-bold text-foreground tracking-tight"
      style={{ fontSize }}
    >
      Sonu S.
    </span>
  );
};

export default BrandLogo;
