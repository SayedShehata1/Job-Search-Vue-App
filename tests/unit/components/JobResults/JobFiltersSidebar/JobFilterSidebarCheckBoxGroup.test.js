import { expect, it, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import { createTestingPinia } from '@pinia/testing'
import JobFilterSidebarCheckboxGroup from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarCheckboxGroup.vue'

import { useRouter } from 'vue-router'

vi.mock('vue-router')

describe('JobFilterSidebarCheckboxGroup', () => {
  const createProps = (props = {}) => ({
    header: 'Some header',
    uniqueValues: new Set(['Value 1', 'Value 2']),
    actions: vi.fn(),
    ...props
  })

  // a helper function to render the JobFilterSidebarJobTypes component
  const renderJobFilterSidebarCheckboxGroup = (props) => {
    const pinia = createTestingPinia()
    render(JobFilterSidebarCheckboxGroup, {
      props: { ...props },
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
  }

  it('render unique list of values', async () => {
    const props = createProps({
      header: 'Job Types',
      uniqueValues: new Set(['full time', 'part time'])
    })
    renderJobFilterSidebarCheckboxGroup(props)

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
    it('communicate that user has a selected checkbox for value', async () => {
      useRouter.mockReturnValue({ push: vi.fn() })
      const action = vi.fn()
      const props = createProps({
        header: 'Job Types',
        uniqueValues: new Set(['full time', 'part time']),
        action
      })
      renderJobFilterSidebarCheckboxGroup(props)

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
      expect(action).toHaveBeenCalledWith(['full time'])
    })
    it('navigates user to job results page tp see fresh batch fo filtered jobs', async () => {
      const push = vi.fn()
      useRouter.mockReturnValue({ push })
      const props = createProps({
        header: 'Job Types',
        uniqueValues: new Set(['full time'])
      })
      renderJobFilterSidebarCheckboxGroup(props)

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
