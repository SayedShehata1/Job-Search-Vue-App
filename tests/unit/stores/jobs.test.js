import { expect, it, describe, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

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
  //  test the UNIQUE_ORGANIZATIONS getter
  describe('UNIQUE_ORGANIZATIONS', () => {
    it('finds unique organizations from list of jobs', () => {
      const store = useJobsStore()
      //  set the jobs state to a list of jobs with duplicate organizations
      store.jobs = [
        { organization: 'Google' },
        { organization: 'Amazon' },
        { organization: 'Google' }
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
      jobStore.jobs = [{ jobType: 'Full Time' }, { jobType: 'Part Time' }, { jobType: 'Full Time' }]
      // use the store to get the UNIQUE_JOB_TYPES getter and check that it returns a set of unique job types
      const result = jobStore.UNIQUE_JOB_TYPES
      expect(result).toEqual(new Set(['Full Time', 'Part Time']))
    })
  })

  describe('FILTERED_JOBS_ORGANIZATIONs', () => {
    it('identifies jobs that are associated with the given organization', () => {
      const jobStore = useJobsStore()
      // add a list of jobs to the jobs state
      jobStore.jobs = [
        { organization: 'Google' },
        { organization: 'Amazon' },
        { organization: 'Microsoft' }
      ]
      // use the store to get the FILTERED_JOBS_ORGANIZATIONS getter and check that it returns jobs that are associated with the given organization
      const userStore = useUserStore()
      userStore.selectedOrganizations = ['Google', 'Microsoft']
      const result = jobStore.FILTERED_JOBS_ORGANIZATIONS
      expect(result).toEqual([{ organization: 'Google' }, { organization: 'Microsoft' }])
    })
    describe('when no organization is selected', () => {
      it('returns all jobs', () => {
        const jobStore = useJobsStore()
        jobStore.jobs = [
          { organization: 'Google' },
          { organization: 'Amazon' },
          { organization: 'Microsoft' }
        ]
        const userStore = useUserStore()
        userStore.selectedOrganizations = []
        const result = jobStore.FILTERED_JOBS_ORGANIZATIONS

        expect(result).toEqual([
          { organization: 'Google' },
          { organization: 'Amazon' },
          { organization: 'Microsoft' }
        ])
      })
    })
  })
  describe('FILTERED_JOBS_BY_JOB_TYPES', () => {
    it('identifies jobs that are associated with the given job type', () => {
      const jobStore = useJobsStore()
      jobStore.jobs = [{ jobType: 'Full Time' }, { jobType: 'Temporary' }, { jobType: 'Part Time' }]
      const userStore = useUserStore()
      userStore.selectedJobTypes = ['Full Time', 'Part Time']
      const result = jobStore.FILTERED_JOBS_BY_JOB_TYPES
      expect(result).toEqual([{ jobType: 'Full Time' }, { jobType: 'Part Time' }])
    })
  })
  describe('when the user has not selected any job types', () => {
    it('returns all jobs', () => {
      const jobStore = useJobsStore()
      jobStore.jobs = [{ jobType: 'Full Time' }, { jobType: 'Temporary' }, { jobType: 'Part Time' }]
      const userStore = useUserStore()
      userStore.selectedJobTypes = []
      const result = jobStore.FILTERED_JOBS_BY_JOB_TYPES
      expect(result).toEqual([
        { jobType: 'Full Time' },
        { jobType: 'Temporary' },
        { jobType: 'Part Time' }
      ])
    })
  })
})
