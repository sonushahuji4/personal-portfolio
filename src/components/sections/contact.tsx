'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, Coffee, MessageCircle, Zap } from 'lucide-react';
import Button from '@/components/ui/button';
import { CONTACT_INFO } from '@/data/personal';
import { SECTION_IDS } from '@/lib/constants';

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const CONTACT_ITEMS = [
  { icon: Mail, label: 'Email', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
  { icon: Phone, label: 'Phone', value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}` },
  { icon: MapPin, label: 'Location', value: CONTACT_INFO.location },
];

const Contact = () => {
  return (
    <section id={SECTION_IDS.contact} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Gradient glow at bottom */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-accent/5 via-transparent to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-20" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        {/* Creative heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 text-accent">
            <Coffee size={20} />
            <span className="text-sm font-medium">Got an idea? A project? Or just want to chat?</span>
          </div>
          <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Drop me a <span className="text-gradient">line</span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full" style={{ background: 'linear-gradient(to right, var(--gradient-1), var(--gradient-2))' }} />
          <p className="mx-auto mt-4 max-w-md text-[15px] text-muted">
            Whether it&apos;s a collaboration, a job opportunity, or feedback on my work — I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Left: Contact methods */}
          <div className="space-y-4">
            {CONTACT_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-4 transition-all duration-300 hover:border-accent/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-muted border border-accent/10 transition-colors group-hover:bg-accent group-hover:text-white group-hover:border-accent">
                    <Icon size={20} className="text-accent group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{item.label}</p>
                    {'href' in item && item.href ? (
                      <a href={item.href} className="text-base font-semibold text-foreground transition-colors hover:text-accent">{item.value}</a>
                    ) : (
                      <p className="text-base font-semibold text-foreground">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Social links */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 }}
              className="flex gap-3 pt-2">
              {[
                { Icon: LinkedinIcon, href: CONTACT_INFO.linkedin, label: 'LinkedIn', color: '#0A66C2' },
                { Icon: GithubIcon, href: CONTACT_INFO.github, label: 'GitHub', color: '#6E40C9' },
              ].map(({ Icon, href, label, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="group flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ ['--hover-color' as string]: color }}>
                  <Icon />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right: Fun CTA card */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="gradient-border flex flex-col items-center justify-center rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-8 text-center">

            {/* Fun animated icons */}
            <div className="mb-6 flex items-center gap-4">
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                <MessageCircle size={28} className="text-accent" />
              </motion.div>
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                <Zap size={32} className="text-secondary" />
              </motion.div>
              <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
                <Coffee size={28} className="text-tertiary" />
              </motion.div>
            </div>

            <h3 className="font-display text-2xl font-bold text-foreground">
              Let&apos;s build something <span className="text-gradient">amazing</span>
            </h3>
            <p className="mt-3 max-w-xs text-sm text-muted">
              Grab a copy of my resume for the full picture — experience, skills, and projects all in one place.
            </p>
            <div className="mt-6">
              <Button href={CONTACT_INFO.resumeUrl} size="lg" className="group hover-glow">
                Get My Resume
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
