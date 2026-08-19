import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { useNavigationStore } from '../store/navigation'

const BOOT_DURATION = 3800
const EXIT_DURATION = 500

function NexusCore() {
  const coreRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const shellRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime

    if (coreRef.current) {
      const pulse =
        1 + Math.sin(time * 2.2) * 0.035

      coreRef.current.scale.setScalar(pulse)

      coreRef.current.rotation.x += delta * 0.08
      coreRef.current.rotation.y += delta * 0.18
    }

    if (innerRef.current) {
      const pulse =
        1 + Math.sin(time * 1.8 + 1) * 0.025

      innerRef.current.scale.setScalar(pulse)

      innerRef.current.rotation.y -= delta * 0.12
      innerRef.current.rotation.z += delta * 0.035
    }

    if (shellRef.current) {
      shellRef.current.rotation.y += delta * 0.035
      shellRef.current.rotation.x =
        Math.sin(time * 0.25) * 0.035
    }
  })

  return (
    <group>
      {/* Outer glass shell */}
      <mesh ref={shellRef}>
        <sphereGeometry args={[1.05, 96, 96]} />

        <meshPhysicalMaterial
          color="#100827"
          emissive="#3b1ca8"
          emissiveIntensity={1.15}
          roughness={0.12}
          metalness={0.25}
          transmission={0.72}
          thickness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.08}
          transparent
          opacity={0.48}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner violet energy */}
      <mesh
        ref={innerRef}
        scale={0.72}
      >
        <sphereGeometry args={[1, 64, 64]} />

        <meshBasicMaterial
          color="#7048ff"
          transparent
          opacity={0.24}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Central luminous core */}
      <mesh
        ref={coreRef}
        scale={0.42}
      >
        <sphereGeometry args={[1, 64, 64]} />

        <meshBasicMaterial
          color="#dfe5ff"
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Violet light */}
      <pointLight
        color="#7652ff"
        intensity={5}
        distance={4}
      />

      {/* Cyan rim light */}
      <pointLight
        color="#25e7ff"
        intensity={2.8}
        distance={3.5}
        position={[1.5, 0.4, 1.2]}
      />
    </group>
  )
}

function OrbitalArc({
  rotation,
  speed,
  scale,
  color,
  opacity,
}: {
  rotation: [number, number, number]
  speed: number
  scale: number
  color: string
  opacity: number
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!ref.current) return

    ref.current.rotation.z += delta * speed
  })

  return (
    <mesh
      ref={ref}
      rotation={rotation}
      scale={scale}
    >
      <torusGeometry
        args={[1.23, 0.006, 8, 180]}
      />

      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

function NexusOrb() {
  return (
    <group>
      <NexusCore />

      <OrbitalArc
        rotation={[Math.PI / 2.3, 0.15, 0]}
        speed={0.22}
        scale={1}
        color="#9b7cff"
        opacity={0.65}
      />

      <OrbitalArc
        rotation={[0.75, 0.2, 0.65]}
        speed={-0.16}
        scale={1.08}
        color="#35e8ff"
        opacity={0.42}
      />

      <OrbitalArc
        rotation={[1.95, -0.3, 0.2]}
        speed={0.1}
        scale={1.15}
        color="#6d4aff"
        opacity={0.28}
      />
    </group>
  )
}

function OrbCanvas() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 4],
        fov: 35,
      }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
    >
      <ambientLight intensity={0.08} />

      <NexusOrb />
    </Canvas>
  )
}

function NexusBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* Main atmospheric glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.08, 0.13, 0.08],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600 blur-[150px]"
      />

      <motion.div
        animate={{
          scale: [1.05, 0.95, 1.05],
          opacity: [0.035, 0.065, 0.035],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 blur-[120px]"
      />

      {/* Very subtle Nexus typography */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.045 }}
        transition={{ duration: 1.5 }}
        className="absolute left-[-5vw] top-[31%] whitespace-nowrap text-[clamp(6rem,14vw,14rem)] font-semibold leading-none tracking-[-0.1em] text-white"
      >
        NEXUS
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.035 }}
        transition={{
          duration: 1.8,
          delay: 0.2,
        }}
        className="absolute right-[-11vw] top-[51%] whitespace-nowrap text-[clamp(4rem,11vw,11rem)] font-semibold leading-none tracking-[-0.09em] text-violet-100"
      >
        INITIALISING
      </motion.div>

      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(2,0,8,0.25)_48%,#020006_88%)]" />
    </div>
  )
}

export default function StartupPage() {
  const setCurrentView = useNavigationStore(
    (state) => state.setCurrentView,
  )

  const setBooted = useNavigationStore(
    (state) => state.setBooted,
  )

  const [isExiting, setIsExiting] = useState(false)

  const exitTimerRef = useRef<number | null>(null)

  useEffect(() => {
    const bootTimer = window.setTimeout(() => {
      setIsExiting(true)

      exitTimerRef.current = window.setTimeout(() => {
        setBooted(true)
        setCurrentView('home')
      }, EXIT_DURATION)
    }, BOOT_DURATION)

    return () => {
      window.clearTimeout(bootTimer)

      if (exitTimerRef.current !== null) {
        window.clearTimeout(exitTimerRef.current)
      }
    }
  }, [setBooted, setCurrentView])

  const canRenderWebGL =
    typeof window !== 'undefined' &&
    'ResizeObserver' in window

  return (
    <motion.section
      data-testid="nexus-startup"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: isExiting ? 0 : 1,
        scale: isExiting ? 1.16 : 1,
      }}
      transition={{
        duration: EXIT_DURATION / 1000,
        ease: [0.76, 0, 0.24, 1],
      }}
      className="relative z-10 flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#020006] text-white"
    >
      <NexusBackground />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.72,
          filter: 'blur(12px)',
        }}
        animate={{
          opacity: 1,
          scale: isExiting ? 1.28 : 1,
          filter: 'blur(0px)',
        }}
        transition={{
          opacity: {
            duration: 1.2,
            ease: 'easeOut',
          },
          scale: {
            duration: isExiting
              ? EXIT_DURATION / 1000
              : 1.5,
            ease: isExiting
              ? [0.76, 0, 0.24, 1]
              : [0.16, 1, 0.3, 1],
          },
          filter: {
            duration: 1.2,
          },
        }}
        className="relative z-20 h-[min(54vw,500px)] w-[min(54vw,500px)]"
      >
        {canRenderWebGL ? (
          <OrbCanvas />
        ) : (
          <div
            aria-hidden="true"
            className="h-full w-full rounded-full bg-[radial-gradient(circle_at_38%_35%,#e0e7ff_0%,#8b5cf6_14%,#4c1d95_38%,#10052f_62%,#020006_80%)] shadow-[0_0_110px_rgba(109,40,217,0.55)]"
          />
        )}
      </motion.div>
    </motion.section>
  )
}
