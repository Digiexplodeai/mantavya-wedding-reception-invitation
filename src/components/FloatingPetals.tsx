import React, { useMemo } from 'react';
import { useReducedMotion } from 'motion/react';

interface FloatingPetalsProps {
  density?: 'subtle' | 'celebration';
  variant?: 'gold-dust' | 'rose-petals' | 'mixed';
  className?: string;
}

/**
 * Refined Celebration Leaves, Rose Petals & Golden Shagun Dust
 * Graceful, soft, cinematic floating elements that drift naturally
 */
export const FloatingPetals: React.FC<FloatingPetalsProps> = ({
  density = 'subtle',
  variant = 'mixed',
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  const items = useMemo(() => {
    const count = density === 'celebration' ? 22 : 12;
    return Array.from({ length: count }).map((_, i) => {
      const left = ((i * 17 + 5) % 92) + 4;
      const delay = (i * 0.8) % 10;
      const duration = 12 + ((i * 2.1) % 9);
      const size = 10 + ((i * 3) % 12);
      const itemType = i % 4; // 0: Rose Petal, 1: Golden Petal, 2: Festive Leaf, 3: Gold Sparkle
      return {
        id: i,
        left: `${left}%`,
        delay: `${delay.toFixed(1)}s`,
        duration: `${duration.toFixed(1)}s`,
        size,
        itemType,
      };
    });
  }, [density]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden z-20 ${className}`}
      aria-hidden="true"
    >
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
            width: `${item.size}px`,
            height: `${item.size}px`,
          }}
          className="absolute -top-7 animate-royal-petal opacity-75"
        >
          {/* 1. Velvety Burgundy Rose Petal */}
          {item.itemType === 0 && (
            <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-[0_2px_4px_rgba(70,15,30,0.3)]">
              <path
                d="M16 2 C24 5 30 14 26 24 C23 29 18 31 15 30 C10 29 5 24 4 17 C3 10 9 3 16 2 Z"
                fill="#6B172E"
                fillOpacity="0.75"
              />
              {/* Petal Spine Curve */}
              <path
                d="M16 5 C17 12 16 20 15 28"
                stroke="#942642"
                strokeWidth="0.8"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />
            </svg>
          )}

          {/* 2. Warm Saffron-Gold Marigold Petal */}
          {item.itemType === 1 && (
            <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-[0_2px_4px_rgba(190,151,89,0.35)]">
              <path
                d="M16 3 C23 7 27 16 24 25 C21 29 16 30 14 28 C9 26 6 20 7 14 C8 7 11 3 16 3 Z"
                fill="#C89D52"
                fillOpacity="0.75"
              />
              <path
                d="M15 6 C16 13 15 20 14 26"
                stroke="#FFF2D6"
                strokeWidth="0.7"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
              />
            </svg>
          )}

          {/* 3. Graceful Festive Leaf (Ashoka / Parijat leaf) */}
          {item.itemType === 2 && (
            <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-[0_2px_4px_rgba(40,25,10,0.25)]">
              <path
                d="M16 2 C22 8 25 18 20 27 C18 29 15 30 13 28 C9 24 8 16 11 9 C13 5 15 3 16 2 Z"
                fill="#8E7A4A"
                fillOpacity="0.7"
              />
              <path
                d="M16 4 C16 12 15 20 13 27"
                stroke="#D4BA7E"
                strokeWidth="0.7"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />
            </svg>
          )}

          {/* 4. Glowing Gold Shagun Particle */}
          {item.itemType === 3 && (
            <div className="relative w-full h-full flex items-center justify-center">
              <span
                className="block rounded-full bg-gradient-to-r from-[#FFF4DE] via-[#EAD7B7] to-[#BE9759] shadow-[0_0_8px_#BE9759]"
                style={{
                  width: `${Math.max(4, item.size * 0.42)}px`,
                  height: `${Math.max(4, item.size * 0.42)}px`,
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
