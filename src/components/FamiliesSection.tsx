import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { weddingConfig } from '../config/weddingConfig';
import { CornerFiligree, OrnamentalDivider } from './RoyalOrnaments';
import { LordGaneshaArtwork } from './LordGaneshaArtwork';

// Luxury Royal Ganesha Medallion in Antique Gold & Burgundy
const GaneshaMedallion: React.FC<{ className?: string }> = ({
  className = 'w-28 h-30 sm:w-34 sm:h-36',
}) => (
  <LordGaneshaArtwork className={className} />
);

export const FamiliesSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="blessings-families"
      className="relative py-16 sm:py-24 px-3 sm:px-6 bg-[#F8F1E5] text-[#391827] overflow-hidden"
    >
      {/* Subtle Traditional Jaali / Mandala Background Pattern */}
      <div className="absolute inset-0 royal-jaali-pattern opacity-30 pointer-events-none" />

      {/* Soft Golden Ambient Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 20%, rgba(234, 215, 183, 0.35) 0%, rgba(248, 241, 229, 0) 70%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Royal Parchment Invitation Panel */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#F8F1E5] to-[#F5EFE4] border-2 border-[#BE9759] px-4 py-10 sm:px-12 sm:py-16 shadow-[0_20px_50px_rgba(100,31,50,0.08),0_0_24px_rgba(190,151,89,0.12)] text-center overflow-hidden"
        >
          {/* Inner Double Filigree Hairline Border */}
          <div className="absolute inset-2 sm:inset-3.5 rounded-2xl border border-[#BE9759]/50 pointer-events-none" />
          <div className="absolute inset-3 sm:inset-5 rounded-xl border border-[#641F32]/15 pointer-events-none" />

          {/* Four Decorative Corner Filigrees */}
          <CornerFiligree className="absolute top-2.5 left-2.5 w-9 h-9 sm:w-12 sm:h-12" color="#641F32" />
          <CornerFiligree
            className="absolute top-2.5 right-2.5 w-9 h-9 sm:w-12 sm:h-12 -scale-x-100"
            color="#641F32"
          />
          <CornerFiligree
            className="absolute bottom-2.5 left-2.5 w-9 h-9 sm:w-12 sm:h-12 -scale-y-100"
            color="#641F32"
          />
          <CornerFiligree
            className="absolute bottom-2.5 right-2.5 w-9 h-9 sm:w-12 sm:h-12 -scale-100"
            color="#641F32"
          />

          {/* ========================================================
              1. LORD GANESHA MEDALLION & SACRED SANSKRIT SHLOKA
             ======================================================== */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="flex flex-col items-center"
          >
            <GaneshaMedallion />

            {/* Sacred Sanskrit Shloka Box */}
            <div className="mt-4 px-4 py-2.5 rounded-2xl bg-[#EAD7B7]/25 border border-[#BE9759]/45 max-w-md mx-auto text-center">
              <p className="font-devanagari text-sm sm:text-base font-bold text-[#641F32] tracking-normal">
                ॥ ॐ श्री गणेशाय नमः ॥
              </p>
              <div className="mt-1 space-y-0.5 font-devanagari text-xs sm:text-sm text-[#641F32]/90 leading-relaxed tracking-normal font-medium">
                <p>वक्रतुण्ड महाकाय, सूर्यकोटि समप्रभः ।।</p>
                <p>निर्विघ्नं कुरु मे देव, सर्वकार्येषु सर्वदा ।।</p>
              </div>
            </div>
          </motion.div>

          <div className="my-6 sm:my-8 flex justify-center">
            <OrnamentalDivider className="w-48 sm:w-56 h-6" color="#BE9759" />
          </div>

          {/* ========================================================
              2. GRANDPARENTS BLESSINGS SECTION
             ======================================================== */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-2.5"
          >
            <p className="font-serif italic text-sm sm:text-base tracking-[0.12em] uppercase text-[#BE9759] font-medium">
              {weddingConfig.families.grandparentsHeading}
            </p>

            <div className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-[#391827] leading-snug tracking-wide">
              <p className="drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                {weddingConfig.families.grandparentsNames[0]}
              </p>
              <p className="font-serif italic text-sm sm:text-base text-[#BE9759] my-0.5">&amp;</p>
              <p className="drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                {weddingConfig.families.grandparentsNames[1]}
              </p>
            </div>
          </motion.div>

          <div className="my-6 sm:my-8 flex justify-center">
            <OrnamentalDivider className="w-36 sm:w-44 h-4" color="#BE9759" variant="simple" />
          </div>

          {/* ========================================================
              3. FAMILY BLESSINGS SECTION
             ======================================================== */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="space-y-2.5"
          >
            <p className="font-serif italic text-sm sm:text-base tracking-[0.12em] uppercase text-[#BE9759] font-medium">
              {weddingConfig.families.parentsHeading}
            </p>

            <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#641F32] leading-snug tracking-wide">
              <p className="drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                {weddingConfig.families.groomParentsNames[0]}
              </p>
              <p className="font-serif italic text-base sm:text-lg text-[#BE9759] my-0.5">&amp;</p>
              <p className="drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                {weddingConfig.families.groomParentsNames[1]}
              </p>
            </div>

            <p className="pt-2 max-w-lg mx-auto font-serif italic text-sm sm:text-base text-[#391827]/85 leading-relaxed">
              &ldquo;{weddingConfig.families.invitationProse}&rdquo;
            </p>
          </motion.div>

          <div className="my-7 sm:my-9 flex justify-center">
            <OrnamentalDivider className="w-48 sm:w-56 h-6" color="#BE9759" />
          </div>

          {/* ========================================================
              4. GROOM & BRIDE LINEAGE
             ======================================================== */}
          <div className="space-y-6 sm:space-y-7">
            {/* Groom */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.22 }}
              className="space-y-1"
            >
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#BE9759] font-medium">
                {weddingConfig.couple.groom.lineagePrefix}
              </p>
              <h3 className="font-calligraphy text-5xl sm:text-6xl text-[#641F32] py-0.5 drop-shadow-[0_1px_2px_rgba(100,31,50,0.15)]">
                {weddingConfig.couple.groom.name}
              </h3>
              <p className="font-serif text-sm sm:text-base text-[#391827]/85 font-medium">
                {weddingConfig.couple.groom.parentage}
              </p>
            </motion.div>

            {/* Together With Emblem */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="flex items-center justify-center gap-3"
            >
              <span className="h-px w-10 sm:w-16 bg-[#BE9759]/60" />
              <span className="font-serif italic text-base sm:text-lg text-[#641F32] px-4 py-0.5 rounded-full border border-[#BE9759]/50 bg-[#EAD7B7]/35 shadow-sm">
                {weddingConfig.couple.bride.lineagePrefix}
              </span>
              <span className="h-px w-10 sm:w-16 bg-[#BE9759]/60" />
            </motion.div>

            {/* Bride */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.3 }}
              className="space-y-1"
            >
              <h3 className="font-calligraphy text-5xl sm:text-6xl text-[#641F32] py-0.5 drop-shadow-[0_1px_2px_rgba(100,31,50,0.15)]">
                {weddingConfig.couple.bride.name}
              </h3>
              <p className="font-serif text-sm sm:text-base text-[#391827]/85 font-medium">
                {weddingConfig.couple.bride.parentage}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
