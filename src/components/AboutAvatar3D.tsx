import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Loader2, Rotate3d, Sparkles } from 'lucide-react';
import avatarModelUrl from '../assets/model (1).glb';

export const AboutAvatar3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let mixer: THREE.AnimationMixer | null = null;
    let modelRoot: THREE.Group | null = null;

    // Interaction state
    let isDragging = false;
    let previousMouseX = 0;
    let targetRotationY = 0;
    let currentRotationY = 0;
    let targetTiltX = 0;
    let currentTiltX = 0;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.25, 3.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting setup for character showcase
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    // Main key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(2, 4, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Cyan rim light (from left-behind)
    const cyanRim = new THREE.DirectionalLight(0x06b6d4, 2.8);
    cyanRim.position.set(-3, 2, -2);
    scene.add(cyanRim);

    // Blue fill light (from right-behind)
    const blueRim = new THREE.DirectionalLight(0x3b82f6, 2.2);
    blueRim.position.set(3, 1.5, -2);
    scene.add(blueRim);

    // Front soft fill
    const fillLight = new THREE.PointLight(0x60a5fa, 1.2, 8);
    fillLight.position.set(0, 1.2, 2.5);
    scene.add(fillLight);

    // Holographic glowing circular base pedestal
    const pedestalGroup = new THREE.Group();
    
    // Outer glowing ring
    const ringGeo = new THREE.RingGeometry(0.7, 0.76, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 0.01;
    pedestalGroup.add(ringMesh);

    // Inner subtle disc
    const discGeo = new THREE.CircleGeometry(0.68, 64);
    const discMat = new THREE.MeshBasicMaterial({
      color: 0x1e3a8a,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const discMesh = new THREE.Mesh(discGeo, discMat);
    discMesh.rotation.x = -Math.PI / 2;
    pedestalGroup.add(discMesh);

    scene.add(pedestalGroup);

    // GLTFLoader
    const loader = new GLTFLoader();
    const clock = new THREE.Clock();

    loader.load(
      avatarModelUrl,
      (gltf) => {
        modelRoot = gltf.scene;

        // Auto center and scale model
        const box = new THREE.Box3().setFromObject(modelRoot);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Place model feet directly on pedestal at y=0, centered on x and z
        modelRoot.position.x = -center.x;
        modelRoot.position.y = -box.min.y;
        modelRoot.position.z = -center.z;

        // Setup shadows and materials
        modelRoot.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add(modelRoot);

        // Adjust camera to frame avatar head-to-toe nicely
        const headHeight = size.y;
        camera.position.set(0, headHeight * 0.58, 2.7);
        camera.lookAt(0, headHeight * 0.52, 0);

        // Play waving / idling animation
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(modelRoot);
          const clip = gltf.animations[0];
          const action = mixer.clipAction(clip);
          action.setEffectiveTimeScale(1.0);
          action.play();
        }

        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (error) => {
        console.error('Error loading 3D Avatar GLB:', error);
        setLoading(false);
      }
    );

    // Mouse / Touch interaction for rotation
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
        // Subtle gaze / body tilt toward cursor
        targetTiltX = mouseRelX * 0.2;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // Touch support
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

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Render loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      if (mixer) {
        mixer.update(delta);
      }

      // Smooth damping for rotation
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      currentTiltX += (targetTiltX - currentTiltX) * 0.05;

      if (modelRoot) {
        modelRoot.rotation.y = currentRotationY + currentTiltX;
      }

      // Slow gentle rotation of pedestal rings
      if (ringMesh) {
        ringMesh.rotation.z += 0.005;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
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
    <div className="relative w-full h-[540px] sm:h-[600px] lg:h-[640px] rounded-3xl overflow-hidden bg-gradient-to-b from-blue-500/5 via-slate-100/50 dark:via-slate-900/40 to-cyan-500/10 border border-slate-200/90 dark:border-slate-800/90 shadow-2xl backdrop-blur-xl flex items-center justify-center select-none group">
      
      {/* Dynamic ambient background glow */}
      <div className="absolute top-1/4 -right-10 w-72 h-72 bg-cyan-500/20 dark:bg-cyan-500/25 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-10 w-72 h-72 bg-blue-600/20 dark:bg-blue-600/25 blur-[120px] rounded-full pointer-events-none" />

      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/80 dark:bg-[#070b14]/85 backdrop-blur-md z-20">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4 text-cyan-500 shadow-lg shadow-cyan-500/20">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
          <p className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Summoning 3D Avatar...</span>
          </p>
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Loading interactive model ({loadProgress}%)
          </p>
        </div>
      )}

      {/* Interactive Badge (Top Left) */}
      <div className="absolute top-5 left-5 z-10 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 dark:bg-slate-950/80 text-cyan-400 text-xs font-mono font-bold border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-cyan-500/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Interactive 3D Avatar</span>
        </div>
      </div>

      {/* Drag Hint (Bottom Right) */}
      <div className="absolute bottom-5 right-5 z-10 pointer-events-none transition-opacity duration-300 opacity-70 group-hover:opacity-100">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/70 dark:bg-slate-950/70 text-slate-300 text-[11px] font-mono border border-slate-700/60 backdrop-blur-md">
          <Rotate3d className="w-3.5 h-3.5 text-cyan-400" />
          <span>Drag to rotate</span>
        </div>
      </div>

      {/* Status indicator (Bottom Left) */}
      <div className="absolute bottom-5 left-5 z-10 pointer-events-none hidden sm:block">
        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
          <span className="text-cyan-500 font-semibold">Idle Animation</span> • Waving Live
        </div>
      </div>

    </div>
  );
};
