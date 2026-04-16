'use client';

import React from 'react';
import styles from '../education.module.css';

const SummaryPage = React.forwardRef<HTMLDivElement, { style?: React.CSSProperties }>(
  function SummaryPage(props, ref) {
    return (
      <div ref={ref} className={styles.page} style={props.style}>
        <div className={styles.pageContent}>
          <header className={styles.contentHeader}>
            <span>Summary</span>
            <span>6</span>
          </header>
          <div className={styles.contentBody} style={{ fontSize: '0.78rem', lineHeight: 1.7, color: '#3d3428' }}>
            <p style={{ marginBottom: '10px' }}>From classrooms to online courses alongside a startup — every stage built something different.</p>
            <p style={{ marginBottom: '6px' }}><strong>Foundation:</strong> Logic, mathematics, and curiosity</p>
            <p style={{ marginBottom: '6px' }}><strong>Engineering:</strong> Data structures, algorithms, OOP</p>
            <p style={{ marginBottom: '6px' }}><strong>Mastery:</strong> System design, competitive programming</p>
            <p style={{ fontStyle: 'italic', color: '#8b7355', marginTop: 'auto' }}>Education never ends.</p>
          </div>
          <div className={styles.pageFooter}>6</div>
        </div>
      </div>
    );
  }
);

export default SummaryPage;
