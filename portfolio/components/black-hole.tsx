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
      
      // Apply initial rotation
      gltf.scene.rotation.set(0, Math.PI / 2, 0)
      
      // Ensure all children are properly positioned relative to parent
      gltf.scene.traverse((child: any) => {
        if (child.isMesh) {
          child.updateMatrixWorld()
        }
      })
    }
  }, [gltf])

  // Rotate slowly around the vertical axis (reduce rotation speed on low-end devices)
  useFrame((state, delta) => {
    if (gltf?.scene) {
      const rotationSpeed = isLowEnd ? 0.05 : 0.1
      gltf.scene.rotation.y += delta * rotationSpeed
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
  const [shouldRender, setShouldRender] = useState(false)

  // Lazy load 3D scene for better initial load performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true)
    }, 500) // Delay 3D scene to prioritize above-the-fold content

    return () => clearTimeout(timer)
  }, [])

  // Don't render 3D scene if WebGL is not supported or user prefers reduced motion
  if (!capabilities.supportsWebGL || capabilities.prefersReducedMotion) {
    return (
      <div className="w-full h-full overflow-hidden bg-transparent flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-orange-500 to-black animate-pulse" />
          <p className="mt-4 text-sm text-muted-foreground">Black Hole Visualization</p>
        </div>
      </div>
    )
  }

  if (!shouldRender) {
    return (
      <div className="w-full h-full overflow-hidden bg-transparent flex items-center justify-center">
        <div className="text-sm text-muted-foreground">Loading 3D scene...</div>
      </div>
    )
  }

  return (
    <div className="w-full h-full overflow-hidden bg-transparent"> 
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [-9, 1.5, 2], fov: 45 }}
        dpr={capabilities.isMobile ? 1 : Math.min(capabilities.devicePixelRatio, 2)} // Limit pixel ratio on mobile
        performance={{ min: 0.5 }} // Allow frame rate to drop if needed
        gl={{
          antialias: !capabilities.isLowEnd, // Disable antialiasing on low-end devices
          powerPreference: capabilities.isMobile ? "low-power" : "high-performance",
        }}
        onCreated={(state) => {
          // make bright areas stand out more
          const glAny = state.gl as any
          const threeAny = THREE as any
          glAny.toneMapping = threeAny.ACESFilmicToneMapping
          glAny.toneMappingExposure = capabilities.isMobile ? 1.8 : 2.2
          glAny.outputEncoding = threeAny.sRGBEncoding
          glAny.physicallyCorrectLights = !capabilities.isLowEnd
          glAny.alpha = true
          glAny.setClearColor(0x000000, 0)
        }}
      >
        <ambientLight intensity={capabilities.isMobile ? 1.5 : 2} />
        <directionalLight position={[0, 3, 5]} intensity={capabilities.isMobile ? 1 : 1.5} castShadow={false} />
        <directionalLight position={[0, -3, -5]} intensity={capabilities.isMobile ? 0.7 : 1} castShadow={false} />
        <Suspense fallback={null}>
          <RotatingModel 
            src="/scene.gltf" 
            isMobile={capabilities.isMobile} 
            isLowEnd={capabilities.isLowEnd}
          />
          {!capabilities.isLowEnd && <Environment preset="night" background={false} />}
        </Suspense>
        <CameraSetup zoom={1.3} />
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} // Enable zoom on all devices including mobile
          enableRotate={true}
          rotateSpeed={capabilities.isMobile ? 0.5 : 1}
          enableDamping={!capabilities.isLowEnd}
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={10}
        />
      </Canvas>
    </div>
  )
}

useGLTF.preload("/scene.gltf")

function CameraSetup({ zoom = 1 }: { zoom?: number }) {
  const { camera } = useThree()
  useEffect(() => {
    // Position camera to eliminate bottom padding/margin
    const base = { x: 0, y: 0.5, z: 3.5 }
    camera.position.set(base.x / zoom, base.y / zoom, base.z / zoom)
    camera.lookAt(0, -0.5, 0) // Look slightly down to focus on the black hole
  }, [camera, zoom])
  return null
}