import { expect, it, describe } from 'vitest'
import { render, screen } from '@testing-library/vue'

import userEvent from '@testing-library/user-event'
import TextInput from '@/components/Shared/TextInput.vue'

describe('TextInput', () => {
  it('communicate that user has entered character', async () => {
    // render the TextInput component with modelValue as empty string
    const { emitted } = render(TextInput, {
      props: {
        modelValue: ''
      }
    })
    // get the input element
    const input = screen.getByRole('textbox')
    // type NYC in the input element
    await userEvent.type(input, 'NYC')
    //check with the emitted event
    const message = emitted()['update:modelValue']
    // check with the emitted event
    expect(message).toEqual([['N'], ['NY'], ['NYC']])
  })
})
