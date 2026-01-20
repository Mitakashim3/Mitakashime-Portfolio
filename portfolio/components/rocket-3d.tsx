"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Center, Environment } from "@react-three/drei"
import * as THREE from "three"

type RocketModelProps = {
  isHovered: boolean
  isLaunching: boolean
}

function RocketModel({ isHovered, isLaunching }: RocketModelProps) {
  const { scene } = useGLTF("/falcon_9_spacex_rocket/scene.gltf")
  const rocketRef = useRef<THREE.Group>(null)
  const startTime = useRef<number | null>(null)
  const hasEntered = useRef(false)
  const launchVelocity = useRef(0)
  
  const clone = useMemo(() => {
    const c = scene.clone()
    // Traverse to fix materials if needed, but Environment usually solves it
    c.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const m = child as THREE.Mesh
        // Shadows off for performance; we rely on environment light.
        m.castShadow = false
        m.receiveShadow = false
      }
    })
    return c
  }, [scene])

  useFrame((state, delta) => {
    if (!rocketRef.current) return

    const time = state.clock.elapsedTime
    if (startTime.current === null) startTime.current = time

    // Entrance from above using smooth step
    if (!hasEntered.current) {
      const progress = Math.min((time - startTime.current) / 1.2, 1)
      const eased = progress * progress * (3 - 2 * progress) // smoothstep
      const startY = 10 // Start from top
      const endY = 0
      rocketRef.current.position.y = THREE.MathUtils.lerp(startY, endY, eased)
      rocketRef.current.rotation.y += delta * 0.5
      if (progress >= 1) {
        hasEntered.current = true
        rocketRef.current.position.y = endY
      }
      return
    }

    // Launch animation: accelerate upward and spin faster
    if (isLaunching) {
      launchVelocity.current = THREE.MathUtils.lerp(launchVelocity.current, 28, delta * 4)
      rocketRef.current.position.y += launchVelocity.current * delta
      rocketRef.current.rotation.y += delta * 8
      return
    } else {
      // Reset launch velocity when not launching
      launchVelocity.current = 0
    }

    // Smooth hover animation (small float range to avoid clipping)
    const targetY = isHovered ? 0.3 : 0
    const targetRotSpeed = isHovered ? 5 : 0.5
    
    // Smoothly interpolate position and rotation speed
    rocketRef.current.position.y = THREE.MathUtils.lerp(rocketRef.current.position.y, targetY, delta * 2)
    rocketRef.current.rotation.y += delta * targetRotSpeed
  })

  return (
    <primitive 
      object={clone} 
      ref={rocketRef} 
      scale={0.005} 
      rotation={[0, 0, 0]}
    />
  )
}

export default function Rocket3D({ isHovered, isLaunching }: { isHovered: boolean; isLaunching: boolean }) {
  return (
    <div className="w-full h-full relative overflow-visible">
      <Canvas 
        camera={{ position: [0, 0, 23], fov: 45 }} 
        gl={{ 
          alpha: true, 
          antialias: false, // Disable for better performance
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }} 
        dpr={1} // Fixed to 1 for better performance
        style={{ overflow: "visible" }}
        performance={{ min: 0.5 }}
        frameloop="demand" // Render only when needed
      >
        <ambientLight intensity={2} />
        <directionalLight position={[2, 5, 2]} intensity={2} castShadow={false} />
        {/* Environment is crucial for the metallic rocket to look real, not white/black */}
        <Environment preset="warehouse" />
        <Center>
          <RocketModel isHovered={isHovered} isLaunching={isLaunching} />
        </Center>
      </Canvas>
    </div>
  )
}

useGLTF.preload("/falcon_9_spacex_rocket/scene.gltf")
