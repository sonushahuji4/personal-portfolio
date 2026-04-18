'use client';

import { motion } from 'framer-motion';

const CATEGORY_COLORS = ['#06B6D4', '#F59E0B', '#D946EF'];

/**
 * Brand name — "Sonu S." with an animated colorful dot above the period.
 * The dot cycles through hobby category colors (Tech / Sports / Music).
 */
const BrandLogo = ({ size = 32 }: { size?: number }) => {
  const fontSize = size * 0.5;
  const dotSize = Math.max(4, size * 0.14);

  return (
    <span
      className="font-display font-bold text-foreground tracking-tight relative inline-block"
      style={{ fontSize }}
    >
      Sonu S
      {/* The period + animated dot */}
      <span className="relative inline-block">
        .
        <motion.span
          className="absolute rounded-full"
          style={{
            width: dotSize,
            height: dotSize,
            top: -dotSize * 0.3,
            right: 0,
          }}
          animate={{
            backgroundColor: CATEGORY_COLORS,
          }}
          transition={{
            backgroundColor: {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        />
      </span>
    </span>
  );
};

export default BrandLogo;
