"use client";

import { useEffect, useRef } from "react";

export function StaticParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let resizeTimer = null;

    const drawStaticParticles = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (!width || !height) return;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);

      ctx.clearRect(0, 0, width, height);

      // Subtle, refined cosmic tech color palette
      const colors = [
        "rgba(0, 184, 240, 0.55)",  // Cyan
        "rgba(13, 140, 125, 0.45)",  // Teal
        "rgba(56, 189, 248, 0.5)",   // Sky blue
        "rgba(155, 170, 194, 0.35)", // Subtle slate
        "rgba(245, 247, 252, 0.4)",  // Star white
      ];

      // Balanced count: 24 on mobile, 36 on desktop
      const count = width < 768 ? 22 : 36;
      const particles = [];

      // Pseudo-random deterministic placement across the hero dimensions
      for (let i = 0; i < count; i++) {
        // Distribute more towards edges and center-top for atmospheric glow
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = 1.0 + Math.random() * 1.5;
        const color = colors[i % colors.length];

        particles.push({ x, y, radius, color });
      }

      // Draw faint constellation connection lines between close static nodes
      const maxDistance = width < 768 ? 95 : 125;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 184, 240, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw static glowing particle dots
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
      }

      // Reset shadow for canvas cleanup
      ctx.shadowBlur = 0;
    };

    drawStaticParticles();

    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        drawStaticParticles();
      }, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full opacity-70"
      aria-hidden="true"
    />
  );
}
