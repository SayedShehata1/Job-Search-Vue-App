import { expect, it, describe, beforeEach, vi } from 'vitest'

import usePreviousAndNextPages from '@/composables/usePreviousAndNextPages'

describe('usePreviousAndNextPages', () => {
  it('calculates page before current one', () => {
    const currentPage = { value: 8 }
    const maxPage = { value: 10 }
    const { previousPage } = usePreviousAndNextPages(currentPage, maxPage)
    expect(previousPage.value).toBe(7)
  })
  describe('when current page is the first one', () => {
    it('does not provide a previous page', () => {
      const currentPage = { value: 1 }
      const maxPage = { value: 1 }
      const { previousPage } = usePreviousAndNextPages(currentPage, maxPage)
      expect(previousPage.value).toBeUndefined()
    })
  })
  it('calculates page after current one', () => {
    const currentPage = { value: 8 }
    const maxPage = { value: 10 }
    const { nextPage } = usePreviousAndNextPages(currentPage, maxPage)
    expect(nextPage.value).toBe(9)
  })
  describe('when current page is the last one', () => {
    it('does not provide a next page', () => {
      const currentPage = { value: 10 }
      const maxPage = { value: 10 }
      const { nextPage } = usePreviousAndNextPages(currentPage, maxPage)
      expect(nextPage.value).toBeUndefined()
    })
  })
})
