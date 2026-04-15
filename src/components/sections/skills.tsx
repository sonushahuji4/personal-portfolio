'use client';

import { motion } from 'framer-motion';
import { Monitor, Server, Database, Cloud, Blocks, Lightbulb } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import Card from '@/components/ui/card';
import { SKILL_CATEGORIES } from '@/data/skills';
import { SECTION_IDS } from '@/lib/constants';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Monitor, Server, Database, Cloud, Blocks, Lightbulb,
};

const Skills = () => {
  return (
    <section id={SECTION_IDS.skills} className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Skills"
          subtitle="Technologies and practices I work with"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((category, i) => {
            const Icon = ICON_MAP[category.icon];
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card gradient className="h-full">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-muted">
                      {Icon && <Icon size={18} className="text-accent" />}
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {category.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-muted transition-all hover:border-accent/30 hover:text-accent"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
