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
  // Add a test for the selectedOrganizations state initial case
  it('stores organizations that the user would like to filter jobs by', () => {
    const store = useUserStore()
    // Check that the selectedOrganizations array is empty by default
    expect(store.selectedOrganizations).toEqual([])
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

  describe('Add_Selected_Organization', () => {
    it('UPDATE_SELECTED_ORGANIZATIONS', () => {
      const store = useUserStore()
      // Add two organizations to the selectedOrganizations array using the action
      store.ADD_SELECTED_ORGANIZATIONS(['Org1', 'Org2'])
      // Check that the selectedOrganizations array now contains the two organizations
      expect(store.selectedOrganizations).toEqual(['Org1', 'Org2'])
    })
  })
})
