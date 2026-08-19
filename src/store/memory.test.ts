import { beforeEach, describe, expect, it } from 'vitest'
import {
  useMemoryStore,
  type MemoryItem,
} from './memory'

const createMemory = (
  overrides: Partial<MemoryItem> = {},
): MemoryItem => ({
  id: 'memory-1',
  title: 'Test Memory',
  content: 'Test memory content',
  type: 'Fact',
  source: 'Test',
  created: 'Today',
  tags: ['test'],
  important: false,
  ...overrides,
})

describe('Memory store', () => {
  beforeEach(() => {
    useMemoryStore.setState({
      memories: [],
      selectedMemoryId: null,
      searchQuery: '',
      selectedType: 'All',
    })
  })

  it('starts with an empty memory collection', () => {
    const state = useMemoryStore.getState()

    expect(state.memories).toEqual([])
    expect(state.selectedMemoryId).toBeNull()
    expect(state.searchQuery).toBe('')
    expect(state.selectedType).toBe('All')
  })

  it('sets memories and selects the first memory', () => {
    const memories = [
      createMemory(),
      createMemory({
        id: 'memory-2',
        title: 'Second Memory',
      }),
    ]

    useMemoryStore.getState().setMemories(memories)

    const state = useMemoryStore.getState()

    expect(state.memories).toEqual(memories)
    expect(state.selectedMemoryId).toBe('memory-1')
  })

  it('adds a memory and selects it', () => {
    const memory = createMemory()

    useMemoryStore.getState().addMemory(memory)

    const state = useMemoryStore.getState()

    expect(state.memories).toEqual([memory])
    expect(state.selectedMemoryId).toBe('memory-1')
  })

  it('updates an existing memory', () => {
    useMemoryStore
      .getState()
      .setMemories([createMemory()])

    useMemoryStore.getState().updateMemory('memory-1', {
      title: 'Updated Memory',
      important: true,
    })

    const memory =
      useMemoryStore.getState().memories[0]

    expect(memory.title).toBe('Updated Memory')
    expect(memory.important).toBe(true)
    expect(memory.content).toBe(
      'Test memory content',
    )
  })

  it('deletes a memory and selects the next available memory', () => {
    const memories = [
      createMemory(),
      createMemory({
        id: 'memory-2',
        title: 'Second Memory',
      }),
    ]

    useMemoryStore.getState().setMemories(memories)

    useMemoryStore
      .getState()
      .deleteMemory('memory-1')

    const state = useMemoryStore.getState()

    expect(state.memories).toHaveLength(1)
    expect(state.memories[0].id).toBe('memory-2')
    expect(state.selectedMemoryId).toBe('memory-2')
  })

  it('can select a specific memory', () => {
    const memories = [
      createMemory(),
      createMemory({
        id: 'memory-2',
      }),
    ]

    useMemoryStore.getState().setMemories(memories)

    useMemoryStore
      .getState()
      .setSelectedMemoryId('memory-2')

    expect(
      useMemoryStore.getState().selectedMemoryId,
    ).toBe('memory-2')
  })

  it('stores the search query', () => {
    useMemoryStore
      .getState()
      .setSearchQuery('development')

    expect(
      useMemoryStore.getState().searchQuery,
    ).toBe('development')
  })

  it('stores the selected memory type', () => {
    useMemoryStore
      .getState()
      .setSelectedType('Preference')

    expect(
      useMemoryStore.getState().selectedType,
    ).toBe('Preference')
  })

  it('clears search and type filters', () => {
    useMemoryStore
      .getState()
      .setSearchQuery('nexus')

    useMemoryStore
      .getState()
      .setSelectedType('Fact')

    useMemoryStore.getState().clearFilters()

    const state = useMemoryStore.getState()

    expect(state.searchQuery).toBe('')
    expect(state.selectedType).toBe('All')
  })
})
