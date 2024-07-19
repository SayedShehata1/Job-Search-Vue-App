import { expect, it, describe } from 'vitest'
import { render, screen } from '@testing-library/vue'

import userEvent from '@testing-library/user-event'

import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

describe('TextInput', () => {
  // Helper function to render the CollapsibleAccordion component
  const renderCollapsibleAccordion = (config = {}) => {
    render(CollapsibleAccordion, {
      global: {
        // Mock the FontAwesomeIcon component
        stubs: {
          FontAwesomeIcon: true
        }
      },

      props: {
        // Pass the header prop
        header: 'My Category'
      },
      slots: {
        // Provide the child content as a slot
        default: '<h3>Child Content</h3>'
      },
      ...config
    })
  }

  it('renders child content', async () => {
    const props = {
      header: 'My Category'
    }

    // Provide the child content as a slot
    const slots = {
      default: '<h3>Child Content</h3>'
    }
    const config = { props, slots }
    // render the CollapsibleAccordion component with the provided configuration
    renderCollapsibleAccordion(config)

    // Check if the child content is not rendered initially
    expect(screen.queryByText('Child Content')).not.toBeInTheDocument()

    // Find the button element and click it
    const button = screen.getByRole('button', {
      name: /My Category/i
    })
    await userEvent.click(button)
    // Check if the child content is rendered after clicking the button
    expect(screen.getByText('Child Content')).toBeInTheDocument()
  })

  describe('when parent does not provide custom child content ', () => {
    it('renders default content', async () => {
      const props = {
        header: 'My Category'
      }
      // we removed the slot from the render method to test the default content
      const slots = {}
      const config = { props, slots }

      renderCollapsibleAccordion(config)

      const button = screen.getByRole('button', {
        name: /My Category/i
      })
      await userEvent.click(button)
      // Check if the default content is rendered after clicking the button
      expect(screen.getByText('whooops, somebody forget to add text')).toBeInTheDocument()
    })
  })
})
