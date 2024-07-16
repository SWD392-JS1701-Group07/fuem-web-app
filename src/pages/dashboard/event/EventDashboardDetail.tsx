import { approveEvent, getById } from '@/api/eventApi'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { toast } from '@/components/ui/use-toast'
import { Event } from '@/constants/models/Event'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Ellipsis, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Collaborator } from '@/constants/models/Collaborator'
import { getCollaboratorByEvent } from '@/api/collaboratorApi'
import { getTicketByEventId } from '@/api/ticketApi'
import { OrderTicket } from '@/constants/models/Ticket'
import CollaboratorTable from './component/CollaboratorTable'
import EventTicketTable from './component/EventTicketTable'

const EventDashboardDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [event, setEvent] = useState<Event>()
  const [color, setColor] = useState('red-500')
  const [Collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [ticketList, setTicketList] = useState<OrderTicket[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchTickets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchTickets = async (phoneNumber = '') => {
    try {
      const response = await getTicketByEventId(id as string, { searchTerm: phoneNumber })
      setTicketList(response?.data || [])
    } catch (error) {
      console.error('Error fetching tickets:', error)
    }
  }

  useEffect(() => {
    getById(Number(id)).then((res) => {
      setEvent(res.data)
    })
  }, [id])

  useEffect(() => {
    getCollaboratorByEvent(Number(id)).then((res) => {
      setCollaborators(res.data)
    })
  }, [id])

  useEffect(() => {
    if (event?.eventStatus === 'Active' || event?.eventStatus === 'Completed') {
      setColor('green-500')
    } else if (event?.eventStatus === 'Pending') {
      setColor('gray-500')
    } else if (event?.eventStatus === 'Ongoing') {
      setColor('blue-500')
    } else {
      setColor('red-500')
    }
  }, [event])
  const handleActive = () => {
    approveEvent(Number(id))
      .then(() => {
        toast({
          title: 'Active success',
          description: 'Event is active',
          variant: 'default'
        })
      })
      .catch(() => {
        toast({
          title: 'Active fail',
          description: '',
          variant: 'destructive'
        })
      })
  }

  const handleSearch = () => {
    fetchTickets(searchQuery)
    console.log('search: ', searchQuery)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="w-full">
      <div className="flex w-full justify-between bg-purple-400 p-3 text-gray-50">
        <div className="flex">
          <h1 className="text-5xl">{event?.name}</h1>
          <Button
            className={`border-4 border-${color} bg-white text-${color} m-0 rounded-3xl p-0 px-2`}
          >
            {event?.eventStatus}
          </Button>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>View collaborators</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {localStorage.getItem('role') === '4' ? (
            event?.eventStatus == 'Planning' || event?.eventStatus == 'Pending' ? (
              <Button onClick={handleActive} className="m-2">
                Active
              </Button>
            ) : null
          ) : null}
        </div>
      </div>
      <Accordion type="multiple" defaultValue={['general']}>
        <AccordionItem title="Event Detail" value="general">
          <AccordionTrigger className="bg-slate-200 pl-2">General information</AccordionTrigger>
          <AccordionContent>
            <Card className="pt-2 text-lg">
              <CardContent>Event Name: {event?.name}</CardContent>
              <CardContent>
                Sale Date: {event?.startSellDate.toString().substring(5, 10)}-{' '}
                {event?.endSellDate.toString().substring(5, 10)}-
                {event?.endSellDate.toString().substring(0, 4)}
              </CardContent>
              {event?.price == 0 ? (
                <CardContent>Price: Free</CardContent>
              ) : (
                <CardContent>Price: {event?.price} VND</CardContent>
              )}
              <CardContent>Ticket Quantity: {event?.quantity}</CardContent>
              <CardContent>Event Status: {event?.eventStatus}</CardContent>
              <CardContent>Description: {event?.description}</CardContent>
              {/* <CardContent>Subject Id</CardContent> */}
            </Card>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem title="Event Detail" value="schedule">
          <AccordionTrigger className="bg-slate-200 pl-2">Schedule</AccordionTrigger>
          <AccordionContent>
            {event?.scheduleList != null
              ? event?.scheduleList.map((schedule) => (
                  <Card className="pt-2 text-lg">
                    <CardHeader>{schedule.place}</CardHeader>
                    <CardContent>Start Time: {schedule.startTime}</CardContent>
                    <CardContent>End Time: {schedule.endTime}</CardContent>
                  </Card>
                ))
              : null}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem title="Event Detail" value="sponsor">
          <AccordionTrigger className="bg-slate-200 pl-2">Sponsor</AccordionTrigger>
          <AccordionContent>
            {event?.sponsorships && event?.sponsorships.length > 0 ? (
              event?.sponsorships.map((sponsorship) => (
                <>
                  {}
                  <Card className="pt-2 text-lg">
                    <CardContent>Name: {sponsorship.sponsor.name}</CardContent>
                    <CardContent>EMail: {sponsorship.sponsor.email}</CardContent>
                    <CardContent>PhoneNumber: {sponsorship.sponsor.phoneNumber}</CardContent>
                    <CardContent>Type: {sponsorship.type}</CardContent>
                    <CardContent>Sum: {sponsorship.sum} VND</CardContent>
                  </Card>
                </>
              ))
            ) : (
              <></>
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem title="Event Detail" value="Collaborator">
          <AccordionTrigger className="bg-slate-200 pl-2">Collaborators</AccordionTrigger>
          <AccordionContent>
            <CollaboratorTable data={Collaborators} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem title="Event Detail" value="ticket">
          <AccordionTrigger className="bg-slate-200 pl-2">Tickets</AccordionTrigger>
          <AccordionContent>
            <div className="absolute z-10 mt-4 flex space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search tickets"
                className="h-10 w-60 rounded-md border px-4 focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                onClick={handleSearch}
                className="rounded-mdpx-4 inline-flex items-center justify-center py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Search className="mr-2" />
                Search
              </button>
            </div>
            <div className="light mb-10 max-w-screen-2xl">
              {ticketList ? (
                <EventTicketTable data={ticketList} />
              ) : (
                <h1>There are no tickets for this event.</h1>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default EventDashboardDetail
