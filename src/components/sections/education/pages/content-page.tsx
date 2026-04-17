'use client';
import React from 'react';
import type { EducationEntry } from '@/types';
import styles from '../education.module.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const LOGO_MAP: Record<string, string> = {
  ssc: `${basePath}/logos/stdominic.png`,
  hsc: `${basePath}/logos/donbosco.jpeg`,
  dbit: `${basePath}/logos/dbit.png`,
  scaler: `${basePath}/logos/scaler.png`,
};

interface Props { entry: EducationEntry; pageNumber: number; style?: React.CSSProperties; }

const ContentPage = React.forwardRef<HTMLDivElement, Props>(function ContentPage({ entry, pageNumber, style }, ref) {
  const logo = LOGO_MAP[entry.id];

  return (
    <div ref={ref} className={styles.page} style={style}>
      <div className={styles.pageContent}>
        {/* Logo + Institution */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          {logo && (
            <div style={{ width: '38px', height: '38px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(139,115,85,0.15)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} alt={entry.institution} width={30} height={30} style={{ objectFit: 'contain' }} />
            </div>
          )}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, lineHeight: 1.25, color: '#2a1810', fontFamily: 'Georgia, serif' }}>
              {entry.institution}
            </h3>
          </div>
        </div>

        {/* Credential — prominent */}
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#5a3e28', margin: '0 0 4px', fontFamily: 'Georgia, serif' }}>
          {entry.credential}
        </p>

        {/* Duration */}
        <p style={{ fontSize: '12px', fontStyle: 'italic', color: '#8b7355', margin: '0 0 12px' }}>
          {entry.duration}
        </p>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 12px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(139,115,85,0.15)' }} />
          <span style={{ fontSize: '9px', color: '#8b7355' }}>✦</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(139,115,85,0.15)' }} />
        </div>

        {/* Description — readable size */}
        {entry.description && (
          <p style={{
            fontSize: '12px', lineHeight: 1.8, color: '#3d3428', margin: '0 0 12px',
            fontFamily: 'Georgia, serif',
          }}>
            {entry.description}
          </p>
        )}

        {/* Activities */}
        {entry.activities && entry.activities.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {entry.activities.slice(0, 4).map((a) => (
              <span key={a} style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(139,115,85,0.2)', background: 'rgba(139,115,85,0.06)', color: '#4a3a28', fontFamily: 'Georgia, serif' }}>
                {a}
              </span>
            ))}
          </div>
        )}

        {/* Page number footer */}
        <div style={{ marginTop: 'auto', paddingTop: '8px', fontSize: '10px', color: '#8b7355', textAlign: 'center', fontStyle: 'italic' }}>
          — {pageNumber} —
        </div>
      </div>
    </div>
  );
});
export default ContentPage;
