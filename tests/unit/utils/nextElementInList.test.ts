import { expect, it, describe } from 'vitest'

import nextElementInList from '@/utils/nextElementInList'

describe('nextElementInList', () => {
  it('locates element in list return the next element', () => {
    const list = ['A', 'B', 'C', 'D', 'E']
    const value = 'C'
    const result = nextElementInList(list, value)
    expect(result).toBe('D')
  })

  describe('when the value is the last element in the list', () => {
    it('returns the first element', () => {
      const list = ['A', 'B', 'C', 'D', 'E']
      const value = 'E'
      const result = nextElementInList(list, value)
      expect(result).toBe('A')
    })
  })
})
