'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import { PLATFORMS_DATA } from '@/data/platforms';
import { SECTION_IDS } from '@/lib/constants';
import type { PlatformData } from '@/data/platforms';

const GithubSvg = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z" />
  </svg>
);

const PlatformIcon = ({ icon, color }: { icon: string; color: string }) => {
  const label = icon === 'leetcode' ? 'LC' : icon === 'codechef' ? 'CC' : icon === 'linkedin' ? 'in' : '';

  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white text-[10px] font-bold" style={{ backgroundColor: color }}>
      {icon === 'github' ? <GithubSvg /> : label}
    </div>
  );
};

// ═══ FEATURED CARD (LeetCode) ═══
const FeaturedCard = ({ platform }: { platform: PlatformData }) => (
  <motion.a
    href={platform.url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.01 }}
    className="group block rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden transition-all duration-150 hover:shadow-xl hover:shadow-shadow"
    style={{ borderLeft: `3px solid ${platform.color}` }}
  >
    <div className="p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <PlatformIcon icon={platform.icon} color={platform.color} />
          <div>
            <span className="text-sm font-bold text-foreground">{platform.name}</span>
            <span className="ml-2 text-xs text-muted-foreground">@{platform.username}</span>
          </div>
        </div>
        <ExternalLink size={14} className="text-muted-foreground transition-colors group-hover:text-foreground" />
      </div>

      {/* Big number + badge */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="text-4xl font-extrabold font-display sm:text-[36px]" style={{ color: platform.color }}>
            {platform.primaryStat.value}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            {platform.primaryStat.label} · {platform.description}
          </div>
        </div>
        {platform.badge && (
          <div className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: platform.color + '18', color: platform.color }}>
            {platform.badge.text}
          </div>
        )}
      </div>

      {/* Progress bar */}
      {platform.progress && (
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">{platform.progress.label}</span>
            {platform.secondaryStats?.map((s) => (
              <span key={s.label} className="text-muted-foreground">{s.value} {s.label}</span>
            ))}
          </div>
          <div className="h-1.5 rounded-full bg-border overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${platform.progress.percentage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ backgroundColor: platform.color }}
            />
          </div>
        </div>
      )}
    </div>
  </motion.a>
);

// ═══ ROW CARD (compact) ═══
const RowCard = ({ platform, delay }: { platform: PlatformData; delay: number }) => (
  <motion.a
    href={platform.url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    whileHover={{ scale: 1.02 }}
    className="group flex items-center gap-3 rounded-xl border border-border bg-card/80 backdrop-blur-sm px-4 py-3.5 sm:px-5 transition-all duration-150 hover:shadow-lg hover:shadow-shadow"
    style={{ borderLeft: `3px solid ${platform.color}` }}
  >
    <PlatformIcon icon={platform.icon} color={platform.color} />

    <div className="min-w-0 flex-1">
      <div className="text-sm font-semibold text-foreground">{platform.name}</div>
      <div className="text-xs text-muted-foreground truncate">{platform.description}</div>
    </div>

    <div className="text-right shrink-0">
      <div className="text-xl font-bold text-foreground sm:text-[22px]">{platform.primaryStat.value}</div>
      <div className="text-[10px] text-muted-foreground">{platform.primaryStat.label}</div>
    </div>

    <ExternalLink size={13} className="shrink-0 text-muted-foreground/50 transition-colors group-hover:text-foreground ml-1" />
  </motion.a>
);

// ═══ SECTION ═══
const Platforms = () => {
  const featured = PLATFORMS_DATA.find((p) => p.featured);
  const rows = PLATFORMS_DATA.filter((p) => !p.featured);

  return (
    <section id={SECTION_IDS.platforms} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-15" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-xl px-4 sm:px-6">
        <SectionHeading title="Online Presence" subtitle="Where I build, compete, and connect" accent="#EF9F27" />

        <div className="space-y-2">
          {/* Featured card */}
          {featured && <FeaturedCard platform={featured} />}

          {/* Compact stack */}
          {rows.map((platform, i) => (
            <RowCard key={platform.id} platform={platform} delay={0.1 + i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platforms;
