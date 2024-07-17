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
import { TicketIcon } from 'lucide-react'
import { TicketDetail } from '@/constants/models/Ticket'
import { checkinTicket, getTicketDetail } from '@/api/ticketApi'
import { useToast } from '@/components/ui/use-toast'

type TicketDetailProps = {
  ticketId: string
}

const TicketDetailPage: React.FC<TicketDetailProps> = ({ ticketId }) => {
  const [ticket, setTicket] = useState<TicketDetail | null>(null)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (ticketId) {
      getTicketDetail(ticketId).then((response) => {
        setTicket(response.data)
      })
    }
  }, [ticketId])

  const handleCheckIn = (status: string) => {
    checkinTicket(ticketId, status)
      .then(() => {
        setOpen(false)
        toast({
          title: 'Checkin Complete',
          description: `Checked in successfully for ${ticket?.name} (${ticket?.phoneNumber})`,
          variant: 'default'
        })
      })
      .catch((error) => {
        toast({
          title: 'Checkin Fail',
          description: error.response.data.message,
          variant: 'destructive'
        })
      })
  }

  if (!ticket) {
    return null
  }

  return (
    <>
      <Button
        className="border-2 border-black bg-indigo-300 text-black hover:bg-indigo-500"
        onClick={() => setOpen(true)}
      >
        Check-in
        <TicketIcon className="ml-2" />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full max-w-3xl rounded-lg p-8">
          <DialogHeader>
            <DialogTitle className="flex flex-row text-3xl font-bold">
              Would you like to check in this ticket?
            </DialogTitle>
            <DialogDescription className="text-gray-400">ID: {ticket.id}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between">
              <p className="text-xl text-gray-400">Event</p>
              <p className="text-2xl font-semibold">{ticket.event.name}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xl text-gray-400">Customer Name</p>
              <p className="text-2xl font-semibold">{ticket.name}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xl text-gray-400">Email Address</p>
              <p className="text-2xl font-semibold">{ticket.email}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-xl text-gray-400">Phone Number</p>
              <p className="text-2xl font-semibold">{ticket.phoneNumber}</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="border-2 border-black bg-green-400 hover:bg-white hover:text-black"
              onClick={() => handleCheckIn('Yes')}
            >
              Yes
            </Button>
            <Button
              className="border-2 border-black bg-red-400 hover:bg-white hover:text-black"
              onClick={() => handleCheckIn('No')}
            >
              No
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TicketDetailPage