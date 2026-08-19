import React from 'react'
import { act, render, screen } from '@testing-library/react'
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import StartupPage from './StartupPage'
import { useNavigationStore } from '../store/navigation'

vi.mock('@react-three/fiber', () => {
  const ThreePrimitive = ({
    children,
  }: {
    children?: React.ReactNode
  }) => <>{children}</>

  return {
    Canvas: ({
      children,
    }: {
      children: React.ReactNode
    }) => (
      <div data-testid="three-canvas">
        {children}
      </div>
    ),

    useFrame: () => {},

    ambientLight: ThreePrimitive,
    pointLight: ThreePrimitive,
    group: ThreePrimitive,
    mesh: ThreePrimitive,
    sphereGeometry: ThreePrimitive,
    torusGeometry: ThreePrimitive,
    meshPhysicalMaterial: ThreePrimitive,
    meshBasicMaterial: ThreePrimitive,
  }
})

describe('StartupPage', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    useNavigationStore.setState({
      currentView: 'startup',
      isBooted: false,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('renders the minimal visual-only Nexus boot screen', () => {
    render(<StartupPage />)

    expect(
      screen.getByTestId('nexus-startup'),
    ).toBeInTheDocument()

    expect(
      screen.getByTestId('three-canvas'),
    ).toBeInTheDocument()
  })

  it('contains no startup text or module list', () => {
    render(<StartupPage />)

    expect(
      screen.queryByText('NEXUS AI'),
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText('Personal Intelligence'),
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText('Initializing...'),
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText('AI Core'),
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText('Memory System'),
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText('Voice Engine'),
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText('Vision Engine'),
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText('Automation'),
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText('Plugins'),
    ).not.toBeInTheDocument()
  })

  it('enters the home view after the boot animation', () => {
    render(<StartupPage />)

    act(() => {
      vi.advanceTimersByTime(3800)
    })

    act(() => {
      vi.advanceTimersByTime(550)
    })

    expect(
      useNavigationStore.getState().isBooted,
    ).toBe(true)

    expect(
      useNavigationStore.getState().currentView,
    ).toBe('home')
  })
})
