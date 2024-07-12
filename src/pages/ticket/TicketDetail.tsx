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
import { MoveRight, Ticket, TicketIcon } from 'lucide-react'
import { TicketDetail } from '@/constants/models/Ticket'
import { Link } from 'react-router-dom'
import { getTicketDetail } from '@/api/ticketApi'

type TicketDetailProps = {
  ticketId: string
}

const TicketDetailPage: React.FC<TicketDetailProps> = ({ ticketId }) => {
  const [ticket, setTicket] = useState<TicketDetail | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (ticketId) {
      getTicketDetail(ticketId).then((response) => {
        setTicket(response.data)
      })
    }
  }, [ticketId])

  if (!ticket) {
    return null
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        View Detail
        <TicketIcon className="ml-2" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-3xl rounded-lg bg-gray-900 p-8 text-white">
          <DialogHeader>
            <DialogTitle className="flex flex-row text-3xl font-bold">
              Your Ticket <Ticket className="ml-2 mt-2" />
            </DialogTitle>
            <DialogDescription className="text-gray-400">ID: {ticket.id}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <p className="text-xl text-gray-400">Event</p>
              <p className="text-2xl font-semibold text-white">{ticket.event.name}</p>
            </div>
            <div className="flex justify-end">
              <p className="text-xl text-blue-400">
                <Link to={`/event/${ticket.eventId}`} className="flex flex-row">
                  See event details <MoveRight className="ml-2 mt-1" />
                </Link>
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-xl text-gray-400">Customer Name</p>
              <p className="text-2xl font-semibold text-white">{ticket.name}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xl text-gray-400">Email Address</p>
              <p className="text-2xl font-semibold text-white">{ticket.email}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xl text-gray-400">Phone Number</p>
              <p className="text-2xl font-semibold text-white">{ticket.phoneNumber}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xl text-gray-400">Check-in Status</p>
              <p className="text-2xl font-semibold text-white">{ticket.isCheckIn}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xl text-gray-400">QR Code</p>
            </div>

            <div className="flex justify-center">
              <img src={ticket.qrcode} alt="QR Code" />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-gray-400 text-white hover:bg-white hover:text-black"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TicketDetailPage
