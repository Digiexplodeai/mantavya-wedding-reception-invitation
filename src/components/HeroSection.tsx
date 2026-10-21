import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronDown, Calendar } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { LordGaneshaArtwork } from './LordGaneshaArtwork';
import { OrnamentalDivider, CornerFiligree } from './RoyalOrnaments';

export const HeroSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const handleScrollDown = () => {
    const el = document.getElementById('blessings-families');
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between items-center overflow-hidden bg-[#391827] text-[#F8F1E5] px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-10"
    >
      {/* 1. Royal Indian Wedding Background & Handcrafted Architectural Arch Frame */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Soft Royal Burgundy to Deep Wine Radial Lighting */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 36%, #621E31 0%, #461423 48%, #2A0B16 100%)',
          }}
        />

        {/* Subtle Textured Jaali Paper Lattice */}
        <div className="absolute inset-0 royal-jaali-pattern opacity-10" />

        {/* Golden Central Aura behind Lord Ganesha & Couple Names */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[560px] h-[480px] sm:h-[620px] pointer-events-none rounded-full"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, rgba(234, 215, 183, 0.16) 0%, rgba(190, 151, 89, 0.08) 50%, transparent 75%)',
            filter: 'blur(32px)',
          }}
        />

        {/* Handcrafted Symmetrical Royal Indian Mehraab Arch Frame */}
        <svg
          viewBox="0 0 800 1200"
          fill="none"
          preserveAspectRatio="none"
          className="absolute inset-2 sm:inset-4 w-[calc(100%-16px)] sm:w-[calc(100%-32px)] h-[calc(100%-16px)] sm:h-[calc(100%-32px)] opacity-40"
        >
          {/* Outer Hairline Gold Border */}
          <rect
            x="20"
            y="20"
            width="760"
            height="1160"
            rx="24"
            stroke="#BE9759"
            strokeWidth="1"
          />

          {/* Inner Dotted Decorative Border */}
          <rect
            x="32"
            y="32"
            width="736"
            height="1136"
            rx="18"
            stroke="#EAD7B7"
            strokeWidth="0.8"
            strokeDasharray="4 4"
            opacity="0.75"
          />

          {/* Traditional Royal Mughal / Rajasthani Cusped Arch (Mehraab) */}
          <path
            d="M60 1140 V420 C60 260 210 160 360 88 C380 78 392 68 400 52 C408 68 420 78 440 88 C590 160 740 260 740 420 V1140"
            stroke="#BE9759"
            strokeWidth="1.6"
          />

          {/* Secondary Delicate Arch Line */}
          <path
            d="M80 1140 V430 C80 280 220 185 365 116 C382 108 392 98 400 84 C408 98 418 108 435 116 C580 185 720 280 720 430 V1140"
            stroke="#EAD7B7"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.8"
          />

          {/* Crown Lotus Crest Finial at Top Apex */}
          <path
            d="M400 36 C396 44 394 48 400 56 C406 48 404 44 400 36 Z"
            fill="#EAD7B7"
          />
          <circle cx="400" cy="32" r="3" fill="#FFF4E0" />
        </svg>

        {/* Elegant Symmetrical Corner Filigrees */}
        <CornerFiligree
          className="absolute top-4 sm:top-7 left-4 sm:left-7 w-10 h-10 sm:w-14 sm:h-14 opacity-60"
          color="#BE9759"
        />
        <CornerFiligree
          className="absolute top-4 sm:top-7 right-4 sm:right-7 w-10 h-10 sm:w-14 sm:h-14 -scale-x-100 opacity-60"
          color="#BE9759"
        />
        <CornerFiligree
          className="absolute bottom-4 sm:bottom-7 left-4 sm:left-7 w-10 h-10 sm:w-14 sm:h-14 -scale-y-100 opacity-50"
          color="#BE9759"
        />
        <CornerFiligree
          className="absolute bottom-4 sm:bottom-7 right-4 sm:right-7 w-10 h-10 sm:w-14 sm:h-14 -scale-100 opacity-50"
          color="#BE9759"
        />
      </div>

      {/* 2. Cohesive Central Royal Invitation Sequence */}
      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center text-center my-auto px-2">
        {/* Step 1: Divine Golden Lord Ganesha Artwork with Soft Illumination */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
          className="flex justify-center"
        >
          <LordGaneshaArtwork className="w-24 h-24 sm:w-28 sm:h-28" />
        </motion.div>

        {/* Step 2: Sacred Invocation: ॥ श्री गणेशाय नमः ॥ */}
        <motion.p
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
          className="mt-2.5 sm:mt-3 font-devanagari text-base sm:text-xl font-medium tracking-normal text-[#EAD7B7] drop-shadow-[0_2px_8px_rgba(20,5,10,0.5)] select-text"
        >
          {weddingConfig.hero.invocation}
        </motion.p>

        {/* Step 3: Romantic Tagline: Two Hearts. One Beautiful Journey. */}
        <motion.p
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: 'easeOut' }}
          className="mt-1.5 font-serif italic text-base sm:text-xl text-[#F8F1E5]/90 tracking-wide"
        >
          {weddingConfig.hero.poeticLead}
        </motion.p>

        {/* Fine Decorative Golden Divider */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scaleX: 0.8 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.9, ease: 'easeOut' }}
          className="my-2.5 sm:my-3.5 flex justify-center w-full"
        >
          <OrnamentalDivider className="w-36 sm:w-52 h-4 sm:h-5" color="#BE9759" />
        </motion.div>

        {/* Step 4: Center Couple Names: Mantavya & Nitika */}
        <div className="flex flex-col items-center justify-center my-0.5 sm:my-1 overflow-visible">
          <h1
            aria-label={`${weddingConfig.hero.groomName} & ${weddingConfig.hero.brideName}`}
            className="flex flex-col items-center justify-center select-none overflow-visible"
          >
            {/* Mantavya */}
            <motion.span
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
              className="block font-calligraphy text-[3.25rem] sm:text-7xl md:text-8xl leading-[1.12] px-4 text-[#F8F1E5] tracking-normal overflow-visible [text-shadow:0_2px_16px_rgba(190,151,89,0.45)]"
            >
              {weddingConfig.hero.groomName}
            </motion.span>

            {/* Small Elegant Ampersand */}
            <motion.span
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.25, ease: 'easeOut' }}
              className="font-serif italic text-xl sm:text-2xl text-[#BE9759] -my-1 sm:-my-1.5 tracking-widest opacity-90 select-none"
            >
              &amp;
            </motion.span>

            {/* Nitika */}
            <motion.span
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 1.45, ease: [0.22, 1, 0.36, 1] }}
              className="block font-calligraphy text-[3.25rem] sm:text-7xl md:text-8xl leading-[1.12] px-4 text-[#F8F1E5] tracking-normal overflow-visible [text-shadow:0_2px_16px_rgba(190,151,89,0.45)]"
            >
              {weddingConfig.hero.brideName}
            </motion.span>
          </h1>
        </div>

        {/* Step 5: FOREVER BEGINS HERE */}
        <motion.p
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.75, ease: 'easeOut' }}
          className="mt-3 sm:mt-4 font-sans text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#EAD7B7] font-semibold"
        >
          {weddingConfig.hero.tagline}
        </motion.p>

        {/* Step 6: 14th November 2026 */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.95, ease: 'easeOut' }}
          className="mt-2.5 sm:mt-3 inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#2A0B16]/80 border border-[#BE9759]/60 shadow-[0_4px_16px_rgba(20,5,10,0.4)] backdrop-blur-xs"
        >
          <Calendar className="w-3.5 h-3.5 text-[#BE9759] shrink-0" />
          <span className="font-serif text-base sm:text-lg tracking-[0.1em] text-[#F8F1E5] font-semibold">
            {weddingConfig.hero.datesLine}
          </span>
        </motion.div>
      </div>

      {/* 3. Tasteful Scroll Indicator: "Discover Our Celebration" */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.2, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center mt-3 sm:mt-4"
      >
        <button
          type="button"
          onClick={handleScrollDown}
          className="group min-h-[44px] px-5 py-1.5 flex flex-col items-center gap-1 text-[#EAD7B7] hover:text-[#F8F1E5] transition-colors cursor-pointer"
        >
          <span className="font-sans text-[11px] sm:text-xs tracking-[0.2em] uppercase font-medium">
            {weddingConfig.hero.scrollPrompt}
          </span>
          <motion.span
            animate={prefersReducedMotion ? {} : { y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-7 h-7 rounded-full border border-[#BE9759]/60 flex items-center justify-center bg-[#2A0B16]/60 group-hover:border-[#EAD7B7]"
          >
            <ChevronDown className="w-3.5 h-3.5 text-[#EAD7B7]" />
          </motion.span>
        </button>
      </motion.div>
    </section>
  );
};
