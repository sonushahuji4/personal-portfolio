'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { Chapter } from '@/types/life-circle';
import Starfield from './starfield';
import Sun from './sun';
import Planets from './planets';
import Comets from './comets';
import AsteroidBelt from './asteroid-belt';
import Nebulae from './nebulae';

interface SolarSystemSceneProps {
  chapters: Chapter[];
  onPlanetClick: (id: number) => void;
}

const SolarSystemScene = ({ chapters, onPlanetClick }: SolarSystemSceneProps) => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-border/30" style={{ height: '75vh', minHeight: 560 }}>
      {/* Loading fallback */}
      <div className="absolute inset-0 flex items-center justify-center bg-[#050508] z-0">
        <div className="text-center">
          <div className="h-8 w-8 mx-auto rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
          <p className="mt-3 text-xs text-muted-foreground">Loading universe...</p>
        </div>
      </div>

      <Canvas
        camera={{ position: [0, 20, 28], fov: 55 }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.2;
        }}
        style={{ background: '#050508' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.15} />

          {/* Background */}
          <Starfield count={2500} />
          <Nebulae />

          {/* Solar System */}
          <Sun />
          <Planets chapters={chapters} onPlanetClick={onPlanetClick} />

          {/* Ambient Life */}
          <Comets count={2} />
          <AsteroidBelt count={35} />

          {/* Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={60}
            zoomSpeed={0.6}
            enableDamping
            dampingFactor={0.08}
            autoRotate
            autoRotateSpeed={0.4}
            rotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SolarSystemScene;
