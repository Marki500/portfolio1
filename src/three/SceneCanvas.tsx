import { MutableRefObject, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

import { TechPlanet } from './TechPlanet';
import { Particles } from './Particles';
import { useMotionContext } from '../components/motion-context';

const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (error) {
    return false;
  }
};

type SceneContentProps = {
  rotationRef: MutableRefObject<{ x: number; y: number }>;
};

const SceneContent = ({ rotationRef }: SceneContentProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { reduceMotion } = useMotionContext();

  useEffect(() => {
    if (!reduceMotion || !groupRef.current) return;
    groupRef.current.rotation.set(0, 0, 0);
  }, [reduceMotion]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rotationRef.current.y, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotationRef.current.x, 0.05);
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#9800cb" />
      <pointLight position={[-4, -2, -4]} intensity={0.9} color="#00d4ff" />
      <Particles />
      <TechPlanet />
    </group>
  );
};

export const SceneCanvas = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rotationRef = useRef({ x: 0, y: 0 });
  const { reduceMotion } = useMotionContext();
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setWebgl(isWebGLAvailable());
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      rotationRef.current = { x: 0, y: 0 };
    }
  }, [reduceMotion]);

  useEffect(() => {
    if (!containerRef.current || reduceMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.6;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -0.4;
      rotationRef.current = { x, y };
    };

    const handleLeave = () => {
      rotationRef.current = { x: 0, y: 0 };
    };

    containerRef.current.addEventListener('pointermove', handlePointerMove);
    containerRef.current.addEventListener('pointerleave', handleLeave);

    return () => {
      containerRef.current?.removeEventListener('pointermove', handlePointerMove);
      containerRef.current?.removeEventListener('pointerleave', handleLeave);
    };
  }, [reduceMotion]);

  const fallback = useMemo(
    () => (
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_30%_20%,rgba(152,0,203,0.3),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(0,212,255,0.35),transparent_60%)]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'400\\' height=\\'400\\' viewBox=\\'0 0 400 400\\' fill=\\'none\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg opacity=\\'0.25\\'%3E%3Ccircle cx=\\'200\\' cy=\\'200\\' r=\\'120\\' stroke=\\'%239800cb\\' stroke-width=\\'1.5\\' stroke-dasharray=\\'4 8\\'/%3E%3Ccircle cx=\\'200\\' cy=\\'200\\' r=\\'170\\' stroke=\\'%2300d4ff\\' stroke-width=\\'1.5\\' stroke-dasharray=\\'4 12\\'/%3E%3C/g%3E%3C/svg%3E')] opacity-70" />
        </div>
        <div className="glass relative z-10 mx-auto max-w-xs rounded-3xl border border-white/20 p-6 text-center">
          <p className="text-sm text-white/70">
            Vista estática mostrada por compatibilidad. Activa WebGL para disfrutar de la experiencia 3D completa.
          </p>
        </div>
      </div>
    ),
    []
  );

  return (
    <div ref={containerRef} className="relative h-[520px] w-full md:h-[620px]">
      {webgl ? (
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 1.8]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <SceneContent rotationRef={rotationRef} />
            <EffectComposer multisampling={0}>
              <Bloom
                intensity={1.2}
                luminanceThreshold={0.1}
                luminanceSmoothing={0.9}
              />
              <ChromaticAberration offset={[0.0009, 0.0012]} blendFunction={BlendFunction.ADD} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      ) : (
        fallback
      )}
    </div>
  );
};
