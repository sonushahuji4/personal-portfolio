'use client';

import { motion } from 'framer-motion';
import type { Chapter } from '@/types/life-circle';
import ChapterNode from './chapter-node';

interface CircleVisualProps {
  chapters: Chapter[];
  onSelectChapter: (id: number) => void;
}

const CX = 500;
const CY = 500;
const RADIUS = 380;

const CircleVisual = ({ chapters, onSelectChapter }: CircleVisualProps) => {
  return (
    <svg viewBox="0 0 1000 1000" className="w-full max-w-2xl mx-auto" aria-hidden="false">
      {/* Background concentric circles */}
      {[320, 280, 240].map((r) => (
        <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke="var(--border)" strokeWidth={0.5} opacity={0.3} />
      ))}

      {/* Main ring — draws in on scroll */}
      <motion.circle
        cx={CX} cy={CY} r={RADIUS}
        fill="none"
        stroke="var(--border)"
        strokeWidth={1}
        strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* Center text */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <text x={CX} y={CY - 8} textAnchor="middle" className="font-display" fontSize="32" fontWeight="800" fill="var(--foreground)">
          SONU
        </text>
        <text x={CX} y={CY + 18} textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">
          Click a chapter to open
        </text>
      </motion.g>

      {/* Chapter nodes */}
      {chapters.map((chapter, i) => {
        const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
        const x = CX + RADIUS * Math.cos(angle);
        const y = CY + RADIUS * Math.sin(angle);
        return (
          <ChapterNode
            key={chapter.id}
            chapter={chapter}
            x={x}
            y={y}
            onClick={() => onSelectChapter(chapter.id)}
            delay={0.3 + i * 0.1}
          />
        );
      })}
    </svg>
  );
};

export default CircleVisual;
