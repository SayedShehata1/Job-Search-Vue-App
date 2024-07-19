import { expect, it, describe, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'
import { useJobsStore } from '@/stores/jobs'

vi.mock('axios')

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('stores job listings', () => {
    // use the store to get the jobs state and check that it is an empty array initially
    const store = useJobsStore()
    expect(store.jobs).toEqual([])
  })
  describe('FETCH_JOBS', () => {
    it('make API request and stores received jobs', async () => {
      // Mock the response from the API
      axios.get.mockResolvedValue({ data: ['job 1', 'job 2'] })
      //   use the store to call the FETCH_JOBS action and check that the jobs state is updated
      const store = useJobsStore()
      await store.FETCH_JOBS()
      expect(store.jobs).toEqual(['job 1', 'job 2'])
    })
  })
})
