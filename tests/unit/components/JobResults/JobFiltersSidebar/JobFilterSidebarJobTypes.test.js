import { expect, it, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import { createTestingPinia } from '@pinia/testing'
import JobFilterSidebarJobTypes from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarJobTypes.vue'
import { useJobsStore } from '@/stores/jobs'

import { useUserStore } from '@/stores/user'

import { useRouter } from 'vue-router'

vi.mock('vue-router')

describe('JobFilterSidebarJobTypes', () => {
  // a helper function to render the JobFilterSidebarJobTypes component
  const renderJobFilterSidebarJobTypes = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    const userStore = useUserStore()
    render(JobFilterSidebarJobTypes, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
    return { jobsStore, userStore }
  }

  it('render unique job types from jobs', async () => {
    const { jobsStore } = renderJobFilterSidebarJobTypes()
    // set the UNIQUE_JOB_TYPES getter to return a set of unique jobtypess
    jobsStore.UNIQUE_JOB_TYPES = new Set(['full time', 'part time'])

    // first click the jobtypes button
    const button = screen.getByRole('button', {
      name: /job types/i
    })
    await userEvent.click(button)
    // check that the unique jobtypess are rendered
    const jobTypesListItems = screen.getAllByRole('listitem')
    const jobTypes = jobTypesListItems.map((node) => node.textContent)

    expect(jobTypes).toEqual(['full time', 'part time'])
  })

  describe('when user selects a jobtypes', () => {
    it('communicate that user has a selected checkbox for an jobTypes', async () => {
      useRouter.mockReturnValue({ push: vi.fn() })
      const { userStore, jobsStore } = renderJobFilterSidebarJobTypes()
      // set the UNIQUE_JOB_TYPES getter to return a set of unique jobtypess
      jobsStore.UNIQUE_JOB_TYPES = new Set(['full time', 'part time'])

      // first click the jobtypes button
      const button = screen.getByRole('button', {
        name: /job types/i
      })
      await userEvent.click(button)
      // second click the google checkbox
      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full time/i
      })
      await userEvent.click(fullTimeCheckbox)
      // check that the user store has the selected jobtypes google
      expect(userStore.ADD_SELECTED_JOB_TYPES).toHaveBeenCalledWith(['full time'])
    })
    it('navigates user to job results page tp see fresh batch fo filtered jobs', async () => {
      const push = vi.fn()
      useRouter.mockReturnValue({ push })
      const { jobsStore } = renderJobFilterSidebarJobTypes()
      // set the UNIQUE_JOB_TYPES getter to return a set of unique jobtypess
      jobsStore.UNIQUE_JOB_TYPES = new Set(['full time'])

      // first click the jobtypes button
      const button = screen.getByRole('button', {
        name: /job types/i
      })
      await userEvent.click(button)

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full time/i
      })
      await userEvent.click(fullTimeCheckbox)
      expect(push).toHaveBeenCalledWith({ name: 'JobResults' })
    })
  })
})
