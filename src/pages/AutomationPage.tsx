import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Edit3,
  Home,
  MoreVertical,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Trash2,
  WandSparkles,
  Zap,
} from 'lucide-react'
import { useNavigationStore } from '../store/navigation'

type AutomationStatus = 'Ready' | 'Paused'

interface Automation {
  id: string
  title: string
  description: string
  schedule: string
  nextRun: string
  status: AutomationStatus
  runs: number
}

const initialAutomations: Automation[] = [
  {
    id: 'automation-1',
    title: 'Morning Briefing',
    description: 'Prepare a daily overview of important updates.',
    schedule: 'Every day · 8:00 AM',
    nextRun: 'Tomorrow at 8:00 AM',
    status: 'Ready',
    runs: 24,
  },
  {
    id: 'automation-2',
    title: 'Daily Task Review',
    description: 'Review unfinished tasks and surface priorities.',
    schedule: 'Every day · 6:00 PM',
    nextRun: 'Today at 6:00 PM',
    status: 'Ready',
    runs: 18,
  },
  {
    id: 'automation-3',
    title: 'Weekly Project Summary',
    description: 'Create a summary of recent project activity.',
    schedule: 'Every Friday · 5:30 PM',
    nextRun: 'Friday at 5:30 PM',
    status: 'Paused',
    runs: 9,
  },
  {
    id: 'automation-4',
    title: 'Workspace Health Check',
    description: 'Check the Nexus workspace for important system changes.',
    schedule: 'Every 6 hours',
    nextRun: 'In 2 hours',
    status: 'Ready',
    runs: 61,
  },
]

const navigation = [
  { label: 'Home', icon: Home, view: 'home' as const },
  { label: 'Chat', icon: Sparkles, view: 'chat' as const },
  { label: 'Voice', icon: Zap, view: 'voice' as const },
  { label: 'Vision', icon: WandSparkles, view: 'vision' as const },
  { label: 'Automation', icon: RefreshCw, active: true, view: 'automation' as const },
  { label: 'Memory', icon: ShieldCheck, view: 'memory' as const },
]

