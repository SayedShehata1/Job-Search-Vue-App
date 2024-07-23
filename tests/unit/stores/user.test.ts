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
  it('store job types that the user would like to filter jobs by', () => {
    const store = useUserStore()
    expect(store.selectedJobTypes).toEqual([])
  })
  it('stores degrees that the user would like to filter jobs by', () => {
    const store = useUserStore()
    expect(store.selectedDegrees).toEqual([])
  })
})

describe('actions', () => {
  it('logs in the user', () => {
    const store = useUserStore()
    // Call the action to log in the user
    store.LOGIN_USER()
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

  describe('ADD_SELECTED_JOB_TYPES', () => {
    it('updates job types that user has chosen to filter jobs by', () => {
      const store = useUserStore()
      store.ADD_SELECTED_JOB_TYPES(['Full Time', 'Part Time'])
      expect(store.selectedJobTypes).toEqual(['Full Time', 'Part Time'])
    })
  })
  describe('ADD_SELECTED_DEGREES', () => {
    it('updates degrees that user has chosen to filter jobs by', () => {
      const store = useUserStore()
      store.ADD_SELECTED_DEGREES(['Bachelors', 'Masters'])
      expect(store.selectedDegrees).toEqual(['Bachelors', 'Masters'])
    })
  })
  describe('CLEAR_USER_JOB_FILTER_SELECTIONS', () => {
    it('remove all job filter that user has chosen', () => {
      const store = useUserStore()
      store.selectedDegrees = ['Bachelors', 'Masters']
      store.selectedJobTypes = ['Full Time', 'Part Time']
      store.selectedOrganizations = ['Org1', 'Org2']
      store.CLEAR_USER_JOB_FILTER_SELECTIONS()
      expect(store.selectedDegrees).toEqual([])
      expect(store.selectedJobTypes).toEqual([])
      expect(store.selectedOrganizations).toEqual([])
    })
  })
})
