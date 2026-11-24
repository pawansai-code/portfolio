import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import avatarGlbUrl from '../assets/pawan-avatar.glb';

interface ThreeAvatarCanvasProps {
  isMoving?: boolean;
  direction?: 'forward' | 'reverse';
}

export const ThreeAvatarCanvas: React.FC<ThreeAvatarCanvasProps> = ({
  isMoving = false,
  direction = 'forward',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 110;
    const height = container.clientHeight || 110;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.48, 1.15); // Focused on upper body / head
    camera.lookAt(0, 1.42, 0);

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff5e6, 2.4);
    mainLight.position.set(2, 3, 2);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xb8d9ff, 1.2);
    fillLight.position.set(-2, 1, 1);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x06b6d4, 1.8);
    rimLight.position.set(0, 2, -2);
    scene.add(rimLight);

    // 3. Load GLTF Avatar Model
    let mixer: THREE.AnimationMixer | null = null;
    let avatarModel: THREE.Group | null = null;
    const loader = new GLTFLoader();

    loader.load(
      avatarGlbUrl,
      (gltf) => {
        avatarModel = gltf.scene;
        avatarModel.position.set(0, 0, 0);
        avatarModel.scale.set(0.95, 0.95, 0.95);
        scene.add(avatarModel);

        // Play idle animation
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(avatarModel);
          const clip = gltf.animations[0];
          const action = mixer.clipAction(clip);
          action.setEffectiveTimeScale(0.85); // Natural gentle idle pace
          action.play();
        }

        setLoading(false);
      },
      undefined,
      (error) => {
        console.error('Error loading 3D avatar:', error);
        setLoading(false);
      }
    );

    // 4. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (mixer) {
        mixer.update(delta);
      }

      if (avatarModel) {
        // Subtle train movement sway
        const time = clock.getElapsedTime();
        if (isMoving) {
          avatarModel.position.y = Math.sin(time * 10) * 0.012;
          avatarModel.rotation.z = Math.sin(time * 8) * 0.02;
        } else {
          avatarModel.position.y = Math.sin(time * 2) * 0.003;
          avatarModel.rotation.z = 0;
        }

        // Face slightly in travel direction
        const targetRotY = direction === 'reverse' ? 0.35 : -0.35;
        avatarModel.rotation.y += (targetRotY - avatarModel.rotation.y) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (avatarModel) {
        scene.remove(avatarModel);
      }
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isMoving, direction]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm rounded-full">
          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
};
