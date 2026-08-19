import {
  Activity,
  CircleUserRound,
  ClipboardList,
  FolderOpen,
  Home,
  LayoutDashboard,
  MessageSquare,
  Puzzle,
  Settings,
  Smartphone,
  Target,
  Video,
  Volume2,
  WandSparkles,
} from 'lucide-react'
import { useNavigationStore, type NexusView } from '../../store/navigation'

interface NavigationItem {
  label: string
  icon: typeof Home
  view: NexusView
}

const navigation: NavigationItem[] = [
  { label: 'Home', icon: Home, view: 'home' },
  { label: 'Chat', icon: MessageSquare, view: 'chat' },
  { label: 'Voice', icon: Volume2, view: 'voice' },
  { label: 'Vision', icon: Video, view: 'vision' },
  { label: 'Automation', icon: WandSparkles, view: 'automation' },
  { label: 'Memory', icon: CircleUserRound, view: 'memory' },
  { label: 'Planner', icon: ClipboardList, view: 'home' },
  { label: 'Devices', icon: Smartphone, view: 'devices' },
  { label: 'Plugins', icon: Puzzle, view: 'plugins' },
  { label: 'Skills', icon: Target, view: 'home' },
  { label: 'Files', icon: FolderOpen, view: 'home' },
  { label: 'Analytics', icon: LayoutDashboard, view: 'analytics' },
  { label: 'Settings', icon: Settings, view: 'settings' },
]

interface NexusSidebarProps {
  currentView: NexusView
}

export default function NexusSidebar({
  currentView,
}: NexusSidebarProps) {
  const setCurrentView = useNavigationStore(
    (state) => state.setCurrentView,
  )

  return (
    <aside className="hidden w-[252px] shrink-0 flex-col border-r border-white/[0.07] bg-[#050b1d]/95 px-4 py-5 backdrop-blur-2xl lg:flex">
      <div className="flex items-center gap-3 px-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400/20 to-cyan-400/10 shadow-[0_0_35px_rgba(139,92,246,0.18)]">
          <span className="bg-gradient-to-br from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-[30px] font-semibold leading-none text-transparent">
            N
          </span>
        </div>

        <div>
          <p className="text-[18px] font-medium tracking-[0.12em] text-white">
            NEXUS AI
          </p>
          <p className="text-[11px] text-slate-500">
            Your Intelligent Assistant
          </p>
        </div>
      </div>

      <nav className="mt-7 space-y-1">
        {navigation.map(({ label, icon: Icon, view }) => {
          const active = currentView === view

          return (
            <button
              key={label}
              type="button"
              aria-label={label}
              onClick={() => setCurrentView(view)}
              className={`flex h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-sm transition ${
                active
                  ? 'border border-violet-400/40 bg-gradient-to-r from-violet-600/45 to-violet-500/20 text-white shadow-[0_0_25px_rgba(124,58,237,0.16)]'
                  : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
              }`}
            >
              <Icon size={17} />
              <span>{label}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-3 text-left transition hover:bg-white/[0.05]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-300 to-indigo-400 text-sm font-medium text-white">
            R
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">
              Rudraksh
            </p>

            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-slate-500">
                Online
              </span>
            </div>
          </div>

          <span className="text-xs text-slate-500">⌄</span>
        </button>

        <div className="rounded-xl border border-white/[0.08] bg-[#050b18]/80 p-3">
          <p className="mb-3 text-[9px] font-medium tracking-[0.18em] text-slate-500">
            NEXUS AI SYSTEM
          </p>

          <div className="space-y-2.5">
            {[
              'AI Core',
              'Voice Engine',
              'Vision Engine',
              'Automation Engine',
              'Memory System',
              'Planner Engine',
              'Database System',
            ].map((system) => (
              <div
                key={system}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600" />
                  <span className="truncate text-[10px] text-slate-500">
                    {system}
                  </span>
                </div>

                <span className="shrink-0 text-[9px] text-emerald-400">
                  Operational
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/[0.06] pt-4 text-[9px] text-slate-600">
          <span>v0.3.0</span>

          <span className="flex items-center gap-1.5 text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Up to date
          </span>
        </div>
      </div>
    </aside>
  )
}
