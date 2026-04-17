'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './education.module.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

interface BookCover3DProps {
  onOpen: () => void;
}

const BookCover3D = ({ onOpen }: BookCover3DProps) => {
  return (
    <div>
      <div className={styles.closedBookWrapper}>
        <motion.div
          className={styles.closedBook}
          onClick={onOpen}
          whileTap={{ scale: 0.98 }}
        >
          {/* Spine */}
          <div className={styles.coverSpine} />
          {/* Page edges */}
          <div className={styles.coverPages} />

          {/* Cover face */}
          <div className={styles.coverFace}>
            {/* Leather grain texture */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: 'repeating-linear-gradient(82deg, transparent, transparent 3px, rgba(200,160,100,0.4) 3px, rgba(200,160,100,0.4) 3.5px)' }} />

            {/* Gold border */}
            <div style={{ position: 'absolute', inset: '10px', border: '2px solid rgba(201,169,97,0.25)', borderRadius: '2px', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: '14px', border: '1px solid rgba(201,169,97,0.12)', pointerEvents: 'none' }} />

            {/* Content */}
            <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 1 }}>
              {/* Graduation photo */}
              <div style={{ position: 'relative', width: '55%', aspectRatio: '3/4', border: '3px solid rgba(201,169,97,0.3)', borderRadius: '2px', overflow: 'hidden', boxShadow: '0 6px 16px rgba(0,0,0,0.4)', marginBottom: '20px' }}>
                <Image
                  src={`${basePath}/images/graduation-photo.png`}
                  alt="Graduation"
                  fill
                  className="object-cover"
                  style={{ objectPosition: '50% 15%' }}
                  unoptimized
                />
              </div>

              {/* Title */}
              <p style={{ fontSize: '14px', fontFamily: 'Georgia, serif', fontWeight: 600, fontStyle: 'italic', background: 'linear-gradient(135deg, #c9a84c, #f5e7a3, #d4af37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>
                A Journey of Learning
              </p>
              <div style={{ width: '40px', height: '1px', background: 'rgba(201,169,97,0.2)', marginBottom: '16px' }} />
              <p style={{ fontSize: '8px', color: 'rgba(201,169,97,0.25)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                Click to open →
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <div className={styles.coverShadow} />

      {/* Open button */}
      <div className="mt-4 text-center">
        <button onClick={onOpen} className="rounded-lg px-5 py-2 text-xs font-medium transition-all" style={{ background: '#2a1810', color: '#c9a961', border: '1px solid rgba(201,169,97,0.15)' }}>
          Open the book
        </button>
      </div>
    </div>
  );
};

export default BookCover3D;
