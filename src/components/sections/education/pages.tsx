'use client';

import React from 'react';
import Image from 'next/image';
import type { EducationEntry } from '@/types';
import CompanyLogo, { EDUCATION_LOGO_PATHS } from '@/components/common/company-logo';
import styles from './education.module.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const EDU_COLORS = ['#8B4513', '#2E5A3A', '#1E4A6E', '#5B3A8C'];

// ═══ FRONT COVER — Full-bleed graduation photo ═══
export const CoverPage = React.forwardRef<HTMLDivElement, { style?: React.CSSProperties }>(
  function CoverPage(props, ref) {
    return (
      <div ref={ref} className={styles.pageCover} data-density="hard" style={props.style}>
        {/* Full-bleed graduation photo */}
        <Image
          src={`${basePath}/images/graduation-photo.png`}
          alt="Graduation"
          fill
          className="object-cover object-center"
          unoptimized
        />
        {/* Subtle gradient — keep face visible, darken bottom only */}
        <div className="absolute inset-0 bg-linear-to-t from-[#1a0f08]/80 via-transparent to-[#1a0f08]/20" />

        {/* Gold border frame */}
        <div className="absolute inset-3 border border-amber-500/15 rounded-sm pointer-events-none z-10" />

        {/* Text — bottom left, small, not blocking the face */}
        <div className="relative z-10 w-full px-5 pb-6 mt-auto text-left">
          <p className={`font-serif text-sm italic ${styles.goldTitle}`}>
            A journey of learning
          </p>
          <div className="mt-2 h-px w-10 bg-amber-500/25" />
          <p className="mt-3 text-[9px] text-amber-200/30 tracking-[0.2em] uppercase">
            Open to read →
          </p>
        </div>
      </div>
    );
  }
);

// ═══ INDEX PAGE — Table of Contents on parchment ═══
export const IndexPage = React.forwardRef<HTMLDivElement, {
  entries: EducationEntry[];
  onFlipTo: (page: number) => void;
  style?: React.CSSProperties;
}>(function IndexPage({ entries, onFlipTo, style }, ref) {
  return (
    <div ref={ref} className={styles.page} style={style}>
      <div className={styles.spine} />

      <h3 className="font-serif text-lg font-bold text-[#2a1a0e] mb-1 tracking-wide">
        Contents
      </h3>
      <div className="h-px w-12 bg-[#8b7355]/30 mb-6" />

      <div className="space-y-4 flex-1">
        {entries.map((entry, i) => {
          const yearMatch = entry.duration.match(/(\d{4})/);
          const year = yearMatch ? yearMatch[1] : '';
          return (
            <button
              key={entry.id}
              onClick={(e) => { e.stopPropagation(); onFlipTo(i + 2); }}
              className="group flex w-full items-center gap-3 p-2 rounded text-left transition-all hover:bg-[#c8b890]/30"
            >
              <span className="font-serif text-lg font-bold" style={{ color: EDU_COLORS[i] }}>
                {String.fromCharCode(73 + i === 73 ? 73 : 73 + i)}{/* Roman-ish */}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#2a1a0e] font-serif">{entry.institution}</p>
                <p className="text-xs text-[#6b5a42] italic">{entry.credential}</p>
              </div>
              <span className="text-xs font-serif text-[#8b7355]">{year}</span>
              {/* Dotted leader line */}
              <span className="text-[#c8b890] text-xs tracking-[0.3em]">···</span>
              <span className="text-xs font-serif text-[#8b7355]">p.{i + 1}</span>
            </button>
          );
        })}
      </div>

      {/* Timeline at bottom */}
      <div className="mt-6 flex items-center gap-1">
        {entries.map((entry, i) => {
          const yearMatch = entry.duration.match(/(\d{4})/);
          const year = yearMatch ? yearMatch[1] : '';
          return (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center">
                <div className="h-2 w-2 rounded-full border border-[#8b7355]" style={{ backgroundColor: EDU_COLORS[i] + '40' }} />
                <span className="text-[7px] text-[#8b7355] mt-0.5 font-serif">{year}</span>
              </div>
              {i < entries.length - 1 && <div className="flex-1 h-px bg-[#c8b890]/50" />}
            </React.Fragment>
          );
        })}
      </div>

      <div className={styles.pageNumber}>i</div>
    </div>
  );
});

// ═══ CONTENT PAGE — Education entry on parchment ═══
export const ContentPage = React.forwardRef<HTMLDivElement, {
  entry: EducationEntry;
  index: number;
  style?: React.CSSProperties;
}>(function ContentPage({ entry, index, style }, ref) {
  const color = EDU_COLORS[index];
  return (
    <div ref={ref} className={styles.page} style={style}>
      <div className={styles.spine} />

      {/* Chapter header */}
      <div className="flex items-start gap-3 mb-4">
        <CompanyLogo name={entry.institution} src={EDUCATION_LOGO_PATHS[entry.id] || ''} color={color} size={40} />
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-base font-bold text-[#2a1a0e] leading-tight">
            {entry.institution}
          </h3>
          <p className="text-xs font-semibold font-serif mt-0.5" style={{ color }}>
            {entry.credential}
          </p>
          <p className="text-[11px] text-[#8b7355] italic">{entry.duration}</p>
        </div>
      </div>

      {/* Decorative divider — ink line */}
      <div className="flex items-center gap-2 mb-4">
        <div className="h-px flex-1 bg-[#c8b890]/50" />
        <span className="text-[10px] text-[#8b7355] font-serif">✦</span>
        <div className="h-px flex-1 bg-[#c8b890]/50" />
      </div>

      {/* Description */}
      {entry.description && (
        <p className="text-[13px] leading-[1.8] text-[#4a3a28] font-serif mb-4">
          {entry.description}
        </p>
      )}

      {/* Activities as ink-style tags */}
      {entry.activities && entry.activities.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto">
          {entry.activities.map((a) => (
            <span key={a} className="rounded border border-[#c8b890]/50 bg-[#c8b890]/15 px-2 py-0.5 text-[11px] text-[#5a4a32] font-serif">
              {a}
            </span>
          ))}
        </div>
      )}

      <div className={styles.pageNumber}>{index + 1}</div>
    </div>
  );
});

// ═══ BACK COVER — Leather ═══
export const BackCoverPage = React.forwardRef<HTMLDivElement, { style?: React.CSSProperties }>(
  function BackCoverPage(props, ref) {
    return (
      <div ref={ref} className={styles.pageCover} data-density="hard" style={props.style}>
        <div className="relative z-10 text-center">
          <p className={`font-serif text-lg font-bold ${styles.goldTitle}`}>
            The journey continues...
          </p>
          <div className="mx-auto mt-3 h-px w-12 bg-amber-500/20" />
          <p className="mt-4 text-xs text-amber-200/25 font-serif italic max-w-48 mx-auto">
            Every page turned is a lesson learned. The best chapters are yet to come.
          </p>
        </div>
      </div>
    );
  }
);
