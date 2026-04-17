'use client';
import React from 'react';
import type { EducationEntry } from '@/types';
import styles from '../education.module.css';

interface Props { entry: EducationEntry; pageNumber: number; style?: React.CSSProperties; }

const ContentPage = React.forwardRef<HTMLDivElement, Props>(function ContentPage({ entry, pageNumber, style }, ref) {
  return (
    <div ref={ref} className={styles.page} style={style}>
      <div className={styles.pageContent}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '6px', borderBottom: '1px solid rgba(139,115,85,0.2)', marginBottom: '10px', fontSize: '9px', color: '#6b5a47', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          <span>{entry.institution}</span>
          <span>{pageNumber}</span>
        </header>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 3px', lineHeight: 1.2, color: '#2a1810' }}>{entry.credential}</h3>
          <p style={{ fontSize: '11px', fontStyle: 'italic', color: '#6b5a47', margin: '0 0 10px' }}>{entry.duration}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 10px' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(139,115,85,0.15)' }} />
            <span style={{ fontSize: '9px', color: '#8b7355' }}>✦</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(139,115,85,0.15)' }} />
          </div>
          {entry.description && (
            <p style={{ fontSize: '11px', lineHeight: 1.7, color: '#3d3428', margin: '0 0 10px', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{entry.description}</p>
          )}
          {entry.activities && entry.activities.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {entry.activities.slice(0, 4).map((a) => (
                <span key={a} style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '3px', border: '1px solid rgba(139,115,85,0.15)', background: 'rgba(139,115,85,0.04)', color: '#5a4a32' }}>{a}</span>
              ))}
            </div>
          )}
        </div>
        <div style={{ marginTop: 'auto', paddingTop: '6px', borderTop: '1px solid rgba(139,115,85,0.1)', fontSize: '9px', color: '#8b7355', textAlign: 'center', fontStyle: 'italic' }}>{pageNumber}</div>
      </div>
    </div>
  );
});
export default ContentPage;
