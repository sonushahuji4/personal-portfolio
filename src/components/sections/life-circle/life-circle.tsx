'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import SectionHeading from '@/components/ui/section-heading';
import { lifeCircleChapters } from '@/data/life-circle';
import VerticalTimeline from './vertical-timeline';
import ChapterModal from './chapter-modal';

// Dynamic import for 3D — skip SSR
const SolarSystemScene = dynamic(() => import('./solar-system'), { ssr: false });

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
    <section id="life-circle" className="relative py-16 sm:py-24 overflow-hidden" aria-labelledby="life-circle-heading">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading
          title="The Life Circle"
          subtitle="A universe in twelve chapters — click any planet to open its story"
          accent="#c0a0ff"
        />

        {/* Desktop: 3D Solar System */}
        <div className="hidden md:block">
          <SolarSystemScene chapters={lifeCircleChapters} onPlanetClick={setActiveChapterId} />
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="md:hidden">
          <VerticalTimeline chapters={lifeCircleChapters} onSelectChapter={setActiveChapterId} />
        </div>

        {/* Instruction text below */}
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Drag to rotate · Scroll to zoom · Click a planet for its story
        </p>
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
