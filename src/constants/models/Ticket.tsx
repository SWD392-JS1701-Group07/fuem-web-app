import { Event } from './Event'

export type Ticket = {
  name: string
  phoneNumber: string
  email: string
  price: number,
  // eslint-disable-next-line @typescript-eslint/ban-types
  eventId: Number
}

export type CartItem = {
  id: number
  name: string
  phoneNumber: string
  email: string
  price: number
  quantity: number
  event: Event
  tickets: Ticket[]
}

export type OrderResponse = {
  statusCode: number
  message: string
  isSuccess: boolean
  data: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any | null
}
