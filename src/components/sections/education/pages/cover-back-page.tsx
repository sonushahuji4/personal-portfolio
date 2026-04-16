'use client';

import React from 'react';
import styles from '../education.module.css';

const CoverBackPage = React.forwardRef<HTMLDivElement, { style?: React.CSSProperties }>(
  function CoverBackPage(props, ref) {
    return (
      <div ref={ref} className={`${styles.page} ${styles.pageCover}`} data-density="hard" style={{
        ...props.style,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '2rem', position: 'relative',
      }}>
        <div style={{ position: 'absolute', inset: '8px', border: '1px solid rgba(201,169,97,0.12)', pointerEvents: 'none' }} />
        <p style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'Georgia, serif', background: 'linear-gradient(135deg, #c9a84c, #f5e7a3, #d4af37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          The journey continues...
        </p>
        <div style={{ width: '30px', height: '1px', background: 'rgba(201,169,97,0.2)', margin: '10px auto' }} />
        <p style={{ fontSize: '10px', color: 'rgba(201,169,97,0.25)', fontFamily: 'Georgia, serif', fontStyle: 'italic', maxWidth: '180px' }}>
          Every page turned is a lesson learned.
        </p>
      </div>
    );
  }
);

export default CoverBackPage;
