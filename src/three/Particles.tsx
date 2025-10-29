import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { useMotionContext } from '../components/motion-context';

const PARTICLE_COUNT = 600;

export const Particles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { reduceMotion } = useMotionContext();

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const radius = 5 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.cos(phi) * 0.6;
      arr[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current || reduceMotion) return;
    const positionsAttribute = pointsRef.current.geometry.getAttribute('position');
    const array = positionsAttribute.array as Float32Array;

    for (let i = 0; i < array.length; i += 3) {
      array[i] += (Math.random() - 0.5) * 0.002;
      array[i + 1] += (Math.random() - 0.5) * 0.002;
      array[i + 2] += (Math.random() - 0.5) * 0.002;
    }

    positionsAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        sizeAttenuation
        color="#b388ff"
        transparent
        opacity={0.8}
      />
    </points>
  );
};
