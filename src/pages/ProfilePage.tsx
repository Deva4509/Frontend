import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { motion } from 'framer-motion'
import {
  Activity,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Command,
  Globe2,
  Laptop2,
  MapPin,
  MessageSquare,
  Pencil,
  Phone,
  Settings2,
  ShieldCheck,
  Sparkles as SparklesIcon,
  Trophy,
  UserRound,
  Zap,
} from 'lucide-react'
import { Component, useRef, useState, type ErrorInfo, type ReactNode } from 'react'
import type * as THREE from 'three'


class Profile3DErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Nexus Profile 3D scene failed:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="absolute h-40 w-40 rounded-full bg-violet-600/20 blur-3xl" />
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-violet-400/40 bg-gradient-to-br from-violet-500/30 via-indigo-500/20 to-cyan-400/20 shadow-[0_0_55px_rgba(124,58,237,0.45)]">
            <div className="absolute inset-3 rounded-full border border-cyan-300/20" />
            <div className="absolute -inset-3 rounded-full border border-violet-400/20" />
            <span className="text-5xl font-bold text-cyan-200 drop-shadow-[0_0_18px_rgba(34,211,238,0.8)]">
              N
            </span>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

function HolographicCore({
  variant = 'nexus',
}: {
  variant?: 'nexus' | 'chat' | 'task' | 'clock' | 'bolt' | 'cube'
}) {
  const group = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.35
      group.current.rotation.x = Math.sin(Date.now() * 0.0007) * 0.08
    }
  })

  const symbol =
    variant === 'chat'
      ? '•••'
      : variant === 'task'
        ? '✓'
        : variant === 'clock'
          ? '◷'
          : variant === 'bolt'
            ? 'ϟ'
            : variant === 'cube'
              ? '◇'
              : 'N'

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[0.85, 48, 48]} />
        <meshStandardMaterial
          color="#4c1d95"
          emissive="#7c3aed"
          emissiveIntensity={1.8}
          transparent
          opacity={0.72}
          metalness={0.35}
          roughness={0.18}
        />
      </mesh>

      <mesh scale={1.12}>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshBasicMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={0.38}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.3}>
        <torusGeometry args={[0.9, 0.025, 16, 96]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.9} />
      </mesh>

      <mesh rotation={[0.8, 0.3, 0.4]} scale={1.48}>
        <torusGeometry args={[0.9, 0.018, 12, 96]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} />
      </mesh>

      <pointLight color="#8b5cf6" intensity={4} distance={5} />
      <pointLight color="#22d3ee" intensity={2.5} distance={4} position={[1, 0, 1]} />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh>
          <icosahedronGeometry args={[0.34, 2]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#6366f1"
            emissiveIntensity={2}
            metalness={0.6}
            roughness={0.12}
          />
        </mesh>
      </Float>

      <Sparkles
        count={35}
        scale={3}
        size={2}
        speed={0.5}
        color="#c4b5fd"
      />

      <group position={[0, 0, 0.9]}>
        <mesh>
          <planeGeometry args={[0.01, 0.01]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      </group>

      <primitive object={null} />
      <textPlaceholder symbol={symbol} />
    </group>
  )
}

