"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Maximize2,
} from "lucide-react";

export function ImageZoomModal({
  isOpen,
  onClose,
  src,
  alt = "Image preview",
  title = "Image Preview",
}) {
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const lastTouchDistanceRef = useRef(null);
  const lastTapRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock scroll and Lenis while modal is open
  useEffect(() => {
    if (!isOpen) return;

    // Reset zoom state on open
    setScale(1);
    setPosition({ x: 0, y: 0 });

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (typeof window !== "undefined" && window.lenis) {
      window.lenis.stop();
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "+" || e.key === "=") {
        setScale((prev) => Math.min(prev + 0.3, 3.5));
      } else if (e.key === "-") {
        setScale((prev) => {
          const next = Math.max(prev - 0.3, 0.7);
          if (next <= 1) setPosition({ x: 0, y: 0 });
          return next;
        });
      } else if (e.key === "0") {
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      if (typeof window !== "undefined" && window.lenis) {
        window.lenis.start();
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Zoom controls
  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.35, 3.5));
  };

  const handleZoomOut = () => {
    setScale((prev) => {
      const next = Math.max(prev - 0.35, 0.7);
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Double tap / double click to toggle 1x and 2x
  const handleDoubleTap = (clientX, clientY) => {
    if (scale > 1.2) {
      handleReset();
    } else {
      setScale(2);
      setPosition({ x: 0, y: 0 });
    }
  };

  // Mouse wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.002;
    setScale((prev) => {
      const next = Math.min(Math.max(prev + delta, 0.7), 3.5);
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left-click
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Handlers (Pinch & Pan for mobile / tablet)
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      // Pinch start
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      );
      lastTouchDistanceRef.current = dist;
    } else if (e.touches.length === 1) {
      // Double tap check
      const now = Date.now();
      if (now - lastTapRef.current < 300) {
        handleDoubleTap(e.touches[0].clientX, e.touches[0].clientY);
      }
      lastTapRef.current = now;

      // Single touch pan start
      setIsDragging(true);
      dragStartRef.current = {
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      };
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && lastTouchDistanceRef.current) {
      // Pinch move
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      );
      const ratio = dist / lastTouchDistanceRef.current;
      setScale((prev) => {
        const next = Math.min(Math.max(prev * ratio, 0.7), 3.5);
        if (next <= 1) setPosition({ x: 0, y: 0 });
        return next;
      });
      lastTouchDistanceRef.current = dist;
    } else if (e.touches.length === 1 && isDragging) {
      // Single touch pan move
      setPosition({
        x: e.touches[0].clientX - dragStartRef.current.x,
        y: e.touches[0].clientY - dragStartRef.current.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    lastTouchDistanceRef.current = null;
  };

  if (!mounted || !isOpen) return null;

  const content = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[9999] flex flex-col justify-between select-none bg-black/92 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Top Controls Toolbar */}
      <div className="relative z-20 flex items-center justify-between px-4 py-3 sm:px-6 bg-gradient-to-b from-black/80 to-transparent text-white">
        <div className="flex items-center gap-2 truncate max-w-[50%]">
          <span className="text-xs sm:text-sm font-semibold text-slate-200 truncate">
            {title}
          </span>
        </div>

        {/* Action Buttons: Zoom In, Zoom Out, Reset, Close */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Zoom Out Button */}
          <button
            type="button"
            onClick={handleZoomOut}
            aria-label="Zoom Out"
            disabled={scale <= 0.7}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:pointer-events-none"
          >
            <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Zoom Percentage Indicator */}
          <button
            type="button"
            onClick={handleReset}
            title="Click to reset zoom"
            aria-label={`Current zoom ${Math.round(scale * 100)} percent. Click to reset.`}
            className="px-2.5 h-9 sm:h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs sm:text-sm font-semibold flex items-center justify-center transition-all min-w-[56px]"
          >
            {Math.round(scale * 100)}%
          </button>

          {/* Zoom In Button */}
          <button
            type="button"
            onClick={handleZoomIn}
            aria-label="Zoom In"
            disabled={scale >= 3.5}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:pointer-events-none"
          >
            <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Reset Zoom Button */}
          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset Zoom to 100%"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 text-white flex items-center justify-center transition-all"
          >
            <RotateCcw className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>

          {/* Close Modal Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image popup"
            className="w-9 h-9 sm:w-10 sm:h-10 ml-1 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white flex items-center justify-center transition-all shadow-md active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Image Viewing Canvas */}
      <div
        className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing p-2 sm:p-6"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => {
          // If clicked directly on the dark canvas outside image, close
          if (e.target === e.currentTarget && scale === 1) {
            onClose();
          }
        }}
      >
        <div
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
            transition: isDragging ? "none" : "transform 0.18s ease-out",
            touchAction: "none",
          }}
          className="relative max-w-[92vw] max-h-[82vh] w-auto h-auto flex items-center justify-center"
          onDoubleClick={(e) => {
            e.stopPropagation();
            handleDoubleTap(e.clientX, e.clientY);
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={1000}
            priority
            unoptimized
            className="max-w-[92vw] max-h-[82vh] w-auto h-auto object-contain rounded-lg shadow-2xl pointer-events-none"
          />
        </div>
      </div>

      {/* Bottom Helpful Navigation Tip Bar */}
      <div className="relative z-20 px-4 py-3 text-center bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-[12px] sm:text-xs text-slate-300 font-medium tracking-wide">
          <span className="hidden sm:inline">Scroll wheel or use buttons to zoom • Click &amp; drag to pan • Double-click to toggle zoom</span>
          <span className="inline sm:hidden">Pinch to zoom • Drag to pan • Double-tap to toggle zoom</span>
        </p>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
