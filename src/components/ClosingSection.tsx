import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Share2, Check, ArrowUp } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { CornerFiligree, OrnamentalDivider } from './RoyalOrnaments';

// Refined Royal Circular Wedding Monogram: M & N with botanical engraving
const RoyalWeddingMonogram: React.FC<{ className?: string }> = ({
  className = 'w-24 h-24 sm:w-28 sm:h-28',
}) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    {/* Soft Golden Ambient Glow */}
    <div
      className="absolute inset-0 -m-2 rounded-full pointer-events-none"
      style={{
        background:
          'radial-gradient(circle at 50% 50%, rgba(234, 215, 183, 0.45) 0%, rgba(190, 151, 89, 0.12) 60%, transparent 75%)',
        filter: 'blur(6px)',
      }}
    />

    <svg
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="relative z-10 w-full h-full drop-shadow-[0_4px_12px_rgba(100,31,50,0.15)]"
      aria-label="Mantavya & Nitika Royal Monogram"
    >
      <defs>
        <linearGradient id="monogramGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF7E5" />
          <stop offset="25%" stopColor="#EAD7B7" />
          <stop offset="65%" stopColor="#BE9759" />
          <stop offset="100%" stopColor="#8C6527" />
        </linearGradient>

        <radialGradient id="monogramBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="70%" stopColor="#F9F2E6" />
          <stop offset="100%" stopColor="#EDE1CE" />
        </radialGradient>
      </defs>

      {/* Outer Beaded Pearl Rim */}
      <circle
        cx="70"
        cy="70"
        r="66"
        stroke="url(#monogramGold)"
        strokeWidth="0.85"
        strokeDasharray="2.5 3"
        opacity="0.75"
      />

      {/* Outer Filigree Circle */}
      <circle
        cx="70"
        cy="70"
        r="61"
        stroke="url(#monogramGold)"
        strokeWidth="1.2"
        opacity="0.85"
      />

      {/* Inner Filled Medallion */}
      <circle cx="70" cy="70" r="54" fill="url(#monogramBg)" stroke="url(#monogramGold)" strokeWidth="1.2" />
      <circle cx="70" cy="70" r="49" stroke="#641F32" strokeWidth="0.75" strokeOpacity="0.3" />

      {/* Symmetrical Botanical Laurel Engraving (Left Branch) */}
      <g stroke="url(#monogramGold)" strokeWidth="0.8" fill="url(#monogramGold)" opacity="0.85">
        <path d="M26 68 C27 48 42 32 58 26" stroke="url(#monogramGold)" strokeWidth="0.9" fill="none" />
        {/* Leaves */}
        <path d="M30 58 C25 55 24 49 28 47 C31 51 32 55 30 58 Z" />
        <path d="M35 48 C30 44 30 38 34 37 C37 41 38 45 35 48 Z" />
        <path d="M44 38 C40 33 41 27 46 27 C48 31 47 36 44 38 Z" />
        <path d="M54 31 C51 26 53 20 58 21 C59 25 58 29 54 31 Z" />
      </g>

      {/* Symmetrical Botanical Laurel Engraving (Right Branch) */}
      <g stroke="url(#monogramGold)" strokeWidth="0.8" fill="url(#monogramGold)" opacity="0.85">
        <path d="M114 68 C113 48 98 32 82 26" stroke="url(#monogramGold)" strokeWidth="0.9" fill="none" />
        {/* Leaves */}
        <path d="M110 58 C115 55 116 49 112 47 C109 51 108 55 110 58 Z" />
        <path d="M105 48 C110 44 110 38 106 37 C103 41 102 45 105 48 Z" />
        <path d="M96 38 C100 33 99 27 94 27 C92 31 93 36 96 38 Z" />
        <path d="M86 31 C89 26 87 20 82 21 C81 25 82 29 86 31 Z" />
      </g>

      {/* Bottom Joining Ribbon Flourish */}
      <path
        d="M60 114 C66 112 74 112 80 114"
        stroke="url(#monogramGold)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="70" cy="113" r="1.8" fill="url(#monogramGold)" />

      {/* Central Monogram Text: M & N */}
      <text
        x="45"
        y="78"
        fill="#641F32"
        fontSize="34"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontWeight="600"
        textAnchor="middle"
      >
        M
      </text>

      <text
        x="70"
        y="74"
        fill="#BE9759"
        fontSize="20"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontStyle="italic"
        fontWeight="400"
        textAnchor="middle"
      >
        &amp;
      </text>

      <text
        x="95"
        y="78"
        fill="#641F32"
        fontSize="34"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontWeight="600"
        textAnchor="middle"
      >
        N
      </text>
    </svg>
  </div>
);

