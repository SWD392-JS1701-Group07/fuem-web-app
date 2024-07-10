import { LoginParam } from '@/constants/models/User'
import axiosClient from './axios'

export const login = async (params: LoginParam) => {
  return await axiosClient.post('/api/auth/login', params)
}

export const logout = async (param: string) => {
  return await axiosClient.post('/api/auth/logout', param)
}

export const updateProfile = async (userId: string, formData: FormData, accessToken: string) => {
  return await axiosClient.put(
    `https://localhost:7297/api/accounts/update-profile/${userId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`
      }
    }
  )
}
