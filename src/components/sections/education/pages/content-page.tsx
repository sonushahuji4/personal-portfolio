'use client';

import React from 'react';
import type { EducationEntry } from '@/types';
import styles from '../education.module.css';

interface ContentPageProps {
  entry: EducationEntry;
  pageNumber: number;
  style?: React.CSSProperties;
}

const ContentPage = React.forwardRef<HTMLDivElement, ContentPageProps>(
  function ContentPage({ entry, pageNumber, style }, ref) {
    return (
      <div ref={ref} className={styles.page} style={style}>
        <div className={styles.pageContent}>
          {/* Header */}
          <header className={styles.contentHeader}>
            <span>{entry.institution}</span>
            <span>{pageNumber}</span>
          </header>

          {/* Body */}
          <div className={styles.contentBody}>
            <h3 className={styles.contentDegree}>{entry.credential}</h3>
            <p className={styles.contentDates}>{entry.duration}</p>

            {entry.description && (
              <p className={styles.contentDescription}>{entry.description}</p>
            )}

            {entry.activities && entry.activities.length > 0 && (
              <div className={styles.contentTags}>
                {entry.activities.slice(0, 4).map((a) => (
                  <span key={a} className={styles.contentTag}>{a}</span>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className={styles.pageFooter}>{pageNumber}</div>
        </div>
      </div>
    );
  }
);

export default ContentPage;
