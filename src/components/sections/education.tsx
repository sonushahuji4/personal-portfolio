'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import Badge from '@/components/ui/badge';
import { EDUCATION } from '@/data/education';
import { SECTION_IDS } from '@/lib/constants';
import CompanyLogo, { EDUCATION_LOGO_PATHS } from '@/components/common/company-logo';

const EDU_COLORS = ['#7C3AED', '#0891B2', '#059669', '#DB2777'];

const Education = () => {
  const [currentPage, setCurrentPage] = useState(-1); // -1 = index page
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');

  const goToPage = (page: number) => {
    setFlipDirection(page > currentPage ? 'next' : 'prev');
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < EDUCATION.length - 1) {
      setFlipDirection('next');
      setCurrentPage((p) => p + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > -1) {
      setFlipDirection('prev');
      setCurrentPage((p) => p - 1);
    }
  };

  // Page flip animation variants
  const pageVariants = {
    enter: (dir: 'next' | 'prev') => ({
      rotateY: dir === 'next' ? 90 : -90,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: 'next' | 'prev') => ({
      rotateY: dir === 'next' ? -90 : 90,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section id={SECTION_IDS.education} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-notebook opacity-15" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <SectionHeading title="Education" subtitle="Flip through the pages of my academic journey" accent="#0891B2" />

        {/* Book container */}
        <div className="mx-auto max-w-2xl" style={{ perspective: 1200 }}>
          <div className="relative min-h-80 sm:min-h-96 rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden shadow-xl shadow-shadow">
            {/* Book spine accent */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-linear-to-b from-accent via-accent/50 to-accent/20 rounded-l-2xl" />

            {/* Page content with flip animation */}
            <div className="pl-6 pr-6 py-8 sm:pl-8 sm:pr-8" style={{ transformStyle: 'preserve-3d' }}>
              <AnimatePresence mode="wait" custom={flipDirection}>
                {currentPage === -1 ? (
                  /* ═══ INDEX PAGE ═══ */
                  <motion.div
                    key="index"
                    custom={flipDirection}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <BookOpen size={20} className="text-accent" />
                      <h3 className="font-display text-xl font-bold text-foreground">Table of Contents</h3>
                    </div>

                    <div className="space-y-3">
                      {EDUCATION.map((entry, i) => {
                        const color = EDU_COLORS[i];
                        const yearMatch = entry.duration.match(/(\d{4})/);
                        const year = yearMatch ? yearMatch[1] : '';

                        return (
                          <button
                            key={entry.id}
                            onClick={() => goToPage(i)}
                            className="group flex w-full items-center gap-4 rounded-xl border border-border bg-background/50 p-3 text-left transition-all duration-300 hover:border-border-hover hover:-translate-y-0.5 hover:shadow-md"
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold" style={{ backgroundColor: color + '15', color }}>
                              {i + 1}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-foreground truncate">{entry.institution}</p>
                              <p className="text-xs text-muted-foreground">{entry.credential}</p>
                            </div>
                            <span className="shrink-0 text-xs font-medium" style={{ color }}>{year}</span>
                            <ChevronRight size={14} className="text-muted-foreground transition-transform group-hover:translate-x-1" />
                          </button>
                        );
                      })}
                    </div>

                    {/* Page number */}
                    <div className="mt-6 text-center text-xs text-muted-foreground italic">
                      — Index —
                    </div>
                  </motion.div>
                ) : (
                  /* ═══ EDUCATION PAGE ═══ */
                  <motion.div
                    key={currentPage}
                    custom={flipDirection}
                    variants={pageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {(() => {
                      const entry = EDUCATION[currentPage];
                      const color = EDU_COLORS[currentPage];
                      return (
                        <div>
                          {/* Page header */}
                          <div className="flex items-start gap-4 mb-6">
                            <CompanyLogo name={entry.institution} src={EDUCATION_LOGO_PATHS[entry.id] || ''} color={color} size={48} />
                            <div>
                              <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">{entry.institution}</h3>
                              <p className="text-sm font-semibold mt-0.5" style={{ color }}>{entry.credential}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{entry.duration}</p>
                            </div>
                          </div>

                          {/* Decorative line */}
                          <div className="h-px w-full bg-border mb-5" />

                          {/* Description */}
                          {entry.description && (
                            <p className="text-sm leading-relaxed text-muted mb-5">
                              {entry.description}
                            </p>
                          )}

                          {/* Tags */}
                          {entry.activities && entry.activities.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {entry.activities.map((a) => <Badge key={a}>{a}</Badge>)}
                            </div>
                          )}

                          {/* Page number */}
                          <div className="mt-8 text-center text-xs text-muted-foreground italic">
                            — Page {currentPage + 1} of {EDUCATION.length} —
                          </div>
                        </div>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation — bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-border bg-card-solid/80 backdrop-blur-sm px-6 py-3">
              <button
                onClick={prevPage}
                disabled={currentPage === -1}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-muted transition-all hover:text-foreground hover:bg-background disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={14} />
                {currentPage === 0 ? 'Index' : 'Previous'}
              </button>

              {/* Quick page dots */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => goToPage(-1)}
                  className={`flex items-center justify-center p-1.5 rounded text-[10px] font-bold transition-colors ${currentPage === -1 ? 'text-accent' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <BookOpen size={12} />
                </button>
                {EDUCATION.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className="flex items-center justify-center p-1.5"
                    aria-label={`Page ${i + 1}`}
                  >
                    <span className={`block h-1.5 rounded-full transition-all duration-300 ${currentPage === i ? 'w-5 bg-accent' : 'w-1.5 bg-border hover:bg-muted-foreground'}`} />
                  </button>
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === EDUCATION.length - 1}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-muted transition-all hover:text-foreground hover:bg-background disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Instruction */}
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Click a chapter in the index or use arrows to flip pages
        </p>
      </div>
    </section>
  );
};

export default Education;
