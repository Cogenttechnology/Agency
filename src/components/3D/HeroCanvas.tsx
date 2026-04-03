import { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import './HeroCanvas.css';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <Sphere ref={meshRef} args={[1.8, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#6c63ff"
          attach="material"
          distort={0.45}
          speed={3}
          roughness={0.1}
          metalness={0.8}
          emissive="#3a35aa"
          emissiveIntensity={0.3}
        />
      </Sphere>
    </Float>
  );
}

function FloatingTorus() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.3;
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.2;
    ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.2;
  });
  return (
    <mesh ref={ref} position={[3.5, 1, -1]}>
      <torusGeometry args={[0.6, 0.2, 16, 60]} />
      <meshStandardMaterial
        color="#ff6b6b"
        roughness={0.2}
        metalness={0.8}
        emissive="#cc3333"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function FloatingCube() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.4;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.6 + 1) * 0.3;
  });
  return (
    <mesh ref={ref} position={[-3.5, -1, -0.5]}>
      <boxGeometry args={[0.7, 0.7, 0.7]} />
      <meshStandardMaterial
        color="#00d4aa"
        roughness={0.15}
        metalness={0.9}
        emissive="#008866"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

export default function HeroCanvas() {
  const [mounted, setMounted] = useState(false);
  // Cap DPR: mobile gets 1, desktop capped at 1.5 — reduces GPU fill rate significantly
  const dpr: [number, number] = typeof window !== 'undefined' && window.innerWidth < 768
    ? [1, 1]
    : [1, 1.5];
  // Fewer stars on mobile — 3000 particles is heavy on low-end GPUs
  const starCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 800 : 2000;

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="hero-canvas" />;

  return (
    <div className="hero-canvas">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={dpr}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#6c63ff" />
        <pointLight position={[5, -3, 2]} intensity={0.6} color="#ff6b6b" />

        <Stars radius={80} depth={50} count={starCount} factor={3} saturation={0.5} fade />

        <AnimatedSphere />
        <FloatingTorus />
        <FloatingCube />
      </Canvas>
    </div>
  );
}
