'use client';

import { ArrowRight } from 'lucide-react';

interface UnknownChapterCtaProps {
  onClose: () => void;
  accentColor: string;
}

const UnknownChapterCta = ({ onClose, accentColor }: UnknownChapterCtaProps) => {
  const handleClick = () => {
    onClose();
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <button
      onClick={handleClick}
      className="group flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]"
      style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`, boxShadow: `0 8px 24px ${accentColor}30` }}
    >
      Write Chapter 12 with me
      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
    </button>
  );
};

export default UnknownChapterCta;
