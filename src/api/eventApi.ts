import { EventCreateModel } from '@/constants/models/Event'
import axiosClient from '../api/axios'

export const getAll = async (searchTerm?: string) => {
  return await axiosClient.get('/api/events', {
    params: {
      page: 1,
      pageSize: 1000,
      searchTerm: searchTerm
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
export const approveEvent = async (id: number) => {
  return await axiosClient.put(`/api/events/events/${id}/approve`)
}

export const getEventByCollaborator = async (id: number) => {
  return await axiosClient.get(`/api/events/collaborators/${id}`)
}

export const addEventImage = async (formData: FormData) => {
  return await axiosClient.patch(`/api/events/image`, formData)
}
