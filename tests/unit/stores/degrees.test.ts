import { type Mock, expect, it, describe, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { useDegreesStore } from '@/stores/degrees'

import axios from 'axios'

import { createDegree } from '@/utils/createDegree'

// Mock the axios.get function
vi.mock('axios')
// to wokr with TS, we need to cast axios.get as Mock
const axiosGetMock = axios.get as Mock

describe('state', () => {
  beforeEach(() => {
    // Create a new pinia instance for each test to avoid sharing state
    setActivePinia(createPinia())
  })
  it('stores all degrees that jobs my require', () => {
    // Create a new store instance and check that the degrees state  initially an empty array
    const store = useDegreesStore()
    expect(store.degrees).toEqual([])
  })
})

describe('actions', () => {
  beforeEach(() => {
    // Create a new pinia instance for each test to avoid sharing
    setActivePinia(createPinia())
  })
  it('fetches degrees from the api', async () => {
    // Mock the response from the API
    axiosGetMock.mockResolvedValue({ data: [{ id: 1, degree: 'BSc' }] })
    const store = useDegreesStore()
    // Call the FETCH_DEGREES action and check that the degrees state is updated
    await store.FETCH_DEGREES()
    expect(store.degrees).toEqual([{ id: 1, degree: 'BSc' }])
  })
})

describe('getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('finds unique degrees from list of jobs', () => {
    const store = useDegreesStore()
    // Set the degrees state to a list of degrees
    store.degrees = [createDegree({ degree: 'BSc' }), createDegree({ degree: 'MSc' })]
    // Check that the UNIQUE_DEGREES getter returns a list of unique degrees
    const result = store.UNIQUE_DEGREES
    expect(result).toEqual(['BSc', 'MSc'])
  })
})
