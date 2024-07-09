import { expect, it, describe } from 'vitest'
import { render, screen } from '@testing-library/vue'
import MainNav from '@/components/MainNav.vue'

describe('MainNav', () => {
  it('displays company name', () => {
    // render the component (render can take another argument for options:data for example, but we don't need it here)
    render(MainNav)

    // screen.getByText: find the element with the text 'Sayed Careers'
    const companyName = screen.getByText('Google Careers')
    expect(companyName).toBeInTheDocument()
  })
  it('displays menu items for navigation', () => {
    render(MainNav)

    // screen.getAllByRole: find all elements with the role:key 'listitem'
    const navigationMenuItems = screen.getAllByRole('listitem')

    // map over the navigationMenuItems and get the textContent of each item
    const navigationMenuText = navigationMenuItems.map((item) => item.textContent)

    // expect the textContent of the navigationMenuItems to be equal to the array of strings (with array we can use toEqual no toBe)
    expect(navigationMenuText).toEqual([
      'Teams',
      'Location',
      'Life at Google',
      'How we hire',
      'Students',
      'Jobs'
    ])
  })
})
