import { expect, it, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import axios from 'axios'
import JobListings from '@/components/JobResults/JobListings.vue'

// Mock axios
vi.mock('axios')
describe('JobListing', () => {
  //  helper function to create route
  const createRoute = (queryParams = {}) => ({
    query: {
      page: '5',
      ...queryParams
    }
  })

  //  helper function to render the component with mocks route
  const renderJobListings = ($route) => {
    render(JobListings, {
      global: {
        mocks: {
          $route
        }
      }
    })
  }

  it('fetches jobs', () => {
    // Mock axios get method to return an empty array
    axios.get.mockResolvedValue({
      data: []
    })

    //  make the mock route
    const $route = createRoute()
    // render the component with the mock route
    renderJobListings($route)

    // Expect axios.get to have been called with the URL 'http://localhost:3000/jobs'
    expect(axios.get).toHaveBeenCalledWith('http://myfakeapi.com/jobs')
  })
  it('display maximum of 10 jobs', async () => {
    // Mock axios get method to return an array of 15 empty objects
    axios.get.mockResolvedValue({
      data: Array(15).fill({})
    })

    const queryParams = { page: '1' }

    const $route = createRoute(queryParams)
    renderJobListings($route)
    // Find all job listings by role listitem and expect the length to be 15
    const jobListings = await screen.findAllByRole('listitem')
    expect(jobListings).toHaveLength(10)
  })
  describe('when params exclude page number', () => {
    it('display page number 1', () => {
      const queryParams = { page: undefined }
      const $route = createRoute(queryParams)
      renderJobListings($route)

      expect(screen.getByText('Page 1')).toBeInTheDocument()
    })
  })
  describe('when params include page number', () => {
    it('display the page number', () => {
      const queryParams = { page: '3' }
      const $route = createRoute(queryParams)
      renderJobListings($route)
      expect(screen.getByText('Page 3')).toBeInTheDocument()
    })
  })
  describe('when user is on first page', () => {
    it("doesn't display the previous button", async () => {
      axios.get.mockResolvedValue({
        data: Array(15).fill({})
      })
      const queryParams = { page: '1' }
      const $route = createRoute(queryParams)
      renderJobListings($route)
      await screen.findAllByRole('listitem')
      const previousLink = screen.queryByRole('link', { name: /previous/i })
      expect(previousLink).not.toBeInTheDocument()
    })
    it('shows link to next page', async () => {
      axios.get.mockResolvedValue({
        data: Array(15).fill({})
      })
      const queryParams = { page: '1' }
      const $route = createRoute(queryParams)
      renderJobListings($route)
      await screen.findAllByRole('listitem')
      const nextLink = screen.queryByRole('link', { name: /next/i })
      //  screen.debug() to see the rendered component for debugging
      // screen.debug()
      expect(nextLink).toBeInTheDocument()
    })
  })
  describe('when user is on the last page', () => {
    it("doesn't display the next button", async () => {
      axios.get.mockResolvedValue({
        data: Array(15).fill({})
      })
      const queryParams = { page: '2' }
      const $route = createRoute(queryParams)
      renderJobListings($route)
      await screen.findAllByRole('listitem')
      const nextLink = screen.queryByRole('link', { name: /next/i })
      expect(nextLink).not.toBeInTheDocument()
    })
    it('shows link to previous page', async () => {
      axios.get.mockResolvedValue({
        data: Array(15).fill({})
      })
      const queryParams = { page: '2' }
      const $route = createRoute(queryParams)
      renderJobListings($route)
      await screen.findAllByRole('listitem')
      const previousLink = screen.queryByRole('link', { name: /previous/i })
      expect(previousLink).toBeInTheDocument()
    })
  })
})
