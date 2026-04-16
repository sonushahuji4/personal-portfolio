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
      <div className={styles.bookContainer}>
        {/* @ts-expect-error react-pageflip types are incomplete */}
        <HTMLFlipBook
          ref={bookRef}
          width={400}
          height={550}
          minWidth={280}
          maxWidth={500}
          minHeight={400}
          maxHeight={650}
          size="stretch"
          showCover={true}
          mobileScrollSupport={false}
          flippingTime={800}
          maxShadowOpacity={0.5}
          drawShadow={true}
          useMouseEvents={true}
          className="education-flipbook"
          startPage={0}
          onFlip={(e: { data: number }) => setCurrentPage(e.data)}
          style={{}}
        >
          {/* Page 0: Front Cover */}
          <CoverPage />

          {/* Page 1: Index */}
          <IndexPage entries={EDUCATION} onFlipTo={flipTo} />

          {/* Pages 2-5: Education entries */}
          {EDUCATION.map((entry, i) => (
            <ContentPage key={entry.id} entry={entry} index={i} />
          ))}

          {/* Last page: Back Cover */}
          <BackCoverPage />
        </HTMLFlipBook>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted transition-all hover:text-foreground hover:border-accent/30 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Page indicator */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => flipTo(i)}
              className="flex items-center justify-center p-1"
              aria-label={`Go to page ${i}`}
            >
              <span className={`block h-1.5 rounded-full transition-all duration-300 ${
                currentPage === i ? 'w-5 bg-accent' : 'w-1.5 bg-border hover:bg-muted-foreground'
              }`} />
            </button>
          ))}
        </div>

        <button
          onClick={nextPage}
          disabled={currentPage >= totalPages - 1}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted transition-all hover:text-foreground hover:border-accent/30 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
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
