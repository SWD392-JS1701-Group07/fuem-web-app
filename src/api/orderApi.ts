import { OrderResponse, Ticket } from '@/constants/models/Ticket'
import axiosClient from './axios'

type OrderData = {
  orderNotes: string
  email: string
  phoneNumber: string
  totalAmount: number
  tickets: Ticket[]
}

export const getOrders = async (params?: {
  isBought?: boolean
  searchTerm?: string
  email?: string
}) => {
  const config = {
    params: params
  }

  return await axiosClient.get('/orders', config)
}

export const getOrderById = async (id: string) => {
  return await axiosClient.get(`/orders/${id}`)
}

export const createOrder = async (orderData: OrderData): Promise<OrderResponse> => {
  return await axiosClient.post('/api/event/order/create', orderData)
}
