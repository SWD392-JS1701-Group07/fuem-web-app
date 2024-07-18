import { Event } from './Event'

export type Ticket = {
  name: string
  phoneNumber: string
  email: string
  price: number
  // eslint-disable-next-line @typescript-eslint/ban-types
  eventId: Number
}

export type TicketDetail = {
  id: string
  name: string
  phoneNumber: string
  qrcode: string
  email: string
  eventId: number
  price: number
  isCheckIn: string
  ordersId: string
  event: Event
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

export type Order = {
  id: string
  orderDate: string
  totalPrice: number
  notes: string
  orderStatus: string
  email: string
  phoneNumber: string
  customerId: number
}

export type OrderTransaction = {
  id: string;
  refId: string;
  transactionDate: string;
  amount: number;
  paymentStatus: string;
  paymentMethod: string | null;
  vnPayTransactioId: string;
  responseCode: string;
  responseMessage: string;
  description: string;
  orderId: string;
};

export type OrderTicket = {
  id: string
  name: string
  phoneNumber: string
  qrcode: string
  email: string
  eventId: number
  price: number
  isCheckIn: string
  orderId: string
}

export type OrderDetail = {
  id: string;
  orderDate: string;
  totalPrice: number;
  notes: string;
  paymentMethod: string | null;
  orderStatus: string;
  email: string;
  phoneNumber: string;
  customerId: number;
  tickets: OrderTicket[];
  transactions: OrderTransaction[];
};
