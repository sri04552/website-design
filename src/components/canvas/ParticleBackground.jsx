"use client";

import { useEffect, useRef } from "react";

export function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // High DPI scaling
    const setCanvasDimensions = () => {
      if (!canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setCanvasDimensions();

    // Lightweight ambient particles: 22 on desktop, 14 on mobile
    const particleCount = width < 768 ? 14 : 22;

    // Palette: subtle electric cyan and muted steel navy
    const particleColors = [
      "rgba(0, 184, 240, 0.45)",
      "rgba(0, 184, 240, 0.25)",
      "rgba(74, 107, 148, 0.35)",
    ];

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      radius: Math.random() * 1.5 + 0.8,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
    }));

    let isVisible = true;

    const render = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      // Draw and move particles with ultra-lightweight single-pass rendering
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Soft boundary wrap
          if (p.x < -10) p.x = width + 10;
          else if (p.x > width + 10) p.x = -10;

          if (p.y < -10) p.y = height + 10;
          else if (p.y > height + 10) p.y = -10;
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Only render canvas when Hero is visible on screen, pausing when scrolled past
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !prefersReducedMotion) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(render);
          } else {
            cancelAnimationFrame(animationFrameId);
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(canvas);

    render();

    const handleResize = () => {
      setCanvasDimensions();
      // Keep particles inside new bounds
      for (const p of particles) {
        if (p.x > width) p.x = Math.random() * width;
        if (p.y > height) p.y = Math.random() * height;
      }
      if (prefersReducedMotion || isVisible) {
        render();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      aria-hidden="true"
    />
  );
}
