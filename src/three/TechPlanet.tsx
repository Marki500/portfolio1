import { useEffect, useMemo, useRef, useState } from 'react';
import { shaderMaterial, Html } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

import { useMotionContext } from '../components/motion-context';

gsap.registerPlugin(MotionPathPlugin);

const PlanetMaterial = shaderMaterial(
  {
    time: 0,
    color1: new THREE.Color('#0f172a'),
    color2: new THREE.Color('#1e1b4b'),
    emissiveColor: new THREE.Color('#9800cb')
  },
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
  }
`,
  `
  varying vec2 vUv;
  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 emissiveColor;

  float grid(vec2 uv) {
    float line = smoothstep(0.48, 0.5, abs(fract(uv.x * 18.0) - 0.5));
    line += smoothstep(0.48, 0.5, abs(fract(uv.y * 18.0) - 0.5));
    return clamp(line, 0.0, 1.0);
  }

  void main() {
    vec2 uv = vUv;
    float blend = smoothstep(0.0, 1.0, uv.y);
    vec3 base = mix(color1, color2, blend);

    float glow = grid(uv + time * 0.03);
    vec3 emissive = emissiveColor * glow;

    vec3 color = base + emissive * 1.5;
    gl_FragColor = vec4(color, 0.92);
  }
`
);

extend({ PlanetMaterial });

type PlanetMaterialImpl = THREE.ShaderMaterial & {
  uniforms: {
    time: { value: number };
  };
};

type OrbitTag = {
  label: string;
  color: string;
  href: string;
};

const orbitTags: OrbitTag[] = [
  { label: 'React', color: '#61dafb', href: '#portfolio' },
  { label: 'WordPress', color: '#21759b', href: '#services' },
  { label: 'Node', color: '#44883e', href: '#services' },
  { label: 'Docker', color: '#2496ed', href: '#services' },
  { label: 'Tailwind', color: '#38bdf8', href: '#portfolio' },
  { label: 'Cloudflare', color: '#f38020', href: '#services' }
];

export const TechPlanet = () => {
  const planetMaterial = useRef<PlanetMaterialImpl | null>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const orbitGroupRef = useRef<THREE.Group>(null);
  const satelliteRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const { reduceMotion } = useMotionContext();

  useFrame((_, delta) => {
    if (planetMaterial.current) {
      planetMaterial.current.uniforms.time.value += delta;
    }

    if (!reduceMotion && planetRef.current) {
      planetRef.current.rotation.y += delta * 0.15;
      planetRef.current.rotation.x += delta * 0.05;
    }
  });

  useEffect(() => {
    if (!satelliteRef.current || reduceMotion) return;

    const path = [
      { x: 2.6, y: 0.1, z: 0 },
      { x: 1.4, y: 0.6, z: 2.2 },
      { x: -0.4, y: 0.1, z: 2.8 },
      { x: -2.4, y: -0.4, z: 0.6 },
      { x: -1.2, y: 0.5, z: -2.4 },
      { x: 1.8, y: -0.2, z: -2.2 }
    ];

    const animation = gsap.to(satelliteRef.current.position, {
      duration: 16,
      repeat: -1,
      ease: 'none',
      motionPath: {
        path,
        curviness: 1.25,
        autoRotate: false
      }
    });

    return () => {
      animation.kill();
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!orbitGroupRef.current || reduceMotion) return;

    const rotations = gsap.to(orbitGroupRef.current.rotation, {
      y: `+=${Math.PI * 2}`,
      duration: 20,
      repeat: -1,
      ease: 'none'
    });

    return () => {
      rotations.kill();
    };
  }, [reduceMotion]);

  const orbitPaths = useMemo(() => {
    return orbitTags.map((tag, index) => {
      const angle = (index / orbitTags.length) * Math.PI * 2;
      const radius = 2 + (index % 2 === 0 ? 0.2 : -0.2);
      return {
        ...tag,
        position: new THREE.Vector3(Math.cos(angle) * radius, (index % 2) * 0.3, Math.sin(angle) * radius)
      };
    });
  }, []);

  useEffect(() => {
    if (reduceMotion || !orbitGroupRef.current) return;

    const ctx = gsap.context(() => {
      orbitGroupRef.current?.children.forEach((child, index) => {
        if (!(child instanceof THREE.Group)) return;
        const speed = 12 + index * 1.5;

        gsap.to(child.rotation, {
          y: `+=${Math.PI * 2}`,
          duration: speed,
          repeat: -1,
          ease: 'none'
        });
      });
    }, orbitGroupRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  const handleClick = (href: string) => {
    if (typeof window === 'undefined') return;
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = href;
    }
  };

  return (
    <group>
      <group ref={planetRef}>
        <mesh>
          <sphereGeometry args={[1.65, 128, 128]} />
          {/* @ts-ignore - registered above */}
          <planetMaterial ref={planetMaterial} transparent />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.68, 64, 64]} />
          <meshStandardMaterial
            color="#111827"
            emissive="#9800cb"
            emissiveIntensity={0.25}
            metalness={0.4}
            roughness={0.45}
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
      </group>

      <group ref={orbitGroupRef}>
        {orbitPaths.map((tag, index) => (
          <group key={tag.label} rotation={[0.6 + index * 0.1, 0.2 * index, 0]}>
            <mesh>
              <torusGeometry args={[2.2 + index * 0.15, 0.01, 16, 200]} />
              <meshBasicMaterial color="white" transparent opacity={0.25} />
            </mesh>
          </group>
        ))}

        {orbitPaths.map((tag) => (
          <group key={tag.label} position={tag.position}>
            <mesh
              onPointerOver={(event) => {
                event.stopPropagation();
                setHovered(tag.label);
              }}
              onPointerOut={(event) => {
                event.stopPropagation();
                setHovered((prev) => (prev === tag.label ? null : prev));
              }}
              onClick={(event) => {
                event.stopPropagation();
                handleClick(tag.href);
              }}
            >
              <sphereGeometry args={[0.12, 32, 32]} />
              <meshStandardMaterial
                color={tag.color}
                emissive={tag.color}
                emissiveIntensity={hovered === tag.label ? 2.5 : 1}
              />
            </mesh>
            <Html distanceFactor={10} position={[0.2, 0.2, 0]} center>
              <div
                className={`glass whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold transition-opacity duration-300 ${
                  hovered === tag.label ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {tag.label}
              </div>
            </Html>
          </group>
        ))}
      </group>

      <mesh ref={satelliteRef}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1.6} />
      </mesh>
    </group>
  );
};
