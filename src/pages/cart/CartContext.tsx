import { createContext, useState, ReactNode, useEffect, Dispatch, SetStateAction } from 'react'
import { CartItem } from '@/constants/models/Ticket'

type CartContextType = {
  cartItems: CartItem[]
  setCartItems: Dispatch<SetStateAction<CartItem[]>>
  addToCart: (ticket: CartItem) => void
  removeFromCart: (id: string) => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems')
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems))
    }
  }, [])

  const addToCart = (newCartItem: CartItem) => {
    // console.log('ADDING NEW CART ITEM: ', newCartItem)
    setCartItems((prevItems) => {
      // console.log('UPDATING CART ITEMS')

      const existingCartItemIndex = prevItems.findIndex(
        (item) => item.event.id === newCartItem.event.id
      )
      // console.log('EXISTING CART ITEM INDEX: ', existingCartItemIndex)

      let updatedItems: CartItem[]

      if (existingCartItemIndex !== -1) {
        updatedItems = prevItems.map((item, index) => {
          if (index === existingCartItemIndex) {
            // Filter out duplicate tickets
            const filteredNewTickets = newCartItem.tickets.filter(
              (newTicket) =>
                !item.tickets.some(
                  (existingTicket) =>
                    existingTicket.eventId === newTicket.eventId &&
                    existingTicket.name === newTicket.name &&
                    existingTicket.phoneNumber === newTicket.phoneNumber
                )
            )

            // If no new tickets are left after filtering, return the item as is
            if (filteredNewTickets.length === 0) {
              return item
            }

            return {
              ...item,
              quantity: item.quantity + filteredNewTickets.length,
              tickets: [...item.tickets, ...filteredNewTickets]
            }
          } else {
            return item
          }
        })
      } else {
        updatedItems = [...prevItems, newCartItem]
      }

      localStorage.setItem('cartItems', JSON.stringify(updatedItems))
      return updatedItems
    })
  }

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id.toString() !== id)
      localStorage.setItem(
        'cartItems',
        JSON.stringify(updatedItems.filter((item) => item.id.toString() !== id))
      )
      return updatedItems
    })
  }

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}
