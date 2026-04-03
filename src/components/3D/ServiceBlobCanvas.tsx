import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ServiceBlob({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
  });
  return (
    <Float speed={1.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1.2, 48, 48]}>
        <MeshDistortMaterial color={color} distort={0.4} speed={2} roughness={0.1} metalness={0.7} />
      </Sphere>
    </Float>
  );
}

export default function ServiceBlobCanvas({ color }: { color: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 60 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color={color} />
      <ServiceBlob color={color} />
    </Canvas>
  );
}
