import type { Mock } from 'vitest'
import { expect, it, describe, vi, beforeEach } from 'vitest'
import axios from 'axios'
import getJobs from '@/api/getJobs'

// Mock axios so that we don't make real requests in our tests
vi.mock('axios')

const axiosGetMock = axios.get as Mock

describe('getJobs', () => {
  //   Reset the mock before each test
  beforeEach(() => {
    // Mock the response from the API
    axiosGetMock.mockResolvedValue({
      data: [{ id: 1, title: 'Software Engineer' }]
    })
  })
  it('fetches jobs that candidates can apply to', async () => {
    await getJobs()
    // Check that axios.get was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith('http://myfakeapi.com/jobs')
  })

  it('extract the jobs from the response', async () => {
    const jobs = await getJobs()
    expect(jobs).toEqual([{ id: 1, title: 'Software Engineer' }])
  })
})
