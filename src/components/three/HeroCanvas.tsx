"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

/** Normalised window pointer position (-1..1), tracked globally so the
 *  3D scene reacts even though HTML content sits on top of the canvas. */
function usePointer() {
  const p = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e: MouseEvent) => {
      p.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      p.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return p;
}

function Satellites() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (group.current) group.current.rotation.y += d * 0.6;
  });
  const items = useMemo(
    () => [
      { r: 2.7, y: 0.4, color: "#22d3ee", size: 0.11 },
      { r: 3.1, y: -0.6, color: "#f472b6", size: 0.08 },
      { r: 2.4, y: 1.1, color: "#fbbf24", size: 0.07 },
    ],
    []
  );
  return (
    <group ref={group}>
      {items.map((s, i) => {
        const a = (i / items.length) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * s.r, s.y, Math.sin(a) * s.r]}>
            <sphereGeometry args={[s.size, 24, 24]} />
            <meshStandardMaterial color={s.color} emissive={s.color} emissiveIntensity={2} />
          </mesh>
        );
      })}
    </group>
  );
}

function Scene() {
  const pointer = usePointer();
  const rig = useRef<THREE.Group>(null);
  const orb = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const offsetX = viewport.width > 8 ? 2.5 : 0;

  useFrame((_, d) => {
    if (rig.current) {
      rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, pointer.current.x * 0.5, 0.05);
      rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, -pointer.current.y * 0.35, 0.05);
      rig.current.position.x = THREE.MathUtils.lerp(rig.current.position.x, offsetX, 0.06);
    }
    if (orb.current) orb.current.rotation.y += d * 0.25;
    if (shell.current) {
      shell.current.rotation.y -= d * 0.15;
      shell.current.rotation.x += d * 0.1;
    }
    if (ring.current) ring.current.rotation.z += d * 0.3;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2.6} color="#22d3ee" />
      <directionalLight position={[-5, -3, 2]} intensity={2.2} color="#a78bfa" />
      <pointLight position={[0, 0, 4]} intensity={20} color="#f472b6" />

      <group ref={rig}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1.1}>
          <mesh ref={orb}>
            <sphereGeometry args={[1.45, 96, 96]} />
            <MeshDistortMaterial
              color="#6d54f5"
              distort={0.45}
              speed={2}
              roughness={0.12}
              metalness={0.85}
            />
          </mesh>
          <mesh ref={shell}>
            <icosahedronGeometry args={[2, 1]} />
            <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.28} />
          </mesh>
          <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
            <torusGeometry args={[2.65, 0.014, 16, 220]} />
            <meshBasicMaterial color="#f472b6" transparent opacity={0.7} />
          </mesh>
          <Satellites />
        </Float>
      </group>

      <Stars radius={30} depth={40} count={2200} factor={3.2} saturation={0} fade speed={1} />
    </>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <Scene />
    </Canvas>
  );
}
