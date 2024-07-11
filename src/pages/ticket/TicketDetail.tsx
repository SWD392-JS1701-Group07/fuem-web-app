import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { ShoppingBag, ShoppingCart } from 'lucide-react'
import axios from 'axios'
import { TicketDetail } from '@/constants/models/Ticket'

type TicketDetailProps = {
  ticketId: string
}

const fetchTicketDetails = async (id: string) => {
  const response = await axios.get(`https://localhost:7297/api/tickets/${id}`)
  return response.data.data
}

console.log('THE TICKET IS ', await fetchTicketDetails('1fa9b4be-43d8-4e73-8aaa-ebdc2efd3b14'))

const TicketDetailPage: React.FC<TicketDetailProps> = ({ ticketId }) => {
  const [ticket, setTicket] = useState<TicketDetail | null>(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (ticketId) {
      fetchTicketDetails(ticketId).then((data) => setTicket(data))
    }
  }, [ticketId])

  if (!ticket) {
    return null
  }

  return (
    <>
      <ShoppingCart onClick={() => setOpen(true)} className="cursor-pointer" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-3xl rounded-lg bg-gray-900 p-8 text-white">
          <DialogHeader>
            <DialogTitle className="flex flex-row text-3xl font-bold">
              Your Cart <ShoppingCart className="ml-2 mt-2" />
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Review and manage your tickets
            </DialogDescription>
          </DialogHeader>
          <div className="mb-4 flex items-center justify-between">
            <div className="cursor-pointer bg-transparent text-blue-500 hover:underline">
              Empty cart
            </div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-2xl">{ticket.name}</div>
            <div className="mb-4 text-lg">{ticket.email}</div>
            <div className="mb-4">
              <img src={ticket.qrcode} alt="QR Code" />
            </div>
            <div className="text-md mb-2">Phone: {ticket.phoneNumber}</div>
            <div className="text-md mb-2">Price: {ticket.price}</div>
            {/* <div className="text-md mb-2">Event: {ticket.event.name}</div> */}
          </div>
          <DialogFooter>
            <Button
              className="bg-electric-indigo text-white hover:bg-white hover:text-electric-indigo"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Checkout'}
              <ShoppingBag className="ml-2" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TicketDetailPage
