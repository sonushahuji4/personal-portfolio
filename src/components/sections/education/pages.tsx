'use client';

import React from 'react';
import Image from 'next/image';
import type { EducationEntry } from '@/types';
import Badge from '@/components/ui/badge';
import CompanyLogo, { EDUCATION_LOGO_PATHS } from '@/components/common/company-logo';
import styles from './education.module.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const EDU_COLORS = ['#DB2777', '#059669', '#0891B2', '#7C3AED'];

// ═══ COVER PAGE ═══
export const CoverPage = React.forwardRef<HTMLDivElement, { style?: React.CSSProperties }>(
  function CoverPage(props, ref) {
    return (
      <div ref={ref} className={styles.pageCover} data-density="hard" style={props.style}>
        <div className="relative w-40 h-52 sm:w-48 sm:h-64 rounded-xl overflow-hidden border-2 border-amber-500/20 shadow-xl mb-6">
          <Image
            src={`${basePath}/images/graduation-photo.png`}
            alt="Graduation"
            fill
            className="object-cover object-top"
            unoptimized
          />
        </div>
        <h2 className={`font-display text-2xl sm:text-3xl font-bold ${styles.goldTitle}`}>
          My Education
        </h2>
        <p className="mt-2 text-sm text-white/40">A journey of learning</p>
        <p className="mt-8 text-xs text-white/20 animate-pulse">Click edge to open →</p>
      </div>
    );
  }
);

// ═══ INDEX PAGE ═══
export const IndexPage = React.forwardRef<HTMLDivElement, {
  entries: EducationEntry[];
  onFlipTo: (page: number) => void;
  style?: React.CSSProperties;
}>(function IndexPage({ entries, onFlipTo, style }, ref) {
  return (
    <div ref={ref} className={styles.page} style={style}>
      <div className={styles.spine} />
      <h3 className="font-display text-lg font-bold text-foreground mb-6">Table of Contents</h3>
      <div className="space-y-4 flex-1">
        {entries.map((entry, i) => {
          const yearMatch = entry.duration.match(/(\d{4})/);
          const year = yearMatch ? yearMatch[1] : '';
          return (
            <button
              key={entry.id}
              onClick={(e) => { e.stopPropagation(); onFlipTo(i + 2); }}
              className="group flex w-full items-center gap-3 rounded-lg p-2 text-left transition-all hover:bg-white/5"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-xs font-bold" style={{ backgroundColor: EDU_COLORS[i] + '20', color: EDU_COLORS[i] }}>
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground truncate">{entry.institution}</p>
                <p className="text-xs text-muted-foreground truncate">{entry.credential}</p>
              </div>
              <span className="text-xs font-medium" style={{ color: EDU_COLORS[i] }}>{year}</span>
            </button>
          );
        })}
      </div>
      {/* Timeline visual */}
      <div className="mt-4 flex items-center gap-1">
        {entries.map((entry, i) => {
          const yearMatch = entry.duration.match(/(\d{4})/);
          const year = yearMatch ? yearMatch[1] : '';
          return (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: EDU_COLORS[i] }} />
                <span className="text-[8px] text-muted-foreground mt-0.5">{year}</span>
              </div>
              {i < entries.length - 1 && <div className="flex-1 h-px bg-border" />}
            </React.Fragment>
          );
        })}
      </div>
      <div className={styles.pageNumber}>i</div>
    </div>
  );
});

// ═══ CONTENT PAGE ═══
export const ContentPage = React.forwardRef<HTMLDivElement, {
  entry: EducationEntry;
  index: number;
  style?: React.CSSProperties;
}>(function ContentPage({ entry, index, style }, ref) {
  const color = EDU_COLORS[index];
  return (
    <div ref={ref} className={styles.page} style={style}>
      <div className={styles.spine} />
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <CompanyLogo name={entry.institution} src={EDUCATION_LOGO_PATHS[entry.id] || ''} color={color} size={40} />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-bold text-foreground leading-tight">{entry.institution}</h3>
          <p className="text-xs font-semibold mt-0.5" style={{ color }}>{entry.credential}</p>
          <p className="text-xs text-muted-foreground">{entry.duration}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-border mb-4" />

      {/* Description */}
      {entry.description && (
        <p className="text-sm leading-relaxed text-muted mb-4">{entry.description}</p>
      )}

      {/* Tags */}
      {entry.activities && entry.activities.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {entry.activities.map((a) => <Badge key={a}>{a}</Badge>)}
        </div>
      )}

      <div className={styles.pageNumber}>{index + 1}</div>
    </div>
  );
});

// ═══ BACK COVER ═══
export const BackCoverPage = React.forwardRef<HTMLDivElement, { style?: React.CSSProperties }>(
  function BackCoverPage(props, ref) {
    return (
      <div ref={ref} className={styles.pageCover} data-density="hard" style={props.style}>
        <p className={`font-display text-xl font-bold ${styles.goldTitle}`}>
          The journey continues...
        </p>
        <p className="mt-3 text-sm text-white/30 max-w-xs">
          Every page turned is a lesson learned. The best chapters are still being written.
        </p>
      </div>
    );
  }
);
