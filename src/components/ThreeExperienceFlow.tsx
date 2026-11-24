import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeExperienceFlow: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 900;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 110, 240);
    camera.lookAt(0, -20, 0);

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: false,
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 2. Interactive 3D Fluid Quantum Wave Particle Grid
    // 50 x 30 = 1500 dynamic glowing nodes
    const cols = 55;
    const rows = 35;
    const numParticles = cols * rows;
    const spacingX = 14;
    const spacingZ = 14;
    const offsetX = ((cols - 1) * spacingX) / 2;
    const offsetZ = ((rows - 1) * spacingZ) / 2;

    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);
    const initialY = new Float32Array(numParticles);

    // Color gradients: AI Cyan (#00f2fe) to Electric Blue (#4facfe) and Violet (#7f00ff)
    const colorCyan = new THREE.Color('#00f2fe');
    const colorBlue = new THREE.Color('#3b82f6');
    const colorViolet = new THREE.Color('#8b5cf6');

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const index = i * rows + j;
        const x = i * spacingX - offsetX;
        const z = j * spacingZ - offsetZ;
        const y = 0;

        positions[index * 3] = x;
        positions[index * 3 + 1] = y;
        positions[index * 3 + 2] = z;
        initialY[index] = y;

        // Gradient coloring across the wave plane
        const ratioX = i / cols;
        const ratioZ = j / rows;
        const vertexColor = new THREE.Color();
        if (ratioX < 0.5) {
          vertexColor.lerpColors(colorCyan, colorBlue, ratioX * 2);
        } else {
          vertexColor.lerpColors(colorBlue, colorViolet, (ratioX - 0.5) * 2);
        }

        colors[index * 3] = vertexColor.r;
        colors[index * 3 + 1] = vertexColor.g;
        colors[index * 3 + 2] = vertexColor.b * (0.8 + ratioZ * 0.4);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture / glow circular point
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(100, 210, 255, 0.8)');
      grad.addColorStop(0.7, 'rgba(59, 130, 246, 0.25)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 6.5,
      map: texture,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const wavePoints = new THREE.Points(geometry, material);
    scene.add(wavePoints);

    // 3. Mouse Interaction & Ripple Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 110;
    let mouseWorldX = 0;
    let mouseWorldZ = 0;
    let isMouseOver = false;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        isMouseOver = true;
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;

        mouseX = normX;
        mouseY = normY;

        targetCameraX = normX * 60;
        targetCameraY = 110 - normY * 30;

        mouseWorldX = normX * ((cols * spacingX) * 0.9);
        mouseWorldZ = normY * ((rows * spacingZ) * 0.9);
      } else {
        isMouseOver = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // 4. Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // 5. Animation Loop
    let animId: number;
    let time = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.025;

      // Smooth camera interpolation
      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.lookAt(0, -15, 0);

      // Wave calculation
      const posArray = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const index = i * rows + j;
          const x = posArray[index * 3];
          const z = posArray[index * 3 + 2];

          // Harmonic double sine wave
          let waveY = Math.sin(x * 0.025 + time) * 16 + 
                      Math.cos(z * 0.035 + time * 0.8) * 16;

          // Interactive cursor ripple
          if (isMouseOver) {
            const dx = x - mouseWorldX;
            const dz = z - mouseWorldZ;
            const dist = Math.sqrt(dx * dx + dz * dz);
            const influenceRadius = 140;

            if (dist < influenceRadius) {
              const force = (1 - dist / influenceRadius);
              waveY += Math.sin(dist * 0.1 - time * 4) * 28 * force;
            }
          }

          posArray[index * 3 + 1] = waveY;
        }
      }

      geometry.attributes.position.needsUpdate = true;

      // Gentle wave mesh tilt
      wavePoints.rotation.y = Math.sin(time * 0.2) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-50 transition-opacity duration-700 overflow-hidden" 
    />
  );
};
