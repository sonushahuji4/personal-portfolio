'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ShieldCheck, MessageCircle, BookOpen, ChevronLeft, ChevronRight, ExternalLink, X, Eye } from 'lucide-react';
import Image from 'next/image';
import SectionHeading from '@/components/ui/section-heading';
import { AWARDS, CERTIFICATIONS, COURSE_CERTIFICATES, RECOMMENDATIONS } from '@/data/achievements';
import { SECTION_IDS } from '@/lib/constants';

type Tab = 'awards' | 'certifications' | 'courses' | 'testimonials';

const TABS: { id: Tab; label: string; icon: React.ReactNode; count: number }[] = [
  { id: 'awards', label: 'Awards', icon: <Award size={15} />, count: AWARDS.length },
  { id: 'certifications', label: 'Certifications', icon: <ShieldCheck size={15} />, count: CERTIFICATIONS.length },
  { id: 'courses', label: 'Course Certs', icon: <BookOpen size={15} />, count: COURSE_CERTIFICATES.length },
  { id: 'testimonials', label: 'Testimonials', icon: <MessageCircle size={15} />, count: RECOMMENDATIONS.length },
];

const Achievements = () => {
  const [activeTab, setActiveTab] = useState<Tab>('awards');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  return (
    <section id={SECTION_IDS.achievements} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 noise-overlay" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading title="Achievements & Certificates" subtitle="Awards, certifications, courses, and recommendations" accent="#f59e0b" />

        {/* Tab navigation */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-1.5">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  activeTab === tab.id ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-muted hover:text-foreground'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-xs">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Awards tab — with preview images */}
          {activeTab === 'awards' && (
            <motion.div key="awards" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
              className="grid gap-5 sm:grid-cols-2">
              {AWARDS.map((award, i) => (
                <motion.div key={award.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="group rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden card-premium">
                  {/* Certificate image preview */}
                  {award.imageUrl && (
                    <button onClick={() => setPreviewImage(award.imageUrl || null)} className="relative w-full h-48 overflow-hidden cursor-zoom-in">
                      <Image src={award.imageUrl} alt={award.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
                      <div className="absolute inset-0 bg-linear-to-t from-card-solid/80 to-transparent" />
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
                        <Eye size={12} /> View
                      </div>
                    </button>
                  )}
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{award.title}</p>
                        <p className="text-xs text-muted">{award.issuer}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-500">{award.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Certifications tab */}
          {activeTab === 'certifications' && (
            <motion.div key="certs" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
              className="grid gap-4 sm:grid-cols-3">
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div key={cert.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-5 card-premium">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 mb-3">
                    <ShieldCheck size={20} className="text-emerald-500" />
                  </div>
                  <p className="font-semibold text-foreground">{cert.name}</p>
                  <p className="text-xs text-muted mt-0.5">{cert.issuer} · {cert.date}</p>
                  {cert.certificateUrl && (
                    <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-colors hover:text-accent-hover">
                      <ExternalLink size={12} /> View Certificate
                    </a>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Course certificates tab */}
          {activeTab === 'courses' && (
            <motion.div key="courses" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
              className="grid gap-4 sm:grid-cols-2">
              {COURSE_CERTIFICATES.map((cert, i) => (
                <motion.div key={cert.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  className="flex items-center justify-between rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-5 card-premium">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-muted">
                      <BookOpen size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{cert.name}</p>
                      <p className="text-xs text-muted">{cert.platform}</p>
                    </div>
                  </div>
                  <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-all hover:border-accent/30 hover:text-accent hover:bg-accent-muted"
                    aria-label={`View ${cert.name} certificate`}>
                    <ExternalLink size={14} />
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Testimonials tab */}
          {activeTab === 'testimonials' && (
            <motion.div key="testimonials" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <div className="flex items-center justify-end gap-2 mb-4">
                <button onClick={() => setActiveTestimonial((i) => (i - 1 + RECOMMENDATIONS.length) % RECOMMENDATIONS.length)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-muted transition-all hover:border-accent/30 hover:text-accent" aria-label="Previous">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={() => setActiveTestimonial((i) => (i + 1) % RECOMMENDATIONS.length)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-muted transition-all hover:border-accent/30 hover:text-accent" aria-label="Next">
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="relative rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-8 sm:p-10">
                <AnimatePresence mode="wait">
                  <motion.div key={activeTestimonial} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}>
                    <span className="absolute top-4 left-6 font-serif text-6xl text-accent/10 leading-none">&ldquo;</span>
                    <blockquote className="relative z-10 text-lg leading-relaxed text-muted italic sm:text-xl">
                      {RECOMMENDATIONS[activeTestimonial].quote}
                    </blockquote>
                    <div className="mt-6 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-accent to-secondary text-sm font-bold text-white">
                        {RECOMMENDATIONS[activeTestimonial].name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{RECOMMENDATIONS[activeTestimonial].name}</p>
                        <p className="text-sm text-muted-foreground">{RECOMMENDATIONS[activeTestimonial].title} · {RECOMMENDATIONS[activeTestimonial].company}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-6 flex justify-center gap-1">
                  {RECOMMENDATIONS.map((_, i) => (
                    <button key={i} onClick={() => setActiveTestimonial(i)} className="flex items-center justify-center p-2" aria-label={`Testimonial ${i + 1}`}>
                      <span className={`block h-2 rounded-full transition-all duration-300 ${i === activeTestimonial ? 'w-8 bg-accent' : 'w-2 bg-border hover:bg-border-hover'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image preview modal */}
        <AnimatePresence>
          {previewImage && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
              onClick={() => setPreviewImage(null)}>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                className="relative max-w-3xl max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setPreviewImage(null)}
                  className="absolute -top-3 -right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  aria-label="Close preview">
                  <X size={20} />
                </button>
                <Image src={previewImage} alt="Certificate preview" width={800} height={600}
                  className="rounded-xl object-contain max-h-[85vh]" unoptimized />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Achievements;
