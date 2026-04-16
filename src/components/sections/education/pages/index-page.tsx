'use client';

import React from 'react';
import styles from '../education.module.css';

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

interface IndexPageProps {
  onNavigate: (page: number) => void;
  style?: React.CSSProperties;
}

const IndexPage = React.forwardRef<HTMLDivElement, IndexPageProps>(
  function IndexPage({ onNavigate, style }, ref) {
    return (
      <div ref={ref} className={styles.page} style={style}>
        <div className={styles.pageContent}>
          <h2 className={styles.indexTitle}>Contents</h2>
          <div className={styles.indexDivider} />

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {INDEX_ENTRIES.map((entry, i) => (
              <button
                key={entry.id}
                type="button"
                onClick={(e) => { e.stopPropagation(); onNavigate(entry.pageNumber); }}
                className={styles.timelineButton}
              >
                <span className={styles.timelineRoman}>{toRoman(i + 1)}.</span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span className={styles.timelineName}>{entry.shortName}</span>
                  <span className={styles.timelineSub}>{entry.shortDegree} · {entry.years}</span>
                </span>
                <span className={styles.timelinePage}>p.{entry.pageNumber}</span>
              </button>
            ))}
          </div>

          <p className={styles.pageFooter}>
            Tap any entry to jump · Swipe to flip
          </p>
        </div>
      </div>
    );
  }
);

export default IndexPage;
