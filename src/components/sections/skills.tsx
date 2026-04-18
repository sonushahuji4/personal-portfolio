'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/section-heading';
import SkillCircle from './skill-circle';
import { SKILL_CATEGORIES, SKILLS } from '@/data/skills';
import { SECTION_IDS } from '@/lib/constants';

const Skills = () => {
  return (
    <section id={SECTION_IDS.skills} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-15" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading title="Tech Stack" subtitle="Tools I build with every day" accent="#A78BFA" />

        {/* Categorized grid — hover one category, others dim */}
        <div className="skills-container grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((category, ci) => {
            const categorySkills = SKILLS.filter((s) => s.category === category.id);
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: ci * 0.1 }}
                className="skill-category"
              >
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {categorySkills.map((skill, si) => (
                    <SkillCircle
                      key={skill.id}
                      skill={skill}
                      delay={ci * 0.1 + si * 0.05}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Category focus effect — hover one, others dim */}
      <style jsx global>{`
        .skills-container:hover .skill-category {
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }
        .skills-container:hover .skill-category:hover {
          opacity: 1;
        }
        .skill-category {
          transition: opacity 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default Skills;
