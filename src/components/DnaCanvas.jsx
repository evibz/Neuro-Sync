import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Helix = () => {
  const group = useRef();

  useFrame(() => {
    group.current.rotation.y += 0.005;
  });

  const strands = [];
  const rungs = [];

  for (let i = 0; i < 80; i++) {
    const t = i * 0.2;
    const y = i * 0.15;
    const x1 = Math.sin(t) * 1.2;
    const z1 = Math.cos(t) * 1.2;
    const x2 = Math.sin(t + Math.PI) * 1.2;
    const z2 = Math.cos(t + Math.PI) * 1.2;

    strands.push(
      <mesh key={`s1-${i}`} position={[x1, y, z1]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.5} />
      </mesh>,
      <mesh key={`s2-${i}`} position={[x2, y, z2]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={0.5} />
      </mesh>
    );

    if (i % 4 === 0) {
      rungs.push(
        <mesh key={`r-${i}`} position={[0, y, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 2.4, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
        </mesh>
      );
    }
  }

  return <group ref={group}>{[...strands, ...rungs]}</group>;
};

const DnaCanvas = () => {
  return (
    <Canvas camera={{ position: [0, 5, 8], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={0.8} />
      <Helix />
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
};

export default DnaCanvas;