'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import Card from '@/components/ui/card';
import { PLATFORMS } from '@/data/platforms';
import { SECTION_IDS } from '@/lib/constants';

const Platforms = () => {
  return (
    <section id={SECTION_IDS.platforms} className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Online Platforms"
          subtitle="Competitive programming profiles and developer presence"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORMS.map((platform, i) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full">
                <div className="mb-4 flex items-center justify-between">
                  <h3
                    className="font-display text-lg font-bold"
                    style={{ color: platform.color }}
                  >
                    {platform.name}
                  </h3>
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${platform.name} profile`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
                <p className="mb-4 text-xs text-muted-foreground">@{platform.username}</p>
                <div className="space-y-3">
                  {platform.stats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="text-xs text-muted">{stat.label}</span>
                      <span className="text-sm font-semibold text-foreground">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platforms;
