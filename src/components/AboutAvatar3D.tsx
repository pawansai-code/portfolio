import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Loader2, Sparkles } from 'lucide-react';
import avatarModelUrl from '../assets/model (2).glb';

export const AboutAvatar3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let mixer: THREE.AnimationMixer | null = null;
    let pivotGroup: THREE.Group = new THREE.Group();

    // Interaction state
    let isDragging = false;
    let previousMouseX = 0;
    let targetRotationY = 0;
    let currentRotationY = 0;
    let targetTiltX = 0;
    let currentTiltX = 0;

    // Scene
    const scene = new THREE.Scene();
    scene.add(pivotGroup);

    // Initial width and height
    const initialWidth = container.clientWidth || 400;
    const initialHeight = container.clientHeight || 700;

    // Camera setup - vertical FOV 36 deg for cinematic full-body framing
    const camera = new THREE.PerspectiveCamera(
      36,
      initialWidth / initialHeight,
      0.1,
      100
    );
    // Default position (will be perfected once model dimensions load)
    camera.position.set(0, 0.92, 3.5);
    camera.lookAt(0, 0.9, 0);

    // Renderer with full alpha transparency (no background box)
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(initialWidth, initialHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Lighting setup for high-clarity character showcase
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    // Main key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
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
    const fillLight = new THREE.PointLight(0x60a5fa, 1.3, 8);
    fillLight.position.set(0, 1.2, 2.5);
    scene.add(fillLight);

    // Dedicated shoe & lower-body lights for crystal-clear shoe visibility
    const shoeFillLight = new THREE.DirectionalLight(0xe0f2fe, 2.2);
    shoeFillLight.position.set(0, 0.35, 2.5);
    scene.add(shoeFillLight);

    const floorBounceLight = new THREE.DirectionalLight(0x93c5fd, 1.5);
    floorBounceLight.position.set(0, -0.6, 1.5);
    scene.add(floorBounceLight);

    const leftShoeRim = new THREE.PointLight(0x38bdf8, 1.6, 4);
    leftShoeRim.position.set(-0.9, 0.25, 0.6);
    scene.add(leftShoeRim);

    const rightShoeRim = new THREE.PointLight(0x60a5fa, 1.6, 4);
    rightShoeRim.position.set(0.9, 0.25, 0.6);
    scene.add(rightShoeRim);

    // Subtle natural contact shadow plane on floor (transparent, grounds shoes without any card/container)
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 60);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
      grad.addColorStop(0.35, 'rgba(0, 0, 0, 0.22)');
      grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.06)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(1.3, 0.9);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.set(0, 0.002, 0);
    scene.add(contactShadow);

    // GLTFLoader
    const loader = new GLTFLoader();
    const clock = new THREE.Clock();

    loader.load(
      avatarModelUrl,
      (gltf) => {
        const rawModel = gltf.scene;

        // Auto center model so feet are placed on the ground at y=0
        const box = new THREE.Box3().setFromObject(rawModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Offset the inner model so pivotGroup's origin is at feet center (x=0, y=0, z=0)
        rawModel.position.set(-center.x, -box.min.y, -center.z);

        // Enhance materials and shoe visibility
        rawModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            // Make dark shoe leather catch highlights and light contours
            if (mesh.name.toLowerCase().includes('shoe') && mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              if (mat.roughness !== undefined) {
                mat.roughness = 0.42;
                mat.metalness = 0.18;
              }
            }
          }
        });

        pivotGroup.add(rawModel);

        // Adjust camera to frame avatar head-to-toe with comfortable clearance above head and below shoes
        const modelHeight = size.y; // ~1.89m
        const targetCenterY = modelHeight * 0.48; // ~0.91m
        camera.position.set(0, targetCenterY, 3.5);
        camera.lookAt(0, targetCenterY, 0);

        // Play waving / idling animation
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(rawModel);
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

      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        targetRotationY += deltaX * 0.01;
        previousMouseX = e.clientX;
      } else {
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

      if (pivotGroup) {
        pivotGroup.rotation.y = currentRotationY + currentTiltX;
      }

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
    <div className="relative w-full h-[620px] sm:h-[680px] lg:h-[720px] flex items-center justify-center select-none bg-transparent">
      
      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing bg-transparent" />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent z-20">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-3 text-cyan-500 shadow-md">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
          <p className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Loading Avatar ({loadProgress}%)</span>
          </p>
        </div>
      )}

      {/* Minimal Drag Hint */}
      <div className="absolute bottom-3 right-3 z-10 pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-5 rounded-lg text-slate-500 dark:text-slate-400 text-[20px] font-mono">
        </div>
      </div>

    </div>
  );
};
