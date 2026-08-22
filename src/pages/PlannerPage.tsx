import { useMemo, useState } from 'react'
import {
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Circle,
  Clock3,
  Flag,
  ListTodo,
  Plus,
  Search,
  Sparkles,
  Target,
  Trash2,
  X,
  Zap,
} from 'lucide-react'

import { useNavigationStore } from '../store/navigation'

type TaskPriority = 'High' | 'Medium' | 'Low'
type TaskStatus = 'Pending' | 'In Progress' | 'Completed'

interface PlannerTask {
  id: string
  title: string
  description: string
  due: string
  category: string
  priority: TaskPriority
  status: TaskStatus
}

const initialTasks: PlannerTask[] = [
  {
    id: 'planner-1',
    title: 'Complete Nexus frontend navigation',
    description:
      'Finish the shared navigation structure across all Nexus workspaces.',
    due: 'Today · 6:00 PM',
    category: 'Nexus',
    priority: 'High',
    status: 'In Progress',
  },
  {
    id: 'planner-2',
    title: 'Build Planner workspace',
    description:
      'Create the Planner dashboard with tasks, priorities and schedule.',
    due: 'Today · 8:00 PM',
    category: 'Development',
    priority: 'High',
    status: 'In Progress',
  },
  {
    id: 'planner-3',
    title: 'Review Memory workspace',
    description:
      'Verify memory navigation and workspace interactions.',
    due: 'Tomorrow · 10:00 AM',
    category: 'Nexus',
    priority: 'Medium',
    status: 'Pending',
  },
  {
    id: 'planner-4',
    title: 'Test Voice workspace',
    description:
      'Verify browser speech recognition and workspace navigation.',
    due: 'Tomorrow · 2:00 PM',
    category: 'Testing',
    priority: 'Medium',
    status: 'Pending',
  },
  {
    id: 'planner-5',
    title: 'Clean project documentation',
    description:
      'Review project notes and keep the development documentation current.',
    due: 'Friday · 4:00 PM',
    category: 'Documentation',
    priority: 'Low',
    status: 'Pending',
  },
  {
    id: 'planner-6',
    title: 'Frontend production build',
    description:
      'Run the final production build and verify there are no TypeScript errors.',
    due: 'Friday · 6:00 PM',
    category: 'Development',
    priority: 'High',
    status: 'Completed',
  },
]

const priorityStyles: Record<
  TaskPriority,
  {
    badge: string
  }
> = {
  High: {
    badge: 'border-red-400/20 bg-red-500/10 text-red-300',
  },
  Medium: {
    badge:
      'border-amber-400/20 bg-amber-500/10 text-amber-300',
  },
  Low: {
    badge:
      'border-cyan-400/20 bg-cyan-500/10 text-cyan-300',
  },
}

const statusStyles: Record<TaskStatus, string> = {
  Pending:
    'border-white/[0.08] bg-white/[0.025] text-slate-400',
  'In Progress':
    'border-violet-400/20 bg-violet-500/10 text-violet-300',
  Completed:
    'border-emerald-400/20 bg-emerald-500/10 text-emerald-300',
}

