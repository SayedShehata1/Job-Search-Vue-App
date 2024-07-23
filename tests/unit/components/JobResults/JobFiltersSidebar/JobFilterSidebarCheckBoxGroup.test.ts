import { Mock, expect, it, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import { createTestingPinia } from '@pinia/testing'
import JobFilterSidebarCheckboxGroup from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarCheckboxGroup.vue'

import { useRouter } from 'vue-router'

vi.mock('vue-router')
const useRouterMock = useRouter as Mock

describe('JobFilterSidebarCheckboxGroup', () => {
  interface JobFilterSidebarCheckboxGroupProps {
    uniqueValues: Set<string>
    action: Mock
  }

  const createProps = (
    props: Partial<JobFilterSidebarCheckboxGroupProps> = {}
  ): JobFilterSidebarCheckboxGroupProps => ({
    uniqueValues: new Set(['Value 1', 'Value 2']),
    action: vi.fn(),
    ...props
  })

  // a helper function to render the JobFilterSidebarJobTypes component
  const renderJobFilterSidebarCheckboxGroup = (props: JobFilterSidebarCheckboxGroupProps) => {
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
      uniqueValues: new Set(['full time', 'part time'])
    })
    renderJobFilterSidebarCheckboxGroup(props)

    // check that the unique jobtypess are rendered
    const jobTypesListItems = screen.getAllByRole('listitem')
    const jobTypes = jobTypesListItems.map((node) => node.textContent)

    expect(jobTypes).toEqual(['full time', 'part time'])
  })

  describe('when user selects a jobtypes', () => {
    it('communicate that user has a selected checkbox for value', async () => {
      useRouterMock.mockReturnValue({ push: vi.fn() })
      const action = vi.fn()
      const props = createProps({
        uniqueValues: new Set(['full time', 'part time']),
        action
      })
      renderJobFilterSidebarCheckboxGroup(props)

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
      const action = vi.fn()

      useRouterMock.mockReturnValue({ push })
      const props = createProps({
        uniqueValues: new Set(['full time']),
        action
      })
      renderJobFilterSidebarCheckboxGroup(props)

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /full time/i
      })
      await userEvent.click(fullTimeCheckbox)
      expect(push).toHaveBeenCalledWith({ name: 'JobResults' })
    })
  })
})
