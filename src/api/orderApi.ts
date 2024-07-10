import { OrderResponse, Ticket } from '@/constants/models/Ticket'
import axiosClient from './axios'

type OrderData = {
  orderNotes: string
  email: string
  phoneNumber: string
  totalAmount: number
  tickets: Ticket[]
}

export const createOrder = async (orderData: OrderData): Promise<OrderResponse> => {
  return await axiosClient.post('/api/event/order/create', orderData)
}
