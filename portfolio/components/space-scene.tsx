"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, Float, Text3D, Environment } from "@react-three/drei"
import type * as THREE from "three"
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities"

function FloatingAsteroid({
  position,
  size = 1,
  speed = 1,
}: { position: [number, number, number]; size?: number; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed
      meshRef.current.rotation.y += 0.01 * speed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <dodecahedronGeometry args={[size]} />
        <meshStandardMaterial
          color="#059669"
          roughness={0.7}
          metalness={0.3}
          emissive="#059669"
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  )
}

function SpacePlanet({
  position,
  size = 2,
  color = "#059669",
  isMobile = false,
}: { position: [number, number, number]; size?: number; color?: string; isMobile?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  // Reduce geometry complexity on mobile
  const segments = isMobile ? 16 : 32

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, segments, segments]} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.2} emissive={color} emissiveIntensity={0.05} />
      </mesh>
    </Float>
  )
}

function SpaceRing({ position, radius = 3 }: { position: [number, number, number]; radius?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.01
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.1, 8, 32]} />
      <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.2} transparent opacity={0.7} />
    </mesh>
  )
}

export function SpaceScene({ scrollY }: { scrollY: number }) {
  const capabilities = useDeviceCapabilities()
  
  const asteroids = useMemo(
    () => {
      // Reduce number of asteroids on mobile
      const baseAsteroids = [
        { position: [-8, 2, -5] as [number, number, number], size: 0.8, speed: 1.2 },
        { position: [6, -3, -8] as [number, number, number], size: 1.2, speed: 0.8 },
        { position: [-4, 5, -12] as [number, number, number], size: 0.6, speed: 1.5 },
        { position: [10, 1, -6] as [number, number, number], size: 1.0, speed: 1.0 },
        { position: [-12, -2, -10] as [number, number, number], size: 0.9, speed: 1.3 },
      ]
      return capabilities.isMobile ? baseAsteroids.slice(0, 3) : baseAsteroids
    },
    [capabilities.isMobile],
  )

  // Reduce star count on mobile
  const starCount = capabilities.isMobile ? 2000 : capabilities.isLowEnd ? 3000 : 5000

  // Don't render 3D scene if user prefers reduced motion
  if (capabilities.prefersReducedMotion) {
    return null
  }

  return (
    <Canvas 
      camera={{ position: [0, 0, 10], fov: 60 }}
      dpr={capabilities.isMobile ? 1 : Math.min(capabilities.devicePixelRatio, 2)}
      performance={{ min: 0.5 }}
      gl={{
        antialias: !capabilities.isLowEnd,
        powerPreference: capabilities.isMobile ? "low-power" : "high-performance",
      }}
    >
      {!capabilities.isLowEnd && <Environment preset="night" />}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#10b981" castShadow={false} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#059669" castShadow={false} />

      <Stars radius={100} depth={50} count={starCount} factor={4} saturation={0} fade speed={1} />

      <group position={[0, 0, scrollY * -0.01]}>
        {asteroids.map((asteroid, index) => (
          <FloatingAsteroid key={index} position={asteroid.position} size={asteroid.size} speed={asteroid.speed} />
        ))}

        <SpacePlanet position={[15, -8, -20]} size={3} color="#059669" isMobile={capabilities.isMobile} />
        <SpacePlanet position={[-18, 10, -25]} size={2.5} color="#10b981" isMobile={capabilities.isMobile} />
        <SpacePlanet position={[12, 15, -30]} size={1.8} color="#047857" isMobile={capabilities.isMobile} />

        <SpaceRing position={[15, -8, -20]} radius={4} />
        <SpaceRing position={[-18, 10, -25]} radius={3.5} />

        {/* Only render 3D text on desktop for performance */}
        {!capabilities.isMobile && (
          <Float speed={0.3} rotationIntensity={0.1} floatIntensity={0.2}>
            <Text3D font="/fonts/Geist_Bold.json" size={1.5} height={0.2} position={[-6, 8, -15]} rotation={[0, 0.3, 0]}>
              PORTFOLIO
              <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.3} />
            </Text3D>
          </Float>
        )}
      </group>
    </Canvas>
  )
}
