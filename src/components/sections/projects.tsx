'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Lock, Star } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import Badge from '@/components/ui/badge';
import { PROJECTS } from '@/data/projects';
import { SECTION_IDS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

type Category = 'all' | 'professional' | 'personal';

const FILTERS: { label: string; value: Category }[] = [
  { label: 'All Projects', value: 'all' },
  { label: 'Professional', value: 'professional' },
  { label: 'Personal', value: 'personal' },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
  >
    <div className="gradient-border group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold text-foreground group-hover:text-gradient transition-all">
          {project.title}
        </h3>
        {project.highlight && (
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-secondary-muted px-2.5 py-0.5 text-xs font-medium text-secondary border border-secondary/15">
            <Star size={10} />
            {project.highlight}
          </div>
        )}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.map((tag) => <Badge key={tag}>{tag}</Badge>)}
      </div>

      <div className="mt-5 border-t border-border pt-4">
        {project.links.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-accent transition-all hover:text-accent-hover hover:underline underline-offset-4">
                <ExternalLink size={13} /> {link.label}
              </a>
            ))}
          </div>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock size={11} /> Proprietary
          </span>
        )}
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const filtered = activeFilter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id={SECTION_IDS.projects} className="section-alt relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 noise-overlay" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading title="Projects" subtitle="Professional work and personal side projects" />

        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-2xl border border-border bg-card p-1.5">
            {FILTERS.map((filter) => (
              <button key={filter.value} onClick={() => setActiveFilter(filter.value)} aria-pressed={activeFilter === filter.value}
                className={cn(
                  'rounded-xl px-5 py-2.5 text-sm font-medium transition-all',
                  activeFilter === filter.value ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-muted hover:text-foreground'
                )}>
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
