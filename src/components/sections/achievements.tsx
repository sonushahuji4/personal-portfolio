'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ShieldCheck, MessageCircle, BookOpen, ChevronLeft, ChevronRight, Eye, X } from 'lucide-react';
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
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  const [viewerType, setViewerType] = useState<'image' | 'pdf'>('image');

  const openViewer = (url: string) => {
    const isPdf = url.endsWith('.pdf');
    setViewerType(isPdf ? 'pdf' : 'image');
    setViewerUrl(url);
  };

  return (
    <section id={SECTION_IDS.achievements} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 noise-overlay" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading title="Achievements & Certificates" subtitle="Awards, certifications, courses, and recommendations" accent="#f59e0b" />

        {/* Tabs */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-1.5">
            {TABS.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all sm:px-4 ${
                  activeTab === tab.id ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-muted hover:text-foreground'
                }`}>
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className={`rounded-full px-1.5 py-0.5 text-xs ${activeTab === tab.id ? 'bg-white/20' : 'bg-border'}`}>{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* ═══ Awards — full image, no cropping ═══ */}
          {activeTab === 'awards' && (
            <motion.div key="awards" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              className="grid gap-5 sm:grid-cols-2">
              {AWARDS.map((award, i) => (
                <motion.div key={award.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="group rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden card-premium">
                  {award.imageUrl && (
                    <button onClick={() => openViewer(award.imageUrl!)} className="relative w-full overflow-hidden cursor-zoom-in">
                      {/* Full image — object-contain so nothing gets cut */}
                      <Image src={award.imageUrl} alt={award.title} width={600} height={400}
                        className="w-full h-auto object-contain bg-black/20 transition-transform duration-500 group-hover:scale-[1.02]" unoptimized />
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye size={13} /> View Full
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

          {/* ═══ Certifications — click to view in lightbox ═══ */}
          {activeTab === 'certifications' && (
            <motion.div key="certs" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              className="grid gap-4 sm:grid-cols-3">
              {CERTIFICATIONS.map((cert, i) => (
                <motion.button key={cert.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  onClick={() => cert.certificateUrl && openViewer(cert.certificateUrl)}
                  className="group text-left rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-5 card-premium cursor-pointer">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 mb-3 transition-colors group-hover:bg-emerald-500/20">
                    <ShieldCheck size={20} className="text-emerald-500" />
                  </div>
                  <p className="font-semibold text-foreground">{cert.name}</p>
                  <p className="text-xs text-muted mt-0.5">{cert.issuer} · {cert.date}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye size={12} /> View Certificate
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* ═══ Course Certificates — click to view ═══ */}
          {activeTab === 'courses' && (
            <motion.div key="courses" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              className="grid gap-4 sm:grid-cols-2">
              {COURSE_CERTIFICATES.map((cert, i) => (
                <motion.button key={cert.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  onClick={() => openViewer(cert.certificateUrl)}
                  className="group flex items-center justify-between text-left rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-5 card-premium cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-muted transition-colors group-hover:bg-accent/20">
                      <BookOpen size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{cert.name}</p>
                      <p className="text-xs text-muted">{cert.platform}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye size={13} />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* ═══ Testimonials ═══ */}
          {activeTab === 'testimonials' && (
            <motion.div key="testimonials" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
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

        {/* ═══ Viewer Modal — for images AND PDFs ═══ */}
        <AnimatePresence>
          {viewerUrl && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8"
              onClick={() => setViewerUrl(null)}>
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setViewerUrl(null)}
                  className="absolute -top-2 -right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  aria-label="Close viewer">
                  <X size={20} />
                </button>
                {viewerType === 'image' ? (
                  <Image src={viewerUrl} alt="Certificate" width={1200} height={800}
                    className="rounded-xl object-contain w-full max-h-[85vh]" unoptimized />
                ) : (
                  <iframe
                    src={viewerUrl}
                    className="w-full rounded-xl bg-white"
                    style={{ height: '85vh' }}
                    title="Certificate viewer"
                  />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Achievements;
