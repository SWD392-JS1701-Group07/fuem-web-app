import { Separator } from '@/components/ui/separator'
import { Account } from '@/constants/models/Account'
import Cart from '@/pages/cart/Cart'
import { useCart } from '@/pages/cart/UseCart'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

type NavLinks = {
  name: string
  path: string
  onClick?: () => void
}

const MainNavBar = () => {
  const [user, setUser] = useState<Account | null>(null)
  const { cartItems } = useCart()
  const [navLinks, setNavLinks] = useState<NavLinks[]>([])
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    setUser(null)
    navigate('/')
  }

  const defaultNavLinks = [
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/event' },
    { name: 'Contact', path: '/contact' },
    { name: 'Login', path: '/login' },
  ]

  const VisitorsNavLinks = [
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/event' },
    { name: 'Contact', path: '/contact' },
    { name: 'Collaborator', path: '/collaborator' },
    { name: 'Profile (' + user?.username + ')', path: '/profile' },
    { name: 'Logout', path: '/', onClick: handleLogout }
  ]

  const OperatorNavLinks = [
    { name: 'Profile (' + user?.username + ')', path: '/profile' },
    { name: 'Logout', path: '/', onClick: handleLogout }
  ]

  useEffect(() => {
    const storedUser = localStorage.getItem('userProfile') || null
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [localStorage.getItem('userProfile')])
  useEffect(() => {
    (user?.roleId === 1 || user?.roleId === 3 || user?.roleId === 4 || user?.roleId === 5) ? setNavLinks(OperatorNavLinks)
      : (user?.roleId === 2) ? setNavLinks(VisitorsNavLinks)
        : setNavLinks(defaultNavLinks)
  }, [user])

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
                  <Link to={link.path} onClick={link.onClick}>
                    <a href={link.path}>{link.name}</a>
                  </Link>
                </li>
              ))}
              {(user?.roleId !== 1 && user?.roleId !== 3 && user?.roleId !== 4 && user?.roleId !== 5) ? (
                <li className="font-poppins font-medium">
                  <Cart />
                  {cartCount > 0 && <Badge count={cartCount} />}
                </li>
              ) : null
              }
            </ul>
          </div>
        </div>
        <Separator />
      </header>
    </div>
  )
}

type BadgeProps = {
  count: number
}

const Badge: React.FC<BadgeProps> = ({ count }) => {
  return (
    <div className="absolute w-auto -translate-y-8 translate-x-1/2 transform rounded-full bg-electric-indigo px-2 py-1 text-xs text-white">
      {count}
    </div>
  )
}

export default MainNavBar
