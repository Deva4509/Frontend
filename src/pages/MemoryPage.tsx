import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  Brain,
  Check,
  ChevronDown,
  Clock3,
  Database,
  FileText,
  FolderOpen,
  Home,
  Lightbulb,
  Lock,
  MessageSquare,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Tag,
  Trash2,
  User,
} from 'lucide-react'
import { useMemoryStore, type MemoryItem, type MemoryType } from '../store/memory'
import { useNavigationStore } from '../store/navigation'

const initialMemories: MemoryItem[] = [
  {
    id: 'memory-1',
    title: 'Development preference',
    content:
      'Prefer complete updated files when changing project code and keep the project buildable after every step.',
    type: 'Preference',
    source: 'Nexus Conversation',
    created: 'Today',
    tags: ['development', 'workflow'],
    important: true,
  },
  {
    id: 'memory-2',
    title: 'Nexus AI project',
    content:
      'Nexus AI is being developed as a modular AI assistant with a professional futuristic interface.',
    type: 'Fact',
    source: 'Nexus Conversation',
    created: 'Today',
    tags: ['nexus', 'project'],
    important: true,
  },
  {
    id: 'memory-3',
    title: 'Frontend architecture',
    content:
      'The frontend currently uses React, TypeScript, Vite, Tailwind CSS, Zustand, Framer Motion and Lucide icons.',
    type: 'Fact',
    source: 'Project Workspace',
    created: 'Today',
    tags: ['frontend', 'react', 'typescript'],
    important: true,
  },
  {
    id: 'memory-4',
    title: 'Voice interface',
    content:
      'The Voice workspace supports browser speech recognition with English and Hindi language options.',
    type: 'Fact',
    source: 'Voice Workspace',
    created: 'Today',
    tags: ['voice', 'speech'],
    important: false,
  },
  {
    id: 'memory-5',
    title: 'Recent coding task',
    content:
      'Connect the Home dashboard composer so a submitted message opens inside the Chat workspace.',
    type: 'Task',
    source: 'Nexus Conversation',
    created: 'Today',
    tags: ['chat', 'navigation'],
    important: true,
  },
  {
    id: 'memory-6',
    title: 'Dashboard preference',
    content:
      'The Nexus interface uses a dark glassmorphism visual system with violet, blue and cyan accents.',
    type: 'Preference',
    source: 'Design System',
    created: 'Yesterday',
    tags: ['design', 'ui'],
    important: false,
  },
]

const memoryTypes: Array<{
  label: MemoryType
  icon: typeof Brain
}> = [
  { label: 'Conversation', icon: MessageSquare },
  { label: 'Preference', icon: User },
  { label: 'Fact', icon: Lightbulb },
  { label: 'Task', icon: Check },
  { label: 'Note', icon: FileText },
]

const navigation = [
  { label: 'Home', icon: Home },
  { label: 'Chat', icon: MessageSquare, view: 'chat' as const },
  { label: 'Voice', icon: Brain, view: 'voice' as const },
  { label: 'Vision', icon: FolderOpen },
  { label: 'Automation', icon: Sparkles },
  { label: 'Memory', icon: Brain, active: true },
  { label: 'Planner', icon: FileText },
  { label: 'Devices', icon: Database },
  { label: 'Plugins', icon: Tag },
  { label: 'Skills', icon: Lightbulb },
  { label: 'Files', icon: FolderOpen },
  { label: 'Analytics', icon: Database },
]

