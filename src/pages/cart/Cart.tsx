import { useEffect, useState } from 'react'
import { useCart } from './UseCart'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { EVENT_PLACEHOLDER_URL } from '@/constants/models/url'
import { ShoppingBag, ShoppingCart, Trash2 } from 'lucide-react'
import { OrderResponse } from '@/constants/models/Ticket'
import { useToast } from '@/components/ui/use-toast'
import { createOrder } from '@/api/orderApi'

const Cart = () => {
  const { cartItems, setCartItems, removeFromCart } = useCart()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems')
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems))
    }
  }, [setCartItems])

  const emptyCart = () => {
    cartItems.forEach((item) => removeFromCart(item.id.toString()))
  }

  const checkout = async () => {
    setLoading(true)

    const tickets = cartItems.flatMap((item) => item.tickets)
    console.log('Cart: ', tickets)

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

    const orderData = {
      orderNotes: '',
      email: cartItems[0].email,
      phoneNumber: cartItems[0].phoneNumber,
      totalAmount,
      customerId: 1,
      tickets
    }

    try {
      const response: OrderResponse = await createOrder(orderData)
      if (response.isSuccess) {
        const newTab = window.open()
        newTab?.location.assign(response.data)
      } else {
        throw new Error('Order creation failed')
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessages = error.response?.data?.errors
        ? Array.from(new Set(Object.values(error.response.data.errors).flat())).join(', ')
        : 'An unknown error occurred. Try again later.'

      toast({
        title: 'Order creation failed',
        description: errorMessages,
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
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
            <div
              className="cursor-pointer bg-transparent text-blue-500 hover:underline"
              onClick={() => emptyCart()}
            >
              Empty cart
            </div>
            <span>
              {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between space-x-4 rounded-lg bg-gray-800 p-4 shadow-lg"
                >
                  <img
                    src={item.event.avatarUrl || EVENT_PLACEHOLDER_URL}
                    alt={item.event.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-medium">{item.event.name}</h3>
                    <p className="text-gray-400">In Stock</p>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <div className="flex h-full flex-col items-end">
                        <label className="text-sm text-gray-400">Each</label>
                        <p className="w-24 text-right text-lg font-medium">{item.price}đ</p>
                      </div>
                      <div className="flex h-full flex-col items-end">
                        <label className="text-sm text-gray-400">Quantity</label>
                        <p className="w-24 text-right text-lg font-medium">{item.quantity}</p>
                      </div>
                      <div className="flex h-full flex-col items-end">
                        <label className="text-sm text-gray-400">Total</label>
                        <p className="w-24 text-right text-lg font-medium">
                          {item.price * item.quantity}đ
                        </p>
                      </div>
                    </div>
                    <div className="flex h-full flex-col items-end">
                      <label className="text-sm text-gray-400">Attendees</label>
                      <p className="text-right text-lg font-medium">
                        {item.tickets.map((ticket) => ticket.name).join(', ')}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => removeFromCart(item.id.toString())}
                    className="flex items-center justify-center bg-red-600 text-white hover:bg-red-500"
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={checkout}
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

export default Cart
