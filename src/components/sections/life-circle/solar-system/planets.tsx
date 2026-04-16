'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Chapter } from '@/types/life-circle';
import { TIME_SCALE } from './time-scale';

// Realistic solar system planet visuals
const PLANET_VISUALS = [
  { color: '#C4A882', emissive: '#8B7355', ring: false },  // Mercury — warm rock
  { color: '#4CAF50', emissive: '#2E7D32', ring: false },  // Venus — green
  { color: '#4A90D9', emissive: '#2E6EB0', ring: false },  // Earth — blue
  { color: '#00BCD4', emissive: '#0097A7', ring: false },  // Mars — cyan neon
  { color: '#FFC107', emissive: '#FF8F00', ring: false },  // Ceres — yellow
  { color: '#78909C', emissive: '#546E7A', ring: false },  // Asteroid — gray
  { color: '#E89547', emissive: '#BF6D2E', ring: false },  // Jupiter — amber (big)
  { color: '#FF5722', emissive: '#D84315', ring: true },   // Saturn — with ring
  { color: '#FFB300', emissive: '#FF8F00', ring: false },  // Sun-child — gold
  { color: '#3A4A7A', emissive: '#283560', ring: false },  // Neptune — deep blue
  { color: '#D7CCC8', emissive: '#A1887F', ring: false },  // Pluto — warm cream
  { color: '#B388FF', emissive: '#7C4DFF', ring: true },   // Unknown — shimmer + ring
];

const ORBIT_DATA = [
  { radius: 3.5, speed: 0.014, size: 0.22, tilt: 0.1 },
  { radius: 4.2, speed: 0.012, size: 0.25, tilt: -0.05 },
  { radius: 5.0, speed: 0.010, size: 0.28, tilt: 0.15 },
  { radius: 5.8, speed: 0.009, size: 0.30, tilt: -0.08 },
  { radius: 6.5, speed: 0.008, size: 0.24, tilt: 0.12 },
  { radius: 7.0, speed: 0.007, size: 0.20, tilt: -0.1 },
  { radius: 7.8, speed: 0.006, size: 0.38, tilt: 0.05 },   // Jupiter — big
  { radius: 8.5, speed: 0.0055, size: 0.34, tilt: -0.12 },  // Saturn — ring
  { radius: 9.3, speed: 0.005, size: 0.36, tilt: 0.08 },
  { radius: 10.0, speed: 0.0045, size: 0.26, tilt: -0.06 },
  { radius: 10.8, speed: 0.004, size: 0.28, tilt: 0.1 },
  { radius: 11.5, speed: 0.0035, size: 0.40, tilt: -0.15 }, // Unknown — largest
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
  const visual = PLANET_VISUALS[orbitIndex];
  const startAngle = (orbitIndex / 12) * Math.PI * 2 + orbitIndex * 0.5;

  // Extract year from era
  const yearMatch = chapter.era.match(/(\d{4})/);
  const year = yearMatch ? yearMatch[1] : '';

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * TIME_SCALE;
    const angle = startAngle + t * orbit.speed * Math.PI * 2;
    ref.current.position.x = Math.cos(angle) * orbit.radius;
    ref.current.position.z = Math.sin(angle) * orbit.radius;
    ref.current.position.y = Math.sin(angle * 2) * orbit.tilt;

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002 * TIME_SCALE;
      const targetScale = hovered ? 1.4 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
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
        <sphereGeometry args={[orbit.size, 32, 32]} />
        <meshStandardMaterial
          color={visual.color}
          emissive={visual.emissive}
          emissiveIntensity={hovered ? 0.8 : 0.35}
          roughness={0.5}
          metalness={0.15}
        />
      </mesh>

      {/* Ring for Saturn-like planets */}
      {visual.ring && (
        <mesh rotation={[-Math.PI / 3, 0, 0]}>
          <ringGeometry args={[orbit.size * 1.4, orbit.size * 2, 32]} />
          <meshStandardMaterial color={visual.color} transparent opacity={0.25} side={THREE.DoubleSide} emissive={visual.emissive} emissiveIntensity={0.15} />
        </mesh>
      )}

      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[orbit.size * 1.6, 16, 16]} />
        <meshStandardMaterial color={visual.color} transparent opacity={hovered ? 0.12 : 0.04} />
      </mesh>

      {/* Always-visible label: chapter number + year */}
      <Html distanceFactor={15} style={{ pointerEvents: 'none' }} position={[0, orbit.size + 0.5, 0]}>
        <div className="text-center whitespace-nowrap select-none">
          <p className="text-[9px] font-bold" style={{ color: visual.color }}>{chapter.number}</p>
          {year && <p className="text-[7px]" style={{ color: visual.color, opacity: 0.6 }}>{year}</p>}
        </div>
      </Html>

      {/* Hover tooltip */}
      {hovered && (
        <Html distanceFactor={12} style={{ pointerEvents: 'none' }} position={[0, orbit.size + 1.3, 0]}>
          <div className="rounded-lg bg-card-solid border border-border px-3 py-2 shadow-xl text-center whitespace-nowrap">
            <p className="text-xs font-bold text-foreground">{chapter.title}</p>
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
          <ringGeometry args={[orbit.radius - 0.015, orbit.radius + 0.015, 128]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={THREE.DoubleSide} />
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
