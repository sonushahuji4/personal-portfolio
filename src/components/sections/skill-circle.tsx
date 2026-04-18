'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Radio, Network, GitBranch, KanbanSquare } from 'lucide-react';
import type { Skill } from '@/data/skills';

const LUCIDE_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Globe, Radio, Network, GitBranch, KanbanSquare,
};

interface SkillCircleProps {
  skill: Skill;
  delay: number;
}

const SkillCircle = ({ skill, delay }: SkillCircleProps) => {
  const [hovered, setHovered] = useState(false);
  const LucideIcon = skill.lucideIcon ? LUCIDE_ICONS[skill.lucideIcon] : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="skill-circle-wrapper flex flex-col items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.15, y: -4 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className="skill-circle relative flex h-13 w-13 items-center justify-center rounded-full cursor-pointer sm:h-13 sm:w-13"
        style={{
          background: hovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${hovered ? 'rgba(167,139,250,0.4)' : 'rgba(255,255,255,0.06)'}`,
          boxShadow: hovered ? '0 0 20px rgba(167,139,250,0.15), 0 0 40px rgba(167,139,250,0.05)' : 'none',
          transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
        }}
        data-dark-logo={skill.isDarkLogo || undefined}
      >
        {skill.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={skill.logoUrl}
            alt={`${skill.name} logo`}
            width={28}
            height={28}
            loading="lazy"
            style={{
              objectFit: 'contain',
              filter: skill.isDarkLogo
                ? (hovered ? 'invert(1) brightness(1.1)' : 'invert(1) brightness(0.85) grayscale(30%)')
                : (hovered ? 'brightness(1.1) grayscale(0%)' : 'brightness(0.85) grayscale(30%)'),
              transition: 'filter 0.3s, transform 0.3s',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
        ) : LucideIcon ? (
          <LucideIcon
            size={22}
            className={`transition-all duration-300 ${hovered ? 'text-accent' : 'text-muted-foreground'}`}
          />
        ) : null}
      </motion.div>

      {/* Label */}
      <span
        className="mt-1.5 text-center leading-tight"
        style={{
          fontSize: '10px',
          maxWidth: '64px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          color: hovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
          transition: 'color 0.3s',
        }}
      >
        {skill.shortName || skill.name}
      </span>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && skill.years && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 rounded-lg px-3 py-1.5 text-center whitespace-nowrap"
            style={{ background: 'rgba(15,15,20,0.9)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
          >
            <span className="text-[11px] font-semibold text-foreground">{skill.name}</span>
            <span className="ml-1.5 text-[10px] text-accent">{skill.years}+ yrs</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SkillCircle;
