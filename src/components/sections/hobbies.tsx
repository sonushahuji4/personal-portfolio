'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Guitar, Piano, Target, Medal, Dumbbell, Code, Lightbulb, Puzzle, Globe, Volume2, VolumeX, Music, Trophy, Cpu } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import { HOBBIES } from '@/data/hobbies';
import { SECTION_IDS } from '@/lib/constants';
import { HOBBY_SOUNDS } from '@/hooks/use-sound';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Guitar, Piano, Target, Medal, Dumbbell, Code, Lightbulb, Puzzle, Globe,
};

const ZONES = [
  {
    id: 'Tech',
    label: 'Tech Zone',
    icon: Cpu,
    emoji: '💻',
    gradient: 'from-cyan-900/30 via-blue-900/20 to-background',
    accentColor: '#06B6D4',
    pattern: 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.06) 0%, transparent 50%)',
    description: 'Beyond work — solving problems for the love of it.',
  },
  {
    id: 'Sports',
    label: 'Sports Zone',
    icon: Trophy,
    emoji: '⚡',
    gradient: 'from-amber-900/30 via-orange-900/20 to-background',
    accentColor: '#F59E0B',
    pattern: 'radial-gradient(circle at 70% 60%, rgba(245, 158, 11, 0.08) 0%, transparent 50%), radial-gradient(circle at 30% 40%, rgba(239, 68, 68, 0.05) 0%, transparent 40%)',
    description: 'Team sports keep me sharp, competitive, and energized.',
  },
  {
    id: 'Music',
    label: 'Music & Chill',
    icon: Music,
    emoji: '🎵',
    gradient: 'from-purple-900/30 via-pink-900/20 to-background',
    accentColor: '#D946EF',
    pattern: 'radial-gradient(circle at 20% 50%, rgba(217, 70, 239, 0.08) 0%, transparent 50%)',
    description: 'Sound On: Finding rhythm in the chaos.',
  },
];

const Hobbies = () => {
  const [activeZone, setActiveZone] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeHobby, setActiveHobby] = useState<string | null>(null);

  const zone = ZONES[activeZone];
  const items = HOBBIES.filter((h) => h.category === zone.id);

  const handleHover = (hobbyName: string) => {
    if (soundEnabled && HOBBY_SOUNDS[hobbyName]) {
      HOBBY_SOUNDS[hobbyName]();
    }
    setActiveHobby(hobbyName);
  };

  return (
    <section id={SECTION_IDS.hobbies} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Animated zone background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={zone.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={`pointer-events-none absolute inset-0 bg-linear-to-b ${zone.gradient}`}
          style={{ backgroundImage: zone.pattern }}
          aria-hidden="true"
        />
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <SectionHeading title="Beyond Code" subtitle="Step into my world outside of engineering" accent={zone.accentColor} />

        {/* Zone selector */}
        <div className="mb-8 flex flex-col items-center gap-4">
          <div className="flex gap-2">
            {ZONES.map((z, i) => {
              const ZIcon = z.icon;
              return (
                <button
                  key={z.id}
                  onClick={() => { setActiveZone(i); setActiveHobby(null); }}
                  className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                    activeZone === i
                      ? 'text-white shadow-xl scale-105'
                      : 'text-muted bg-card/50 border border-border hover:text-foreground hover:border-border-hover'
                  }`}
                  style={activeZone === i ? { backgroundColor: z.accentColor, boxShadow: `0 8px 24px ${z.accentColor}30` } : {}}
                >
                  <ZIcon size={18} />
                  {z.label}
                </button>
              );
            })}
          </div>

          {/* Sound toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 rounded-full border border-border bg-card/50 px-3 py-1.5 text-xs text-muted transition-all hover:text-foreground"
            aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
          >
            {soundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
            {soundEnabled ? 'Sound On' : 'Sound Off'}
          </button>
        </div>

        {/* Zone description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={zone.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-10 text-center text-sm text-muted"
          >
            {zone.description}
          </motion.p>
        </AnimatePresence>

        {/* Hobby items for active zone */}
        <AnimatePresence mode="wait">
          <motion.div
            key={zone.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {items.map((hobby, i) => {
              const Icon = ICON_MAP[hobby.icon];
              const isActive = activeHobby === hobby.name;
              return (
                <motion.div
                  key={hobby.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  role="button"
                  tabIndex={0}
                  onMouseEnter={() => handleHover(hobby.name)}
                  onMouseLeave={() => setActiveHobby(null)}
                  onFocus={() => handleHover(hobby.name)}
                  onBlur={() => setActiveHobby(null)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleHover(hobby.name); }}
                  className="group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-2xl"
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1.08 : 1,
                      boxShadow: isActive ? `0 8px 32px ${zone.accentColor}25` : '0 0 0 transparent',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 transition-all duration-300"
                    style={{
                      borderColor: isActive ? zone.accentColor + '40' : undefined,
                      minWidth: 120,
                    }}
                  >
                    <motion.div
                      animate={isActive ? { rotate: [0, -8, 8, -4, 4, 0] } : {}}
                      transition={{ duration: 0.5 }}
                      className="flex h-14 w-14 items-center justify-center rounded-xl transition-colors"
                      style={{ backgroundColor: isActive ? zone.accentColor + '20' : zone.accentColor + '08' }}
                    >
                      {Icon && <Icon size={24} className="text-accent" />}
                    </motion.div>
                    <span className="text-sm font-semibold text-foreground">{hobby.name}</span>

                    {/* Sound equalizer */}
                    {isActive && soundEnabled && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-0.5 h-4"
                      >
                        {[1, 2, 3, 4].map((bar) => (
                          <motion.div
                            key={bar}
                            className="w-0.5 rounded-full"
                            style={{ backgroundColor: zone.accentColor }}
                            animate={{ height: [4, 14, 6, 12, 4] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: bar * 0.08 }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hobbies;
