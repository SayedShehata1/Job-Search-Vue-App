import { expect, it, describe } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'

import JobListing from '@/components/JobResults/JobListing.vue'

import type { Job } from '@/api/types'
// helper factory function to create a job
import { createJob } from '../../../utils/createJob'

describe('JobListing', () => {
  // Create a function to render JobListing component
  const renderJobListing = (jobProps: Job) => {
    render(JobListing, {
      props: {
        job: { ...jobProps }
      },
      global: {
        components: {
          'router-link': RouterLinkStub
        }
      }
    })
  }

  it('render job title', () => {
    // Render JobListing component with job title
    const jobProps = createJob({
      title: 'Vue Programmer'
    })
    // Call renderJobListing function with jobProps
    renderJobListing(jobProps)
    // Expect the job title to be in
    expect(screen.getByText('Vue Programmer')).toBeInTheDocument()
  })
  it('render job organization', () => {
    const jobProps = createJob({
      organization: 'Samsung'
    })
    renderJobListing(jobProps)
    expect(screen.getByText('Samsung')).toBeInTheDocument()
  })
  it('render job location', () => {
    const jobProps = createJob({
      locations: ['San Francisco', 'New York']
    })
    renderJobListing(jobProps)
    expect(screen.getByText('San Francisco')).toBeInTheDocument()
    expect(screen.getByText('New York')).toBeInTheDocument()
  })
  it('renders job qualifications', () => {
    const jobProps = createJob({
      minimumQualifications: ['JavaScript', 'Vue.js']
    })
    renderJobListing(jobProps)
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('Vue.js')).toBeInTheDocument()
  })
})
