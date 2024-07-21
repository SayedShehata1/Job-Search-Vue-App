import { expect, it, describe } from 'vitest'
import { render, screen } from '@testing-library/vue'

import TheSubnav from '@/components/Navigation/TheSubnav.vue'

import { createTestingPinia } from '@pinia/testing'
import { useJobsStore } from '@/stores/jobs'

describe('TheSubnav', () => {
  //  helper function to render the subnav component
  const renderTheSubnav = (routeName) => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    render(TheSubnav, {
      global: {
        plugins: [pinia],
        mocks: {
          $route: {
            name: routeName
          }
        },

        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
    return { jobsStore }
  }

  describe('when user is on jobs page', () => {
    it('display job count', async () => {
      const routeName = 'JobResults'

      // get the jobs store from the renderTheSubnav function
      const { jobsStore } = renderTheSubnav(routeName)
      const numberOfJobs = 16
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({})

      //   get the job count element and check if it is in the document
      const jobCount = await screen.findByText(numberOfJobs)
      expect(jobCount).toBeInTheDocument()
    })
  })
  describe('when user is not on jobs page', () => {
    it('does not display jobs count', () => {
      const routeName = 'Home'
      const { jobsStore } = renderTheSubnav(routeName)
      const numberOfJobs = 16
      // set the FILTERED_JOBS to an array of objects with the length of the number of jobs
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({})

      //   get the job count element and check if it is not in the document
      const jobCount = screen.queryByText(numberOfJobs)
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
