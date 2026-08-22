import {
  Activity,
  CheckCircle2,
  CircleAlert,
  Cloud,
  Laptop,
  Monitor,
  MoreVertical,
  RefreshCw,
  Shield,
  ShieldCheck,
  Smartphone,
  Tablet,
  Wifi,
  WifiOff,
} from 'lucide-react'

type DeviceStatus = 'Online' | 'Offline'

interface Device {
  id: string
  name: string
  platform: string
  lastActive: string
  status: DeviceStatus
  icon: typeof Laptop
}

const devices: Device[] = [
  {
    id: 'laptop',
    name: "Rudraksh's Laptop",
    platform: 'Windows 11 Pro',
    lastActive: 'Last active just now',
    status: 'Online',
    icon: Laptop,
  },
  {
    id: 'iphone',
    name: 'iPhone 15 Pro',
    platform: 'iOS 17.4',
    lastActive: 'Last active 5 min ago',
    status: 'Online',
    icon: Smartphone,
  },
  {
    id: 'speaker',
    name: 'Nexus Smart Speaker',
    platform: 'Living Room',
    lastActive: 'Last active 15 min ago',
    status: 'Online',
    icon: Cloud,
  },
  {
    id: 'desktop',
    name: 'Office Desktop',
    platform: 'Windows 10 Pro',
    lastActive: 'Last active 2 hours ago',
    status: 'Offline',
    icon: Monitor,
  },
  {
    id: 'tablet',
    name: 'Android Tablet',
    platform: 'Android 13',
    lastActive: 'Last active yesterday',
    status: 'Offline',
    icon: Tablet,
  },
  {
    id: 'camera',
    name: 'Nexus Vision Camera',
    platform: 'Office',
    lastActive: 'Last active 3 days ago',
    status: 'Offline',
    icon: Monitor,
  },
]

function StatCard({
  label,
  value,
  icon,
  iconClass,
}: {
  label: string
  value: string | number
  icon: React.ReactNode
  iconClass: string
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#07101f]/70 p-4 backdrop-blur-xl transition hover:border-white/[0.11] hover:bg-[#091326]">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-[10px] text-slate-600">{label}</p>
          <p className="mt-0.5 text-lg font-semibold text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  )
}

function DeviceRow({ device }: { device: Device }) {
  const Icon = device.icon
  const online = device.status === 'Online'

  return (
    <div className="group flex items-center gap-3 rounded-xl border border-white/[0.055] bg-white/[0.015] px-3 py-3 transition hover:border-violet-400/15 hover:bg-white/[0.025]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/10 bg-violet-500/[0.07] text-violet-300">
        <Icon size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-slate-200">
          {device.name}
        </p>

        <p className="mt-0.5 truncate text-[10px] text-slate-600">
          {device.platform} · {device.lastActive}
        </p>
      </div>

      <div
        className={`hidden shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] sm:flex ${
          online
            ? 'border-emerald-400/15 bg-emerald-500/[0.07] text-emerald-300'
            : 'border-red-400/15 bg-red-500/[0.06] text-red-300'
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            online ? 'bg-emerald-400' : 'bg-red-400'
          }`}
        />

        {device.status}
      </div>

      <button
        type="button"
        aria-label={`More options for ${device.name}`}
        className="rounded-lg p-1.5 text-slate-700 transition hover:bg-white/[0.05] hover:text-slate-300"
      >
        <MoreVertical size={14} />
      </button>
    </div>
  )
}

function SecurityRow({
  icon,
  title,
  description,
  status,
  iconClass,
}: {
  icon: React.ReactNode
  title: string
  description: string
  status: string
  iconClass: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.055] bg-white/[0.015] p-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-slate-200">
          {title}
        </p>

        <p className="mt-0.5 truncate text-[10px] text-slate-600">
          {description}
        </p>
      </div>

      <span className="hidden shrink-0 rounded-lg border border-emerald-400/10 bg-emerald-500/[0.06] px-2.5 py-1 text-[9px] text-emerald-300 sm:block">
        {status}
      </span>
    </div>
  )
}

