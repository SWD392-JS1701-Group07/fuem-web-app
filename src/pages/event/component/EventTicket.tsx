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
import { Event } from '@/constants/models/Event'
import { formatDateTime } from '@/lib/utils'
import { Calendar, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Account } from '@/constants/models/Account'
import { AppState } from '@/constants/models/common'
import { useSelector } from 'react-redux'

const EventTicket = ({ event }: { event: Event }) => {
  const { accessToken } = useSelector((state: AppState) => state.loginedUser)
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const [user, setUser] = useState<Account | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('userProfile')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [accessToken])

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, value))
  }

  const total = event.price * quantity
  const schedule = event.scheduleList

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="mt-4 h-14 rounded-none border border-yellow-sun bg-black px-8 text-xl text-yellow-sun hover:bg-yellow-sun hover:text-black">
          Buy Ticket
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-black text-white">
        <AnimatePresence initial={false} mode="wait">
          {page === 1 && (
            <motion.div
              key="page1"
              initial={{ x: 0 }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3 }}
            >
              <DrawerHeader className="px-20 text-left">
                <DrawerTitle className="text-2xl text-yellow-sun">{event.name}</DrawerTitle>
                <DrawerDescription className="text-gray-400">
                  Subject: {event.subjectId}
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-20">
                <div className="mb-4">
                  <p className="mb-2 text-lg font-semibold text-white">Event Detail</p>
                  <div className="flex flex-row space-x-4">
                    {schedule?.map((sched) => (
                      <div className="flex flex-col" key={sched.id}>
                        <h3 className="pb-1 text-gray-400">
                          Schedule {schedule.indexOf(sched) + 1}
                        </h3>
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
                  <div className="grid gap-2">
                    <p className="text-lg font-semibold text-white">Ticket</p>
                    <div className="flex justify-between">
                      <p className="text-lg text-gray-400">Price</p>
                      <p className="text-lg font-semibold text-white">{event.price || 'NaN'}đ</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-lg text-gray-400">Quantity</p>
                      <div className="flex items-center space-x-2">
                        <Button
                          className="flex h-10 w-10 items-center justify-center border border-gray-700 bg-black text-2xl text-white hover:bg-gray-800"
                          onClick={() => handleQuantityChange(quantity - 1)}
                        >
                          -
                        </Button>
                        <input
                          className="h-10 w-16 border border-gray-700 bg-black text-center text-white"
                          value={quantity}
                          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                          min={1}
                        />
                        <Button
                          className="flex h-10 w-10 items-center justify-center border border-gray-700 bg-black text-2xl text-white hover:bg-gray-800"
                          onClick={() => handleQuantityChange(quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between border-t border-gray-700 pt-2">
                      <p className="text-lg font-semibold text-white">Total</p>
                      <p className="text-lg font-semibold text-white">{total || 'NaN'}đ</p>
                    </div>
                  </div>
                </div>
              </div>
              <DrawerFooter className="flex justify-between px-20 pt-2">
                <Button
                  onClick={() => setPage(2)}
                  className="bg-white text-black hover:bg-gray-300"
                >
                  Next
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
            </motion.div>
          )}
          {page === 2 && (
            <>
              <DrawerHeader className="px-20 text-left">
                <DrawerTitle className="text-3xl text-yellow-sun">Confirm Order</DrawerTitle>
                <DrawerDescription className="text-gray-400">{event.name}</DrawerDescription>
              </DrawerHeader>
              <div className="mb-4 grid gap-4 px-20">
                <div className="grid gap-2">
                  <p className="text-lg font-semibold text-white">User Info</p>
                  <div className="flex justify-between">
                    <p className="text-lg text-gray-400">Name</p>
                    <p className="text-lg font-semibold text-white">{user?.name}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-lg text-gray-400">Email</p>
                    <p className="text-lg font-semibold text-white">{user?.email}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg text-gray-400">Phone Number</p>
                    <div className="flex items-center space-x-2">{user?.phoneNumber}</div>
                  </div>
                </div>
              </div>
              <div className="mb-4 grid gap-4 px-20">
                <div className="grid gap-2">
                  <p className="border-t border-gray-700 pt-2 text-lg font-semibold text-white">
                    Ticket
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg text-gray-400">Quantity</p>
                    <p className="text-lg font-semibold text-white">{quantity || 'NaN'}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-lg text-gray-400">Total</p>
                    <p className="text-lg font-semibold text-white">{total || 'NaN'}đ</p>
                  </div>
                </div>
              </div>
              <div className="mb-4 grid gap-4 px-20">
                <div className="grid gap-2">
                  <div className="flex justify-between border-t border-gray-700 pt-2">
                    <p className="text-lg font-semibold text-white">Payment Method</p>
                    <p className="text-lg font-semibold text-white">VNPay</p>
                  </div>
                </div>
              </div>
              <DrawerFooter className="flex justify-between px-20 pt-2">
                <Button
                  onClick={() => setPage(1)}
                  className="bg-gray-700 text-white hover:bg-gray-600"
                >
                  Back
                </Button>
                <Button
                  onClick={() => {
                    /* Handle order creation */
                  }}
                  className="bg-white text-black hover:bg-gray-300"
                >
                  Checkout
                </Button>
              </DrawerFooter>
            </>
          )}
        </AnimatePresence>
      </DrawerContent>
    </Drawer>
  )
}

export default EventTicket