function textPlaceholder({ symbol }: { symbol: string }) {
  return (
    <group position={[0, -0.05, 0.9]}>
      <mesh>
        <circleGeometry args={[0.001, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <group userData={{ symbol }} />
    </group>
  )
}

function ThreeDShowcase({
  variant = 'nexus',
  className = '',
}: {
  variant?: 'nexus' | 'chat' | 'task' | 'clock' | 'bolt' | 'cube'
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <Profile3DErrorBoundary>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.25} />
        <HolographicCore variant={variant} />
      </Canvas>
      </Profile3DErrorBoundary>
    </div>
  )
}

function GlassCard({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={`relative overflow-hidden rounded-2xl border border-indigo-300/15 bg-gradient-to-br from-[#111936]/90 via-[#0b1229]/92 to-[#070d20]/95 shadow-[0_0_45px_rgba(49,46,129,0.12)] backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.section>
  )
}

function SectionHeader({
  icon,
  title,
  action,
}: {
  icon: ReactNode
  title: string
  action?: ReactNode
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
          {icon}
        </div>
        <h2 className="text-sm font-semibold text-white">{title}</h2>
      </div>
      {action}
    </div>
  )
}

function StatCard({
  icon,
  title,
  value,
  change,
  bars,
}: {
  icon: ReactNode
  title: string
  value: string
  change: string
  bars: number[]
}) {
  return (
    <GlassCard className="min-h-[132px] p-5">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/20 bg-gradient-to-br from-violet-500/20 to-cyan-400/10 text-violet-200 shadow-[0_0_22px_rgba(139,92,246,0.18)]">
          {icon}
        </div>

        <Activity size={15} className="text-cyan-300/70" />
      </div>

      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-[11px] text-slate-400">{title}</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-white">
            {value}
          </p>
          <p className="mt-1 text-[11px] font-medium text-emerald-400">
            ↑ {change}
          </p>
        </div>

        <div className="flex h-8 items-end gap-1">
          {bars.map((height, index) => (
            <motion.span
              key={index}
              initial={{ height: 2 }}
              animate={{ height }}
              transition={{ delay: index * 0.04, duration: 0.35 }}
              className="w-2 rounded-t-sm bg-gradient-to-t from-violet-500/50 to-cyan-400/80"
            />
          ))}
        </div>
      </div>
    </GlassCard>
  )
}

function Toggle({ enabled = true }: { enabled?: boolean }) {
  const [active, setActive] = useState(enabled)

  return (
    <button
      type="button"
      onClick={() => setActive((value) => !value)}
      className={`relative h-5 w-9 rounded-full border transition ${
        active
          ? 'border-violet-400/50 bg-violet-600/80'
          : 'border-white/10 bg-white/10'
      }`}
      aria-label="Toggle setting"
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${
          active ? 'left-[17px]' : 'left-0.5'
        }`}
      />
    </button>
  )
}

function PreferenceRow({
  icon,
  label,
  value,
  toggle,
}: {
  icon: ReactNode
  label: string
  value?: string
  toggle?: boolean
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.055] py-3 last:border-b-0">
      <div className="flex items-center gap-3">
        <span className="text-slate-400">{icon}</span>
        <span className="text-xs font-medium text-slate-200">{label}</span>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-slate-400">
        {value}
        {toggle && <Toggle />}
        {!toggle && value && <ChevronDown size={13} />}
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#020617] text-white [zoom:0.82]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-[10%] h-[500px] w-[500px] rounded-full bg-violet-700/10 blur-[150px]" />
        <div className="absolute right-[5%] top-[20%] h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute bottom-[-200px] left-[35%] h-[500px] w-[500px] rounded-full bg-blue-700/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(99,102,241,0.09),transparent_36%)]" />
      </div>

      <header className="relative z-20 flex h-[82px] items-center justify-between border-b border-white/[0.06] bg-[#030819]/70 px-6 backdrop-blur-2xl lg:px-9">
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/25 bg-gradient-to-br from-violet-600/30 to-cyan-400/10 shadow-[0_0_30px_rgba(124,58,237,0.22)]">
            <span className="text-xl font-bold text-violet-200">N</span>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-white">
              NEXUS
            </p>
            <p className="text-[10px] tracking-[0.18em] text-slate-500">
              AI ASSISTANT
            </p>
          </div>
        </div>

        <div className="hidden w-[340px] items-center gap-3 rounded-xl border border-white/[0.09] bg-white/[0.025] px-4 py-2.5 md:flex">
          <Command size={16} className="text-slate-400" />
          <span className="flex-1 text-xs text-slate-500">
            Search anything...
          </span>
          <kbd className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-slate-400">
            ⌘ K
          </kbd>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-violet-500/20 sm:flex"
          >
            <Zap size={15} className="text-cyan-300" />
            Quick Command
          </button>

          <button
            type="button"
            onClick={() => setShowNotifications((value) => !value)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-slate-300"
            aria-label="Notifications"
          >
            <Bell size={17} />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1 text-[9px] font-bold text-white">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-5 top-[68px] w-72 rounded-2xl border border-white/10 bg-[#081027]/95 p-4 shadow-2xl backdrop-blur-2xl">
              <p className="text-sm font-semibold">Notifications</p>
              <p className="mt-2 text-xs text-slate-500">
                Your Nexus workspace is running normally.
              </p>
            </div>
          )}

          <button
            type="button"
            className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-2"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-xs font-bold">
              R
            </span>
            <span className="hidden text-xs font-semibold sm:block">
              Rudraksh
            </span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative min-h-[300px] overflow-hidden rounded-[28px] border border-violet-300/20 bg-gradient-to-br from-[#1a173d] via-[#101a3d] to-[#061326] shadow-[0_0_80px_rgba(76,29,149,0.18)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(139,92,246,0.28),transparent_32%),radial-gradient(circle_at_72%_45%,rgba(34,211,238,0.12),transparent_28%)]" />

          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(129,140,248,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(129,140,248,0.08)_1px,transparent_1px)] [background-size:50px_50px]" />

          <div className="relative grid min-h-[300px] lg:grid-cols-[280px_1fr_390px]">
            <div className="relative flex items-center justify-center">
              <div className="absolute h-56 w-56 rounded-full bg-violet-600/25 blur-3xl" />

              <div className="relative h-56 w-56">
                <div className="absolute inset-0 rounded-full border border-violet-300/50 shadow-[0_0_55px_rgba(139,92,246,0.5)]" />
                <div className="absolute inset-3 rounded-full border border-cyan-300/30" />
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-violet-500/70 via-indigo-600/60 to-cyan-400/30 shadow-[inset_0_0_45px_rgba(255,255,255,0.1),0_0_45px_rgba(59,130,246,0.35)]" />
                <div className="absolute inset-[56px] flex items-center justify-center rounded-full border border-white/20 bg-[#101936]/90">
                  <span className="text-7xl font-bold text-transparent bg-gradient-to-br from-white via-cyan-200 to-violet-300 bg-clip-text">
                    R
                  </span>
                </div>

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-[-13px] rounded-full border border-cyan-300/25 border-dashed"
                />

                <div className="absolute bottom-2 right-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#101936] bg-emerald-400 text-[#03100b] shadow-[0_0_20px_rgba(52,211,153,0.65)]">
                  <Check size={19} strokeWidth={3} />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center px-7 py-8 lg:px-5">
              <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                NEXUS MEMBER
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Rudraksh
                <span className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs">
                  ✓
                </span>
              </h1>

              <p className="mt-1 text-lg font-medium text-violet-300">
                @rudraksh
              </p>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                “Building the future with AI. Exploring, learning and enhancing
                every day.”
              </p>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-300">
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-violet-300" />
                  India
                </span>
                <span className="flex items-center gap-2">
                  <CalendarDays size={14} className="text-cyan-300" />
                  Joined May 2024
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-emerald-300" />
                  ID: NX-8F7A2-9C3D
                </span>
              </div>
            </div>

            <div className="relative m-5 overflow-hidden rounded-2xl border border-white/10 bg-[#050b1c]/70 p-6 backdrop-blur-xl">
              <div className="absolute -right-16 top-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Account Status</span>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-300">
                    Active
                  </span>
                </div>

                <div className="mt-5 space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Member Since</span>
                    <span className="font-semibold">May 12, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Account Type</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Nexus ID</span>
                    <span className="font-semibold">NX-8F7A2-9C3D</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-auto flex items-center justify-center gap-2 rounded-xl border border-violet-300/30 bg-gradient-to-r from-violet-600 to-blue-600 py-3 text-sm font-semibold shadow-[0_0_25px_rgba(99,102,241,0.28)] transition hover:brightness-110"
                >
                  <Pencil size={15} />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<MessageSquare size={23} />}
            title="Total Conversations"
            value="128"
            change="12 this week"
            bars={[6, 10, 8, 16, 12, 20, 17, 22, 19]}
          />
          <StatCard
            icon={<Check size={23} />}
            title="Tasks Completed"
            value="47"
            change="8 this week"
            bars={[5, 9, 7, 12, 10, 17, 13, 18, 20]}
          />
          <StatCard
            icon={<Clock3 size={23} />}
            title="Time with Nexus"
            value="12h 34m"
            change="2h this week"
            bars={[5, 8, 7, 12, 9, 16, 14, 19, 22]}
          />
          <StatCard
            icon={<Zap size={23} />}
            title="Commands Used"
            value="284"
            change="32 this week"
            bars={[6, 7, 10, 12, 11, 17, 14, 20, 23]}
          />
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[1.05fr_1fr_1.05fr]">
          <GlassCard>
            <SectionHeader
              icon={<UserRound size={17} />}
              title="About Me"
            />

            <div className="grid min-h-[270px] grid-cols-[1fr_150px]">
              <div className="p-5">
                <div className="space-y-4 text-xs">
                  <div className="flex gap-4">
                    <span className="w-16 shrink-0 text-slate-500">Bio</span>
                    <span className="leading-5 text-slate-300">
                      AI enthusiast and developer. I love creating things that
                      make life easier and smarter.
                    </span>
                  </div>

                  <div className="flex items-center gap-4 border-t border-white/[0.06] pt-4">
                    <MapPin size={15} className="text-violet-300" />
                    <span className="w-12 text-slate-500">Location</span>
                    <span className="text-slate-200">India</span>
                  </div>

                  <div className="flex items-center gap-4 border-t border-white/[0.06] pt-4">
                    <Globe2 size={15} className="text-cyan-300" />
                    <span className="w-12 text-slate-500">Language</span>
                    <span className="text-slate-200">English</span>
                  </div>

                  <div className="flex items-center gap-4 border-t border-white/[0.06] pt-4">
                    <CalendarDays size={15} className="text-violet-300" />
                    <span className="w-12 text-slate-500">Joined</span>
                    <span className="text-slate-200">May 12, 2024</span>
                  </div>
                </div>
              </div>

              <ThreeDShowcase variant="cube" className="h-full min-h-[240px]" />
            </div>
          </GlassCard>

          <GlassCard>
            <SectionHeader
              icon={<Activity size={17} />}
              title="Nexus Activity"
              action={
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-[11px] text-slate-300"
                >
                  This Month
                  <ChevronDown size={13} />
                </button>
              }
            />

            <div className="flex min-h-[270px] items-center gap-7 p-5">
              <div className="relative flex h-40 w-40 shrink-0 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-[8px] border-slate-800" />
                <div className="absolute inset-0 rounded-full border-[8px] border-transparent border-t-violet-500 border-r-cyan-400 rotate-[-20deg]" />
                <div className="absolute inset-[14px] rounded-full border-[6px] border-transparent border-l-blue-500 border-b-violet-400 rotate-[35deg]" />
                <div className="text-center">
                  <p className="text-3xl font-bold">312</p>
                  <p className="text-[11px] text-slate-400">Total Actions</p>
                </div>
              </div>

              <div className="flex-1 space-y-4 text-xs">
                {[
                  ['Conversations', '128', 'bg-violet-400'],
                  ['Tasks', '47', 'bg-blue-400'],
                  ['Commands', '89', 'bg-cyan-400'],
                  ['Others', '48', 'bg-slate-500'],
                ].map(([label, value, color]) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className={`h-2 w-2 rounded-full ${color}`} />
                    <span className="flex-1 text-slate-300">{label}</span>
                    <span className="font-semibold text-white">{value}</span>
                  </div>
                ))}

                <p className="pt-4 text-[11px] text-slate-400">
                  Daily average:{' '}
                  <span className="font-semibold text-emerald-400">
                    10.4 actions
                  </span>
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <SectionHeader
              icon={<Settings2 size={17} />}
              title="Preferences"
            />

            <div className="p-5">
              <PreferenceRow
                icon={<Activity size={16} />}
                label="Voice"
                value="Enabled"
                toggle
              />
              <PreferenceRow
                icon={<Activity size={16} />}
                label="Memory"
                value="Enabled"
                toggle
              />
              <PreferenceRow
                icon={<SparklesIcon size={16} />}
                label="Theme"
                value="Dark"
              />
              <PreferenceRow
                icon={<Globe2 size={16} />}
                label="Language"
                value="English"
              />
              <PreferenceRow
                icon={<Bell size={16} />}
                label="Notifications"
                value="Enabled"
                toggle
              />

              <button
                type="button"
                className="mt-4 text-xs font-medium text-violet-300 transition hover:text-violet-200"
              >
                View all preferences →
              </button>
            </div>
          </GlassCard>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_1fr]">
          <GlassCard>
            <SectionHeader
              icon={<Trophy size={17} />}
              title="Recent Achievements"
              action={
                <button
                  type="button"
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-[11px] text-slate-300"
                >
                  View All
                </button>
              }
            />

            <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: 'Early Explorer',
                  subtitle: 'Joined Nexus',
                  detail: 'May 2024',
                  icon: <SparklesIcon size={24} />,
                },
                {
                  title: 'Chat Master',
                  subtitle: 'Completed 100',
                  detail: 'conversations',
                  icon: <MessageSquare size={24} />,
                },
                {
                  title: 'Task Finisher',
                  subtitle: 'Completed 25',
                  detail: 'tasks',
                  icon: <Check size={24} />,
                },
                {
                  title: 'Command Pro',
                  subtitle: 'Used 200+',
                  detail: 'commands',
                  icon: <Zap size={24} />,
                },
              ].map((achievement, index) => (
                <div
                  key={achievement.title}
                  className="group rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition hover:border-violet-400/20 hover:bg-violet-500/[0.04]"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                      index === 3
                        ? 'border-amber-300/30 bg-amber-400/10 text-amber-300'
                        : index === 2
                          ? 'border-cyan-300/30 bg-cyan-400/10 text-cyan-300'
                          : 'border-violet-300/30 bg-violet-400/10 text-violet-300'
                    }`}
                  >
                    {achievement.icon}
                  </div>
                  <p className="mt-4 text-xs font-semibold text-white">
                    {achievement.title}
                  </p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    {achievement.subtitle}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {achievement.detail}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <SectionHeader
              icon={<Laptop2 size={17} />}
              title="Connected Devices"
              action={
                <button
                  type="button"
                  className="rounded-lg border border-white/10 px-3 py-1.5 text-[11px] text-slate-300"
                >
                  View All
                </button>
              }
            />

            <div className="space-y-3 p-4">
              <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                  <Laptop2 size={19} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold">Windows PC</p>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] text-emerald-300">
                      Active
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] text-slate-500">
                    Last active: Now
                  </p>
                </div>
                <span className="text-slate-500">•••</span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                  <Phone size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold">OnePlus Nord CE 3 Lite</p>
                  <p className="mt-1 text-[10px] text-slate-500">
                    Last active: 2h ago
                  </p>
                </div>
                <span className="text-slate-500">•••</span>
              </div>
            </div>
          </GlassCard>
        </div>

        <footer className="py-8 text-center text-[10px] tracking-widest text-slate-600">
          NEXUS AI · PERSONAL INTELLIGENCE PROFILE
        </footer>
      </main>
    </div>
  )
}
