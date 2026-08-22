import { useState } from 'react'
import {
  Activity,
  BarChart3,
  Bot,
  CalendarDays,
  ChevronDown,
  Clock3,
  Download,
  Gauge,
  HeartPulse,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  CheckCircle2,
} from 'lucide-react'

type Range = '7 days' | '30 days' | '90 days'

interface MetricCardProps {
  label: string
  value: string
  change: string
  icon: React.ComponentType<{ size?: number }>
  iconClass: string
}

const chartSets: Record<Range, number[]> = {
  '7 days': [42, 58, 51, 76, 68, 84, 92],
  '30 days': [34, 48, 43, 61, 55, 70, 64, 78, 73, 86],
  '90 days': [28, 36, 33, 45, 42, 51, 48, 58, 54, 66],
}

const chartLabels: Record<Range, string[]> = {
  '7 days': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  '30 days': ['1', '4', '7', '10', '13', '16', '19', '22', '25', '28'],
  '90 days': ['May', 'May', 'Jun', 'Jun', 'Jul', 'Jul', 'Aug', 'Aug', 'Aug', 'Aug'],
}

const usageItems = [
  {
    name: 'Chat',
    value: 42,
    count: '1,284',
    icon: MessageSquare,
    className: 'text-violet-300 bg-violet-500/10',
  },
  {
    name: 'Automation',
    value: 27,
    count: '824',
    icon: Zap,
    className: 'text-cyan-300 bg-cyan-500/10',
  },
  {
    name: 'Voice',
    value: 18,
    count: '548',
    icon: Bot,
    className: 'text-emerald-300 bg-emerald-500/10',
  },
  {
    name: 'Vision',
    value: 13,
    count: '396',
    icon: Sparkles,
    className: 'text-blue-300 bg-blue-500/10',
  },
]

const systems = [
  ['AI Core', '99.9%'],
  ['Voice Engine', '99.7%'],
  ['Vision Engine', '99.5%'],
  ['Memory System', '99.8%'],
  ['Automation Engine', '99.6%'],
]

const recentEvents = [
  {
    title: 'Morning Briefing completed',
    description: 'Automation executed successfully',
    time: '8 min ago',
    icon: Zap,
  },
  {
    title: 'New conversation started',
    description: 'Python Web Scraping Project',
    time: '24 min ago',
    icon: MessageSquare,
  },
  {
    title: 'Voice command processed',
    description: 'Task completed in 1.8 seconds',
    time: '41 min ago',
    icon: Bot,
  },
  {
    title: 'Memory indexed',
    description: '12 new memories stored',
    time: '1 hr ago',
    icon: Activity,
  },
]

function MetricCard({
  label,
  value,
  change,
  icon: Icon,
  iconClass,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#060c1c]/80 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-slate-600">
            {label}
          </p>

          <p className="mt-2 text-2xl font-semibold text-white">
            {value}
          </p>

          <div className="mt-2 flex items-center gap-1.5">
            <TrendingUp size={11} className="text-emerald-400" />
            <span className="text-[10px] text-emerald-400">
              {change}
            </span>
            <span className="text-[10px] text-slate-600">
              vs last period
            </span>
          </div>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={18} />
        </div>
      </div>
    </div>
  )
}

