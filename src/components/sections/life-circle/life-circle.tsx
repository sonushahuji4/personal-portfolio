'use client';

import { useState, useCallback } from 'react';
import SectionHeading from '@/components/ui/section-heading';
import { lifeCircleChapters } from '@/data/life-circle';
import CircleVisual from './circle-visual';
import VerticalTimeline from './vertical-timeline';
import ChapterModal from './chapter-modal';

const LifeCircle = () => {
  const [activeChapterId, setActiveChapterId] = useState<number | null>(null);

  const activeChapter = activeChapterId !== null
    ? lifeCircleChapters.find((c) => c.id === activeChapterId) || null
    : null;

  const activeIndex = activeChapter ? lifeCircleChapters.findIndex((c) => c.id === activeChapter.id) : -1;

  const handleClose = useCallback(() => setActiveChapterId(null), []);

  const handlePrev = useCallback(() => {
    if (activeIndex > 0) setActiveChapterId(lifeCircleChapters[activeIndex - 1].id);
  }, [activeIndex]);

  const handleNext = useCallback(() => {
    if (activeIndex < lifeCircleChapters.length - 1) setActiveChapterId(lifeCircleChapters[activeIndex + 1].id);
  }, [activeIndex]);

  return (
    <section id="life-circle" className="relative py-24 sm:py-32 overflow-hidden" aria-labelledby="life-circle-heading">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-15" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading
          title="The Life Circle"
          subtitle="A journey in twelve chapters — click any to open"
          accent="#c0a0ff"
        />

        {/* Desktop: Circle SVG */}
        <div className="hidden md:block">
          <CircleVisual chapters={lifeCircleChapters} onSelectChapter={setActiveChapterId} />
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="md:hidden">
          <VerticalTimeline chapters={lifeCircleChapters} onSelectChapter={setActiveChapterId} />
        </div>
      </div>

      {/* Chapter modal */}
      <ChapterModal
        chapter={activeChapter}
        isOpen={activeChapterId !== null}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={activeIndex > 0}
        hasNext={activeIndex < lifeCircleChapters.length - 1}
      />
    </section>
  );
};

export default LifeCircle;
