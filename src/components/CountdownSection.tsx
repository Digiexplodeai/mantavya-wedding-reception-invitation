import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CalendarPlus, Sparkles } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { OrnamentalDivider, CornerFiligree } from './RoyalOrnaments';
import { getGoogleCalendarUrl } from '../utils/calendarUtils';
import { ScratchNumberOverlay } from './ScratchNumberOverlay';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

function calculateTimeLeft(): TimeLeft {
  const targetMs = new Date(weddingConfig.countdown.targetIsoIST).getTime();
  const nowMs = Date.now();
  const diff = Math.max(0, targetMs - nowMs);

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true };
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return { days, hours, minutes, seconds, isCompleted: false };
}

// Proactively clear any old persisted keys so fresh scratch experience appears on every refresh
try {
  if (typeof window !== 'undefined') {
    [
      'mn_scratch_days',
      'mn_scratch_hours',
      'mn_scratch_minutes',
      'mn_scratch_seconds',
      'mn_royal_scratch_wedding_v1',
      'mn_royal_scratch_reception_v1',
    ].forEach((k) => {
      sessionStorage.removeItem(k);
      localStorage.removeItem(k);
    });
  }
} catch {
  // ignore storage errors
}

// Top 3-Petal Lotus & Whisker Motif matching Image 2
const RoyalLotusMotif: React.FC<{ className?: string }> = ({
  className = 'w-14 sm:w-20 h-3.5 sm:h-5',
}) => (
  <svg
    viewBox="0 0 100 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Left whisker with dot and diamond terminal */}
    <line x1="6" y1="12" x2="36" y2="12" stroke="#E5C17D" strokeWidth="0.8" opacity="0.75" />
    <circle cx="21" cy="12" r="1.4" fill="#F8E2B2" />
    <polygon points="36,12 32.5,10 32.5,14" fill="#E5C17D" opacity="0.9" />

    {/* Center 3-Petal Royal Lotus matching Image 2 */}
    {/* Center Petal */}
    <path
      d="M50 22 C47.5 16 45.5 8 50 2 C54.5 8 52.5 16 50 22 Z"
      fill="url(#goldLotusGrad)"
      stroke="#BE9759"
      strokeWidth="0.6"
    />
    {/* Left Petal */}
    <path
      d="M48 22 C42 17 37 12 40 7 C45 8 47 15 48 22 Z"
      fill="url(#goldLotusGrad)"
      stroke="#BE9759"
      strokeWidth="0.6"
    />
    {/* Right Petal */}
    <path
      d="M52 22 C58 17 63 12 60 7 C55 8 53 15 52 22 Z"
      fill="url(#goldLotusGrad)"
      stroke="#BE9759"
      strokeWidth="0.6"
    />
    {/* Base jewel point */}
    <circle cx="50" cy="21" r="1.5" fill="#FFFBE8" />

    {/* Right whisker with dot and diamond terminal */}
    <polygon points="64,12 67.5,10 67.5,14" fill="#E5C17D" opacity="0.9" />
    <line x1="64" y1="12" x2="94" y2="12" stroke="#E5C17D" strokeWidth="0.8" opacity="0.75" />
    <circle cx="79" cy="12" r="1.4" fill="#F8E2B2" />

    <defs>
      <linearGradient id="goldLotusGrad" x1="40" y1="2" x2="60" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF4D0" />
        <stop offset="0.45" stopColor="#E2B968" />
        <stop offset="1" stopColor="#9E7530" />
      </linearGradient>
    </defs>
  </svg>
);