export default function MemoryPage() {
  const setCurrentView = useNavigationStore(
    (state) => state.setCurrentView,
  )

  const memories = useMemoryStore((state) => state.memories)
  const selectedMemoryId = useMemoryStore(
    (state) => state.selectedMemoryId,
  )
  const searchQuery = useMemoryStore(
    (state) => state.searchQuery,
  )
  const selectedType = useMemoryStore(
    (state) => state.selectedType,
  )

  const setMemories = useMemoryStore(
    (state) => state.setMemories,
  )
  const setSelectedMemoryId = useMemoryStore(
    (state) => state.setSelectedMemoryId,
  )
  const setSearchQuery = useMemoryStore(
    (state) => state.setSearchQuery,
  )
  const setSelectedType = useMemoryStore(
    (state) => state.setSelectedType,
  )
  const deleteMemory = useMemoryStore(
    (state) => state.deleteMemory,
  )

  const [showTypes, setShowTypes] = useState(false)

  useEffect(() => {
    if (memories.length === 0) {
      setMemories(initialMemories)
    }
  }, [memories.length, setMemories])

  const filteredMemories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return memories.filter((memory) => {
      const matchesType =
        selectedType === 'All' || memory.type === selectedType

      if (!query) {
        return matchesType
      }

      const haystack = [
        memory.title,
        memory.content,
        memory.source,
        memory.tags.join(' '),
      ]
        .join(' ')
        .toLowerCase()

      return matchesType && haystack.includes(query)
    })
  }, [memories, searchQuery, selectedType])

  const selectedMemory =
    memories.find(
      (memory) => memory.id === selectedMemoryId,
    ) ?? filteredMemories[0]

  const goHome = () => {
    setCurrentView('home')
  }

  return (
    <div className="relative z-[1] min-h-screen w-full overflow-hidden bg-[#030712] text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_20%,rgba(124,58,237,0.13),transparent_28%),radial-gradient(circle_at_75%_75%,rgba(6,182,212,0.07),transparent_30%)]" />

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
                Memory Workspace
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
                    } else if (label === 'Home') {
                      setCurrentView('home')
                    } else if (label === 'Memory') {
                      setCurrentView('memory')
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
              <ShieldCheck size={16} className="text-emerald-400" />
              <span className="text-xs text-slate-300">
                Memory protection active
              </span>
            </div>

            <p className="mt-2 text-[10px] leading-5 text-slate-600">
              Your saved context remains available to Nexus
              across conversations.
            </p>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="flex h-[70px] items-center gap-4 border-b border-white/[0.06] px-4 sm:px-6 lg:px-8">
            <button
              onClick={goHome}
              aria-label="Back to Home"
              className="flex h-9 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 text-xs text-slate-400 transition hover:border-violet-400/25 hover:text-white"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Home</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                <Brain size={18} />
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  Memory
                </p>
                <p className="text-[10px] text-slate-600">
                  Persistent intelligence
                </p>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[10px] text-slate-500 sm:flex">
                <Database size={13} />
                {memories.length} stored items
              </div>

              <button
                aria-label="Memory settings"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-500 transition hover:text-white"
              >
                <Settings size={16} />
              </button>
            </div>
          </header>

          <div className="h-[calc(100vh-70px)] overflow-y-auto">
            <div className="mx-auto max-w-[1450px] px-4 pb-8 pt-6 sm:px-6 lg:px-8">
              <section className="mb-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-300/70">
                  Persistent intelligence
                </p>

                <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                  Nexus Memory
                </h1>

                <p className="mt-2 max-w-[700px] text-sm leading-6 text-slate-500">
                  Review, search and manage the information Nexus
                  keeps available for future conversations.
                </p>
              </section>

              <section className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/[0.08] bg-slate-950/55 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                      <Brain size={19} />
                    </div>

                    <div>
                      <p className="text-[11px] text-slate-500">
                        Total Memories
                      </p>
                      <p className="mt-0.5 text-xl font-medium text-white">
                        {memories.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-slate-950/55 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                      <Sparkles size={19} />
                    </div>

                    <div>
                      <p className="text-[11px] text-slate-500">
                        Active Context
                      </p>
                      <p className="mt-0.5 text-xl font-medium text-white">
                        84%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-slate-950/55 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                      <ShieldCheck size={19} />
                    </div>

                    <div>
                      <p className="text-[11px] text-slate-500">
                        Storage Status
                      </p>
                      <p className="mt-0.5 text-xl font-medium text-white">
                        Protected
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mt-4 grid gap-4 2xl:grid-cols-[minmax(0,1fr)_390px]">
                <div className="min-w-0 rounded-2xl border border-white/[0.08] bg-slate-950/55 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative min-w-0 flex-1">
                      <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                      />

                      <input
                        aria-label="Search memories"
                        value={searchQuery}
                        onChange={(event) =>
                          setSearchQuery(event.target.value)
                        }
                        placeholder="Search memories..."
                        className="h-11 w-full rounded-xl border border-white/[0.07] bg-white/[0.02] pl-9 pr-3 text-xs text-white outline-none placeholder:text-slate-600 focus:border-violet-400/30"
                      />
                    </div>

                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowTypes((current) => !current)
                        }
                        className="flex h-11 min-w-[170px] items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 text-xs text-slate-300"
                      >
                        <span>
                          {selectedType === 'All'
                            ? 'All memory types'
                            : selectedType}
                        </span>

                        <ChevronDown
                          size={15}
                          className="text-slate-600"
                        />
                      </button>

                      {showTypes && (
                        <div className="absolute right-0 top-12 z-20 w-[210px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#09132c] shadow-2xl">
                          {[
                            'All',
                            ...memoryTypes.map(
                              (item) => item.label,
                            ),
                          ].map((type) => (
                            <button
                              key={type}
                              onClick={() => {
                                setSelectedType(
                                  type as MemoryType | 'All',
                                )
                                setShowTypes(false)
                              }}
                              className="flex w-full items-center justify-between px-3 py-3 text-xs text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
                            >
                              {type}

                              {type === selectedType && (
                                <Check
                                  size={14}
                                  className="text-cyan-300"
                                />
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    {filteredMemories.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-white/[0.08] px-4 py-10 text-center">
                        <Brain
                          size={22}
                          className="mx-auto text-slate-700"
                        />

                        <p className="mt-3 text-sm text-slate-500">
                          No memories found.
                        </p>

                        <p className="mt-1 text-[10px] text-slate-700">
                          Try another search or memory type.
                        </p>
                      </div>
                    ) : (
                      filteredMemories.map((memory) => (
                        <button
                          key={memory.id}
                          onClick={() =>
                            setSelectedMemoryId(memory.id)
                          }
                          className={`w-full rounded-xl border p-4 text-left transition ${
                            memory.id === selectedMemoryId
                              ? 'border-violet-400/20 bg-violet-500/[0.07]'
                              : 'border-white/[0.06] bg-white/[0.015] hover:border-white/[0.1] hover:bg-white/[0.025]'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
                              <Brain size={16} />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="truncate text-xs font-medium text-slate-200">
                                  {memory.title}
                                </p>

                                {memory.important && (
                                  <span className="rounded-md bg-amber-400/10 px-1.5 py-0.5 text-[8px] text-amber-300">
                                    Important
                                  </span>
                                )}
                              </div>

                              <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-slate-500">
                                {memory.content}
                              </p>

                              <div className="mt-2 flex flex-wrap items-center gap-2">
                                <span className="rounded-md border border-white/[0.05] bg-white/[0.02] px-1.5 py-0.5 text-[8px] text-slate-600">
                                  {memory.type}
                                </span>

                                {memory.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="flex items-center gap-1 text-[8px] text-slate-700"
                                  >
                                    <Tag size={9} />
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <span className="hidden shrink-0 text-[9px] text-slate-700 sm:block">
                              {memory.created}
                            </span>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>

                <aside className="space-y-4">
                  {selectedMemory ? (
                    <div className="rounded-2xl border border-white/[0.08] bg-slate-950/55 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-600">
                            Memory detail
                          </p>

                          <h2 className="mt-2 text-lg font-medium text-white">
                            {selectedMemory.title}
                          </h2>
                        </div>

                        <button
                          aria-label="Delete memory"
                          onClick={() =>
                            deleteMemory(selectedMemory.id)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-red-500/10 hover:text-red-300"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.018] p-4">
                        <p className="text-xs leading-6 text-slate-400">
                          {selectedMemory.content}
                        </p>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="rounded-xl border border-white/[0.05] bg-white/[0.015] p-3">
                          <p className="text-[9px] text-slate-700">
                            Type
                          </p>

                          <p className="mt-1 text-xs text-slate-300">
                            {selectedMemory.type}
                          </p>
                        </div>

                        <div className="rounded-xl border border-white/[0.05] bg-white/[0.015] p-3">
                          <p className="text-[9px] text-slate-700">
                            Source
                          </p>

                          <p className="mt-1 truncate text-xs text-slate-300">
                            {selectedMemory.source}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 rounded-xl border border-white/[0.05] bg-white/[0.015] p-3">
                        <div className="flex items-center gap-2 text-[10px] text-slate-600">
                          <Clock3 size={12} />
                          Created {selectedMemory.created}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {selectedMemory.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg border border-violet-400/10 bg-violet-500/[0.05] px-2 py-1 text-[9px] text-violet-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="rounded-2xl border border-cyan-400/10 bg-cyan-500/[0.025] p-4">
                    <div className="flex items-center gap-2">
                      <Lock size={15} className="text-cyan-300" />

                      <p className="text-xs font-medium text-slate-300">
                        Memory privacy
                      </p>
                    </div>

                    <p className="mt-3 text-[10px] leading-5 text-slate-600">
                      Memory controls are isolated from the active
                      conversation and can be managed independently.
                    </p>
                  </div>
                </aside>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
