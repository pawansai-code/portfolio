import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeSkillCanvasProps {
  activeColor?: string;
  categoryTitle?: string;
}

export const ThreeSkillCanvas: React.FC<ThreeSkillCanvasProps> = ({ 
  activeColor = '#3b82f6',
  categoryTitle = 'All Technologies'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 380;
    const height = container.clientHeight || 380;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for entire rotating constellation
    const constellationGroup = new THREE.Group();
    scene.add(constellationGroup);

    // 1. Central Wireframe Icosahedron (Geodesic Tech Core)
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(activeColor),
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    constellationGroup.add(coreMesh);

    // 2. Inner Glowing Core
    const innerGeo = new THREE.IcosahedronGeometry(0.8, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(activeColor),
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    constellationGroup.add(innerMesh);

    // 3. Floating 3D Node Points (Particles)
    const particleCount = 75;
    const positions = new Float32Array(particleCount * 3);
    const radius = 2.1;

    for (let i = 0; i < particleCount; i++) {
      // Fibonacci sphere distribution for harmonious spacing
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const r = radius + (Math.random() - 0.5) * 0.4;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMat = new THREE.PointsMaterial({
      color: new THREE.Color(activeColor),
      size: 0.08,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    constellationGroup.add(particles);

    // 4. Outer Orbital Energy Rings
    const ringGeo1 = new THREE.TorusGeometry(2.5, 0.015, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: new THREE.Color(activeColor),
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    constellationGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.3, 0.012, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: new THREE.Color(activeColor),
      transparent: true,
      opacity: 0.25,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    constellationGroup.add(ring2);

    // Interactive mouse / drag variables
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.5;
      mouseY = y * 0.5;

      if (isDragging) {
        const deltaX = e.clientX - prevPointerX;
        const deltaY = e.clientY - prevPointerY;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;
        prevPointerX = e.clientX;
        prevPointerY = e.clientY;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    // Handle Window Resize
    const onResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous gentle auto rotation
      constellationGroup.rotation.y += 0.004;
      constellationGroup.rotation.x += 0.002;

      // Smooth mouse follow interpolation
      constellationGroup.rotation.y += (targetRotationY + mouseX - constellationGroup.rotation.y) * 0.04;
      constellationGroup.rotation.x += (targetRotationX + mouseY - constellationGroup.rotation.x) * 0.04;

      // Pulse inner core gently
      const scale = 1 + Math.sin(elapsedTime * 2) * 0.05;
      innerMesh.scale.set(scale, scale, scale);

      // Rotate individual orbital rings
      ring1.rotation.z += 0.006;
      ring2.rotation.z -= 0.005;

      renderer.render(scene, camera);
    };
    animate();

    // Store references for color update
    (container as any).__threeUpdateColor = (newHex: string) => {
      const color = new THREE.Color(newHex);
      coreMat.color = color;
      innerMat.color = color;
      particlesMat.color = color;
      ringMat1.color = color;
      ringMat2.color = color;
    };

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);

      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update color when activeColor prop changes
  useEffect(() => {
    const container = mountRef.current;
    if (container && (container as any).__threeUpdateColor) {
      (container as any).__threeUpdateColor(activeColor);
    }
  }, [activeColor]);

  return (
    <div className="relative w-full h-[320px] sm:h-[380px] rounded-3xl overflow-hidden bg-slate-900/60 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-xl flex items-center justify-center select-none group cursor-grab active:cursor-grabbing">
      
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Futuristic HUD Overlays */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-white text-[11px] font-mono pointer-events-none">
        <span 
          className="w-2 h-2 rounded-full animate-ping"
          style={{ backgroundColor: activeColor }}
        />
        <span>3D TECH MATRIX</span>
      </div>

      <div className="absolute bottom-4 left-4 z-10 text-left pointer-events-none">
        <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest">
          Active Domain Core
        </span>
        <span className="font-extrabold text-sm sm:text-base text-white tracking-wide">
          {categoryTitle}
        </span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-md text-[10px] font-mono text-slate-400 pointer-events-none border border-white/5">
        Drag to Rotate 3D Orb
      </div>
    </div>
  );
};
