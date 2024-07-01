import { Separator } from '@/components/ui/separator'
import { Account } from '@/constants/models/Account'
import { AppState } from '@/constants/models/common'
import Cart from '@/pages/cart/Cart'
import { useCart } from '@/pages/cart/UseCart'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const MainNavBar = () => {
  const loginedUser = useSelector((state: AppState) => state.loginedUser)
  const isAuthenticated = loginedUser.accessToken !== ''
  const [user, setUser] = useState<Account | null>(null)
  const { cartItems } = useCart()
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  useEffect(() => {
    const storedUser = localStorage.getItem('userProfile')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [loginedUser.accessToken])

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const keysToRemove = ['role', 'userId', 'accessToken'] //for logout

  const handleLogout = () => {
    keysToRemove.forEach((key) => localStorage.removeItem(key))
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  const baseNavLinks = [
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/event' },
    { name: 'Contact', path: '/contact' }
  ]

  console.log(user?.roleId)
  const dashboardLink =
    user?.roleId && user?.roleId !== 0 && user?.roleId !== 2
      ? [{ name: 'Dashboard', path: '/dashboard' }]
      : []

  const authNavLink = isAuthenticated
    ? [
        { name: 'Profile (' + user?.username + ')', path: '/profile' },
        { name: 'Logout', path: '/', onClick: handleLogout }
      ]
    : [{ name: 'Login', path: '/login' }]

  const navLinks: {
    name: string
    path: string
    onClick?: () => void
  }[] = [...baseNavLinks, ...dashboardLink, ...authNavLink]
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
              <li className="font-poppins font-medium">
                <Cart />
                {cartCount > 0 && <Badge count={cartCount} />}
              </li>
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
