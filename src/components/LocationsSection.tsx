import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Copy, Check, Calendar, Compass } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { OrnamentalDivider, CornerFiligree } from './RoyalOrnaments';

export const LocationsSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyAddress = (id: string, text: string) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2200);
    }).catch(() => {});
  };

  return (
    <section
      id="locations"
      className="relative py-16 sm:py-24 px-4 sm:px-6 bg-[#F8F1E5] text-[#391827] overflow-hidden"
    >
      <div className="absolute inset-0 royal-jaali-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <p className="font-sans text-xs tracking-[0.22em] uppercase text-[#641F32]/80 font-medium">
            Royal Venue &amp; Navigation
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-semibold text-[#641F32]">
            Wedding Reception Venue
          </h2>
          <div className="my-4 flex justify-center">
            <OrnamentalDivider className="w-48 h-5" color="#BE9759" />
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#391827]/80">
            Get directions to our Wedding Reception venue in Punjab.
          </p>
        </motion.div>

        {/* Venue Card Container (Centered Single Card) */}
        <div className="w-full max-w-xl mx-auto flex justify-center">
          {weddingConfig.events.map((event, idx) => {
            const fullAddress = `${event.venue.name}, ${event.venue.addressLine}, ${event.venue.cityState}`;
            const isCopied = copiedId === event.id;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: idx * 0.12 }}
                className="w-full relative rounded-3xl bg-[#F8F1E5] border-2 border-[#BE9759] p-6 sm:p-8 shadow-[0_18px_45px_rgba(100,31,50,0.09)] flex flex-col justify-between"
              >
                <div className="absolute inset-2.5 rounded-2xl border border-[#641F32]/15 pointer-events-none" />
                <CornerFiligree className="absolute top-3 left-3 w-8 h-8" color="#641F32" />
                <CornerFiligree className="absolute top-3 right-3 w-8 h-8 -scale-x-100" color="#641F32" />

                <div>
                  {/* Event Name & Date */}
                  <div className="flex items-center justify-between gap-2 text-xs font-sans tracking-[0.15em] uppercase text-[#641F32]/85 pb-3 border-b border-[#BE9759]/40">
                    <span className="font-semibold">{event.title}</span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#BE9759]" />
                      {event.dateDisplay}
                    </span>
                  </div>

                  {/* Venue Name */}
                  <div className="mt-5 flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#641F32] text-[#EAD7B7] border border-[#BE9759] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#641F32]">
                        {event.venue.name}
                      </h3>
                      <p className="font-sans text-xs tracking-[0.14em] uppercase text-[#BE9759] font-semibold mt-0.5">
                        {event.venue.cityState}
                      </p>
                    </div>
                  </div>

                  {/* Full Address & Landmark */}
                  <div className="mt-4 p-4 rounded-2xl bg-[#EAD7B7]/25 border border-[#BE9759]/40 space-y-1.5">
                    <p className="font-sans text-sm sm:text-base text-[#391827] font-medium">
                      {event.venue.addressLine}, {event.venue.cityState}
                    </p>
                    {event.venue.landmark && (
                      <p className="font-sans text-xs sm:text-sm text-[#641F32] flex items-center gap-1.5 pt-1">
                        <Compass className="w-4 h-4 text-[#641F32] shrink-0" />
                        <span>Landmark: {event.venue.landmark}</span>
                      </p>
                    )}
                    <p className="font-sans text-xs text-[#391827]/75 pt-1">
                      Timings: {event.timeSummary}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-4 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={event.venue.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 min-h-[48px] px-5 py-3 rounded-full bg-[#641F32] hover:bg-[#4e1726] text-[#F8F1E5] border border-[#BE9759] font-serif text-base font-semibold tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-4 h-4 text-[#EAD7B7] shrink-0" />
                    <span className="whitespace-nowrap">Get Directions</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopyAddress(event.id, fullAddress)}
                    className="w-full sm:w-auto min-h-[48px] px-4 py-3 rounded-full bg-[#EAD7B7]/35 hover:bg-[#EAD7B7]/55 border border-[#BE9759]/60 text-[#391827] text-xs font-sans font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-[#641F32]" />
                        <span className="whitespace-nowrap">Address Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#641F32]" />
                        <span className="whitespace-nowrap">Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
