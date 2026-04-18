'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COMET_COLORS = ['#E8F4FF', '#CFFFD8', '#FFE8B5'];

const Comet = ({ seed }: { seed: number }) => {
  const ref = useRef<THREE.Group>(null);
  const color = COMET_COLORS[seed % 3];

  const curve = useMemo(() => {
    const pts = [
      new THREE.Vector3(-40 + seed * 15, 10 + seed * 5, -30 + seed * 10),
      new THREE.Vector3(-10 + seed * 8, 15 - seed * 3, -10 + seed * 5),
      new THREE.Vector3(20 - seed * 5, 8 + seed * 2, 20 - seed * 8),
      new THREE.Vector3(45 - seed * 12, -5 + seed * 4, 35 - seed * 6),
    ];
    return new THREE.CatmullRomCurve3(pts);
  }, [seed]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = ((clock.elapsedTime * 0.015 + seed * 0.3) % 1);
    const pos = curve.getPoint(t);
    ref.current.position.copy(pos);
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
      {/* Small glow trail */}
      <mesh>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshStandardMaterial color={color} transparent opacity={0.15} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

const Comets = ({ count = 2 }: { count?: number }) => {
  return (
    <group>
      {Array.from({ length: count }, (_, i) => (
        <Comet key={i} seed={i} />
      ))}
    </group>
  );
};

export default Comets;
