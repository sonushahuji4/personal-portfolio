'use client';

import { useRef, useState, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EDUCATION } from '@/data/education';
import CoverPage from './pages/cover-page';
import IndexPage from './pages/index-page';
import ContentPage from './pages/content-page';
import SummaryPage from './pages/summary-page';
import CoverBackPage from './pages/cover-back-page';
import styles from './education.module.css';

const EducationBook = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 8;

  const flipTo = useCallback((page: number) => {
    bookRef.current?.pageFlip?.()?.flip?.(page);
  }, []);

  const nextPage = useCallback(() => {
    bookRef.current?.pageFlip?.()?.flipNext?.();
  }, []);

  const prevPage = useCallback(() => {
    bookRef.current?.pageFlip?.()?.flipPrev?.();
  }, []);

  const handleFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data);
  }, []);

  return (
    <div className={styles.bookContainer}>
      {/* The flipbook — agent's exact config */}
      <HTMLFlipBook
        ref={bookRef}
        width={400}
        height={560}
        size="stretch"
        minWidth={280}
        maxWidth={480}
        minHeight={390}
        maxHeight={650}
        maxShadowOpacity={0.6}
        showCover={true}
        mobileScrollSupport={true}
        flippingTime={800}
        drawShadow={true}
        usePortrait={true}
        startZIndex={0}
        autoSize={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={30}
        showPageCorners={true}
        disableFlipByClick={false}
        startPage={0}
        onFlip={handleFlip}
        className={styles.bookShadow}
        style={{}}
      >
        {/* Page 0: Front Cover (hard) */}
        <CoverPage />
        {/* Page 1: Contents/Index */}
        <IndexPage onNavigate={flipTo} />
        {/* Pages 2-5: Education entries (chronological) */}
        {EDUCATION.map((entry, i) => (
          <ContentPage key={entry.id} entry={entry} pageNumber={i + 2} />
        ))}
        {/* Page 6: Summary */}
        <SummaryPage />
        {/* Page 7: Back Cover (hard) */}
        <CoverBackPage />
      </HTMLFlipBook>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-6">
        <button onClick={prevPage} disabled={currentPage === 0}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted transition-all hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous page">
          <ChevronLeft size={16} />
        </button>

        <span className="text-xs text-muted-foreground min-w-20 text-center">
          Page {currentPage + 1} of {totalPages}
        </span>

        <button onClick={nextPage} disabled={currentPage >= totalPages - 1}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted transition-all hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next page">
          <ChevronRight size={16} />
        </button>
      </div>

      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        Drag page corners to flip · Click edges or use arrows
      </p>
    </div>
  );
};

export default EducationBook;