// Bottom Diamond & Whisker Flourish matching Image 2
const RoyalBottomFlourish: React.FC<{ className?: string }> = ({
  className = 'w-10 sm:w-14 h-2.5 sm:h-3.5',
}) => (
  <svg
    viewBox="0 0 100 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Left whisker line with bead */}
    <line x1="16" y1="10" x2="42" y2="10" stroke="#BE9759" strokeWidth="0.75" opacity="0.75" />
    <circle cx="29" cy="10" r="1.2" fill="#EAD7B7" opacity="0.9" />

    {/* Center royal diamond motif */}
    <polygon
      points="50,3.5 54.5,10 50,16.5 45.5,10"
      fill="url(#goldFlourishGrad)"
      stroke="#BE9759"
      strokeWidth="0.5"
    />
    <circle cx="50" cy="10" r="1.1" fill="#FFF9E6" />

    {/* Right whisker line with bead */}
    <line x1="58" y1="10" x2="84" y2="10" stroke="#BE9759" strokeWidth="0.75" opacity="0.75" />
    <circle cx="71" cy="10" r="1.2" fill="#EAD7B7" opacity="0.9" />

    <defs>
      <linearGradient id="goldFlourishGrad" x1="45" y1="3.5" x2="55" y2="16.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF2C2" />
        <stop offset="0.5" stopColor="#D4A755" />
        <stop offset="1" stopColor="#8E6322" />
      </linearGradient>
    </defs>
  </svg>
);

