import { useMemo, useState } from 'react'
import {
  Archive,
  Check,
  ChevronDown,
  Download,
  File,
  FileCode2,
  FileImage,
  FileSpreadsheet,
  FileText,
  Folder,
  FolderOpen,
  Grid2X2,
  List,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  Upload,
  X,
} from 'lucide-react'

type FileKind =
  | 'Document'
  | 'Image'
  | 'Code'
  | 'Spreadsheet'
  | 'Archive'

type WorkspaceFile = {
  id: string
  name: string
  kind: FileKind
  size: string
  modified: string
  extension: string
}

const initialFiles: WorkspaceFile[] = [
  {
    id: 'file-1',
    name: 'Nexus Project Overview',
    kind: 'Document',
    size: '2.4 MB',
    modified: 'Today · 11:42 AM',
    extension: 'PDF',
  },
  {
    id: 'file-2',
    name: 'HomePage.tsx',
    kind: 'Code',
    size: '18 KB',
    modified: 'Today · 10:18 AM',
    extension: 'TSX',
  },
  {
    id: 'file-3',
    name: 'Dashboard Preview',
    kind: 'Image',
    size: '1.8 MB',
    modified: 'Yesterday · 8:24 PM',
    extension: 'PNG',
  },
  {
    id: 'file-4',
    name: 'Nexus Tasks',
    kind: 'Spreadsheet',
    size: '46 KB',
    modified: 'Yesterday · 4:12 PM',
    extension: 'XLSX',
  },
  {
    id: 'file-5',
    name: 'PlannerPage.tsx',
    kind: 'Code',
    size: '24 KB',
    modified: 'Yesterday · 2:41 PM',
    extension: 'TSX',
  },
  {
    id: 'file-6',
    name: 'Design Assets',
    kind: 'Archive',
    size: '18.2 MB',
    modified: 'Aug 18 · 6:30 PM',
    extension: 'ZIP',
  },
  {
    id: 'file-7',
    name: 'Project Notes',
    kind: 'Document',
    size: '12 KB',
    modified: 'Aug 18 · 1:15 PM',
    extension: 'TXT',
  },
  {
    id: 'file-8',
    name: 'Nexus Orb',
    kind: 'Image',
    size: '842 KB',
    modified: 'Aug 17 · 9:02 PM',
    extension: 'WEBP',
  },
]

const categories = [
  { label: 'All Files', count: 8 },
  { label: 'Documents', count: 2 },
  { label: 'Images', count: 2 },
  { label: 'Code', count: 2 },
  { label: 'Spreadsheets', count: 1 },
  { label: 'Archives', count: 1 },
]

const kindIcons: Record<FileKind, typeof File> = {
  Document: FileText,
  Image: FileImage,
  Code: FileCode2,
  Spreadsheet: FileSpreadsheet,
  Archive,
}

const kindStyles: Record<FileKind, string> = {
  Document:
    'border-violet-400/20 bg-violet-500/10 text-violet-300',
  Image:
    'border-cyan-400/20 bg-cyan-500/10 text-cyan-300',
  Code:
    'border-emerald-400/20 bg-emerald-500/10 text-emerald-300',
  Spreadsheet:
    'border-amber-400/20 bg-amber-500/10 text-amber-300',
  Archive:
    'border-blue-400/20 bg-blue-500/10 text-blue-300',
}

