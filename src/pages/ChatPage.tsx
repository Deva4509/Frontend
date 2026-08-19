import {
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent,
} from 'react'
import {
  ArrowLeft,
  Bot,
  Home,
  Loader2,
  Menu,
  MessageSquare,
  Mic,
  Paperclip,
  Plus,
  Search,
  Send,
  Sparkles,
  Trash2,
  User,
  X,
} from 'lucide-react'
import { useNavigationStore } from '../store/navigation'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
}

const CHAT_STORAGE_KEY = 'nexus-ai-chat-conversations'

const createConversation = (): Conversation => ({
  id: `conversation-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`,
  title: 'New conversation',
  messages: [],
})

const loadConversations = (): Conversation[] => {
  try {
    const stored = window.localStorage.getItem(
      CHAT_STORAGE_KEY,
    )

    if (!stored) {
      return [createConversation()]
    }

    const parsed: unknown = JSON.parse(stored)

    if (!Array.isArray(parsed) || parsed.length === 0) {
      return [createConversation()]
    }

    const validConversations = parsed.filter(
      (conversation): conversation is Conversation => {
        if (
          typeof conversation !== 'object' ||
          conversation === null
        ) {
          return false
        }

        const candidate =
          conversation as Partial<Conversation>

        return (
          typeof candidate.id === 'string' &&
          typeof candidate.title === 'string' &&
          Array.isArray(candidate.messages)
        )
      },
    )

    return validConversations.length > 0
      ? validConversations
      : [createConversation()]
  } catch {
    return [createConversation()]
  }
}

