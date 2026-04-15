'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Lock } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import Card from '@/components/ui/card';
import Badge from '@/components/ui/badge';
import { PROJECTS } from '@/data/projects';
import { SECTION_IDS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

type Category = 'all' | 'professional' | 'personal';

const FILTERS: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Professional', value: 'professional' },
  { label: 'Personal', value: 'personal' },
];

const ProjectCard = ({ project }: { project: Project }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3 }}
  >
    <Card gradient className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-lg font-bold text-foreground">{project.title}</h3>
        {project.highlight && (
          <span className="shrink-0 rounded-full bg-accent-muted px-2.5 py-0.5 text-xs font-medium text-accent border border-accent/15">
            {project.highlight}
          </span>
        )}
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <div className="mt-4 border-t border-border pt-4">
        {project.links.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-hover"
              >
                <ExternalLink size={13} />
                {link.label}
              </a>
            ))}
          </div>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock size={12} />
            Proprietary — source not available
          </span>
        )}
      </div>
    </Card>
  </motion.div>
);

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<Category>('all');

  const filtered = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id={SECTION_IDS.projects} className="section-alt py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Projects"
          subtitle="Professional work and personal side projects"
        />

        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-xl border border-border bg-card p-1">
            {FILTERS.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                aria-pressed={activeFilter === filter.value}
                className={cn(
                  'rounded-lg px-5 py-2 text-sm font-medium transition-all',
                  activeFilter === filter.value
                    ? 'bg-accent text-white shadow-sm shadow-accent/20'
                    : 'text-muted hover:text-foreground'
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
