import axiosClient from './axios'

export const getAll = async () => {
  return await axiosClient.get('/api/subjects')
}

export const getById = async (id: number) => {
  return await axiosClient.get(`/api/subjects/${id}`)
}
