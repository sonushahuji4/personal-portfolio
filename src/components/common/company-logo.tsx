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

// Logo source paths
export const COMPANY_LOGO_PATHS: Record<string, string> = {
  aerem: '/logos/aerem.png',
  cimpress: '/logos/cimpress.png',
  kouchan: '/logos/nationalpen.png', // Kou-Chan doesn't have a public favicon
};

export const EDUCATION_LOGO_PATHS: Record<string, string> = {
  scaler: '/logos/scaler.png',
};

export const PLATFORM_LOGO_PATHS: Record<string, string> = {
  LeetCode: '/logos/leetcode.png',
  CodeChef: '/logos/codechef.png',
  GitHub: '/logos/github.png',
  LinkedIn: '/logos/linkedin.png',
};

export const COURSE_LOGO_PATHS: Record<string, string> = {
  'NamasteDev.com': '/logos/namastedev.png',
  Scaler: '/logos/scaler.png',
};
