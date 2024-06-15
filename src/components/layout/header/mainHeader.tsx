import { Separator } from '@/components/ui/separator'
import { useSelector } from 'react-redux'
import { AppState } from '@/constants/models/common'
import { Link } from 'react-router-dom'

const MainNavBar = () => {
  const loginedUser = useSelector((state: AppState) => state.loginedUser)
  const isAuthenticated = loginedUser.accessToken !== ''

  const baseNavLinks = [
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/event' },
    { name: 'Contact', path: '/contact' }
  ]

  const authNavLink = isAuthenticated
    ? { name: 'Profile', path: '/profile' }
    : { name: 'Login', path: '/login' }

  const navLinks = [...baseNavLinks, authNavLink]
  return (
    <div className="sticky top-0 z-50">
      <header className="z-50 w-full bg-white text-black">
        <div
          id="navbar-container"
          className="relative m-auto flex w-full max-w-full items-center justify-between px-10 py-6 text-left"
        >
          <div id="title-container">
            <h1 className="font-poppins text-3xl font-semibold">
              <a href="/">Event Management</a>
            </h1>
          </div>
          <div id="nav">
            <ul className="flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.name} className="font-poppins font-medium">
                  <Link to={link.path}>
                    <a href={link.path}>{link.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Separator />
      </header>
    </div>
  )
}

export default MainNavBar
