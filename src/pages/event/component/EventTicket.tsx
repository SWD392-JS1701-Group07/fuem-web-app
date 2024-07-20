import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { Event, EventDetail } from '@/constants/models/Event'
import { formatDateTime } from '@/lib/utils'
import { Calendar, CalendarPlus, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Account } from '@/constants/models/Account'
import { AppState } from '@/constants/models/common'
import { useSelector } from 'react-redux'
import { useCart } from '../../cart/UseCart'
import { CartItem, type Ticket } from '@/constants/models/Ticket'
import { useParams } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'
import { getById } from '@/api'

const EventTicket = ({ event }: { event: Event }) => {
  const MAX_TICKETS = 5
  const { accessToken } = useSelector((state: AppState) => state.loginedUser)
  const [open, setOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [user, setUser] = useState<Account | null>(null)
  const [eventDetail, setEventDetail] = useState<EventDetail | undefined>(undefined)
  const [additionalTickets, setAdditionalTickets] = useState<Ticket[]>([])
  const { addToCart } = useCart()
  const { toast } = useToast()
  const { id } = useParams()
  const isEventPage = !!id

  useEffect(() => {
    const storedUser = localStorage.getItem('userProfile')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [accessToken])

  useEffect(() => {
    const storedUser = localStorage.getItem('userProfile')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      setAdditionalTickets([{
        name: '',
        email: '',
        phoneNumber: '',
        price: event.price,
        eventId: event.id
      }])
    }
  }, [accessToken, event.price, event.id])

  useEffect(() => {
    const getEventDetail = async () => {
      try {
        const response = await getById(parseInt(id as string))
        setEventDetail(response.data)
      } catch (error) {
        console.error('Failed to fetch event details', error)
      }
    }

    if (id) {
      getEventDetail()
    }
  }, [id])
  const handleQuantityChange = (value: number) => {
    const remainingTickets = eventDetail?.remaining || 0
    const newQuantity = Math.max(1, Math.min(MAX_TICKETS, Math.min(value, remainingTickets)))
    setQuantity(newQuantity)
  
    if (!user) {
      const newAdditionalTickets = Array.from({ length: newQuantity }, () => ({
        name: '',
        email: '',
        phoneNumber: '',
        price: event.price,
        eventId: event.id
      }))
      setAdditionalTickets(newAdditionalTickets)
    } else {
      setAdditionalTickets((prevTickets) => {
        if (newQuantity > 1) {
          const updatedTickets = [...prevTickets]
          for (let i = prevTickets.length; i < newQuantity - 1; i++) {
            updatedTickets.push({
              name: '',
              email: '',
              phoneNumber: '',
              price: event.price,
              eventId: event.id
            })
          }
          return updatedTickets.slice(0, newQuantity - 1)
        }
        return []
      })
    }
  }  

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/
    return phoneRegex.test(phoneNumber)
  }

  const validateTickets = () => {
    for (const ticket of additionalTickets) {
      if (!ticket.name || !ticket.email || !ticket.phoneNumber) {
        toast({
          title: 'Failed',
          description: 'All ticket fields must be filled.',
          variant: 'destructive'
        })
        return false
      }
      if (!validateEmail(ticket.email)) {
        toast({
          title: 'Failed',
          description: 'Invalid email format.',
          variant: 'destructive'
        })
        return false
      }
      if (!validatePhoneNumber(ticket.phoneNumber)) {
        toast({
          title: 'Failed',
          description:
            'Invalid phone number format. Please enter a valid Vietnamese phone number in the format +84 or 0 followed by 10 digits.',
          variant: 'destructive'
        })
        return false
      }
    }

    const emails = new Set()
    const phoneNumbers = new Set()
    for (const ticket of [user, ...additionalTickets]) {
      if (emails.has(ticket?.email) || phoneNumbers.has(ticket?.phoneNumber)) {
        toast({
          title: 'Failed',
          description: `Duplicate email or phone number found.`,
          variant: 'destructive'
        })
        return false
      }
      emails.add(ticket?.email)
      phoneNumbers.add(ticket?.phoneNumber)
    }
    return true
  }

  const checkPurchasable = () => {
    const userProfileString = localStorage.getItem('userProfile')
    let userProfile: Account | null = null
    if (userProfileString) {
      userProfile = JSON.parse(userProfileString)
      try {
        if (!userProfile || !userProfile.name || !userProfile.phoneNumber) {
          toast({
            title: 'Cannot purchase',
            description: 'Please fill in your Full name and Phone number in Profile!',
            variant: 'destructive'
          })
          return
        }

        if (!userProfile || !userProfile.name) {
          toast({
            title: 'Cannot purchase',
            description: 'Please fill in your Full name in Profile!',
            variant: 'destructive'
          })
          return
        }

        if (!userProfile || !userProfile.phoneNumber) {
          toast({
            title: 'Cannot purchase',
            description: 'Please fill in your Phone number in Profile!',
            variant: 'destructive'
          })
          return
        }
        return
      } catch (error) {
        console.error('Guest account', error)
      }
    } else return
  }
  const handleAddToCart = () => {
    if (!validateTickets()) return

    const tickets: Ticket[] = [
      user && {
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email,
        price: event.price,
        eventId: event.id
      },
      ...additionalTickets.map((ticket) => ({
        name: ticket.name,
        phoneNumber: ticket.phoneNumber,
        email: ticket.email,
        price: event.price,
        eventId: event.id
      }))
    ].filter(Boolean) as Ticket[]

    const cartItem: CartItem = {
      name: user?.name || additionalTickets[0].name,
      phoneNumber: user?.phoneNumber || additionalTickets[0].phoneNumber,
      email: user?.email || additionalTickets[0].email,
      event: event,
      price: event.price,
      quantity: quantity,
      id: event.id as number,
      tickets: tickets
    }

    addToCart(cartItem)
    setOpen(false)
  }

  const today = new Date().toISOString().split('T')[0]
  const startSellDate = new Date(event.startSellDate).toISOString().split('T')[0]
  const endSellDate = new Date(event.endSellDate).toISOString().split('T')[0]

  const handleAdditionalTicketChange = (index: number, field: keyof Account, value: string) => {
    const newTickets = [...additionalTickets]
    newTickets[index] = { ...newTickets[index], [field]: value }
    setAdditionalTickets(newTickets)
  }

  const isUserInfoEmpty = !user?.name || !user?.email || !user?.phoneNumber
  const buttonDisabled = (): boolean => {
    if (user === null) {
      return true
    }
    return !!user.name && !!user.phoneNumber
  }

  const isEnoughInformation = buttonDisabled()

  const renderUserInfo = () => (
    <div className="grid gap-2">
      <p className="text-lg font-semibold text-white">User Info</p>
      <div className="flex justify-between">
        <div className="pr-2">
          <div className="flex justify-between space-x-3">
            <p className="text-lg text-gray-400">Name</p>
            <p className="text-lg font-semibold text-white">{user?.name}</p>
          </div>
          <div className="flex justify-between space-x-3">
            <p className="text-lg text-gray-400">Email</p>
            <p className="text-lg font-semibold text-white">{user?.email}</p>
          </div>
          <div className="flex items-center justify-between space-x-3">
            <p className="text-lg text-gray-400">Phone Number</p>
            <p className="text-lg font-semibold text-white">{user?.phoneNumber}</p>
          </div>
        </div>
        {quantity > 1 || !user ? renderAdditionalTickets() : null}
      </div>
    </div>
  )  

  const renderAdditionalTickets = () => (
    <div className="flex flex-row space-x-2 pl-2">
      {additionalTickets.map((ticket, index) => (
        <div key={index} className="mb-4">
          <p className="text-lg font-semibold text-white">Ticket {index + 1}</p>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Name"
              value={ticket.name}
              onChange={(e) => handleAdditionalTicketChange(index, 'name', e.target.value)}
              className="h-10 w-full border border-gray-700 bg-black px-2 text-white"
            />
            <input
              type="email"
              placeholder="Email"
              value={ticket.email}
              onChange={(e) => handleAdditionalTicketChange(index, 'email', e.target.value)}
              className="h-10 w-full border border-gray-700 bg-black px-2 text-white"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={ticket.phoneNumber}
              onChange={(e) => handleAdditionalTicketChange(index, 'phoneNumber', e.target.value)}
              className="h-10 w-full border border-gray-700 bg-black px-2 text-white"
            />
          </div>
        </div>
      ))}
    </div>
  )  

  const total = event.price * quantity
  const schedule = event.scheduleList
  const remaining = eventDetail?.remaining

  return (
    <Drawer
      open={
        open &&
        isEnoughInformation &&
        today >= startSellDate &&
        today <= endSellDate &&
        remaining! > 0
      }
      onOpenChange={setOpen}
    >
      <DrawerTrigger asChild>
        <div>
          {isEventPage ? (
            <Button
              className="mt-4 h-14 rounded-none border border-yellow-sun bg-black px-8 text-xl text-yellow-sun hover:bg-yellow-sun hover:text-black"
              disabled={!(today >= startSellDate && today <= endSellDate) || remaining! <= 0}
              onClick={checkPurchasable}
            >
              {(today >= startSellDate && today <= endSellDate) || remaining! > 0
                ? 'Buy Ticket'
                : 'Sold Out'}
            </Button>
          ) : (
            <button
              className="flex h-12 w-12 items-center justify-center rounded-full bg-electric-indigo text-white"
              aria-label="Join Event"
              disabled={!(today >= startSellDate && today <= endSellDate) || remaining! <= 0}
            >
              <CalendarPlus className="h-6 w-6" />
            </button>
          )}
        </div>
      </DrawerTrigger>
      <DrawerContent className="bg-black text-white">
        <DrawerHeader className="px-20 text-left">
          <DrawerTitle className="text-2xl text-yellow-sun">{event.name}</DrawerTitle>
          <DrawerDescription className="text-base text-gray-400">
            Subject: {event.subjectId}
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-20">
          <div className="mb-4">
            <p className="mb-2 text-lg font-semibold text-white">Event Detail</p>
            <div className="flex flex-row space-x-4">
              {schedule?.map((sched) => (
                <div className="flex flex-col" key={sched.id}>
                  <h3 className="pb-1 text-gray-400">Schedule {schedule.indexOf(sched) + 1}</h3>
                  <div className="flex flex-row space-x-3 pb-2">
                    <MapPin className="self-center text-gray-400" />
                    <p>{sched.place}</p>
                  </div>
                  <div className="flex flex-row space-x-3">
                    <Calendar className="self-center text-gray-400" />
                    <p className="text-base text-white">
                      {formatDateTime(sched.startTime, 'time') +
                        ' - ' +
                        formatDateTime(sched.endTime, 'time')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4 grid gap-4">
            {isUserInfoEmpty ? renderAdditionalTickets() : renderUserInfo()}
          </div>
          <div className="mb-4 grid gap-4">
            <div className="grid gap-2">
              <p className="text-lg font-semibold text-white">Ticket</p>
              <div className="flex justify-between">
                <p className="text-lg text-gray-400">Price</p>
                <p className="text-lg font-semibold text-white">{event.price || 0}đ</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg text-gray-400">Quantity</p>
                <div className="flex items-center space-x-2">
                  <Button
                    className="flex h-10 w-10 items-center justify-center border border-gray-700 bg-black text-2xl text-white hover:bg-gray-800"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <input
                    className="h-10 w-16 border border-gray-700 bg-black text-center text-white"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    min={1}
                    max={5}
                  />
                  <Button
                    className="flex h-10 w-10 items-center justify-center border border-gray-700 bg-black text-2xl text-white hover:bg-gray-800"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= 5}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex justify-between border-t border-gray-700 pt-2">
                <p className="text-lg font-semibold text-white">Total</p>
                <p className="text-lg font-semibold text-white">{total || 0}đ</p>
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter className="flex justify-between px-20 pt-2">
          <Button onClick={handleAddToCart} className="bg-white text-black hover:bg-gray-300">
            Add to Cart
          </Button>
          <DrawerClose asChild>
            <Button
              variant="outline"
              className="border-gray-700 bg-black text-white hover:bg-slate-800 hover:text-white"
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default EventTicket
