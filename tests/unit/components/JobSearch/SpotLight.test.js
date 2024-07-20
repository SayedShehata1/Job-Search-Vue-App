import { expect, it, describe, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import axios from 'axios'

import SpotLight from '@/components/JobSearch/SpotLight.vue'

vi.mock('axios')

describe('SpotLight', () => {
  // The mockSpotlightsResponse function is used to mock the response from the axios.get method
  const mockSpotlightsResponse = (spotlight = {}) => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          img: 'Some image',
          title: 'Some title',
          description: 'Some description',
          ...spotlight
        }
      ]
    })
  }

  it('provides image to parent component', async () => {
    // The spotlight object is used to mock the response from the axios.get method
    const spotlight = { img: 'Other image' }
    // The mockSpotlightsResponse function is called with the spotlight object as an argument
    mockSpotlightsResponse(spotlight)

    // The SpotLight component is rendered with the default slot that displays the image
    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.img }}</h1>
        </template>`
      }
    })
    //   The screen.findByText method is used to find the text 'Other image' in the rendered component
    const text = await screen.findByText('Other image')
    expect(text).toBeInTheDocument()
  })

  it('provides title to parent component', async () => {
    const spotlight = { title: 'Other title' }
    mockSpotlightsResponse(spotlight)

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.title }}</h1>
        </template>`
      }
    })

    const text = await screen.findByText('Other title')
    expect(text).toBeInTheDocument()
  })

  it('provides description to parent component', async () => {
    const spotlight = { description: 'Another description' }
    mockSpotlightsResponse(spotlight)

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.description }}</h1>
        </template>`
      }
    })

    const text = await screen.findByText('Another description')
    expect(text).toBeInTheDocument()
  })
})
