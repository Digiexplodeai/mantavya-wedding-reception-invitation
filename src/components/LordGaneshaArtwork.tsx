import React from 'react';

interface LordGaneshaArtworkProps {
  className?: string;
  alt?: string;
}

/**
 * Centralized Divine Lord Ganesha Medallion Image Asset Component
 * Reuses the uploaded high-resolution Ornate Golden Ganesha Medallion image asset
 * across all three wedding website screens:
 * 1. Screen One: Main Wedding Welcome / Hero Page (Maroon Theme)
 * 2. Screen Two: Family Blessings Page (Ivory Theme)
 * 3. Screen Three: Wedding Invitation Opening Card (Royal Door Cover)
 */
export const LordGaneshaArtwork: React.FC<LordGaneshaArtworkProps> = ({
  className = 'w-24 h-24 sm:w-28 sm:h-28',
  alt = 'Auspicious Divine Lord Ganesha Medallion',
}) => {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      {/* Soft Divine Golden Radial Illumination Glow */}
      <div
        className="absolute inset-0 -m-2 pointer-events-none rounded-full"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(255, 246, 224, 0.4) 0%, rgba(234, 215, 183, 0.2) 48%, rgba(190, 151, 89, 0.05) 70%, transparent 80%)',
          filter: 'blur(8px)',
        }}
      />

      <img
        src="/assets/aistudio/Ornate_Golden_Ganesha_Medallion__1__48ce1690.webp"
        alt={alt}
        loading="eager"
        decoding="async"
        className="relative z-10 w-full h-full object-contain drop-shadow-[0_4px_16px_rgba(100,31,50,0.22)] pointer-events-none select-none"
      />
    </div>
  );
};
