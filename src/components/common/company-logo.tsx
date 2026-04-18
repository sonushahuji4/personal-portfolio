'use client';

/**
 * Renders a real company logo from downloaded favicon images.
 * Falls back to a styled initial letter if image fails to load.
 */
import { useState } from 'react';
import Image from 'next/image';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

interface CompanyLogoProps {
  name: string;
  src: string;
  color: string;
  size?: number;
}

const CompanyLogo = ({ name, src, color, size = 44 }: CompanyLogoProps) => {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div
        className="flex items-center justify-center rounded-xl text-sm font-bold"
        style={{ width: size, height: size, backgroundColor: color + '15', color }}
      >
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-xl overflow-hidden border border-border bg-white"
      style={{ width: size, height: size }}
    >
      <Image
        src={`${basePath}${src}`}
        alt={`${name} logo`}
        width={size - 8}
        height={size - 8}
        className="object-contain"
        onError={() => setImgError(true)}
        unoptimized
      />
    </div>
  );
};

export default CompanyLogo;

// Logo source paths — real company logos
export const COMPANY_LOGO_PATHS: Record<string, string> = {
  aerem: '/logos/aerem.avif',
  cimpress: '/logos/cimpress.png',
  kouchan: '/logos/kouchan.jpeg',
};
