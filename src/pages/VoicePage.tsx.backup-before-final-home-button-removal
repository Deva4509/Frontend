import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  Bot,
  Check,
  ChevronDown,
  Clock3,
  Languages,
  Mic,
  MicOff,
  RotateCcw,
  Settings,
  Sparkles,
  Volume2,
  Waves,
  X,
} from 'lucide-react'
import { useNavigationStore } from '../store/navigation'

interface SpeechRecognitionResultLike {
  readonly isFinal: boolean
  readonly length: number
  readonly [index: number]: {
    readonly transcript: string
    readonly confidence: number
  }
}

interface SpeechRecognitionResultListLike {
  readonly length: number
  readonly [index: number]: SpeechRecognitionResultLike
}

type SpeechRecognitionResultEventLike = Event & {
  resultIndex: number
  results: SpeechRecognitionResultListLike
}

type SpeechRecognitionErrorEventLike = Event & {
  error: string
}

interface SpeechRecognitionInstance {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  abort?: () => void
  onstart: (() => void) | null
  onresult: ((event: SpeechRecognitionResultEventLike) => void) | null
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null
  onend: (() => void) | null
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }
}

function getSpeechRecognition(): SpeechRecognitionConstructor | null {
  return (
    window.SpeechRecognition ??
    window.webkitSpeechRecognition ??
    null
  )
}

const languages = [
  { label: 'English (India)', value: 'en-IN' },
  { label: 'English (US)', value: 'en-US' },
  { label: 'Hindi', value: 'hi-IN' },
]

const recentCommands = [
  {
    command: 'Open my workspace',
    time: 'Just now',
  },
  {
    command: 'Explain quantum computing',
    time: 'Today',
  },
  {
    command: 'Create a task for tomorrow',
    time: 'Yesterday',
  },
]

