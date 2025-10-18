"use client"

import { Suspense, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment } from "@react-three/drei"
import * as THREE from "three"

function RotatingModel({ src }: { src: string }) {
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

  // Rotate slowly around the vertical axis
  useFrame((state, delta) => {
    if (gltf?.scene) {
      gltf.scene.rotation.y += delta * 0.1
    }
  })
  
  // Fix materials and ensure proper rendering
  useEffect(() => {
    if (!gltf || !gltf.scene) return
    
    gltf.scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material]
        mats.forEach((mat: any) => {
          // Ensure material is properly configured
          if (mat.map) {
            mat.map.needsUpdate = true
          }
          if (mat.emissiveMap) {
            mat.emissiveMap.needsUpdate = true
          }
          
          // Boost emissive properties for glowing effect
          if (mat.name && /ring|emissive|disk/i.test(mat.name.toLowerCase())) {
            mat.emissive = new THREE.Color(1, 0.8, 0.4)
            mat.emissiveIntensity = 2.0
            mat.needsUpdate = true
          }
          
          // Ensure proper transparency and blending
          if (mat.transparent) {
            mat.depthWrite = false
            mat.blending = THREE.AdditiveBlending
          }
        })
      }
    })
  }, [gltf])
  
  if (!gltf?.scene) {
    console.error('Failed to load GLTF model')
    return null
  }
  
  return <primitive object={gltf.scene} dispose={null} />
}

export function BlackHole({ zoom = 60 }: { zoom?: number }) {
  // This component now renders a normal block-level footer container.
  // Place it inside your footer/section. The parent should control layout/spacing.
  return (
    <div className="w-full h-full overflow-hidden bg-transparent"> 
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [-9, 1.5, 2], fov: 45 }}
        onCreated={(state) => {
          // make bright areas stand out more
          const glAny = state.gl as any
          const threeAny = THREE as any
          glAny.toneMapping = threeAny.ACESFilmicToneMapping
          glAny.toneMappingExposure = 2.2
          glAny.outputEncoding = threeAny.sRGBEncoding
          glAny.physicallyCorrectLights = true
          glAny.alpha = true
          glAny.setClearColor(0x000000, 0)
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[0, 3, 5]} intensity={1.5} />
        <directionalLight position={[0, -3, -5]} intensity={0.5} />
        <Suspense fallback={null}>
          <RotatingModel src="/scene.gltf" />
          <Environment preset="night" background={false} />
        </Suspense>
        <CameraSetup zoom={zoom} />
        <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
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
