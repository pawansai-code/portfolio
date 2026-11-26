import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Loader2, Radio, Compass, Rotate3d, Sparkles } from 'lucide-react';
import droneModelUrl from '../assets/Drone.glb';

export const Drone3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    const scene = new THREE.Scene();

    // Drone flight hierarchy
    const flightPivot = new THREE.Group();
    const droneGroup = new THREE.Group();
    flightPivot.add(droneGroup);
    scene.add(flightPivot);

    // Initial container measurements
    const initialWidth = container.clientWidth || 400;
    const initialHeight = container.clientHeight || 550;

    // Camera setup (perspective angled slightly above drone for dramatic hero view)
    const camera = new THREE.PerspectiveCamera(
      38,
      initialWidth / initialHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.15, 3.65);
    camera.lookAt(0, 0, 0);

    // Renderer (completely transparent background)
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(initialWidth, initialHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const cyanRim = new THREE.DirectionalLight(0x06b6d4, 2.8);
    cyanRim.position.set(-4, 3, -2);
    scene.add(cyanRim);

    const blueFill = new THREE.DirectionalLight(0x3b82f6, 2.2);
    blueFill.position.set(3, 2, -3);
    scene.add(blueFill);

    const underGlow = new THREE.DirectionalLight(0x38bdf8, 1.5);
    underGlow.position.set(0, -2, 1);
    scene.add(underGlow);

    // Navigation strobe lights attached to drone
    const portNavLight = new THREE.PointLight(0xef4444, 2.5, 4);
    portNavLight.position.set(-1.2, 0.1, 0);
    droneGroup.add(portNavLight);

    const starboardNavLight = new THREE.PointLight(0x10b981, 2.5, 4);
    starboardNavLight.position.set(1.2, 0.1, 0);
    droneGroup.add(starboardNavLight);

    const beaconLight = new THREE.PointLight(0x38bdf8, 2.0, 4);
    beaconLight.position.set(0, -0.25, -0.5);
    droneGroup.add(beaconLight);

    // Ground telemetry altitude scanning ring (Holographic LIDAR ring)
    const lidarGroup = new THREE.Group();
    lidarGroup.position.y = -1.1;

    const ringGeo = new THREE.RingGeometry(0.85, 0.9, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    lidarGroup.add(ringMesh);

    const innerRingGeo = new THREE.RingGeometry(0.4, 0.44, 36);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const innerRingMesh = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRingMesh.rotation.x = -Math.PI / 2;
    lidarGroup.add(innerRingMesh);

    scene.add(lidarGroup);

    // GLTFLoader
    const loader = new GLTFLoader();
    const clock = new THREE.Clock();

    // Interactive Drag & Tilt Controls
    let isDragging = false;
    let previousMouseX = 0;
    let targetRotationY = -0.3; // Default pleasant 3/4 hero angle
    let currentRotationY = -0.3;
    let targetBankX = 0;
    let currentBankX = 0;
    let targetPitchZ = 0;
    let currentPitchZ = 0;

    loader.load(
      droneModelUrl,
      (gltf) => {
        const rawModel = gltf.scene;

        // Clean up Blender non-drone elements (Cutter tools, default camera, lights)
        const toRemove: THREE.Object3D[] = [];
        rawModel.traverse((child) => {
          if (
            child.name &&
            (child.name.toLowerCase().includes('cutter') ||
              child.name === 'Light' ||
              child.name === 'Camera')
          ) {
            toRemove.push(child);
          }
        });
        toRemove.forEach((c) => {
          if (c.parent) c.parent.remove(c);
        });

        // Compute drone bounds and center
        const box = new THREE.Box3().setFromObject(rawModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Center model geometry inside droneGroup
        rawModel.position.set(-center.x, -center.y, -center.z);

        // Normalize scale for crisp proportional framing
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 2.45 / (maxDim || 1);
        droneGroup.scale.setScalar(targetScale);

        // Position navigation lights based on model bounds
        portNavLight.position.set(-size.x * 0.45 * targetScale, 0.05, 0);
        starboardNavLight.position.set(size.x * 0.45 * targetScale, 0.05, 0);
        beaconLight.position.set(0, -size.y * 0.3 * targetScale, -size.z * 0.4 * targetScale);

        // Enhance materials
        rawModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              if (mat.roughness !== undefined) {
                mat.roughness = Math.min(mat.roughness, 0.55);
              }
            }
          }
        });

        droneGroup.add(rawModel);
        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (err) => {
        console.error('Error loading Drone 3D model:', err);
        setLoading(false);
      }
    );

    // Mouse Interaction
    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseRelX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseRelY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        targetRotationY += deltaX * 0.01;
        previousMouseX = e.clientX;
      } else {
        // Flight banking reaction to cursor (rolls into turn, pitches with cursor)
        targetBankX = mouseRelX * 0.28;
        targetPitchZ = mouseRelY * 0.20;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // Touch Interaction
    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        isDragging = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStartX;
        targetRotationY += deltaX * 0.015;
        touchStartX = e.touches[0].clientX;
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Responsive container resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const height = entry.contentRect.height;
        if (width > 0 && height > 0) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      }
    });
    resizeObserver.observe(container);

    // Render / Flight Simulation Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Realistic flight controller micro-oscillations & hovering altitude wave
      const hoverY = Math.sin(time * 2.2) * 0.12 + Math.cos(time * 3.8) * 0.025;
      const hoverRoll = Math.sin(time * 1.6) * 0.035;
      const hoverPitch = Math.cos(time * 1.9) * 0.028;
      const hoverYaw = Math.sin(time * 0.8) * 0.08;

      // Smooth damping for user drag and aerodynamic banking
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;
      currentBankX += (targetBankX - currentBankX) * 0.06;
      currentPitchZ += (targetPitchZ - currentPitchZ) * 0.06;

      // Apply flight dynamics
      droneGroup.position.y = hoverY;
      droneGroup.rotation.z = hoverRoll - currentBankX;
      droneGroup.rotation.x = hoverPitch + currentPitchZ;
      droneGroup.rotation.y = currentRotationY + hoverYaw;

      // Aviation strobe lights pulse
      const strobeTime = (time * 1.5) % 1.0;
      const isStrobe = strobeTime < 0.12;
      beaconLight.intensity = isStrobe ? 4.5 : 0.8;
      portNavLight.intensity = isStrobe ? 3.5 : 1.2;
      starboardNavLight.intensity = isStrobe ? 3.5 : 1.2;

      // Animate Ground LIDAR Telemetry Rings
      ringMesh.rotation.z += 0.007;
      innerRingMesh.rotation.z -= 0.012;
      const lidarPulse = 1 + Math.sin(time * 2.5) * 0.04;
      lidarGroup.scale.set(lidarPulse, lidarPulse, lidarPulse);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div className="relative w-full h-[540px] sm:h-[600px] lg:h-[640px] flex items-center justify-center select-none bg-transparent">
      
      {/* 3D Canvas Mount Point */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing bg-transparent" 
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent z-20">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-3 text-cyan-500 shadow-md">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
          <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Summoning Autonomous Drone ({loadProgress}%)</span>
          </p>
        </div>
      )}

      {/* Floating Autonomous Flight Telemetry Overlay (Top Left) */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 dark:bg-slate-950/80 text-cyan-400 text-xs font-mono font-semibold border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-cyan-500/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>PX4 / MAVROS • Autonomous Hover</span>
        </div>
      </div>

      {/* Drag & Bank Hint (Bottom Right) */}
      <div className="absolute bottom-4 right-4 z-10 pointer-events-none transition-opacity duration-300 opacity-80 hover:opacity-100">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/75 dark:bg-slate-950/75 text-slate-300 text-[11px] font-mono border border-slate-700/60 backdrop-blur-md shadow-sm">
          <Rotate3d className="w-3.5 h-3.5 text-cyan-400" />
          <span>Drag to inspect 360°</span>
        </div>
      </div>

      {/* Subtle Bottom Flight Altitude Status (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none hidden sm:block">
        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>GCS Telemetry Active • Altitude 1.2m</span>
        </div>
      </div>

    </div>
  );
};
