'use client';

import React from 'react';
import Image from 'next/image';
import type { EducationEntry } from '@/types';
import CompanyLogo, { EDUCATION_LOGO_PATHS } from '@/components/common/company-logo';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const EDU_COLORS = ['#8B4513', '#2E5A3A', '#1E4A6E', '#5B3A8C'];

function toRoman(num: number): string {
  const numerals: [number, string][] = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let result = '';
  for (const [value, numeral] of numerals) {
    while (num >= value) { result += numeral; num -= value; }
  }
  return result;
}

const INDEX_ENTRIES = [
  { id: 'ssc', shortName: 'St. Dominic Savio', shortDegree: 'SSC', years: '2006–2014', pageNumber: 2 },
  { id: 'hsc', shortName: 'Don Bosco Lonavala', shortDegree: 'HSC Science', years: '2014–2016', pageNumber: 3 },
  { id: 'dbit', shortName: 'DBIT Mumbai', shortDegree: 'B.E. Computer Science', years: '2016–2020', pageNumber: 4 },
  { id: 'scaler', shortName: 'Scaler Academy', shortDegree: 'DSA & System Design', years: '2023–2025', pageNumber: 5 },
];

const pageStyle: React.CSSProperties = {
  padding: '24px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Georgia, "Times New Roman", serif',
  color: '#2a2520',
  background: 'linear-gradient(170deg, #f0ead8, #f5f0e6, #ede5d0)',
  overflow: 'hidden',
};

// ═══ FRONT COVER ═══
export const CoverPage = React.forwardRef<HTMLDivElement, { style?: React.CSSProperties }>(
  function CoverPage(props, ref) {
    return (
      <div ref={ref} data-density="hard" style={{ ...props.style, position: 'relative', overflow: 'hidden', background: 'linear-gradient(145deg, #2a1a0e, #3d2818, #1e1008, #2a1a0e)' }}>
        <Image src={`${basePath}/images/graduation-photo.png`} alt="Graduation" fill className="object-cover" style={{ objectPosition: '50% 15%' }} unoptimized />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,15,8,0.1), transparent 40%, transparent 55%, rgba(26,15,8,0.75) 85%, rgba(26,15,8,0.95))' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,15,8,0.25), transparent 20%, transparent 80%, rgba(26,15,8,0.15))' }} />
        <div style={{ position: 'absolute', inset: '10px', border: '1px solid rgba(212,175,55,0.15)', pointerEvents: 'none', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, marginTop: 'auto', padding: '0 20px 20px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(212,175,55,0.2)' }} />
            <span style={{ fontSize: '12px', fontFamily: 'Georgia, serif', fontStyle: 'italic', background: 'linear-gradient(135deg, #c9a84c, #f5e7a3, #d4af37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              A Journey of Learning
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(212,175,55,0.2)' }} />
          </div>
          <p style={{ fontSize: '8px', color: 'rgba(212,175,55,0.25)', letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: '12px' }}>
            Flip to read →
          </p>
        </div>
      </div>
    );
  }
);

