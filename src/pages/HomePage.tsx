import type { LucideIcon } from 'lucide-react'
import { useState, type KeyboardEvent } from 'react'
import NexusOrb from '../components/background/NexusOrb'
import { useNavigationStore } from '../store/navigation'

import {
  Activity,
  Bell,
  Bot,
  Calculator,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleUserRound,
  ClipboardList,
  FileText,
  FolderOpen,
  Globe2,
  HeartPulse,
  Home,
  Languages,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Mic,
  Monitor,
  MoreVertical,
  Paperclip,
  PenLine,
  Play,
  Plus,
  Puzzle,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Smartphone,
  Sparkles,
  SquareTerminal,
  Target,
  UserRound,
  Video,
  Volume2,
  WandSparkles,
  Wifi,
  Zap,
  Cpu,
} from 'lucide-react'

const navigation = [
  { label: 'Home', icon: Home, active: true },
  { label: 'Chat', icon: MessageSquare },
  { label: 'Voice', icon: Volume2 },
  { label: 'Vision', icon: Video },
  { label: 'Automation', icon: WandSparkles },
  { label: 'Memory', icon: CircleUserRound },
  { label: 'Planner', icon: ClipboardList },
  { label: 'Devices', icon: Smartphone },
  { label: 'Plugins', icon: Puzzle },
  { label: 'Skills', icon: Target },
  { label: 'Files', icon: FolderOpen },
  { label: 'Analytics', icon: LayoutDashboard },
]

const quickActions = [
  { label: 'Screenshot', icon: SquareTerminal },
  { label: 'Open App', icon: LayoutDashboard },
  { label: 'Create Note', icon: FileText },
  { label: 'Translate', icon: Languages },
  { label: 'Summarize', icon: ClipboardList },
  { label: 'Search Web', icon: Globe2 },
  { label: 'Create Task', icon: CheckCircle2 },
  { label: 'Calculator', icon: Calculator },
]

const schedule = [
  {
    time: '11:00 AM',
    title: 'Team Standup',
    relative: 'In 30 min',
    icon: UsersIcon,
  },
  {
    time: '01:00 PM',
    title: 'Project Review',
    relative: 'In 2h 30m',
    icon: ClipboardList,
  },
  {
    time: '04:00 PM',
    title: 'Client Meeting',
    relative: 'In 5h 30m',
    icon: UserRound,
  },
  {
    time: '07:00 PM',
    title: 'Gym & Fitness',
    relative: 'In 8h 30m',
    icon: Activity,
  },
]

const conversations = [
  {
    title: 'Python Web Scraping Project',
    description: 'Help me create a Python script to scrape data...',
    time: '10:25 AM',
    icon: SquareTerminal,
  },
  {
    title: 'Quantum Computing Explained',
    description: 'Explain quantum computing in simple terms...',
    time: 'Yesterday',
    icon: Sparkles,
  },
  {
    title: 'Workout Plan Generator',
    description: 'Create a 4-week workout plan for building...',
    time: 'Yesterday',
    icon: Activity,
  },
  {
    title: 'Travel Itinerary for Japan',
    description: 'Plan a 10-day trip to Japan for me...',
    time: 'May 10',
    icon: Globe2,
  },
  {
    title: 'Data Analysis with Pandas',
    description: 'How to clean and analyze this dataset using...',
    time: 'May 10',
    icon: LayoutDashboard,
  },
]

const automations = [
  {
    title: 'Daily Backup',
    description: 'Backup important files',
    schedule: '09:00 AM',
    icon: FolderOpen,
  },
  {
    title: 'Email Notifier',
    description: 'Notify new emails',
    schedule: 'Real-time',
    icon: Bell,
  },
  {
    title: 'Clean Temp Files',
    description: 'Clean system temp',
    schedule: 'Daily',
    icon: Sparkles,
  },
  {
    title: 'YouTube Summary',
    description: 'Summarize subscriptions',
    schedule: '07:00 PM',
    icon: Play,
  },
  {
    title: 'Screenshot Saver',
    description: 'Save screenshots',
    schedule: 'Real-time',
    icon: Monitor,
  },
]

function UsersIcon({ size = 18 }: { size?: number }) {
  return <UserRound size={size} />
}

