'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowRight, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/button';
import { CONTACT_INFO, FORMSPREE_ENDPOINT, INSTAGRAM_URL } from '@/data/personal';
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

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const Contact = () => {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setFormStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <section id={SECTION_IDS.contact} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-accent/5 via-transparent to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-20" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Drop me a <span className="text-gradient">line</span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full" style={{ background: 'linear-gradient(to right, var(--gradient-1), var(--gradient-2))' }} />
          <p className="mx-auto mt-4 max-w-md text-[15px] text-muted">
            Got an idea, a project, or just want to say hi? Fill in the form and I&apos;ll get back to you.
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          {/* Left: Info + Socials */}
          <div className="space-y-6">
            {/* Email */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
              className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-muted border border-accent/10">
                <Mail size={20} className="text-accent" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</p>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-base font-semibold text-foreground transition-colors hover:text-accent">{CONTACT_INFO.email}</a>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-muted border border-accent/10">
                <MapPin size={20} className="text-accent" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Location</p>
                <p className="text-base font-semibold text-foreground">{CONTACT_INFO.location}</p>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}
              className="pt-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Connect</p>
              <div className="flex gap-3">
                <a href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all duration-300 hover:border-accent/30 hover:text-accent hover:-translate-y-1 hover:shadow-lg">
                  <LinkedinIcon />
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all duration-300 hover:border-pink-500/30 hover:text-pink-500 hover:-translate-y-1 hover:shadow-lg">
                  <InstagramIcon />
                </a>
                <a href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all duration-300 hover:border-accent/30 hover:text-accent hover:-translate-y-1 hover:shadow-lg">
                  <GithubIcon />
                </a>
              </div>
            </motion.div>

            {/* Resume CTA */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 }}
              className="pt-4">
              <Button href={CONTACT_INFO.resumeUrl} size="lg" className="group hover-glow w-full sm:w-auto">
                Get My Resume
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>

          {/* Right: Contact Form */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 sm:p-8">

            {formStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 mb-4">
                  <CheckCircle size={32} className="text-emerald-500" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">Message sent!</h3>
                <p className="mt-2 text-sm text-muted">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                <button onClick={() => setFormStatus('idle')} className="mt-6 text-sm text-accent hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">Your Name</label>
                  <input type="text" id="name" name="name" required
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
                    placeholder="John Doe" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Your Email</label>
                  <input type="email" id="email" name="_replyto" required
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all"
                    placeholder="john@example.com" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                  <textarea id="message" name="message" required rows={4}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all resize-none"
                    placeholder="Tell me about your project or just say hi..." />
                </div>

                {/* Honeypot for spam */}
                <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                {formStatus === 'error' && (
                  <div className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    <AlertCircle size={16} />
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}

                <button type="submit" disabled={formStatus === 'sending'}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
                  {formStatus === 'sending' ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
