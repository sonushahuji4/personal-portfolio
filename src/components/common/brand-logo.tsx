'use client';

/**
 * Professional brand logo — Code bracket S: <S/>
 * Combines developer identity (angle brackets) with the initial.
 * Clean geometric construction on a rounded square.
 */
const BrandLogo = ({ size = 32 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sonu Shahuji"
      role="img"
    >
      {/* Background — rounded square with warm gradient */}
      <rect width="40" height="40" rx="10" fill="url(#brand-bg)" />

      {/* Opening bracket < */}
      <path
        d="M14 16L9 20L14 24"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />

      {/* The S — bold, geometric, center */}
      <path
        d="M22 12C22 12 17 12 17 15.5C17 19 23 19 23 22.5C23 26 18 26 18 26"
        stroke="white"
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Closing bracket /> */}
      <path
        d="M27 16L32 20L27 24"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />

      {/* Slash between brackets — subtle */}
      <path
        d="M25 28L29 32"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* Accent dot — like a cursor blink */}
      <circle cx="33" cy="8" r="2" fill="white" opacity="0.8" />

      <defs>
        <linearGradient id="brand-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="0.5" stopColor="#EA580C" />
          <stop offset="1" stopColor="#DC2626" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default BrandLogo;
