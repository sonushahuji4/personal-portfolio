/**
 * Tech stack icons — clean SVG representations matching real brand colors.
 * Each icon is 40x40 with consistent styling.
 */

interface IconProps {
  size?: number;
}

// ═══════════════ LANGUAGES ═══════════════

export const JavaScriptIcon = ({ size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="#F7DF1E" />
    <text x="20" y="28" textAnchor="middle" fontSize="18" fontWeight="900" fontFamily="monospace" fill="#323330">JS</text>
  </svg>
);

export const TypeScriptIcon = ({ size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="#3178C6" />
    <text x="20" y="28" textAnchor="middle" fontSize="18" fontWeight="900" fontFamily="monospace" fill="#fff">TS</text>
  </svg>
);

export const PythonIcon = ({ size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="#3776AB" fillOpacity="0.1" />
    <text x="20" y="27" textAnchor="middle" fontSize="14" fontWeight="700" fontFamily="monospace" fill="#3776AB">Py</text>
  </svg>
);

export const HTMLIcon = ({ size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="#E34F26" fillOpacity="0.1" />
    <path d="M12 8l2 22 6 3 6-3 2-22H12zm4.5 9h7l-.3 3H17l.2 3h5.5l-.4 5-2.3 1-2.3-1-.2-2h-2.8l.3 4.5L20 32l5-1.5.7-8H16.2l-.2-3h10l.2-2.5H16.3L16.5 17z" fill="#E34F26" />
  </svg>
);

export const CSSIcon = ({ size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="#1572B6" fillOpacity="0.1" />
    <text x="20" y="28" textAnchor="middle" fontSize="13" fontWeight="800" fontFamily="system-ui" fill="#1572B6">CSS</text>
  </svg>
);

// ═══════════════ FRONTEND ═══════════════

export const ReactIcon = ({ size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="#61DAFB" fillOpacity="0.1" />
    <circle cx="20" cy="20" r="3" fill="#61DAFB" />
    <ellipse cx="20" cy="20" rx="11" ry="4.5" stroke="#61DAFB" strokeWidth="1" fill="none" />
    <ellipse cx="20" cy="20" rx="11" ry="4.5" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(60 20 20)" />
    <ellipse cx="20" cy="20" rx="11" ry="4.5" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(-60 20 20)" />
  </svg>
);

export const NextJSIcon = ({ size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="var(--foreground)" fillOpacity="0.05" />
    <circle cx="20" cy="20" r="10" fill="var(--foreground)" />
    <path d="M16 14l10 13" stroke="var(--background)" strokeWidth="2" strokeLinecap="round" />
    <path d="M24 14v12" stroke="var(--background)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const AngularIcon = ({ size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="#DD0031" fillOpacity="0.1" />
    <path d="M20 8L8 13l2 16L20 34l10-5 2-16L20 8z" fill="#DD0031" fillOpacity="0.15" stroke="#DD0031" strokeWidth="1" />
    <text x="20" y="24" textAnchor="middle" fontSize="10" fontWeight="800" fill="#DD0031">NG</text>
  </svg>
);

export const ReduxIcon = ({ size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="#764ABC" fillOpacity="0.1" />
    <text x="20" y="25" textAnchor="middle" fontSize="8" fontWeight="700" fill="#764ABC">Redux</text>
  </svg>
);

// ═══════════════ BACKEND ═══════════════

export const NodeJSIcon = ({ size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="#339933" fillOpacity="0.1" />
    <path d="M20 10l8.66 5v10L20 30l-8.66-5V15L20 10z" stroke="#339933" strokeWidth="1.5" fill="#339933" fillOpacity="0.1" />
    <text x="20" y="23" textAnchor="middle" fontSize="7" fontWeight="700" fill="#339933">Node</text>
  </svg>
);

export const ExpressIcon = ({ size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="var(--foreground)" fillOpacity="0.05" />
    <text x="20" y="24" textAnchor="middle" fontSize="8" fontWeight="600" fontStyle="italic" fill="var(--muted)">express</text>
  </svg>
);

// ═══════════════ DATABASE ═══════════════

export const PostgreSQLIcon = ({ size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="#336791" fillOpacity="0.1" />
    <ellipse cx="20" cy="16" rx="8" ry="4" stroke="#336791" strokeWidth="1.5" fill="none" />
    <path d="M12 16v8c0 2.2 3.6 4 8 4s8-1.8 8-4v-8" stroke="#336791" strokeWidth="1.5" fill="none" />
    <path d="M12 21c0 2.2 3.6 4 8 4s8-1.8 8-4" stroke="#336791" strokeWidth="1" fill="none" />
  </svg>
);

export const RedisIcon = ({ size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="#DC382D" fillOpacity="0.1" />
    <path d="M13 22l7 4 7-4V17l-7-4-7 4v5z" stroke="#DC382D" strokeWidth="1.5" fill="#DC382D" fillOpacity="0.1" />
    <text x="20" y="23" textAnchor="middle" fontSize="6" fontWeight="700" fill="#DC382D">Redis</text>
  </svg>
);

export const MySQLIcon = ({ size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="#4479A1" fillOpacity="0.1" />
    <text x="20" y="24" textAnchor="middle" fontSize="8" fontWeight="700" fill="#4479A1">SQL</text>
  </svg>
);

// ═══════════════ CLOUD ═══════════════

export const AWSIcon = ({ size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="#FF9900" fillOpacity="0.1" />
    <text x="20" y="24" textAnchor="middle" fontSize="10" fontWeight="800" fill="#FF9900">AWS</text>
    <path d="M11 27c3 1.5 6 2 9 2s6-.5 9-2" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

export const GitIcon = ({ size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="#F05032" fillOpacity="0.1" />
    <circle cx="16" cy="16" r="2" fill="#F05032" />
    <circle cx="24" cy="24" r="2" fill="#F05032" />
    <circle cx="24" cy="16" r="2" fill="#F05032" />
    <path d="M16 16h6M24 16v8" stroke="#F05032" strokeWidth="1.5" />
  </svg>
);

export const DockerIcon = ({ size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="#2496ED" fillOpacity="0.1" />
    <rect x="11" y="19" width="18" height="10" rx="2" stroke="#2496ED" strokeWidth="1.5" fill="none" />
    <rect x="14" y="21" width="3" height="3" fill="#2496ED" fillOpacity="0.3" />
    <rect x="18.5" y="21" width="3" height="3" fill="#2496ED" fillOpacity="0.3" />
    <rect x="23" y="21" width="3" height="3" fill="#2496ED" fillOpacity="0.3" />
    <path d="M14 19v-3h3v3" stroke="#2496ED" strokeWidth="1" />
    <path d="M18.5 19v-3h3v3" stroke="#2496ED" strokeWidth="1" />
  </svg>
);

export const WebSocketIcon = ({ size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="#6366f1" fillOpacity="0.1" />
    <path d="M12 25l5-5 3 3 8-8" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="28" cy="15" r="2" fill="#6366f1" />
  </svg>
);

export const RESTIcon = ({ size = 40 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="#14b8a6" fillOpacity="0.1" />
    <text x="20" y="23" textAnchor="middle" fontSize="8" fontWeight="700" fill="#14b8a6">API</text>
    <path d="M12 28h16" stroke="#14b8a6" strokeWidth="1" strokeDasharray="2 2" />
  </svg>
);

// ═══════════════ ICON MAP ═══════════════

export const TECH_ICON_MAP: Record<string, React.ComponentType<IconProps>> = {
  'JavaScript (ES6+)': JavaScriptIcon,
  'TypeScript': TypeScriptIcon,
  'React.js': ReactIcon,
  'Next.js': NextJSIcon,
  'Angular': AngularIcon,
  'Redux': ReduxIcon,
  'HTML5': HTMLIcon,
  'CSS3': CSSIcon,
  'Node.js': NodeJSIcon,
  'Express.js': ExpressIcon,
  'Python': PythonIcon,
  'PostgreSQL': PostgreSQLIcon,
  'MySQL': MySQLIcon,
  'Redis': RedisIcon,
  'AWS (Lambda, SQS, SNS, S3, CloudFront)': AWSIcon,
  'AWS Lambda': AWSIcon,
  'Git': GitIcon,
  'GitHub Actions': GitIcon,
  'WebSockets': WebSocketIcon,
  'REST APIs': RESTIcon,
  'Microservices': DockerIcon,
  'Serverless Framework': AWSIcon,
};
