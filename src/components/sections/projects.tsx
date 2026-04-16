'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Lock, Star, Building2, User } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import Badge from '@/components/ui/badge';
import { PROJECTS } from '@/data/projects';
import { SECTION_IDS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

type Category = 'all' | 'professional' | 'personal';

const FILTERS: { label: string; value: Category; icon: React.ReactNode }[] = [
  { label: 'All', value: 'all', icon: null },
  { label: 'Professional', value: 'professional', icon: <Building2 size={14} /> },
  { label: 'Personal', value: 'personal', icon: <User size={14} /> },
];

const CATEGORY_ACCENT = {
  professional: '#7C3AED',
  personal: '#059669',
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const accent = CATEGORY_ACCENT[project.category];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className="group relative h-full rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden card-premium">
        <div className="h-1" style={{ background: accent }} />
        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg text-xs" style={{ backgroundColor: accent + '15', color: accent }}>
                {project.category === 'professional' ? <Building2 size={14} /> : <User size={14} />}
              </div>
              <div>
                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: accent }}>
                  {project.category}
                </span>
                <h3 className="font-display text-lg font-bold text-foreground">{project.title}</h3>
              </div>
            </div>
            {project.highlight && (
              <div className="hidden sm:flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold" style={{ backgroundColor: accent + '12', color: accent }}>
                <Star size={10} />
                {project.highlight}
              </div>
            )}
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 5).map((tag) => <Badge key={tag}>{tag}</Badge>)}
            {project.tech.length > 5 && <span className="text-xs text-muted-foreground">+{project.tech.length - 5}</span>}
          </div>

          <div className="mt-4 border-t border-border pt-3">
            {project.links.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {project.links.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium transition-all hover:underline underline-offset-4" style={{ color: accent }}>
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
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const filtered = activeFilter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id={SECTION_IDS.projects} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-diagonal opacity-15" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background via-transparent to-background" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading title="Projects" subtitle="From founding a SaaS platform to building real-time apps" accent="#A78BFA" />

        {/* Filter tabs */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-1.5">
            {FILTERS.map((filter) => (
              <button key={filter.value} onClick={() => setActiveFilter(filter.value)} aria-pressed={activeFilter === filter.value}
                className={cn(
                  'flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all sm:px-5',
                  activeFilter === filter.value ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-muted hover:text-foreground'
                )}>
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
