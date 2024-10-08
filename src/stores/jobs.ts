import { defineStore } from 'pinia'

import getJobs from '@/api/getJobs'

import { useUserStore } from '@/stores/user'

import type { Job } from '@/api/types'

export const FETCH_JOBS = 'FETCH_JOBS'
export const UNIQUE_ORGANIZATIONS = 'UNIQUE_ORGANIZATIONS'
export const FILTERED_JOBS = 'FILTERED_JOBS'
export const UNIQUE_JOB_TYPES = 'UNIQUE_JOB_TYPES'

export const INCLUDE_JOB_BY_ORGANIZATION = 'INCLUDE_JOB_BY_ORGANIZATION'
export const INCLUDE_JOB_BY_JOB_TYPE = 'INCLUDE_JOB_BY_JOB_TYPE'
export const INCLUDE_JOB_BY_DEGREE = 'INCLUDE_JOB_BY_DEGREE'
export const INCLUDE_JOB_BY_SKILLS = 'INCLUDE_JOB_BY_SKILLS'

export interface JobsState {
  jobs: Job[]
}

export const useJobsStore = defineStore('jobs', {
  state: (): JobsState => ({
    jobs: []
  }),
  actions: {
    async [FETCH_JOBS]() {
      const jobs = await getJobs()
      this.jobs = jobs
    }
  },
  getters: {
    // find unique organizations from list of jobs
    [UNIQUE_ORGANIZATIONS](state) {
      const uniqueOrganizations = new Set<string>()
      state.jobs.forEach((job) => uniqueOrganizations.add(job.organization))
      return uniqueOrganizations
    },
    // find unique job types from list of jobs
    [UNIQUE_JOB_TYPES](state) {
      // create a set to store unique job types
      const uniqueJobTypes = new Set<string>()
      // iterate over the jobs and add the job type to the set
      state.jobs.forEach((job) => uniqueJobTypes.add(job.jobType))
      return uniqueJobTypes
    },
    // include job by organization
    [INCLUDE_JOB_BY_ORGANIZATION]: () => (job: Job) => {
      const userStore = useUserStore()
      // if the user has not selected any organizations, the job is included
      if (userStore.selectedOrganizations.length === 0) return true
      // check if the job's organization is in the user's selected organizations
      return userStore.selectedOrganizations.includes(job.organization)
    },
    [INCLUDE_JOB_BY_JOB_TYPE]: () => (job: Job) => {
      const userStore = useUserStore()
      if (userStore.selectedJobTypes.length === 0) return true
      return userStore.selectedJobTypes.includes(job.jobType)
    },
    [INCLUDE_JOB_BY_DEGREE]: () => (job: Job) => {
      const userStore = useUserStore()
      if (userStore.selectedDegrees.length === 0) return true
      return userStore.selectedDegrees.includes(job.degree)
    },
    [INCLUDE_JOB_BY_SKILLS]: () => (job: Job) => {
      const userStore = useUserStore()
      if (userStore.skillsSearchTerm === '') return true
      return job.title.toLowerCase().includes(userStore.skillsSearchTerm.toLowerCase())
    },

    // filter jobs by organization and job type
    [FILTERED_JOBS](state): Job[] {
      return state.jobs
        .filter((job) => this.INCLUDE_JOB_BY_ORGANIZATION(job))
        .filter((job) => this.INCLUDE_JOB_BY_JOB_TYPE(job))
        .filter((job) => this.INCLUDE_JOB_BY_DEGREE(job))
        .filter((job) => this.INCLUDE_JOB_BY_SKILLS(job))
    }
  }
})
