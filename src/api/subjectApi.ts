import axiosClient from './axios'

export const getAllSubject = async () => {
  return await axiosClient.get('/api/subjects')
}

export const getSubjectById = async (id: number) => {
  return await axiosClient.get(`/api/subjects/${id}`)
}
