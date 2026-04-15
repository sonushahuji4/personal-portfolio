/**
 * Company and institution logo components.
 * Clean SVG-based logos for crisp rendering at any size.
 * Each logo uses the brand's actual colors.
 */

interface LogoProps {
  size?: number;
  className?: string;
}

// ═══════════════════════════════════════
// COMPANY LOGOS (Experience)
// ═══════════════════════════════════════

export const AeremLogo = ({ size = 40, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect width="48" height="48" rx="12" fill="#0D9488" fillOpacity="0.1" />
    <path d="M14 32L24 14L34 32H14Z" stroke="#0D9488" strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="24" cy="26" r="3" fill="#0D9488" />
    <path d="M18 32h12" stroke="#0D9488" strokeWidth="2" />
    <text x="24" y="40" textAnchor="middle" fontSize="6" fontWeight="700" fill="#0D9488" fontFamily="system-ui">AEREM</text>
  </svg>
);

export const CimpressLogo = ({ size = 40, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect width="48" height="48" rx="12" fill="#3D4F5F" fillOpacity="0.1" />
    <path d="M16 18L22 12L28 18L22 24L16 18Z" fill="#E8563A" />
    <path d="M22 24L28 18L34 24L28 30L22 24Z" fill="#3D4F5F" />
    <path d="M16 18L22 24L16 30" stroke="#3D4F5F" strokeWidth="2" strokeLinejoin="round" />
    <text x="24" y="40" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="#3D4F5F" fontFamily="system-ui">CIMPRESS</text>
  </svg>
);

export const NationalPenLogo = ({ size = 40, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect width="48" height="48" rx="12" fill="#1a1a1a" fillOpacity="0.1" />
    <circle cx="24" cy="20" r="8" stroke="#333" strokeWidth="2" />
    <circle cx="24" cy="20" r="3" fill="#333" />
    <text x="24" y="38" textAnchor="middle" fontSize="4.5" fontWeight="800" fill="#333" fontFamily="system-ui">NATIONAL PEN</text>
  </svg>
);

export const KouChanLogo = ({ size = 40, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect width="48" height="48" rx="12" fill="#DC2626" fillOpacity="0.1" />
    <circle cx="24" cy="22" r="8" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="3 2" />
    <circle cx="24" cy="22" r="3" fill="#DC2626" />
    <line x1="24" y1="14" x2="28" y2="18" stroke="#DC2626" strokeWidth="1.5" />
    <line x1="24" y1="14" x2="20" y2="18" stroke="#DC2626" strokeWidth="1.5" />
    <line x1="24" y1="30" x2="28" y2="26" stroke="#DC2626" strokeWidth="1.5" />
    <line x1="24" y1="30" x2="20" y2="26" stroke="#DC2626" strokeWidth="1.5" />
    <text x="24" y="40" textAnchor="middle" fontSize="5" fontWeight="700" fill="#DC2626" fontFamily="system-ui">KOU-CHAN</text>
  </svg>
);

// ═══════════════════════════════════════
// EDUCATION LOGOS
// ═══════════════════════════════════════

export const ScalerLogo = ({ size = 40, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect width="48" height="48" rx="12" fill="#6366F1" fillOpacity="0.1" />
    <rect x="14" y="16" width="20" height="16" rx="3" stroke="#6366F1" strokeWidth="2" />
    <path d="M19 22L23 26L29 20" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <text x="24" y="40" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="#6366F1" fontFamily="system-ui">SCALER</text>
  </svg>
);

export const DBITLogo = ({ size = 40, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect width="48" height="48" rx="12" fill="#1E3A5F" fillOpacity="0.1" />
    <rect x="14" y="14" width="20" height="6" rx="2" fill="#1E3A5F" fillOpacity="0.3" />
    <rect x="16" y="22" width="16" height="10" rx="2" stroke="#1E3A5F" strokeWidth="2" />
    <path d="M20 26h8M20 28h6" stroke="#1E3A5F" strokeWidth="1.5" strokeLinecap="round" />
    <text x="24" y="42" textAnchor="middle" fontSize="6" fontWeight="800" fill="#1E3A5F" fontFamily="system-ui">DBIT</text>
  </svg>
);

export const DonBoscoLogo = ({ size = 40, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect width="48" height="48" rx="12" fill="#0891B2" fillOpacity="0.1" />
    <path d="M18 28C18 28 20 20 24 16C28 20 30 28 30 28" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" />
    <path d="M15 30Q24 24 33 30" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" />
    <circle cx="24" cy="14" r="2" fill="#0891B2" />
    <text x="24" y="40" textAnchor="middle" fontSize="4" fontWeight="700" fill="#0891B2" fontFamily="system-ui">DON BOSCO</text>
  </svg>
);

export const StDominicLogo = ({ size = 40, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect width="48" height="48" rx="12" fill="#166534" fillOpacity="0.1" />
    <path d="M24 12L28 18H20L24 12Z" fill="#166534" />
    <circle cx="24" cy="24" r="6" stroke="#166534" strokeWidth="2" />
    <path d="M24 18v12M18 24h12" stroke="#166534" strokeWidth="1.5" />
    <text x="24" y="40" textAnchor="middle" fontSize="4" fontWeight="700" fill="#166534" fontFamily="system-ui">ST DOMINIC</text>
  </svg>
);

// ═══════════════════════════════════════
// PLATFORM LOGOS
// ═══════════════════════════════════════

export const LeetCodeLogo = ({ size = 40, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect width="48" height="48" rx="12" fill="#FFA116" fillOpacity="0.1" />
    <path d="M28 16L18 26H26L20 36" stroke="#FFA116" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CodeChefLogo = ({ size = 40, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect width="48" height="48" rx="12" fill="#5B4638" fillOpacity="0.1" />
    <path d="M20 14C20 14 18 18 18 22C18 26 22 30 24 34C26 30 30 26 30 22C30 18 28 14 28 14" stroke="#5B4638" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="24" cy="22" r="3" fill="#5B4638" fillOpacity="0.3" />
  </svg>
);

export const GitHubLogo = ({ size = 40, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect width="48" height="48" rx="12" fill="#6E40C9" fillOpacity="0.1" />
    <path d="M24 14C18.477 14 14 18.477 14 24C14 28.418 16.865 32.166 20.839 33.489C21.339 33.581 21.521 33.272 21.521 33.007C21.521 32.769 21.512 32.138 21.508 31.302C18.726 31.907 18.139 29.966 18.139 29.966C17.685 28.812 17.029 28.503 17.029 28.503C16.121 27.883 17.098 27.895 17.098 27.895C18.101 27.966 18.629 28.926 18.629 28.926C19.521 30.455 20.97 30.012 21.541 29.756C21.631 29.105 21.889 28.663 22.175 28.42C19.955 28.174 17.62 27.313 17.62 23.476C17.62 22.386 18.01 21.494 18.649 20.794C18.546 20.548 18.203 19.533 18.747 18.155C18.747 18.155 19.587 17.893 21.497 19.186C22.31 18.971 23.159 18.863 24.003 18.859C24.847 18.863 25.696 18.971 26.511 19.186C28.418 17.893 29.256 18.155 29.256 18.155C29.802 19.533 29.459 20.548 29.356 20.794C29.997 21.494 30.383 22.386 30.383 23.476C30.383 27.323 28.044 28.171 25.818 28.411C26.172 28.711 26.492 29.305 26.492 30.21C26.492 31.504 26.48 32.547 26.48 33.007C26.48 33.275 26.659 33.587 27.168 33.487C31.138 32.163 34 28.416 34 24C34 18.477 29.523 14 24 14Z" fill="#6E40C9" />
  </svg>
);

export const LinkedInLogo = ({ size = 40, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect width="48" height="48" rx="12" fill="#0A66C2" fillOpacity="0.1" />
    <path d="M18 20H21V32H18V20Z" fill="#0A66C2" />
    <circle cx="19.5" cy="16.5" r="2" fill="#0A66C2" />
    <path d="M24 20H27V21.5C27.5 20.8 28.8 19.5 31 19.5C33.5 19.5 35 21 35 24.5V32H32V25C32 23 31 22 29.5 22C28 22 27 23 27 25V32H24V20Z" fill="#0A66C2" />
  </svg>
);

// ═══════════════════════════════════════
// COURSE LOGOS
// ═══════════════════════════════════════

export const NamasteDevLogo = ({ size = 40, className }: LogoProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <rect width="48" height="48" rx="12" fill="#FF6B35" fillOpacity="0.1" />
    <text x="24" y="22" textAnchor="middle" fontSize="18" fill="#FF6B35" fontFamily="system-ui">🙏</text>
    <text x="24" y="38" textAnchor="middle" fontSize="5" fontWeight="700" fill="#FF6B35" fontFamily="system-ui">NAMASTE</text>
  </svg>
);

// ═══════════════════════════════════════
// LOGO MAP (for dynamic lookups)
// ═══════════════════════════════════════

export const COMPANY_LOGOS: Record<string, React.ComponentType<LogoProps>> = {
  aerem: AeremLogo,
  cimpress: CimpressLogo,
  kouchan: KouChanLogo,
};

export const EDUCATION_LOGOS: Record<string, React.ComponentType<LogoProps>> = {
  scaler: ScalerLogo,
  dbit: DBITLogo,
  hsc: DonBoscoLogo,
  ssc: StDominicLogo,
};

export const PLATFORM_LOGOS: Record<string, React.ComponentType<LogoProps>> = {
  LeetCode: LeetCodeLogo,
  CodeChef: CodeChefLogo,
  GitHub: GitHubLogo,
  LinkedIn: LinkedInLogo,
};

export const COURSE_LOGOS: Record<string, React.ComponentType<LogoProps>> = {
  'NamasteDev.com': NamasteDevLogo,
  'Scaler': ScalerLogo,
};
