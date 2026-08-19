import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import StartupPage from './pages/StartupPage'
import VoicePage from './pages/VoicePage'
import MemoryPage from './pages/MemoryPage'
import VisionPage from './pages/VisionPage'
import AutomationPage from './pages/AutomationPage'
import NexusSidebar from './components/navigation/NexusSidebar'
import { useNavigationStore } from './store/navigation'

export default function App() {
  const currentView = useNavigationStore(
    (state) => state.currentView,
  )

  if (currentView === 'startup') {
    return (
      <main className="relative min-h-screen w-full overflow-hidden bg-[#030712] text-white">
        <StartupPage />
      </main>
    )
  }

  if (currentView === 'chat') {
    return (
      <main className="relative min-h-screen w-full overflow-hidden bg-[#030712] text-white">
        <ChatPage />
      </main>
    )
  }

  if (currentView === 'home') {
    return (
      <main className="relative min-h-screen w-full overflow-hidden bg-[#030712] text-white">
        <HomePage />
      </main>
    )
  }

  return (
    <main className="relative flex min-h-screen w-full overflow-hidden bg-[#030712] text-white">
      <NexusSidebar currentView={currentView} />

      <section className="min-w-0 flex-1 overflow-hidden">
        {currentView === 'voice' ? (
          <VoicePage />
        ) : currentView === 'memory' ? (
          <MemoryPage />
        ) : currentView === 'vision' ? (
          <VisionPage />
        ) : currentView === 'automation' ? (
          <AutomationPage />
        ) : (
          <HomePage />
        )}
      </section>
    </main>
  )
}
