import { Account } from '@/constants/models/Account'
import axiosClient from './axios'
import axios from 'axios'

export const getAccounts = async () => {
  return await axiosClient.get('/api/accounts')
}

export const getById = async (accountId: string): Promise<Account> => {
  const response = await axios.get(`/api/account/${accountId}`)
  return response.data
}