export const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft());

  // In-memory state only: every fresh page load or refresh starts completely unrevealed
  const [revealedUnits, setRevealedUnits] = useState<Record<string, boolean>>({
    DAYS: false,
    HOURS: false,
    MINUTES: false,
    SECONDS: false,
  });

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRevealUnit = (label: string) => {
    setRevealedUnits((prev) => (prev[label] ? prev : { ...prev, [label]: true }));
  };

  const handleRevealAll = () => {
    setRevealedUnits({
      DAYS: true,
      HOURS: true,
      MINUTES: true,
      SECONDS: true,
    });
  };

  const allRevealed = Object.values(revealedUnits).every(Boolean);

  const units = [
    { label: 'DAYS', value: String(timeLeft.days).padStart(2, '0') },
    { label: 'HOURS', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'MINUTES', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'SECONDS', value: String(timeLeft.seconds).padStart(2, '0') },
  ];

  return (
    <section
      id="countdown"
      className="relative py-16 sm:py-24 px-3 sm:px-6 bg-[#641F32] text-[#F8F1E5] overflow-hidden"
    >
      {/* Subtle Animated Golden Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(234, 215, 183, 0.16) 0%, rgba(57, 24, 39, 0.72) 100%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl bg-[#391827]/85 backdrop-blur-md border-2 border-[#BE9759] px-2.5 py-8 sm:px-10 sm:py-14 text-center shadow-[0_24px_60px_rgba(20,6,12,0.5)]"
        >
          <div className="absolute inset-2.5 rounded-2xl border border-[#EAD7B7]/15 pointer-events-none" />
          <CornerFiligree className="absolute top-3 left-3 w-9 h-9" color="#BE9759" />
          <CornerFiligree className="absolute top-3 right-3 w-9 h-9 -scale-x-100" color="#BE9759" />
          <CornerFiligree className="absolute bottom-3 left-3 w-9 h-9 -scale-y-100" color="#BE9759" />
          <CornerFiligree className="absolute bottom-3 right-3 w-9 h-9 -scale-100" color="#BE9759" />

          <p className="font-sans text-xs tracking-[0.22em] uppercase text-[#EAD7B7]/85">
            14 November 2026 · 7:00 PM · {weddingConfig.countdown.timezoneLabel}
          </p>

          <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-semibold text-[#F8F1E5]">
            {weddingConfig.countdown.heading}
          </h2>

          <div className="my-4 flex justify-center">
            <OrnamentalDivider className="w-48 h-5" color="#BE9759" />
          </div>

          {/* 4-Column Royal Countdown Cards matching Image 2 */}
          <div className="mt-7 grid grid-cols-4 gap-1.5 sm:gap-3.5 md:gap-4 max-w-2xl mx-auto items-stretch">
            {units.map((unit) => {
              const isRevealed = Boolean(revealedUnits[unit.label]);
              return (
                <div
                  key={unit.label}
                  className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#4A1020] via-[#380B17] to-[#24060E] border border-[#E5C17D]/75 p-1.5 sm:p-3.5 md:p-4 shadow-[0_12px_32px_rgba(20,4,8,0.7),inset_0_1px_1px_rgba(255,255,255,0.18)] flex flex-col items-center justify-between overflow-hidden select-none"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 50% 25%, rgba(229,193,125,0.09) 0%, transparent 75%)',
                  }}
                >
                  {/* Inner decorative hairline border */}
                  <div className="absolute inset-1 sm:inset-1.5 rounded-xl sm:rounded-2xl border border-[#BE9759]/35 pointer-events-none" />

                  {/* Top: Small traditional gold floral motif near top */}
                  <div className="relative z-10 pt-0.5 sm:pt-1 pb-1 sm:pb-2 flex justify-center w-full">
                    <RoyalLotusMotif className="w-12 sm:w-18 md:w-20 h-3 sm:h-4 md:h-5 max-w-full" />
                  </div>

                  {/* Middle: Metallic gold scratch surface plate */}
                  {/* Scaled to ~72-74% card width so deep burgundy background & gold borders frame it clearly */}
                  <div className="relative z-10 w-[74%] sm:w-[72%] max-w-[130px] my-1 sm:my-2.5 aspect-[1/0.82] min-h-[50px] sm:min-h-[76px] md:min-h-[90px] rounded-xl sm:rounded-2xl border border-[#FFE099]/85 ring-1 ring-[#FFE099]/40 shadow-[0_4px_14px_rgba(0,0,0,0.65),inset_0_1px_2px_rgba(255,255,255,0.85)] overflow-hidden flex items-center justify-center">
                    {/* Specular curved flare at top-left corner matching Image 2 */}
                    <div className="absolute top-0 left-0 w-4 h-4 sm:w-7 sm:h-7 pointer-events-none z-30 rounded-tl-xl sm:rounded-tl-2xl bg-gradient-to-br from-white/95 via-white/45 to-transparent blur-[0.4px]" />

                    {/* Recessed chamber with live countdown number */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#2B0813] via-[#380E1B] to-[#20050E] flex items-center justify-center">
                      <span className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-[#F8F1E5] tabular-nums tracking-tight drop-shadow-[0_2px_12px_rgba(234,215,183,0.55)] select-none">
                        {unit.value}
                      </span>
                    </div>

                    {/* Metallic champagne-gold scratchable surface */}
                    <ScratchNumberOverlay
                      isRevealed={isRevealed}
                      onReveal={() => handleRevealUnit(unit.label)}
                    />
                  </div>

                  {/* Bottom: DAYS / HOURS / MINUTES / SECONDS Label & Flourish */}
                  <div className="relative z-10 pb-0.5 sm:pb-1 w-full flex flex-col items-center">
                    <span className="font-serif text-[9px] sm:text-xs md:text-sm font-semibold tracking-[0.18em] sm:tracking-[0.24em] text-[#F8F1E5] uppercase text-center drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] whitespace-nowrap">
                      {unit.label}
                    </span>

                    {/* Decorative gold flourish divider below label */}
                    <div className="mt-1 sm:mt-1.5 flex justify-center w-full">
                      <RoyalBottomFlourish className="w-8 sm:w-12 md:w-14 h-2 sm:h-3 max-w-full" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Accessible helper: Reveal All Numbers */}
          {!allRevealed && (
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={handleRevealAll}
                className="min-h-[36px] px-3.5 py-1 text-[11px] font-sans tracking-[0.14em] uppercase text-[#EAD7B7]/75 hover:text-[#F8F1E5] underline underline-offset-4 decoration-[#BE9759]/50 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#BE9759]" />
                <span>Reveal All Numbers</span>
              </button>
            </div>
          )}

          {timeLeft.isCompleted && (
            <p className="mt-5 font-serif italic text-xl text-[#EAD7B7]">
              The Auspicious Royal Celebration Has Begun!
            </p>
          )}

          {/* Save the Reception Quick Calendar Action (Centered) */}
          <div className="mt-8 pt-6 border-t border-[#BE9759]/30 flex justify-center">
            {weddingConfig.events[0] && (
              <a
                href={getGoogleCalendarUrl(weddingConfig.events[0])}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-full bg-[#F8F1E5]/10 hover:bg-[#F8F1E5]/20 border border-[#BE9759]/60 text-xs font-sans tracking-[0.12em] uppercase text-[#EAD7B7] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <CalendarPlus className="w-4 h-4 text-[#BE9759] shrink-0" />
                <span className="whitespace-nowrap">Save Reception · 14 Nov</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
