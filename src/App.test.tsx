import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useNavigationStore } from './store/navigation'

describe('Nexus AI application shell', () => {
  beforeEach(() => {
    useNavigationStore.setState({
      currentView: 'home',
      isBooted: true,
    })
  })

  it('renders the current Nexus AI home interface', async () => {
    const { default: App } = await import('./App')

    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: 'How can I help you today?',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText('Ask Nexus AI anything...'),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: 'Quick Actions',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: 'Recent Conversations',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: 'System Monitor',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: 'Active Automations',
      }),
    ).toBeInTheDocument()
  })

  it('renders the primary navigation', async () => {
    const { default: App } = await import('./App')

    render(<App />)

    expect(
      screen.getByRole('button', {
        name: 'Home',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Chat',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Voice',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Vision',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Automation',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Memory',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Planner',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Devices',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Plugins',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Skills',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Files',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Analytics',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getAllByRole('button', {
        name: 'Settings',
      }).length,
    ).toBeGreaterThan(0)
  })

  it('renders the primary actions', async () => {
    const { default: App } = await import('./App')

    render(<App />)

    expect(
      screen.getByRole('button', {
        name: 'Start a New Chat',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Voice Mode',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Send message',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Voice input',
      }),
    ).toBeInTheDocument()
  })
})
