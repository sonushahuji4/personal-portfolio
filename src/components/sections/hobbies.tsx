'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Guitar, Piano, Target, Medal, Dumbbell, Code, Lightbulb, Puzzle, Globe, Volume2, VolumeX } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import { HOBBIES } from '@/data/hobbies';
import { SECTION_IDS } from '@/lib/constants';
import { HOBBY_SOUNDS } from '@/hooks/use-sound';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Guitar, Piano, Target, Medal, Dumbbell, Code, Lightbulb, Puzzle, Globe,
};

const CATEGORY_CONFIG: Record<string, { emoji: string; gradient: string; hoverColor: string }> = {
  Music: { emoji: '🎵', gradient: 'from-pink-500/5 to-purple-500/5', hoverColor: 'hover:border-pink-500/30' },
  Sports: { emoji: '⚡', gradient: 'from-amber-500/5 to-orange-500/5', hoverColor: 'hover:border-amber-500/30' },
  Tech: { emoji: '💻', gradient: 'from-blue-500/5 to-cyan-500/5', hoverColor: 'hover:border-blue-500/30' },
};

const CATEGORIES = ['Music', 'Sports', 'Tech'] as const;

const Hobbies = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeHobby, setActiveHobby] = useState<string | null>(null);

  const handleHover = (hobbyName: string) => {
    if (soundEnabled && HOBBY_SOUNDS[hobbyName]) {
      HOBBY_SOUNDS[hobbyName]();
    }
    setActiveHobby(hobbyName);
  };

  return (
    <section id={SECTION_IDS.hobbies} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Wavy background */}
      <div className="pointer-events-none absolute inset-0 bg-waves" aria-hidden="true" />
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading title="Beyond Code" subtitle="Hover over items to hear them — things that keep me inspired" />

        {/* Sound toggle */}
        <div className="mb-8 flex justify-center">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs text-muted transition-all hover:border-border-hover hover:text-foreground"
            aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            {soundEnabled ? 'Sound On — Hover to play' : 'Sound Off'}
          </button>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {CATEGORIES.map((category, ci) => {
            const items = HOBBIES.filter((h) => h.category === category);
            const config = CATEGORY_CONFIG[category];
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ci * 0.12 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="text-2xl">{config.emoji}</span>
                  <h3 className="font-display text-lg font-bold text-foreground">{category}</h3>
                </div>
                <div className="space-y-2">
                  {items.map((hobby, i) => {
                    const Icon = ICON_MAP[hobby.icon];
                    const isActive = activeHobby === hobby.name;
                    return (
                      <motion.div
                        key={hobby.name}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: ci * 0.12 + i * 0.06 }}
                        role="button"
                        tabIndex={0}
                        onMouseEnter={() => handleHover(hobby.name)}
                        onMouseLeave={() => setActiveHobby(null)}
                        onFocus={() => handleHover(hobby.name)}
                        onBlur={() => setActiveHobby(null)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleHover(hobby.name); }}
                        className={`group flex items-center gap-3 rounded-xl bg-linear-to-r ${config.gradient} border border-transparent p-3.5 cursor-pointer transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${config.hoverColor} hover:-translate-y-0.5 ${isActive ? 'border-accent/30 shadow-lg shadow-accent/5 -translate-y-0.5' : ''}`}
                      >
                        {Icon && (
                          <motion.div
                            animate={isActive ? { rotate: [0, -10, 10, -5, 5, 0], scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            <Icon size={16} className={`shrink-0 transition-colors ${isActive ? 'text-accent' : 'text-muted-foreground group-hover:text-accent'}`} />
                          </motion.div>
                        )}
                        <span className="text-sm font-medium text-foreground">{hobby.name}</span>
                        {isActive && soundEnabled && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="ml-auto flex gap-0.5"
                          >
                            {[1, 2, 3].map((bar) => (
                              <motion.div
                                key={bar}
                                className="w-0.5 rounded-full bg-accent"
                                animate={{ height: [4, 12, 6, 10, 4] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: bar * 0.1 }}
                              />
                            ))}
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
