'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import BookCover3D from './book-cover-3d';

// Dynamic import for HTMLFlipBook (needs window)
const EducationBook = dynamic(() => import('./education-book'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="h-8 w-8 mx-auto rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin" />
        <p className="mt-3 text-xs" style={{ color: '#8b7355' }}>Opening book...</p>
      </div>
    </div>
  ),
});

type Phase = 'closed' | 'opening' | 'open';

const EducationPhaseController = () => {
  const [phase, setPhase] = useState<Phase>('closed');

  const handleOpen = useCallback(() => {
    setPhase('opening');
    // After cover animation, transition to open
    setTimeout(() => setPhase('open'), 800);
  }, []);

  // Reduced motion: skip straight to open
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced && phase === 'closed') {
    return <EducationBook />;
  }

  return (
    <AnimatePresence mode="wait">
      {phase === 'closed' && (
        <motion.div
          key="closed"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
        >
          <BookCover3D onOpen={handleOpen} />
        </motion.div>
      )}

      {phase === 'opening' && (
        <motion.div
          key="opening"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, rotateY: -160 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        >
          <BookCover3D onOpen={() => {}} />
        </motion.div>
      )}

      {phase === 'open' && (
        <motion.div
          key="open"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <EducationBook />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EducationPhaseController;
