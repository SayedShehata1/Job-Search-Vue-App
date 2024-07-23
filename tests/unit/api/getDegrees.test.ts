import type { Mock } from 'vitest'
import { expect, it, describe, vi, beforeEach } from 'vitest'
import axios from 'axios'
import getDegrees from '@/api/getDegrees'

// Mock axios so that we don't make real requests in our tests
vi.mock('axios')

const axiosGetMock = axios.get as Mock

describe('getDegrees', () => {
  //   Reset the mock before each test
  beforeEach(() => {
    // Mock the response from the API
    axiosGetMock.mockResolvedValue({
      data: [{ id: 1, degree: "Master's" }]
    })
  })
  it('fetches jobs that candidates can apply to', async () => {
    await getDegrees()
    // Check that axios.get was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith('http://myfakeapi.com/degrees')
  })

  it('extract the degrees from the response', async () => {
    const degrees = await getDegrees()
    expect(degrees).toEqual([{ id: 1, degree: "Master's" }])
  })
})
