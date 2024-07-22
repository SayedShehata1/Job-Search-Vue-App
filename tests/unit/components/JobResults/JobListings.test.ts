import { type Mock, expect, it, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import JobListings from '@/components/JobResults/JobListings.vue'
import { createTestingPinia } from '@pinia/testing'
import { useJobsStore } from '@/stores/jobs'

import { useRoute } from 'vue-router'
vi.mock('vue-router')

const useRouteMock = useRoute as Mock

// Describe block for the JobListing component tests
describe('JobListing', () => {
  // Helper function to render the JobListings component with a mocked route
  const renderJobListings = () => {
    // Create a Pinia store for testing
    const pinia = createTestingPinia()

    const jobsStore = useJobsStore()
    // @ts-expect-error
    jobsStore.FILTERED_JOBS = Array(15).fill({})

    render(JobListings, {
      global: {
        // Provide the Pinia plugin to the global config
        plugins: [pinia]
      }
    })
    return { jobsStore }
  }

  // Test to verify that jobs are fetched when the component is rendered
  it('fetches jobs', () => {
    useRouteMock.mockReturnValue({ query: {} })

    // Render the component with the mock route
    const { jobsStore } = renderJobListings()
    // Check if FETCH_JOBS action was called
    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled()
  })

  it('displays maximum of 10 jobs', async () => {
    useRouteMock.mockReturnValue({ query: { page: '1' } })

    const { jobsStore } = renderJobListings()
    // Mock the jobs store with 15 jobs
    // @ts-expect-error
    jobsStore.FILTERED_JOBS = Array(15).fill({})

    // Find all job list items and verify that only 10 are displayed
    const jobListings = await screen.findAllByRole('listitem')
    expect(jobListings).toHaveLength(10)
  })

  describe('when params exclude page number', () => {
    // Test to check that the default page number 1 is displayed
    it('displays page number 1', () => {
      useRouteMock.mockReturnValue({ query: {} })

      renderJobListings()
      // Verify that "Page 1" is displayed
      expect(screen.getByText('Page 1')).toBeInTheDocument()
    })
  })

  describe('when params include page number', () => {
    // Test to check that the provided page number is displayed
    it('displays page number', () => {
      // Page number is set to 3
      useRouteMock.mockReturnValue({ query: { page: '3' } })

      renderJobListings()
      // Verify that "Page 3" is displayed
      expect(screen.getByText('Page 3')).toBeInTheDocument()
    })
  })

  describe('when user is on first page', () => {
    // Test to check that the previous page link is not displayed
    it('does not show link to previous page', async () => {
      useRouteMock.mockReturnValue({ query: { page: '1' } })

      renderJobListings()
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
      useRouteMock.mockReturnValue({ query: { page: '1' } })

      const { jobsStore } = renderJobListings()
      // @ts-expect-error
      jobsStore.FILTERED_JOBS = Array(15).fill({})
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
      useRouteMock.mockReturnValue({ query: { page: '2' } })

      const { jobsStore } = renderJobListings()
      // Mock the jobs store with 15 jobs
      // @ts-expect-error
      jobsStore.FILTERED_JOBS = Array(15).fill({})

      await screen.findAllByRole('listitem')
      // Verify that the next page link is not displayed
      const nextLink = screen.queryByRole('link', { name: /next/i })
      expect(nextLink).not.toBeInTheDocument()
    })

    it('shows link to previous page', async () => {
      // Page number is set to 2 (last page)
      useRouteMock.mockReturnValue({ query: { page: '2' } })

      const { jobsStore } = renderJobListings()
      // @ts-expect-error
      jobsStore.FILTERED_JOBS = Array(15).fill({})
      // Find all job list items
      await screen.findAllByRole('listitem')
      // Verify that the previous page link is displayed
      const previousLink = screen.queryByRole('link', { name: /previous/i })
      expect(previousLink).toBeInTheDocument()
    })
  })
})