export default function PlannerPage() {
  const setCurrentView = useNavigationStore(
    (state) => state.setCurrentView,
  )

  const [tasks, setTasks] =
    useState<PlannerTask[]>(initialTasks)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] =
    useState<'All' | TaskStatus>('All')
  const [showCreatePanel, setShowCreatePanel] =
    useState(false)
  const [selectedTaskId, setSelectedTaskId] =
    useState<string | null>(initialTasks[0]?.id ?? null)

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDescription, setNewTaskDescription] =
    useState('')
  const [newTaskPriority, setNewTaskPriority] =
    useState<TaskPriority>('Medium')

  const filteredTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return tasks.filter((task) => {
      const matchesFilter =
        selectedFilter === 'All' ||
        task.status === selectedFilter

      if (!matchesFilter) {
        return false
      }

      if (!query) {
        return true
      }

      return [
        task.title,
        task.description,
        task.category,
        task.priority,
        task.status,
        task.due,
      ]
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
  }, [tasks, searchQuery, selectedFilter])

  const selectedTask =
    tasks.find((task) => task.id === selectedTaskId) ?? null

  const completedCount = tasks.filter(
    (task) => task.status === 'Completed',
  ).length

  const pendingCount = tasks.filter(
    (task) => task.status === 'Pending',
  ).length

  const inProgressCount = tasks.filter(
    (task) => task.status === 'In Progress',
  ).length

  const highPriorityCount = tasks.filter(
    (task) =>
      task.priority === 'High' &&
      task.status !== 'Completed',
  ).length

  const completionRate =
    tasks.length > 0
      ? Math.round((completedCount / tasks.length) * 100)
      : 0

  const toggleTaskStatus = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== id) {
          return task
        }

        return {
          ...task,
          status:
            task.status === 'Completed'
              ? 'Pending'
              : 'Completed',
        }
      }),
    )
  }

  const deleteTask = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id),
    )

    setSelectedTaskId((currentId) =>
      currentId === id ? null : currentId,
    )
  }

  const createTask = () => {
    const title = newTaskTitle.trim()

    if (!title) {
      return
    }

    const newTask: PlannerTask = {
      id: `planner-${Date.now()}`,
      title,
      description:
        newTaskDescription.trim() ||
        'New task created in the Nexus Planner.',
      due: 'Today · No time set',
      category: 'General',
      priority: newTaskPriority,
      status: 'Pending',
    }

    setTasks((currentTasks) => [
      newTask,
      ...currentTasks,
    ])

    setSelectedTaskId(newTask.id)
    setNewTaskTitle('')
    setNewTaskDescription('')
    setNewTaskPriority('Medium')
    setShowCreatePanel(false)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030712] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[28%] top-[-15%] h-[500px] w-[500px] rounded-full bg-violet-600/[0.08] blur-[130px]" />
        <div className="absolute bottom-[-15%] right-[10%] h-[420px] w-[420px] rounded-full bg-cyan-500/[0.05] blur-[120px]" />
      </div>

      <div className="relative flex min-h-screen flex-col">
        <header className="flex min-h-[70px] items-center justify-between border-b border-white/[0.06] px-5 sm:px-7 lg:px-9">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
              <ListTodo size={19} />
            </div>

            <div>
              <p className="text-sm font-medium tracking-wide text-white">
                Planner
              </p>
              <p className="text-[10px] text-slate-600">
                Organize your work
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowCreatePanel(true)}
            className="flex h-9 items-center gap-2 rounded-xl border border-violet-400/25 bg-violet-500/10 px-3 text-xs font-medium text-violet-200 transition hover:border-violet-300/40 hover:bg-violet-500/15"
          >
            <Plus size={15} />
            <span className="hidden sm:inline">
              New Task
            </span>
          </button>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1500px]">
            <section className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Total Tasks"
                value={tasks.length}
                icon={<ListTodo size={18} />}
                iconClass="bg-violet-500/10 text-violet-300"
              />

              <StatCard
                label="In Progress"
                value={inProgressCount}
                icon={<Zap size={18} />}
                iconClass="bg-cyan-500/10 text-cyan-300"
              />

              <StatCard
                label="Completed"
                value={completedCount}
                icon={<CheckCircle2 size={18} />}
                iconClass="bg-emerald-500/10 text-emerald-300"
              />

              <StatCard
                label="Completion"
                value={`${completionRate}%`}
                icon={<Target size={18} />}
                iconClass="bg-amber-500/10 text-amber-300"
              />
            </section>

            <section className="mb-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="rounded-2xl border border-white/[0.07] bg-[#07101f]/75 p-5 backdrop-blur-2xl">
                <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles
                        size={16}
                        className="text-violet-300"
                      />

                      <h1 className="text-lg font-medium text-white">
                        My Tasks
                      </h1>
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      Manage your priorities and upcoming work.
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
                        placeholder="Search tasks..."
                        className="h-9 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] pl-9 pr-3 text-xs text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/30 sm:w-52"
                      />
                    </div>

                    <div className="relative">
                      <select
                        value={selectedFilter}
                        onChange={(event) =>
                          setSelectedFilter(
                            event.target.value as
                              | 'All'
                              | TaskStatus,
                          )
                        }
                        className="h-9 appearance-none rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 pr-8 text-xs text-slate-300 outline-none focus:border-violet-400/30"
                      >
                        <option value="All">
                          All Tasks
                        </option>
                        <option value="Pending">
                          Pending
                        </option>
                        <option value="In Progress">
                          In Progress
                        </option>
                        <option value="Completed">
                          Completed
                        </option>
                      </select>

                      <ChevronDown
                        size={13}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {filteredTasks.map((task) => {
                    const isSelected =
                      task.id === selectedTaskId

                    return (
                      <div
                        key={task.id}
                        className={`group rounded-xl border p-3 transition ${
                          isSelected
                            ? 'border-violet-400/25 bg-violet-500/[0.06]'
                            : 'border-white/[0.055] bg-white/[0.015] hover:border-white/[0.10] hover:bg-white/[0.025]'
                        }`}
                      >
                        <div className="flex gap-3">
                          <button
                            type="button"
                            aria-label={
                              task.status === 'Completed'
                                ? 'Mark task pending'
                                : 'Complete task'
                            }
                            onClick={() =>
                              toggleTaskStatus(task.id)
                            }
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                              task.status === 'Completed'
                                ? 'border-emerald-400/40 bg-emerald-500/15 text-emerald-300'
                                : 'border-white/[0.14] text-transparent hover:border-violet-400/40'
                            }`}
                          >
                            {task.status === 'Completed' ? (
                              <Check size={12} />
                            ) : (
                              <Circle size={10} />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedTaskId(task.id)
                            }
                            className="min-w-0 flex-1 text-left"
                          >
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`text-sm font-medium ${
                                  task.status === 'Completed'
                                    ? 'text-slate-500 line-through'
                                    : 'text-slate-200'
                                }`}
                              >
                                {task.title}
                              </span>

                              <span
                                className={`rounded-full border px-2 py-0.5 text-[9px] ${priorityStyles[task.priority].badge}`}
                              >
                                {task.priority}
                              </span>

                              <span
                                className={`rounded-full border px-2 py-0.5 text-[9px] ${statusStyles[task.status]}`}
                              >
                                {task.status}
                              </span>
                            </div>

                            <p className="mt-1 truncate text-[11px] text-slate-600">
                              {task.description}
                            </p>

                            <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-slate-600">
                              <span className="flex items-center gap-1">
                                <Clock3 size={11} />
                                {task.due}
                              </span>

                              <span className="flex items-center gap-1">
                                <span className="text-slate-700">
                                  #
                                </span>
                                {task.category}
                              </span>
                            </div>
                          </button>

                          <button
                            type="button"
                            aria-label="Delete task"
                            onClick={() =>
                              deleteTask(task.id)
                            }
                            className="self-start rounded-lg p-1.5 text-slate-700 opacity-0 transition hover:bg-red-500/10 hover:text-red-300 group-hover:opacity-100"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    )
                  })}

                  {filteredTasks.length === 0 && (
                    <div className="rounded-xl border border-dashed border-white/[0.08] px-5 py-12 text-center">
                      <ListTodo
                        size={24}
                        className="mx-auto text-slate-700"
                      />

                      <p className="mt-3 text-sm text-slate-400">
                        No tasks found
                      </p>

                      <p className="mt-1 text-xs text-slate-600">
                        Try changing your search or filter.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <aside className="space-y-5">
                <div className="rounded-2xl border border-white/[0.07] bg-[#07101f]/75 p-5 backdrop-blur-2xl">
                  <div className="flex items-center gap-2">
                    <CalendarDays
                      size={16}
                      className="text-cyan-300"
                    />

                    <h2 className="text-sm font-medium text-white">
                      Today
                    </h2>
                  </div>

                  <div className="mt-4 space-y-3">
                    <MiniMetric
                      label="Active"
                      value={inProgressCount}
                      description="tasks currently in progress"
                      icon={<Zap size={13} />}
                      className="border-violet-400/15 bg-violet-500/[0.05] text-violet-300"
                    />

                    <MiniMetric
                      label="Priority"
                      value={highPriorityCount}
                      description="high-priority tasks remaining"
                      icon={<Flag size={13} />}
                      className="border-white/[0.06] bg-white/[0.02] text-red-300"
                    />

                    <MiniMetric
                      label="Pending"
                      value={pendingCount}
                      description="tasks waiting to be completed"
                      icon={<CheckCircle2 size={13} />}
                      className="border-white/[0.06] bg-white/[0.02] text-emerald-300"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-[#07101f]/75 p-5 backdrop-blur-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-slate-600">
                        Progress
                      </p>

                      <p className="mt-1 text-sm font-medium text-white">
                        Weekly completion
                      </p>
                    </div>

                    <span className="text-sm font-semibold text-violet-300">
                      {completionRate}%
                    </span>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.05]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all"
                      style={{
                        width: `${completionRate}%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-[10px] text-slate-600">
                    {completedCount} of {tasks.length} tasks
                    completed
                  </p>
                </div>
              </aside>
            </section>

            {selectedTask && (
              <section className="rounded-2xl border border-white/[0.07] bg-[#07101f]/75 p-5 backdrop-blur-2xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-violet-300">
                        Selected Task
                      </span>

                      <span
                        className={`rounded-full border px-2 py-1 text-[9px] ${priorityStyles[selectedTask.priority].badge}`}
                      >
                        {selectedTask.priority}
                      </span>
                    </div>

                    <h2 className="mt-3 text-base font-medium text-white">
                      {selectedTask.title}
                    </h2>

                    <p className="mt-2 max-w-3xl text-xs leading-6 text-slate-500">
                      {selectedTask.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label="Close task details"
                    onClick={() => setSelectedTaskId(null)}
                    className="rounded-lg p-2 text-slate-600 transition hover:bg-white/[0.04] hover:text-slate-300"
                  >
                    <X size={15} />
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      toggleTaskStatus(selectedTask.id)
                    }
                    className="flex h-9 items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 text-xs text-emerald-300 transition hover:bg-emerald-500/15"
                  >
                    <CheckCircle2 size={14} />

                    {selectedTask.status === 'Completed'
                      ? 'Mark Pending'
                      : 'Complete Task'}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      deleteTask(selectedTask.id)
                    }
                    className="flex h-9 items-center gap-2 rounded-xl border border-red-400/15 bg-red-500/[0.06] px-3 text-xs text-red-300 transition hover:bg-red-500/10"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>

      {showCreatePanel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/[0.09] bg-[#07101f] p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">
                  Create Task
                </p>

                <p className="mt-1 text-[10px] text-slate-600">
                  Add a new item to your planner.
                </p>
              </div>

              <button
                type="button"
                aria-label="Close create task panel"
                onClick={() => setShowCreatePanel(false)}
                className="rounded-lg p-2 text-slate-600 transition hover:bg-white/[0.04] hover:text-slate-300"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.12em] text-slate-500">
                  Task title
                </label>

                <input
                  value={newTaskTitle}
                  onChange={(event) =>
                    setNewTaskTitle(event.target.value)
                  }
                  placeholder="What needs to be done?"
                  autoFocus
                  className="h-11 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 text-sm text-white outline-none placeholder:text-slate-700 focus:border-violet-400/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.12em] text-slate-500">
                  Description
                </label>

                <textarea
                  value={newTaskDescription}
                  onChange={(event) =>
                    setNewTaskDescription(
                      event.target.value,
                    )
                  }
                  placeholder="Add some context..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-3 text-sm text-white outline-none placeholder:text-slate-700 focus:border-violet-400/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-[10px] uppercase tracking-[0.12em] text-slate-500">
                  Priority
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {(['Low', 'Medium', 'High'] as TaskPriority[]).map(
                    (priority) => (
                      <button
                        key={priority}
                        type="button"
                        onClick={() =>
                          setNewTaskPriority(priority)
                        }
                        className={`h-10 rounded-xl border text-xs transition ${
                          newTaskPriority === priority
                            ? priorityStyles[priority].badge
                            : 'border-white/[0.07] bg-white/[0.02] text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {priority}
                      </button>
                    ),
                  )}
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
                  onClick={createTask}
                  className="flex h-10 items-center gap-2 rounded-xl border border-violet-400/25 bg-violet-500/10 px-4 text-xs font-medium text-violet-200 transition hover:bg-violet-500/15"
                >
                  <Plus size={14} />
                  Create Task
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
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
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

function MiniMetric({
  label,
  value,
  description,
  icon,
  className,
}: {
  label: string
  value: number
  description: string
  icon: React.ReactNode
  className: string
}) {
  return (
    <div className={`rounded-xl border p-3 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.12em]">
          {label}
        </span>

        {icon}
      </div>

      <p className="mt-2 text-xl font-semibold text-white">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-slate-600">
        {description}
      </p>
    </div>
  )
}
