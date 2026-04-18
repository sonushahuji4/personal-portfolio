'use client';
import React from 'react';
import styles from '../education.module.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

function toRoman(n: number): string {
  const nums: [number, string][] = [[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
  let r = '';
  for (const [v, s] of nums) { while (n >= v) { r += s; n -= v; } }
  return r;
}

// Page numbers: index is page 0, entries are pages 1-4, back is page 5
const ENTRIES = [
  { id: 'ssc', name: 'St. Dominic Savio', sub: 'SSC · 2006–2014', page: 1, logo: `${basePath}/logos/stdominic.png` },
  { id: 'hsc', name: 'Don Bosco Lonavala', sub: 'HSC Science · 2014–2016', page: 2, logo: `${basePath}/logos/donbosco.jpeg` },
  { id: 'dbit', name: 'DBIT Mumbai', sub: 'B.E. Computer Science · 2016–2020', page: 3, logo: `${basePath}/logos/dbit.png` },
  { id: 'scaler', name: 'Scaler Academy', sub: 'DSA & System Design · 2023–2025', page: 4, logo: `${basePath}/logos/scaler.png` },
];

interface Props { onNavigate: (p: number) => void; style?: React.CSSProperties; }

const IndexPage = React.forwardRef<HTMLDivElement, Props>(function IndexPage({ onNavigate, style }, ref) {
  return (
    <div ref={ref} className={styles.page} style={style}>
      <div className={styles.pageContent}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#2a1810', marginBottom: '4px', fontFamily: 'Georgia, serif' }}>Contents</h2>
        <div style={{ width: '40px', height: '2px', background: '#8b7355', marginBottom: '16px' }} />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {ENTRIES.map((e, i) => (
            <button key={e.id} type="button" onClick={(ev) => { ev.stopPropagation(); onNavigate(e.page); }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', borderBottom: '1px dotted rgba(139,115,85,0.25)', cursor: 'pointer', padding: '7px 4px', fontFamily: 'inherit', color: 'inherit', textAlign: 'left', width: '100%', borderRadius: '4px' }}>
              {/* Logo */}
              <div style={{ width: '26px', height: '26px', borderRadius: '5px', overflow: 'hidden', border: '1px solid rgba(139,115,85,0.12)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={e.logo} alt={e.name} width={18} height={18} style={{ objectFit: 'contain' }} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#8b7355', minWidth: '22px', fontFamily: 'Georgia, serif' }}>{toRoman(i+1)}.</span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: '13px', fontWeight: 600, display: 'block', lineHeight: 1.3, color: '#2a1810', fontFamily: 'Georgia, serif' }}>{e.name}</span>
                <span style={{ fontSize: '10px', color: '#6b5a47', fontStyle: 'italic' }}>{e.sub}</span>
              </span>
              <span style={{ fontSize: '10px', color: '#8b7355', whiteSpace: 'nowrap', fontFamily: 'Georgia, serif' }}>p.{e.page + 1}</span>
            </button>
          ))}
        </div>

        <p style={{ fontSize: '9px', color: '#8b7355', textAlign: 'center', marginTop: 'auto', fontStyle: 'italic', paddingTop: '8px' }}>
          Tap to jump · Drag book to rotate · Swipe to flip
        </p>
      </div>
    </div>
  );
});
export default IndexPage;
