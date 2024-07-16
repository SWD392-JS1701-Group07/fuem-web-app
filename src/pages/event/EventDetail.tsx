import { useState, useEffect, ChangeEvent } from 'react'
import { useParams, Link } from 'react-router-dom'
import * as yup from 'yup'
import { getById } from '@/api'
import { Button } from '@/components/ui/button'
import { AVATAR_PLACEHOLDER_URL, EVENT_PLACEHOLDER_URL } from '@/constants/models/url'
import { formatDateTime } from '@/lib/utils'
import * as Avatar from '@radix-ui/react-avatar'
import { Event, type EventDetail } from '@/constants/models/Event'
import EventTicket from '@/pages/event/component/EventTicket'
import { addCollaborator } from '@/api/collaboratorApi'
import { CollaboratorCreateModel } from '@/constants/models/Collaborator'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { Account } from '@/constants/models/Account'
import { createSponsorship } from '@/api/sponsorApi'
import { DialogTitle } from '@radix-ui/react-dialog'
import { HandCoins } from 'lucide-react'

const EventDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [event, setEvent] = useState<Event | undefined>(undefined)
  const [user, setUser] = useState<Account | undefined>(undefined)
  const [eventDetail, setEventDetail] = useState<EventDetail | undefined>(undefined)
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false) // New state for dialog open

  const getAccountId = () => {
    const userProfile = localStorage.getItem('userProfile')
    if (userProfile) {
      const parsedProfile: Account = JSON.parse(userProfile)
      return parsedProfile.id
    }
    return null
  }

  const [formData, setFormData] = useState({
    description: '',
    title: '',
    sum: 0,
    sponsorId: getAccountId(),
    eventId: event?.id
  })

  const validationSchema = yup.object({
    description: yup
      .string()
      .min(5, 'Description must be at least 5 characters long')
      .max(255, 'Description cannot be longer than 255 characters')
      .required('Description is required'),
    title: yup
      .string()
      .min(3, 'Title must be at least 3 characters long')
      .max(50, 'Title cannot be longer than 50 characters')
      .required('Title is required'),
    sum: yup
      .number()
      .min(1000, 'Sum must be at least 1,000 VND')
      .test('divisible-by-1000', 'Sum must be divisible by 1000', (value) => {
        return value !== undefined && value % 1000 === 0
      })
      .required('Sum is required')
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'sum' && value !== '' && !/^\d*$/.test(value)) {
      return
    }
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      await validationSchema.validate(formData)
      await createSponsorship({
        ...formData,
        eventId: event?.id as number
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }).then((response: any) => {
        console.log('RESPONSE IS: ', response)
        if (response.isSuccess) {
          toast({
            title: 'Success',
            description: 'Sponsorship provided successfully',
            variant: 'default'
          })
        }
      })
      setIsDialogOpen(false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        toast({
          title: 'Validation Error',
          description: error.message,
          variant: 'destructive'
        })
      } else {
        toast({
          title: 'Error',
          description: 'There was an error providing sponsorship',
          variant: 'destructive'
        })
      }
    }
  }

  useEffect(() => {
    const userProfile = localStorage.getItem('userProfile')
    if (userProfile) {
      const parsedProfile: Account = JSON.parse(userProfile)
      setUser(parsedProfile)
    }
  }, [])

  useEffect(() => {
    const getEventDetail = async () => {
      try {
        const response = await getById(parseInt(id as string))
        setEvent(response.data)
        setEventDetail(response.data)
      } catch (error) {
        console.error('Failed to fetch event details', error)
      }
    }

    if (id) {
      getEventDetail()
    }
  }, [id])

  const handleCollaborator = () => {
    const Collaborator: CollaboratorCreateModel = {
      eventId: parseInt(id ? id : '0'),
      accountId: parseInt(localStorage.getItem('userId') as string)
    }
    addCollaborator(Collaborator)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((_response) => {
        toast({
          title: 'registered successfully',
          description: 'Waiting for approval'
        })
      })
      .catch((error) => {
        console.error('Failed to create collaborator', error)
        const erString = (error.response.data as string).split('\n')
        toast({
          title: 'Register fail',
          description: erString[0],
          variant: 'destructive'
        })
      })
  }
  const schedule = event?.scheduleList
  return (
    <div
      id="section"
      className="relative bg-black bg-no-repeat py-14 pb-28 font-poppins text-white"
    >
      <div
        id="row"
        className="relative m-auto flex w-4/5 max-w-6xl flex-wrap bg-cover bg-center bg-no-repeat py-7"
      >
        <h1 className="font-jura text-2xl font-extrabold">
          <Link to="/event">← Back to event list</Link>
        </h1>
      </div>
      <div
        id="row"
        className="relative m-auto flex w-4/5 max-w-6xl flex-wrap space-x-10 bg-home-dots bg-cover bg-center bg-no-repeat py-7"
      >
        <div
          id="column"
          className="relative min-h-px w-full max-w-xl flex-1 bg-cover bg-center bg-no-repeat"
        >
          <img src={event?.avatarUrl || EVENT_PLACEHOLDER_URL}></img>
        </div>
        <div
          id="column"
          className="relative min-h-px w-full max-w-xl flex-1 bg-cover bg-center bg-no-repeat"
        >
          <h1 className="font-jura text-7xl font-extrabold">{event?.name || 'Unknown'}</h1>
          <h1 className="font-jura text-2xl font-bold">
            Subject: {eventDetail?.subject.name || 'Unknown'}
          </h1>
          <p className="mt-6 font-jura text-4xl font-bold text-crayola">
            {schedule?.map((schedule) => (
              <div key={schedule.id}>
                <p className="text-2xl">
                  {formatDateTime(schedule.startTime as string, 'time') +
                    ' - ' +
                    formatDateTime(schedule.endTime as string, 'time')}{' '}
                </p>
                <p className="text-white">Hosted at {schedule.place}</p>
              </div>
            ))}
          </p>
          {user?.roleId === 3 ? (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="mt-2 h-14 rounded-none border border-crayola bg-black px-8 text-xl text-crayola hover:bg-crayola hover:text-black">
                  Provide Sponsorship
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black text-white">
                <DialogTitle className="m-0 flex flex-row text-3xl font-bold">
                  Provide Sponsorship <HandCoins className="ml-2 h-8 w-8" />
                </DialogTitle>
                <DialogDescription>Please fill out the form below:</DialogDescription>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="mb-2 block text-white" htmlFor="title">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="w-full border border-white bg-black p-2 text-white"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="mb-2 block text-white" htmlFor="description">
                      Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      className="w-full border border-white bg-black p-2 text-white"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="mb-2 block text-white" htmlFor="sum">
                      Sum
                    </label>
                    <input
                      type="number"
                      id="sum"
                      name="sum"
                      className="w-full border border-white bg-black p-2 text-white"
                      value={formData.sum}
                      onChange={handleInputChange}
                      required
                      onKeyDown={(e) => {
                        const allowedKeys = [
                          '0',
                          '1',
                          '2',
                          '3',
                          '4',
                          '5',
                          '6',
                          '7',
                          '8',
                          '9',
                          'Backspace',
                          'ArrowLeft',
                          'ArrowRight'
                        ]
                        if (!allowedKeys.includes(e.key)) {
                          e.preventDefault()
                        }
                      }}
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      className="bg-crayola text-white hover:bg-white hover:text-black"
                    >
                      Submit
                    </Button>
                    <DialogClose asChild>
                      <Button
                        className="bg-black text-crayola"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          ) : null}
          {user?.roleId === 2 ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-2 h-14 rounded-none border border-crayola bg-black px-8 text-xl text-crayola hover:bg-crayola hover:text-black">
                  Join as collaborator
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black text-white">
                <DialogHeader>Join as collaborator</DialogHeader>
                <DialogDescription>Are you sure?</DialogDescription>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={handleCollaborator} variant="outline" className="text-black">
                      Yes
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="outline" className="text-black">
                      Cancel
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : null}
        </div>
      </div>
      <div
        id="row"
        className="relative m-auto mb-10 flex w-4/5 max-w-6xl flex-row flex-wrap justify-evenly bg-cover bg-center bg-no-repeat py-7"
      >
        <div id="avatar" className="flex w-1/2 flex-row items-center">
          <Avatar.Root className="bg-blackA1 inline-flex h-40 w-40 select-none items-center justify-center overflow-hidden rounded-full align-middle">
            <Avatar.Image
              className="h-full w-full rounded-[inherit] object-cover"
              src={eventDetail?.eventOperator.avatarUrl || AVATAR_PLACEHOLDER_URL}
              alt="Avatar"
            />
            <Avatar.Fallback
              className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
              delayMs={600}
            >
              {eventDetail?.eventOperator.name}
            </Avatar.Fallback>
          </Avatar.Root>
          <div className="flex flex-col pl-5">
            <h3 className="font-jura text-4xl font-extrabold text-yellow-sun">EVENT ORGANIZER</h3>
            <h2 className="pt-3 font-poppins text-2xl font-semibold">
              {eventDetail?.eventOperator.name}
            </h2>
          </div>
        </div>
        <div id="ticket" className="flex w-1/2 flex-row items-center">
          <div className="flex flex-col pl-5">
            <h3 className="font-jura text-4xl font-extrabold text-yellow-sun">Ticket Price: </h3>
            <div className="flex flex-row items-center space-x-4">
              <div>
                <h2 className="pt-3 font-poppins text-2xl font-bold">
                  {event?.price} <u>đ</u>
                </h2>
                <p className="text-xl text-gray-400">{eventDetail?.remaining} left</p>
              </div>
              <div className="flex items-center">{event && <EventTicket event={event} />}</div>
            </div>
            <div className="pt-3 text-xl">
              <h3 className="pb-1 font-jura text-2xl font-extrabold text-yellow-sun">
                Sales period:
              </h3>
              {formatDateTime(event?.startSellDate.toString() as string, 'date') +
                ' at ' +
                formatDateTime(event?.startSellDate.toString() as string, 'time') +
                ' - ' +
                formatDateTime(event?.endSellDate.toString() as string, 'date') +
                ' at ' +
                formatDateTime(event?.endSellDate.toString() as string, 'time')}{' '}
            </div>
          </div>
        </div>
      </div>
      <div
        id="row"
        className="relative m-auto mb-10 flex w-4/5 max-w-6xl flex-col flex-wrap justify-center bg-cover bg-center bg-no-repeat py-7"
      >
        <h1 className="pb-10 text-center font-jura text-7xl font-extrabold">Details</h1>
        <p className="text-2xl leading-9">{event?.description || '...'}</p>
      </div>
      <div
        id="row"
        className="relative m-auto mb-10 mt-20 flex w-4/5 max-w-6xl flex-wrap justify-center bg-cover bg-center bg-no-repeat py-7"
      >
        <h1 className="text-center font-jura text-7xl font-extrabold">Sponsors & partners</h1>
      </div>

      <div
        id="sponsors-partners"
        className="mx-auto flex max-w-6xl flex-wrap justify-center gap-8 p-4"
      >
        {eventDetail?.sponsorships.map((sponsorship, index) => (
          <div key={index} className="flex flex-col items-center">
            <h1 className="font-jura text-4xl font-extrabold">{sponsorship.title}</h1>
            <h3 className="pt-2 text-xl">{sponsorship.description}</h3>
          </div>
        ))}
      </div>
      {/* <div
        id="row"
        className="relative m-auto flex w-4/5 max-w-6xl flex-wrap space-x-10 bg-home-dots bg-cover bg-center bg-no-repeat py-7"
      >
        <div
          id="column"
          className="relative min-h-px w-full max-w-xl flex-1 bg-cover bg-center bg-no-repeat"
        >
          <h1 className="font-jura text-3xl font-extrabold">Collaborators</h1>
          {event?.collaboratorList.length ? (
            <div>
              {event.collaboratorList.map((collaborator) => (
                <div key={collaborator.account.id}>
                  <Avatar.Root>
                    <Avatar.Image
                      src={collaborator.account.avatarUrl || AVATAR_PLACEHOLDER_URL}
                      alt="Account Picture"
                      className="rounded-full"
                    />
                    <Avatar.Fallback className="bg-black" delayMs={600}>
                      {collaborator.account.firstName[0]}
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <p className="font-bold">{collaborator.account.firstName}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-crayola">No collaborators yet</p>
          )}
        </div>
        <div
          id="column"
          className="relative min-h-px w-full max-w-xl flex-1 bg-cover bg-center bg-no-repeat"
        >
          <h1 className="font-jura text-3xl font-extrabold">Sponsored</h1>
          {event?.sponsorshipList.length ? (
            <div>
              {event.sponsorshipList.map((sponsorship) => (
                <div key={sponsorship.id}>
                  <p>{sponsorship.description}</p>
                  <p>{sponsorship.title}</p>
                  <p>{sponsorship.sum}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-crayola">No sponsorships yet</p>
          )}
        </div>
      </div> */}
    </div>
  )
}

export default EventDetail
