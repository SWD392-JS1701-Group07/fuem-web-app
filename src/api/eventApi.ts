import { EventCreateModel } from '@/constants/models/Event'
import axiosClient from '../api/axios'

export const getAll = async () => {
  return await axiosClient.get('/api/events', {
    params: {
      page: 1,
      pageSize: 10
    }
  })
}

export const getById = async (id: number) => {
  return await axiosClient.get(`/api/events/${id}/`)
}

export const create = async (data: EventCreateModel) => {
  return await axiosClient.post('/api/events', data)
}

export const updateStatus = async (id: number) => {
  return await axiosClient.put(`/api/events/${id}`)
}
