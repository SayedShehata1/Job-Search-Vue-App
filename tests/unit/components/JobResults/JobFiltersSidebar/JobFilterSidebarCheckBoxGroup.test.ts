import { Mock, expect, it, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import { createTestingPinia } from '@pinia/testing'
import JobFilterSidebarCheckboxGroup from '@/components/JobResults/JobFilterSidebar/JobFilterSidebarCheckboxGroup.vue'
import { useUserStore } from '@/stores/user'

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
    const pinia = createTestingPinia({ stubActions: false })
    const userStore = useUserStore()

    render(JobFilterSidebarCheckboxGroup, {
      props: { ...props },
      global: {
        plugins: [pinia]
      }
    })
    return { userStore }
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
  describe('when user clears job filters', () => {
    it('unchecks any checked checkboxes', async () => {
      // mock the router to avoid errors
      useRouterMock.mockReturnValue({ push: vi.fn() })
      const props = createProps({
        uniqueValues: new Set(['full time']),
        action: vi.fn()
      })
      const { userStore } = renderJobFilterSidebarCheckboxGroup(props)
      // select the full time checkbox
      const fullTimeCheckboxBeforeAction = screen.getByRole<HTMLInputElement>('checkbox', {
        name: /full time/i
      })
      // check the checkbox is checked
      await userEvent.click(fullTimeCheckboxBeforeAction)
      expect(fullTimeCheckboxBeforeAction.checked).toBe(true)
      // clear the job filters by calling the store action
      userStore.CLEAR_USER_JOB_FILTER_SELECTIONS()

      // here we used findByRole because its async and we need to wait for the dom to update
      const fullTimeCheckboxAfterAction = await screen.findByRole<HTMLInputElement>('checkbox', {
        name: /full time/i
      })
      // check the checkbox is unchecked
      expect(fullTimeCheckboxAfterAction.checked).toBe(false)
    })
  })
})
