'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NEBULA_DATA = [
  { position: [50, 20, -60] as [number, number, number], color: '#4A1F7A', opacity: 0.08, scale: 25 },
  { position: [-40, -15, -70] as [number, number, number], color: '#C94A7A', opacity: 0.06, scale: 20 },
  { position: [30, -25, 55] as [number, number, number], color: '#6B8ACF', opacity: 0.05, scale: 22 },
];

const Nebulae = () => {
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(() => {
    refs.current.forEach((mesh, i) => {
      if (mesh) mesh.rotation.z += 0.00005 * (i + 1);
    });
  });

  return (
    <group>
      {NEBULA_DATA.map((nebula, i) => (
        <mesh
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          position={nebula.position}
        >
          <sphereGeometry args={[nebula.scale, 16, 16]} />
          <meshBasicMaterial color={nebula.color} transparent opacity={nebula.opacity} side={THREE.BackSide} />
        </mesh>
      ))}
    </group>
  );
};

export default Nebulae;
