import { getById } from '@/api/eventApi'
import { getSubjectById as getSubjectById } from '@/api/subjectApi'
import { getSponsorshipsById } from '@/api/sponsorApi'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Sponsorships, Event, Subject } from '@/constants/models/Event'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Ellipsis } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SponsorshipDashboardDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [sponsorship, setSponsorship] = useState<Sponsorships>()
  const [event, setEvent] = useState<Event>()
  const [subject, setSubject] = useState<Subject>()

  useEffect(() => {
    getSponsorshipsById(parseInt(id as string))
      .then((res) => {
        setSponsorship(res.data)
        return res.data.eventId
      })
      .then((eventId) => {
        getById(eventId).then((res) => {
          setEvent(res.data)
        })
      })
  }, [id])

  useEffect(() => {
    getSubjectById(event?.subjectId as number).then((res) => {
      setSubject(res.data)
    })
  })

  return (
    <div className="w-full">
      <div className="flex w-full justify-between bg-purple-400 p-3 text-gray-50">
        <div className="flex">
          <h1 className="text-5xl">{sponsorship?.title}</h1>
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
      <Accordion type="multiple" defaultValue={['general', 'event']}>
        <AccordionItem title="Sponsorship Detail" value="general">
          <AccordionTrigger className="bg-slate-200 pl-2">General Information</AccordionTrigger>
          <AccordionContent>
            <Card className="pt-2 text-lg">
              <CardContent>Description: {sponsorship?.description}</CardContent>
              <CardContent>Type: {sponsorship?.type}</CardContent>
              <CardContent>Sum: {sponsorship?.sum}</CardContent>
              <CardContent>Sponsor ID: {sponsorship?.sponsorId}</CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
        {event && (
          <AccordionItem title="Event Detail" value="event">
            <AccordionTrigger className="bg-slate-200 pl-2">Event Information</AccordionTrigger>
            <AccordionContent>
              <Card className="pt-2 text-lg">
                <CardContent>
                  <img src={event?.avatarUrl} className="w-1/2"></img>
                </CardContent>
                <CardContent>Event Name: {event?.name}</CardContent>
                <CardContent>Description: {event?.description}</CardContent>
                <CardContent>Event Status: {event?.eventStatus}</CardContent>
                <CardContent>Price: {event?.price}</CardContent>
                <CardContent>Quantity: {event?.quantity}</CardContent>
                <CardContent>Owner ID: {event?.ownerId}</CardContent>
                <CardContent>Subject: {subject?.name}</CardContent>
              </Card>
              <Card className="mt-4 pt-2 text-lg">
                <CardContent className="mt-4">
                  <h2 className="mb-4 text-2xl">Schedule List</h2>
                  {event?.scheduleList.map((schedule) => (
                    <div key={schedule.id}>
                      <CardContent>Start Time: {schedule.startTime}</CardContent>
                      <CardContent>End Time: {schedule.endTime}</CardContent>
                      <CardContent>Place: {schedule.place}</CardContent>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  )
}

export default SponsorshipDashboardDetail
