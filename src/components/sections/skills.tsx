'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Server, Database, Cloud, Blocks, Lightbulb } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import { SKILL_CATEGORIES } from '@/data/skills';
import { SECTION_IDS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Monitor, Server, Database, Cloud, Blocks, Lightbulb,
};

const CATEGORY_COLORS = ['#A78BFA', '#6EE7B7', '#67E8F9', '#F472B6', '#FCD34D', '#A5B4FC'];

const SkillNode = ({ skill, index, total, color, isHovered, onHover, onLeave }: {
  skill: { name: string; years?: number };
  index: number;
  total: number;
  color: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  // Position nodes in a circle
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  const radius = 140; // px from center
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  const size = isHovered ? 72 : 56;

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: `calc(50% + ${x}px - ${size / 2}px)`, top: `calc(50% + ${y}px - ${size / 2}px)` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      tabIndex={0}
      role="button"
      aria-label={`${skill.name}: ${skill.years || 0} years`}
    >
      <motion.div
        animate={{ scale: isHovered ? 1.15 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="flex flex-col items-center justify-center rounded-full border-2 transition-all duration-300"
        style={{
          width: size, height: size,
          backgroundColor: isHovered ? color + '25' : color + '10',
          borderColor: isHovered ? color : color + '30',
          boxShadow: isHovered ? `0 0 20px ${color}30, 0 0 40px ${color}15` : 'none',
        }}
      >
        <span className="text-xs font-bold" style={{ color, fontSize: isHovered ? 11 : 10 }}>
          {skill.name.length > 8 ? skill.name.slice(0, 7) + '…' : skill.name}
        </span>
        {isHovered && skill.years && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[9px] font-semibold mt-0.5"
            style={{ color }}
          >
            {skill.years}yr{skill.years > 1 ? 's' : ''}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const color = CATEGORY_COLORS[activeTab];

  return (
    <section id={SECTION_IDS.skills} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-20" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading title="Tech Stack" subtitle="Click a category, hover the nodes to see my experience" accent="#A78BFA" />

        {/* Category tabs */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-2 rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-2">
            {SKILL_CATEGORIES.map((cat, i) => {
              const Icon = ICON_MAP[cat.icon];
              const catColor = CATEGORY_COLORS[i];
              return (
                <button
                  key={cat.name}
                  onClick={() => { setActiveTab(i); setHoveredSkill(null); }}
                  aria-pressed={activeTab === i}
                  className={cn(
                    'flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all',
                    activeTab === i ? 'text-white shadow-lg' : 'text-muted hover:text-foreground hover:bg-background/50'
                  )}
                  style={activeTab === i ? { backgroundColor: catColor, boxShadow: `0 4px 14px ${catColor}33` } : {}}
                >
                  {Icon && <Icon size={15} className="shrink-0" />}
                  <span className="text-xs sm:text-sm">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Orbital view — desktop */}
        <div className="hidden sm:block">
          <div className="relative mx-auto" style={{ width: 340, height: 340 }}>
            {/* Orbit rings */}
            <div className="absolute inset-0 rounded-full border border-dashed" style={{ borderColor: color + '15' }} />
            <div className="absolute inset-8 rounded-full border border-dashed" style={{ borderColor: color + '10' }} />

            {/* Center — category name */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              >
                {hoveredSkill ? (
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{hoveredSkill}</div>
                    <div className="text-sm font-semibold" style={{ color }}>
                      {SKILL_CATEGORIES[activeTab].skills.find(s => s.name === hoveredSkill)?.years || 0} years
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color }}>
                      {SKILL_CATEGORIES[activeTab].skills.length}
                    </div>
                    <div className="text-sm text-muted">{SKILL_CATEGORIES[activeTab].name}</div>
                    <div className="text-xs text-muted-foreground mt-1">Hover to explore</div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Skill nodes */}
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} className="absolute inset-0">
                {SKILL_CATEGORIES[activeTab].skills.map((skill, i) => (
                  <SkillNode
                    key={skill.name}
                    skill={skill}
                    index={i}
                    total={SKILL_CATEGORIES[activeTab].skills.length}
                    color={color}
                    isHovered={hoveredSkill === skill.name}
                    onHover={() => setHoveredSkill(skill.name)}
                    onLeave={() => setHoveredSkill(null)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile fallback — grid view */}
        <div className="sm:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-3"
            >
              {SKILL_CATEGORIES[activeTab].skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                  className="flex items-center justify-between rounded-xl border border-border bg-card/80 px-3 py-2.5"
                >
                  <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  {skill.years && (
                    <span className="text-xs font-bold rounded-full px-2 py-0.5" style={{ backgroundColor: color + '15', color }}>
                      {skill.years}yr
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Skills;
