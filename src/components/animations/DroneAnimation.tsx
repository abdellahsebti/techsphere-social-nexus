import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Effects } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { useMotionValue, useTransform } from 'framer-motion';
import { Group, Mesh, PointLight } from 'three';

interface PropellerProps {
  position: [number, number, number];
}

function Propeller({ position }: PropellerProps) {
  const rotation = useMotionValue(0);

  useFrame((state) => {
    rotation.set(rotation.get() + 0.3);
  });

  return (
    <motion.mesh
      position={position}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      rotation-y={rotation}
    >
      <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
      <meshStandardMaterial color="#818cf8" />
      <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.4, 0.05, 0.02]} />
        <meshStandardMaterial color="#818cf8" />
      </mesh>
      <mesh position={[-0.2, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.4, 0.05, 0.02]} />
        <meshStandardMaterial color="#818cf8" />
      </mesh>
      <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 4, 0, 0]}>
        <boxGeometry args={[0.02, 0.05, 0.4]} />
        <meshStandardMaterial color="#818cf8" />
      </mesh>
      <mesh position={[0, 0, -0.2]} rotation={[-Math.PI / 4, 0, 0]}>
        <boxGeometry args={[0.02, 0.05, 0.4]} />
        <meshStandardMaterial color="#818cf8" />
      </mesh>
    </motion.mesh>
  );
}

function Drone() {
  const y = useMotionValue(0);
  const rotationY = useMotionValue(0);
  const glowRef = useRef<PointLight>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    y.set(Math.sin(time * 1.5) * 0.05);
    rotationY.set(Math.sin(time * 0.3) * 0.1);
    
    if (glowRef.current) {
      glowRef.current.intensity = 1 + Math.sin(time * 2) * 0.1;
    }
  });

  return (
    <motion.group
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
      position-y={y}
      rotation-y={rotationY}
    >
      {/* Drone body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.2, 1]} />
        <meshStandardMaterial
          color="#4f46e5"
          metalness={0.8}
          roughness={0.2}
          emissive="#4f46e5"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Propellers */}
      <Propeller position={[1, 0, 1]} />
      <Propeller position={[-1, 0, 1]} />
      <Propeller position={[1, 0, -1]} />
      <Propeller position={[-1, 0, -1]} />

      {/* Arms */}
      <mesh position={[0.5, 0, 0]}>
        <boxGeometry args={[1, 0.1, 0.1]} />
        <meshStandardMaterial
          color="#6366f1"
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[-0.5, 0, 0]}>
        <boxGeometry args={[1, 0.1, 0.1]} />
        <meshStandardMaterial
          color="#6366f1"
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, 0, 0.5]}>
        <boxGeometry args={[0.1, 0.1, 1]} />
        <meshStandardMaterial
          color="#6366f1"
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, 0, -0.5]}>
        <boxGeometry args={[0.1, 0.1, 1]} />
        <meshStandardMaterial
          color="#6366f1"
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* LED lights */}
      <pointLight
        ref={glowRef}
        position={[0, 0.2, 0]}
        color="#4f46e5"
        intensity={1}
        distance={3}
      />
    </motion.group>
  );
}

export default function DroneAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [3, 2, 5], fov: 75 }}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      >
        <color attach="background" args={['transparent']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Drone />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
          enableDamping
          dampingFactor={0.05}
        />
        <Effects>
          <motion.group
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <mesh scale={[100, 100, 1]} position={[0, 0, -50]}>
              <planeGeometry />
              <meshBasicMaterial
                color="#000000"
                transparent
                opacity={0.1}
              />
            </mesh>
          </motion.group>
        </Effects>
      </Canvas>
    </div>
  );
} 