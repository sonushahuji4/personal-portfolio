'use client';

import { useEffect, useRef } from 'react';

const CODE_CHARS = '01{}[]()<>=;:const let var function return async await import export class interface type'.split('');

const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const fontSize = 14;
    let columns: number;
    let drops: number[];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(0).map(() => Math.random() * -100);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      // Semi-transparent black to create fade trail
      ctx.fillStyle = 'rgba(5, 5, 6, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns; i++) {
        if (drops[i] < 0) {
          drops[i] += 0.5;
          continue;
        }

        const char = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Gradient color: accent at head, fading trail
        const alpha = Math.max(0.02, 0.12 - (drops[i] % 30) * 0.004);
        ctx.fillStyle = `rgba(99, 102, 241, ${alpha})`;
        ctx.fillText(char, x, y);

        // Head character brighter
        if (drops[i] % 30 < 2) {
          ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
          ctx.fillText(char, x, y);
        }

        if (y > canvas.height && Math.random() > 0.98) {
          drops[i] = Math.random() * -20;
        }
        drops[i] += 0.3 + Math.random() * 0.2;
      }

      animationId = requestAnimationFrame(draw);
    };

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      draw();
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-60"
      aria-hidden="true"
    />
  );
};

export default CodeRain;
