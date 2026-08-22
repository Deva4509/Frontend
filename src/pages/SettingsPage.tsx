import { useState } from 'react'
import {
  Bell,
  ChevronRight,
  Cpu,
  Database,
  Eye,
  Globe2,
  KeyRound,
  Lock,
  Monitor,
  Palette,
  Save,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  UserRound,
  Volume2,
  Wifi,
} from 'lucide-react'

type SettingsSection =
  | 'general'
  | 'appearance'
  | 'ai'
  | 'voice'
  | 'notifications'
  | 'privacy'
  | 'security'
  | 'integrations'

const sections: Array<{
  id: SettingsSection
  label: string
  description: string
  icon: typeof Settings2
}> = [
  {
    id: 'general',
    label: 'General',
    description: 'Workspace preferences',
    icon: Settings2,
  },
  {
    id: 'appearance',
    label: 'Appearance',
    description: 'Theme and interface',
    icon: Palette,
  },
  {
    id: 'ai',
    label: 'AI & Models',
    description: 'Intelligence configuration',
    icon: Cpu,
  },
  {
    id: 'voice',
    label: 'Voice',
    description: 'Speech and audio',
    icon: Volume2,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    description: 'Alerts and updates',
    icon: Bell,
  },
  {
    id: 'privacy',
    label: 'Privacy',
    description: 'Data and memory',
    icon: Lock,
  },
  {
    id: 'security',
    label: 'Security',
    description: 'Protection and access',
    icon: ShieldCheck,
  },
  {
    id: 'integrations',
    label: 'Integrations',
    description: 'Connected services',
    icon: Globe2,
  },
]

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative h-6 w-11 shrink-0 rounded-full border transition ${
        enabled
          ? 'border-violet-400/50 bg-violet-600/70'
          : 'border-white/10 bg-white/[0.05]'
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full transition ${
          enabled
            ? 'left-6 bg-white shadow-[0_0_12px_rgba(139,92,246,0.8)]'
            : 'left-1 bg-slate-500'
        }`}
      />
    </button>
  )
}

function SettingRow({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: typeof Settings2
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-white/[0.06] py-5 last:border-b-0">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025]">
          <Icon size={16} className="text-slate-400" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-200">
            {title}
          </p>

          <p className="mt-0.5 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      {children}
    </div>
  )
}

function SectionHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  )
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>('general')

  const [settings, setSettings] = useState({
    compactMode: false,
    animations: true,
    soundEffects: true,
    autoStart: true,
    notifications: true,
    taskCompletion: true,
    memory: true,
    localProcessing: true,
    telemetry: false,
    twoFactor: true,
  })

  const [saved, setSaved] = useState(false)

  const update = (key: keyof typeof settings, value: boolean) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }))
    setSaved(false)
  }

  const saveSettings = () => {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2200)
  }

  const active =
    sections.find((section) => section.id === activeSection) ??
    sections[0]

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <header className="sticky top-0 z-20 flex h-[62px] items-center justify-between border-b border-white/[0.07] bg-[#030712]/90 px-7 backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/[0.08]">
            <SlidersHorizontal
              size={18}
              className="text-violet-300"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Settings
            </p>
            <p className="text-[10px] text-slate-500">
              Configure your Nexus workspace
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.04] px-3 py-2 text-[10px] text-emerald-400 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Settings synchronized
          </div>

          <button
            type="button"
            onClick={saveSettings}
            className="flex items-center gap-2 rounded-xl border border-violet-400/30 bg-violet-600/20 px-4 py-2 text-xs font-semibold text-violet-100 transition hover:bg-violet-600/30"
          >
            <Save size={14} />
            {saved ? 'Saved' : 'Save Changes'}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-7 py-8">
        <div className="mb-8">
          <p className="text-[10px] font-semibold tracking-[0.22em] text-cyan-400">
            NEXUS CONFIGURATION
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            Workspace Settings
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Manage your Nexus AI experience, intelligence engines,
            privacy controls and connected services.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-white/[0.07] bg-[#070d1c]/80 p-3">
            <div className="mb-3 px-3 py-2">
              <p className="text-[9px] font-medium tracking-[0.18em] text-slate-600">
                CONFIGURATION
              </p>
            </div>

            <nav className="space-y-1">
              {sections.map(({ id, label, description, icon: Icon }) => {
                const selected = id === activeSection

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveSection(id)}
                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                      selected
                        ? 'border border-violet-400/30 bg-violet-600/20'
                        : 'border border-transparent hover:bg-white/[0.035]'
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        selected
                          ? 'bg-violet-500/15 text-violet-300'
                          : 'bg-white/[0.025] text-slate-500'
                      }`}
                    >
                      <Icon size={15} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-xs font-medium ${
                          selected
                            ? 'text-white'
                            : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      >
                        {label}
                      </p>

                      <p className="mt-0.5 truncate text-[10px] text-slate-600">
                        {description}
                      </p>
                    </div>

                    {selected && (
                      <ChevronRight
                        size={14}
                        className="text-violet-300"
                      />
                    )}
                  </button>
                )
              })}
            </nav>

            <div className="mt-5 rounded-xl border border-white/[0.06] bg-[#050a17] p-3">
              <div className="flex items-center gap-2">
                <Wifi size={13} className="text-emerald-400" />
                <span className="text-[10px] font-medium text-slate-300">
                  Nexus Runtime
                </span>
              </div>

              <p className="mt-2 text-[10px] leading-5 text-slate-600">
                All core services are connected and ready.
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-[9px] text-slate-600">
                  Version
                </span>
                <span className="text-[9px] text-emerald-400">
                  v0.3.0
                </span>
              </div>
            </div>
          </aside>

          <main className="min-w-0">
            <div className="rounded-2xl border border-white/[0.07] bg-[#070d1c]/80 p-6">
              <div className="mb-6 flex items-start justify-between gap-4 border-b border-white/[0.06] pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/[0.08]">
                    <active.icon
                      size={19}
                      className="text-violet-300"
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {active.label}
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      {active.description}
                    </p>
                  </div>
                </div>

                <span className="hidden rounded-full border border-emerald-400/10 bg-emerald-400/[0.04] px-3 py-1.5 text-[9px] text-emerald-400 sm:block">
                  Active
                </span>
              </div>

              {activeSection === 'general' && (
                <>
                  <SectionHeader
                    title="General Preferences"
                    description="Control the basic behavior of your Nexus workspace."
                  />

                  <SettingRow
                    icon={UserRound}
                    title="Workspace Profile"
                    description="Manage your display name and assistant identity."
                  >
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-xs text-slate-300"
                    >
                      Rudraksh
                      <ChevronRight size={13} />
                    </button>
                  </SettingRow>

                  <SettingRow
                    icon={Monitor}
                    title="Launch Nexus on startup"
                    description="Start the Nexus workspace automatically."
                  >
                    <Toggle
                      enabled={settings.autoStart}
                      onChange={(value) => update('autoStart', value)}
                    />
                  </SettingRow>

                  <SettingRow
                    icon={SlidersHorizontal}
                    title="Compact Mode"
                    description="Use denser spacing throughout the workspace."
                  >
                    <Toggle
                      enabled={settings.compactMode}
                      onChange={(value) =>
                        update('compactMode', value)
                      }
                    />
                  </SettingRow>

                  <SettingRow
                    icon={Sparkles}
                    title="Interface Animations"
                    description="Enable motion effects and interface transitions."
                  >
                    <Toggle
                      enabled={settings.animations}
                      onChange={(value) =>
                        update('animations', value)
                      }
                    />
                  </SettingRow>
                </>
              )}

              {activeSection === 'appearance' && (
                <>
                  <SectionHeader
                    title="Appearance"
                    description="Customize how Nexus looks and feels."
                  />

                  <SettingRow
                    icon={Palette}
                    title="Theme"
                    description="Nexus currently uses the optimized dark interface."
                  >
                    <select className="rounded-lg border border-white/[0.08] bg-[#080e1d] px-3 py-2 text-xs text-slate-300 outline-none">
                      <option>Cosmic Dark</option>
                      <option>System</option>
                    </select>
                  </SettingRow>

                  <SettingRow
                    icon={Sparkles}
                    title="Visual Effects"
                    description="Enable glowing surfaces and ambient interface effects."
                  >
                    <Toggle
                      enabled={settings.animations}
                      onChange={(value) =>
                        update('animations', value)
                      }
                    />
                  </SettingRow>

                  <SettingRow
                    icon={Monitor}
                    title="Compact Interface"
                    description="Reduce spacing to show more workspace content."
                  >
                    <Toggle
                      enabled={settings.compactMode}
                      onChange={(value) =>
                        update('compactMode', value)
                      }
                    />
                  </SettingRow>
                </>
              )}

              {activeSection === 'ai' && (
                <>
                  <SectionHeader
                    title="AI & Models"
                    description="Configure Nexus intelligence and processing."
                  />

                  <SettingRow
                    icon={Cpu}
                    title="Primary AI Engine"
                    description="Select the model provider used by Nexus."
                  >
                    <select className="rounded-lg border border-white/[0.08] bg-[#080e1d] px-3 py-2 text-xs text-slate-300 outline-none">
                      <option>Nexus AI Core</option>
                      <option>Ollama Local</option>
                      <option>Custom Provider</option>
                    </select>
                  </SettingRow>

                  <SettingRow
                    icon={Database}
                    title="Long-Term Memory"
                    description="Allow Nexus to retain useful workspace context."
                  >
                    <Toggle
                      enabled={settings.memory}
                      onChange={(value) => update('memory', value)}
                    />
                  </SettingRow>

                  <SettingRow
                    icon={Cpu}
                    title="Local Processing"
                    description="Prefer local processing whenever available."
                  >
                    <Toggle
                      enabled={settings.localProcessing}
                      onChange={(value) =>
                        update('localProcessing', value)
                      }
                    />
                  </SettingRow>

                  <SettingRow
                    icon={KeyRound}
                    title="API Configuration"
                    description="Manage external AI provider credentials."
                  >
                    <button
                      type="button"
                      className="rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-xs text-slate-300"
                    >
                      Manage
                    </button>
                  </SettingRow>
                </>
              )}

              {activeSection === 'voice' && (
                <>
                  <SectionHeader
                    title="Voice"
                    description="Configure speech recognition and audio output."
                  />

                  <SettingRow
                    icon={Volume2}
                    title="Voice Responses"
                    description="Allow Nexus to respond using speech."
                  >
                    <Toggle
                      enabled={settings.soundEffects}
                      onChange={(value) =>
                        update('soundEffects', value)
                      }
                    />
                  </SettingRow>

                  <SettingRow
                    icon={Volume2}
                    title="Voice Engine"
                    description="Select the active text-to-speech engine."
                  >
                    <select className="rounded-lg border border-white/[0.08] bg-[#080e1d] px-3 py-2 text-xs text-slate-300 outline-none">
                      <option>Nexus Voice</option>
                      <option>Piper</option>
                      <option>Edge TTS</option>
                    </select>
                  </SettingRow>

                  <SettingRow
                    icon={Wifi}
                    title="Wake Word"
                    description="Allow the assistant to listen for its wake phrase."
                  >
                    <button
                      type="button"
                      className="rounded-lg border border-emerald-400/20 bg-emerald-400/[0.05] px-3 py-2 text-xs text-emerald-400"
                    >
                      Configure
                    </button>
                  </SettingRow>
                </>
              )}

              {activeSection === 'notifications' && (
                <>
                  <SectionHeader
                    title="Notifications"
                    description="Choose which Nexus events should notify you."
                  />

                  <SettingRow
                    icon={Bell}
                    title="Notifications"
                    description="Enable Nexus workspace notifications."
                  >
                    <Toggle
                      enabled={settings.notifications}
                      onChange={(value) =>
                        update('notifications', value)
                      }
                    />
                  </SettingRow>

                  <SettingRow
                    icon={Sparkles}
                    title="Task Completion"
                    description="Notify when Nexus finishes a task."
                  >
                    <Toggle
                      enabled={settings.taskCompletion}
                      onChange={(value) =>
                        update('taskCompletion', value)
                      }
                    />
                  </SettingRow>

                  <SettingRow
                    icon={Volume2}
                    title="Notification Sounds"
                    description="Play sounds for important notifications."
                  >
                    <Toggle
                      enabled={settings.soundEffects}
                      onChange={(value) =>
                        update('soundEffects', value)
                      }
                    />
                  </SettingRow>
                </>
              )}

              {activeSection === 'privacy' && (
                <>
                  <SectionHeader
                    title="Privacy"
                    description="Control how Nexus stores and processes your information."
                  />

                  <SettingRow
                    icon={Database}
                    title="Conversation Memory"
                    description="Store useful conversation context for future assistance."
                  >
                    <Toggle
                      enabled={settings.memory}
                      onChange={(value) => update('memory', value)}
                    />
                  </SettingRow>

                  <SettingRow
                    icon={Lock}
                    title="Local Data Processing"
                    description="Keep supported processing on your device."
                  >
                    <Toggle
                      enabled={settings.localProcessing}
                      onChange={(value) =>
                        update('localProcessing', value)
                      }
                    />
                  </SettingRow>

                  <SettingRow
                    icon={Eye}
                    title="Usage Analytics"
                    description="Share anonymous product usage information."
                  >
                    <Toggle
                      enabled={settings.telemetry}
                      onChange={(value) =>
                        update('telemetry', value)
                      }
                    />
                  </SettingRow>
                </>
              )}

              {activeSection === 'security' && (
                <>
                  <SectionHeader
                    title="Security"
                    description="Protect your Nexus workspace and connected data."
                  />

                  <SettingRow
                    icon={ShieldCheck}
                    title="Workspace Protection"
                    description="Core Nexus security services are operational."
                  >
                    <span className="text-xs font-medium text-emerald-400">
                      Protected
                    </span>
                  </SettingRow>

                  <SettingRow
                    icon={Lock}
                    title="Two-Factor Authentication"
                    description="Add an additional authentication layer."
                  >
                    <Toggle
                      enabled={settings.twoFactor}
                      onChange={(value) =>
                        update('twoFactor', value)
                      }
                    />
                  </SettingRow>

                  <SettingRow
                    icon={KeyRound}
                    title="Access Keys"
                    description="Manage API keys and workspace credentials."
                  >
                    <button
                      type="button"
                      className="rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-xs text-slate-300"
                    >
                      Manage Keys
                    </button>
                  </SettingRow>
                </>
              )}

              {activeSection === 'integrations' && (
                <>
                  <SectionHeader
                    title="Integrations"
                    description="Manage services connected to your Nexus workspace."
                  />

                  {[
                    {
                      icon: Globe2,
                      name: 'Web Services',
                      description: 'Search and online information',
                      status: 'Connected',
                    },
                    {
                      icon: Wifi,
                      name: 'Workspace Runtime',
                      description: 'Nexus local runtime connection',
                      status: 'Connected',
                    },
                    {
                      icon: KeyRound,
                      name: 'API Providers',
                      description: 'External model and service providers',
                      status: 'Configure',
                    },
                  ].map(
                    ({
                      icon: Icon,
                      name,
                      description,
                      status,
                    }) => (
                      <SettingRow
                        key={name}
                        icon={Icon}
                        title={name}
                        description={description}
                      >
                        <button
                          type="button"
                          className={`rounded-lg border px-3 py-2 text-xs ${
                            status === 'Connected'
                              ? 'border-emerald-400/15 bg-emerald-400/[0.04] text-emerald-400'
                              : 'border-white/[0.08] bg-white/[0.025] text-slate-300'
                          }`}
                        >
                          {status}
                        </button>
                      </SettingRow>
                    ),
                  )}
                </>
              )}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  label: 'Security',
                  value: 'Protected',
                },
                {
                  icon: Database,
                  label: 'Memory',
                  value: '12,946 items',
                },
                {
                  icon: Cpu,
                  label: 'AI Core',
                  value: 'Operational',
                },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/[0.07] bg-[#070d1c]/70 p-4"
                >
                  <div className="flex items-center gap-2">
                    <Icon size={14} className="text-violet-300" />
                    <span className="text-[10px] uppercase tracking-[0.12em] text-slate-600">
                      {label}
                    </span>
                  </div>

                  <p className="mt-3 text-sm font-medium text-slate-200">
                    {value}
                  </p>

                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[9px] text-emerald-400">
                      Operational
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
