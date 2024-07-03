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

const Cart = () => {
  const { cartItems, setCartItems, removeFromCart } = useCart()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems')
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems))
    }
  }, [setCartItems])

  const handleQuantityChange = (id: string, quantity: string) => {
    const updatedQuantity = quantity === '' ? 1 : Math.max(1, parseInt(quantity, 10))
    const updatedCartItems = cartItems.map((item) =>
      item.id.toString() === id ? { ...item, quantity: updatedQuantity } : item
    )
    setCartItems(updatedCartItems)
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
  }

  const emptyCart = () => {
    cartItems.forEach((item) => removeFromCart(item.id.toString()))
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
                  <div className="flex h-full flex-col items-end">
                    <label className="text-sm text-gray-400">Each</label>
                    <p className="w-24 text-right text-lg font-medium">{item.price}đ</p>
                  </div>
                  <div className="flex h-full flex-col items-center">
                    <label className="text-sm text-gray-400">Quantity</label>
                    <div className="flex items-center space-x-2">
                      <Button
                        className="flex h-10 w-5 items-center justify-center border border-gray-700 bg-gray-900 text-2xl text-white hover:bg-gray-800"
                        onClick={() =>
                          handleQuantityChange(item.id.toString(), (item.quantity - 1).toString())
                        }
                      >
                        -
                      </Button>
                      <input
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id.toString(), e.target.value)}
                        className="h-10 w-12 border border-gray-700 bg-gray-900 text-center text-white"
                      />
                      <Button
                        className="flex h-10 w-5 items-center justify-center border border-gray-700 bg-gray-900 text-2xl text-white hover:bg-gray-800"
                        onClick={() =>
                          handleQuantityChange(item.id.toString(), (item.quantity + 1).toString())
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="flex h-full flex-col items-end">
                    <label className="text-sm text-gray-400">Total</label>
                    <p className="w-24 text-right text-lg font-medium">
                      {item.price * item.quantity}đ
                    </p>
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
              onClick={() => setOpen(false)}
              className="bg-electric-indigo text-white hover:bg-white hover:text-electric-indigo"
            >
              Checkout
              <ShoppingBag className="ml-2" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Cart
