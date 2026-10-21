import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  UploadCloud,
  RotateCcw,
} from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { OrnamentalDivider, CornerFiligree } from './RoyalOrnaments';

export interface GalleryPhoto {
  id: string;
  url: string;
  alt?: string;
  aspectRatio?: string;
  objectPosition?: string;
}

// Curated Real Wedding Photograph (Right-Side Sangeet Dance Celebration)
const INITIAL_CURATED_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-2',
    url: '/assets/aistudio/M1_21a3200d.jpeg',
    alt: 'Mantavya & Nitika Sangeet Dance Celebration',
    objectPosition: 'center 15%',
  },
];

const STORAGE_KEY = 'mn_wedding_gallery_photos_v7_single';

interface RoyalImageCardProps {
  photo: GalleryPhoto;
  index: number;
  onClick: () => void;
}

/**
 * Refined Royal Wedding Image Card:
 * - Pure, clean photo presentation with ZERO line overlays or obstruction
 * - Luxurious antique gold + deep burgundy card frame
 * - Inset matting with delicate filigree accents outside the photo area
 * - Face-preserving aspect ratio with object-top alignment
 */
const RoyalImageCard: React.FC<RoyalImageCardProps> = ({
  photo,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative w-full rounded-3xl bg-gradient-to-b from-[#3A0A18] via-[#280611] to-[#1A030A] border-2 border-[#BE9759]/70 shadow-[0_16px_40px_rgba(40,10,18,0.25),0_0_24px_rgba(190,151,89,0.12)] hover:border-[#BE9759] hover:shadow-[0_20px_50px_rgba(190,151,89,0.25)] transition-all duration-300 cursor-pointer overflow-hidden p-3 sm:p-4 flex flex-col"
    >
      {/* Outer Matting Inset Hairline Border */}
      <div className="absolute inset-2 sm:inset-2.5 rounded-2xl border border-[#BE9759]/35 pointer-events-none z-10" />

      {/* Elegant Corner Filigrees on Card Matting (Outside the photo area) */}
      <CornerFiligree
        className="absolute top-2 left-2 w-7 h-7 sm:w-8 sm:h-8 pointer-events-none z-10"
        color="#BE9759"
      />
      <CornerFiligree
        className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 -scale-x-100 pointer-events-none z-10"
        color="#BE9759"
      />
      <CornerFiligree
        className="absolute bottom-2 left-2 w-7 h-7 sm:w-8 sm:h-8 -scale-y-100 pointer-events-none z-10"
        color="#BE9759"
      />
      <CornerFiligree
        className="absolute bottom-2 right-2 w-7 h-7 sm:w-8 sm:h-8 -scale-100 pointer-events-none z-10"
        color="#BE9759"
      />

      {/* Clean Photo Frame: Large, clear presentation without any line overlays */}
      <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-[#24060E] border border-[#BE9759]/50 shadow-inner">
        <img
          src={photo.url}
          alt={photo.alt || 'Wedding Moment'}
          loading="lazy"
          style={{
            objectPosition:
              photo.objectPosition ||
              (photo.url.includes('cc33be58')
                ? '58% 22%'
                : photo.url.includes('M1_21a3200d')
                ? 'center 15%'
                : 'center 20%'),
          }}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Soft, gentle vignette around outer photo perimeter (completely transparent in the center) */}
        <div className="absolute inset-0 ring-1 ring-inset ring-[#BE9759]/30 rounded-2xl pointer-events-none" />
      </div>
    </div>
  );
};

export const GallerySection: React.FC = () => {
  // Check if admin mode is enabled via URL search parameter (e.g. ?admin=true)
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true' || params.get('edit') === 'true') {
        setIsAdmin(true);
      }
    }
  }, []);

  const [photos, setPhotos] = useState<GalleryPhoto[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const filtered = parsed.filter(
              (p) => p && !p.url?.includes('cc33be58') && p.id !== 'photo-1'
            );
            if (filtered.length > 0) {
              return [filtered[0]];
            }
          }
        }
      }
    } catch {
      // ignore storage parsing error
    }
    return INITIAL_CURATED_PHOTOS;
  });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Touch Swipe tracking for Mobile Fullscreen Lightbox
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  // Sync photos to localStorage
  const savePhotos = (newPhotos: GalleryPhoto[]) => {
    const limited = newPhotos.slice(0, 1);
    setPhotos(limited);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
    } catch {
      // storage full or disabled
    }
  };

  const handleOpenLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedIndex(null);
  };

  const handlePrev = useCallback(() => {
    if (selectedIndex === null || displayPhotos.length === 0) return;
    setSelectedIndex((selectedIndex - 1 + displayPhotos.length) % displayPhotos.length);
  }, [selectedIndex]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null || displayPhotos.length === 0) return;
    setSelectedIndex((selectedIndex + 1) % displayPhotos.length);
  }, [selectedIndex]);

  // Keyboard navigation in Fullscreen Lightbox
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseLightbox();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  // Lightbox touch swipe events
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const diff = touchStartXRef.current - touchEndXRef.current;
      if (diff > 50) {
        handleNext();
      } else if (diff < -50) {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Upload dynamic photos (replaces featured photo)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        savePhotos([
          {
            id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            url: result,
            alt: file.name.replace(/\.[^/.]+$/, ''),
          },
        ]);
      }
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeletePhoto = (_id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    savePhotos(INITIAL_CURATED_PHOTOS);
    setSelectedIndex(null);
  };

  const handleResetDefaults = () => {
    savePhotos(INITIAL_CURATED_PHOTOS);
  };

  // Single centered curated photo
  const displayPhotos: GalleryPhoto[] = React.useMemo(() => {
    if (photos.length > 0) return [photos[0]];
    return INITIAL_CURATED_PHOTOS;
  }, [photos]);

  return (
    <section
      id="gallery"
      className="relative pt-16 sm:pt-24 pb-28 sm:pb-32 px-3 sm:px-6 bg-[#F8F1E5] text-[#391827] overflow-hidden"
    >
      {/* Subtle Traditional Jaali Background Pattern */}
      <div className="absolute inset-0 royal-jaali-pattern opacity-30 pointer-events-none" />

      {/* Hidden File Input for Image Uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
        aria-label="Upload wedding photos"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="text-center max-w-xl mx-auto mb-8 sm:mb-14"
        >
          <p className="font-sans text-xs tracking-[0.22em] uppercase text-[#641F32]/80 font-medium">
            Treasured Memories
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-semibold text-[#641F32]">
            {weddingConfig.gallery.heading}
          </h2>
          <div className="my-4 flex justify-center">
            <OrnamentalDivider className="w-48 h-5" color="#BE9759" />
          </div>
          <p className="font-serif italic text-base sm:text-lg text-[#391827]/85 leading-relaxed">
            A celebration of love, sacred traditions, and timeless moments
          </p>

          {/* Admin Management Controls: Hidden from public wedding guests */}
          {isAdmin && (
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="min-h-[42px] px-5 py-2 rounded-full bg-[#641F32] hover:bg-[#4E1424] text-[#F8F1E5] border border-[#BE9759] text-xs font-serif font-semibold tracking-wider shadow-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#EAD7B7]" />
                <span>Upload Photo</span>
              </button>

              <button
                type="button"
                onClick={() => setIsManagerOpen(true)}
                className="min-h-[42px] px-4 py-2 rounded-full bg-[#F8F1E5] hover:bg-[#EAD7B7]/40 border border-[#BE9759]/60 text-[#641F32] text-xs font-sans tracking-wide flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Manage Gallery</span>
                <span className="font-semibold text-xs text-[#BE9759]">({displayPhotos.length})</span>
              </button>
            </div>
          )}
        </motion.div>

        {/* ========================================================
            REFINED ROYAL PORTRAIT CARD (CENTERED)
            Single centered image with preserved royal frame and filigrees.
            Balanced, elegant, and perfectly proportioned on all screen sizes.
           ======================================================== */}
        <div className="w-full max-w-[360px] sm:max-w-[420px] md:max-w-[460px] mx-auto flex justify-center items-center">
          {displayPhotos[0] && (
            <motion.div
              key={`royal-card-${displayPhotos[0].id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65 }}
              className="w-full flex justify-center"
            >
              <RoyalImageCard
                photo={displayPhotos[0]}
                index={0}
                onClick={() => handleOpenLightbox(0)}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* ========================================================
          FULLSCREEN IMAGE VIEWER LIGHTBOX
         ======================================================== */}
      <AnimatePresence>
        {selectedIndex !== null && displayPhotos[selectedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleCloseLightbox}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="fixed inset-0 z-50 bg-[#14050D]/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 select-none"
          >
            {/* Top Close Button (X) */}
            <button
              type="button"
              onClick={handleCloseLightbox}
              aria-label="Close fullscreen view"
              className="absolute top-4 right-4 z-50 min-h-[44px] min-w-[44px] rounded-full bg-[#F8F1E5]/15 hover:bg-[#F8F1E5]/25 border border-[#BE9759]/60 text-[#F8F1E5] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-[#EAD7B7]" />
            </button>

            {/* Left Previous Button */}
            {displayPhotos.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous photograph"
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 min-h-[48px] min-w-[48px] rounded-full bg-[#14050D]/70 hover:bg-[#14050D] border border-[#BE9759]/60 text-[#F8F1E5] flex items-center justify-center shadow-lg transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6 text-[#EAD7B7]" />
              </button>
            )}

            {/* Right Next Button */}
            {displayPhotos.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next photograph"
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 min-h-[48px] min-w-[48px] rounded-full bg-[#14050D]/70 hover:bg-[#14050D] border border-[#BE9759]/60 text-[#F8F1E5] flex items-center justify-center shadow-lg transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6 text-[#EAD7B7]" />
              </button>
            )}

            {/* Central Photograph with Clean Contain Fitting */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[94vw] max-h-[88vh] flex items-center justify-center"
            >
              <img
                src={displayPhotos[selectedIndex].url}
                alt={displayPhotos[selectedIndex].alt || 'Wedding Photograph'}
                className="max-w-[94vw] max-h-[88vh] w-auto h-auto object-contain rounded-xl sm:rounded-2xl border border-[#BE9759]/50 shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          MANAGE GALLERY / PHOTO UPLOAD MODAL (ADMIN ONLY)
         ======================================================== */}
      <AnimatePresence>
        {isManagerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsManagerOpen(false)}
            className="fixed inset-0 z-50 bg-[#14050D]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl max-h-[85vh] bg-[#F8F1E5] text-[#391827] rounded-3xl border-2 border-[#BE9759] shadow-2xl p-5 sm:p-8 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#BE9759]/30">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#641F32]">Manage Gallery Photo</h3>
                  <p className="font-sans text-xs text-[#391827]/75">
                    Featured wedding photograph.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsManagerOpen(false)}
                  className="min-h-[40px] min-w-[40px] rounded-full border border-[#BE9759]/50 flex items-center justify-center hover:bg-[#EAD7B7]/40 text-[#641F32] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Upload Drop Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="mt-5 p-6 border-2 border-dashed border-[#BE9759] hover:border-[#641F32] rounded-2xl bg-[#FDF9F2] text-center cursor-pointer transition-colors"
              >
                <UploadCloud className="w-10 h-10 text-[#BE9759] mx-auto mb-2" />
                <p className="font-serif text-base font-semibold text-[#641F32]">
                  Click to Upload Photo
                </p>
                <p className="font-sans text-xs text-[#391827]/70 mt-1">
                  Supports Portrait (1080×1350), Vertical (1080×1920), or Landscape photos
                </p>
              </div>

              {/* Photos List */}
              <div className="mt-5 flex-1 overflow-y-auto pr-1">
                <div className="flex justify-center">
                  {photos.map((photo, index) => (
                    <div
                      key={`gallery-thumb-${index}-${photo.id}`}
                      className="group relative w-44 sm:w-52 aspect-[3/4] rounded-xl overflow-hidden border border-[#BE9759]/60 shadow-sm bg-[#EDE1CE]"
                    >
                      <img
                        src={photo.url}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => handleDeletePhoto(photo.id, e)}
                        className="absolute top-2 right-2 min-h-[34px] min-w-[34px] rounded-full bg-[#641F32]/90 hover:bg-[#641F32] text-[#F8F1E5] flex items-center justify-center shadow cursor-pointer opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete photo"
                      >
                        <Trash2 className="w-4 h-4 text-[#F8F1E5]" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="mt-5 pt-4 border-t border-[#BE9759]/30 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="text-xs font-sans text-[#641F32] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#BE9759]" />
                  <span>Restore Sample Photos</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsManagerOpen(false)}
                  className="min-h-[40px] px-6 py-2 rounded-full bg-[#641F32] hover:bg-[#4E1424] text-[#F8F1E5] font-serif text-sm font-semibold tracking-wide border border-[#BE9759] cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
