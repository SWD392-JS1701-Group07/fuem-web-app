import { Separator } from '@/components/ui/separator'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const DashBoardNavBar = () => {
  const loginedUser = useSelector((state: any) => state.loginedUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    ['role', 'userId', 'accessToken'].forEach(key => localStorage.removeItem(key));
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }
  return (
    <div>
      <header className="z-50 w-full bg-white">
        <div
          id="navbar-container"
          className="relative m-auto flex w-full max-w-full items-center justify-between px-10 py-6 text-left"
        >
          <div id="title-container">
            <h1 className="font-poppins text-3xl font-semibold text-gray-900">
              <a href="#">Event Management</a>
            </h1>
          </div>
          <div id="nav">
            <ul className="flex space-x-6">
              <li className="font-poppins font-medium">
                <Link to="profile">
                  <a>Profile</a>
                </Link>
              </li>
              <li className="font-poppins font-medium">
                <a href="#">Avatar</a>
              </li>
              <li className="cursor-pointer font-poppins font-medium">
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="" />
      </header>
    </div>
  )
}
export default DashBoardNavBar
