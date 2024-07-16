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

export const getTicketByEventId = async (
  eventId: string,
  params?: {
    searchTerm?: string
  }
) => {
  return await axiosClient.get(`api/tickets/event/${eventId}`, {
    params
  })
}

export const getTicketDetail = async (id: string) => {
  return await axiosClient.get(`api/tickets/${id}`)
}

export const checkinTicket = async (id: string, status: string) => {
  return await axiosClient.patch(`/api/tickets/event/${id}?status=${status}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
