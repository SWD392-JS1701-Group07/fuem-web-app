import { AppState } from '@/constants/models/common'
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
  children: ReactNode
}

const AuthRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const loginedUser = useSelector((state: AppState) => state.loginedUser)
  const isAuthenticated = (): boolean => {
    return loginedUser.accessToken !== ''
  }
  return isAuthenticated() ? <Navigate to="/" /> : <>{children}</>
}

export default AuthRoute
