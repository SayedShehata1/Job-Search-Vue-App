import { expect, it, describe } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'

import JobListing from '@/components/JobResults/JobListing.vue'

describe('JobListing', () => {
  // Create a factory function to create job props
  const createJobProps = (jobProps = {}) => ({
    title: 'Vue Developer',
    organization: 'AirBnB',
    ...jobProps
  })

  // Create a function to render JobListing component
  const renderJobListing = (jobProps) => {
    render(JobListing, {
      props: {
        job: createJobProps(jobProps)
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
    const jobProps = {
      title: 'Vue Programmer'
    }
    // Call renderJobListing function with jobProps
    renderJobListing(jobProps)
    // Expect the job title to be in
    expect(screen.getByText('Vue Programmer')).toBeInTheDocument()
  })
  it('render job organization', () => {
    const jobProps = {
      organization: 'Samsung'
    }
    renderJobListing(jobProps)
    expect(screen.getByText('Samsung')).toBeInTheDocument()
  })
  it('render job location', () => {
    const jobProps = {
      locations: ['San Francisco', 'New York']
    }
    renderJobListing(jobProps)
    expect(screen.getByText('San Francisco')).toBeInTheDocument()
    expect(screen.getByText('New York')).toBeInTheDocument()
  })
  it('renders job qualifications', () => {
    const jobProps = {
      minimumQualifications: ['JavaScript', 'Vue.js']
    }
    renderJobListing(jobProps)
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('Vue.js')).toBeInTheDocument()
  })
})
