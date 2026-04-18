'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Chapter } from '@/types/life-circle';

interface CircleVisualProps {
  chapters: Chapter[];
  onSelectChapter: (id: number) => void;
}

const CX = 500;
const CY = 500;

// Pre-generated star positions (deterministic)
const STARS = Array.from({ length: 60 }, (_, i) => ({
  cx: 50 + ((i * 137.508) % 900),
  cy: 50 + ((i * 251.731) % 900),
  r: 0.5 + (i % 5) * 0.3,
  opacity: 0.1 + (i % 4) * 0.04,
}));

// Each planet has a different orbit radius and speed
const ORBIT_CONFIG = [
  { radius: 120, speed: 40, size: 14 },  // Ch 1 — closest, fastest
  { radius: 155, speed: 48, size: 15 },
  { radius: 190, speed: 56, size: 14 },
  { radius: 225, speed: 64, size: 16 },
  { radius: 260, speed: 72, size: 15 },
  { radius: 290, speed: 80, size: 13 },
  { radius: 320, speed: 88, size: 17 },
  { radius: 348, speed: 96, size: 16 },
  { radius: 375, speed: 104, size: 18 }, // Ch 9 — Aerem, large
  { radius: 400, speed: 112, size: 15 },
  { radius: 425, speed: 120, size: 16 },
  { radius: 455, speed: 130, size: 20 }, // Ch 12 — Unknown, largest
];

const CircleVisual = ({ chapters, onSelectChapter }: CircleVisualProps) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="relative mx-auto" style={{ maxWidth: 700, aspectRatio: '1' }}>
      <svg viewBox="0 0 1000 1000" className="w-full h-full">
        {/* Stars background */}
        {STARS.map((star, i) => (
          <circle key={`star-${i}`} cx={star.cx} cy={star.cy} r={star.r} fill="var(--foreground)" opacity={star.opacity} />
        ))}

        {/* Orbit rings */}
        {ORBIT_CONFIG.map((orbit, i) => (
          <motion.circle
            key={`orbit-${i}`}
            cx={CX} cy={CY}
            r={orbit.radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth={0.5}
            strokeDasharray="4 6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          />
        ))}

        {/* Sun — SONU at center */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 150 }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          {/* Sun glow */}
          <circle cx={CX} cy={CY} r={55} fill="var(--accent)" opacity={0.06} />
          <circle cx={CX} cy={CY} r={42} fill="var(--accent)" opacity={0.1} />
          {/* Sun body */}
          <circle cx={CX} cy={CY} r={32} fill="var(--accent)" opacity={0.15} stroke="var(--accent)" strokeWidth={1.5} />
          {/* Sun label */}
          <text x={CX} y={CY - 4} textAnchor="middle" className="font-display" fontSize="16" fontWeight="800" fill="var(--accent)">
            SONU
          </text>
          <text x={CX} y={CY + 12} textAnchor="middle" fontSize="7" fill="var(--muted-foreground)">
            Click a planet
          </text>
        </motion.g>

        {/* Planets — orbiting */}
        {chapters.map((chapter, i) => {
          const config = ORBIT_CONFIG[i];
          const isHovered = hoveredId === chapter.id;
          const planetSize = isHovered ? config.size * 1.4 : config.size;

          // Starting angle offset so planets are spread out
          const startAngle = (i / 12) * 360 + i * 17;

          return (
            <motion.g
              key={chapter.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              style={{
                transformOrigin: `${CX}px ${CY}px`,
                animation: `spin-slow ${config.speed}s linear infinite`,
              }}
            >
              {/* Planet positioned on orbit */}
              <g
                transform={`rotate(${startAngle} ${CX} ${CY})`}
                onClick={() => onSelectChapter(chapter.id)}
                onMouseEnter={() => setHoveredId(chapter.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                aria-label={`Chapter ${chapter.number}: ${chapter.title}`}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectChapter(chapter.id); }}
              >
                {/* Planet glow on hover */}
                {isHovered && (
                  <circle cx={CX} cy={CY - config.radius} r={planetSize + 8} fill={chapter.accentColor} opacity={0.2} />
                )}

                {/* Planet body */}
                <circle
                  cx={CX} cy={CY - config.radius}
                  r={planetSize}
                  fill={chapter.accentColor + '30'}
                  stroke={chapter.accentColor}
                  strokeWidth={isHovered ? 2 : 1}
                />

                {/* Planet label — counter-rotate so text stays upright */}
                <g transform={`rotate(${-startAngle} ${CX} ${CY - config.radius})`}>
                  <text
                    x={CX} y={CY - config.radius + 4}
                    textAnchor="middle"
                    fontSize={isHovered ? '10' : '8'}
                    fontWeight="700"
                    fill={chapter.accentColor}
                  >
                    {chapter.number}
                  </text>
                </g>

                {/* Chapter 12: shimmer ring */}
                {chapter.isUnknown && (
                  <circle
                    cx={CX} cy={CY - config.radius}
                    r={planetSize + 4}
                    fill="none"
                    stroke={chapter.accentColor}
                    strokeWidth={0.8}
                    opacity={0.4}
                    strokeDasharray="3 3"
                  />
                )}
              </g>

              {/* Tooltip on hover */}
              {isHovered && (
                <g transform={`rotate(${startAngle} ${CX} ${CY})`}>
                  <g transform={`rotate(${-startAngle} ${CX} ${CY - config.radius - planetSize - 20})`}>
                    <foreignObject
                      x={CX - 75} y={CY - config.radius - planetSize - 48}
                      width={150} height={40}
                    >
                      <div className="rounded-lg bg-card-solid border border-border px-3 py-1.5 text-center shadow-lg">
                        <p className="text-[10px] font-semibold text-foreground truncate">{chapter.title}</p>
                        <p className="text-[8px] text-muted-foreground truncate">{chapter.era}</p>
                      </div>
                    </foreignObject>
                  </g>
                </g>
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
};

export default CircleVisual;
