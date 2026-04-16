'use client';

import { Suspense, useState, useCallback } from 'react';
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
  const [isInteractive, setIsInteractive] = useState(false);

  const handleCanvasClick = useCallback(() => {
    if (!isInteractive) setIsInteractive(true);
  }, [isInteractive]);

  return (
    <div className="relative w-full" style={{ height: '70vh', minHeight: 500 }}>
      {/* Click to explore overlay */}
      {!isInteractive && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
          onClick={handleCanvasClick}
        >
          <div className="rounded-full border border-accent/30 bg-background/80 backdrop-blur-sm px-6 py-3 text-sm font-medium text-accent">
            Click to explore the universe
          </div>
        </div>
      )}

      <Canvas
        camera={{ position: [0, 15, 35], fov: 50 }}
        dpr={[1, 2]}
        onClick={handleCanvasClick}
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
            enableZoom={isInteractive}
            enableRotate={isInteractive}
            minDistance={5}
            maxDistance={60}
            zoomSpeed={0.6}
            enableDamping
            dampingFactor={0.08}
            autoRotate
            autoRotateSpeed={0.08}
            rotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SolarSystemScene;
