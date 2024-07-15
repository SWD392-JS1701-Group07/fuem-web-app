import { Sponsorships } from '@/constants/models/Event'
import axiosClient from '../api/axios'
import { AxiosResponse } from 'axios'

export const getAll = async () => {
  return await axiosClient.get(`/api/sponsors`, {
    params: {
      page: 1,
      pageSize: 1000
    }
  })
}

export const getById = async (id: string) => {
  return await axiosClient.get(`/api/sponsors/${id}`)
}

export const searchSponsor = async (search: string) => {
  return await axiosClient.get(`/api/sponsors`, {
    params: {
      searchTerm: search,
      page: 1,
      pageSize: 1000
    }
  })
}

export const getSponsorshipsById = async (id: number) => {
  return await axiosClient.get(`/api/sponsorships/${id}`)
}

export const getSponsorshipsBySponsorId = async (
  accountId: number,
  search?: string
): Promise<AxiosResponse<Sponsorships[]>> => {
  return await axiosClient.get(`/api/sponsorships/sponsors/${accountId}`, {
    params: {
      searchTerm: search,
      page: 1,
      pageSize: 1000
    }
  })
}
