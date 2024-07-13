import { expect, it, describe } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import MainNav from '@/components/Navigation/MainNav.vue'

describe('MainNav', () => {
  // render the MainNav component to make the code DRY
  const renderMainNav = () => {
    render(MainNav, {
      global: {
        stubs: {
          //  stop the FontAwesomeIcon component from rendering
          FontAwesomeIcon: true
        }
      }
    })
  }

  it('displays company name', () => {
    renderMainNav()

    // screen.getByText: find the element with the text 'Sayed Careers'
    const companyName = screen.getByText('Google Careers')
    expect(companyName).toBeInTheDocument()
  })
  it('displays menu items for navigation', () => {
    renderMainNav()

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

  describe('when the user logged in', () => {
    it('display user profile picture', async () => {
      renderMainNav()

      // if not exist will through an error
      // .screen.getAllByRole("img")

      // to get an element and if not exist move to the second check (not through an error)
      let profileImage = screen.queryByRole('img', {
        //  name is the img alt   - regular expression / /i for case sensitive
        name: /user profile image/i
      })
      expect(profileImage).not.toBeInTheDocument()

      // check the login click button
      const loginButton = screen.getByRole('button', {
        // name is the button text
        name: /sign in/i
      })

      // click the login button using userEvent methods (return a promise for that we used async/await)
      await userEvent.click(loginButton)
      // after click the button the image will exist (so we use queryByRole not getByRole)
      profileImage = screen.getByRole('img', {
        name: /user profile image/i
      })
      // expect the profileImage to be in the document
      expect(profileImage).toBeInTheDocument()
    })
  })
})
