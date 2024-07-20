import { expect, it, describe } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import { createTestingPinia } from '@pinia/testing'
import JobFilterSidebarOrganizations from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarOrganizations.vue'
import { useJobsStore } from '@/stores/jobs'

import { useUserStore } from '@/stores/user'

describe('JobFilterSidebarOrganizations', () => {
  // a helper function to render the JobFilterSidebarOrganizations component
  const renderJobFilterSidebarOrganizations = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    const userStore = useUserStore()

    render(JobFilterSidebarOrganizations, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
    return { jobsStore, userStore }
  }

  it('render unique organizations from jobs', async () => {
    const { jobsStore } = renderJobFilterSidebarOrganizations()
    // set the UNIQUE_ORGANIZATIONS getter to return a set of unique organizations
    jobsStore.UNIQUE_ORGANIZATIONS = new Set(['Google', 'Amazon'])

    // first click the organization button
    const button = screen.getByRole('button', {
      name: /organization/i
    })
    await userEvent.click(button)
    // check that the unique organizations are rendered
    const organizationListItems = screen.getAllByRole('listitem')
    const organizations = organizationListItems.map((node) => node.textContent)

    expect(organizations).toEqual(['Google', 'Amazon'])
  })
  it('communicate that user has a selected checkbox for an organization', async () => {
    const { userStore, jobsStore } = renderJobFilterSidebarOrganizations()
    // set the UNIQUE_ORGANIZATIONS getter to return a set of unique organizations
    jobsStore.UNIQUE_ORGANIZATIONS = new Set(['Google', 'Amazon'])

    // first click the organization button
    const button = screen.getByRole('button', {
      name: /organization/i
    })
    await userEvent.click(button)
    // second click the google checkbox
    const googleCheckbox = screen.getByRole('checkbox', {
      name: /google/i
    })
    await userEvent.click(googleCheckbox)
    // check that the user store has the selected organization google
    expect(userStore.ADD_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith(['Google'])
  })
})
