'use client';
import React from 'react';
import styles from '../education.module.css';

const BackPage = React.forwardRef<HTMLDivElement, { style?: React.CSSProperties }>(function BackPage(props, ref) {
  return (
    <div ref={ref} className={styles.page} style={props.style}>
      <div className={styles.pageContent} style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#2a1810', marginBottom: '8px' }}>The journey continues...</p>
        <div style={{ width: '30px', height: '1px', background: '#8b7355', margin: '0 auto 12px' }} />
        <p style={{ fontSize: '10px', color: '#6b5a47', fontStyle: 'italic', maxWidth: '200px' }}>Every page turned is a lesson learned.</p>
      </div>
    </div>
  );
});
export default BackPage;
