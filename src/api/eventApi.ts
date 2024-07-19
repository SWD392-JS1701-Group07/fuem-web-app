import { EventCreateModel } from '@/constants/models/Event'
import axiosClient from '../api/axios'

export const getAll = async (searchTerm?: string, ongoing?: boolean) => {
  return await axiosClient.get(`/api/events/${ongoing ? 'ongoing' : ''}`, {
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

export const updateStatus = async (id: number, status: string) => {
  return await axiosClient.patch(`/api/events/events/${id}/${status}`)
}

export const getEventByCollaborator = async (id: number) => {
  return await axiosClient.get(`/api/events/collaborators/${id}`)
}

export const addEventImage = async (formData: FormData) => {
  return await axiosClient.patch(`/api/events/image`, formData)
}
