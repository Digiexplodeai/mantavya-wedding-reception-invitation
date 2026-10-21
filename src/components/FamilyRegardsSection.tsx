import React from 'react';
import { motion } from 'motion/react';
import { Phone, Home, MapPin } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { OrnamentalDivider, CornerFiligree } from './RoyalOrnaments';

export const FamilyRegardsSection: React.FC = () => {
  return (
    <section
      id="family-regards"
      className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-[#391827] via-[#511828] to-[#391827] text-[#F8F1E5] overflow-hidden"
    >
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl bg-[#391827]/90 border-2 border-[#BE9759] px-6 py-12 sm:px-12 sm:py-16 text-center shadow-[0_24px_60px_rgba(20,6,12,0.55)]"
        >
          <div className="absolute inset-3 rounded-2xl border border-[#EAD7B7]/20 pointer-events-none" />
          <CornerFiligree className="absolute top-3 left-3 w-10 h-10" color="#BE9759" />
          <CornerFiligree className="absolute top-3 right-3 w-10 h-10 -scale-x-100" color="#BE9759" />
          <CornerFiligree className="absolute bottom-3 left-3 w-10 h-10 -scale-y-100" color="#BE9759" />
          <CornerFiligree className="absolute bottom-3 right-3 w-10 h-10 -scale-100" color="#BE9759" />

          <p className="font-serif italic text-lg sm:text-xl text-[#EAD7B7]">
            {weddingConfig.regards.heading}
          </p>

          <h2 className="mt-1 font-serif text-3xl sm:text-5xl font-bold text-[#F8F1E5] tracking-wide">
            {weddingConfig.regards.primaryFamilyTitle}
          </h2>

          <div className="my-5 flex justify-center">
            <OrnamentalDivider className="w-52 h-6" color="#BE9759" />
          </div>

          {/* 6 Family Couples Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 max-w-xl mx-auto">
            {weddingConfig.regards.couplesList.map((coupleName, index) => (
              <motion.div
                key={coupleName}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="py-3 px-4 rounded-2xl bg-[#641F32]/50 border border-[#BE9759]/40 font-serif text-lg sm:text-xl text-[#F8F1E5] font-medium"
              >
                {coupleName}
              </motion.div>
            ))}
          </div>

          <div className="my-7 flex justify-center">
            <OrnamentalDivider className="w-40 h-4" color="#BE9759" variant="simple" />
          </div>

          {/* Family Residence Address */}
          <div className="max-w-md mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-sans tracking-[0.18em] uppercase text-[#BE9759]">
              <Home className="w-3.5 h-3.5" />
              <span>Family Residence</span>
            </div>
            <p className="font-serif text-lg sm:text-xl text-[#EAD7B7] font-medium">
              {weddingConfig.regards.residenceAddress}
            </p>
            <div className="pt-1">
              <a
                href={weddingConfig.regards.residenceMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-sans text-[#EAD7B7]/80 hover:text-[#F8F1E5] underline underline-offset-4 decoration-[#BE9759]/50"
              >
                <MapPin className="w-3.5 h-3.5 text-[#BE9759]" />
                <span>View Ropar Residence on Google Maps</span>
              </a>
            </div>
          </div>

          {/* Clickable Phone Links for Mobile Visitors */}
          <div className="mt-8 pt-6 border-t border-[#BE9759]/30">
            <p className="font-sans text-xs tracking-[0.18em] uppercase text-[#EAD7B7]/80 mb-4">
              Tap to Call Family Contacts
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              {weddingConfig.regards.contacts.map((contact) => (
                <a
                  key={contact.display}
                  href={contact.href}
                  className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-full bg-gradient-to-r from-[#BE9759] via-[#D4B075] to-[#BE9759] text-[#391827] font-sans font-bold text-sm tracking-wider tabular-nums shadow-md hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
                >
                  <Phone className="w-4 h-4 text-[#391827] shrink-0" />
                  <span>+91 {contact.display}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
