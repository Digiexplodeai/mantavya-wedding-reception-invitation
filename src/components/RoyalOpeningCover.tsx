import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { OrnamentalDivider, CornerFiligree } from './RoyalOrnaments';
import { LordGaneshaArtwork } from './LordGaneshaArtwork';
import { royalAudio } from '../utils/royalAudio';

export type EntranceState = 'cover' | 'opening' | 'completed';

interface RoyalOpeningCoverProps {
  entranceState?: EntranceState;
  onStartOpen?: () => void;
  onOpenComplete: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

// =========================================================================
// HANDCRAFTED ROYAL INDIAN PALACE DOOR PANEL COMPONENT
// Features architectural ivory panels, carved traditional Jharokha detailing,
// delicate antique-gold borders, lotus medallions, and brass knocker handles.
// =========================================================================

interface PalaceDoorProps {
  side: 'left' | 'right';
  isOpening: boolean;
  prefersReducedMotion: boolean | null;
}

const PalaceDoor: React.FC<PalaceDoorProps> = ({
  side,
  isOpening,
  prefersReducedMotion,
}) => {
  const isLeft = side === 'left';

  return (
    <motion.div
      className={`relative w-1/2 h-full overflow-hidden select-none ${
        isLeft ? 'origin-left' : 'origin-right'
      }`}
      style={{
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
      initial={{ rotateY: 0, x: 0, opacity: 1 }}
      animate={
        isOpening
          ? {
              rotateY: prefersReducedMotion ? 0 : isLeft ? -115 : 115,
              x: prefersReducedMotion ? (isLeft ? '-100%' : '100%') : isLeft ? '-3%' : '3%',
              opacity: prefersReducedMotion ? 0 : 1,
            }
          : { rotateY: 0, x: 0, opacity: 1 }
      }
      transition={{
        duration: prefersReducedMotion ? 1.2 : 2.7,
        delay: prefersReducedMotion ? 0.05 : 0.25,
        ease: [0.16, 1, 0.3, 1], // Natural heavy royal door deceleration
      }}
    >
      {/* Heavy Heritage Door Body: Sandalwood & Ivory Lacquer Gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#FAF4EA] via-[#F2E5D0] to-[#E6D3B6]"
        style={{
          boxShadow: isLeft
            ? isOpening
              ? 'inset -6px 0 24px rgba(70,18,30,0.5), 24px 0 60px rgba(0,0,0,0.85)'
              : 'inset -2px 0 10px rgba(100,31,50,0.25)'
            : isOpening
            ? 'inset 6px 0 24px rgba(70,18,30,0.5), -24px 0 60px rgba(0,0,0,0.85)'
            : 'inset 2px 0 10px rgba(100,31,50,0.25)',
          transition: 'box-shadow 2.2s ease',
        }}
      />

      {/* Traditional Palace Jaali Lattice Background */}
      <div className="absolute inset-0 royal-jaali-pattern opacity-35 pointer-events-none" />

      {/* Outer Carved Architectural Moldings */}
      <div className="absolute inset-2 sm:inset-4 rounded-lg sm:rounded-xl border-2 border-[#BE9759]/75 pointer-events-none" />
      <div className="absolute inset-3.5 sm:inset-6 rounded-md sm:rounded-lg border border-[#641F32]/25 pointer-events-none" />

      {/* Symmetrical Corner Filigrees on Doors */}
      {isLeft ? (
        <>
          <CornerFiligree className="absolute top-4 left-4 w-9 h-9 sm:w-13 sm:h-13 opacity-70" color="#641F32" />
          <CornerFiligree className="absolute bottom-4 left-4 w-9 h-9 sm:w-13 sm:h-13 -scale-y-100 opacity-70" color="#641F32" />
        </>
      ) : (
        <>
          <CornerFiligree className="absolute top-4 right-4 w-9 h-9 sm:w-13 sm:h-13 -scale-x-100 opacity-70" color="#641F32" />
          <CornerFiligree className="absolute bottom-4 right-4 w-9 h-9 sm:w-13 sm:h-13 -scale-100 opacity-70" color="#641F32" />
        </>
      )}

      {/* Traditional Carved Architectural Panels (Top, Middle, Lower) */}
      <div className="absolute inset-5 sm:inset-8 flex flex-col justify-between py-4 pointer-events-none opacity-85">
        {/* Top: Cusped Jharokha Arch Carving */}
        <div className="relative h-[28%] w-full rounded-t-xl border border-[#BE9759]/50 bg-[#FDF9F2]/65 p-2 overflow-hidden flex flex-col items-center justify-center">
          <svg
            viewBox="0 0 160 140"
            fill="none"
            className="w-full h-full max-h-24 drop-shadow-[0_1px_2px_rgba(100,31,50,0.15)]"
          >
            <path
              d="M10 130 V60 C10 30 35 15 80 10 C125 15 150 30 150 60 V130"
              stroke="#BE9759"
              strokeWidth="1.4"
            />
            <path
              d="M20 130 V65 C20 38 42 22 80 18 C118 22 140 38 140 65 V130"
              stroke="#641F32"
              strokeWidth="0.8"
              strokeDasharray="2 2"
            />
            <circle cx="80" cy="45" r="14" stroke="#BE9759" strokeWidth="1" fill="#FFF8EB" />
            <circle cx="80" cy="45" r="4" fill="#641F32" />
            <path d="M80 25 V35 M80 55 V65 M60 45 H70 M90 45 H100" stroke="#BE9759" strokeWidth="1" />
          </svg>
        </div>

        {/* Center: Grand Sacred Lotus Mandala Relief */}
        <div className="relative h-[38%] w-full rounded-xl border border-[#BE9759]/60 bg-[#FBF4E6]/75 p-2 overflow-hidden flex items-center justify-center shadow-inner">
          <svg
            viewBox="0 0 200 200"
            fill="none"
            className={`w-full h-full max-h-36 ${
              isLeft ? 'translate-x-3' : '-translate-x-3'
            } drop-shadow-[0_2px_4px_rgba(100,31,50,0.18)]`}
          >
            <circle cx={isLeft ? 190 : 10} cy="100" r="92" stroke="#BE9759" strokeWidth="1.2" strokeDasharray="3 3" />
            <circle cx={isLeft ? 190 : 10} cy="100" r="76" stroke="#641F32" strokeWidth="1.4" />
            <circle cx={isLeft ? 190 : 10} cy="100" r="58" stroke="#BE9759" strokeWidth="1" />
            <circle cx={isLeft ? 190 : 10} cy="100" r="38" stroke="#641F32" strokeWidth="1.2" fill="#FAF1DF" />
            <circle cx={isLeft ? 190 : 10} cy="100" r="16" fill="#BE9759" />
            <path
              d={
                isLeft
                  ? 'M190 8 C140 45 140 155 190 192'
                  : 'M10 8 C60 45 60 155 10 192'
              }
              stroke="#BE9759"
              strokeWidth="1.6"
            />
          </svg>
        </div>

        {/* Lower: Geometric Khatamband Lattice */}
        <div className="relative h-[26%] w-full rounded-b-xl border border-[#BE9759]/50 bg-[#FDF9F2]/65 p-2 overflow-hidden flex items-center justify-center">
          <svg viewBox="0 0 160 100" fill="none" className="w-full h-full opacity-60">
            <pattern id={`doorGrid-${side}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="#BE9759" strokeWidth="0.75" />
              <circle cx="10" cy="10" r="1.5" fill="#641F32" />
            </pattern>
            <rect width="100%" height="100%" fill={`url(#doorGrid-${side})`} />
          </svg>
        </div>
      </div>

      {/* Antique Cast-Brass Door Knocker / Handle */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 flex flex-col items-center z-20 ${
          isLeft ? 'right-3 sm:right-6' : 'left-3 sm:left-6'
        }`}
      >
        <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#FFF5DE] via-[#BE9759] to-[#694816] p-0.5 shadow-[0_6px_16px_rgba(40,10,20,0.45)] flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-[#FAF3E4] border border-[#641F32]/35 flex items-center justify-center">
            <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-gradient-to-b from-[#EAD7B7] to-[#8C6527] shadow-inner" />
          </div>
        </div>
        <div className="w-8 h-8 sm:w-11 sm:h-11 -mt-3 rounded-full border-3 sm:border-4 border-[#BE9759] bg-gradient-to-b from-transparent via-[#641F32]/10 to-[#641F32]/30 shadow-[0_8px_18px_rgba(30,5,15,0.55)]" />
      </div>

      {/* Central Astragal Meeting Molding (Seam between doors) */}
      <div
        className={`absolute top-0 bottom-0 w-2.5 sm:w-3.5 z-10 ${
          isLeft
            ? 'right-0 bg-gradient-to-r from-[#DFCDAF] via-[#BE9759] to-[#8C6527] border-l border-[#FFF4DE]/60 shadow-[2px_0_6px_rgba(0,0,0,0.25)]'
            : 'left-0 bg-gradient-to-r from-[#8C6527] via-[#BE9759] to-[#DFCDAF] border-r border-[#FFF4DE]/60 shadow-[-2px_0_6px_rgba(0,0,0,0.25)]'
        }`}
      >
        <div className="h-full flex flex-col justify-around items-center py-6">
          {Array.from({ length: 9 }).map((_, studIdx) => (
            <div
              key={studIdx}
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-b from-[#FFF5DE] to-[#8C6527] shadow-sm"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// =========================================================================
// MAIN CINEMATIC INVITATION ENTRANCE COMPONENT
// =========================================================================

export const RoyalOpeningCover: React.FC<RoyalOpeningCoverProps> = ({
  entranceState = 'cover',
  onStartOpen,
  onOpenComplete,
}) => {
  const [isOpeningInternal, setIsOpeningInternal] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const isOpening = entranceState === 'opening' || isOpeningInternal;

  // Unaltered Opening Interaction Logic (Strictly Preserved)
  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsButtonPressed(true);
    setIsOpeningInternal(true);

    if (onStartOpen) {
      onStartOpen();
    }

    // 1. Immediately trigger playback of uploaded Kabir Café MP3 synchronously from user click gesture
    royalAudio.setUserMutedPref(false);
    royalAudio.play(true);

    // 2. Coordinated palace door opening animation (approx 3.0s total)
    const fullDuration = prefersReducedMotion ? 1200 : 3100;
    const timer = window.setTimeout(() => {
      onOpenComplete();
    }, fullDuration);

    return () => clearTimeout(timer);
  };

  // Safety fallback
  useEffect(() => {
    if (isOpening) {
      const fallbackTimer = window.setTimeout(() => {
        onOpenComplete();
      }, 4200);
      return () => clearTimeout(fallbackTimer);
    }
  }, [isOpening, onOpenComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#240A15] select-none"
      style={{
        perspective: '1800px',
        WebkitPerspective: '1800px',
      }}
    >
      {/* Volumetric Golden Sunburst Light beaming between parting doors */}
      <AnimatePresence>
        {isOpening && !prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.88, 0.98, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.9, times: [0, 0.25, 0.7, 1], ease: 'easeInOut' }}
            className="absolute inset-0 pointer-events-none z-15 overflow-hidden flex items-center justify-center"
          >
            <div
              className="w-[180vw] h-[180vh] rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 50%, rgba(255, 248, 230, 0.95) 0%, rgba(234, 215, 183, 0.55) 32%, rgba(190, 151, 89, 0.22) 60%, transparent 75%)',
                filter: 'blur(22px)',
              }}
            />

            {/* ========================================================
                CINEMATIC CELEBRATION FALLING ELEMENTS
                Refined rose petals, golden marigold petals, festive leaves,
                and shimmering shagun particles drifting softly outward
               ======================================================== */}
            {Array.from({ length: 26 }).map((_, i) => {
              const xTarget = (i % 2 === 0 ? 1 : -1) * (35 + ((i * 29) % 200));
              const yTarget = -70 - ((i * 33) % 270);
              const rotation = (i % 2 === 0 ? 1 : -1) * (140 + ((i * 35) % 180));
              const delay = 0.25 + (i % 8) * 0.11;
              const type = i % 4; // 0: Rose Petal, 1: Golden Saffron Petal, 2: Festive Leaf, 3: Shagun Dust

              return (
                <motion.div
                  key={`celebration-element-${i}`}
                  initial={{ opacity: 0, x: 0, y: 15, scale: 0.3 }}
                  animate={{
                    opacity: [0, 0.95, 0.85, 0],
                    x: xTarget,
                    y: yTarget,
                    scale: [0.4, 1.15, 0.85],
                    rotate: rotation,
                  }}
                  transition={{
                    duration: 2.65,
                    delay: delay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute left-1/2 top-1/2 w-4 h-4 xs:w-5 xs:h-5"
                >
                  {/* Type 0: Velvety Burgundy Rose Petal */}
                  {type === 0 && (
                    <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-[0_2px_6px_rgba(80,15,35,0.45)]">
                      <path
                        d="M16 2 C24 5 30 14 26 24 C23 29 18 31 15 30 C10 29 5 24 4 17 C3 10 9 3 16 2 Z"
                        fill="#7A1D36"
                      />
                      <path
                        d="M16 5 C17 12 16 20 15 28"
                        stroke="#9E2E4B"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.6"
                      />
                    </svg>
                  )}

                  {/* Type 1: Warm Saffron Golden Petal */}
                  {type === 1 && (
                    <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-[0_2px_6px_rgba(190,151,89,0.4)]">
                      <path
                        d="M16 3 C23 7 27 16 24 25 C21 29 16 30 14 28 C9 26 6 20 7 14 C8 7 11 3 16 3 Z"
                        fill="#C89D52"
                      />
                      <path
                        d="M15 6 C16 13 15 20 14 26"
                        stroke="#FFF4DE"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.6"
                      />
                    </svg>
                  )}

                  {/* Type 2: Graceful Festive Leaf */}
                  {type === 2 && (
                    <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-[0_2px_4px_rgba(50,30,15,0.3)]">
                      <path
                        d="M16 2 C22 8 25 18 20 27 C18 29 15 30 13 28 C9 24 8 16 11 9 C13 5 15 3 16 2 Z"
                        fill="#8E7A4A"
                      />
                      <path
                        d="M16 4 C16 12 15 20 13 27"
                        stroke="#E0CD9D"
                        strokeWidth="0.75"
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.6"
                      />
                    </svg>
                  )}

                  {/* Type 3: Shimmering Gold Shagun Sparkle */}
                  {type === 3 && (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <span className="block w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#FFF8E7] via-[#EAD7B7] to-[#BE9759] shadow-[0_0_10px_#BE9759]" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Pair of Carved Royal Palace Doors */}
      <div className="absolute inset-0 flex w-full h-full z-20 pointer-events-none">
        <PalaceDoor
          side="left"
          isOpening={isOpening}
          prefersReducedMotion={prefersReducedMotion}
        />
        <PalaceDoor
          side="right"
          isOpening={isOpening}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>

      {/* ========================================================
          HANDCRAFTED ROYAL INVITATION CARD (CENTRAL PLAQUE)
          Pure luxury printed wedding card aesthetics with Ganesha,
          shlok invocation, prominent names, and single primary CTA
         ======================================================== */}
      <motion.div
        className="absolute inset-0 z-30 flex items-center justify-center p-3 xs:p-4 sm:p-6 pointer-events-none"
        initial={{ opacity: 1, scale: 1 }}
        animate={
          isOpening
            ? {
                opacity: 0,
                scale: prefersReducedMotion ? 1 : 1.04,
                y: prefersReducedMotion ? 0 : -12,
              }
            : { opacity: 1, scale: 1, y: 0 }
        }
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <div className="relative w-full max-w-[340px] xs:max-w-[370px] sm:max-w-[420px] rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF4EA] to-[#F5EBDA] border-2 border-[#BE9759] px-4 py-5 xs:px-6 xs:py-6 sm:px-8 sm:py-8 text-center shadow-[0_24px_60px_rgba(35,8,18,0.45),0_4px_18px_rgba(190,151,89,0.25)] pointer-events-auto overflow-hidden">
          {/* Outer Gold Foil Hairline Border */}
          <div className="absolute inset-1.5 xs:inset-2 rounded-2xl border border-[#BE9759]/40 pointer-events-none" />

          {/* Inner Thin Burgundy Filigree Border */}
          <div className="absolute inset-3 xs:inset-3.5 rounded-xl border border-[#641F32]/25 pointer-events-none" />

          {/* Symmetrical Corner Filigrees in rich burgundy */}
          <CornerFiligree className="absolute top-2.5 left-2.5 w-6 h-6 xs:w-7 xs:h-7 opacity-75" color="#641F32" />
          <CornerFiligree className="absolute top-2.5 right-2.5 w-6 h-6 xs:w-7 xs:h-7 -scale-x-100 opacity-75" color="#641F32" />
          <CornerFiligree className="absolute bottom-2.5 left-2.5 w-6 h-6 xs:w-7 xs:h-7 -scale-y-100 opacity-75" color="#641F32" />
          <CornerFiligree className="absolute bottom-2.5 right-2.5 w-6 h-6 xs:w-7 xs:h-7 -scale-100 opacity-75" color="#641F32" />

          {/* ========================================================
              1. TOP: DETAILED TRADITIONAL LORD GANESHA MEDALLION
             ======================================================== */}
          <div className="flex flex-col items-center justify-center pt-0.5">
            <div className="relative flex items-center justify-center">
              <LordGaneshaArtwork className="w-22 h-24 xs:w-24 xs:h-26 sm:w-28 sm:h-30 mx-auto" />
            </div>

            {/* Auspicious Sanskrit Invocation */}
            <div className="mt-1 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#BE9759]" />
              <p className="font-devanagari text-xs xs:text-sm tracking-normal text-[#641F32] font-semibold drop-shadow-[0_1px_1px_rgba(190,151,89,0.3)]">
                {weddingConfig.meta.sanskritInvocation}
              </p>
              <span className="w-1.5 h-1.5 rotate-45 bg-[#BE9759]" />
            </div>

            {/* Antique-Gold Fine Divider */}
            <div className="my-1.5 xs:my-2 flex justify-center">
              <OrnamentalDivider className="w-32 xs:w-36 sm:w-44 h-3.5" color="#BE9759" variant="simple" />
            </div>
          </div>

          {/* ========================================================
              2. INVITATION MESSAGE & COUPLE NAMES (FOCAL POINT)
             ======================================================== */}
          <div className="space-y-1">
            <p className="font-serif text-[11px] xs:text-xs sm:text-sm tracking-[0.22em] uppercase text-[#641F32]/85 font-semibold">
              {weddingConfig.openingCover.topLine}
            </p>

            {/* Prominent Burgundy Calligraphy Couple Names */}
            <h1 className="py-0.5 font-calligraphy text-4xl xs:text-5xl sm:text-6xl text-[#5C1428] leading-[1.12] drop-shadow-[0_1px_2px_rgba(190,151,89,0.35)]">
              {weddingConfig.openingCover.coupleNames}
            </h1>

            {/* Delicate Center Diamond Motif */}
            <div className="my-1.5 flex items-center justify-center gap-2">
              <span className="w-7 sm:w-10 h-px bg-gradient-to-r from-transparent to-[#BE9759]" />
              <span className="w-1.5 h-1.5 rotate-45 bg-[#BE9759]" />
              <span className="w-7 sm:w-10 h-px bg-gradient-to-l from-transparent to-[#BE9759]" />
            </div>

            <p className="font-serif italic text-sm xs:text-base sm:text-lg text-[#391827]/90 font-medium">
              {weddingConfig.openingCover.subLine}
            </p>

            <p className="font-sans text-[10px] xs:text-[11px] sm:text-xs tracking-[0.24em] uppercase text-[#641F32]/85 font-semibold pt-0.5">
              {weddingConfig.couple.weddingDatesShort}
            </p>
          </div>

          {/* ========================================================
              3. PRIMARY INTERACTIVE CTA: "OPEN OUR INVITATION"
             ======================================================== */}
          <div className="mt-4 xs:mt-5 sm:mt-6 flex flex-col items-center">
            <motion.button
              type="button"
              onClick={handleOpenInvitation}
              disabled={isOpening}
              whileHover={{ scale: isOpening ? 1 : 1.02 }}
              whileTap={{ scale: 0.96 }}
              className={`group relative min-h-[48px] xs:min-h-[52px] sm:min-h-[54px] w-full max-w-[280px] xs:max-w-[300px] sm:max-w-[320px] px-6 py-2.5 rounded-full bg-gradient-to-r from-[#4E1424] via-[#641F32] to-[#4E1424] text-[#F8F1E5] border-2 border-[#BE9759] shadow-[0_12px_28px_rgba(80,18,36,0.55),0_0_20px_rgba(190,151,89,0.25)] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer overflow-hidden ${
                isButtonPressed ? 'ring-4 ring-[#BE9759]/60 brightness-110' : 'hover:brightness-105'
              }`}
            >
              {/* Subtle Gold Shimmer Sweep */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#EAD7B7]/30 to-transparent" />
              <Sparkles className="w-4 h-4 text-[#EAD7B7] shrink-0" />
              <span className="font-serif text-base xs:text-lg tracking-[0.12em] font-semibold text-[#F8F1E5] whitespace-nowrap">
                {weddingConfig.openingCover.ctaLabel}
              </span>
              <Sparkles className="w-4 h-4 text-[#EAD7B7] shrink-0" />
            </motion.button>

            {/* Elegant Subtitle Helper Text */}
            <span className="mt-2.5 font-serif italic text-xs text-[#641F32]/75 tracking-wide">
              Tap to open palace doors &amp; enter celebration
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
