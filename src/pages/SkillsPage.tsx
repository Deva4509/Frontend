import { useMemo, useState } from 'react'
import {
  Activity,
  Brain,
  Check,
  ChevronDown,
  Code2,
  FileText,
  Globe2,
  Lightbulb,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Terminal,
  ToggleLeft,
  ToggleRight,
  Trash2,
  WandSparkles,
  X,
  Zap,
} from 'lucide-react'

type SkillStatus = 'Enabled' | 'Disabled'

type SkillCategory =
  | 'All'
  | 'Productivity'
  | 'Developer'
  | 'Knowledge'
  | 'System'
  | 'Creative'

interface Skill {
  id: string
  name: string
  description: string
  category: Exclude<SkillCategory, 'All'>
  status: SkillStatus
  usage: number
  version: string
  icon: 'brain' | 'code' | 'globe' | 'terminal' | 'sparkles' | 'file'
}

const initialSkills: Skill[] = [
  {
    id: 'skill-web-search',
    name: 'Web Search',
    description:
      'Search the web and collect useful information from online sources.',
    category: 'Knowledge',
    status: 'Enabled',
    usage: 148,
    version: '1.4.0',
    icon: 'globe',
  },
  {
    id: 'skill-code-assistant',
    name: 'Code Assistant',
    description:
      'Understand, generate, debug and improve code across supported languages.',
    category: 'Developer',
    status: 'Enabled',
    usage: 96,
    version: '2.1.0',
    icon: 'code',
  },
  {
    id: 'skill-file-analysis',
    name: 'File Analysis',
    description:
      'Read, summarize and extract useful information from workspace files.',
    category: 'Productivity',
    status: 'Enabled',
    usage: 72,
    version: '1.2.0',
    icon: 'file',
  },
  {
    id: 'skill-system-control',
    name: 'System Control',
    description:
      'Interact with supported system actions and workspace utilities.',
    category: 'System',
    status: 'Enabled',
    usage: 54,
    version: '1.0.0',
    icon: 'terminal',
  },
  {
    id: 'skill-task-planning',
    name: 'Task Planning',
    description:
      'Break complex goals into structured steps and actionable tasks.',
    category: 'Productivity',
    status: 'Enabled',
    usage: 81,
    version: '1.7.0',
    icon: 'brain',
  },
  {
    id: 'skill-content-creator',
    name: 'Content Creator',
    description:
      'Create structured documents, ideas, outlines and creative content.',
    category: 'Creative',
    status: 'Enabled',
    usage: 43,
    version: '1.1.0',
    icon: 'sparkles',
  },
  {
    id: 'skill-terminal',
    name: 'Terminal Assistant',
    description:
      'Generate safe terminal workflows and help inspect development projects.',
    category: 'Developer',
    status: 'Disabled',
    usage: 31,
    version: '0.9.0',
    icon: 'terminal',
  },
  {
    id: 'skill-smart-notes',
    name: 'Smart Notes',
    description:
      'Turn conversations and ideas into organized notes and summaries.',
    category: 'Productivity',
    status: 'Disabled',
    usage: 18,
    version: '1.0.0',
    icon: 'file',
  },
]

const categories: SkillCategory[] = [
  'All',
  'Productivity',
  'Developer',
  'Knowledge',
  'System',
  'Creative',
]

const iconMap = {
  brain: Brain,
  code: Code2,
  globe: Globe2,
  terminal: Terminal,
  sparkles: Sparkles,
  file: FileText,
}

const categoryStyles: Record<
  Exclude<SkillCategory, 'All'>,
  string
