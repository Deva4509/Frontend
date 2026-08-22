import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import ChatPage from './pages/ChatPage'
import StartupPage from './pages/StartupPage'
import VoicePage from './pages/VoicePage'
import MemoryPage from './pages/MemoryPage'
import VisionPage from './pages/VisionPage'
import AutomationPage from './pages/AutomationPage'
import PlannerPage from './pages/PlannerPage'
import DevicesPage from './pages/DevicesPage'
import PluginsPage from './pages/PluginsPage'
import SkillsPage from './pages/SkillsPage'
import FilesPage from './pages/FilesPage'
import AnalyticsPage from './pages/AnalyticsPage'
import SettingsPage from './pages/SettingsPage'
import { useNavigationStore } from './store/navigation'
import NexusSidebar from './components/navigation/NexusSidebar'

function CurrentPage() {
  const currentView = useNavigationStore(
    (state) => state.currentView,
  )

  if (currentView === 'home') {
    return <HomePage />
  }

  if (currentView === 'voice') {
    return <VoicePage />
  }

  if (currentView === 'memory') {
    return <MemoryPage />
  }

  if (currentView === 'vision') {
    return <VisionPage />
  }

  if (currentView === 'automation') {
    return <AutomationPage />
  }

  if (currentView === 'planner') {
    return <PlannerPage />
  }

  if (currentView === 'devices') {
    return <DevicesPage />
  }

  if (currentView === 'plugins') {
    return <PluginsPage />
  }

  if (currentView === 'skills') {
    return <SkillsPage />
  }

  if (currentView === 'files') {
    return <FilesPage />
  }

  if (currentView === 'analytics') {
    return <AnalyticsPage />
  }

  if (currentView === 'settings') {
    return <SettingsPage />
  }

  return <HomePage />
}

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

  if (currentView === 'profile') {
    return (
      <main className="relative min-h-screen w-full overflow-hidden bg-[#020617] text-white">
        <ProfilePage />
      </main>
    )
  }

  return (
    <main className="relative flex min-h-screen w-full overflow-hidden bg-[#030712] text-white">
      <NexusSidebar />

      <section className="min-w-0 flex-1 overflow-y-auto">
        <CurrentPage />
      </section>
    </main>
  )
}
