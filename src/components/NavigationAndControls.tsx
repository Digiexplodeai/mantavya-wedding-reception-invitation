import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Volume2, VolumeX, Share2, Check } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

interface NavigationAndControlsProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export const NavigationAndControls: React.FC<NavigationAndControlsProps> = ({
  isMuted,
  onToggleMute,
}) => {
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  });

  const handleShare = async () => {
    const shareData = {
      title: 'Mantavya & Nitika — The Royal Wedding Reception Invitation',
      text: 'You are cordially invited to celebrate the Wedding Reception of Mantavya & Nitika on 14th November 2026.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // ignore
    }
  };

  return (
    <>
      {/* Minimal Ornamental Gold Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#BE9759] via-[#EAD7B7] to-[#641F32] origin-left z-50"
      />

      {/* Clean 3-Zone Top Bar Contract */}
      <header className="fixed top-1 left-0 right-0 z-40 h-13 px-4 sm:px-8 bg-[#391827]/90 backdrop-blur-md border-b border-[#BE9759]/35 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#hero"
          className="font-calligraphy text-2xl sm:text-3xl text-[#EAD7B7] whitespace-nowrap shrink-0"
        >
          Mantavya &amp; Nitika
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-sans tracking-[0.14em] uppercase text-[#EAD7B7]/85">
          <a
            href="#blessings-families"
            className="hover:text-[#F8F1E5] hover:underline underline-offset-4 decoration-[#BE9759] transition-colors whitespace-nowrap shrink-0"
          >
            Families
          </a>
          <a
            href="#celebrations"
            className="hover:text-[#F8F1E5] hover:underline underline-offset-4 decoration-[#BE9759] transition-colors whitespace-nowrap shrink-0"
          >
            Celebrations
          </a>
          <a
            href="#countdown"
            className="hover:text-[#F8F1E5] hover:underline underline-offset-4 decoration-[#BE9759] transition-colors whitespace-nowrap shrink-0"
          >
            Countdown
          </a>
          <a
            href="#gallery"
            className="hover:text-[#F8F1E5] hover:underline underline-offset-4 decoration-[#BE9759] transition-colors whitespace-nowrap shrink-0"
          >
            Gallery
          </a>
          <a
            href="#blessings-wishes"
            className="hover:text-[#F8F1E5] hover:underline underline-offset-4 decoration-[#BE9759] transition-colors whitespace-nowrap shrink-0"
          >
            Blessings
          </a>
        </nav>

        {/* Zone 3: 1 primary action (Share Invitation) */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={handleShare}
            className="min-h-[38px] px-3.5 py-1.5 rounded-full bg-[#641F32] hover:bg-[#4e1726] border border-[#BE9759]/75 text-xs font-sans text-[#F8F1E5] flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#EAD7B7]" />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#EAD7B7]" />
                <span>Share Invite</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Floating Music Control Button (Fixed Small, Elegant Button in Bottom-Right Safe Area) */}
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 pb-safe">
        <button
          type="button"
          onClick={onToggleMute}
          aria-label={isMuted ? 'Resume wedding music' : 'Pause wedding music'}
          className="min-h-[46px] min-w-[46px] px-4 py-2.5 rounded-full bg-[#391827]/95 backdrop-blur-md border-2 border-[#BE9759] text-[#EAD7B7] shadow-[0_10px_28px_rgba(20,6,12,0.5)] hover:bg-[#641F32] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-[#EAD7B7]" />
              <span className="text-xs font-sans tracking-wider uppercase whitespace-nowrap">
                MUSIC OFF
              </span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-[#EAD7B7]" />
              <span className="text-xs font-sans tracking-wider uppercase whitespace-nowrap">
                MUSIC ON
              </span>
            </>
          )}
        </button>
      </div>
    </>
  );
};
