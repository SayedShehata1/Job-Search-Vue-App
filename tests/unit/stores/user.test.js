import { expect, it, describe, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { useUserStore } from '@/stores/user'

describe('state', () => {
  // Create a new Pinia instance for each test
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('keeps track of if user is logged in', () => {
    // Create a new store instance for each test
    const store = useUserStore()
    // Check that the user is not logged in by default
    expect(store.isLoggedIn).toBe(false)
  })
})

describe('actions', () => {
  it('logs in the user', () => {
    const store = useUserStore()
    // Call the action to log in the user
    store.loginUser()
    // Check that the user is now logged in
    expect(store.isLoggedIn).toBe(true)
  })
})
