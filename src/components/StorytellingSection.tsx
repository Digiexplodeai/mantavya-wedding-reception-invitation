import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { weddingConfig } from '../config/weddingConfig';
import { OrnamentalDivider } from './RoyalOrnaments';

export const StorytellingSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Gentle Parallax Layer Transforms (Compositor-Only)
  const archY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [35, -35]);
  const lanternY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [65, -65]);
  const mandapScale = useTransform(scrollYProgress, [0.1, 0.85], prefersReducedMotion ? [1, 1] : [0.95, 1.04]);

  return (
    <section
      ref={containerRef}
      id="royal-journey"
      className="relative py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-b from-[#F8F1E5] via-[#EAD7B7]/45 to-[#F8F1E5] text-[#391827] overflow-hidden"
    >
      {/* Parallax Layer 1: Decorated Palace Corridor Arches */}
      <motion.div
        style={{ y: archY }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-25"
        aria-hidden="true"
      >
        <svg viewBox="0 0 900 1100" fill="none" className="w-full max-w-4xl h-full">
          <path
            d="M80 1080 V300 C80 150 260 45 450 20 C640 45 820 150 820 300 V1080"
            stroke="#641F32"
            strokeWidth="2"
          />
          <path
            d="M140 1080 V330 C140 190 290 95 450 68 C610 95 760 190 760 330 V1080"
            stroke="#BE9759"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <path
            d="M200 1080 V360 C200 230 320 140 450 115 C580 140 700 230 700 360 V1080"
            stroke="#641F32"
            strokeWidth="1"
          />
        </svg>
      </motion.div>

      {/* Parallax Layer 2: Warm Hanging Palace Lanterns */}
      <motion.div
        style={{ y: lanternY }}
        className="absolute inset-x-0 top-10 pointer-events-none flex justify-between max-w-4xl mx-auto px-6 sm:px-14 opacity-70"
        aria-hidden="true"
      >
        {/* Left Hanging Brass Lantern */}
        <svg viewBox="0 0 60 180" className="w-10 sm:w-14 h-36 sm:h-44" fill="none">
          <line x1="30" y1="0" x2="30" y2="95" stroke="#641F32" strokeWidth="1.5" />
          <polygon
            points="30,95 48,120 30,152 12,120"
            fill="#BE9759"
            fillOpacity="0.3"
            stroke="#641F32"
            strokeWidth="1.5"
          />
          <circle cx="30" cy="123" r="5" fill="#BE9759" />
        </svg>

        {/* Right Hanging Brass Lantern */}
        <svg viewBox="0 0 60 180" className="w-10 sm:w-14 h-36 sm:h-44" fill="none">
          <line x1="30" y1="0" x2="30" y2="115" stroke="#641F32" strokeWidth="1.5" />
          <polygon
            points="30,115 48,140 30,172 12,140"
            fill="#BE9759"
            fillOpacity="0.3"
            stroke="#641F32"
            strokeWidth="1.5"
          />
          <circle cx="30" cy="143" r="5" fill="#BE9759" />
        </svg>
      </motion.div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-sans text-xs tracking-[0.22em] uppercase text-[#641F32]/80 font-medium">
            A Royal Procession of Moments
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-semibold text-[#641F32]">
            The Sacred Journey
          </h2>
          <div className="mt-3 flex justify-center">
            <OrnamentalDivider className="w-48 h-5" color="#BE9759" />
          </div>
        </motion.div>

        {/* Vertical Palace Corridor & Mandap Progression */}
        <div className="relative space-y-12 sm:space-y-16">
          {/* Vertical Golden Thread Connecting the Chapters */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-[#BE9759]/20 via-[#BE9759] to-[#BE9759]/20 pointer-events-none"
            aria-hidden="true"
          />

          {weddingConfig.storytelling.chapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              style={{ scale: index === 2 ? mandapScale : 1 }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative rounded-3xl bg-[#F8F1E5]/95 backdrop-blur-sm border border-[#BE9759]/75 px-6 py-9 sm:px-10 sm:py-12 text-center shadow-[0_16px_40px_rgba(100,31,50,0.08)]"
            >
              {/* Roman Numeral Medallion */}
              <div className="mx-auto -mt-14 mb-4 w-11 h-11 rounded-full bg-[#641F32] border-2 border-[#BE9759] text-[#F8F1E5] flex items-center justify-center font-serif text-sm font-semibold shadow-md">
                {chapter.romanIndex}
              </div>

              <p className="font-sans text-xs tracking-[0.18em] uppercase text-[#641F32]/75 font-medium">
                {chapter.motifTitle}
              </p>

              <blockquote className="mt-3 font-serif italic text-2xl sm:text-3xl text-[#641F32] font-semibold leading-snug text-balance">
                &ldquo;{chapter.quote}&rdquo;
              </blockquote>

              <div className="my-4 flex justify-center">
                <OrnamentalDivider className="w-36 h-4" color="#BE9759" variant="simple" />
              </div>

              <p className="font-sans text-sm sm:text-base text-[#391827]/85 max-w-md mx-auto leading-relaxed">
                {chapter.subtext}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
