import { defineStore } from 'pinia'
import { ref } from 'vue'

export const ADD_SELECTED_ORGANIZATIONS = 'ADD_SELECTED_ORGANIZATIONS'
export const ADD_SELECTED_JOB_TYPES = 'ADD_SELECTED_JOB_TYPES'
export const ADD_SELECTED_DEGREES = 'ADD_SELECTED_DEGREES'
export const CLEAR_USER_JOB_FILTER_SELECTIONS = 'CLEAR_USER_JOB_FILTER_SELECTIONS'

export const useUserStore = defineStore('user', () => {
  // Define the state of the store as a ref object
  const isLoggedIn = ref(false)
  const selectedOrganizations = ref<string[]>([])
  const selectedJobTypes = ref<string[]>([])
  const selectedDegrees = ref<string[]>([])
  const skillsSearchTerm = ref('')

  const LOGIN_USER = () => {
    isLoggedIn.value = true
  }

  // Add an action to update the selectedOrganizations array
  const ADD_SELECTED_ORGANIZATIONS = (organizations: string[]) => {
    selectedOrganizations.value = organizations
  }
  const ADD_SELECTED_JOB_TYPES = (jobTypes: string[]) => {
    selectedJobTypes.value = jobTypes
  }
  const ADD_SELECTED_DEGREES = (degrees: string[]) => {
    selectedDegrees.value = degrees
  }

  // Add an action to update the skills search term
  const UPDATE_SKILLS_SEARCH_TERM = (searchTerm: string) => {
    skillsSearchTerm.value = searchTerm
  }

  // Add an action to clear all user job filter selections
  const CLEAR_USER_JOB_FILTER_SELECTIONS = () => {
    selectedDegrees.value = []
    selectedJobTypes.value = []
    selectedOrganizations.value = []
  }

  // Return the computed properties and actions
  return {
    isLoggedIn,
    selectedDegrees,
    selectedJobTypes,
    selectedOrganizations,
    skillsSearchTerm,
    LOGIN_USER,
    ADD_SELECTED_ORGANIZATIONS,
    ADD_SELECTED_JOB_TYPES,
    ADD_SELECTED_DEGREES,
    UPDATE_SKILLS_SEARCH_TERM,
    CLEAR_USER_JOB_FILTER_SELECTIONS
  }
})
