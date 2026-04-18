'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TIME_SCALE } from './time-scale';

const AsteroidBelt = ({ count = 40 }: { count?: number }) => {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const data = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2 + i * 0.137,
      radius: 7.3 + (i % 10) * 0.04,
      y: (i % 7 - 3) * 0.08,
      rotSpeed: 0.001 + (i % 5) * 0.0005,
      orbitSpeed: 0.003 + (i % 3) * 0.001,
      scale: 0.6 + (i % 4) * 0.3,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * TIME_SCALE;
    data.forEach((d, i) => {
      const angle = d.angle + t * d.orbitSpeed;
      dummy.position.set(
        Math.cos(angle) * d.radius,
        d.y + Math.sin(t * 0.5 + i) * 0.03,
        Math.sin(angle) * d.radius
      );
      dummy.rotation.set(t * d.rotSpeed * 3, t * d.rotSpeed * 5, t * d.rotSpeed * 2);
      dummy.scale.setScalar(d.scale);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <icosahedronGeometry args={[0.08, 0]} />
      <meshStandardMaterial color="#555555" roughness={0.9} metalness={0.1} />
    </instancedMesh>
  );
};

export default AsteroidBelt;
