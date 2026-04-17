'use client';

import { useRef, useState, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EDUCATION } from '@/data/education';
import IndexPage from './pages/index-page';
import ContentPage from './pages/content-page';
import BackPage from './pages/back-page';
import styles from './education.module.css';

const EducationBook = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 6; // index + 4 entries + back

  const flipTo = useCallback((page: number) => {
    bookRef.current?.pageFlip?.()?.flip?.(page);
  }, []);

  const nextPage = useCallback(() => {
    bookRef.current?.pageFlip?.()?.flipNext?.();
  }, []);

  const prevPage = useCallback(() => {
    bookRef.current?.pageFlip?.()?.flipPrev?.();
  }, []);

  return (
    <div>
      {/* 3D perspective wrapper — AROUND the flipbook, not inside */}
      <div className={styles.bookPerspective}>
        <div className={styles.book3dBody}>
          <div className={styles.bookSpine} />
          <div className={styles.bookPagesLeft} />
          <div className={styles.bookPagesRight} />
          <div className={styles.bookLighting} />

          {/* Flipbook wrapper — NO 3D transforms here */}
          <div>
            <HTMLFlipBook
              ref={bookRef}
              width={400}
              height={540}
              size="stretch"
              minWidth={280}
              maxWidth={480}
              minHeight={380}
              maxHeight={620}
              maxShadowOpacity={0.5}
              showCover={false}
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
              onFlip={(e: { data: number }) => setCurrentPage(e.data)}
              className=""
              style={{}}
            >
              {/* Page 0: Contents */}
              <IndexPage onNavigate={flipTo} />
              {/* Pages 1-4: Education entries */}
              {EDUCATION.map((entry, i) => (
                <ContentPage key={entry.id} entry={entry} pageNumber={i + 2} />
              ))}
              {/* Page 5: Back */}
              <BackPage />
            </HTMLFlipBook>
          </div>
        </div>
      </div>
      <div className={styles.bookTableShadow} />

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button onClick={prevPage} disabled={currentPage === 0} className={styles.controlBtn}>
          <ChevronLeft size={14} className="inline" /> Prev
        </button>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => flipTo(i)} className="p-1" aria-label={`Page ${i + 1}`}>
              <span className={`block h-1.5 rounded-full transition-all duration-300 ${currentPage === i ? 'w-5' : 'w-1.5'}`} style={{ background: currentPage === i ? '#c9a961' : 'rgba(139,115,85,0.3)' }} />
            </button>
          ))}
        </div>
        <button onClick={nextPage} disabled={currentPage >= totalPages - 1} className={styles.controlBtn}>
          Next <ChevronRight size={14} className="inline" />
        </button>
      </div>
      <p className="mt-2 text-center text-[10px]" style={{ color: 'rgba(139,115,85,0.4)', fontStyle: 'italic' }}>
        Page {currentPage + 1} of {totalPages} · Drag corners to flip
      </p>
    </div>
  );
};

export default EducationBook;
