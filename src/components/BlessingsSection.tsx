import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Send, Heart, CheckCircle2, AlertCircle } from 'lucide-react';
import { OrnamentalDivider, CornerFiligree } from './RoyalOrnaments';

interface BlessingItem {
  id: string;
  name: string;
  relationship?: string;
  message: string;
  createdAt: string;
  approved: boolean;
}

const DEFAULT_BLESSINGS: BlessingItem[] = [
  {
    id: 'blessing-1',
    name: 'Goyal & Singla Parivar',
    relationship: 'Family Elders',
    message:
      'May Lord Ganesha shower His choicest blessings upon Mantavya and Nitika as you embark on this sacred journey of togetherness, love, and lifelong harmony.',
    createdAt: '2026-10-15T10:30:00.000Z',
    approved: true,
  },
  {
    id: 'blessing-2',
    name: 'Kirna & Bhushan Goyal',
    relationship: 'Goyal Family',
    message:
      'Wishing both of you a lifetime filled with endless laughter, warm festivities, and royal memories. Our hearts are overflowing with joy for the Grand Reception on November 14th!',
    createdAt: '2026-10-16T14:20:00.000Z',
    approved: true,
  },
  {
    id: 'blessing-3',
    name: 'Sarla & Dev Raj Garg',
    relationship: 'Extended Family',
    message:
      'Two wonderful souls and two loving families uniting as one. May your home always glow with warmth, prosperity, and unwavering devotion.',
    createdAt: '2026-10-18T09:15:00.000Z',
    approved: true,
  },
];

const BLESSINGS_LOCAL_KEY = 'mn_wedding_blessings_cache_v3';