> = {
  Productivity:
    'border-violet-400/20 bg-violet-500/10 text-violet-300',
  Developer:
    'border-cyan-400/20 bg-cyan-500/10 text-cyan-300',
  Knowledge:
    'border-blue-400/20 bg-blue-500/10 text-blue-300',
  System:
    'border-emerald-400/20 bg-emerald-500/10 text-emerald-300',
  Creative:
    'border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-300',
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>(initialSkills)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] =
    useState<SkillCategory>('All')
  const [selectedSkillId, setSelectedSkillId] =
    useState<string | null>(null)
  const [showCreatePanel, setShowCreatePanel] = useState(false)
  const [newSkillName, setNewSkillName] = useState('')
  const [newSkillDescription, setNewSkillDescription] =
    useState('')
  const [newSkillCategory, setNewSkillCategory] =
    useState<Exclude<SkillCategory, 'All'>>('Productivity')

  const enabledCount = skills.filter(
    (skill) => skill.status === 'Enabled',
  ).length

  const disabledCount = skills.filter(
    (skill) => skill.status === 'Disabled',
  ).length

  const totalUsage = skills.reduce(
    (total, skill) => total + skill.usage,
    0,
  )

  const categoriesUsed = new Set(
    skills.map((skill) => skill.category),
  ).size

  const filteredSkills = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return skills.filter((skill) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        skill.category === selectedCategory

      if (!matchesCategory) {
        return false
      }

      if (!query) {
        return true
      }

      return [
        skill.name,
        skill.description,
        skill.category,
        skill.status,
        skill.version,
      ]
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
  }, [skills, searchQuery, selectedCategory])

  const selectedSkill =
    skills.find((skill) => skill.id === selectedSkillId) ?? null

  const toggleSkill = (id: string) => {
    setSkills((currentSkills) =>
      currentSkills.map((skill) =>
        skill.id === id
          ? {
              ...skill,
              status:
                skill.status === 'Enabled'
                  ? 'Disabled'
                  : 'Enabled',
            }
          : skill,
      ),
    )
  }

  const deleteSkill = (id: string) => {
    setSkills((currentSkills) =>
      currentSkills.filter((skill) => skill.id !== id),
    )

    setSelectedSkillId((currentId) =>
      currentId === id ? null : currentId,
    )
  }

  const createSkill = () => {
    const name = newSkillName.trim()

    if (!name) {
      return
    }

    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name,
      description:
        newSkillDescription.trim() ||
        'Custom skill created in the Nexus Skill Engine.',
      category: newSkillCategory,
      status: 'Enabled',
      usage: 0,
      version: '1.0.0',
      icon: 'sparkles',
    }

    setSkills((currentSkills) => [
      newSkill,
      ...currentSkills,
    ])

    setSelectedSkillId(newSkill.id)
    setNewSkillName('')
    setNewSkillDescription('')
    setNewSkillCategory('Productivity')
    setShowCreatePanel(false)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030712] text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[28%] top-[-18%] h-[560px] w-[560px] rounded-full bg-violet-600/[0.08] blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[5%] h-[500px] w-[500px] rounded-full bg-cyan-500/[0.045] blur-[140px]" />
      </div>

      <div className="relative min-h-screen">
        <header className="flex min-h-[70px] items-center justify-between border-b border-white/[0.06] px-5 sm:px-7 lg:px-9">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
              <Lightbulb size={19} />
            </div>

            <div>
              <p className="text-sm font-medium tracking-wide text-white">
                Skills
              </p>

              <p className="text-[10px] text-slate-600">
                Extend Nexus intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden h-9 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 text-[10px] text-slate-500 sm:flex">
              <Zap size={13} className="text-cyan-300" />
              <span>{enabledCount} active</span>
            </div>

            <button
              type="button"
              onClick={() => setShowCreatePanel(true)}
              className="flex h-9 items-center gap-2 rounded-xl border border-violet-400/25 bg-violet-500/10 px-3 text-xs font-medium text-violet-200 transition hover:border-violet-300/40 hover:bg-violet-500/15"
            >
              <Plus size={15} />
              <span className="hidden sm:inline">
                Create Skill
              </span>
            </button>
          </div>
        </header>

        <main className="min-h-0 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1500px]">
            <section className="mb-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-400/80">
                Intelligent Extensions
              </p>

              <div className="mt-2 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    Nexus Skills
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Equip Nexus with specialized capabilities for
                    development, productivity, knowledge and
                    automation.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-slate-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Skill Engine operational
                </div>
              </div>
            </section>

            <section className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Total Skills"
                value={skills.length}
                icon={<Lightbulb size={18} />}
                iconClass="bg-violet-500/10 text-violet-300"
              />

              <StatCard
                label="Enabled"
                value={enabledCount}
                icon={<Check size={18} />}
                iconClass="bg-emerald-500/10 text-emerald-300"
              />

              <StatCard
                label="Skill Usage"
                value={totalUsage}
                icon={<Activity size={18} />}
                iconClass="bg-cyan-500/10 text-cyan-300"
              />

              <StatCard
                label="Categories"
                value={categoriesUsed}
                icon={<WandSparkles size={18} />}
                iconClass="bg-amber-500/10 text-amber-300"
              />
            </section>

            <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="rounded-2xl border border-white/[0.07] bg-[#07101f]/75 p-5 backdrop-blur-2xl">
                <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles
                        size={16}
                        className="text-violet-300"
                      />

                      <h2 className="text-base font-medium text-white">
                        Installed Skills
                      </h2>
                    </div>

                    <p className="mt-1 text-xs text-slate-600">
                      Manage the capabilities available to Nexus.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="relative">
                      <Search
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                      />

                      <input
                        value={searchQuery}
                        onChange={(event) =>
                          setSearchQuery(event.target.value)
                        }
                        placeholder="Search skills..."
                        className="h-9 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] pl-9 pr-3 text-xs text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/30 sm:w-52"
                      />
                    </div>

                    <div className="relative">
                      <select
                        value={selectedCategory}
                        onChange={(event) =>
                          setSelectedCategory(
                            event.target.value as SkillCategory,
                          )
                        }
                        className="h-9 appearance-none rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 pr-8 text-xs text-slate-300 outline-none focus:border-violet-400/30"
                      >
                        {categories.map((category) => (
                          <option
                            key={category}
                            value={category}
                          >
                            {category === 'All'
                              ? 'All Skills'
                              : category}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={13}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {filteredSkills.map((skill) => {
                    const Icon = iconMap[skill.icon]
                    const selected =
                      selectedSkillId === skill.id

                    return (
                      <div
                        key={skill.id}
                        className={`group rounded-2xl border p-4 transition ${
                          selected
                            ? 'border-violet-400/25 bg-violet-500/[0.055]'
                            : 'border-white/[0.055] bg-white/[0.015] hover:border-white/[0.10] hover:bg-white/[0.025]'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${categoryStyles[skill.category]}`}
                          >
                            <Icon size={18} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedSkillId(skill.id)
                                }
                                className="min-w-0 text-left"
                              >
                                <p className="truncate text-sm font-medium text-slate-200">
                                  {skill.name}
                                </p>

                                <p className="mt-1 text-[10px] text-slate-600">
                                  v{skill.version}
                                </p>
                              </button>

                              <button
                                type="button"
                                aria-label={
                                  skill.status === 'Enabled'
                                    ? `Disable ${skill.name}`
                                    : `Enable ${skill.name}`
                                }
                                onClick={() =>
                                  toggleSkill(skill.id)
                                }
                                className="shrink-0 text-slate-600 transition hover:text-violet-300"
                              >
                                {skill.status === 'Enabled' ? (
                                  <ToggleRight
                                    size={24}
                                    className="text-emerald-400"
                                  />
                                ) : (
                                  <ToggleLeft size={24} />
                                )}
                              </button>
                            </div>

                            <p className="mt-3 min-h-[42px] text-[11px] leading-5 text-slate-600">
                              {skill.description}
                            </p>

                            <div className="mt-4 flex items-center justify-between gap-2">
                              <span
                                className={`rounded-full border px-2 py-0.5 text-[9px] ${categoryStyles[skill.category]}`}
                              >
                                {skill.category}
                              </span>

                              <div className="flex items-center gap-2">
                                <span
                                  className={`flex items-center gap-1 text-[9px] ${
                                    skill.status === 'Enabled'
                                      ? 'text-emerald-400'
                                      : 'text-slate-600'
                                  }`}
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                  {skill.status}
                                </span>

                                <span className="text-[9px] text-slate-700">
                                  {skill.usage} uses
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {filteredSkills.length === 0 && (
                  <div className="rounded-xl border border-dashed border-white/[0.08] px-5 py-14 text-center">
                    <Lightbulb
                      size={25}
                      className="mx-auto text-slate-700"
                    />

                    <p className="mt-3 text-sm text-slate-400">
                      No skills found
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Try another search or category.
                    </p>
                  </div>
                )}
              </div>

              <aside className="space-y-5">
                <div className="rounded-2xl border border-white/[0.07] bg-[#07101f]/75 p-5 backdrop-blur-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-slate-600">
                        Runtime
                      </p>

                      <h2 className="mt-1 text-sm font-medium text-white">
                        Skill Engine
                      </h2>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-500/10 text-cyan-300">
                      <Brain size={17} />
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl border border-emerald-400/10 bg-emerald-500/[0.035] p-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.45)]" />

                      <span className="text-xs font-medium text-emerald-300">
                        Operational
                      </span>
                    </div>

                    <p className="mt-2 text-[10px] leading-5 text-slate-600">
                      Skills are loaded and ready for Nexus to
                      use.
                    </p>
                  </div>

                  <div className="mt-4 space-y-2">
                    <EngineRow
                      label="Enabled Skills"
                      value={`${enabledCount}/${skills.length}`}
                    />

                    <EngineRow
                      label="Categories"
                      value={String(categoriesUsed)}
                    />

                    <EngineRow
                      label="Disabled"
                      value={String(disabledCount)}
                    />

                    <EngineRow
                      label="Runtime"
                      value="Ready"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-[#07101f]/75 p-5 backdrop-blur-2xl">
                  <div className="flex items-center gap-2">
                    <Settings2
                      size={16}
                      className="text-violet-300"
                    />

                    <h2 className="text-sm font-medium text-white">
                      Skill Management
                    </h2>
                  </div>

                  <div className="mt-4 space-y-2">
                    <ManagementRow
                      icon={<Code2 size={14} />}
                      title="Developer"
                      value={
                        skills.filter(
                          (skill) =>
                            skill.category === 'Developer',
                        ).length
                      }
                    />

                    <ManagementRow
                      icon={<FileText size={14} />}
                      title="Productivity"
                      value={
                        skills.filter(
                          (skill) =>
                            skill.category === 'Productivity',
                        ).length
                      }
                    />

                    <ManagementRow
                      icon={<Globe2 size={14} />}
                      title="Knowledge"
                      value={
                        skills.filter(
                          (skill) =>
                            skill.category === 'Knowledge',
                        ).length
                      }
                    />

                    <ManagementRow
                      icon={<WandSparkles size={14} />}
                      title="Creative"
                      value={
                        skills.filter(
                          (skill) =>
                            skill.category === 'Creative',
                        ).length
                      }
                    />
                  </div>
                </div>

                {selectedSkill && (
                  <div className="rounded-2xl border border-violet-400/15 bg-violet-500/[0.035] p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.16em] text-violet-300">
                          Selected Skill
                        </p>

                        <h2 className="mt-2 text-sm font-medium text-white">
                          {selectedSkill.name}
                        </h2>
                      </div>

                      <button
                        type="button"
                        aria-label="Close selected skill"
                        onClick={() =>
                          setSelectedSkillId(null)
                        }
                        className="rounded-lg p-1.5 text-slate-600 transition hover:bg-white/[0.04] hover:text-slate-300"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <p className="mt-3 text-[10px] leading-5 text-slate-600">
                      {selectedSkill.description}
                    </p>

                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          toggleSkill(selectedSkill.id)
                        }
                        className="flex h-8 flex-1 items-center justify-center gap-2 rounded-lg border border-violet-400/20 bg-violet-500/10 text-[10px] text-violet-200 transition hover:bg-violet-500/15"
                      >
                        {selectedSkill.status === 'Enabled'
                          ? 'Disable'
                          : 'Enable'}
                      </button>

                      <button
                        type="button"
                        aria-label="Delete selected skill"
                        onClick={() =>
                          deleteSkill(selectedSkill.id)
                        }
                        className="flex h-8 w-9 items-center justify-center rounded-lg border border-red-400/15 bg-red-500/[0.05] text-red-300 transition hover:bg-red-500/10"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                )}
              </aside>
            </section>
          </div>
        </main>
      </div>

      {showCreatePanel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/[0.09] bg-[#07101f] p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">
                  Create Skill
                </p>

                <p className="mt-1 text-[10px] text-slate-600">
                  Add a custom capability to Nexus.
                </p>
              </div>

              <button
                type="button"
                aria-label="Close create skill panel"
                onClick={() => setShowCreatePanel(false)}
                className="rounded-lg p-2 text-slate-600 transition hover:bg-white/[0.04] hover:text-slate-300"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.12em] text-slate-500">
                  Skill name
                </label>

                <input
                  value={newSkillName}
                  onChange={(event) =>
                    setNewSkillName(event.target.value)
                  }
                  placeholder="e.g. GitHub Assistant"
                  autoFocus
                  className="h-11 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 text-sm text-white outline-none placeholder:text-slate-700 focus:border-violet-400/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.12em] text-slate-500">
                  Description
                </label>

                <textarea
                  value={newSkillDescription}
                  onChange={(event) =>
                    setNewSkillDescription(
                      event.target.value,
                    )
                  }
                  placeholder="What should this skill do?"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-3 text-sm text-white outline-none placeholder:text-slate-700 focus:border-violet-400/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.12em] text-slate-500">
                  Category
                </label>

                <div className="relative">
                  <select
                    value={newSkillCategory}
                    onChange={(event) =>
                      setNewSkillCategory(
                        event.target.value as Exclude<
                          SkillCategory,
                          'All'
                        >,
                      )
                    }
                    className="h-10 w-full appearance-none rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 pr-8 text-xs text-slate-300 outline-none focus:border-violet-400/30"
                  >
                    {categories
                      .filter((category) => category !== 'All')
                      .map((category) => (
                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>
                      ))}
                  </select>

                  <ChevronDown
                    size={13}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-600"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreatePanel(false)}
                  className="h-10 rounded-xl border border-white/[0.07] px-4 text-xs text-slate-500 transition hover:bg-white/[0.03] hover:text-slate-300"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={createSkill}
                  className="flex h-10 items-center gap-2 rounded-xl border border-violet-400/25 bg-violet-500/10 px-4 text-xs font-medium text-violet-200 transition hover:bg-violet-500/15"
                >
                  <Plus size={14} />
                  Create Skill
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

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
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-slate-600">
            {label}
          </p>

          <p className="mt-2 text-2xl font-semibold text-white">
            {value}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}

function EngineRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.04] py-2 last:border-0">
      <span className="text-[10px] text-slate-600">
        {label}
      </span>

      <span className="text-[10px] font-medium text-slate-300">
        {value}
      </span>
    </div>
  )
}

function ManagementRow({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode
  title: string
  value: number
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/[0.045] bg-white/[0.015] px-3 py-2.5">
      <div className="flex items-center gap-2">
        <span className="text-slate-600">{icon}</span>

        <span className="text-[10px] text-slate-500">
          {title}
        </span>
      </div>

      <span className="text-[10px] font-medium text-slate-300">
        {value}
      </span>
    </div>
  )
}
