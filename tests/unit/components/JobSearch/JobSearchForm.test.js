import { expect, it, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import JobSearchForm from '@/components/JobSearch/JobSearchForm.vue'

describe('JobSearchForm', () => {
  describe('when user submits the form', () => {
    it("directs user to job results page with user's search parameters", async () => {
      //   make the push function a spy
      const push = vi.fn()
      //  create a mock router object with a push method that calls the spy
      const $router = { push }
      render(JobSearchForm, {
        //  pass the mock router object to the component
        global: {
          mocks: {
            $router
          },
          stubs: {
            FontAwesomeIcon: true
          }
        }
      })
      //   fill out the role input field
      const roleInput = screen.getByRole('textbox', {
        name: /role/i
      })
      await userEvent.type(roleInput, 'Vue Developer')

      //   fill out the location input field
      const locationInput = screen.getByRole('textbox', {
        name: /where/i
      })
      await userEvent.type(locationInput, 'Cairo Egypt')

      //   click the submit button
      const submitButton = screen.getByRole('button', {
        name: /search/i
      })
      await userEvent.click(submitButton)

      //   expect the spy to have been called with the correct arguments
      expect(push).toHaveBeenCalledWith({
        name: 'JobResults',
        query: {
          role: 'Vue Developer',
          location: 'Cairo Egypt'
        }
      })
    })
  })
})
