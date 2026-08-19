import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  Camera,
  CameraOff,
  CheckCircle2,
  CircleDot,
  Eye,
  Image,
  Maximize2,
  Scan,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigationStore } from '../store/navigation'

type VisionStatus = 'idle' | 'starting' | 'active' | 'error'

interface Capture {
  id: number
  time: string
}

const STATUS_LABELS: Record<VisionStatus, string> = {
  idle: 'Camera offline',
  starting: 'Starting camera',
  active: 'Vision active',
  error: 'Camera unavailable',
}

export default function VisionPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const setCurrentView = useNavigationStore((state) => state.setCurrentView)

  const [status, setStatus] = useState<VisionStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [captures, setCaptures] = useState<Capture[]>([])

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setStatus('idle')
  }

  const startCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus('error')
      setErrorMessage('Camera access is not supported in this browser.')
      return
    }

    try {
      setStatus('starting')
      setErrorMessage('')

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }

      setStatus('active')
    } catch {
      setStatus('error')
      setErrorMessage(
        'Camera permission was denied or the camera is unavailable.',
      )
    }
  }

  const captureFrame = () => {
    if (status !== 'active' || !videoRef.current) {
      return
    }

    setCaptures((current) => [
      {
        id: Date.now(),
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      },
      ...current,
    ].slice(0, 6))
  }

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  const isActive = status === 'active'
  const isStarting = status === 'starting'

  return (
    <div className="min-h-screen overflow-y-auto bg-[#030712] text-white">
      <div className="mx-auto min-h-screen w-full max-w-[1800px] px-4 py-4 sm:px-6 lg:px-8">
        <header className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentView('home')}
              aria-label="Back to home"
              className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-white/70 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-white"
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <Eye className="text-cyan-400" size={20} />
                <h1 className="text-lg font-semibold tracking-wide">
                  Nexus Vision
                </h1>
              </div>
              <p className="mt-0.5 text-xs text-white/40">
                Real-time visual intelligence workspace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5">
            <span
              className={`h-2 w-2 rounded-full ${
                isActive
                  ? 'animate-pulse bg-emerald-400'
                  : isStarting
                    ? 'animate-pulse bg-amber-400'
                    : status === 'error'
                      ? 'bg-red-400'
                      : 'bg-white/25'
              }`}
            />
            <span className="text-xs text-white/60">
              {STATUS_LABELS[status]}
            </span>
          </div>
        </header>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          <section className="min-w-0">
            <div className="relative overflow-hidden rounded-3xl border border-cyan-400/10 bg-[#07101f] shadow-2xl shadow-cyan-950/10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.09),transparent_42%)]" />

              <div className="relative aspect-video min-h-[420px] w-full">
                {isActive ? (
                  <video
                    ref={videoRef}
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                    aria-label="Live camera preview"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.75, 1, 0.75],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="mb-5 rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.06] p-6"
                    >
                      <Camera className="text-cyan-300" size={48} />
                    </motion.div>

                    <h2 className="text-xl font-semibold">
                      Vision workspace ready
                    </h2>
                    <p className="mt-2 max-w-md text-sm leading-6 text-white/45">
                      Activate the camera to begin the visual intelligence
                      session.
                    </p>

                    {errorMessage && (
                      <p className="mt-4 max-w-md rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-xs text-red-200">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                )}

                {isActive && (
                  <>
                    <div className="pointer-events-none absolute inset-5 rounded-2xl border border-white/[0.08]" />
                    <div className="pointer-events-none absolute left-1/2 top-5 h-3 w-3 -translate-x-1/2 rounded-full border border-cyan-300/80 bg-cyan-300/30" />
                    <div className="pointer-events-none absolute bottom-5 left-1/2 h-px w-24 -translate-x-1/2 bg-cyan-300/40" />

                    <div className="absolute left-6 top-6 flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-black/40 px-3 py-2 backdrop-blur-md">
                      <CircleDot size={13} className="text-emerald-400" />
                      <span className="text-[11px] font-medium text-emerald-200">
                        LIVE
                      </span>
                    </div>
                  </>
                )}

                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-white/10 bg-black/60 p-2 backdrop-blur-xl">
                  {isActive ? (
                    <>
                      <button
                        type="button"
                        onClick={captureFrame}
                        className="flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300"
                      >
                        <Scan size={15} />
                        Capture
                      </button>
                      <button
                        type="button"
                        onClick={stopCamera}
                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-xs font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
                      >
                        <CameraOff size={15} />
                        Stop
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={startCamera}
                      disabled={isStarting}
                      className="flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-wait disabled:opacity-60"
                    >
                      <Camera size={15} />
                      {isStarting ? 'Starting...' : 'Start Camera'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <MetricCard
                icon={<Target size={17} />}
                label="Detection"
                value={isActive ? 'Ready' : 'Standby'}
              />
              <MetricCard
                icon={<Zap size={17} />}
                label="Processing"
                value={isActive ? 'Live' : 'Offline'}
              />
              <MetricCard
                icon={<ShieldCheck size={17} />}
                label="Privacy"
                value="Local-first"
              />
            </div>
          </section>

          <aside className="space-y-4">
            <Panel title="Vision Analysis" icon={<Sparkles size={16} />}>
              <div className="space-y-3">
                <AnalysisRow
                  label="Scene understanding"
                  value={isActive ? 'Ready' : 'Waiting'}
                  active={isActive}
                />
                <AnalysisRow
                  label="Object detection"
                  value={isActive ? 'Ready' : 'Waiting'}
                  active={isActive}
                />
                <AnalysisRow
                  label="Text recognition"
                  value={isActive ? 'Ready' : 'Waiting'}
                  active={isActive}
                />
                <AnalysisRow
                  label="Face analysis"
                  value="Available"
                  active={false}
                />
              </div>
            </Panel>

            <Panel title="Recent Captures" icon={<Image size={16} />}>
              {captures.length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/10 px-4 py-7 text-center">
                  <Image
                    size={22}
                    className="mx-auto mb-2 text-white/20"
                  />
                  <p className="text-xs text-white/35">
                    Captured frames will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {captures.map((capture) => (
                    <div
                      key={capture.id}
                      className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2
                          size={14}
                          className="text-emerald-400"
                        />
                        <span className="text-xs text-white/65">
                          Vision frame
                        </span>
                      </div>
                      <span className="text-[10px] text-white/30">
                        {capture.time}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Panel>

            <Panel title="Workspace Controls" icon={<Maximize2 size={16} />}>
              <div className="space-y-2">
                <ControlRow label="Camera input" value="Browser camera" />
                <ControlRow label="Audio input" value="Disabled" />
                <ControlRow label="Analysis mode" value="Realtime" />
                <ControlRow label="Storage" value="Local session" />
              </div>
            </Panel>
          </aside>
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
      <div className="mb-3 flex items-center gap-2 text-cyan-300/80">
        {icon}
        <span className="text-[11px] uppercase tracking-wider text-white/35">
          {label}
        </span>
      </div>
      <p className="text-sm font-medium text-white/75">{value}</p>
    </div>
  )
}

function Panel({
  title,
  icon,
  children,
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-cyan-300">{icon}</span>
        <h2 className="text-sm font-semibold text-white/80">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function AnalysisRow({
  label,
  value,
  active,
}: {
  label: string
  value: string
  active: boolean
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-black/10 px-3 py-2.5">
      <span className="text-xs text-white/50">{label}</span>
      <span
        className={`text-[10px] font-medium ${
          active ? 'text-emerald-300' : 'text-white/30'
        }`}
      >
        {value}
      </span>
    </div>
  )
}

function ControlRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-xs text-white/40">{label}</span>
      <span className="text-xs text-white/65">{value}</span>
    </div>
  )
}
