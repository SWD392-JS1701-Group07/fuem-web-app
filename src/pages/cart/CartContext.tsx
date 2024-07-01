import { createContext, useState, ReactNode, useEffect, Dispatch, SetStateAction } from 'react'
import { CartTicket } from '@/constants/models/Ticket'

type CartContextType = {
  cartItems: CartTicket[]
  setCartItems: Dispatch<SetStateAction<CartTicket[]>>
  addToCart: (ticket: CartTicket) => void
  removeFromCart: (id: string) => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartTicket[]>([])

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems')
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems))
    }
  }, [])

  const addToCart = (newTicket: CartTicket) => {
    console.log('ADDING NEW TICKET: ', newTicket)
    setCartItems((prevItems) => {
      console.log('UPDATING CART ITEMS') // Add this log
      const existingTicketIndex = prevItems.findIndex(
        (ticket) => ticket.event.id === newTicket.event.id
      )
      console.log('PREV TICKET INDEX: ', existingTicketIndex)

      let updatedItems: CartTicket[]

      if (existingTicketIndex !== -1) {
        updatedItems = prevItems.map((ticket, index) =>
          index === existingTicketIndex
            ? { ...ticket, quantity: ticket.quantity + newTicket.quantity }
            : ticket
        )
      } else {
        updatedItems = [...prevItems, newTicket]
      }

      localStorage.setItem('cartItems', JSON.stringify(updatedItems))
      return updatedItems
    })
  }

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id.toString() !== id)
      localStorage.setItem('cartItems', JSON.stringify(updatedItems))
      return updatedItems
    })
  }

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}
