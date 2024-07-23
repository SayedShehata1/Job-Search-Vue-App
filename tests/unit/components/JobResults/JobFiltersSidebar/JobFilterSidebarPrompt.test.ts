import { expect, it, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '@/stores/user'
import JobFilterSidebarPrompt from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarPrompt.vue'

describe('JobFilterSidebarPrompt', () => {
  it("when user clicks on the 'Clear All' button, it should clear all the filters", async () => {
    const pinia = createTestingPinia()
    const userStore = useUserStore()
    render(JobFilterSidebarPrompt, {
      global: {
        plugins: [pinia]
      }
    })

    // check that the 'Clear filters' button is rendered
    const button = screen.getByRole('button', { name: /clear filters/i })
    // click on the 'Clear filters' button
    await userEvent.click(button)
    // check that the user store's CLEAR_USER_JOB_FILTER_SELECTIONS action was called
    expect(userStore.CLEAR_USER_JOB_FILTER_SELECTIONS).toHaveBeenCalled()
  })
})
