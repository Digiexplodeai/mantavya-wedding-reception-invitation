import React from 'react';
import { GalleryItemConfig } from '../config/weddingConfig';

export const GaneshaMotif: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-14 h-14',
  color = '#BE9759',
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Auspicious Lord Ganesha Motif"
  >
    {/* Outer Sacred Mandala Ring */}
    <circle cx="60" cy="60" r="56" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.55" />
    <circle cx="60" cy="60" r="50" stroke={color} strokeWidth="1.2" opacity="0.75" />
    {/* Scalloped Lotus Petals */}
    <path
      d="M60 6 C65 14 70 14 75 8 C76 16 82 18 88 14 C86 22 91 26 98 24 C94 31 98 36 106 37 C100 43 102 49 110 52 C102 56 102 62 110 67 C102 70 100 76 106 82 C98 83 94 88 98 95 C91 93 86 97 88 105 C82 101 76 103 75 111 C70 105 65 105 60 113 C55 105 50 105 45 111 C44 103 38 101 32 105 C34 97 29 93 22 95 C26 88 22 83 14 82 C20 76 18 70 10 67 C18 62 18 56 10 52 C18 49 20 43 14 37 C22 36 26 31 22 24 C29 26 34 22 32 14 C38 18 44 16 45 8 C50 14 55 14 60 6 Z"
      stroke={color}
      strokeWidth="1"
      opacity="0.4"
    />
    {/* Mukut (Royal Crown) */}
    <path
      d="M60 20 L68 34 L52 34 Z"
      stroke={color}
      strokeWidth="1.6"
      fill={color}
      fillOpacity="0.18"
    />
    <path d="M47 38 H73" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="60" cy="17" r="2.5" fill={color} />
    {/* Graceful Ears */}
    <path
      d="M46 44 C31 40 27 56 38 64 C42 67 45 64 47 61"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M74 44 C89 40 93 56 82 64 C78 67 75 64 73 61"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Forehead Tilak & Curved Trunk */}
    <path d="M55 44 H65 M57 48 H63" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="60" cy="52" r="1.8" fill={color} />
    <path
      d="M60 42 C51 44 50 56 54 67 C57 75 66 78 68 72 C69 68 65 66 63 69"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    {/* Sacred Lotus Base */}
    <path
      d="M38 86 C46 93 74 93 82 86"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M44 91 C52 96 68 96 76 91"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      opacity="0.75"
    />
  </svg>
);

export const OrnamentalDivider: React.FC<{
  className?: string;
  color?: string;
  variant?: 'simple' | 'flourish';
}> = ({ className = 'w-56 h-7', color = '#BE9759', variant = 'flourish' }) => {
  if (variant === 'simple') {
    return (
      <svg viewBox="0 0 240 20" fill="none" className={className} aria-hidden="true">
        <line x1="10" y1="10" x2="96" y2="10" stroke={color} strokeWidth="1" opacity="0.6" />
        <polygon points="120,4 126,10 120,16 114,10" fill={color} opacity="0.85" />
        <circle cx="104" cy="10" r="2" fill={color} opacity="0.7" />
        <circle cx="136" cy="10" r="2" fill={color} opacity="0.7" />
        <line x1="144" y1="10" x2="230" y2="10" stroke={color} strokeWidth="1" opacity="0.6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 320 36" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 18 H108"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M212 18 H312"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* Left & Right Scrollwork */}
      <path
        d="M112 18 C122 8 134 8 142 18 C134 28 122 28 112 18 Z"
        stroke={color}
        strokeWidth="1.2"
        fill={color}
        fillOpacity="0.12"
      />
      <path
        d="M208 18 C198 8 186 8 178 18 C186 28 198 28 208 18 Z"
        stroke={color}
        strokeWidth="1.2"
        fill={color}
        fillOpacity="0.12"
      />
      {/* Center Royal Lotus Diamond */}
      <path
        d="M160 4 L172 18 L160 32 L148 18 Z"
        stroke={color}
        strokeWidth="1.4"
        fill={color}
        fillOpacity="0.2"
      />
      <circle cx="160" cy="18" r="3" fill={color} />
      <circle cx="104" cy="18" r="2" fill={color} opacity="0.7" />
      <circle cx="216" cy="18" r="2" fill={color} opacity="0.7" />
    </svg>
  );
};

