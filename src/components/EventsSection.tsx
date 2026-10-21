import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  MapPin,
  Clock,
  Navigation,
  Compass,
} from 'lucide-react';
import { weddingConfig, WeddingEventConfig } from '../config/weddingConfig';
import {
  OrnamentalDivider,
  CornerFiligree,
} from './RoyalOrnaments';

export const EventsSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="celebrations"
      className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-[#391827] via-[#4D1929] to-[#391827] text-[#F8F1E5] overflow-hidden"
    >
      {/* Subtle Golden Radial Illumination */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 15%, rgba(190, 151, 89, 0.16) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="text-center max-w-xl mx-auto mb-12 sm:mb-16"
        >
          <p className="font-sans text-xs tracking-[0.22em] uppercase text-[#EAD7B7]/85">
            Royal Evening &amp; Celebration
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-semibold text-[#F8F1E5]">
            Wedding Reception
          </h2>
          <div className="my-4 flex justify-center">
            <OrnamentalDivider className="w-52 h-6" color="#BE9759" />
          </div>
          <p className="font-serif italic text-base sm:text-lg text-[#EAD7B7]/90">
            An auspicious evening of music, blessings, and celebratory dining
          </p>
        </motion.div>

        {/* Event Card Container (Centered Single Card) */}
        <div className="w-full max-w-xl mx-auto flex justify-center">
          {weddingConfig.events.map((event: WeddingEventConfig, index: number) => {
            const isReception = event.id === 'reception';

            return (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`w-full relative rounded-3xl border-2 border-[#BE9759] overflow-hidden shadow-[0_24px_60px_rgba(20,6,12,0.55)] ${
                  isReception
                    ? 'bg-gradient-to-b from-[#2B121E] via-[#391827] to-[#230E18]'
                    : 'bg-gradient-to-b from-[#641F32] via-[#511828] to-[#391827]'
                }`}
              >
                {/* Inner Filigree Outline */}
                <div className="absolute inset-2.5 rounded-2xl border border-[#EAD7B7]/20 pointer-events-none" />
                <CornerFiligree className="absolute top-3 left-3 w-9 h-9 opacity-75" color="#BE9759" />
                <CornerFiligree className="absolute top-3 right-3 w-9 h-9 -scale-x-100 opacity-75" color="#BE9759" />

                {/* Top Illustration Banner */}
                {isReception ? (
                  <div className="pt-5 px-3 sm:px-5 pb-3 border-b border-[#BE9759]/30 w-full flex justify-center">
                    <motion.img
                      src="/assets/aistudio/2_562d2664.png"
                      alt="Royal Golden Wedding Reception Illustration"
                      referrerPolicy="no-referrer"
                      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-20px' }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="w-full max-w-[700px] h-auto block mx-auto object-contain select-none drop-shadow-[0_2px_12px_rgba(190,151,89,0.22)]"
                    />
                  </div>
                ) : (
                  <div className="pt-5 px-3 sm:px-5 pb-3 border-b border-[#BE9759]/30 w-full flex justify-center">
                    <motion.img
                      src="/assets/aistudio/1_09e768f3.png"
                      alt="Royal Golden Mandap Wedding Ceremony Illustration"
                      referrerPolicy="no-referrer"
                      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-20px' }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="w-full max-w-[700px] h-auto block mx-auto object-contain select-none drop-shadow-[0_2px_12px_rgba(190,151,89,0.22)]"
                    />
                  </div>
                )}

                {/* Card Body */}
                <div className="pt-3.5 pb-6 px-6 sm:pb-8 sm:px-8 relative z-10">
                  {/* Unboxed Typographic Kicker */}
                  <div className="flex items-center justify-center gap-2 text-xs font-sans tracking-[0.18em] uppercase text-[#EAD7B7]">
                    <span>{event.badge}</span>
                  </div>

                  <h3 className="mt-2 text-center font-serif text-3xl sm:text-4xl font-semibold text-[#F8F1E5]">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-center font-serif italic text-sm sm:text-base text-[#EAD7B7]/85">
                    {event.subtitle}
                  </p>

                  {/* Attractive Calendar-Style Date Display (Inspired by Invitation Card) */}
                  <div className="my-6 py-3.5 px-3 sm:px-5 rounded-2xl bg-[#391827]/80 border border-[#BE9759]/60 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
                    <div className="text-center border-y border-[#BE9759]/35 py-2 px-1 min-w-0">
                      <span className="block font-sans text-[9px] sm:text-[10px] tracking-[0.16em] uppercase text-[#EAD7B7]/75">
                        Day
                      </span>
                      <span className="block font-serif text-sm sm:text-lg font-semibold tracking-wider text-[#F8F1E5] whitespace-nowrap">
                        {event.dayOfWeek}
                      </span>
                    </div>

                    <div className="px-3 sm:px-5 py-1 border-x border-[#BE9759]/45 text-center flex flex-col items-center justify-center shrink-0">
                      <span className="font-serif text-4xl sm:text-5xl font-bold text-[#EAD7B7] tabular-nums leading-none">
                        {event.dayNumber}
                      </span>
                      <span className="mt-1 font-sans text-[10px] sm:text-xs tracking-[0.2em] font-semibold text-[#EAD7B7]/90 tabular-nums">
                        2026
                      </span>
                    </div>

                    <div className="text-center border-y border-[#BE9759]/35 py-2 px-1 min-w-0">
                      <span className="block font-sans text-[9px] sm:text-[10px] tracking-[0.16em] uppercase text-[#EAD7B7]/75">
                        Month
                      </span>
                      <span className="block font-serif text-sm sm:text-lg font-semibold tracking-wider text-[#F8F1E5] whitespace-nowrap">
                        NOVEMBER
                      </span>
                    </div>
                  </div>

                  {/* Ceremony Timings List */}
                  <div className="space-y-3 my-5">
                    {event.subEvents.map((sub, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-4 py-2.5 px-4 rounded-xl bg-[#F8F1E5]/[0.06] border border-[#BE9759]/35"
                      >
                        <div className="flex items-center gap-2.5">
                          <Clock className="w-4 h-4 text-[#BE9759] shrink-0" />
                          <span className="font-serif text-lg font-medium text-[#F8F1E5]">
                            {sub.title}
                          </span>
                        </div>
                        <span className="font-sans text-sm font-semibold text-[#EAD7B7] tabular-nums whitespace-nowrap">
                          {sub.time}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Venue Details Block */}
                  <div className="mt-6 pt-5 border-t border-[#BE9759]/35 text-center space-y-1.5">
                    <div className="inline-flex items-center gap-1.5 text-xs font-sans tracking-[0.18em] uppercase text-[#BE9759]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Venue</span>
                    </div>
                    <h4 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide text-[#EAD7B7]">
                      {event.venue.name}
                    </h4>
                    <p className="font-sans text-sm sm:text-base text-[#F8F1E5]/90">
                      {event.venue.addressLine}, {event.venue.cityState}
                    </p>
                    {event.venue.landmark && (
                      <p className="font-sans text-xs sm:text-sm text-[#EAD7B7]/85 italic pt-1 flex items-center justify-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-[#BE9759] shrink-0" />
                        <span>({event.venue.landmark})</span>
                      </p>
                    )}
                  </div>

                  {/* Primary CTA: Get Directions on Google Maps */}
                  <div className="mt-6">
                    <a
                      href={event.venue.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full min-h-[48px] py-3 px-6 rounded-full bg-gradient-to-r from-[#BE9759] via-[#D4B075] to-[#BE9759] text-[#391827] font-serif font-bold text-base tracking-[0.08em] shadow-[0_10px_25px_rgba(190,151,89,0.3)] hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                    >
                      <Navigation className="w-4 h-4 text-[#391827] shrink-0" />
                      <span className="whitespace-nowrap">Get Directions</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
