import axiosClient from '../api/axios'

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
