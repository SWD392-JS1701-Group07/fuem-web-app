import axiosClient from './axios'

export const getTickets = async (params: {
  isBought?: boolean
  searchTerm?: string
  orderId?: string
  email?: string
}) => {
  try {
    return await axiosClient.get('api/tickets', {
      params
    })
  } catch (error) {
    console.error('Error fetching tickets:', error)
    throw error
  }
}
