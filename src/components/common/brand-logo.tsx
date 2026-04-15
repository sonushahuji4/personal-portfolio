'use client';

/**
 * Simple, minimal brand logo.
 * Clean "S" lettermark on a subtle rounded square.
 */
const BrandLogo = ({ size = 32 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sonu Shahuji"
      role="img"
    >
      <rect width="36" height="36" rx="8" fill="var(--accent)" />
      <path
        d="M20.5 11C20.5 11 14.5 11 14.5 14.5C14.5 18 21.5 18 21.5 21.5C21.5 25 15.5 25 15.5 25"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

export default BrandLogo;
