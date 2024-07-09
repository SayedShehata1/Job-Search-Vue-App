import { expect, it, describe } from 'vitest'
import { render, screen } from '@testing-library/vue'
import MainNav from '@/components/MainNav.vue'

describe('MainNav', () => {
  it('displays company name', () => {
    // render the component (render can take another argument for options:data for example, but we don't need it here)
    render(MainNav)

    // screen.getByText: find the element with the text 'Sayed Careers'
    const companyName = screen.getByText('Sayed Careers')
    expect(companyName).toBeInTheDocument()
  })
})
