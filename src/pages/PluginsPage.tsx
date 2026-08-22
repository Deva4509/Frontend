import {
  CheckCircle2,
  Puzzle,
  Search,
  Settings,
  Store,
} from 'lucide-react'
import { useState } from 'react'

const plugins = [
  {
    name: 'Web Search',
    description: 'Search the web and retrieve current information.',
    category: 'Research',
    status: 'Connected',
  },
  {
    name: 'System Tools',
    description: 'Allow Nexus to interact with supported system tools.',
    category: 'System',
    status: 'Connected',
  },
  {
    name: 'Calendar',
    description: 'Manage schedules, events, and planned activities.',
    category: 'Productivity',
    status: 'Available',
  },
  {
    name: 'File Manager',
    description: 'Work with files and organize local workspace content.',
    category: 'Productivity',
    status: 'Available',
  },
]

export default function PluginsPage() {
  const [search, setSearch] = useState('')

  const filteredPlugins = plugins.filter((plugin) =>
    `${plugin.name} ${plugin.description} ${plugin.category}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <header className="sticky top-0 z-20 flex h-[88px] items-center justify-between border-b border-white/[0.06] bg-[#030712]/90 px-8 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
            <Puzzle size={21} />
          </div>

          <div>
            <h1 className="text-lg font-semibold">Plugins</h1>
            <p className="text-xs text-slate-500">
              Extend Nexus AI with additional capabilities
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2 text-xs text-slate-500 sm:flex">
            <Puzzle size={14} />
            {plugins.length} plugins
          </div>

          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 text-sm text-slate-300 transition hover:bg-white/[0.06]"
          >
            <Settings size={16} />
            Manage
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-8 py-10">
        <section className="mb-8">
          <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-cyan-400">
            EXTENSIBLE INTELLIGENCE
          </p>

          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight">
                Nexus Plugins
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                Connect tools and capabilities that allow Nexus AI to perform
                more useful tasks.
              </p>
            </div>

            <button
              type="button"
              className="flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(124,58,237,0.2)] transition hover:brightness-110"
            >
              <Store size={17} />
              Browse Plugins
            </button>
          </div>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/[0.07] bg-[#070d20]/80 p-5">
            <p className="text-xs text-slate-500">Installed</p>
            <p className="mt-2 text-3xl font-semibold">2</p>
            <p className="mt-1 text-xs text-emerald-400">
              Ready to use
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-[#070d20]/80 p-5">
            <p className="text-xs text-slate-500">Available</p>
            <p className="mt-2 text-3xl font-semibold">2</p>
            <p className="mt-1 text-xs text-slate-500">
              Can be connected
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-[#070d20]/80 p-5">
            <p className="text-xs text-slate-500">System Status</p>
            <p className="mt-2 flex items-center gap-2 text-3xl font-semibold">
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              Ready
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Plugin runtime operational
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-white/[0.07] bg-[#070d20]/70 p-5">
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#030712]/70 px-4">
            <Search size={18} className="text-slate-500" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search plugins..."
              className="h-12 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {filteredPlugins.map((plugin) => {
              const connected = plugin.status === 'Connected'

              return (
                <article
                  key={plugin.name}
                  className="rounded-2xl border border-white/[0.07] bg-[#050b1a]/80 p-5 transition hover:border-violet-400/20 hover:bg-white/[0.025]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                        <Puzzle size={20} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-100">
                          {plugin.name}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {plugin.category}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium ${
                        connected
                          ? 'bg-emerald-400/10 text-emerald-400'
                          : 'bg-slate-400/10 text-slate-400'
                      }`}
                    >
                      {connected && <CheckCircle2 size={11} />}
                      {plugin.status}
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-6 text-slate-400">
                    {plugin.description}
                  </p>

                  <button
                    type="button"
                    className="mt-5 w-full rounded-xl border border-white/[0.08] bg-white/[0.025] py-2.5 text-xs font-medium text-slate-300 transition hover:bg-white/[0.06]"
                  >
                    {connected ? 'Configure' : 'Connect'}
                  </button>
                </article>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
