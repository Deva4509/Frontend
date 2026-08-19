import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import StartupPage from './pages/StartupPage'
import VoicePage from './pages/VoicePage'
import MemoryPage from './pages/MemoryPage'
import VisionPage from './pages/VisionPage'
import AutomationPage from './pages/AutomationPage'
import { useNavigationStore } from './store/navigation'

export default function App() {
  const currentView = useNavigationStore(
    (state) => state.currentView,
  )

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#030712] text-white">
      {currentView === 'startup' ? (
        <StartupPage />
      ) : currentView === 'chat' ? (
        <ChatPage />
      ) : currentView === 'voice' ? (
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
    </main>
  )
}
