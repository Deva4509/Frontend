import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import HomePage from './HomePage'

describe('Nexus Home page', () => {
  it('renders the current Nexus AI startup interface', () => {
    render(<HomePage />)

    expect(screen.getByText('NEXUS AI')).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: 'Good morning, Rudraksh! 👋',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: 'How can I help you today?',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByLabelText('Ask Nexus'),
    ).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText('Ask Nexus AI anything...'),
    ).toBeInTheDocument()
  })

  it('renders the dashboard sections', () => {
    render(<HomePage />)

    expect(
      screen.getByRole('heading', {
        name: "Today's Schedule",
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
        name: 'Quick Actions',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: 'Active Automations',
      }),
    ).toBeInTheDocument()
  })

  it('renders the main actions', () => {
    render(<HomePage />)

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
        name: 'Screenshot',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Open App',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Create Note',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Translate',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Summarize',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Search Web',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Create Task',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Calculator',
      }),
    ).toBeInTheDocument()
  })

  it('renders recent conversations', () => {
    render(<HomePage />)

    expect(
      screen.getByRole('button', {
        name: /Python Web Scraping Project/,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: /Quantum Computing Explained/,
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: /Workout Plan Generator/,
      }),
    ).toBeInTheDocument()
  })
})
