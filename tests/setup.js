import { cleanup } from '@testing-library/vue'
import * as matchers from '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'

expect.extend(matchers)

afterEach(() => {
  // Clean up the document body after each test
  cleanup()
})
