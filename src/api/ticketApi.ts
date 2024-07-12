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

export const getTicketByEventId = async (eventId: string) => {
  return await axiosClient.get(`api/tickets/event/${eventId}`)
}

export const getTicketDetail = async (id: string) => {
  return await axiosClient.get(`api/tickets/${id}`)
}
