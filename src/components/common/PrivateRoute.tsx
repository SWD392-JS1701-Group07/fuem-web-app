import { AppState } from '@/constants/models/common'
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
  children: ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const loginedUser = useSelector((state: AppState) => state.loginedUser)
  const isAuthenticated = (): boolean => {
    return (
      loginedUser.accessToken !== '' &&
      (loginedUser.role == 1 ||
        loginedUser.role == 3 ||
        loginedUser.role == 4 ||
        loginedUser.role == 5)
    )
  }
  return !isAuthenticated() ? <Navigate to="/" /> : <>{children}</>
}

export default PrivateRoute
