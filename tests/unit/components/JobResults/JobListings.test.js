import { expect, it, describe } from 'vitest'
import { render, screen } from '@testing-library/vue'
import JobListings from '@/components/JobResults/JobListings.vue'
import { createTestingPinia } from '@pinia/testing'
import { useJobsStore } from '@/stores/jobs'

// Describe block for the JobListing component tests
describe('JobListing', () => {
  // Helper function to create a mock route with optional query parameters
  const createRoute = (queryParams = {}) => ({
    query: {
      page: '5', // Default page number is 5
      ...queryParams
    }
  })

  // Helper function to render the JobListings component with a mocked route
  const renderJobListings = ($route) => {
    // Create a Pinia store for testing
    const pinia = createTestingPinia()

    render(JobListings, {
      global: {
        // Provide the Pinia plugin to the global config
        plugins: [pinia],
        mocks: {
          $route // Mock the route
        }
      }
    })
  }

  // Test to verify that jobs are fetched when the component is rendered
  it('fetches jobs', () => {
    // Create a mock route
    const $route = createRoute()
    // Render the component with the mock route
    renderJobListings($route)
    const jobsStore = useJobsStore()
    // Check if FETCH_JOBS action was called
    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled()
  })

  it('displays maximum of 10 jobs', async () => {
    const queryParams = { page: '1' }
    // Create a mock route with query parameters
    const $route = createRoute(queryParams)

    renderJobListings($route)
    const jobsStore = useJobsStore()
    // Mock the jobs store with 15 jobs
    jobsStore.jobs = Array(15).fill({})

    // Find all job list items and verify that only 10 are displayed
    const jobListings = await screen.findAllByRole('listitem')
    expect(jobListings).toHaveLength(10)
  })

  describe('when params exclude page number', () => {
    // Test to check that the default page number 1 is displayed
    it('displays page number 1', () => {
      const queryParams = { page: undefined }
      const $route = createRoute(queryParams) // Create a mock route with query parameters

      renderJobListings($route)
      // Verify that "Page 1" is displayed
      expect(screen.getByText('Page 1')).toBeInTheDocument()
    })
  })

  describe('when params include page number', () => {
    // Test to check that the provided page number is displayed
    it('displays page number', () => {
      // Page number is set to 3
      const queryParams = { page: '3' }
      const $route = createRoute(queryParams)

      renderJobListings($route)
      // Verify that "Page 3" is displayed
      expect(screen.getByText('Page 3')).toBeInTheDocument()
    })
  })

  describe('when user is on first page', () => {
    // Test to check that the previous page link is not displayed
    it('does not show link to previous page', async () => {
      const queryParams = { page: '1' }
      const $route = createRoute(queryParams)

      renderJobListings($route)
      const jobsStore = useJobsStore()
      // Mock the jobs store with 15 jobs
      jobsStore.jobs = Array(15).fill({})
      // Find all job list items
      await screen.findAllByRole('listitem')
      const previousLink = screen.queryByRole('link', { name: /previous/i })
      // Verify that the previous page link is not displayed
      expect(previousLink).not.toBeInTheDocument()
    })

    it('shows link to next page', async () => {
      const queryParams = { page: '1' }
      const $route = createRoute(queryParams)

      renderJobListings($route)
      const jobsStore = useJobsStore()
      jobsStore.jobs = Array(15).fill({})
      await screen.findAllByRole('listitem')
      // Verify that the next page link is displayed
      const nextLink = screen.queryByRole('link', { name: /next/i })
      expect(nextLink).toBeInTheDocument()
    })
  })

  describe('when user is on last page', () => {
    // Test to check that the next page link is not displayed
    it('does not show link to next page', async () => {
      // Page number is set to 2 (last page)
      const queryParams = { page: '2' }
      const $route = createRoute(queryParams)

      renderJobListings($route)
      const jobsStore = useJobsStore()
      // Mock the jobs store with 15 jobs
      jobsStore.jobs = Array(15).fill({})

      await screen.findAllByRole('listitem')
      // Verify that the next page link is not displayed
      const nextLink = screen.queryByRole('link', { name: /next/i })
      expect(nextLink).not.toBeInTheDocument()
    })

    it('shows link to previous page', async () => {
      // Page number is set to 2 (last page)
      const queryParams = { page: '2' }
      const $route = createRoute(queryParams)

      renderJobListings($route)
      const jobsStore = useJobsStore()
      jobsStore.jobs = Array(15).fill({})
      // Find all job list items
      await screen.findAllByRole('listitem')
      // Verify that the previous page link is displayed
      const previousLink = screen.queryByRole('link', { name: /previous/i })
      expect(previousLink).toBeInTheDocument()
    })
  })
})