// ═══ CONTENTS / INDEX PAGE ═══
export const IndexPage = React.forwardRef<HTMLDivElement, {
  onNavigate: (page: number) => void;
  style?: React.CSSProperties;
}>(function IndexPage({ onNavigate, style }, ref) {
  return (
    <div ref={ref} style={{ ...style, ...pageStyle }}>
      <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px', color: '#2a1810' }}>Contents</h2>
      <div style={{ width: '40px', height: '2px', background: '#8b7355', marginBottom: '20px' }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {INDEX_ENTRIES.map((entry, i) => (
          <button
            key={entry.id}
            type="button"
            onClick={(e) => { e.stopPropagation(); onNavigate(entry.pageNumber); }}
            style={{
              display: 'flex', alignItems: 'baseline', gap: '8px',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '6px 0', borderBottom: '1px dotted rgba(139,115,85,0.3)',
              fontFamily: 'inherit', color: 'inherit', textAlign: 'left', width: '100%',
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#8b7355', minWidth: '28px' }}>
              {toRoman(i + 1)}.
            </span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ fontSize: '14px', fontWeight: 600, display: 'block', lineHeight: 1.3 }}>
                {entry.shortName}
              </span>
              <span style={{ fontSize: '11px', color: '#6b5a47', fontStyle: 'italic' }}>
                {entry.shortDegree} · {entry.years}
              </span>
            </span>
            <span style={{ fontSize: '11px', color: '#8b7355', whiteSpace: 'nowrap' }}>
              p.{entry.pageNumber}
            </span>
          </button>
        ))}
      </div>

      <p style={{ fontSize: '10px', color: '#8b7355', textAlign: 'center', marginTop: 'auto', fontStyle: 'italic', paddingTop: '12px' }}>
        Tap any entry to jump · Swipe to flip
      </p>
    </div>
  );
});

// ═══ CONTENT PAGE ═══
export const ContentPage = React.forwardRef<HTMLDivElement, {
  entry: EducationEntry;
  index: number;
  pageNumber: number;
  style?: React.CSSProperties;
}>(function ContentPage({ entry, index, pageNumber, style }, ref) {
  const color = EDU_COLORS[index];
  return (
    <div ref={ref} style={{ ...style, ...pageStyle }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '6px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <CompanyLogo name={entry.institution} src={EDUCATION_LOGO_PATHS[entry.id] || ''} color={color} size={28} />
        </div>
        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, lineHeight: 1.2, color: '#2a1810' }}>{entry.institution}</h3>
          <p style={{ fontSize: '13px', color, margin: '2px 0 0', fontWeight: 600 }}>{entry.credential}</p>
        </div>
      </div>

      <p style={{ fontSize: '11px', fontStyle: 'italic', color: '#6b5a47', margin: '0 0 12px' }}>{entry.duration}</p>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 12px' }}>
        <div style={{ flex: 1, height: '1px', background: 'rgba(139,115,85,0.2)' }} />
        <span style={{ fontSize: '10px', color: '#8b7355' }}>✦</span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(139,115,85,0.2)' }} />
      </div>

      {/* Description — max 4 lines */}
      {entry.description && (
        <p style={{
          fontSize: '12px', lineHeight: 1.7, color: '#3d3428', margin: '0 0 12px',
          display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden',
        }}>{entry.description}</p>
      )}

      {/* Activities — max 4 */}
      {entry.activities && entry.activities.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
          {entry.activities.slice(0, 4).map((a) => (
            <span key={a} style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(139,115,85,0.2)', background: 'rgba(139,115,85,0.05)', color: '#5a4a32' }}>
              {a}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{ marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid rgba(139,115,85,0.15)', display: 'flex', justifyContent: 'flex-end', fontSize: '10px', color: '#8b7355', fontStyle: 'italic' }}>
        <span>{pageNumber}</span>
      </div>
    </div>
  );
});

// ═══ SUMMARY PAGE ═══
export const SummaryPage = React.forwardRef<HTMLDivElement, { style?: React.CSSProperties }>(
  function SummaryPage(props, ref) {
    return (
      <div ref={ref} style={{ ...props.style, ...pageStyle }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#2a1810', marginBottom: '16px' }}>What I Learned</h3>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px', lineHeight: 1.7, color: '#3d3428' }}>
          <p>From classrooms in Andheri to online courses alongside a startup — every stage built something different.</p>
          <p><strong>Foundation:</strong> Logic, mathematics, and curiosity (SSC & HSC)</p>
          <p><strong>Engineering:</strong> Data structures, algorithms, OOP, and building real projects (DBIT)</p>
          <p><strong>Mastery:</strong> System design, competitive programming, and production-grade thinking (Scaler)</p>
          <p style={{ fontStyle: 'italic', color: '#8b7355', marginTop: 'auto' }}>Education never ends — the next chapter is always open.</p>
        </div>
        <div style={{ textAlign: 'center', fontSize: '10px', color: '#8b7355', fontStyle: 'italic', marginTop: '8px' }}>6</div>
      </div>
    );
  }
);

// ═══ BACK COVER ═══
export const BackCoverPage = React.forwardRef<HTMLDivElement, { style?: React.CSSProperties }>(
  function BackCoverPage(props, ref) {
    return (
      <div ref={ref} data-density="hard" style={{
        ...props.style,
        background: 'linear-gradient(145deg, #2a1a0e, #3d2818, #1e1008, #2a1a0e)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '2rem', position: 'relative',
        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)',
      }}>
        <div style={{ position: 'absolute', inset: '10px', border: '1px solid rgba(212,175,55,0.12)', pointerEvents: 'none' }} />
        <p style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'Georgia, serif', background: 'linear-gradient(135deg, #c9a84c, #f5e7a3, #d4af37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          The journey continues...
        </p>
        <div style={{ width: '30px', height: '1px', background: 'rgba(212,175,55,0.2)', margin: '12px auto' }} />
        <p style={{ fontSize: '11px', color: 'rgba(212,175,55,0.25)', fontFamily: 'Georgia, serif', fontStyle: 'italic', maxWidth: '200px' }}>
          Every page turned is a lesson learned.
        </p>
      </div>
    );
  }
);
