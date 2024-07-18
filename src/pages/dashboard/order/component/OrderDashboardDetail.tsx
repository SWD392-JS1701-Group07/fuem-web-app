import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOrderById } from '@/api/orderApi'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Ellipsis } from 'lucide-react'
import { OrderDetail } from '@/constants/models/Ticket'

const OrderDashboardDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<OrderDetail | null>(null)

  useEffect(() => {
    getOrderById(id as string).then((res) => {
      setOrder(res.data)
    })
  }, [id])

  return (
    <div className="w-full">
      <div className="flex w-full justify-between bg-purple-400 p-3 text-gray-50">
        <div className="flex">
          <h1 className="text-5xl">Order #{order?.id}</h1>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Accordion type="multiple" defaultValue={['general']}>
        <AccordionItem title="Order Details" value="general">
          <AccordionTrigger className="bg-slate-200 pl-2">General Information</AccordionTrigger>
          <AccordionContent>
            <Card className="pt-2 text-lg">
              <CardContent>Order Date: {order?.orderDate}</CardContent>
              <CardContent>Total Price: {order?.totalPrice}</CardContent>
              <CardContent>Notes: {order?.notes}</CardContent>
              <CardContent>Status: {order?.orderStatus}</CardContent>
              <CardContent>Email: {order?.email}</CardContent>
              <CardContent>Phone Number: {order?.phoneNumber}</CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem title="Tickets" value="tickets">
          <AccordionTrigger className="bg-slate-200 pl-2">Tickets</AccordionTrigger>
          <AccordionContent>
            {order?.tickets.map((ticket) => (
              <Card key={ticket.id} className="pt-2 text-lg">
                <CardContent>Ticket Name: {ticket.name}</CardContent>
                <CardContent>Phone Number: {ticket.phoneNumber}</CardContent>
                <CardContent>Email: {ticket.email}</CardContent>
                <CardContent>Price: {ticket.price}</CardContent>
                <CardContent>
                  QR Code: <img src={ticket.qrcode} alt="QR Code" />
                </CardContent>
                <CardContent>Checked In: {ticket.isCheckIn}</CardContent>
              </Card>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem title="Transactions" value="transactions">
          <AccordionTrigger className="bg-slate-200 pl-2">Transactions</AccordionTrigger>
          <AccordionContent>
            {order?.transactions.map((transaction) => (
              <Card key={transaction.id} className="pt-2 text-lg">
                <CardContent>Transaction Date: {transaction.transactionDate}</CardContent>
                <CardContent>Amount: {transaction.amount}</CardContent>
                <CardContent>Payment Method: {transaction.paymentMethod}</CardContent>
                <CardContent>Status: {transaction.paymentStatus}</CardContent>
                <CardContent>Description: {transaction.description}</CardContent>
              </Card>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default OrderDashboardDetail
