import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ChatPage from './ChatPage'

describe('ChatPage', () => {
  it('renders the conversation workspace', () => {
    render(<ChatPage />)

    expect(
      screen.getAllByText('Conversations').length,
    ).toBeGreaterThan(0)

    expect(
      screen.getByRole('button', { name: 'New Chat' }),
    ).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText('Message Nexus AI...'),
    ).toBeInTheDocument()
  })

  it('creates a new conversation', () => {
    render(<ChatPage />)

    const newChatButtons = screen.getAllByRole('button', {
      name: 'New Chat',
    })

    fireEvent.click(newChatButtons[0])

    expect(
      screen.getAllByText('New conversation').length,
    ).toBeGreaterThan(0)
  })

  it('allows searching conversations', () => {
    render(<ChatPage />)

    const searchInput = screen.getByPlaceholderText(
      'Search conversations...',
    )

    fireEvent.change(searchInput, {
      target: { value: 'does-not-exist' },
    })

    expect(
      screen.getByText('No conversations found.'),
    ).toBeInTheDocument()
  })

  it('restores conversations from localStorage', () => {
    window.localStorage.setItem(
      'nexus-ai-chat-conversations',
      JSON.stringify([
        {
          id: 'saved-conversation',
          title: 'Saved conversation',
          messages: [
            {
              id: 1,
              role: 'user',
              content: 'Remember this conversation',
            },
          ],
        },
      ]),
    )

    render(<ChatPage />)

    expect(
      screen.getAllByText('Saved conversation').length,
    ).toBeGreaterThan(0)

    expect(
      screen.getByText('Remember this conversation'),
    ).toBeInTheDocument()
  })

  it('shows the back to home controls', () => {
    render(<ChatPage />)

    expect(
      screen.getAllByText('Back to Home').length,
    ).toBeGreaterThan(0)
  })
})
