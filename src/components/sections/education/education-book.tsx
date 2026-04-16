'use client';

import { useRef, useState, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EDUCATION } from '@/data/education';
import { CoverPage, IndexPage, ContentPage, SummaryPage, BackCoverPage } from './pages';

const EducationBook = () => {
  const bookRef = useRef<typeof HTMLFlipBook>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 8; // cover + index + 4 entries + summary + back cover

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

  const handleFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data);
  }, []);

  return (
    <div>
      {/* 3D perspective container */}
      <div style={{ perspective: '1800px', perspectiveOrigin: 'center center', display: 'flex', justifyContent: 'center' }}>
        {/* Book with slight rotation for depth */}
        <div style={{ transformStyle: 'preserve-3d', transform: 'rotateY(-3deg)', position: 'relative' }}>
          {/* Spine (left edge) */}
          <div style={{
            position: 'absolute', left: '-6px', top: '3px', width: '12px', height: 'calc(100% - 6px)',
            background: 'linear-gradient(to right, #1a120a, #2d1f14, #3d2518, #2d1f14, #1a120a)',
            borderRadius: '2px 0 0 2px', zIndex: -1, boxShadow: '-2px 0 8px rgba(0,0,0,0.3)',
          }} />

          {/* Page edges (right side) */}
          <div style={{
            position: 'absolute', right: '-2px', top: '4px', width: '4px', height: 'calc(100% - 8px)',
            background: 'repeating-linear-gradient(to bottom, #f5f0e6 0px, #e8e0d0 1px, #f5f0e6 2px)',
            borderRadius: '0 1px 1px 0', zIndex: -1,
          }} />

          {/* The flipbook */}
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
            className=""
            style={{}}
          >
            {/* Page 0: Front Cover */}
            <CoverPage />
            {/* Page 1: Contents */}
            <IndexPage onNavigate={flipTo} />
            {/* Pages 2-5: Education entries */}
            {EDUCATION.map((entry, i) => (
              <ContentPage key={entry.id} entry={entry} index={i} pageNumber={i + 2} />
            ))}
            {/* Page 6: Summary */}
            <SummaryPage />
            {/* Page 7: Back Cover */}
            <BackCoverPage />
          </HTMLFlipBook>
        </div>
      </div>

      {/* Shadow under the book */}
      <div style={{
        width: '70%', height: '20px', margin: '-10px auto 0',
        background: 'radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 70%)',
        filter: 'blur(4px)',
      }} />

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
        Drag page corners to flip · Click arrows to navigate
      </p>
    </div>
  );
};

export default EducationBook;
