import { expect, it, describe } from 'vitest'
import { render, screen } from '@testing-library/vue'

import TheSubnav from '@/components/TheSubnav.vue'

describe('TheSubnav', () => {
  describe('when user is on jobs page', () => {
    it('display job count', () => {
      render(TheSubnav, {
        global: {
          //  stop the FontAwesomeIcon component from rendering
          stubs: {
            FontAwesomeIcon: true
          }
        },
        data() {
          return {
            onJobResultPage: true
          }
        }
      })
      //   get the job count element and check if it is in the document
      const jobCount = screen.getByText('1653')
      expect(jobCount).toBeInTheDocument()
    })
  })
  describe('when user is not on jobs page', () => {
    it('does not display jobs count', () => {
      render(TheSubnav, {
        global: {
          stubs: {
            FontAwesomeIcon: true
          }
        },
        data() {
          return {
            onJobResultPage: false
          }
        }
      })
      //   get the job count element and check if it is not in the document
      const jobCount = screen.queryByText('1653')
      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
