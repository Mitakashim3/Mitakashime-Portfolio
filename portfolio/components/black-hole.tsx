"use client"

import { Suspense, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment } from "@react-three/drei"
import * as THREE from "three"
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities"

function RotatingModel({ src, isMobile, isLowEnd }: { src: string; isMobile: boolean; isLowEnd: boolean }) {
  const gltf = useGLTF(src, true)
  
  // Debug logging
  useEffect(() => {
    console.log('GLTF loaded:', gltf)
    if (gltf?.scene) {
      console.log('GLTF scene:', gltf.scene)
      console.log('GLTF scene children:', gltf.scene.children)
    }
  }, [gltf])
  
  // Set initial rotation and ensure proper grouping
  useEffect(() => {
    if (gltf?.scene) {
      // Reset all transformations first
      gltf.scene.rotation.set(0, 0, 0)
      gltf.scene.scale.set(1, 1, 1)
      gltf.scene.position.set(0, 0, 0)
      
      // Apply initial rotation to view from the side/edge (like in the reference image)
      gltf.scene.rotation.set(Math.PI / 2, 0, 0)
      
      // Ensure all children are properly positioned relative to parent
      gltf.scene.traverse((child: any) => {
        if (child.isMesh) {
          child.updateMatrixWorld()
        }
      })
    }
  }, [gltf])

  // Rotate slowly around the Z axis for edge-on view (reduce rotation speed on low-end devices)
  useFrame((state, delta) => {
    if (gltf?.scene) {
      const rotationSpeed = isLowEnd ? 0.05 : 0.1
      gltf.scene.rotation.z += delta * rotationSpeed
    }
  })
  
  // Fix materials and ensure proper rendering with mobile optimizations
  useEffect(() => {
    if (!gltf || !gltf.scene) return
    
    gltf.scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material]
        mats.forEach((mat: any) => {
          // Optimize textures for mobile
          if (isMobile || isLowEnd) {
            if (mat.map) {
              mat.map.minFilter = THREE.LinearFilter
              mat.map.generateMipmaps = false
            }
            if (mat.emissiveMap) {
              mat.emissiveMap.minFilter = THREE.LinearFilter
              mat.emissiveMap.generateMipmaps = false
            }
          }

          // Ensure material is properly configured
          if (mat.map) {
            mat.map.needsUpdate = true
          }
          if (mat.emissiveMap) {
            mat.emissiveMap.needsUpdate = true
          }
          
          // Boost emissive properties for glowing effect (reduce on mobile)
          if (mat.name && /ring|emissive|disk/i.test(mat.name.toLowerCase())) {
            mat.emissive = new THREE.Color(1, 0.8, 0.4)
            mat.emissiveIntensity = isMobile ? 1.0 : 2.0
            mat.needsUpdate = true
          }
          
          // Ensure proper transparency and blending
          if (mat.transparent) {
            mat.depthWrite = false
            mat.blending = THREE.AdditiveBlending
          }
        })
      }
      
      // Disable shadows on mobile for better performance
      if (child.isMesh && (isMobile || isLowEnd)) {
        child.castShadow = false
        child.receiveShadow = false
      }
    })
  }, [gltf, isMobile, isLowEnd])
  
  if (!gltf?.scene) {
    console.error('Failed to load GLTF model')
    return null
  }
  
  return <primitive object={gltf.scene} dispose={null} />
}

export function BlackHole({ zoom = 60 }: { zoom?: number }) {
  const capabilities = useDeviceCapabilities()
  const [shouldRender, setShouldRender] = useState(true) // Changed to true for immediate render
  const [hasError, setHasError] = useState(false)

  // Check if we're in browser environment
  const isBrowser = typeof window !== 'undefined'

  // Don't render on server side
  if (!isBrowser) {
    return null
  }

  // Fallback UI for reduced motion preference
  if (capabilities.prefersReducedMotion) {
    return (
      <div className="w-full h-full overflow-hidden bg-transparent flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-linear-to-br from-orange-500 to-black animate-pulse" />
          <p className="mt-4 text-xs sm:text-sm text-muted-foreground">Black Hole Visualization</p>
        </div>
      </div>
    )
  }

  // Error fallback
  if (hasError) {
    return (
      <div className="w-full h-full overflow-hidden bg-transparent flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full bg-linear-to-br from-orange-500 via-yellow-600 to-black" />
          <p className="mt-4 text-xs sm:text-sm text-muted-foreground">Black Hole</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full overflow-hidden bg-transparent min-h-[300px] sm:min-h-[400px]"> 
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ 
          position: capabilities.isMobile ? [0, 0, 4] : [0, 0, 5], 
          fov: capabilities.isMobile ? 50 : 45 
        }}
        dpr={capabilities.isMobile ? 1 : Math.min(capabilities.devicePixelRatio, 2)}
        performance={{ min: 0.5 }}
        gl={{
          antialias: !capabilities.isLowEnd,
          powerPreference: capabilities.isMobile ? "low-power" : "high-performance",
        }}
        onCreated={(state) => {
          try {
            const glAny = state.gl as any
            const threeAny = THREE as any
            glAny.toneMapping = threeAny.ACESFilmicToneMapping
            glAny.toneMappingExposure = capabilities.isMobile ? 1.8 : 2.2
            glAny.outputEncoding = threeAny.sRGBEncoding
            glAny.physicallyCorrectLights = !capabilities.isLowEnd
            glAny.alpha = true
            glAny.setClearColor(0x000000, 0)
          } catch (error) {
            console.error('WebGL setup error:', error)
            setHasError(true)
          }
        }}
      >
        <ambientLight intensity={capabilities.isMobile ? 1.5 : 2} />
        <directionalLight position={[5, 3, 5]} intensity={capabilities.isMobile ? 1 : 1.5} castShadow={false} />
        <directionalLight position={[-5, -3, -5]} intensity={capabilities.isMobile ? 0.7 : 1} castShadow={false} />
        <Suspense 
          fallback={
            <mesh>
              <sphereGeometry args={[1, 32, 32]} />
              <meshBasicMaterial color="#ff8c00" />
            </mesh>
          }
        >
          <RotatingModel 
            src="/scene.gltf" 
            isMobile={capabilities.isMobile} 
            isLowEnd={capabilities.isLowEnd}
          />
          {!capabilities.isLowEnd && <Environment preset="night" background={false} />}
        </Suspense>
        <CameraSetup zoom={1} isMobile={capabilities.isMobile} />
        <OrbitControls 
          enablePan={false} 
          enableZoom={!capabilities.isMobile}
          enableRotate={true}
          rotateSpeed={capabilities.isMobile ? 0.5 : 1}
          enableDamping={!capabilities.isLowEnd}
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  )
}

useGLTF.preload("/scene.gltf")

function CameraSetup({ zoom = 1, isMobile = false }: { zoom?: number; isMobile?: boolean }) {
  const { camera } = useThree()
  useEffect(() => {
    // Position camera for edge-on view (looking straight at the black hole from the front)
    camera.position.set(0, 0, isMobile ? 4 : 5)
    camera.lookAt(0, 0, 0) // Look directly at the center
  }, [camera, zoom, isMobile])
  return null
}