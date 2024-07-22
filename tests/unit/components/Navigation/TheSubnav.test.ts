import { type Mock, expect, it, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'

import TheSubnav from '@/components/Navigation/TheSubnav.vue'

import { createTestingPinia } from '@pinia/testing'
import { useJobsStore } from '@/stores/jobs'

// mock the useRoute function from vue-router for composition api
import { useRoute } from 'vue-router'
vi.mock('vue-router')

const useRouteMock = useRoute as Mock

describe('TheSubnav', () => {
  //  helper function to render the subnav component
  const renderTheSubnav = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    render(TheSubnav, {
      global: {
        plugins: [pinia],

        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
    return { jobsStore }
  }

  describe('when user is on jobs page', () => {
    it('display job count', async () => {
      useRouteMock.mockReturnValue({ name: 'JobResults' })

      // get the jobs store from the renderTheSubnav function
      const { jobsStore } = renderTheSubnav()
      const numberOfJobs = 16

      // @ts-expect-error
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({})

      //   get the job count element and check if it is in the document
      const jobCount = await screen.findByText(numberOfJobs)
      expect(jobCount).toBeInTheDocument()
    })
  })
  describe('when user is not on jobs page', () => {
    it('does not display jobs count', () => {
      // mock the route to return the home page use composition api
      useRouteMock.mockReturnValue({ name: 'Home' })
      const { jobsStore } = renderTheSubnav()
      const numberOfJobs = 16
      // set the FILTERED_JOBS to an array of objects with the length of the number of jobs
      // @ts-expect-error
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({})

      //   get the job count element and check if it is not in the document
      const jobCount = screen.queryByText(numberOfJobs)
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