export default function VoicePage() {
  const setCurrentView = useNavigationStore(
    (state) => state.setCurrentView,
  )

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)

  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [status, setStatus] = useState('Ready to listen')
  const [error, setError] = useState('')
  const [language, setLanguage] = useState('en-IN')
  const [showLanguages, setShowLanguages] = useState(false)

  const selectedLanguage = useMemo(
    () =>
      languages.find((item) => item.value === language) ??
      languages[0],
    [language],
  )

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop()
      recognitionRef.current = null
    }
  }, [])

  const startListening = () => {
    const SpeechRecognition = getSpeechRecognition()

    setError('')
    setInterimTranscript('')

    if (!SpeechRecognition) {
      setError(
        'Voice recognition is not supported in this browser. Use a Chromium-based browser such as Chrome or Edge.',
      )
      setStatus('Voice recognition unavailable')
      return
    }

    recognitionRef.current?.stop()

    const SpeechRecognitionAPI = getSpeechRecognition()

    if (!SpeechRecognitionAPI) {
      setStatus('Speech recognition is not supported in this browser.')
      return
    }

    const recognition = new SpeechRecognitionAPI()

    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = language

    recognition.onstart = () => {
      setIsListening(true)
      setStatus('Listening...')
    }

    recognition.onresult = (
      event: SpeechRecognitionResultEventLike,
    ) => {
      let finalText = ''
      let interimText = ''

      for (
        let index = event.resultIndex;
        index < event.results.length;
        index += 1
      ) {
        const result = event.results[index]

        if (result.isFinal) {
          finalText += result[0].transcript
        } else {
          interimText += result[0].transcript
        }
      }

      if (finalText.trim()) {
        setTranscript((current) =>
          `${current} ${finalText}`.trim(),
        )
      }

      setInterimTranscript(interimText.trim())
    }

    recognition.onerror = (
      event: SpeechRecognitionErrorEventLike,
    ) => {
      setIsListening(false)

      if (event.error === 'not-allowed') {
        setError(
          'Microphone permission was denied. Allow microphone access and try again.',
        )
      } else if (event.error === 'no-speech') {
        setError('No speech was detected. Try speaking again.')
      } else {
        setError(`Voice recognition error: ${event.error}`)
      }

      setStatus('Ready to listen')
    }

    recognition.onend = () => {
      setIsListening(false)
      setInterimTranscript('')

      if (!error) {
        setStatus('Ready to listen')
      }
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setIsListening(false)
    setInterimTranscript('')
    setStatus('Ready to listen')
  }

  const clearTranscript = () => {
    setTranscript('')
    setInterimTranscript('')
    setError('')
    setStatus('Ready to listen')
  }

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  return (
    <div className="relative z-[1] min-h-screen w-full overflow-hidden text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(124,58,237,0.16),transparent_28%),radial-gradient(circle_at_70%_70%,rgba(6,182,212,0.09),transparent_32%)]" />

      <div className="relative flex min-h-screen">
        

        <main className="min-w-0 flex-1">
          <header className="flex h-[70px] items-center justify-between border-b border-white/[0.06] px-4 sm:px-6">
            <div className="flex items-center gap-3">
              

              <div>
                <p className="text-sm font-medium text-white">
                  Voice Workspace
                </p>
                <p className="text-[10px] text-slate-600">
                  Speak naturally with Nexus AI
                </p>
              </div>
            </div>

            <button
              aria-label="Voice settings"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] text-slate-500 transition hover:bg-white/[0.04] hover:text-slate-300"
            >
              <Settings size={17} />
            </button>
          </header>

          <div className="h-[calc(100vh-70px)] overflow-y-auto">
            <div className="mx-auto max-w-[1250px] px-4 py-6 sm:px-6 lg:px-8">
              <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
                <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#07112a]/85 shadow-[0_25px_100px_rgba(0,0,0,0.3)]">
                  <div className="relative flex min-h-[650px] flex-col items-center justify-center overflow-hidden px-5 py-12 sm:px-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(124,58,237,0.20),transparent_25%),radial-gradient(circle_at_50%_65%,rgba(6,182,212,0.10),transparent_35%)]" />

                    <div
                      className={`relative flex h-64 w-64 items-center justify-center rounded-full transition-all duration-500 ${
                        isListening
                          ? 'scale-110'
                          : 'scale-100'
                      }`}
                    >
                      <div
                        className={`absolute inset-0 rounded-full border border-violet-400/20 ${
                          isListening
                            ? 'animate-ping'
                            : ''
                        }`}
                      />

                      <div
                        className={`absolute inset-5 rounded-full border border-cyan-400/20 ${
                          isListening
                            ? 'animate-pulse'
                            : ''
                        }`}
                      />

                      <div className="absolute inset-10 rounded-full bg-gradient-to-br from-violet-600/30 via-blue-500/20 to-cyan-400/20 blur-2xl" />

                      <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-white/[0.12] bg-[#081229]/95 shadow-[0_0_70px_rgba(124,58,237,0.25)]">
                        <div className="absolute inset-3 rounded-full border border-violet-400/20" />

                        {isListening ? (
                          <Waves
                            size={46}
                            className="text-cyan-300"
                          />
                        ) : (
                          <Mic
                            size={42}
                            className="text-violet-300"
                          />
                        )}
                      </div>
                    </div>

                    <div className="relative z-[1] mt-8 text-center">
                      <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-cyan-300/70">
                        Nexus Voice
                      </p>

                      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                        {isListening
                          ? 'I’m listening...'
                          : 'Speak to Nexus'}
                      </h1>

                      <p className="mx-auto mt-3 max-w-[480px] text-sm leading-6 text-slate-500">
                        {isListening
                          ? 'Say what you need. Your speech will appear below in real time.'
                          : 'Use your microphone to talk naturally with Nexus AI.'}
                      </p>
                    </div>

                    <button
                      onClick={toggleListening}
                      className={`relative z-[2] mt-8 flex h-14 min-w-[190px] items-center justify-center gap-2 rounded-2xl px-6 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(124,58,237,0.25)] transition hover:-translate-y-0.5 hover:brightness-110 ${
                        isListening
                          ? 'bg-gradient-to-r from-rose-500 to-orange-500'
                          : 'bg-gradient-to-r from-violet-600 to-blue-500'
                      }`}
                    >
                      {isListening ? (
                        <>
                          <MicOff size={18} />
                          Stop Listening
                        </>
                      ) : (
                        <>
                          <Mic size={18} />
                          Start Listening
                        </>
                      )}
                    </button>

                    <div className="relative z-[1] mt-7 flex items-center gap-2 text-[10px] text-slate-600">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isListening
                            ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]'
                            : 'bg-emerald-400'
                        }`}
                      />
                      {status}
                    </div>

                    {error && (
                      <div className="relative z-[1] mt-5 flex max-w-[520px] items-start gap-2 rounded-xl border border-rose-400/20 bg-rose-500/[0.06] px-4 py-3 text-xs text-rose-300">
                        <X size={14} className="mt-0.5 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="relative z-[1] mt-8 w-full max-w-[680px]">
                      <div className="rounded-2xl border border-white/[0.07] bg-slate-950/45 p-4 backdrop-blur-xl">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Volume2
                              size={14}
                              className="text-cyan-300"
                            />
                            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
                              Live transcript
                            </span>
                          </div>

                          <button
                            onClick={clearTranscript}
                            disabled={
                              !transcript &&
                              !interimTranscript
                            }
                            className="flex items-center gap-1.5 text-[10px] text-slate-600 transition hover:text-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <RotateCcw size={12} />
                            Clear
                          </button>
                        </div>

                        <div className="min-h-[76px] rounded-xl border border-white/[0.05] bg-white/[0.015] p-3 text-sm leading-6">
                          {transcript || interimTranscript ? (
                            <>
                              <span className="text-slate-200">
                                {transcript}
                              </span>

                              {interimTranscript && (
                                <span className="text-cyan-300/60">
                                  {' '}
                                  {interimTranscript}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-slate-700">
                              Your speech will appear here...
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <aside className="space-y-4">
                  <div className="rounded-2xl border border-white/[0.08] bg-slate-950/55 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">
                          Language
                        </p>
                        <p className="mt-1 text-[10px] text-slate-600">
                          Speech recognition language
                        </p>
                      </div>

                      <Languages
                        size={17}
                        className="text-cyan-300"
                      />
                    </div>

                    <div className="relative mt-4">
                      <button
                        onClick={() =>
                          setShowLanguages(
                            (current) => !current,
                          )
                        }
                        className="flex h-11 w-full items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 text-left text-xs text-slate-300 transition hover:border-violet-400/20"
                      >
                        <span>{selectedLanguage.label}</span>
                        <ChevronDown
                          size={15}
                          className="text-slate-600"
                        />
                      </button>

                      {showLanguages && (
                        <div className="absolute left-0 right-0 top-12 z-20 overflow-hidden rounded-xl border border-white/[0.08] bg-[#09132c] shadow-2xl">
                          {languages.map((item) => (
                            <button
                              key={item.value}
                              onClick={() => {
                                setLanguage(item.value)
                                setShowLanguages(false)
                                recognitionRef.current?.stop()
                              }}
                              className="flex w-full items-center justify-between px-3 py-3 text-xs text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
                            >
                              {item.label}

                              {item.value === language && (
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

                  <div className="rounded-2xl border border-white/[0.08] bg-slate-950/55 p-4">
                    <div className="flex items-center gap-2">
                      <Clock3
                        size={16}
                        className="text-violet-300"
                      />
                      <h2 className="text-sm font-medium text-white">
                        Recent Voice Commands
                      </h2>
                    </div>

                    <div className="mt-4 space-y-2">
                      {recentCommands.map((item) => (
                        <div
                          key={item.command}
                          className="rounded-xl border border-white/[0.05] bg-white/[0.015] p-3"
                        >
                          <p className="text-xs text-slate-300">
                            {item.command}
                          </p>
                          <p className="mt-1 text-[9px] text-slate-600">
                            {item.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-cyan-400/10 bg-cyan-500/[0.025] p-4">
                    <div className="flex items-center gap-2">
                      <Sparkles
                        size={15}
                        className="text-cyan-300"
                      />
                      <p className="text-xs font-medium text-slate-300">
                        Voice Engine
                      </p>
                    </div>

                    <div className="mt-3 space-y-2">
                      {[
                        'Microphone input',
                        'Real-time transcription',
                        'Multi-language support',
                        'Backend response pipeline',
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-[10px] text-slate-500"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          {item}
                        </div>
                      ))}
                    </div>
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
