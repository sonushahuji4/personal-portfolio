'use client';

import { useRef, useState, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EDUCATION } from '@/data/education';
import { CoverPage, IndexPage, ContentPage, BackCoverPage } from './pages';
import styles from './education.module.css';

const EducationBook = () => {
  const bookRef = useRef<typeof HTMLFlipBook>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = EDUCATION.length + 3; // cover + index + entries + back cover

  const flipTo = useCallback((page: number) => {
    if (bookRef.current) {
      (bookRef.current as unknown as { pageFlip: () => { flip: (n: number) => void } }).pageFlip().flip(page);
    }
  }, []);

  const nextPage = useCallback(() => {
    if (bookRef.current) {
      (bookRef.current as unknown as { pageFlip: () => { flipNext: () => void } }).pageFlip().flipNext();
    }
  }, []);

  const prevPage = useCallback(() => {
    if (bookRef.current) {
      (bookRef.current as unknown as { pageFlip: () => { flipPrev: () => void } }).pageFlip().flipPrev();
    }
  }, []);

  return (
    <div>
      {/* 3D Book on desk — looking down from chair angle */}
      <div className={styles.bookWrapper}>
        <div className={styles.book3d}>
          {/* Physical book edges */}
          <div className={styles.bookSpine} />
          <div className={styles.bookThickness} />
          <div className={styles.bookBottom} />
          <div className={styles.bookShadow} />

          {/* The actual flip book */}
          <div className={styles.bookContainer}>
            {/* @ts-expect-error react-pageflip types are incomplete */}
            <HTMLFlipBook
              ref={bookRef}
              width={380}
              height={520}
              minWidth={260}
              maxWidth={450}
              minHeight={360}
              maxHeight={600}
              size="stretch"
              showCover={true}
              mobileScrollSupport={false}
              flippingTime={900}
              maxShadowOpacity={0.6}
              drawShadow={true}
              useMouseEvents={true}
              className="education-flipbook"
              startPage={0}
              onFlip={(e: { data: number }) => setCurrentPage(e.data)}
              style={{}}
            >
              <CoverPage />
              <IndexPage entries={EDUCATION} onFlipTo={flipTo} />
              {EDUCATION.map((entry, i) => (
                <ContentPage key={entry.id} entry={entry} index={i} />
              ))}
              <BackCoverPage />
            </HTMLFlipBook>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button onClick={prevPage} disabled={currentPage === 0}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-muted transition-all hover:text-foreground hover:border-accent/30 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous page">
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => flipTo(i)} className="flex items-center justify-center p-1" aria-label={`Page ${i}`}>
              <span className={`block h-1.5 rounded-full transition-all duration-300 ${currentPage === i ? 'w-5 bg-accent' : 'w-1.5 bg-border hover:bg-muted-foreground'}`} />
            </button>
          ))}
        </div>

        <button onClick={nextPage} disabled={currentPage >= totalPages - 1}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-muted transition-all hover:text-foreground hover:border-accent/30 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next page">
          <ChevronRight size={18} />
        </button>
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Drag page edges to flip · Click arrows to navigate
      </p>
    </div>
  );
};

export default EducationBook;
