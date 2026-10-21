import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface ScratchNumberOverlayProps {
  isRevealed: boolean;
  onReveal: () => void;
}

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const ScratchNumberOverlay: React.FC<ScratchNumberOverlayProps> = ({
  isRevealed,
  onReveal,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const lastCheckTimeRef = useRef<number>(0);
  const hasStartedRef = useRef(false);
  const particleIdRef = useRef(0);

  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);
  const [showSparkleBurst, setShowSparkleBurst] = useState(false);

  // Paint the luxury champagne-gold metallic plate scratch surface matching Image 2
  const paintGoldFoil = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isRevealed) return;

    const rect = container.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width || container.clientWidth || 64));
    const height = Math.max(1, Math.floor(rect.height || container.clientHeight || 48));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, width, height);

    // 1. Base Warm Champagne-Gold Metallic Gradient matching Image 2
    const grad = ctx.createLinearGradient(0, 0, width * 0.95, height * 0.95);
    grad.addColorStop(0.0, '#FFF9E8'); // Bright cream champagne highlight at top-left
    grad.addColorStop(0.12, '#F9E2B3'); // Warm champagne luster
    grad.addColorStop(0.32, '#DFC082'); // Rich metallic gold
    grad.addColorStop(0.55, '#C6994E'); // Deep antique gold
    grad.addColorStop(0.75, '#E5C88F'); // Secondary soft sheen
    grad.addColorStop(0.92, '#BD8C3A'); // Warm burnished gold
    grad.addColorStop(1.0, '#94661E'); // Rich bronze-gold edge shadow
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Fine horizontal brushed metallic striations (physical brushed metal foil texture)
    ctx.save();
    for (let y = 1; y < height; y += 1.6) {
      const isLight = y % 3.2 < 1.6;
      ctx.strokeStyle = isLight ? 'rgba(255, 255, 255, 0.08)' : 'rgba(110, 70, 15, 0.055)';
      ctx.lineWidth = 0.65;
      ctx.beginPath();
      ctx.moveTo(1, y);
      ctx.lineTo(width - 1, y);
      ctx.stroke();
    }
    ctx.restore();

    // 3. Specular Curved Flare at Top-Left Corner (Signature highlight of Image 2)
    const flareGrad = ctx.createRadialGradient(
      width * 0.12,
      height * 0.14,
      0,
      width * 0.12,
      height * 0.14,
      Math.max(width, height) * 0.62
    );
    flareGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0.88)');
    flareGrad.addColorStop(0.2, 'rgba(255, 250, 230, 0.55)');
    flareGrad.addColorStop(0.45, 'rgba(255, 255, 255, 0.16)');
    flareGrad.addColorStop(0.8, 'rgba(255, 255, 255, 0.03)');
    flareGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = flareGrad;
    ctx.fillRect(0, 0, width, height);

    // 4. Soft diagonal light sweep reflection across the plate
    const sweepGrad = ctx.createLinearGradient(0, height * 0.7, width * 0.9, 0);
    sweepGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0)');
    sweepGrad.addColorStop(0.42, 'rgba(255, 255, 255, 0.14)');
    sweepGrad.addColorStop(0.55, 'rgba(255, 255, 255, 0.22)');
    sweepGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.08)');
    sweepGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = sweepGrad;
    ctx.fillRect(0, 0, width, height);

    // 5. Hairline Beveled Edge Stroke on the Plate
    // Top & Left highlight stroke
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.lineWidth = 0.75;
    ctx.strokeRect(0.5, 0.5, width - 1, height - 1);

    // 6. Subtle Royal Starburst / Mandala Blind-Embossed Watermark
    // A whisper-soft embossed emblem in the gold plate center
    const cx = width / 2;
    const cy = height / 2;
    const scale = Math.min(width, height) / 58;

    ctx.save();
    ctx.translate(cx, cy);

    // Faint embossed concentric ring
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.32)';
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.arc(0, 0, 9 * scale, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(110, 65, 12, 0.16)';
    ctx.beginPath();
    ctx.arc(0.4, 0.4, 9 * scale, 0, Math.PI * 2);
    ctx.stroke();

    // 8-point royal flower / star petals
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const r1 = 2.2 * scale;
      const r2 = 7.5 * scale;
      const x1 = Math.cos(angle) * r1;
      const y1 = Math.sin(angle) * r1;
      const x2 = Math.cos(angle) * r2;
      const y2 = Math.sin(angle) * r2;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(100, 55, 10, 0.15)';
      ctx.beginPath();
      ctx.moveTo(x1 + 0.3, y1 + 0.3);
      ctx.lineTo(x2 + 0.3, y2 + 0.3);
      ctx.stroke();
    }

    // Center jewel dot
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.beginPath();
    ctx.arc(0, 0, 1.4 * scale, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    ctx.restore();
  }, [isRevealed]);

  // Robust initialization on mount and resize
  useEffect(() => {
    if (isRevealed) return;

    paintGoldFoil();

    const rafId = requestAnimationFrame(() => {
      if (!hasStartedRef.current && !isRevealed) {
        paintGoldFoil();
      }
    });

    const timerId = window.setTimeout(() => {
      if (!hasStartedRef.current && !isRevealed) {
        paintGoldFoil();
      }
    }, 60);

    const container = containerRef.current;
    let ro: ResizeObserver | null = null;
    if (container && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.width > 0 && !hasStartedRef.current && !isRevealed) {
            paintGoldFoil();
          }
        }
      });
      ro.observe(container);
    }

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      if (ro) ro.disconnect();
    };
  }, [isRevealed, paintGoldFoil]);

  // Check scratch percentage: reveal at 38% for seamless delight
  const checkProgress = useCallback(() => {
    const now = performance.now();
    if (now - lastCheckTimeRef.current < 75) return;
    lastCheckTimeRef.current = now;

    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    if (width === 0 || height === 0) return;

    try {
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      let clearPixels = 0;
      let totalSampled = 0;

      // Sample every 8th pixel
      const step = 4 * 8;
      for (let i = 3; i < data.length; i += step) {
        totalSampled++;
        if (data[i] < 128) {
          clearPixels++;
        }
      }

      const ratio = totalSampled > 0 ? clearPixels / totalSampled : 0;
      if (ratio >= 0.38) {
        setShowSparkleBurst(true);
        onReveal();
        window.setTimeout(() => {
          setShowSparkleBurst(false);
        }, 500);
      }
    } catch {
      // ignore exceptions
    }
  }, [isRevealed, onReveal]);

  // Smooth scratch action
  const scratch = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas || isRevealed) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      hasStartedRef.current = true;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const brushRadius = Math.max(14, Math.min(rect.width, rect.height) * 0.4);

      if (lastPointRef.current) {
        ctx.lineWidth = brushRadius * 2;
        ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
        ctx.beginPath();
        ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      const brushGrad = ctx.createRadialGradient(x, y, 0, x, y, brushRadius);
      brushGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
      brushGrad.addColorStop(0.75, 'rgba(0, 0, 0, 0.95)');
      brushGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = brushGrad;
      ctx.beginPath();
      ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      lastPointRef.current = { x, y };

      // Micro golden dust particles
      if (!prefersReducedMotion && Math.random() > 0.45) {
        const id = ++particleIdRef.current;
        const size = Math.random() > 0.6 ? 2.4 : 1.6;
        setSparkles((prev) => [...prev.slice(-6), { id, x, y, size }]);
      }

      checkProgress();
    },
    [isRevealed, prefersReducedMotion, checkProgress]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isRevealed) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    isDrawingRef.current = true;
    lastPointRef.current = null;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || isRevealed) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUpOrCancel = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    checkProgress();
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-20 rounded-xl sm:rounded-2xl overflow-hidden pointer-events-auto select-none"
    >
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            key="scratch-canvas-container"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: prefersReducedMotion ? 1 : 1.04,
              filter: prefersReducedMotion ? 'none' : 'blur(2px)',
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUpOrCancel}
              onPointerCancel={handlePointerUpOrCancel}
              style={{ touchAction: 'none' }}
              className="w-full h-full block cursor-grab active:cursor-grabbing rounded-xl sm:rounded-2xl"
              aria-label="Scratch to reveal countdown number"
            />

            {/* Subtle Metallic Foil Ambient Sheen Reflection Sweep */}
            {!prefersReducedMotion && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl sm:rounded-2xl">
                <div className="absolute -inset-y-2 -inset-x-8 w-[200%] h-[120%] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-foil-sheen" />
              </div>
            )}

            {/* Micro Gold Sparkle Dust Particles */}
            {!prefersReducedMotion &&
              sparkles.map((p) => (
                <motion.span
                  key={p.id}
                  initial={{ opacity: 1, scale: 1, x: p.x, y: p.y }}
                  animate={{
                    opacity: 0,
                    scale: 0.2,
                    y: p.y - 14,
                  }}
                  transition={{ duration: 0.38, ease: 'easeOut' }}
                  style={{ width: `${p.size}px`, height: `${p.size}px` }}
                  className="pointer-events-none absolute top-0 left-0 rounded-full bg-[#FFFBF0] shadow-[0_0_6px_#EAD7B7]"
                />
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Golden Sparkle Burst on Reveal */}
      <AnimatePresence>
        {showSparkleBurst && !prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.45 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <Sparkles className="w-5 h-5 text-[#EAD7B7] animate-pulse drop-shadow-[0_0_8px_#BE9759]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