function StatusCard({
  icon: Icon,
  title,
  value,
  subtitle,
  iconClassName,
}: {
  icon: typeof Bot
  title: string
  value: string
  subtitle: string
  iconClassName: string
}) {
  return (
    <div className="group rounded-2xl border border-white/[0.07] bg-slate-950/55 p-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.16)] backdrop-blur-xl transition duration-200 hover:border-violet-400/20">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] ${iconClassName}`}
        >
          <Icon size={21} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-[12px] font-medium text-slate-300">
            {title}
          </p>
          <p className="mt-0.5 truncate text-[16px] font-medium text-white">
            {value}
          </p>
          <p className="mt-0.5 truncate text-[10px] text-slate-500">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

function CircularMetric({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: LucideIcon
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-slate-950/40 p-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-slate-500">{label}</p>
        <Icon size={13} className="text-slate-600" />
      </div>

      <p className="mt-1 text-xl font-medium text-white">{value}</p>

      <div className="relative mx-auto mt-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-800">
        <div className="absolute inset-[-2px] rounded-full border-2 border-transparent border-r-cyan-400 border-t-blue-500" />
        <Activity size={15} className="text-cyan-300" />
      </div>
    </div>
  )
}

export default function HomePage() {
  const setCurrentView = useNavigationStore(
    (state) => state.setCurrentView,
  )

  const openChatWithMessage = useNavigationStore(
    (state) => state.openChatWithMessage,
  )

  const [homeMessage, setHomeMessage] = useState('')

  const submitHomeMessage = () => {
    const message = homeMessage.trim()

    if (!message) {
      return
    }

    setHomeMessage('')
    openChatWithMessage(message)
  }

  const handleHomeMessageKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submitHomeMessage()
    }
  }

  return (
    <div className="relative z-[1] min-h-screen w-full overflow-hidden text-slate-100">
      <div className="flex min-h-screen bg-[radial-gradient(circle_at_55%_10%,rgba(76,29,149,0.13),transparent_30%)]">
        <aside className="hidden w-[252px] shrink-0 flex-col border-r border-white/[0.07] bg-[#050b1d]/90 px-4 py-5 backdrop-blur-2xl lg:flex">
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
                Your Intelligent Assistant
              </p>
            </div>
          </div>

          <nav className="mt-7 space-y-1">
            {navigation.map(({ label, icon: Icon, active }) => (
              <button
                key={label}
                aria-label={label}
                onClick={() => {
                  if (label === 'Chat') {
                    setCurrentView('chat')
                  } else if (label === 'Voice') {
                    setCurrentView('voice')
                  } else if (label === 'Vision') {
                    setCurrentView('vision')
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
            ))}

            <button
              aria-label="Settings"
              className="mt-1 flex h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-slate-200"
            >
              <Settings size={17} />
              <span>Settings</span>
            </button>
          </nav>

          <div className="mt-auto">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-300 to-blue-500 text-xs font-bold text-white">
                  R
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-white">Rudraksh</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="text-[10px] text-slate-500">Online</span>
                  </div>
                </div>

                <ChevronDown size={15} className="text-slate-500" />
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-white/[0.06] bg-slate-950/45 p-3">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
                Nexus AI System
              </p>

              {[
                'AI Core',
                'Voice Engine',
                'Vision Engine',
                'Automation Engine',
                'Memory System',
                'Planner Engine',
                'Database System',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between py-1.5"
                >
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                    {item}
                  </div>
                  <span className="text-[10px] text-emerald-400/80">
                    Operational
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/[0.05] pt-4 px-1 text-[10px] text-slate-600">
              <span>v0.3.0</span>
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Up to date
              </span>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="flex h-[70px] items-center gap-4 border-b border-white/[0.06] px-4 sm:px-6">
            <button
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] text-slate-400 lg:hidden"
            >
              <Menu size={18} />
            </button>

            <div className="hidden flex-1 sm:block">
              <p className="text-sm font-medium text-slate-300">
                Workspace
              </p>
            </div>

            <button
              aria-label="Search"
              className="mx-auto flex h-9 w-full max-w-[325px] items-center gap-3 rounded-xl border border-white/[0.08] bg-slate-950/65 px-3 text-left shadow-inner shadow-black/20"
            >
              <Search size={17} className="text-slate-400" />
              <span className="flex-1 text-xs text-slate-500">
                Search anything...
              </span>
              <kbd className="hidden rounded border border-white/[0.08] px-1.5 py-0.5 text-[9px] text-slate-600 sm:block">
                Ctrl + K
              </kbd>
            </button>

            <div className="ml-auto flex items-center gap-2">
              <button
                aria-label="Security"
                className="hidden h-8 w-8 items-center justify-center text-emerald-400 sm:flex"
              >
                <ShieldCheck size={17} />
              </button>
              <button
                aria-label="Notifications"
                className="relative flex h-8 w-8 items-center justify-center text-slate-400"
              >
                <Bell size={17} />
                <span className="absolute right-1 top-0.5 h-1.5 w-1.5 rounded-full bg-violet-400" />
              </button>
              <button
                aria-label="Settings"
                className="hidden h-8 w-8 items-center justify-center text-slate-400 sm:flex"
              >
                <Settings size={17} />
              </button>

              <div className="hidden h-5 w-px bg-white/[0.08] sm:block" />

              <button
                aria-label="Minimize"
                className="hidden h-8 w-8 items-center justify-center text-slate-500 sm:flex"
              >
                <span className="h-px w-3 bg-current" />
              </button>
              <button
                aria-label="Maximize"
                className="hidden h-8 w-8 items-center justify-center text-slate-500 sm:flex"
              >
                <span className="h-3 w-3 border border-current" />
              </button>
              <button
                aria-label="Close"
                className="hidden h-8 w-8 items-center justify-center text-slate-500 hover:text-white sm:flex"
              >
                <span className="text-lg leading-none">×</span>
              </button>
            </div>
          </header>

          <div className="h-[calc(100vh-70px)] overflow-y-auto">
            <div className="mx-auto max-w-[1500px] px-4 pb-8 pt-5 sm:px-6 lg:px-8">
              <section className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <h1 className="text-2xl font-medium tracking-[-0.03em] text-white sm:text-[25px]">
                    Good morning, Rudraksh!{' '}
                    <span className="inline-block">👋</span>
                  </h1>
                  <p className="mt-1.5 text-sm text-slate-500">
                    Nexus AI is ready to assist you
                  </p>
                </div>

                <div className="hidden text-right sm:block">
                  <p className="text-[11px] text-slate-500">
                    Workspace dashboard
                  </p>
                  <p className="mt-0.5 text-xl font-medium text-white">
                    Nexus AI
                  </p>
                </div>
              </section>

              <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
                <StatusCard
                  icon={Bot}
                  title="AI Status"
                  value="Ready"
                  subtitle="System available"
                  iconClassName="bg-emerald-500/10 text-emerald-300"
                />
                <StatusCard
                  icon={CircleUserRound}
                  title="Memory Items"
                  value="12,946"
                  subtitle="Stored memories"
                  iconClassName="bg-violet-500/10 text-violet-300"
                />
                <StatusCard
                  icon={Zap}
                  title="Automations"
                  value="24"
                  subtitle="Configured tasks"
                  iconClassName="bg-blue-500/10 text-blue-300"
                />
                <StatusCard
                  icon={Smartphone}
                  title="Devices"
                  value="2"
                  subtitle="Connected"
                  iconClassName="bg-cyan-500/10 text-cyan-300"
                />
                <StatusCard
                  icon={Puzzle}
                  title="Plugins"
                  value="18"
                  subtitle="Installed"
                  iconClassName="bg-amber-500/10 text-amber-300"
                />
                <StatusCard
                  icon={HeartPulse}
                  title="System Health"
                  value="99.8%"
                  subtitle="Excellent"
                  iconClassName="bg-emerald-500/10 text-emerald-300"
                />
              </section>

              <section className="mt-4 grid gap-4 2xl:grid-cols-[minmax(0,1fr)_400px]">
                <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#07112a]/80 shadow-[0_25px_80px_rgba(0,0,0,0.25)]">
                  <div className="relative min-h-[500px] overflow-hidden p-6 pb-[105px] sm:min-h-[500px] sm:p-8 sm:pb-[105px]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,rgba(124,58,237,0.22),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(6,182,212,0.12),transparent_35%)]" />

                    <NexusOrb />



                    <div className="relative z-[1] max-w-[460px]">
                      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-300/70">
                        Personal intelligence
                      </p>

                      <h2 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-[-0.05em] text-white sm:text-[42px]">
                        How can{' '}
                        <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
                          I help
                        </span>
                        <br />
                        you today?
                      </h2>

                      <p className="mt-4 max-w-[390px] text-sm leading-6 text-slate-400">
                        I can help you with tasks, answer questions,
                        automate your work and much more.
                      </p>

                      <div className="relative z-[3] mt-7 flex w-full max-w-[250px] flex-col gap-3 sm:w-[250px]">
                        <button
                          onClick={() => openChatWithMessage('')}
                          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-4 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(124,58,237,0.25)] transition hover:-translate-y-0.5 hover:brightness-110"
                        >
                          <MessageSquare size={17} />
                          Start a New Chat
                        </button>

                        <button
                          onClick={() => setCurrentView('voice')}
                          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-slate-950/80 px-4 text-sm font-medium text-slate-200 shadow-[0_8px_25px_rgba(0,0,0,0.2)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-cyan-400/35 hover:bg-slate-900/90"
                        >
                          <Mic size={17} className="text-cyan-300" />
                          Voice Mode
                        </button>
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-5 right-5 z-[4] sm:bottom-5 sm:left-6 sm:right-6">
                      <div className="flex min-h-[60px] items-center gap-2 rounded-xl border border-white/[0.08] bg-[#081229]/90 px-3 shadow-[0_15px_45px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                        <input
                          aria-label="Ask Nexus"
                          type="text"
                          value={homeMessage}
                          onChange={(event) =>
                            setHomeMessage(event.target.value)
                          }
                          onKeyDown={handleHomeMessageKeyDown}
                          placeholder="Ask Nexus AI anything..."
                          className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-slate-600"
                        />

                        <button
                          aria-label="Attach file"
                          className="hidden h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/[0.05] hover:text-slate-300 sm:flex"
                        >
                          <Paperclip size={18} />
                        </button>

                        <button
                          aria-label="Voice input"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/[0.05] hover:text-slate-300"
                        >
                          <Mic size={18} />
                        </button>

                        <button
                          onClick={submitHomeMessage}
                          disabled={!homeMessage.trim()}
                          aria-label="Send message"
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-500 text-white shadow-[0_0_25px_rgba(124,58,237,0.3)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Send size={17} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-slate-950/55 p-3.5">
                  <div className="flex items-center justify-between px-1 pb-3">
                    <h2 className="text-sm font-medium text-white">
                      Today's Schedule
                    </h2>
                    <button className="text-[11px] text-blue-400 hover:text-blue-300">
                      View Calendar
                    </button>
                  </div>

                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.018]">
                    {schedule.map((item, index) => {
                      const Icon = item.icon

                      return (
                        <div
                          key={item.title}
                          className={`flex items-center gap-3 px-3 py-3 ${
                            index !== schedule.length - 1
                              ? 'border-b border-white/[0.05]'
                              : ''
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${
                              index === 0
                                ? 'bg-emerald-400'
                                : index === 1
                                  ? 'bg-cyan-400'
                                  : index === 2
                                    ? 'bg-amber-400'
                                    : 'bg-violet-400'
                            }`}
                          />

                          <span className="w-[62px] text-[11px] text-slate-400">
                            {item.time}
                          </span>

                          <div className="flex min-w-0 flex-1 items-center gap-2">
                            <Icon size={14} className="hidden text-slate-600 sm:block" />
                            <span className="truncate text-xs text-slate-200">
                              {item.title}
                            </span>
                          </div>

                          <span className="hidden text-[10px] text-slate-600 sm:block">
                            {item.relative}
                          </span>
                        </div>
                      )
                    })}

                    <button className="flex w-full items-center justify-center gap-1 py-3 text-xs text-violet-300 transition hover:text-violet-200">
                      <Plus size={14} />
                      Add Event
                    </button>
                  </div>
                </div>
              </section>

              <section className="mt-4 grid gap-4 2xl:grid-cols-[minmax(0,1fr)_400px]">
                <div className="grid gap-4 xl:grid-cols-2">
                  <div className="rounded-2xl border border-white/[0.08] bg-slate-950/55 p-3.5">
                    <div className="flex items-center justify-between px-1 pb-3">
                      <h2 className="text-sm font-medium text-white">
                        Recent Conversations
                      </h2>
                      <button className="text-[11px] text-blue-400">
                        View All
                      </button>
                    </div>

                    <div className="space-y-1">
                      {conversations.map((item) => {
                        const Icon = item.icon

                        return (
                          <button
                            key={item.title}
                            className="flex w-full items-center gap-3 rounded-xl border border-transparent bg-white/[0.015] p-2.5 text-left transition hover:border-white/[0.06] hover:bg-white/[0.035]"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
                              <Icon size={17} />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-xs font-medium text-slate-300">
                                {item.title}
                              </p>
                              <p className="mt-0.5 truncate text-[10px] text-slate-600">
                                {item.description}
                              </p>
                            </div>

                            <span className="shrink-0 text-[9px] text-slate-600">
                              {item.time}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/[0.08] bg-slate-950/55 p-3.5">
                    <div className="flex items-center justify-between px-1 pb-3">
                      <h2 className="text-sm font-medium text-white">
                        System Monitor
                      </h2>
                      <button className="text-[11px] text-blue-400">
                        View All
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <CircularMetric
                        label="CPU Usage"
                        value="23%"
                        icon={Cpu}
                      />
                      <CircularMetric
                        label="RAM Usage"
                        value="45%"
                        icon={Activity}
                      />
                      <CircularMetric
                        label="Disk Usage"
                        value="32%"
                        icon={FolderOpen}
                      />
                    </div>

                    <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-3">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-500">Network</span>
                        <span className="text-cyan-300">12.4 KB/s</span>
                      </div>

                      <div className="mt-2 flex h-9 items-end gap-1">
                        {[22, 28, 18, 32, 25, 42, 27, 35, 19, 31, 24, 40, 30, 48, 36].map(
                          (height, index) => (
                            <div
                              key={index}
                              className="flex-1 rounded-t bg-gradient-to-t from-cyan-500/20 to-cyan-300/70"
                              style={{ height: `${height}%` }}
                            />
                          ),
                        )}
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-500">Memory Usage</span>
                        <span className="text-slate-400">6.2 GB / 16 GB</span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-900">
                        <div className="h-full w-[39%] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-500">Storage Usage</span>
                        <span className="text-slate-400">256 GB / 512 GB</span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-900">
                        <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <div className="rounded-lg border border-white/[0.05] bg-white/[0.015] p-2">
                        <p className="text-[9px] text-slate-600">Temperature</p>
                        <p className="mt-1 text-xs text-white">42°C</p>
                      </div>
                      <div className="rounded-lg border border-white/[0.05] bg-white/[0.015] p-2">
                        <p className="text-[9px] text-slate-600">Fan Speed</p>
                        <p className="mt-1 text-xs text-white">1200 RPM</p>
                      </div>
                      <div className="rounded-lg border border-white/[0.05] bg-white/[0.015] p-2">
                        <p className="text-[9px] text-slate-600">Power Mode</p>
                        <p className="mt-1 text-xs text-white">Balanced</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-white/[0.08] bg-slate-950/55 p-3.5">
                    <div className="flex items-center justify-between px-1 pb-3">
                      <h2 className="text-sm font-medium text-white">
                        Quick Actions
                      </h2>
                      <button className="text-[11px] text-blue-400">
                        Customize
                      </button>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {quickActions.map(({ label, icon: Icon }) => (
                        <button
                          key={label}
                          className="flex min-h-[65px] flex-col items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.018] px-1 text-center transition hover:-translate-y-0.5 hover:border-violet-400/20 hover:bg-violet-500/[0.06]"
                        >
                          <Icon size={18} className="text-cyan-300" />
                          <span className="text-[9px] text-slate-300">
                            {label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/[0.08] bg-slate-950/55 p-3.5">
                    <div className="flex items-center justify-between px-1 pb-3">
                      <h2 className="text-sm font-medium text-white">
                        Active Automations
                      </h2>
                      <button className="text-[11px] text-blue-400">
                        View All
                      </button>
                    </div>

                    <div className="space-y-1">
                      {automations.map(({ title, description, schedule, icon: Icon }) => (
                        <div
                          key={title}
                          className="flex items-center gap-2.5 rounded-xl border border-transparent bg-white/[0.015] p-2 transition hover:border-white/[0.06]"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
                            <Icon size={15} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[11px] font-medium text-slate-300">
                              {title}
                            </p>
                            <p className="truncate text-[9px] text-slate-600">
                              {description}
                            </p>
                          </div>

                          <span className="hidden text-[9px] text-slate-600 sm:block">
                            {schedule}
                          </span>

                          <span className="rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[8px] text-emerald-400">
                            Ready
                          </span>

                          <button
                            aria-label={`${title} options`}
                            className="text-slate-600 hover:text-slate-300"
                          >
                            <MoreVertical size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <footer className="mt-6 flex flex-col gap-2 border-t border-white/[0.05] pt-4 text-[9px] uppercase tracking-[0.18em] text-slate-700 sm:flex-row sm:items-center sm:justify-between">
                <span>Nexus AI</span>
                <span className="flex items-center gap-2">
                  <Wifi size={11} />
                  Interface ready · Runtime state provided by backend
                </span>
              </footer>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

