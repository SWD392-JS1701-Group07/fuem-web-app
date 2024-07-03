import { Event } from './Event'

export type Ticket = {
  name: string
  phoneNumber: string
  email: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  eventId: Number
}

export type CartTicket = {
  id: number
  name: string
  phoneNumber: string
  email: string
  price: number
  quantity: number
  event: Event
}