export const CornerFiligree: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-12 h-12',
  color = '#BE9759',
}) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
    <path
      d="M4 60 V16 C4 9.37 9.37 4 16 4 H60"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M10 52 V20 C10 14.47 14.47 10 20 10 H52"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.65"
    />
    <path
      d="M4 28 C16 28 28 16 28 4"
      stroke={color}
      strokeWidth="1.2"
      opacity="0.75"
    />
    <circle cx="16" cy="16" r="2.5" fill={color} />
    <circle cx="34" cy="10" r="1.5" fill={color} opacity="0.7" />
    <circle cx="10" cy="34" r="1.5" fill={color} opacity="0.7" />
  </svg>
);

export const BaratProcessionIllustration: React.FC<{ className?: string }> = ({
  className = 'w-full h-24',
}) => (
  <svg viewBox="0 0 400 96" fill="none" className={className} aria-hidden="true">
    {/* Decorative Ground Line */}
    <line x1="20" y1="84" x2="380" y2="84" stroke="#BE9759" strokeWidth="1" opacity="0.5" />
    {/* Royal Chhatri Umbrella */}
    <path
      d="M190 22 C205 10 230 10 245 22 Z"
      fill="#BE9759"
      fillOpacity="0.3"
      stroke="#BE9759"
      strokeWidth="1.4"
    />
    <line x1="217" y1="22" x2="217" y2="55" stroke="#BE9759" strokeWidth="1.3" />
    {/* Ceremonial Horse & Groom Silhouette in Gold Outline */}
    <path
      d="M165 84 L172 60 L164 48 L175 36 L184 42 L188 52 L212 52 L222 40 L230 46 L225 62 L232 84"
      stroke="#BE9759"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Accompanying Lantern Bearers & Musicians */}
    <circle cx="115" cy="46" r="5" stroke="#BE9759" strokeWidth="1.3" />
    <path d="M108 84 L112 56 H118 L122 84" stroke="#BE9759" strokeWidth="1.3" />
    <circle cx="285" cy="46" r="5" stroke="#BE9759" strokeWidth="1.3" />
    <path d="M278 84 L282 56 H288 L292 84" stroke="#BE9759" strokeWidth="1.3" />
    {/* Hanging Floral Toran Arch */}
    <path
      d="M30 12 Q100 32 200 12 Q300 32 370 12"
      stroke="#BE9759"
      strokeWidth="1.2"
      strokeDasharray="3 3"
      opacity="0.65"
    />
    <circle cx="80" cy="24" r="2.5" fill="#BE9759" opacity="0.8" />
    <circle cx="140" cy="28" r="2" fill="#BE9759" opacity="0.6" />
    <circle cx="260" cy="28" r="2" fill="#BE9759" opacity="0.6" />
    <circle cx="320" cy="24" r="2.5" fill="#BE9759" opacity="0.8" />
  </svg>
);

export const RoyalGardenChandelierIllustration: React.FC<{ className?: string }> = ({
  className = 'w-full h-24',
}) => (
  <svg viewBox="0 0 400 96" fill="none" className={className} aria-hidden="true">
    {/* Palace Jharokha Scalloped Arch Top */}
    <path
      d="M40 84 V36 Q120 8 200 26 Q280 8 360 36 V84"
      stroke="#BE9759"
      strokeWidth="1.2"
      opacity="0.45"
    />
    {/* Grand Royal Chandelier */}
    <line x1="200" y1="4" x2="200" y2="28" stroke="#BE9759" strokeWidth="1.5" />
    <path
      d="M168 38 Q200 52 232 38"
      stroke="#BE9759"
      strokeWidth="1.6"
      fill="#BE9759"
      fillOpacity="0.15"
    />
    <path d="M178 28 Q200 38 222 28" stroke="#BE9759" strokeWidth="1.3" />
    <circle cx="200" cy="52" r="3.5" fill="#BE9759" />
    <circle cx="176" cy="44" r="2" fill="#EAD7B7" />
    <circle cx="224" cy="44" r="2" fill="#EAD7B7" />
    {/* Flanking Hanging Brass Lanterns (Diya Lamps) */}
    <line x1="105" y1="14" x2="105" y2="44" stroke="#BE9759" strokeWidth="1" opacity="0.7" />
    <polygon points="105,44 112,54 105,64 98,54" stroke="#BE9759" strokeWidth="1.2" fill="#BE9759" fillOpacity="0.25" />
    <line x1="295" y1="14" x2="295" y2="44" stroke="#BE9759" strokeWidth="1" opacity="0.7" />
    <polygon points="295,44 302,54 295,64 288,54" stroke="#BE9759" strokeWidth="1.2" fill="#BE9759" fillOpacity="0.25" />
    {/* Sparkling Star Motifs */}
    <circle cx="142" cy="26" r="1.5" fill="#EAD7B7" />
    <circle cx="258" cy="26" r="1.5" fill="#EAD7B7" />
    <circle cx="72" cy="50" r="1.5" fill="#EAD7B7" />
    <circle cx="328" cy="50" r="1.5" fill="#EAD7B7" />
  </svg>
);

