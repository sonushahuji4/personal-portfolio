'use client';

/**
 * Professional SS monogram — warm amber gradient on deep navy.
 */
const BrandLogo = ({ size = 32 }: { size?: number }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Sonu Shahuji" role="img">
      <rect width="40" height="40" rx="10" fill="url(#brand-grad)" />
      <path
        d="M13 14c0-2 2-3.5 4.5-3.5s4.5 1.5 4.5 3.5-2 3-4.5 4-4.5 2-4.5 4 2 3.5 4.5 3.5 4.5-1.5 4.5-3.5"
        stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path
        d="M18 14c0-2 2-3.5 4.5-3.5S27 12 27 14s-2 3-4.5 4-4.5 2-4.5 4 2 3.5 4.5 3.5S27 24 27 22"
        stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <circle cx="31" cy="30" r="1.5" fill="white" opacity="0.7" />
      <defs>
        <linearGradient id="brand-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="1" stopColor="#EF4444" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default BrandLogo;