export default function ChatPage() {
  const setCurrentView = useNavigationStore(
    (state) => state.setCurrentView,
  )

  const pendingChatMessage = useNavigationStore(
    (state) => state.pendingChatMessage,
  )

  const clearPendingChatMessage = useNavigationStore(
    (state) => state.clearPendingChatMessage,
  )

  const [conversations, setConversations] = useState<
    Conversation[]
  >(() => loadConversations())

  const [activeConversationId, setActiveConversationId] =
    useState<string | null>(null)

  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    setActiveConversationId((currentId) => {
      if (
        currentId &&
        conversations.some(
          (conversation) => conversation.id === currentId,
        )
      ) {
        return currentId
      }

      return conversations[0]?.id ?? null
    })
  }, [conversations])

  useEffect(() => {
    window.localStorage.setItem(
      CHAT_STORAGE_KEY,
      JSON.stringify(conversations),
    )
  }, [conversations])

  const activeConversation = conversations.find(
    (conversation) =>
      conversation.id === activeConversationId,
  )

  const messages = activeConversation?.messages ?? []

  const filteredConversations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    if (!query) {
      return conversations
    }

    return conversations.filter((conversation) => {
      if (conversation.title.toLowerCase().includes(query)) {
        return true
      }

      return conversation.messages.some((message) =>
        message.content.toLowerCase().includes(query),
      )
    })
  }, [conversations, searchQuery])

  const goHome = () => {
    setCurrentView('home')
  }

  const startNewChat = () => {
    const conversation = createConversation()

    setConversations((current) => [
      conversation,
      ...current,
    ])

    setActiveConversationId(conversation.id)
    setInput('')
    setIsThinking(false)
    setIsSidebarOpen(false)
  }

  const selectConversation = (conversationId: string) => {
    setActiveConversationId(conversationId)
    setInput('')
    setIsThinking(false)
    setIsSidebarOpen(false)
  }

  const deleteConversation = (conversationId: string) => {
    setConversations((current) => {
      const remaining = current.filter(
        (conversation) =>
          conversation.id !== conversationId,
      )

      if (remaining.length === 0) {
        const replacement = createConversation()
        setActiveConversationId(replacement.id)
        return [replacement]
      }

      if (conversationId === activeConversationId) {
        setActiveConversationId(remaining[0].id)
      }

      return remaining
    })

    setInput('')
    setIsThinking(false)
  }

  const updateActiveConversation = (
    updater: (conversation: Conversation) => Conversation,
  ) => {
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === activeConversationId
          ? updater(conversation)
          : conversation,
      ),
    )
  }

  const sendMessage = (messageOverride?: string) => {
    const trimmed = (
      messageOverride !== undefined
        ? messageOverride
        : input
    ).trim()

    if (!trimmed || isThinking || !activeConversation) {
      return
    }

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: trimmed,
    }

    const conversationId = activeConversation.id

    updateActiveConversation((conversation) => ({
      ...conversation,
      title:
        conversation.messages.length === 0
          ? trimmed.length > 34
            ? `${trimmed.slice(0, 34)}...`
            : trimmed
          : conversation.title,
      messages: [...conversation.messages, userMessage],
    }))

    setInput('')
    setIsThinking(true)

    window.setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content:
          'I received your message. The Nexus AI backend connection will be connected after the backend is completed.',
      }

      setConversations((current) =>
        current.map((conversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                messages: [
                  ...conversation.messages,
                  assistantMessage,
                ],
              }
            : conversation,
        ),
      )

      setIsThinking(false)
    }, 700)
  }

  useEffect(() => {
    if (!pendingChatMessage || !activeConversation) {
      return
    }

    const message = pendingChatMessage

    clearPendingChatMessage()

    window.requestAnimationFrame(() => {
      sendMessage(message)
    })
  }, [
    pendingChatMessage,
    activeConversation,
    clearPendingChatMessage,
  ])

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  const hasMessages = messages.length > 0

  return (
    <div className="relative z-[1] min-h-screen w-full bg-[#030712] text-white">
      <div className="flex min-h-screen">
        {isSidebarOpen && (
          <button
            aria-label="Close sidebar overlay"
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-[290px] shrink-0 flex-col border-r border-white/[0.07] bg-[#050b1d]/98 px-4 py-5 backdrop-blur-2xl transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 ${
            isSidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 opacity-30 blur-lg" />
                <span className="relative bg-gradient-to-br from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-3xl font-bold leading-none text-transparent">
                  N
                </span>
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Nexus AI
                </p>
                <p className="text-[10px] text-slate-500">
                  Conversations
                </p>
              </div>
            </div>

            <button
              aria-label="Close conversation sidebar"
              onClick={() => setIsSidebarOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/[0.05] hover:text-white lg:hidden"
            >
              <X size={17} />
            </button>
          </div>

          <button
            onClick={startNewChat}
            className="mt-6 flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 text-xs font-medium text-white shadow-[0_0_25px_rgba(124,58,237,0.18)] transition hover:brightness-110"
          >
            <Plus size={16} />
            New Chat
          </button>

          <div className="relative mt-4">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
            />

            <input
              aria-label="Search conversations"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search conversations..."
              className="h-10 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] pl-9 pr-3 text-xs text-white outline-none placeholder:text-slate-600 focus:border-violet-400/30"
            />
          </div>

          <div className="mt-6 min-h-0 flex-1 overflow-y-auto">
            <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              Conversations
            </p>

            <div className="mt-2 space-y-1">
              {filteredConversations.length === 0 ? (
                <div className="px-2 py-6 text-center text-xs text-slate-600">
                  No conversations found.
                </div>
              ) : (
                filteredConversations.map((conversation) => {
                  const isActive =
                    conversation.id === activeConversationId

                  return (
                    <div
                      key={conversation.id}
                      className={`group flex items-center gap-2 rounded-xl border transition ${
                        isActive
                          ? 'border-violet-400/15 bg-violet-500/[0.08]'
                          : 'border-transparent hover:border-white/[0.05] hover:bg-white/[0.025]'
                      }`}
                    >
                      <button
                        onClick={() =>
                          selectConversation(
                            conversation.id,
                          )
                        }
                        className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3 text-left"
                      >
                        <MessageSquare
                          size={15}
                          className={`shrink-0 ${
                            isActive
                              ? 'text-violet-300'
                              : 'text-slate-600'
                          }`}
                        />

                        <span
                          className={`truncate text-xs ${
                            isActive
                              ? 'font-medium text-slate-200'
                              : 'text-slate-500'
                          }`}
                        >
                          {conversation.title}
                        </span>
                      </button>

                      <button
                        aria-label={`Delete ${conversation.title}`}
                        onClick={() =>
                          deleteConversation(
                            conversation.id,
                          )
                        }
                        className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-700 opacity-0 transition hover:bg-red-500/10 hover:text-red-300 group-hover:opacity-100"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          <div className="border-t border-white/[0.06] pt-4">
            <button
              onClick={goHome}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs text-slate-500 transition hover:bg-white/[0.04] hover:text-white"
            >
              <Home size={16} />
              Back to Home
            </button>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-[70px] shrink-0 items-center border-b border-white/[0.07] px-4 sm:px-6 lg:px-8">
            <button
              aria-label="Open conversation sidebar"
              onClick={() => setIsSidebarOpen(true)}
              className="mr-3 flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-400 transition hover:border-violet-400/25 hover:text-white lg:hidden"
            >
              <Menu size={18} />
            </button>

            <button
              onClick={goHome}
              className="hidden items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-sm text-slate-400 transition hover:border-violet-400/25 hover:bg-white/[0.05] hover:text-white sm:flex"
            >
              <ArrowLeft size={16} />
              <span>Home</span>
            </button>

            <div className="ml-0 flex items-center gap-3 sm:ml-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 text-violet-300">
                <Sparkles size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-white">
                  Nexus AI
                </p>

                <p className="max-w-[180px] truncate text-[10px] text-slate-500">
                  {activeConversation?.title ??
                    'New conversation'}
                </p>
              </div>
            </div>

            <button
              onClick={startNewChat}
              aria-label="New chat"
              className="ml-auto flex h-9 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 text-xs text-slate-400 transition hover:border-violet-400/25 hover:text-white"
            >
              <Plus size={15} />
              <span className="hidden sm:inline">
                New Chat
              </span>
            </button>
          </header>

          <div className="mx-auto flex min-h-0 w-full max-w-[1000px] flex-1 flex-col px-5 py-6 sm:px-8">
            {!hasMessages ? (
              <div className="flex flex-1 flex-col items-center justify-center pb-20 text-center">
                <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-violet-500/20 blur-2xl" />

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-violet-400/30 bg-gradient-to-br from-violet-600/30 to-cyan-400/20 shadow-[0_0_45px_rgba(124,58,237,0.2)]">
                    <Sparkles
                      size={28}
                      className="text-violet-200"
                    />
                  </div>
                </div>

                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-300/70">
                  Personal intelligence
                </p>

                <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                  How can I help you?
                </h1>

                <p className="mt-3 max-w-[480px] text-sm leading-6 text-slate-500">
                  Start a conversation with Nexus AI. Ask
                  questions, plan tasks, automate your work, or
                  simply explore an idea.
                </p>

                <div className="mt-7 grid w-full max-w-[620px] grid-cols-1 gap-2 sm:grid-cols-2">
                  {[
                    'Explain something to me',
                    'Help me write code',
                    'Plan a task for me',
                    'Analyze some information',
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setInput(suggestion)}
                      className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-left text-xs text-slate-400 transition hover:border-violet-400/20 hover:bg-violet-500/[0.05] hover:text-slate-200"
                    >
                      <Sparkles
                        size={14}
                        className="mb-2 text-violet-400"
                      />

                      {suggestion}
                    </button>
                  ))}
                </div>

                <button
                  onClick={goHome}
                  className="mt-8 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-xs font-medium text-slate-400 transition hover:border-violet-400/30 hover:bg-violet-500/[0.06] hover:text-white"
                >
                  <Home size={15} />
                  Back to Home
                </button>
              </div>
            ) : (
              <div className="min-h-0 flex-1 overflow-y-auto pb-6">
                <div className="space-y-5">
                  {messages.map((message) => {
                    const isUser =
                      message.role === 'user'

                    return (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${
                          isUser
                            ? 'justify-end'
                            : 'justify-start'
                        }`}
                      >
                        {!isUser && (
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                            <Bot size={17} />
                          </div>
                        )}

                        <div
                          className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                            isUser
                              ? 'bg-gradient-to-br from-violet-600 to-blue-500 text-white shadow-[0_8px_30px_rgba(124,58,237,0.18)]'
                              : 'border border-white/[0.07] bg-white/[0.025] text-slate-300'
                          }`}
                        >
                          {message.content}
                        </div>

                        {isUser && (
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-300">
                            <User size={17} />
                          </div>
                        )}
                      </div>
                    )
                  })}

                  {isThinking && (
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                        <Bot size={17} />
                      </div>

                      <div className="flex items-center gap-2 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
                        <Loader2
                          size={15}
                          className="animate-spin text-cyan-300"
                        />

                        <span className="text-xs text-slate-500">
                          Nexus is thinking...
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="shrink-0 pb-2 pt-4">
              <div className="rounded-2xl border border-white/[0.08] bg-[#081229]/90 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="flex min-h-[58px] items-center gap-2">
                  <button
                    aria-label="Attach file"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-white/[0.05] hover:text-slate-300"
                  >
                    <Paperclip size={18} />
                  </button>

                  <input
                    aria-label="Message Nexus"
                    type="text"
                    value={input}
                    onChange={(event) =>
                      setInput(event.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    placeholder="Message Nexus AI..."
                    className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-slate-600"
                  />

                  <button
                    aria-label="Voice input"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-white/[0.05] hover:text-slate-300"
                  >
                    <Mic size={18} />
                  </button>

                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || isThinking}
                    aria-label="Send message"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 text-white shadow-[0_0_25px_rgba(124,58,237,0.25)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Send size={17} />
                  </button>
                </div>
              </div>

              <p className="mt-3 text-center text-[10px] text-slate-700">
                Nexus AI can make mistakes. Verify important
                information.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
