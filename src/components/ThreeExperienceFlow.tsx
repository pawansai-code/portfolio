import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeExperienceFlow: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 900;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 75);

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f2fe, 3.5, 120);
    cyanLight.position.set(25, 25, 30);
    scene.add(cyanLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 3.5, 120);
    blueLight.position.set(-25, -25, 30);
    scene.add(blueLight);

    const coreGroup = new THREE.Group();
    // Position comfortably in the upper-right / center background
    coreGroup.position.set(22, 10, -5);
    scene.add(coreGroup);

    // 3. Central Faceted Quantum Icosahedron Core
    const innerGeo = new THREE.IcosahedronGeometry(7.5, 1);
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerWireMat);
    coreGroup.add(innerCore);

    // Solid inner glowing nucleus
    const nucleusGeo = new THREE.SphereGeometry(3.6, 24, 24);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    coreGroup.add(nucleus);

    // 4. Outer Gyroscopic Orbital Rings
    const ringGeo1 = new THREE.TorusGeometry(12.5, 0.28, 16, 64);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(15.5, 0.22, 16, 64);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x6d28d9,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 2.5;
    coreGroup.add(ring2);

    const ringGeo3 = new THREE.TorusGeometry(18.5, 0.18, 16, 64);
    const ringMat3 = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x0891b2,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.y = Math.PI / 3;
    coreGroup.add(ring3);

    // 5. Swirling Stardust Particle Field (180 particles)
    const particleCount = 180;
    const particlesGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleSpeeds: number[] = [];

    const cCyan = new THREE.Color(0x00f2fe);
    const cBlue = new THREE.Color(0x3b82f6);
    const cViolet = new THREE.Color(0x8b5cf6);

    for (let i = 0; i < particleCount; i++) {
      const radius = 9 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi);
      particlePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

      const chosenColor = Math.random() < 0.4 ? cCyan : Math.random() < 0.7 ? cBlue : cViolet;
      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;

      particleSpeeds.push(0.003 + Math.random() * 0.006);
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    coreGroup.add(particleSystem);

    // 6. Interactive Mouse Tracking
    let targetRotX = 0;
    let targetRotY = 0;
    let targetGroupX = 22;
    let targetGroupY = 10;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      targetRotX = normY * 1.2;
      targetRotY = normX * 1.5;

      targetGroupX = 22 + normX * 12;
      targetGroupY = 10 - normY * 12;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // 7. Responsive Resizing
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      // On smaller screens, center the 3D core slightly
      if (width < 768) {
        coreGroup.position.set(0, 5, -15);
        coreGroup.scale.set(0.65, 0.65, 0.65);
      } else {
        coreGroup.position.set(22, 10, -5);
        coreGroup.scale.set(1, 1, 1);
      }
    };
    window.addEventListener('resize', onResize);
    onResize();

    // 8. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth mouse follow
      coreGroup.rotation.x += (targetRotX - coreGroup.rotation.x) * 0.04;
      coreGroup.rotation.y += (targetRotY - coreGroup.rotation.y) * 0.04;

      coreGroup.position.x += (targetGroupX - coreGroup.position.x) * 0.03;
      coreGroup.position.y += (targetGroupY - coreGroup.position.y) * 0.03;

      // Gyroscopic continuous rotations
      innerCore.rotation.x = time * 0.4;
      innerCore.rotation.y = time * 0.6;

      ring1.rotation.x = time * 0.5;
      ring1.rotation.z = time * 0.3;

      ring2.rotation.y = -time * 0.45;
      ring2.rotation.z = time * 0.25;

      ring3.rotation.x = -time * 0.35;
      ring3.rotation.y = time * 0.4;

      // Gentle floating levitation
      coreGroup.position.y += Math.sin(time * 1.5) * 0.025;

      // Swirling particles
      particleSystem.rotation.y = time * 0.15;
      particleSystem.rotation.x = Math.sin(time * 0.2) * 0.1;

      // Breathing light pulse
      const pulse = Math.sin(time * 2.5) * 0.5 + 1.2;
      nucleusMat.emissiveIntensity = pulse * 0.5;
      innerWireMat.opacity = 0.5 + Math.sin(time * 2) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      innerGeo.dispose();
      innerWireMat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none opacity-70 dark:opacity-60 transition-opacity duration-700 overflow-hidden" 
    />
  );
};
