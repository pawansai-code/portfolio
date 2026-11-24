import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeExperienceFlowProps {
  activeStage?: string | null;
}

export const ThreeExperienceFlow: React.FC<ThreeExperienceFlowProps> = ({ activeStage }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 800;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 180);

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: false,
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 2. Interactive Flow Stream (3D Curved Particle River)
    const particleCount = 140;
    const curvePoints = [
      new THREE.Vector3(-120, 120, -40),
      new THREE.Vector3(-40, 60, 20),
      new THREE.Vector3(30, -10, -20),
      new THREE.Vector3(-30, -80, 10),
      new THREE.Vector3(100, -140, -30),
    ];
    const curve = new THREE.CatmullRomCurve3(curvePoints);

    // Particles following the spline
    const particlesData: Array<{ t: number; speed: number; radius: number; angle: number; rotSpeed: number }> = [];
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Base color palettes
    const colorAI = new THREE.Color('#06b6d4'); // Cyan for OneIntegral AI
    const colorWeb = new THREE.Color('#3b82f6'); // Electric Blue for SocialTek
    const colorAccent = new THREE.Color('#8b5cf6'); // Violet

    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      const pt = curve.getPoint(t);
      const radius = 10 + Math.random() * 22;
      const angle = Math.random() * Math.PI * 2;

      positions[i * 3] = pt.x + Math.cos(angle) * radius;
      positions[i * 3 + 1] = pt.y + Math.sin(angle) * radius;
      positions[i * 3 + 2] = pt.z + (Math.random() - 0.5) * 20;

      const c = t < 0.5 ? colorAI : colorWeb;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      particlesData.push({
        t,
        speed: 0.0015 + Math.random() * 0.002,
        radius,
        angle,
        rotSpeed: (Math.random() - 0.5) * 0.03,
      });
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage));

    const particlesMat = new THREE.PointsMaterial({
      size: 4,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const flowPoints = new THREE.Points(particlesGeo, particlesMat);
    scene.add(flowPoints);

    // 3. Two 3D Orbital Beacon Rings (representing the 2 Milestone hubs)
    const ringGeo = new THREE.TorusGeometry(18, 0.6, 8, 32);
    const ringMat1 = new THREE.MeshBasicMaterial({ 
      color: 0x06b6d4, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.35 
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat1);
    ring1.position.set(-60, 50, -10);
    scene.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({ 
      color: 0x3b82f6, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.35 
    });
    const ring2 = new THREE.Mesh(ringGeo, ringMat2);
    ring2.position.set(60, -60, -10);
    scene.add(ring2);

    // 4. Mouse Tracking for 3D Camera Parallax
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
      targetY = -((e.clientY - rect.top) / rect.height - 0.5) * 40;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // 5. Window Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Expose stage color target update
    let currentTargetColor = new THREE.Color('#3b82f6');
    (container as any).__setStageColor = (stage: string | null) => {
      if (stage === 'oneintegral') {
        currentTargetColor = new THREE.Color('#06b6d4');
      } else if (stage === 'socialtek') {
        currentTargetColor = new THREE.Color('#3b82f6');
      } else {
        currentTargetColor = new THREE.Color('#60a5fa');
      }
    };

    // 6. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Camera parallax
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      // Rotate beacon rings
      ring1.rotation.x += 0.01;
      ring1.rotation.y += 0.015;
      ring2.rotation.x -= 0.012;
      ring2.rotation.y += 0.01;

      // Update particle stream
      const posArr = particlesGeo.attributes.position.array as Float32Array;
      const colArr = particlesGeo.attributes.color.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const p = particlesData[i];
        p.t = (p.t + p.speed) % 1.0;
        p.angle += p.rotSpeed;

        const pt = curve.getPoint(p.t);
        posArr[i * 3] = pt.x + Math.cos(p.angle) * p.radius;
        posArr[i * 3 + 1] = pt.y + Math.sin(p.angle) * p.radius;
        posArr[i * 3 + 2] = pt.z + Math.sin(p.t * Math.PI * 4) * 8;

        // Dynamic color blend based on position and active stage
        const targetColor = p.t < 0.5 ? colorAI : colorWeb;
        colArr[i * 3] += (targetColor.r - colArr[i * 3]) * 0.05;
        colArr[i * 3 + 1] += (targetColor.g - colArr[i * 3 + 1]) * 0.05;
        colArr[i * 3 + 2] += (targetColor.b - colArr[i * 3 + 2]) * 0.05;
      }

      particlesGeo.attributes.position.needsUpdate = true;
      particlesGeo.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      particlesGeo.dispose();
      particlesMat.dispose();
      ringGeo.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (container && (container as any).__setStageColor) {
      (container as any).__setStageColor(activeStage || null);
    }
  }, [activeStage]);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-40 transition-opacity duration-700 overflow-hidden" 
    />
  );
};
