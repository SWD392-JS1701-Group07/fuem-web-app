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
import { useState } from 'react'

const EventTicket = ({ event }: { event: Event }) => {
  const [open, setOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, value)) // Ensure quantity is at least 1
  }

  const total = event.price * quantity

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="mt-4 h-14 rounded-none border border-yellow-sun bg-black px-8 text-xl text-yellow-sun hover:bg-yellow-sun hover:text-black">
          Purchase
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-black text-white">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-2xl text-yellow-sun">{event.name}</DrawerTitle>
          <DrawerDescription className="text-gray-400">
            Subject: {event.subjectId}
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <div className="mb-4">
            <p className="mb-2 text-lg font-semibold text-white">Event Detail</p>
            <div className="flex flex-row space-x-3 pb-2">
              <MapPin className="self-center text-gray-400" />
              <p className="text-base text-white">At {event.place || 'somewhere'}</p>
            </div>
            <div className="flex flex-row space-x-3">
              <Calendar className="self-center text-gray-400" />
              <p className="text-base text-white">
                {formatDateTime(event.startDate, 'time') +
                  ' - ' +
                  formatDateTime(event.endDate, 'time')}
              </p>
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
                    type="number"
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
              <div className="flex justify-between">
                <p className="text-lg text-gray-400">Discount</p>
                <p className="text-lg font-semibold text-white">-{'NaN'}đ</p>
              </div>
              <div className="flex justify-between border-t border-gray-700 pt-2">
                <p className="text-lg font-semibold text-white">Total</p>
                <p className="text-lg font-semibold text-white">{total || 'NaN'}đ</p>
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter className="flex justify-between pt-2">
          <Button className="bg-white text-black hover:bg-gray-300">Checkout</Button>
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
