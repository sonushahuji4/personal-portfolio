'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Sparkles, BookOpen, Mountain, Cpu, Smartphone, CloudRain, Globe, DoorOpen, Sun, Brain, Coffee, Infinity } from 'lucide-react';
import type { Chapter } from '@/types/life-circle';
import UnknownChapterCta from './unknown-chapter-cta';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Sparkles, BookOpen, Mountain, Cpu, Smartphone, CloudRain, Globe, DoorOpen, Sun, Brain, Coffee, Infinity,
};

interface ChapterModalProps {
  chapter: Chapter | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const ChapterModal = ({ chapter, isOpen, onClose, onPrev, onNext, hasPrev, hasNext }: ChapterModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    contentRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!chapter) return null;
  const Icon = ICON_MAP[chapter.icon];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chapter-title"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" style={{ background: `linear-gradient(135deg, ${chapter.accentColor}15, transparent, ${chapter.accentColor}10)` }} />
          <div className="absolute inset-0 bg-black/70" />

          {/* Content */}
          <motion.div
            ref={contentRef}
            tabIndex={-1}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 w-full max-w-170 max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-card-solid p-8 sm:p-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button onClick={onClose} className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:text-foreground hover:bg-card" aria-label="Close">
              <X size={20} />
            </button>

            {/* Chapter number */}
            <div className="text-6xl font-extrabold font-display tracking-tight sm:text-7xl" style={{ color: chapter.accentColor + '30' }}>
              {chapter.number}
            </div>

            {/* Icon */}
            {Icon && (
              <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: chapter.accentColor + '15' }}>
                <Icon size={24} className="text-accent" />
              </div>
            )}

            {/* Title */}
            <h3 id="chapter-title" className="mt-4 font-display text-2xl font-bold text-foreground sm:text-3xl">
              {chapter.title}
            </h3>

            {/* Era */}
            <p className="mt-1 text-sm text-muted-foreground">{chapter.era}</p>

            {/* Story */}
            <div className="mt-6 space-y-4">
              {chapter.story.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-[15px] leading-[1.8] text-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Chapter 12 CTA */}
            {chapter.isUnknown && (
              <div className="mt-8">
                <UnknownChapterCta onClose={onClose} accentColor={chapter.accentColor} />
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
              <button
                onClick={onPrev}
                disabled={!hasPrev}
                className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-muted transition-all hover:text-foreground hover:bg-card disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} /> Previous
              </button>
              <span className="text-xs text-muted-foreground">{chapter.number} / 12</span>
              <button
                onClick={onNext}
                disabled={!hasNext}
                className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-muted transition-all hover:text-foreground hover:bg-card disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChapterModal;
