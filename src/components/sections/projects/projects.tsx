'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Building2, User } from 'lucide-react';
import Image from 'next/image';
import SectionHeading from '@/components/ui/section-heading';
import Badge from '@/components/ui/badge';
import { PROJECTS } from '@/data/projects';
import { SECTION_IDS } from '@/lib/constants';
import { cn } from '@/lib/utils';

type Filter = 'all' | 'professional' | 'personal';

const FILTERS: { label: string; value: Filter; count: number }[] = [
  { label: 'All Projects', value: 'all', count: PROJECTS.length },
  { label: 'Professional', value: 'professional', count: PROJECTS.filter(p => p.category === 'professional').length },
  { label: 'Personal', value: 'personal', count: PROJECTS.filter(p => p.category === 'personal').length },
];

const Projects = () => {
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState(0);

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);
  const current = filtered[selected] || filtered[0];

  const handleFilterChange = (f: Filter) => {
    setFilter(f);
    setSelected(0);
  };

  return (
    <section id={SECTION_IDS.projects} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-10" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading title="Projects" subtitle="Work that made an impact" accent="#7C3AED" />

        {/* Category tabs — like "Collection 3 · 18 watches" */}
        <div className="flex justify-center gap-3 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => handleFilterChange(f.value)}
              className={cn(
                'flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300',
                filter === f.value
                  ? 'bg-accent text-white shadow-lg shadow-accent/20'
                  : 'border border-border bg-card/50 text-muted hover:text-foreground hover:border-border-hover'
              )}
            >
              {f.value === 'professional' && <Building2 size={14} />}
              {f.value === 'personal' && <User size={14} />}
              {f.label}
              <span className={cn(
                'rounded-full px-2 py-0.5 text-xs',
                filter === f.value ? 'bg-white/20' : 'bg-border'
              )}>{f.count}</span>
            </button>
          ))}
        </div>

        {/* Featured project showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden mb-8"
          >
            <div className="grid md:grid-cols-[1fr_1.2fr]">
              {/* Left — project identity */}
              <div className="p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border">
                <div>
                  {/* Company + role */}
                  <div className="flex items-center gap-3 mb-4">
                    {current.companyLogo ? (
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden bg-white border border-border">
                        <Image src={current.companyLogo} alt={current.company} width={28} height={28} className="object-contain" unoptimized />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-muted">
                        <User size={18} className="text-accent" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-foreground">{current.company}</p>
                      <p className="text-xs text-muted-foreground">{current.role} · {current.period}</p>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl font-bold text-foreground leading-tight sm:text-3xl">
                    {current.title}
                  </h3>

                  {/* Category badge */}
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium" style={{
                    background: current.category === 'professional' ? 'rgba(124,58,237,0.1)' : 'rgba(5,150,105,0.1)',
                    color: current.category === 'professional' ? '#7C3AED' : '#059669',
                  }}>
                    {current.category === 'professional' ? <Building2 size={12} /> : <User size={12} />}
                    {current.category}
                  </div>
                </div>

                {/* External link */}
                {current.url && (
                  <a href={current.url} target="_blank" rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm text-accent font-medium hover:underline underline-offset-4">
                    <ExternalLink size={14} /> View Source
                  </a>
                )}
              </div>

              {/* Right — details */}
              <div className="p-6 sm:p-8">
                {/* Description */}
                <p className="text-sm leading-relaxed text-muted mb-6">{current.description}</p>

                {/* Impact metrics */}
                {current.impact.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    {current.impact.map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-center rounded-xl bg-background/50 border border-border/50 py-3 px-2"
                      >
                        <div className="text-xl font-bold text-foreground">{stat.value}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {current.tech.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Project cards carousel — bottom row */}
        <div className="relative">
          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
            {filtered.map((project, i) => (
              <button
                key={project.id}
                onClick={() => setSelected(i)}
                className={cn(
                  'shrink-0 rounded-xl border p-4 text-left transition-all duration-300 min-w-48',
                  selected === i
                    ? 'border-accent bg-accent/5 shadow-lg shadow-accent/10'
                    : 'border-border bg-card/50 hover:border-border-hover hover:-translate-y-0.5'
                )}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  {project.companyLogo ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden bg-white border border-border/50">
                      <Image src={project.companyLogo} alt={project.company} width={22} height={22} className="object-contain" unoptimized />
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-muted">
                      <User size={14} className="text-accent" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{project.company}</p>
                    <p className="text-[10px] text-muted-foreground">{project.period}</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-foreground leading-tight truncate">{project.title}</p>
                <p className="text-[10px] text-muted-foreground mt-1 capitalize">{project.category}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
