import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeSkillBackgroundProps {
  accentColor?: string;
}

export const ThreeSkillBackground: React.FC<ThreeSkillBackgroundProps> = ({ 
  accentColor = '#3b82f6' 
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 800;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Particle nodes
    const particleCount = 65;
    const particlesData: Array<{ velocity: THREE.Vector3; numConnections: number }> = [];
    const positions = new Float32Array(particleCount * 3);
    const maxDistance = 140;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 450;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 300;

      particlesData.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4
        ),
        numConnections: 0,
      });
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));

    const particlesMat = new THREE.PointsMaterial({
      color: new THREE.Color(accentColor),
      size: 3.5,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const pointCloud = new THREE.Points(particlesGeo, particlesMat);
    scene.add(pointCloud);

    // Lines geometry
    const linePositions = new Float32Array(particleCount * particleCount * 3);
    const lineColors = new Float32Array(particleCount * particleCount * 3);

    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    linesGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

    const linesMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    const linesMesh = new THREE.LineSegments(linesGeo, linesMat);
    scene.add(linesMesh);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 120;
      mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 120;
    };
    window.addEventListener('mousemove', onPointerMove, { passive: true });

    // Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Dynamic color update function
    (container as any).__updateColor = (hex: string) => {
      particlesMat.color = new THREE.Color(hex);
    };

    // Animation loop
    let animId: number;
    const baseColor = new THREE.Color(accentColor);

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth camera pan based on mouse
      camera.position.x += (mouseX - camera.position.x) * 0.03;
      camera.position.y += (mouseY - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      let vertexpos = 0;
      let colorpos = 0;
      const posArray = particlesGeo.attributes.position.array as Float32Array;

      // Update positions
      for (let i = 0; i < particleCount; i++) {
        const data = particlesData[i];

        posArray[i * 3] += data.velocity.x;
        posArray[i * 3 + 1] += data.velocity.y;
        posArray[i * 3 + 2] += data.velocity.z;

        // Bounce off bounds
        if (posArray[i * 3] < -300 || posArray[i * 3] > 300) data.velocity.x = -data.velocity.x;
        if (posArray[i * 3 + 1] < -225 || posArray[i * 3 + 1] > 225) data.velocity.y = -data.velocity.y;
        if (posArray[i * 3 + 2] < -150 || posArray[i * 3 + 2] > 150) data.velocity.z = -data.velocity.z;

        // Connect lines
        for (let j = i + 1; j < particleCount; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            const alpha = 1.0 - dist / maxDistance;

            linePositions[vertexpos++] = posArray[i * 3];
            linePositions[vertexpos++] = posArray[i * 3 + 1];
            linePositions[vertexpos++] = posArray[i * 3 + 2];

            linePositions[vertexpos++] = posArray[j * 3];
            linePositions[vertexpos++] = posArray[j * 3 + 1];
            linePositions[vertexpos++] = posArray[j * 3 + 2];

            lineColors[colorpos++] = baseColor.r * alpha * 0.4;
            lineColors[colorpos++] = baseColor.g * alpha * 0.4;
            lineColors[colorpos++] = baseColor.b * alpha * 0.4;

            lineColors[colorpos++] = baseColor.r * alpha * 0.4;
            lineColors[colorpos++] = baseColor.g * alpha * 0.4;
            lineColors[colorpos++] = baseColor.b * alpha * 0.4;
          }
        }
      }

      particlesGeo.attributes.position.needsUpdate = true;
      linesGeo.attributes.position.needsUpdate = true;
      linesGeo.attributes.color.needsUpdate = true;
      linesGeo.setDrawRange(0, vertexpos / 3);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', onResize);

      particlesGeo.dispose();
      particlesMat.dispose();
      linesGeo.dispose();
      linesMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (container && (container as any).__updateColor) {
      (container as any).__updateColor(accentColor);
    }
  }, [accentColor]);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-40 transition-opacity duration-500 overflow-hidden" 
    />
  );
};
