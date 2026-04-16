'use client';

import React from 'react';
import Image from 'next/image';
import styles from '../education.module.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const CoverPage = React.forwardRef<HTMLDivElement, { style?: React.CSSProperties }>(
  function CoverPage(props, ref) {
    return (
      <div ref={ref} className={`${styles.page} ${styles.pageCover}`} data-density="hard" style={props.style}>
        <div className={`${styles.pageContent} ${styles.pageContentCover}`}>
          <div className={styles.coverPhotoWrapper}>
            <Image
              src={`${basePath}/images/graduation-photo.png`}
              alt="Graduation"
              fill
              className="object-cover"
              style={{ objectPosition: '50% 15%' }}
              priority
              unoptimized
            />
          </div>
          <div className={styles.coverOverlay} />
          <div className={styles.coverBorder} />
          <div className={styles.coverTitle}>
            <h2>A Journey of Learning</h2>
            <p className={styles.coverSubtitle}>Flip to read →</p>
          </div>
        </div>
      </div>
    );
  }
);

export default CoverPage;
