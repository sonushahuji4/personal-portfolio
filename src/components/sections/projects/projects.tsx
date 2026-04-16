'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';
import { RADIO_STATIONS } from '@/data/projects';
import { SECTION_IDS } from '@/lib/constants';
import { playClick, playStatic } from './use-radio-audio';

const NEEDLE_POSITIONS = [4, 27, 50, 73];

const Projects = () => {
  const [station, setStation] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showStatic, setShowStatic] = useState(false);
  const [knobRotation, setKnobRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const staticInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);

  const current = RADIO_STATIONS[station];

  const drawStatic = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const v = Math.random() * 255;
      imageData.data[i] = v;
      imageData.data[i + 1] = v;
      imageData.data[i + 2] = v;
      imageData.data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
  }, []);

  const tuneTo = useCallback((index: number) => {
    if (isTransitioning || index === station || index < 0 || index >= RADIO_STATIONS.length) return;
    setIsTransitioning(true);
    playClick();

    // Start static
    setTimeout(() => {
      setShowStatic(true);
      playStatic(0.5);
      staticInterval.current = setInterval(drawStatic, 40);
    }, 50);

    // End static, swap content
    setTimeout(() => {
      if (staticInterval.current) clearInterval(staticInterval.current);
      setShowStatic(false);
      setStation(index);
      setKnobRotation((r) => r + (index > station ? 40 : -40));
      setIsTransitioning(false);
    }, 550);
  }, [isTransitioning, station, drawStatic]);

  // Cleanup
  useEffect(() => {
    return () => { if (staticInterval.current) clearInterval(staticInterval.current); };
  }, []);

  return (
    <section id={SECTION_IDS.projects} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading title="Projects" subtitle="Tune in to my work — each project is a station" accent="#EF9F27" />

        {/* Radio */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl"
        >
          {/* Cabinet */}
          <div className="relative rounded-2xl overflow-hidden" style={{ background: '#2a1c0f' }}>
            {/* Wood grain */}
            <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.06, backgroundImage: 'repeating-linear-gradient(82deg, transparent, transparent 3px, rgba(200,160,100,0.4) 3px, rgba(200,160,100,0.4) 3.5px, transparent 3.5px, transparent 8px, rgba(180,140,80,0.2) 8px, rgba(180,140,80,0.2) 8.3px)' }} />
            {/* Top light / bottom shadow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 8%, transparent 92%, rgba(0,0,0,0.15) 100%)' }} />
            {/* Bevel */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ border: '1px solid rgba(160,120,60,0.12)' }} />

            {/* Screws */}
            {[[8, 8], [8, null], [null, 8], [null, null]].map(([t, l], i) => (
              <div key={i} className="absolute w-1.5 h-1.5 rounded-full" style={{ top: t ?? 'auto', left: l ?? 'auto', bottom: t === null ? 8 : 'auto', right: l === null ? 8 : 'auto', background: 'radial-gradient(circle at 35% 35%, rgba(180,160,120,0.2), rgba(100,80,50,0.15))', border: '0.5px solid rgba(140,120,80,0.1)' }} />
            ))}

            <div className="p-4 sm:p-5">
              {/* ═══ DIAL WINDOW ═══ */}
              <div className="rounded-xl p-0.5" style={{ background: 'rgba(0,0,0,0.4)' }}>
                <div className="rounded-lg relative" style={{ background: 'linear-gradient(180deg, #110e08, #0a0806)', padding: '14px 16px 8px' }}>
                  {/* Amber glow */}
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 70%, rgba(255,190,60,0.05), transparent 65%)' }} />

                  {/* Glass panel */}
                  <div className="relative rounded" style={{ border: '0.5px solid rgba(180,150,90,0.08)', padding: '10px 12px 6px', background: 'rgba(255,240,200,0.008)' }}>
                    {/* Glass reflection */}
                    <div className="absolute top-0 left-[10%] right-[10%] h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,240,200,0.06), transparent)' }} />

                    {/* Frequencies */}
                    <div className="flex justify-between mb-3">
                      {RADIO_STATIONS.map((s, i) => (
                        <button key={s.id} onClick={() => tuneTo(i)} className="text-center transition-all" style={{ cursor: isTransitioning ? 'not-allowed' : 'pointer' }}>
                          <span className="block font-mono transition-all duration-300" style={{
                            fontSize: '11px',
                            color: station === i ? 'rgba(255,230,170,0.9)' : 'rgba(255,225,160,0.25)',
                            textShadow: station === i ? '0 0 8px rgba(255,200,80,0.4)' : 'none',
                            fontWeight: station === i ? 700 : 400,
                          }}>
                            {s.frequency}
                          </span>
                          <span className="block mt-0.5" style={{ fontSize: '7px', color: 'rgba(255,225,160,0.15)', fontFamily: 'sans-serif' }}>
                            {s.stationName}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Needle track */}
                    <div className="relative h-3 mb-1.5">
                      <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: 'rgba(255,225,160,0.08)' }} />
                      {/* Tick marks */}
                      {Array.from({ length: 21 }, (_, i) => (
                        <div key={i} className="absolute" style={{
                          left: `${(i / 20) * 100}%`,
                          top: '50%', transform: 'translateY(-50%)',
                          width: '0.5px',
                          height: i % 5 === 0 ? '6px' : '3px',
                          background: 'rgba(255,225,160,0.1)',
                        }} />
                      ))}
                      {/* Red needle */}
                      <div className="absolute top-0 h-full transition-all duration-[800ms]" style={{
                        left: `${NEEDLE_POSITIONS[station]}%`,
                        transitionTimingFunction: 'cubic-bezier(0.3, 0, 0.2, 1)',
                      }}>
                        <div style={{ width: '2px', height: '100%', background: 'linear-gradient(180deg, #ff3030, #cc1010)', boxShadow: '0 0 6px rgba(255,50,50,0.4)', borderRadius: '1px' }} />
                      </div>
                    </div>

                    {/* Band labels */}
                    <div className="flex justify-between" style={{ fontSize: '6.5px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,225,160,0.12)' }}>
                      <span>AM</span><span>FM stereo</span><span>SW</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ═══ SPEAKER AREA ═══ */}
              <div className="mt-3 rounded-xl p-0.5" style={{ background: 'rgba(0,0,0,0.25)' }}>
                <div className="rounded-lg relative overflow-hidden" style={{ background: '#0c0a06', minHeight: '220px' }}
                  onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                  onTouchEnd={(e) => {
                    const dx = e.changedTouches[0].clientX - touchStartX.current;
                    if (Math.abs(dx) > 40) { if (dx < 0) tuneTo(station + 1); else tuneTo(station - 1); }
                  }}
                >
                  {/* Woven cloth texture */}
                  <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.12, backgroundImage: 'repeating-linear-gradient(0deg, rgba(180,150,100,0.3) 0px, rgba(180,150,100,0.3) 1px, transparent 1px, transparent 4px), repeating-linear-gradient(90deg, rgba(180,150,100,0.15) 0px, rgba(180,150,100,0.15) 1px, transparent 1px, transparent 4px)' }} />

                  {/* Static canvas */}
                  <canvas ref={canvasRef} width={400} height={200} className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-200" style={{ opacity: showStatic ? 0.5 : 0, mixBlendMode: 'screen' }} />

                  {/* Content */}
                  <div className="relative z-10 p-4 sm:p-5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={current.id}
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 3 }}
                        transition={{ duration: 0.25 }}
                      >
                        {/* Now playing header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(80,200,80,0.7)', boxShadow: '0 0 6px rgba(80,200,80,0.3)', animation: 'pulse 1.5s infinite' }} />
                            <span style={{ fontSize: '10px', color: 'rgba(255,225,160,0.35)' }}>{current.nowPlaying}</span>
                          </div>
                          {/* EQ bars */}
                          <div className="flex items-end gap-0.5 h-4">
                            {[0, 0.12, 0.24, 0.36, 0.48, 0.6, 0.72].map((delay, i) => (
                              <div key={i} className="rounded-sm" style={{
                                width: '2.5px', background: 'rgba(255,200,80,0.45)', borderRadius: '1px',
                                animation: `eq 0.8s ease-in-out ${delay}s infinite alternate`,
                              }} />
                            ))}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'rgba(255,240,210,0.88)', lineHeight: 1.2 }}>
                          {current.title}
                        </h3>
                        <p style={{ fontSize: '11px', color: 'rgba(255,225,160,0.3)', marginTop: '2px' }}>
                          {current.subtitle}
                          {current.url && (
                            <a href={current.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 ml-2" style={{ color: 'rgba(255,225,160,0.4)' }}>
                              <ExternalLink size={10} />
                            </a>
                          )}
                        </p>

                        {/* Description */}
                        <p style={{ fontSize: '11.5px', lineHeight: 1.6, color: 'rgba(255,230,180,0.38)', marginTop: '10px' }}>
                          {current.description}
                        </p>

                        {/* Stats */}
                        {current.stats.length > 0 && (
                          <div className="flex gap-5 mt-4">
                            {current.stats.map((s) => (
                              <div key={s.label}>
                                <div style={{ fontSize: '18px', fontWeight: 700, color: 'rgba(255,220,150,0.82)' }}>{s.value}</div>
                                <div style={{ fontSize: '7.5px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,225,160,0.28)' }}>{s.label}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {current.tags.map((tag) => (
                            <span key={tag} style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '4px', border: '0.5px solid rgba(255,225,160,0.06)', color: 'rgba(255,225,160,0.25)' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* ═══ KNOBS + BRAND ═══ */}
              <div className="flex items-center justify-between mt-4 px-2">
                {/* Left knob — Tune (prev) */}
                <button onClick={() => tuneTo(station - 1)} disabled={isTransitioning || station === 0}
                  className="relative flex items-center justify-center disabled:opacity-40"
                  style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'radial-gradient(circle at 38% 32%, #50392a, #2e1e10 55%, #1a1008 100%)', border: '1.5px solid rgba(160,130,80,0.12)', cursor: isTransitioning ? 'not-allowed' : 'pointer', boxShadow: '0 3px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.3)', transition: 'transform 0.12s' }}
                  aria-label="Previous station">
                  <div className="absolute rounded-full" style={{ inset: '6px', border: '0.5px solid rgba(200,170,100,0.04)' }} />
                  <div className="absolute rounded-full" style={{ top: '7px', left: '50%', width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(200,170,100,0.35)', transform: `translateX(-50%) rotate(${knobRotation}deg)`, transition: 'transform 0.6s' }} />
                  <span style={{ fontSize: '6px', color: 'rgba(200,170,100,0.2)', position: 'absolute', bottom: '-14px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Tune</span>
                </button>

                {/* Brand badge */}
                <span style={{ fontSize: '7.5px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(200,170,100,0.12)', fontFamily: 'Georgia, serif' }}>
                  Sonu S. Eng Co.
                </span>

                {/* Right knob — Select (next) */}
                <button onClick={() => tuneTo(station + 1)} disabled={isTransitioning || station === RADIO_STATIONS.length - 1}
                  className="relative flex items-center justify-center disabled:opacity-40"
                  style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'radial-gradient(circle at 38% 32%, #50392a, #2e1e10 55%, #1a1008 100%)', border: '1.5px solid rgba(160,130,80,0.12)', cursor: isTransitioning ? 'not-allowed' : 'pointer', boxShadow: '0 3px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.3)', transition: 'transform 0.12s' }}
                  aria-label="Next station">
                  <div className="absolute rounded-full" style={{ inset: '6px', border: '0.5px solid rgba(200,170,100,0.04)' }} />
                  <div className="absolute rounded-full" style={{ top: '7px', left: '50%', width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(200,170,100,0.35)', transform: `translateX(-50%) rotate(${-knobRotation}deg)`, transition: 'transform 0.6s' }} />
                  <span style={{ fontSize: '6px', color: 'rgba(200,170,100,0.2)', position: 'absolute', bottom: '-14px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Sel</span>
                </button>
              </div>
            </div>

            {/* Feet */}
            <div className="flex justify-between px-12 -mb-1">
              <div style={{ width: '24px', height: '8px', background: 'linear-gradient(180deg, #2a1c0f, #1a1008)', borderRadius: '0 0 6px 6px', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} />
              <div style={{ width: '24px', height: '8px', background: 'linear-gradient(180deg, #2a1c0f, #1a1008)', borderRadius: '0 0 6px 6px', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }} />
            </div>
          </div>
        </motion.div>

        {/* Station indicator */}
        <div className="mt-6 flex justify-center gap-2">
          {RADIO_STATIONS.map((s, i) => (
            <button key={s.id} onClick={() => tuneTo(i)} className="p-1" aria-label={`Tune to ${s.stationName}`}>
              <span className={`block h-1.5 rounded-full transition-all duration-300 ${station === i ? 'w-6 bg-amber-500' : 'w-1.5 bg-border hover:bg-muted-foreground'}`} />
            </button>
          ))}
        </div>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Click frequencies or knobs to tune · Swipe on mobile
        </p>
      </div>

      {/* EQ animation keyframes */}
      <style jsx global>{`
        @keyframes eq {
          0% { height: 3px; }
          100% { height: 15px; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .eq-bar { animation: none !important; height: 8px !important; }
        }
      `}</style>
    </section>
  );
};

export default Projects;
