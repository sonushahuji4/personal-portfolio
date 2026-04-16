'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Chapter } from '@/types/life-circle';
import { TIME_SCALE } from './time-scale';

const ORBIT_DATA = [
  { radius: 3.5, speed: 0.014, size: 0.25, tilt: 0.1 },
  { radius: 4.2, speed: 0.012, size: 0.28, tilt: -0.05 },
  { radius: 5.0, speed: 0.010, size: 0.24, tilt: 0.15 },
  { radius: 5.8, speed: 0.009, size: 0.32, tilt: -0.08 },
  { radius: 6.5, speed: 0.008, size: 0.27, tilt: 0.12 },
  { radius: 7.0, speed: 0.007, size: 0.22, tilt: -0.1 },
  { radius: 7.8, speed: 0.006, size: 0.35, tilt: 0.05 },
  { radius: 8.5, speed: 0.0055, size: 0.30, tilt: -0.12 },
  { radius: 9.3, speed: 0.005, size: 0.38, tilt: 0.08 },
  { radius: 10.0, speed: 0.0045, size: 0.28, tilt: -0.06 },
  { radius: 10.8, speed: 0.004, size: 0.30, tilt: 0.1 },
  { radius: 11.5, speed: 0.0035, size: 0.42, tilt: -0.15 },
];

interface PlanetProps {
  chapter: Chapter;
  orbitIndex: number;
  onClick: (id: number) => void;
}

const Planet = ({ chapter, orbitIndex, onClick }: PlanetProps) => {
  const ref = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const orbit = ORBIT_DATA[orbitIndex];
  const startAngle = (orbitIndex / 12) * Math.PI * 2 + orbitIndex * 0.5;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * TIME_SCALE;
    const angle = startAngle + t * orbit.speed * Math.PI * 2;
    ref.current.position.x = Math.cos(angle) * orbit.radius;
    ref.current.position.z = Math.sin(angle) * orbit.radius;
    ref.current.position.y = Math.sin(angle * 2) * orbit.tilt;

    if (meshRef.current) meshRef.current.rotation.y += 0.001 * TIME_SCALE;
  });

  return (
    <group ref={ref}>
      {/* Planet sphere */}
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(chapter.id); }}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
      >
        <sphereGeometry args={[hovered ? orbit.size * 1.3 : orbit.size, 24, 24]} />
        <meshStandardMaterial
          color={chapter.accentColor}
          emissive={chapter.accentColor}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[orbit.size * 1.5, 16, 16]} />
        <meshStandardMaterial color={chapter.accentColor} transparent opacity={hovered ? 0.15 : 0.05} />
      </mesh>

      {/* Label on hover */}
      {hovered && (
        <Html distanceFactor={12} style={{ pointerEvents: 'none' }}>
          <div className="rounded-lg bg-card-solid border border-border px-3 py-2 shadow-lg text-center whitespace-nowrap">
            <p className="text-xs font-bold text-foreground">{chapter.number} · {chapter.title}</p>
            <p className="text-[10px] text-muted-foreground">{chapter.era}</p>
          </div>
        </Html>
      )}
    </group>
  );
};

interface PlanetsProps {
  chapters: Chapter[];
  onPlanetClick: (id: number) => void;
}

const Planets = ({ chapters, onPlanetClick }: PlanetsProps) => {
  return (
    <group>
      {/* Orbit rings */}
      {ORBIT_DATA.map((orbit, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[orbit.radius - 0.01, orbit.radius + 0.01, 128]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.06} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Planets */}
      {chapters.map((chapter, i) => (
        <Planet key={chapter.id} chapter={chapter} orbitIndex={i} onClick={onPlanetClick} />
      ))}
    </group>
  );
};

export default Planets;