function ActivityChart({ range }: { range: Range }) {
  const values = chartSets[range]
  const labels = chartLabels[range]
  const maxValue = Math.max(...values)

  return (
    <div className="mt-6">
      <div className="flex h-[230px] items-end gap-2 sm:gap-4">
        {values.map((value, index) => {
          const height = Math.max(
            12,
            Math.round((value / maxValue) * 100),
          )

          return (
            <div
              key={`${labels[index]}-${index}`}
              className="flex h-full flex-1 flex-col justify-end"
            >
              <div className="mb-2 text-center text-[9px] text-slate-600">
                {value}
              </div>

              <div className="relative h-[190px] overflow-hidden rounded-t-xl bg-white/[0.025]">
                <div
                  className="absolute bottom-0 left-0 right-0 rounded-t-xl bg-gradient-to-t from-violet-600/60 via-violet-500/35 to-cyan-400/40 transition-all duration-500"
                  style={{ height: `${height}%` }}
                />

                <div className="absolute inset-x-0 top-0 h-px bg-white/[0.05]" />
                <div className="absolute inset-x-0 top-1/4 h-px bg-white/[0.04]" />
                <div className="absolute inset-x-0 top-1/2 h-px bg-white/[0.04]" />
                <div className="absolute inset-x-0 top-3/4 h-px bg-white/[0.04]" />
              </div>

              <div className="mt-2 text-center text-[9px] text-slate-600">
                {labels[index]}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  const [range, setRange] = useState<Range>('7 days')
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <header className="sticky top-0 z-20 flex h-[74px] items-center justify-between border-b border-white/[0.06] bg-[#030712]/95 px-6 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
            <BarChart3 size={19} />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Analytics
            </p>

            <p className="text-[10px] text-slate-600">
              Nexus performance insights
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex h-9 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 text-xs text-slate-300 hover:bg-white/[0.05]"
            >
              <CalendarDays size={14} />
              {range}
              <ChevronDown size={13} />
            </button>

            {open && (
              <div className="absolute right-0 top-11 z-50 w-32 rounded-xl border border-white/[0.08] bg-[#0a1022] p-1 shadow-2xl">
                {(['7 days', '30 days', '90 days'] as Range[]).map(
                  (option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setRange(option)
                        setOpen(false)
                      }}
                      className={`w-full rounded-lg px-3 py-2 text-left text-xs ${
                        range === option
                          ? 'bg-violet-500/15 text-violet-200'
                          : 'text-slate-400 hover:bg-white/[0.05] hover:text-white'
                      }`}
                    >
                      {option}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            className="flex h-9 items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500/10 px-3 text-xs font-medium text-violet-200 hover:bg-violet-500/15"
          >
            <Download size={14} />
            Export
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1450px] px-6 py-7">
        <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
              SYSTEM INTELLIGENCE
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Nexus Analytics
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Monitor usage, performance, automation activity and
              system health across your Nexus workspace.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Analytics engine operational
          </div>
        </section>

        <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Total Activity"
            value="3,052"
            change="+18.4%"
            icon={Activity}
            iconClass="bg-violet-500/10 text-violet-300"
          />

          <MetricCard
            label="AI Requests"
            value="3,052"
            change="+12.8%"
            icon={Bot}
            iconClass="bg-cyan-500/10 text-cyan-300"
          />

          <MetricCard
            label="Tasks Completed"
            value="1,846"
            change="+24.6%"
            icon={CheckCircle2}
            iconClass="bg-emerald-500/10 text-emerald-300"
          />

          <MetricCard
            label="System Uptime"
            value="99.8%"
            change="+0.2%"
            icon={HeartPulse}
            iconClass="bg-blue-500/10 text-blue-300"
          />
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.75fr)]">
          <div className="rounded-2xl border border-white/[0.07] bg-[#060c1c]/80 p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-violet-300" />

                  <h2 className="text-sm font-semibold">
                    Workspace Activity
                  </h2>
                </div>

                <p className="mt-1 text-[10px] text-slate-600">
                  Overall Nexus activity during the selected period.
                </p>
              </div>

              <span className="flex items-center gap-2 text-[10px] text-slate-500">
                <span className="h-2 w-2 rounded-full bg-violet-400" />
                Activity
              </span>
            </div>

            <ActivityChart range={range} />
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-[#060c1c]/80 p-5">
            <div className="flex items-center gap-2">
              <Gauge size={16} className="text-cyan-300" />

              <h2 className="text-sm font-semibold">
                Usage Breakdown
              </h2>
            </div>

            <p className="mt-1 text-[10px] text-slate-600">
              Where your Nexus activity is being used.
            </p>

            <div className="mt-6 space-y-5">
              {usageItems.map((item) => {
                const Icon = item.icon

                return (
                  <div key={item.name}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-lg ${item.className}`}
                        >
                          <Icon size={13} />
                        </div>

                        <span className="text-xs text-slate-300">
                          {item.name}
                        </span>
                      </div>

                      <span className="text-xs font-medium text-white">
                        {item.count}
                      </span>
                    </div>

                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.07] bg-[#060c1c]/80 p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <HeartPulse size={16} className="text-emerald-300" />

                  <h2 className="text-sm font-semibold">
                    System Performance
                  </h2>
                </div>

                <p className="mt-1 text-[10px] text-slate-600">
                  Current health across Nexus subsystems.
                </p>
              </div>

              <span className="rounded-full border border-emerald-400/10 bg-emerald-400/5 px-2 py-1 text-[9px] text-emerald-400">
                Healthy
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {systems.map(([name, value]) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.015] px-3 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.4)]" />

                    <span className="text-xs text-slate-300">
                      {name}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-[10px] text-emerald-400">
                      Operational
                    </span>

                    <span className="w-12 text-right text-xs font-semibold text-white">
                      {value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-[#060c1c]/80 p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Clock3 size={16} className="text-violet-300" />

                  <h2 className="text-sm font-semibold">
                    Recent Activity
                  </h2>
                </div>

                <p className="mt-1 text-[10px] text-slate-600">
                  Latest events recorded by Nexus.
                </p>
              </div>

              <button
                type="button"
                className="text-[10px] text-cyan-400 hover:text-cyan-300"
              >
                View All
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {recentEvents.map((event) => {
                const Icon = event.icon

                return (
                  <div
                    key={event.title}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.015] px-3 py-3"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                      <Icon size={15} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-slate-200">
                        {event.title}
                      </p>

                      <p className="mt-0.5 truncate text-[10px] text-slate-600">
                        {event.description}
                      </p>
                    </div>

                    <span className="shrink-0 text-[9px] text-slate-600">
                      {event.time}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ['Average Response', '1.24s', Gauge],
            ['Active Sessions', '12', Users],
            ['Automations Run', '824', Zap],
            ['Memory Operations', '2,481', Activity],
          ].map(([label, value, Icon]) => {
            const MetricIcon =
              Icon as React.ComponentType<{ size?: number }>

            return (
              <div
                key={String(label)}
                className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-[#060c1c]/70 px-4 py-4"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-slate-600">
                    {String(label)}
                  </p>

                  <p className="mt-1 text-lg font-semibold text-white">
                    {String(value)}
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-slate-400">
                  <MetricIcon size={16} />
                </div>
              </div>
            )
          })}
        </section>
      </main>
    </div>
  )
}
