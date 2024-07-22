import { expect, it, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'

import TheHeadline from '@/components/JobSearch/TheHeadline.vue'

describe('TheHeadline', () => {
  it('display introductory action verb', () => {
    // useFakeTimers() is used to mock the timers in the test
    // useRealTimers() is used to restore the timers to their original state
    vi.useFakeTimers()
    render(TheHeadline)
    const actionPhrase = screen.getByRole('heading', {
      name: /build for everyone/i
    })
    expect(actionPhrase).toBeInTheDocument()
    // restore the timers to their original state
    vi.useRealTimers()
  })
  it('changes action verb at a consistent interval', () => {
    vi.useFakeTimers()
    const mock = vi.fn()
    // call setInterval with the mock function
    vi.stubGlobal('setInterval', mock)
    render(TheHeadline)
    // check if the interval is called
    expect(mock).toHaveBeenCalled()
    vi.useRealTimers()
  })

  it('remove interval when component is unmounted', () => {
    vi.useFakeTimers()
    const clearIntervalMock = vi.fn()
    vi.stubGlobal('clearInterval', clearIntervalMock)

    // render the component and unmount it
    const { unmount } = render(TheHeadline)
    unmount()

    expect(clearIntervalMock).toHaveBeenCalled()
  })
})
