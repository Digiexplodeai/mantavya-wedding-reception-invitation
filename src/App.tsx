/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { RoyalOpeningCover, EntranceState } from './components/RoyalOpeningCover';
import { NavigationAndControls } from './components/NavigationAndControls';
import { FloatingPetals } from './components/FloatingPetals';
import { HeroSection } from './components/HeroSection';
import { FamiliesSection } from './components/FamiliesSection';
import { EventsSection } from './components/EventsSection';
import { CountdownSection } from './components/CountdownSection';
import { StorytellingSection } from './components/StorytellingSection';
import { GallerySection } from './components/GallerySection';
import { BlessingsSection } from './components/BlessingsSection';
import { LocationsSection } from './components/LocationsSection';
import { FamilyRegardsSection } from './components/FamilyRegardsSection';
import { ClosingSection } from './components/ClosingSection';
import { royalAudio } from './utils/royalAudio';

export default function App() {
  const [entranceState, setEntranceState] = useState<EntranceState>('cover');
  const [isMuted, setIsMuted] = useState<boolean>(() => royalAudio.getMuted());

  useEffect(() => {
    return royalAudio.subscribe((isPlaying) => {
      setIsMuted(!isPlaying);
    });
  }, []);

  // Lock body scroll only while the royal entrance doors are closed or swinging open
  useEffect(() => {
    if (entranceState !== 'completed') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [entranceState]);

  const handleToggleMute = () => {
    royalAudio.togglePlay();
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F1E5] text-[#391827] relative overflow-x-hidden">
      {/* Gentle Floating Petals & Golden Particles */}
      <FloatingPetals
        density={entranceState === 'completed' ? 'subtle' : 'celebration'}
        variant="mixed"
      />

      {/* Main Wedding Invitation Website (Rendered directly behind the royal palace doors at all times) */}
      <div
        className={`w-full transition-opacity duration-700 ${
          entranceState === 'completed'
            ? 'pointer-events-auto select-auto'
            : 'pointer-events-none select-none'
        }`}
      >
        <NavigationAndControls
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />

        <main>
          {/* 4. Hero Section — The Beginning of Forever */}
          <HeroSection />

          {/* 5. Our Families — Blessings & Love */}
          <FamiliesSection />

          {/* 6. Wedding Celebrations — Interactive Event Cards */}
          <EventsSection />

          {/* 7. Live Wedding Countdown (12 Nov 2026, 5:00 PM IST) */}
          <CountdownSection />

          {/* 8. A Royal Journey — Scroll Storytelling */}
          <StorytellingSection />

          {/* 9. Photo Gallery — Moments to Cherish */}
          <GallerySection />

          {/* 10. Blessings and Wedding Wishes */}
          <BlessingsSection />

          {/* 11. Wedding Locations */}
          <LocationsSection />

          {/* 12. Family Regards */}
          <FamilyRegardsSection />
        </main>

        {/* 13. Beautiful Closing Animation */}
        <ClosingSection />
      </div>

      {/* Cinematic 3D Royal Palace Door Reveal Overlay */}
      {entranceState !== 'completed' && (
        <RoyalOpeningCover
          entranceState={entranceState}
          onStartOpen={() => setEntranceState('opening')}
          onOpenComplete={() => setEntranceState('completed')}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}
    </div>
  );
}
