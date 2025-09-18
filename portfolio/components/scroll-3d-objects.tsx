"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import type * as THREE from "three"

function ScrollReactiveObject({
  position,
  scrollY,
  scrollMultiplier = 1,
  rotationSpeed = 1,
}: {
  position: [number, number, number]
  scrollY: number
  scrollMultiplier?: number
  rotationSpeed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005 * rotationSpeed
      meshRef.current.rotation.y += 0.005 * rotationSpeed
      meshRef.current.position.y = position[1] + scrollY * scrollMultiplier * 0.0005
      meshRef.current.position.x = position[0] + Math.sin(scrollY * 0.0005) * 1
    }
  })

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.8]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#059669"
          emissiveIntensity={0.1}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  )
}

function SpaceDebris({ position, scrollY }: { position: [number, number, number]; scrollY: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.z += 0.005
      meshRef.current.position.z = position[2] + scrollY * 0.002
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <tetrahedronGeometry args={[0.3]} />
      <meshStandardMaterial color="#047857" emissive="#059669" emissiveIntensity={0.05} transparent opacity={0.4} />
    </mesh>
  )
}

export function ScrollReactive3DObjects({ scrollY }: { scrollY: number }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#10b981" />

        <ScrollReactiveObject position={[6, 1, -1]} scrollY={scrollY} scrollMultiplier={-0.5} rotationSpeed={1} />
        <ScrollReactiveObject position={[-5, -2, -2]} scrollY={scrollY} scrollMultiplier={0.8} rotationSpeed={0.6} />

        {[...Array(6)].map((_, i) => (
          <SpaceDebris
            key={i}
            position={[(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 8]}
            scrollY={scrollY}
          />
        ))}
      </Canvas>
    </div>
  )
}
