import { expect, it, describe } from 'vitest'
import { render, screen } from '@testing-library/vue'

import TheSubnav from '@/components/Navigation/TheSubnav.vue'

describe('TheSubnav', () => {
  //  helper function to render the subnav component
  const renderTheSubnav = (routeName) => {
    render(TheSubnav, {
      global: {
        mocks: {
          $route: {
            name: routeName
          }
        },

        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
  }

  describe('when user is on jobs page', () => {
    it('display job count', () => {
      const routeName = 'JobResults'
      renderTheSubnav(routeName)
      //   get the job count element and check if it is in the document
      const jobCount = screen.getByText('1653')
      expect(jobCount).toBeInTheDocument()
    })
  })
  describe('when user is not on jobs page', () => {
    it('does not display jobs count', () => {
      const routeName = 'Home'
      renderTheSubnav(routeName)
      //   get the job count element and check if it is not in the document
      const jobCount = screen.queryByText('1653')
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
