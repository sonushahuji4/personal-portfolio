'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TIME_SCALE } from './time-scale';

const Sun = () => {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.0002 * TIME_SCALE;
  });

  return (
    <group ref={ref}>
      {/* Core */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial color="#ffd700" emissive="#ff8c00" emissiveIntensity={2} roughness={0.3} />
      </mesh>
      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[1.6, 16, 16]} />
        <meshStandardMaterial color="#ffa500" transparent opacity={0.12} emissive="#ffa500" emissiveIntensity={0.5} />
      </mesh>
      {/* Far glow */}
      <mesh>
        <sphereGeometry args={[2.2, 16, 16]} />
        <meshStandardMaterial color="#ff6600" transparent opacity={0.04} emissive="#ff6600" emissiveIntensity={0.3} />
      </mesh>
      <pointLight color="#ffd700" intensity={3} distance={100} decay={2} />
    </group>
  );
};

export default Sun;
