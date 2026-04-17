'use client';
import React from 'react';
import styles from '../education.module.css';

function toRoman(n: number): string {
  const nums: [number, string][] = [[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
  let r = '';
  for (const [v, s] of nums) { while (n >= v) { r += s; n -= v; } }
  return r;
}

const ENTRIES = [
  { id: 'ssc', name: 'St. Dominic Savio', sub: 'SSC · 2006–2014', page: 2 },
  { id: 'hsc', name: 'Don Bosco Lonavala', sub: 'HSC Science · 2014–2016', page: 3 },
  { id: 'dbit', name: 'DBIT Mumbai', sub: 'B.E. Computer Science · 2016–2020', page: 4 },
  { id: 'scaler', name: 'Scaler Academy', sub: 'DSA & System Design · 2023–2025', page: 5 },
];

interface Props { onNavigate: (p: number) => void; style?: React.CSSProperties; }

const IndexPage = React.forwardRef<HTMLDivElement, Props>(function IndexPage({ onNavigate, style }, ref) {
  return (
    <div ref={ref} className={styles.page} style={style}>
      <div className={styles.pageContent}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#2a1810', marginBottom: '4px' }}>Contents</h2>
        <div style={{ width: '40px', height: '2px', background: '#8b7355', marginBottom: '18px' }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {ENTRIES.map((e, i) => (
            <button key={e.id} type="button" onClick={(ev) => { ev.stopPropagation(); onNavigate(e.page); }}
              style={{ display: 'flex', alignItems: 'baseline', gap: '8px', background: 'none', border: 'none', borderBottom: '1px dotted rgba(139,115,85,0.3)', cursor: 'pointer', padding: '6px 0', fontFamily: 'inherit', color: 'inherit', textAlign: 'left', width: '100%' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#8b7355', minWidth: '26px' }}>{toRoman(i+1)}.</span>
              <span style={{ flex: 1 }}>
                <span style={{ fontSize: '13px', fontWeight: 600, display: 'block', lineHeight: 1.3, color: '#2a1810' }}>{e.name}</span>
                <span style={{ fontSize: '10px', color: '#6b5a47', fontStyle: 'italic' }}>{e.sub}</span>
              </span>
              <span style={{ fontSize: '10px', color: '#8b7355', whiteSpace: 'nowrap' }}>p.{e.page}</span>
            </button>
          ))}
        </div>
        <p style={{ fontSize: '9px', color: '#8b7355', textAlign: 'center', marginTop: 'auto', fontStyle: 'italic' }}>Tap to jump · Swipe to flip</p>
      </div>
    </div>
  );
});
export default IndexPage;
