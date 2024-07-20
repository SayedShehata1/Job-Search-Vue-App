import { expect, it, describe } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import { createTestingPinia } from '@pinia/testing'
import JobFilterSidebarOrganizations from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarOrganizations.vue'
import { useJobsStore } from '@/stores/jobs'

describe('JobFilterSidebarOrganizations', () => {
  it('render unique organizations from jobs', async () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    jobsStore.UNIQUE_ORGANIZATIONS = new Set(['Google', 'Amazon'])
    render(JobFilterSidebarOrganizations, {
      global: {
        plugins: [],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
    const button = screen.getByRole('button', {
      name: /organization/i
    })
    await userEvent.click(button)
    const organizationListItems = screen.getAllByRole('listitem')
    const organizations = organizationListItems.map((node) => node.textContent)
    expect(organizations).toEqual(['Google', 'Amazon'])
  })
})