export const BlessingsSection: React.FC = () => {
  const [blessings, setBlessings] = useState<BlessingItem[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(BLESSINGS_LOCAL_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      }
    } catch {
      // ignore parsing error
    }
    return DEFAULT_BLESSINGS;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState<boolean>(true);

  const [guestName, setGuestName] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'saved-approved' | 'saved-pending' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let mounted = true;
    const fetchBlessings = async () => {
      try {
        const res = await fetch('/api/blessings');
        if (!res.ok) throw new Error('Backend unavailable');
        const data = await res.json();
        if (mounted && data && Array.isArray(data.blessings)) {
          setBlessings(data.blessings);
          setBackendAvailable(true);
          try {
            localStorage.setItem(BLESSINGS_LOCAL_KEY, JSON.stringify(data.blessings));
          } catch {
            // storage full
          }
        }
      } catch {
        if (mounted) {
          setBackendAvailable(false);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchBlessings();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = guestName.trim();
    const trimmedMessage = guestMessage.trim();

    if (!trimmedName || trimmedMessage.length < 3) {
      setSubmitStatus('error');
      setErrorMessage('Please enter your name and a heartfelt blessing.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const res = await fetch('/api/blessings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          message: trimmedMessage,
        }),
      });

      if (!res.ok) {
        throw new Error('Fallback to local storage');
      }

      const data = await res.json();
      if (data.approved && data.blessing) {
        setBlessings((prev) => {
          const updated = [data.blessing, ...prev];
          try {
            localStorage.setItem(BLESSINGS_LOCAL_KEY, JSON.stringify(updated));
          } catch {
            // storage full
          }
          return updated;
        });
        setSubmitStatus('saved-approved');
      } else {
        setSubmitStatus('saved-pending');
      }

      setGuestName('');
      setGuestMessage('');
    } catch {
      // Graceful static Netlify fallback: save locally so user wish is never lost
      const fallbackEntry: BlessingItem = {
        id: `blessing-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: trimmedName,
        message: trimmedMessage,
        createdAt: new Date().toISOString(),
        approved: true,
      };
      setBlessings((prev) => {
        const updated = [fallbackEntry, ...prev];
        try {
          localStorage.setItem(BLESSINGS_LOCAL_KEY, JSON.stringify(updated));
        } catch {
          // storage full
        }
        return updated;
      });
      setSubmitStatus('saved-approved');
      setGuestName('');
      setGuestMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatBlessingDate = (iso: string) => {
    try {
      return new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(new Date(iso));
    } catch {
      return 'Oct 2026';
    }
  };

  return (
    <section
      id="blessings-wishes"
      className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-[#391827] via-[#641F32] to-[#391827] text-[#F8F1E5] overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <p className="font-sans text-xs tracking-[0.22em] uppercase text-[#EAD7B7]/85">
            Aashirwad &amp; Good Wishes
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-semibold text-[#F8F1E5]">
            Leave Your Blessings
          </h2>
          <div className="my-4 flex justify-center">
            <OrnamentalDivider className="w-48 h-5" color="#BE9759" />
          </div>
          <p className="font-serif italic text-base sm:text-lg text-[#EAD7B7]/90">
            Your Wishes Make Our Celebration Even More Special.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Blessing Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="lg:col-span-5 relative rounded-3xl bg-[#F8F1E5] text-[#391827] border-2 border-[#BE9759] p-6 sm:p-8 shadow-[0_24px_60px_rgba(20,6,12,0.45)]"
          >
            <CornerFiligree className="absolute top-3 left-3 w-8 h-8" color="#641F32" />
            <CornerFiligree className="absolute top-3 right-3 w-8 h-8 -scale-x-100" color="#641F32" />

            <form onSubmit={handleSubmit} className="space-y-5 pt-2">
              <div>
                <label
                  htmlFor="guest-name-input"
                  className="block font-serif text-base font-semibold text-[#641F32] mb-1.5"
                >
                  Guest Name
                </label>
                <input
                  id="guest-name-input"
                  type="text"
                  required
                  maxLength={80}
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Enter your name or family name"
                  className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-white border border-[#BE9759]/70 text-[#391827] placeholder:text-[#391827]/45 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#641F32]"
                />
              </div>

              <div>
                <label
                  htmlFor="guest-blessing-input"
                  className="block font-serif text-base font-semibold text-[#641F32] mb-1.5"
                >
                  Your Blessing or Message
                </label>
                <textarea
                  id="guest-blessing-input"
                  required
                  rows={4}
                  maxLength={600}
                  value={guestMessage}
                  onChange={(e) => setGuestMessage(e.target.value)}
                  placeholder="Write your blessings and warm wishes for Mantavya & Nitika..."
                  className="w-full p-4 rounded-xl bg-white border border-[#BE9759]/70 text-[#391827] placeholder:text-[#391827]/45 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#641F32] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !backendAvailable}
                className="w-full min-h-[50px] py-3.5 px-6 rounded-full bg-[#641F32] hover:bg-[#4e1726] disabled:opacity-60 text-[#F8F1E5] border border-[#BE9759] font-serif text-base sm:text-lg font-semibold tracking-wide shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#EAD7B7] shrink-0" />
                <span className="whitespace-nowrap">
                  {isSubmitting ? 'Sending Blessings...' : 'Send Your Blessings'}
                </span>
              </button>

              {submitStatus === 'saved-approved' && (
                <div className="p-3.5 rounded-xl bg-[#641F32]/10 border border-[#641F32]/30 text-[#641F32] text-xs font-sans flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#641F32] shrink-0 mt-0.5" />
                  <span>
                    Thank you! Your blessing has been saved and added to the Royal Wedding Book.
                  </span>
                </div>
              )}

              {submitStatus === 'saved-pending' && (
                <div className="p-3.5 rounded-xl bg-[#BE9759]/20 border border-[#BE9759] text-[#391827] text-xs font-sans flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#641F32] shrink-0 mt-0.5" />
                  <span>
                    Thank you! Your blessing has been saved and is awaiting family approval.
                  </span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-3.5 rounded-xl bg-red-900/10 border border-red-800/30 text-red-900 text-xs font-sans flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          </motion.div>

          {/* Approved Blessings Feed */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between border-b border-[#BE9759]/35 pb-3">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#EAD7B7]" />
                <h3 className="font-serif text-xl sm:text-2xl text-[#EAD7B7] font-medium">
                  Approved Family &amp; Guest Wishes
                </h3>
              </div>
              <span className="font-sans text-xs text-[#EAD7B7]/75 tabular-nums">
                {blessings.length} {blessings.length === 1 ? 'Blessing' : 'Blessings'}
              </span>
            </div>

            {isLoading ? (
              <div className="space-y-3 py-4">
                {[1, 2].map((n) => (
                  <div
                    key={n}
                    className="h-28 rounded-2xl bg-[#F8F1E5]/5 border border-[#BE9759]/25 animate-pulse"
                  />
                ))}
              </div>
            ) : blessings.length === 0 ? (
              <div className="p-8 rounded-2xl bg-[#391827]/60 border border-[#BE9759]/30 text-center">
                <p className="font-serif italic text-lg text-[#EAD7B7]">
                  Be the first to record a blessing for Mantavya &amp; Nitika.
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1 no-scrollbar">
                {blessings.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-2xl bg-[#391827]/75 border border-[#BE9759]/45 shadow-sm"
                  >
                    <p className="font-serif text-base sm:text-lg text-[#F8F1E5] leading-relaxed italic">
                      &ldquo;{item.message}&rdquo;
                    </p>
                    <div className="mt-3 pt-2.5 border-t border-[#BE9759]/20 flex items-center justify-between gap-2 text-xs font-sans text-[#EAD7B7]/85">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#EAD7B7]">{item.name}</span>
                        {item.relationship && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#EAD7B7]/75">{item.relationship}</span>
                          </>
                        )}
                      </div>
                      <span className="text-[11px] text-[#EAD7B7]/65 tabular-nums">
                        {formatBlessingDate(item.createdAt)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
