"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Check for WebGL support
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      // Fallback silently if WebGL is not supported
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4.5;

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create an elegant geodesic / icosahedron structure with floating nodes
    const group = new THREE.Group();
    scene.add(group);

    // Inner wireframe sphere/icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(1.6, 2);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    group.add(icoMesh);

    // Outer subtle point cloud
    const pointsCount = 180;
    const positions = new Float32Array(pointsCount * 3);
    for (let i = 0; i < pointsCount * 3; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 0.5 + 1.6;
      const sinPhi = Math.sin(phi);
      positions[i] = r * sinPhi * Math.cos(theta);
      positions[i + 1] = r * sinPhi * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);
    }
    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x059669,
      transparent: true,
      opacity: 0.6,
    });
    const pointCloud = new THREE.Points(pointsGeometry, pointsMaterial);
    group.add(pointCloud);

    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      targetX = (x / rect.width) * 0.6;
      targetY = (y / rect.height) * 0.6;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Handle container resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      if (!prefersReducedMotion) {
        // Smooth easing towards mouse position
        mouseX += (targetX - mouseX) * 0.04;
        mouseY += (targetY - mouseY) * 0.04;

        group.rotation.y += 0.003;
        group.rotation.x = mouseY * 0.8;
        group.rotation.z = mouseX * 0.8;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup resources on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      icoGeometry.dispose();
      icoMaterial.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[300px] sm:min-h-[380px] lg:min-h-[440px] flex items-center justify-center relative select-none pointer-events-none"
      aria-hidden="true"
    />
  );
}
