import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@react-three/fiber', () => ({
  Canvas: () => (
    <div data-testid="mock-r3f-canvas" />
  ),
  useFrame: vi.fn(),
}))

import NexusGLSLBackground from './NexusGLSLBackground'

describe('Nexus GLSL background engine', () => {
  it('renders the WebGL background layer', () => {
    render(<NexusGLSLBackground />)

    expect(
      screen.getByTestId('nexus-glsl-background'),
    ).toBeInTheDocument()

    expect(
      screen.getByTestId('mock-r3f-canvas'),
    ).toBeInTheDocument()
  })
})
