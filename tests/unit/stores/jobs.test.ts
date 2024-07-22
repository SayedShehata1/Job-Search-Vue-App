import { expect, it, describe, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import type { Mock } from 'vitest'
import type { Job } from '@/api/types'

import { createJob } from '../../utils/createJob'

vi.mock('axios')
// TS expects axios.get to be a function, but we are mocking it as an object
const axiosGetMock = axios.get as Mock

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
      axiosGetMock.mockResolvedValue({ data: ['job 1', 'job 2'] })
      //   use the store to call the FETCH_JOBS action and check that the jobs state is updated
      const store = useJobsStore()
      await store.FETCH_JOBS()
      expect(store.jobs).toEqual(['job 1', 'job 2'])
    })
  })

  describe('getters', () => {
    beforeEach(() => {
      setActivePinia(createPinia())
    })

    //  test the UNIQUE_ORGANIZATIONS getter
    describe('UNIQUE_ORGANIZATIONS', () => {
      it('finds unique organizations from list of jobs', () => {
        const store = useJobsStore()
        //  set the jobs state to a list of jobs with duplicate organizations
        store.jobs = [
          createJob({ organization: 'Google' }),
          createJob({ organization: 'Amazon' }),
          createJob({ organization: 'Google' })
        ]
        //  use the store to get the UNIQUE_ORGANIZATIONS getter and check that it returns a set of unique organizations
        const result = store.UNIQUE_ORGANIZATIONS
        expect(result).toEqual(new Set(['Google', 'Amazon']))
      })
    })

    describe('UNIQUE_JOB_TYPES', () => {
      it('finds unique job types from list of jobs', () => {
        const jobStore = useJobsStore()
        // add a list of jobs to the jobs state
        jobStore.jobs = [
          createJob({ jobType: 'Full Time' }),
          createJob({ jobType: 'Part Time' }),
          createJob({ jobType: 'Full Time' })
        ]
        // use the store to get the UNIQUE_JOB_TYPES getter and check that it returns a set of unique job types
        const result = jobStore.UNIQUE_JOB_TYPES
        expect(result).toEqual(new Set(['Full Time', 'Part Time']))
      })
    })

    describe('INCLUDE_JOB_BY_ORGANIZATION', () => {
      describe('when the user has not selected any organizations', () => {
        it('includes job', () => {
          const userStore = useUserStore()
          userStore.selectedOrganizations = []
          const store = useJobsStore()
          const job = createJob({ organization: 'Google' })
          const result = store.INCLUDE_JOB_BY_ORGANIZATION(job)
          expect(result).toBe(true)
        })
      })
      it("identifies jobs that are associated with the user's selected organizations", () => {
        const userStore = useUserStore()
        userStore.selectedOrganizations = ['Google', 'Microsoft']
        const store = useJobsStore()
        const job = createJob({ organization: 'Google' })
        const result = store.INCLUDE_JOB_BY_ORGANIZATION(job)
        expect(result).toBe(true)
      })
    })
    describe('INCLUDE_JOB_BY_JOB_TYPE', () => {
      describe('when the user has not selected any job types', () => {
        it('includes job', () => {
          const userStore = useUserStore()
          userStore.selectedJobTypes = []
          const store = useJobsStore()
          const job = createJob({ jobType: 'Full Time' })
          const result = store.INCLUDE_JOB_BY_JOB_TYPE(job)
          expect(result).toBe(true)
        })
      })
      it("identifies jobs that are associated with the user's selected job types", () => {
        const userStore = useUserStore()
        userStore.selectedJobTypes = ['Full Time', 'Part Time']
        const store = useJobsStore()
        const job = createJob({ jobType: 'Full Time' })
        const result = store.INCLUDE_JOB_BY_JOB_TYPE(job)
        expect(result).toBe(true)
      })
    })
  })
})