export default function FilesPage() {
  const [files, setFiles] = useState<WorkspaceFile[]>(initialFiles)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] =
    useState('All Files')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedFileId, setSelectedFileId] =
    useState<string | null>(null)
  const [showCreateFolder, setShowCreateFolder] =
    useState(false)
  const [folderName, setFolderName] = useState('')

  const filteredFiles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return files.filter((file) => {
      const categoryMatch =
        selectedCategory === 'All Files' ||
        (selectedCategory === 'Documents' &&
          file.kind === 'Document') ||
        (selectedCategory === 'Images' &&
          file.kind === 'Image') ||
        (selectedCategory === 'Code' &&
          file.kind === 'Code') ||
        (selectedCategory === 'Spreadsheets' &&
          file.kind === 'Spreadsheet') ||
        (selectedCategory === 'Archives' &&
          file.kind === 'Archive')

      if (!categoryMatch) {
        return false
      }

      if (!query) {
        return true
      }

      return [
        file.name,
        file.kind,
        file.extension,
        file.size,
        file.modified,
      ]
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
  }, [files, searchQuery, selectedCategory])

  const selectedFile =
    files.find((file) => file.id === selectedFileId) ?? null

  const deleteFile = (id: string) => {
    setFiles((currentFiles) =>
      currentFiles.filter((file) => file.id !== id),
    )

    setSelectedFileId((currentId) =>
      currentId === id ? null : currentId,
    )
  }

  const createFolder = () => {
    const name = folderName.trim()

    if (!name) {
      return
    }

    setFolderName('')
    setShowCreateFolder(false)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030712] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[30%] top-[-18%] h-[520px] w-[520px] rounded-full bg-violet-600/[0.07] blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[8%] h-[440px] w-[440px] rounded-full bg-cyan-500/[0.045] blur-[125px]" />
      </div>

      <div className="relative min-h-screen">
        <header className="flex min-h-[70px] items-center justify-between border-b border-white/[0.06] px-5 sm:px-7 lg:px-9">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
              <FolderOpen size={19} />
            </div>

            <div>
              <p className="text-sm font-medium tracking-wide text-white">
                Files
              </p>

              <p className="text-[10px] text-slate-600">
                Workspace file manager
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowCreateFolder(true)}
              className="hidden h-9 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 text-xs text-slate-400 transition hover:bg-white/[0.05] hover:text-slate-200 sm:flex"
            >
              <Plus size={14} />
              New Folder
            </button>

            <button
              type="button"
              className="flex h-9 items-center gap-2 rounded-xl border border-violet-400/25 bg-violet-500/10 px-3 text-xs font-medium text-violet-200 transition hover:bg-violet-500/15"
            >
              <Upload size={14} />
              <span className="hidden sm:inline">
                Upload
              </span>
            </button>
          </div>
        </header>

        <main className="min-h-screen overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1500px]">
            <section className="mb-6">
              <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-400">
                    Workspace Storage
                  </p>

                  <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                    Nexus Files
                  </h1>

                  <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-500">
                    Organize documents, images, code and other
                    workspace files in one place.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-slate-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  File system operational
                </div>
              </div>
            </section>

            <section className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Total Files"
                value={files.length}
                icon={<File size={18} />}
                className="text-violet-300 bg-violet-500/10"
              />

              <StatCard
                label="Storage Used"
                value="24.7 GB"
                icon={<FolderOpen size={18} />}
                className="text-cyan-300 bg-cyan-500/10"
              />

              <StatCard
                label="Recent Files"
                value="4"
                icon={<FileText size={18} />}
                className="text-emerald-300 bg-emerald-500/10"
              />

              <StatCard
                label="Folders"
                value="12"
                icon={<Folder size={18} />}
                className="text-amber-300 bg-amber-500/10"
              />
            </section>

            <section className="grid gap-5 xl:grid-cols-[220px_minmax(0,1fr)_280px]">
              <aside className="rounded-2xl border border-white/[0.07] bg-[#07101f]/75 p-4 backdrop-blur-2xl">
                <div className="mb-4 flex items-center gap-2">
                  <FolderOpen
                    size={15}
                    className="text-violet-300"
                  />

                  <h2 className="text-xs font-medium text-white">
                    File Categories
                  </h2>
                </div>

                <div className="space-y-1">
                  {categories.map((category) => {
                    const active =
                      selectedCategory === category.label

                    return (
                      <button
                        key={category.label}
                        type="button"
                        onClick={() =>
                          setSelectedCategory(category.label)
                        }
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition ${
                          active
                            ? 'border border-violet-400/25 bg-violet-500/10 text-violet-200'
                            : 'text-slate-500 hover:bg-white/[0.035] hover:text-slate-300'
                        }`}
                      >
                        <span>{category.label}</span>

                        <span
                          className={
                            active
                              ? 'text-violet-300'
                              : 'text-slate-700'
                          }
                        >
                          {category.count}
                        </span>
                      </button>
                    )
                  })}
                </div>

                <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.12em] text-slate-600">
                      Storage
                    </span>

                    <span className="text-[10px] text-cyan-300">
                      24.7 / 100 GB
                    </span>
                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                      style={{ width: '24.7%' }}
                    />
                  </div>

                  <p className="mt-2 text-[9px] text-slate-700">
                    75.3 GB available
                  </p>
                </div>
              </aside>

              <div className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#07101f]/75 p-4 backdrop-blur-2xl sm:p-5">
                <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <FileText
                        size={16}
                        className="text-violet-300"
                      />

                      <h2 className="text-sm font-medium text-white">
                        My Files
                      </h2>
                    </div>

                    <p className="mt-1 text-[10px] text-slate-600">
                      {filteredFiles.length} files available
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative min-w-0 flex-1 sm:w-56 sm:flex-none">
                      <Search
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-700"
                      />

                      <input
                        value={searchQuery}
                        onChange={(event) =>
                          setSearchQuery(event.target.value)
                        }
                        placeholder="Search files..."
                        className="h-9 w-full rounded-xl border border-white/[0.07] bg-white/[0.02] pl-9 pr-3 text-xs text-white outline-none placeholder:text-slate-700 focus:border-violet-400/30"
                      />
                    </div>

                    <div className="flex h-9 items-center rounded-xl border border-white/[0.07] bg-white/[0.02] p-1">
                      <button
                        type="button"
                        aria-label="Grid view"
                        onClick={() => setViewMode('grid')}
                        className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${
                          viewMode === 'grid'
                            ? 'bg-violet-500/15 text-violet-300'
                            : 'text-slate-700 hover:text-slate-400'
                        }`}
                      >
                        <Grid2X2 size={14} />
                      </button>

                      <button
                        type="button"
                        aria-label="List view"
                        onClick={() => setViewMode('list')}
                        className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${
                          viewMode === 'list'
                            ? 'bg-violet-500/15 text-violet-300'
                            : 'text-slate-700 hover:text-slate-400'
                        }`}
                      >
                        <List size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {viewMode === 'grid' ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {filteredFiles.map((file) => (
                      <FileCard
                        key={file.id}
                        file={file}
                        selected={selectedFileId === file.id}
                        onSelect={() =>
                          setSelectedFileId(file.id)
                        }
                        onDelete={() => deleteFile(file.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredFiles.map((file) => (
                      <FileListItem
                        key={file.id}
                        file={file}
                        selected={selectedFileId === file.id}
                        onSelect={() =>
                          setSelectedFileId(file.id)
                        }
                        onDelete={() => deleteFile(file.id)}
                      />
                    ))}
                  </div>
                )}

                {filteredFiles.length === 0 && (
                  <div className="rounded-xl border border-dashed border-white/[0.08] px-5 py-14 text-center">
                    <File
                      size={25}
                      className="mx-auto text-slate-700"
                    />

                    <p className="mt-3 text-sm text-slate-400">
                      No files found
                    </p>

                    <p className="mt-1 text-[10px] text-slate-700">
                      Try another search or category.
                    </p>
                  </div>
                )}
              </div>

              <aside className="space-y-5">
                <div className="rounded-2xl border border-white/[0.07] bg-[#07101f]/75 p-5 backdrop-blur-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.15em] text-slate-600">
                        Runtime
                      </p>

                      <h2 className="mt-1 text-sm font-medium text-white">
                        File System
                      </h2>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-500/10 text-cyan-300">
                      <FolderOpen size={15} />
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-emerald-400/10 bg-emerald-500/[0.035] p-3">
                    <div className="flex items-center gap-2 text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[10px] font-medium">
                        Operational
                      </span>
                    </div>

                    <p className="mt-2 text-[9px] leading-5 text-slate-600">
                      Files are indexed and ready for Nexus
                      workspace actions.
                    </p>
                  </div>

                  <div className="mt-4 space-y-3">
                    <InfoRow
                      label="Indexed Files"
                      value={`${files.length}`}
                    />

                    <InfoRow
                      label="Storage"
                      value="24.7 GB"
                    />

                    <InfoRow
                      label="Available"
                      value="75.3 GB"
                    />

                    <InfoRow
                      label="Index Status"
                      value="Ready"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-[#07101f]/75 p-5 backdrop-blur-2xl">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-white">
                      Recent Activity
                    </h2>

                    <span className="text-[9px] text-cyan-300">
                      Live
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    <ActivityRow
                      title="File indexed"
                      description="HomePage.tsx"
                    />

                    <ActivityRow
                      title="File updated"
                      description="Nexus Project Overview"
                    />

                    <ActivityRow
                      title="Image added"
                      description="Dashboard Preview"
                    />
                  </div>
                </div>
              </aside>
            </section>

            {selectedFile && (
              <section className="mt-5 rounded-2xl border border-violet-400/15 bg-[#07101f]/80 p-5 backdrop-blur-2xl">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
                        kindStyles[selectedFile.kind]
                      }`}
                    >
                      {(() => {
                        const Icon =
                          kindIcons[selectedFile.kind]

                        return <Icon size={19} />
                      })()}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-violet-300">
                          Selected File
                        </span>

                        <span className="text-[9px] text-slate-700">
                          {selectedFile.extension}
                        </span>
                      </div>

                      <h2 className="mt-2 truncate text-sm font-medium text-white">
                        {selectedFile.name}
                      </h2>

                      <p className="mt-1 text-[10px] text-slate-600">
                        {selectedFile.size} ·{' '}
                        {selectedFile.modified}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label="Close file details"
                    onClick={() => setSelectedFileId(null)}
                    className="rounded-lg p-2 text-slate-700 transition hover:bg-white/[0.04] hover:text-slate-300"
                  >
                    <X size={15} />
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="flex h-9 items-center gap-2 rounded-xl border border-cyan-400/15 bg-cyan-500/[0.06] px-3 text-xs text-cyan-300 transition hover:bg-cyan-500/10"
                  >
                    <Download size={14} />
                    Download
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteFile(selectedFile.id)}
                    className="flex h-9 items-center gap-2 rounded-xl border border-red-400/15 bg-red-500/[0.05] px-3 text-xs text-red-300 transition hover:bg-red-500/10"
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

      {showCreateFolder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/[0.09] bg-[#07101f] p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">
                  Create Folder
                </p>

                <p className="mt-1 text-[10px] text-slate-600">
                  Add a folder to organize your workspace.
                </p>
              </div>

              <button
                type="button"
                aria-label="Close create folder"
                onClick={() => setShowCreateFolder(false)}
                className="rounded-lg p-2 text-slate-700 transition hover:bg-white/[0.04] hover:text-slate-300"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-[10px] uppercase tracking-[0.12em] text-slate-500">
                Folder name
              </label>

              <input
                value={folderName}
                onChange={(event) =>
                  setFolderName(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    createFolder()
                  }
                }}
                autoFocus
                placeholder="e.g. Project Assets"
                className="h-11 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 text-sm text-white outline-none placeholder:text-slate-700 focus:border-violet-400/30"
              />
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCreateFolder(false)}
                className="h-10 rounded-xl border border-white/[0.07] px-4 text-xs text-slate-500 transition hover:bg-white/[0.03] hover:text-slate-300"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={createFolder}
                className="flex h-10 items-center gap-2 rounded-xl border border-violet-400/25 bg-violet-500/10 px-4 text-xs font-medium text-violet-200 transition hover:bg-violet-500/15"
              >
                <Plus size={14} />
                Create Folder
              </button>
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
  className,
}: {
  label: string
  value: string | number
  icon: React.ReactNode
  className: string
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 backdrop-blur-xl">
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
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${className}`}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}

function FileCard({
  file,
  selected,
  onSelect,
  onDelete,
}: {
  file: WorkspaceFile
  selected: boolean
  onSelect: () => void
  onDelete: () => void
}) {
  const Icon = kindIcons[file.kind]

  return (
    <div
      className={`group rounded-xl border p-4 transition ${
        selected
          ? 'border-violet-400/30 bg-violet-500/[0.06]'
          : 'border-white/[0.055] bg-white/[0.012] hover:border-white/[0.10] hover:bg-white/[0.025]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <button
          type="button"
          onClick={onSelect}
          className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
            kindStyles[file.kind]
          }`}
        >
          <Icon size={18} />
        </button>

        <button
          type="button"
          aria-label={`Delete ${file.name}`}
          onClick={onDelete}
          className="rounded-lg p-1.5 text-slate-800 opacity-0 transition hover:bg-red-500/10 hover:text-red-300 group-hover:opacity-100"
        >
          <Trash2 size={13} />
        </button>
      </div>

      <button
        type="button"
        onClick={onSelect}
        className="mt-4 block w-full text-left"
      >
        <p className="truncate text-xs font-medium text-slate-200">
          {file.name}
        </p>

        <p className="mt-1 text-[9px] text-slate-700">
          {file.extension} · {file.size}
        </p>

        <p className="mt-3 truncate text-[9px] text-slate-600">
          {file.modified}
        </p>
      </button>
    </div>
  )
}

function FileListItem({
  file,
  selected,
  onSelect,
  onDelete,
}: {
  file: WorkspaceFile
  selected: boolean
  onSelect: () => void
  onDelete: () => void
}) {
  const Icon = kindIcons[file.kind]

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border p-3 transition ${
        selected
          ? 'border-violet-400/30 bg-violet-500/[0.06]'
          : 'border-white/[0.055] bg-white/[0.012] hover:bg-white/[0.025]'
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
          kindStyles[file.kind]
        }`}
      >
        <Icon size={16} />
      </button>

      <button
        type="button"
        onClick={onSelect}
        className="min-w-0 flex-1 text-left"
      >
        <p className="truncate text-xs font-medium text-slate-200">
          {file.name}
        </p>

        <p className="mt-1 truncate text-[9px] text-slate-600">
          {file.kind} · {file.extension} · {file.size}
        </p>
      </button>

      <span className="hidden text-[9px] text-slate-700 md:block">
        {file.modified}
      </span>

      <button
        type="button"
        onClick={onDelete}
        className="rounded-lg p-1.5 text-slate-700 transition hover:bg-red-500/10 hover:text-red-300"
      >
        <Trash2 size={13} />
      </button>
    </div>
  )
}

function InfoRow({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.05] pb-2 last:border-0 last:pb-0">
      <span className="text-[9px] text-slate-600">
        {label}
      </span>

      <span className="text-[10px] text-slate-300">
        {value}
      </span>
    </div>
  )
}

function ActivityRow({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex gap-2.5">
      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />

      <div className="min-w-0">
        <p className="text-[10px] text-slate-400">
          {title}
        </p>

        <p className="mt-0.5 truncate text-[9px] text-slate-700">
          {description}
        </p>
      </div>
    </div>
  )
}