export default function DevicesPage() {
  const onlineCount = devices.filter(
    (device) => device.status === 'Online',
  ).length

  const offlineCount = devices.length - onlineCount

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030712] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[25%] top-[-20%] h-[500px] w-[500px] rounded-full bg-violet-600/[0.06] blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[10%] h-[420px] w-[420px] rounded-full bg-cyan-500/[0.04] blur-[130px]" />
      </div>

      <div className="relative flex min-h-screen flex-col">
        <header className="flex min-h-[70px] items-center justify-between border-b border-white/[0.06] px-5 sm:px-7 lg:px-9">
          <div>
            <p className="text-sm font-medium tracking-wide text-white">
              Workspace
            </p>
          </div>

          <div className="hidden h-9 w-full max-w-[420px] items-center rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 sm:flex">
            <Activity size={14} className="text-slate-600" />

            <span className="ml-2 flex-1 text-xs text-slate-600">
              Search anything...
            </span>

            <span className="rounded-md border border-white/[0.06] px-2 py-0.5 text-[9px] text-slate-600">
              Ctrl K
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck size={17} className="text-emerald-400" />
            <Wifi size={17} className="text-slate-500" />
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1500px]">
            <section className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-400/15 bg-violet-500/10 text-violet-300">
                    <Smartphone size={16} />
                  </div>

                  <h1 className="text-xl font-semibold tracking-tight text-white">
                    My Devices
                  </h1>
                </div>

                <p className="mt-1 text-xs text-slate-600">
                  Manage and monitor your connected devices.
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-[10px] text-slate-600">
                  Total Devices
                </p>

                <p className="text-lg font-semibold text-white">
                  {devices.length}
                </p>
              </div>
            </section>

            <section className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Online"
                value={onlineCount}
                icon={<Cloud size={17} />}
                iconClass="bg-emerald-500/10 text-emerald-300"
              />

              <StatCard
                label="Offline"
                value={offlineCount}
                icon={<WifiOff size={17} />}
                iconClass="bg-red-500/10 text-red-300"
              />

              <StatCard
                label="Active"
                value={2}
                icon={<Activity size={17} />}
                iconClass="bg-cyan-500/10 text-cyan-300"
              />

              <StatCard
                label="Security"
                value="Secure"
                icon={<ShieldCheck size={17} />}
                iconClass="bg-emerald-500/10 text-emerald-300"
              />
            </section>

            <section className="mb-5 rounded-2xl border border-white/[0.07] bg-[#07101f]/70 p-4 backdrop-blur-2xl sm:p-5">
              <div className="mb-4">
                <h2 className="text-sm font-medium text-white">
                  Connected Devices
                </h2>

                <p className="mt-1 text-[10px] text-slate-600">
                  Devices connected to your Nexus AI workspace.
                </p>
              </div>

              <div className="space-y-2">
                {devices.map((device) => (
                  <DeviceRow
                    key={device.id}
                    device={device}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-white/[0.07] bg-[#07101f]/70 p-4 backdrop-blur-2xl sm:p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                  <Shield size={18} />
                </div>

                <div>
                  <h2 className="text-sm font-medium text-white">
                    Device Security
                  </h2>

                  <p className="mt-1 text-[10px] text-slate-600">
                    All your devices are protected with Nexus AI security.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <SecurityRow
                  icon={<ShieldCheck size={16} />}
                  title="Real-time Monitoring"
                  description="All devices are being monitored"
                  status="Active"
                  iconClass="bg-emerald-500/10 text-emerald-300"
                />

                <SecurityRow
                  icon={<Shield size={16} />}
                  title="Threat Detection"
                  description="No threats detected"
                  status="Secure"
                  iconClass="bg-violet-500/10 text-violet-300"
                />

                <SecurityRow
                  icon={<RefreshCw size={16} />}
                  title="Auto Updates"
                  description="All devices are up to date"
                  status="Updated"
                  iconClass="bg-blue-500/10 text-blue-300"
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
