import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import VisionPage from './VisionPage'

const setCurrentView = vi.fn()

vi.mock('../store/navigation', () => ({
  useNavigationStore: (selector: (state: { setCurrentView: typeof setCurrentView }) => unknown) =>
    selector({ setCurrentView }),
}))

describe('VisionPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the vision workspace', () => {
    render(<VisionPage />)

    expect(screen.getByText('Nexus Vision')).toBeInTheDocument()
    expect(
      screen.getByText('Real-time visual intelligence workspace'),
    ).toBeInTheDocument()
    expect(screen.getByText('Vision workspace ready')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Start Camera' })).toBeInTheDocument()
  })

  it('returns to home when the back button is clicked', () => {
    render(<VisionPage />)

    fireEvent.click(screen.getByRole('button', { name: 'Back to home' }))

    expect(setCurrentView).toHaveBeenCalledWith('home')
  })

  it('shows local-first privacy and analysis controls', () => {
    render(<VisionPage />)

    expect(screen.getByText('Local-first')).toBeInTheDocument()
    expect(screen.getByText('Scene understanding')).toBeInTheDocument()
    expect(screen.getByText('Object detection')).toBeInTheDocument()
    expect(screen.getByText('Text recognition')).toBeInTheDocument()
    expect(screen.getByText('Recent Captures')).toBeInTheDocument()
  })
})
