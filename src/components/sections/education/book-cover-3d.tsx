'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './education.module.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const BookCover3D = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <div>
      <div className={styles.closedBookWrapper}>
        <motion.div className={styles.closedBook} onClick={onOpen} whileTap={{ scale: 0.97 }}>
          {/* Physical book parts */}
          <div className={styles.coverSpine} />
          <div className={styles.coverPages} />
          <div className={styles.coverBottom} />

          {/* Leather cover */}
          <div className={styles.coverFace}>
            {/* Gold ornamental outer frame */}
            <div style={{ position: 'absolute', inset: '12px', border: '2px solid rgba(201,169,97,0.35)', pointerEvents: 'none', zIndex: 2 }} />
            {/* Inner frame */}
            <div style={{ position: 'absolute', inset: '18px', border: '1px solid rgba(201,169,97,0.18)', pointerEvents: 'none', zIndex: 2 }} />
            {/* Corner dots */}
            {[['16px','16px'],['16px','auto'],['auto','16px'],['auto','auto']].map(([t, l], i) => (
              <div key={i} style={{ position: 'absolute', top: t === 'auto' ? 'auto' : t, left: l === 'auto' ? 'auto' : l, bottom: t === 'auto' ? '16px' : 'auto', right: l === 'auto' ? '16px' : 'auto', width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(201,169,97,0.3)', zIndex: 3 }} />
            ))}

            {/* Content */}
            <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', zIndex: 4 }}>
              {/* Graduation photo with gold frame */}
              <div style={{ position: 'relative', width: '52%', aspectRatio: '3/4', border: '3px solid rgba(201,169,97,0.4)', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.5), inset 0 0 10px rgba(0,0,0,0.2)', marginBottom: '16px' }}>
                <Image src={`${basePath}/images/graduation-photo.png`} alt="Graduation" fill className="object-cover" style={{ objectPosition: '50% 15%' }} unoptimized />
                <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)' }} />
              </div>

              {/* Gold divider */}
              <div style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,169,97,0.4), transparent)', marginBottom: '12px' }} />

              {/* Title */}
              <p style={{ fontSize: '13px', fontFamily: 'Georgia, serif', fontWeight: 600, letterSpacing: '0.08em', background: 'linear-gradient(135deg, #b8962e, #f5e7a3, #d4af37, #c9a84c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '6px', textAlign: 'center' }}>
                A Journey of Learning
              </p>

              <p style={{ fontSize: '7px', color: 'rgba(201,169,97,0.25)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                Click to open
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <div className={styles.coverShadow} />
    </div>
  );
};

export default BookCover3D;
