import { expect, it, describe } from 'vitest'
import { render, screen } from '@testing-library/vue'

import ActionButton from '@/components/Shared/ActionButton.vue'

describe('ActionButton', () => {
  it('render text', () => {
    render(ActionButton, {
      props: {
        text: 'Click me',
        type: 'primary'
      }
    })
    //  check with the text click me is present in the document
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })
  it('applies one of several styles to button', () => {
    render(ActionButton, {
      props: {
        text: 'Click me',
        type: 'primary'
      }
    })
    //  check with the button has primary class
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toHaveClass('primary')
  })
})
