'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
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
  const [rotation, setRotation] = useState({ x: 30, y: -15 });
  const [dragging, setDragging] = useState(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  /* MOBILE FIX: detect mobile viewport so we can disable 3D rotation, drag, and force portrait page mode */
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    /* MOBILE FIX: drag-to-rotate disabled on mobile — the rotation caused horizontal overflow and fought touch scrolling */
    if (isMobile) return;
    setDragging(true);
    lastMouse.current = { x: e.clientX, y: e.clientY };
  }, [isMobile]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    setRotation(r => ({
      x: Math.max(5, Math.min(60, r.x - dy * 0.3)),
      y: Math.max(-60, Math.min(0, r.y + dx * 0.3)),
    }));
    lastMouse.current = { x: e.clientX, y: e.clientY };
  }, [dragging]);

  const handleMouseUp = useCallback(() => { setDragging(false); }, []);
  const totalPages = 6;

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
      {/* 3D perspective container */}
      {/* 3D perspective — draggable */}
      {/* MOBILE FIX: outer wrapper gets overflow-x:hidden so the 3D book can never push horizontal scroll on the page */}
      <div
        style={{
          perspective: isMobile ? 'none' : '1500px',
          display: 'flex',
          justifyContent: 'center',
          padding: isMobile ? '4px 0' : '10px 0',
          cursor: isMobile ? 'default' : (dragging ? 'grabbing' : 'grab'),
          overflowX: 'hidden',
          width: '100%',
          maxWidth: '100%',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div style={{
          position: 'relative',
          /* MOBILE FIX: flatten all 3D transforms on mobile — the rotation caused the open book to clip the viewport */
          transform: isMobile ? 'none' : `rotateY(${rotation.y}deg) rotateX(${rotation.x}deg)`,
          transformStyle: isMobile ? 'flat' : 'preserve-3d',
          transition: dragging ? 'none' : 'transform 0.3s ease',
          maxWidth: '100%',
        }}>
          {/* MOBILE FIX: hide the left book-thickness block on mobile — it extended 15px beyond the book's own width */}
          {!isMobile && (
            <div style={{
              position: 'absolute', left: '-15px', top: '4px', width: '15px', height: 'calc(100% - 8px)',
              background: 'repeating-linear-gradient(to right, #f2ebe0 0px, #d4c9b8 0.5px, #e8dfd0 1px)',
              borderRadius: '6px 0 0 6px',
              transform: 'translateZ(-5px) rotateY(10deg)',
              boxShadow: '-3px 0 8px rgba(0,0,0,0.2)',
              zIndex: -1,
            }} />
          )}

          {/* MOBILE FIX: hide right page edge stack on mobile — same overflow reason */}
          {!isMobile && (
            <div style={{ position: 'absolute', right: '-5px', top: '3px', width: '7px', height: 'calc(100% - 6px)', background: 'repeating-linear-gradient(to bottom, #f2ebe0 0px, #ddd4c0 0.8px, #f0e8d8 1.6px)', borderRadius: '0 3px 3px 0', zIndex: -1, boxShadow: '2px 0 6px rgba(0,0,0,0.15)' }} />
          )}

          {/* The flipbook */}
          {/* MOBILE FIX: force portrait (single-page) on mobile and remount via key when breakpoint flips — HTMLFlipBook does not react to prop changes on usePortrait */}
          <HTMLFlipBook
            key={isMobile ? 'portrait' : 'landscape'}
            ref={bookRef}
            width={380}
            height={520}
            size="stretch"
            minWidth={240}
            maxWidth={440}
            minHeight={360}
            maxHeight={600}
            maxShadowOpacity={0.6}
            showCover={false}
            mobileScrollSupport={true}
            flippingTime={900}
            drawShadow={true}
            usePortrait={isMobile}
            startZIndex={0}
            autoSize={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
            startPage={0}
            onFlip={(e: { data: number }) => setCurrentPage(e.data)}
            className={styles.bookDropShadow}
            style={{}}
          >
            <IndexPage onNavigate={flipTo} />
            {EDUCATION.map((entry, i) => (
              <ContentPage key={entry.id} entry={entry} pageNumber={i + 2} />
            ))}
            <BackPage />
          </HTMLFlipBook>
        </div>
      </div>

      {/* Table shadow */}
      <div style={{ width: '80%', height: '20px', margin: '-6px auto 0', background: 'radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)', filter: 'blur(8px)' }} />

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
