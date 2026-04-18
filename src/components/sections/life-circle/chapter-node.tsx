'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Chapter } from '@/types/life-circle';

interface ChapterNodeProps {
  chapter: Chapter;
  x: number;
  y: number;
  onClick: () => void;
  delay: number;
}

const ChapterNode = ({ chapter, x, y, onClick, delay }: ChapterNodeProps) => {
  const [hovered, setHovered] = useState(false);
  const r = 28;

  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, type: 'spring', stiffness: 200 }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    >
      <g
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        aria-label={`Chapter ${chapter.number}: ${chapter.title} — ${chapter.teaser}`}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
      >
        {/* Glow */}
        {hovered && (
          <circle cx={x} cy={y} r={r + 12} fill={chapter.accentColor} opacity={0.15} />
        )}

        {/* Main circle */}
        <motion.circle
          cx={x} cy={y} r={r}
          fill={chapter.accentColor + '20'}
          stroke={chapter.accentColor}
          strokeWidth={hovered ? 2.5 : 1.5}
          animate={{ scale: hovered ? 1.15 : 1 }}
          style={{ transformOrigin: `${x}px ${y}px` }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />

        {/* Chapter 12: shimmer animation */}
        {chapter.isUnknown && (
          <motion.circle
            cx={x} cy={y} r={r}
            fill="none"
            stroke={chapter.accentColor}
            strokeWidth={1}
            opacity={0.5}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: `${x}px ${y}px` }}
          />
        )}

        {/* Chapter initial as icon placeholder */}
        <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={chapter.accentColor}>
          {chapter.title.charAt(0)}
        </text>

        {/* Chapter number below */}
        <text x={x} y={y + r + 16} textAnchor="middle" fontSize="10" fontWeight="600" fill={chapter.accentColor} opacity={hovered ? 1 : 0.6}>
          {chapter.number}
        </text>
      </g>

      {/* Tooltip on hover */}
      {hovered && (
        <foreignObject x={x - 80} y={y - r - 50} width={160} height={40}>
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg bg-card-solid border border-border px-3 py-1.5 text-center shadow-lg"
          >
            <p className="text-[10px] font-semibold text-foreground truncate">{chapter.title}</p>
            <p className="text-[9px] text-muted-foreground truncate">{chapter.teaser}</p>
          </motion.div>
        </foreignObject>
      )}
    </motion.g>
  );
};

export default ChapterNode;