/**
 * Renders an opulent Rajasthani / Mughal architectural & floral editorial artwork
 * for the temporary gallery placeholders so there are zero fabricated faces and zero broken URLs.
 */
export const EditorialPlaceholderArtwork: React.FC<{
  variant: GalleryItemConfig['illustrationVariant'];
  className?: string;
}> = ({ variant, className = 'w-full h-full' }) => {
  switch (variant) {
    case 'jharokha-couple':
      return (
        <svg viewBox="0 0 400 500" fill="none" className={className} preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="bg-jharokha" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#641F32" />
              <stop offset="60%" stopColor="#391827" />
              <stop offset="100%" stopColor="#260E19" />
            </linearGradient>
            <radialGradient id="glow-gold" cx="50%" cy="42%" r="45%">
              <stop offset="0%" stopColor="#EAD7B7" stopOpacity="0.42" />
              <stop offset="60%" stopColor="#BE9759" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#391827" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="500" fill="url(#bg-jharokha)" />
          <circle cx="200" cy="210" r="170" fill="url(#glow-gold)" />
          {/* Intricate Multi-Cusped Mughal Jharokha Arch */}
          <path
            d="M64 460 V210 C64 135 125 75 200 52 C275 75 336 135 336 210 V460"
            stroke="#BE9759"
            strokeWidth="2"
            opacity="0.75"
          />
          <path
            d="M82 460 V215 C82 148 135 94 200 72 C265 94 318 148 318 215 V460"
            stroke="#EAD7B7"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.5"
          />
          {/* Hanging Temple Bell / Jhumar in Center of Arch */}
          <line x1="200" y1="72" x2="200" y2="142" stroke="#BE9759" strokeWidth="1.5" />
          <path
            d="M182 158 C182 145 218 145 218 158 L226 172 H174 L182 158 Z"
            fill="#BE9759"
            fillOpacity="0.4"
            stroke="#EAD7B7"
            strokeWidth="1.3"
          />
          <circle cx="200" cy="178" r="4" fill="#EAD7B7" />
          {/* Royal Monogram Crest */}
          <circle cx="200" cy="275" r="56" stroke="#BE9759" strokeWidth="1.2" opacity="0.6" />
          <circle cx="200" cy="275" r="48" stroke="#EAD7B7" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.5" />
          <text
            x="200"
            y="286"
            textAnchor="middle"
            fill="#EAD7B7"
            fontFamily="Great Vibes, cursive"
            fontSize="38"
          >
            M &amp; N
          </text>
          {/* Lotus Pedestal */}
          <path
            d="M120 390 Q200 360 280 390 Q200 415 120 390 Z"
            stroke="#BE9759"
            strokeWidth="1.2"
            fill="#BE9759"
            fillOpacity="0.15"
          />
        </svg>
      );

    case 'palace-corridor':
      return (
        <svg viewBox="0 0 400 500" fill="none" className={className} preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="500" fill="#F3E6D3" />
          {/* Concentric Perspective Palace Arches */}
          {[0, 1, 2, 3].map((i) => {
            const inset = i * 32;
            return (
              <path
                key={i}
                d={`M${40 + inset} 470 V${180 + inset * 0.6} C${40 + inset} ${110 + inset * 0.5} 200 ${50 + inset * 0.7} 200 ${50 + inset * 0.7} C200 ${50 + inset * 0.7} ${360 - inset} ${110 + inset * 0.5} ${360 - inset} ${180 + inset * 0.6} V470`}
                stroke="#641F32"
                strokeWidth={2 - i * 0.3}
                opacity={0.75 - i * 0.12}
                fill={i === 3 ? '#641F32' : 'none'}
                fillOpacity={i === 3 ? 0.08 : 0}
              />
            );
          })}
          {/* Sunburst Mandala at Corridor End */}
          <circle cx="200" cy="270" r="38" stroke="#BE9759" strokeWidth="1.6" fill="#BE9759" fillOpacity="0.18" />
          <circle cx="200" cy="270" r="18" stroke="#641F32" strokeWidth="1.2" />
          <path d="M130 430 L200 340 L270 430" stroke="#BE9759" strokeWidth="1" opacity="0.6" />
        </svg>
      );

    case 'henna-hands':
      return (
        <svg viewBox="0 0 400 500" fill="none" className={className} preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="500" fill="#4B1726" />
          {/* Intricate Mandala Engraving */}
          {[140, 115, 90, 65, 40].map((r, idx) => (
            <circle
              key={r}
              cx="200"
              cy="240"
              r={r}
              stroke={idx % 2 === 0 ? '#BE9759' : '#EAD7B7'}
              strokeWidth={idx === 0 ? '1.6' : '1'}
              strokeDasharray={idx % 2 === 1 ? '4 4' : undefined}
              opacity={0.75 - idx * 0.1}
            />
          ))}
          {/* 8-Pointed Star Lotus */}
          <polygon
            points="200,110 228,212 330,240 228,268 200,370 172,268 70,240 172,212"
            stroke="#EAD7B7"
            strokeWidth="1.2"
            fill="#BE9759"
            fillOpacity="0.16"
          />
          <circle cx="200" cy="240" r="12" fill="#EAD7B7" fillOpacity="0.85" />
        </svg>
      );

    case 'royal-barat':
      return (
        <svg viewBox="0 0 400 500" fill="none" className={className} preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="500" fill="#391827" />
          {/* Festive Fireworks / Golden Marigold Cascades */}
          {[70, 135, 200, 265, 330].map((x, idx) => (
            <g key={x}>
              <line
                x1={x}
                y1="0"
                x2={x}
                y2={150 + (idx % 2) * 45}
                stroke="#BE9759"
                strokeWidth="1.2"
                strokeDasharray="3 5"
                opacity="0.65"
              />
              <circle cx={x} cy={158 + (idx % 2) * 45} r="5" fill="#EAD7B7" opacity="0.8" />
            </g>
          ))}
          {/* Royal Pavilion Dome */}
          <path
            d="M90 380 V260 C90 190 200 140 200 140 C200 140 310 190 310 260 V380"
            stroke="#BE9759"
            strokeWidth="2"
            fill="#641F32"
            fillOpacity="0.45"
          />
          <text
            x="200"
            y="290"
            textAnchor="middle"
            fill="#EAD7B7"
            fontFamily="Cormorant Garamond, serif"
            fontSize="24"
            letterSpacing="4"
          >
            14 · XI · 2026
          </text>
        </svg>
      );

    case 'mandap-diya':
      return (
        <svg viewBox="0 0 400 500" fill="none" className={className} preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="500" fill="#5A1B2D" />
          {/* Warm Sacred Agni / Diya Glow */}
          <circle cx="200" cy="270" r="130" fill="#BE9759" fillOpacity="0.14" />
          <circle cx="200" cy="270" r="75" fill="#EAD7B7" fillOpacity="0.2" />
          {/* Sacred Diya Flame */}
          <path
            d="M200 185 C220 218 224 246 200 262 C176 246 180 218 200 185 Z"
            fill="#EAD7B7"
            stroke="#BE9759"
            strokeWidth="1.5"
          />
          {/* Brass Diya Bowl */}
          <path
            d="M140 272 Q200 322 260 272 Z"
            fill="#BE9759"
            fillOpacity="0.65"
            stroke="#EAD7B7"
            strokeWidth="1.5"
          />
          <line x1="165" y1="305" x2="235" y2="305" stroke="#EAD7B7" strokeWidth="2" />
        </svg>
      );

    case 'starlit-garden':
    default:
      return (
        <svg viewBox="0 0 400 500" fill="none" className={className} preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="500" fill="#2A111D" />
          {/* Starlit Night Sky & Crescent */}
          <circle cx="88" cy="110" r="2" fill="#EAD7B7" />
          <circle cx="312" cy="95" r="2.5" fill="#EAD7B7" />
          <circle cx="270" cy="145" r="1.5" fill="#BE9759" />
          <circle cx="130" cy="160" r="1.5" fill="#BE9759" />
          <path
            d="M210 92 A28 28 0 1 1 182 128 A22 22 0 1 0 210 92 Z"
            fill="#EAD7B7"
            opacity="0.85"
          />
          {/* Illuminated Garden Arch */}
          <path
            d="M76 440 V230 C76 160 200 110 200 110 C200 110 324 160 324 230 V440"
            stroke="#BE9759"
            strokeWidth="1.8"
          />
          <text
            x="200"
            y="295"
            textAnchor="middle"
            fill="#EAD7B7"
            fontFamily="Cormorant Garamond, serif"
            fontSize="24"
            letterSpacing="4"
          >
            14 · XI · 2026
          </text>
        </svg>
      );
  }
};
