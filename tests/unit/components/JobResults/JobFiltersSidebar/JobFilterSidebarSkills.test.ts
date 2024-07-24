import { Mock, expect, it, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '@/stores/user'

import JobFilterSidebarSkills from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarSkills.vue'

describe('JobFilterSidebarSkills', () => {
  const renderJobFilterSidebarSkills = () => {
    const pinia = createTestingPinia()
    const userStore = useUserStore()
    render(JobFilterSidebarSkills, {
      global: {
        plugins: [pinia]
      }
    })
    return { userStore }
  }
  it('populates search input from store', async () => {
    // Create a mock store with a skills search term
    const { userStore } = renderJobFilterSidebarSkills()
    // Set the skills search term to 'Programmer'
    userStore.skillsSearchTerm = 'Programmer'
    // Find the input field and check its value (using the findByRole because the input is lazy loaded and not immediately available to make it async)
    const input = await screen.findByRole<HTMLInputElement>('textbox')
    // Check that the input field has the value 'Programmer'
    expect(input.value).toBe('Programmer')
  })
  it('writes user input to store', async () => {
    const { userStore } = renderJobFilterSidebarSkills()
    userStore.skillsSearchTerm = ''
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, 'V')
    // click outside the input field to trigger the lazy update
    await userEvent.click(document.body)
    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith('V')
  })
  it('remove white space from user input', async () => {
    const { userStore } = renderJobFilterSidebarSkills()
    userStore.skillsSearchTerm = ''
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, '     Vue Developer     ')
    // click outside the input field to trigger the lazy update
    await userEvent.click(document.body)
    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith('Vue Developer')
  })
})