export default function AutomationPage() {
  const setCurrentView = useNavigationStore(
    (state) => state.setCurrentView,
  )

  const [automations, setAutomations] = useState<Automation[]>(
    initialAutomations,
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreatePanel, setShowCreatePanel] = useState(false)

  const filteredAutomations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    if (!query) {
      return automations
    }

    return automations.filter((automation) =>
      [
        automation.title,
        automation.description,
        automation.schedule,
        automation.status,
      ]
        .join(' ')
        .toLowerCase()
        .includes(query),
    )
  }, [automations, searchQuery])

  const activeCount = automations.filter(
    (automation) => automation.status === 'Ready',
  ).length

  const toggleAutomation = (id: string) => {
    setAutomations((current) =>
      current.map((automation) =>
        automation.id === id
          ? {
              ...automation,
              status:
                automation.status === 'Ready'
                  ? 'Paused'
                  : 'Ready',
            }
          : automation,
      ),
    )
  }

  const deleteAutomation = (id: string) => {
    setAutomations((current) =>
      current.filter((automation) => automation.id !== id),
    )
  }

  return (
    <div className="relative z-[1] min-h-screen w-full overflow-hidden bg-[#030712] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_20%,rgba(124,58,237,0.13),transparent_28%),radial-gradient(circle_at_78%_72%,rgba(6,182,212,0.08),transparent_30%)]" />

      <div className="relative flex min-h-screen">
        <aside className="hidden w-[252px] shrink-0 flex-col border-r border-white/[0.07] bg-[#050b1d]/95 px-4 py-5 backdrop-blur-2xl lg:flex">
          <div className="flex items-center gap-3 px-3">
            <div className="relative flex h-10 w-10 items-center justify-center">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 opacity-30 blur-lg" />

              <span className="relative bg-gradient-to-br from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-4xl font-bold leading-none text-transparent">
                N
              </span>
            </div>

            <div>
              <p className="text-[18px] font-medium tracking-[0.12em] text-white">
                NEXUS AI
              </p>

              <p className="text-[11px] text-slate-500">
                Automation Workspace
              </p>
            </div>
          </div>

          <nav className="mt-7 space-y-1">
            {navigation.map(
              ({ label, icon: Icon, active, view }) => (
                <button
                  key={label}
                  aria-label={label}
                  onClick={() => {
                    if (view) {
                      setCurrentView(view)
                    }
                  }}
                  className={`flex h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-sm transition ${
                    active
                      ? 'border border-violet-400/40 bg-gradient-to-r from-violet-600/45 to-violet-500/20 text-white shadow-[0_0_25px_rgba(124,58,237,0.16)]'
                      : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                  }`}
                >
                  <Icon size={17} />
                  <span>{label}</span>
                </button>
              ),
            )}

            <button
              aria-label="Settings"
              className="mt-1 flex h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-slate-200"
            >
              <Settings size={17} />
              <span>Settings</span>
            </button>
          </nav>

          <div className="mt-auto rounded-xl border border-white/[0.06] bg-slate-950/45 p-3">
            <div className="flex items-center gap-2">
              <ShieldCheck
                size={16}
                className="text-emerald-400"
              />

              <span className="text-xs text-slate-300">
                Automation protection active
              </span>
            </div>

            <p className="mt-2 text-[10px] leading-5 text-slate-600">
              Automated actions are isolated from your active
              conversations and can be managed independently.
            </p>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="flex h-[70px] items-center gap-4 border-b border-white/[0.06] px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setCurrentView('home')}
              aria-label="Back to Home"
              className="flex h-9 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 text-xs text-slate-400 transition hover:border-violet-400/25 hover:text-white"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Home</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                <WandSparkles size={18} />
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  Automation
                </p>

                <p className="text-[10px] text-slate-600">
                  Autonomous workflows
                </p>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[10px] text-slate-500 sm:flex">
                <Zap size={13} />
                {activeCount} active
              </div>

              <button
                aria-label="Automation settings"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-500 transition hover:text-white"
              >
                <Settings size={16} />
              </button>
            </div>
          </header>

          <div className="h-[calc(100vh-70px)] overflow-y-auto">
            <div className="mx-auto max-w-[1450px] px-4 pb-8 pt-6 sm:px-6 lg:px-8">
              <section className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-300/70">
                    Autonomous workflows
                  </p>

                  <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                    Nexus Automation
                  </h1>

                  <p className="mt-2 max-w-[700px] text-sm leading-6 text-slate-500">
                    Create and manage scheduled workflows that let
                    Nexus handle repetitive work automatically.
                  </p>
                </div>

                <button
                  onClick={() => setShowCreatePanel(true)}
                  className="flex h-10 items-center justify-center gap-2 rounded-xl border border-violet-400/25 bg-violet-500/10 px-4 text-xs font-medium text-violet-200 transition hover:border-violet-400/40 hover:bg-violet-500/15"
                >
                  <Plus size={15} />
                  New Automation
                </button>
              </section>

              <section className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/[0.08] bg-slate-950/55 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                      <WandSparkles size={19} />
                    </div>

                    <div>
                      <p className="text-[11px] text-slate-500">
                        Total Automations
                      </p>

                      <p className="mt-0.5 text-xl font-medium text-white">
                        {automations.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-slate-950/55 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                      <CheckCircle2 size={19} />
                    </div>

                    <div>
                      <p className="text-[11px] text-slate-500">
                        Active
                      </p>

                      <p className="mt-0.5 text-xl font-medium text-white">
                        {activeCount}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-slate-950/55 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                      <CalendarClock size={19} />
                    </div>

                    <div>
                      <p className="text-[11px] text-slate-500">
                        Scheduled Runs
                      </p>

                      <p className="mt-0.5 text-xl font-medium text-white">
                        {automations.reduce(
                          (total, automation) =>
                            total + automation.runs,
                          0,
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mt-4 rounded-2xl border border-white/[0.08] bg-slate-950/55 p-4">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative min-w-0 flex-1">
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                    />

                    <input
                      aria-label="Search automations"
                      value={searchQuery}
                      onChange={(event) =>
                        setSearchQuery(event.target.value)
                      }
                      placeholder="Search automations..."
                      className="h-11 w-full rounded-xl border border-white/[0.07] bg-white/[0.02] pl-9 pr-3 text-xs text-white outline-none placeholder:text-slate-600 focus:border-violet-400/30"
                    />
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.018] px-3 py-2 text-[10px] text-slate-500">
                    <RefreshCw size={13} />
                    Runtime connected
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  {filteredAutomations.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-white/[0.08] px-4 py-12 text-center">
                      <WandSparkles
                        size={22}
                        className="mx-auto text-slate-700"
                      />

                      <p className="mt-3 text-sm text-slate-500">
                        No automations found.
                      </p>

                      <p className="mt-1 text-[10px] text-slate-700">
                        Try another search or create a new automation.
                      </p>
                    </div>
                  ) : (
                    filteredAutomations.map((automation) => (
                      <div
                        key={automation.id}
                        className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4 transition hover:border-white/[0.1] hover:bg-white/[0.025]"
                      >
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                          <div className="flex min-w-0 flex-1 items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                              <WandSparkles size={17} />
                            </div>

                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="text-sm font-medium text-slate-200">
                                  {automation.title}
                                </p>

                                <span
                                  className={`rounded-md px-1.5 py-0.5 text-[8px] ${
                                    automation.status === 'Ready'
                                      ? 'bg-emerald-500/10 text-emerald-400'
                                      : 'bg-amber-500/10 text-amber-300'
                                  }`}
                                >
                                  {automation.status}
                                </span>
                              </div>

                              <p className="mt-1 text-[11px] leading-5 text-slate-500">
                                {automation.description}
                              </p>

                              <div className="mt-2 flex flex-wrap items-center gap-3">
                                <span className="flex items-center gap-1.5 text-[9px] text-slate-600">
                                  <Clock3 size={11} />
                                  {automation.schedule}
                                </span>

                                <span className="text-[9px] text-slate-700">
                                  {automation.runs} runs
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-3 lg:min-w-[310px] lg:justify-end">
                            <div className="hidden text-right sm:block">
                              <p className="text-[9px] text-slate-700">
                                Next run
                              </p>

                              <p className="mt-1 text-[10px] text-slate-400">
                                {automation.nextRun}
                              </p>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                aria-label={`${automation.status === 'Ready' ? 'Pause' : 'Resume'} ${automation.title}`}
                                onClick={() =>
                                  toggleAutomation(automation.id)
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-slate-500 transition hover:border-violet-400/20 hover:text-white"
                              >
                                {automation.status === 'Ready' ? (
                                  <Pause size={14} />
                                ) : (
                                  <Play size={14} />
                                )}
                              </button>

                              <button
                                aria-label={`Edit ${automation.title}`}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-slate-500 transition hover:border-violet-400/20 hover:text-white"
                              >
                                <Edit3 size={14} />
                              </button>

                              <button
                                aria-label={`Delete ${automation.title}`}
                                onClick={() =>
                                  deleteAutomation(automation.id)
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-slate-500 transition hover:border-red-400/20 hover:text-red-300"
                              >
                                <Trash2 size={14} />
                              </button>

                              <button
                                aria-label={`${automation.title} options`}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:text-slate-300"
                              >
                                <MoreVertical size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>

              <footer className="mt-6 flex flex-col gap-2 border-t border-white/[0.05] pt-4 text-[9px] uppercase tracking-[0.18em] text-slate-700 sm:flex-row sm:items-center sm:justify-between">
                <span>Nexus AI</span>

                <span className="flex items-center gap-2">
                  <ShieldCheck size={11} />
                  Automation state · Backend runtime integration ready
                </span>
              </footer>
            </div>
          </div>
        </main>
      </div>

      {showCreatePanel && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#071126] p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-300/70">
                  Automation builder
                </p>

                <h2 className="mt-2 text-lg font-medium text-white">
                  Create automation
                </h2>
              </div>

              <button
                aria-label="Close create automation"
                onClick={() => setShowCreatePanel(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-white/[0.04] hover:text-white"
              >
                <ArrowLeft size={15} className="rotate-45" />
              </button>
            </div>

            <div className="mt-5 rounded-xl border border-violet-400/10 bg-violet-500/[0.04] p-4">
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-violet-300" />

                <p className="text-xs text-slate-300">
                  Automation builder ready
                </p>
              </div>

              <p className="mt-2 text-[10px] leading-5 text-slate-600">
                The visual workflow editor can be connected to the
                backend automation engine in the next integration step.
              </p>
            </div>

            <button
              onClick={() => setShowCreatePanel(false)}
              className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-violet-500/15 text-xs font-medium text-violet-200 transition hover:bg-violet-500/20"
            >
              <CheckCircle2 size={15} />
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