export const ClosingSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShareInvitation = async () => {
    const shareData = {
      title: 'Mantavya & Nitika — Royal Wedding Reception Invitation',
      text: 'Together with our families, we cordially invite you to celebrate the Wedding Reception of Mantavya & Nitika on 14th November 2026.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard copy
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // ignore
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-12 sm:pt-16 pb-6 sm:pb-8 px-3 sm:px-6 bg-[#F8F1E5] text-[#391827] overflow-hidden border-t-2 border-[#BE9759]">
      {/* Subtle Traditional Jaali Background Pattern */}
      <div className="absolute inset-0 royal-jaali-pattern opacity-30 pointer-events-none" />

      {/* Gentle Radial Ambient Illumination */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(234, 215, 183, 0.35) 0%, rgba(248, 241, 229, 0) 70%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Royal Invitation Closing Card */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#F8F1E5] to-[#F5EFE4] border-2 border-[#BE9759] px-4 py-12 sm:px-12 sm:py-16 text-center shadow-[0_20px_50px_rgba(100,31,50,0.08),0_0_24px_rgba(190,151,89,0.12)] overflow-hidden"
        >
          {/* Inner Double Filigree Hairline Border */}
          <div className="absolute inset-2 sm:inset-3.5 rounded-2xl border border-[#BE9759]/50 pointer-events-none" />
          <div className="absolute inset-3 sm:inset-5 rounded-xl border border-[#641F32]/15 pointer-events-none" />

          {/* Corner Filigrees in Rich Burgundy */}
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
              1. TOP: DELICATE ANTIQUE-GOLD ORNAMENTAL FLOURISH
             ======================================================== */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <OrnamentalDivider className="w-44 sm:w-56 h-6" color="#BE9759" />
          </motion.div>

          {/* ========================================================
              2. CENTER: CIRCULAR WEDDING MONOGRAM (M & N)
             ======================================================== */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 flex justify-center"
          >
            <RoyalWeddingMonogram />
          </motion.div>

          {/* ========================================================
              3. BELOW: "Mantavya & Nitika"
             ======================================================== */}
          <motion.h2
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.18 }}
            className="mt-4 font-calligraphy text-5xl sm:text-7xl text-[#641F32] py-1 drop-shadow-[0_1px_2px_rgba(100,31,50,0.15)]"
          >
            {weddingConfig.closing.names}
          </motion.h2>

          {/* ========================================================
              4. "Together Is a Beautiful Place to Be."
             ======================================================== */}
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-2 font-serif italic text-lg sm:text-2xl text-[#391827] font-medium"
          >
            &ldquo;Together Is a Beautiful Place to Be.&rdquo;
          </motion.p>

          {/* "Thank You for Being a Part of Our Celebration." */}
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-1 font-serif text-sm sm:text-base text-[#641F32]/85 font-medium tracking-wide"
          >
            Thank You for Being a Part of Our Celebration.
          </motion.p>

          {/* Subtle Traditional Gold Divider */}
          <div className="my-5 sm:my-6 flex justify-center">
            <OrnamentalDivider className="w-36 sm:w-44 h-4" color="#BE9759" variant="simple" />
          </div>

          {/* ========================================================
              5. "With Love & Warm Regards" · Goyal Family · Dates
             ======================================================== */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="space-y-1.5"
          >
            <p className="font-serif italic text-xs sm:text-sm tracking-[0.16em] uppercase text-[#BE9759] font-medium">
              With Love &amp; Warm Regards
            </p>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#641F32] tracking-wide">
              Goyal Family
            </h3>

            <p className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase text-[#641F32]/75 font-semibold pt-1">
              14th November 2026
            </p>
          </motion.div>

          {/* Share Royal Invitation Action */}
          <div className="mt-7 pt-5 border-t border-[#BE9759]/30 flex justify-center">
            <button
              type="button"
              onClick={handleShareInvitation}
              className="w-full sm:w-auto min-h-[46px] px-7 py-2.5 rounded-full bg-[#641F32] hover:bg-[#4E1424] text-[#F8F1E5] border border-[#BE9759] font-serif text-sm sm:text-base font-semibold tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-[#EAD7B7]" />
                  <span className="whitespace-nowrap">Invitation Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#EAD7B7]" />
                  <span className="whitespace-nowrap">Share Royal Invitation</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* ========================================================
            6. BOTTOM: #MantavyaWedsNitika & CENTERED BACK TO TOP BUTTON
           ======================================================== */}
        <div className="mt-7 sm:mt-8 flex flex-col items-center justify-center gap-3 text-center px-3 pb-2 sm:pb-3">
          <span className="font-serif italic text-base sm:text-lg text-[#BE9759] tracking-wider select-none">
            {weddingConfig.couple.hashtag}
          </span>

          {/* Premium Royal Back to Top Button - Perfectly Centered on Desktop & Mobile */}
          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="min-h-[44px] px-6 py-2 rounded-full bg-[#641F32] hover:bg-[#4E1424] text-[#F8F1E5] border border-[#BE9759] font-serif text-xs sm:text-sm font-semibold tracking-wider shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer mx-auto"
            aria-label="Back to Top of Invitation"
          >
            <span className="text-[#EAD7B7]">Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#EAD7B7]" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};
